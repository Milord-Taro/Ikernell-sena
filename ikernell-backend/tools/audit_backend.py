#!/usr/bin/env python3
"""
audit_backend.py — Auditoría estática reutilizable para el backend IKernell V2.

Uso:
    python3 tools/audit_backend.py [--config audit_config.yaml] [--project-root .]

Genera:
    audit_output/latest.md               (reporte legible)
    audit_output/history/<timestamp>.md  (copia histórica)
    audit_output/history/<timestamp>.json (snapshot de datos para diffing)

Limitaciones conocidas (léelas antes de confiar ciegamente en el resultado):
- El análisis de Java se hace con regex, NO con un parser AST real.
  Esto significa que casos raros de formato (anotaciones multilínea muy
  atípicas, código generado, comentarios que contienen código de ejemplo)
  pueden generar falsos positivos o negativos.
- La detección de "@Transactional faltante" es HEURÍSTICA: marca métodos
  públicos que llaman a .save/.delete/.deleteById dentro de una clase con
  @Transactional(readOnly = true) a nivel de clase, sin @Transactional propio.
  Revisa manualmente cada hallazgo antes de asumir que es un bug real.
- El cruce con la base de datos requiere un dump de esquema (schema_sql_path
  en el config). Si no existe el archivo, esa sección se omite.
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Falta PyYAML. Instala con: pip install pyyaml --break-system-packages")
    sys.exit(1)


# --------------------------------------------------------------------------
# Utilidades generales
# --------------------------------------------------------------------------

def load_config(config_path: Path) -> dict:
    with open(config_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def read_java_files(root: Path, package: str) -> list[Path]:
    pkg_dir = root / package
    if not pkg_dir.exists():
        return []
    return sorted(pkg_dir.rglob("*.java"))


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def strip_comments(code: str) -> str:
    """Elimina comentarios // y /* */ para reducir falsos positivos en regex."""
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.DOTALL)
    code = re.sub(r"//.*", "", code)
    return code


# --------------------------------------------------------------------------
# Check 1: Entidades planeadas vs. entidades encontradas (+ cruce con BD)
# --------------------------------------------------------------------------

def check_entities(root: Path, config: dict) -> dict:
    entity_files = read_java_files(root, "entity")
    found = {}  # class_name -> {"table": str|None, "file": Path}

    for f in entity_files:
        code = strip_comments(read_text(f))
        class_match = re.search(r"class\s+(\w+)", code)
        if not class_match:
            continue
        class_name = class_match.group(1)
        table_match = re.search(r'@Table\s*\(\s*name\s*=\s*"([^"]+)"', code)
        found[class_name] = {
            "table": table_match.group(1) if table_match else None,
            "file": str(f),
        }

    planned = set(config.get("entities", []))
    found_names = set(found.keys())

    missing = sorted(planned - found_names)   # planeadas, no creadas
    extra = sorted(found_names - planned)     # creadas, no estaban en el plan

    result = {
        "found": found,
        "missing_vs_plan": missing,
        "extra_vs_plan": extra,
    }

    # Cruce opcional con esquema de BD
    schema_path = root.parent.parent.parent.parent.parent / config.get("schema_sql_path", "schema.sql")
    # root apunta a .../src/main/java/com/ikernell/backend -> subir a la raíz del proyecto
    project_root = _find_project_root(root, config)
    schema_path = project_root / config.get("schema_sql_path", "schema.sql")

    if schema_path.exists():
        schema_sql = read_text(schema_path)
        tables = set(re.findall(r'CREATE TABLE\s+(?:IF NOT EXISTS\s+)?"?(\w+)"?', schema_sql, re.IGNORECASE))
        entity_tables = {v["table"] for v in found.values() if v["table"]}
        result["db_cross_check"] = {
            "tables_without_entity": sorted(tables - entity_tables),
            "entities_without_table": sorted(
                [k for k, v in found.items() if v["table"] and v["table"] not in tables]
            ),
            "schema_source": str(schema_path),
        }
    else:
        result["db_cross_check"] = None

    return result


def _find_project_root(source_root: Path, config: dict) -> Path:
    """source_root suele ser <project>/src/main/java/com/ikernell/backend.
    Subimos hasta encontrar pom.xml, o hasta 6 niveles como fallback."""
    current = source_root
    for _ in range(8):
        if (current / "pom.xml").exists():
            return current
        if current.parent == current:
            break
        current = current.parent
    return source_root  # fallback


# --------------------------------------------------------------------------
# Check 2: Controller accede directamente a Repository (violación de capas)
# --------------------------------------------------------------------------

def check_layer_violations(root: Path) -> list[dict]:
    violations = []
    for f in read_java_files(root, "controller"):
        code = strip_comments(read_text(f))
        repo_refs = set(re.findall(r"(\w+Repository)\b", code))
        if repo_refs:
            violations.append({
                "file": str(f),
                "repositories_referenced": sorted(repo_refs),
            })
    return violations


# --------------------------------------------------------------------------
# Check 3: Métodos posiblemente sin @Transactional (heurística)
# --------------------------------------------------------------------------

def check_transactional_gaps(root: Path) -> list[dict]:
    findings = []
    write_calls = re.compile(r"\.(save|saveAndFlush|delete|deleteById|deleteAll)\s*\(")

    for f in read_java_files(root, "service"):
        raw = read_text(f)
        code = strip_comments(raw)

        class_readonly = re.search(r"@Transactional\s*\(\s*readOnly\s*=\s*true\s*\)", code) is not None
        if not class_readonly:
            continue  # solo aplica la heurística a este patrón conocido

        # Partir en métodos de forma aproximada (busca firmas públicas)
        method_pattern = re.compile(
            r"((?:@\w+(?:\([^)]*\))?\s*)*)"          # anotaciones previas (grupo 1)
            r"public\s+[\w<>,\[\]\s]+?\s+(\w+)\s*\([^)]*\)\s*\{",  # firma
        )
        for m in method_pattern.finditer(code):
            annotations, method_name = m.group(1), m.group(2)
            if "@Transactional" in annotations:
                continue  # tiene su propia anotación, no es sospechoso

            # Buscar el cuerpo del método de forma aproximada (hasta la
            # siguiente firma 'public' o fin de archivo) para ver si escribe
            start = m.end()
            next_pub = code.find("public ", start)
            body = code[start: next_pub if next_pub != -1 else len(code)]

            if write_calls.search(body):
                findings.append({
                    "file": str(f),
                    "method": method_name,
                    "reason": "Llama a save/delete sin @Transactional propio, "
                              "dentro de una clase @Transactional(readOnly=true)",
                })

    return findings


# --------------------------------------------------------------------------
# Check 4: Cobertura de @PreAuthorize por controller
# --------------------------------------------------------------------------

def check_preauthorize_coverage(root: Path) -> list[dict]:
    endpoint_annotations = ("@GetMapping", "@PostMapping", "@PutMapping",
                            "@PatchMapping", "@DeleteMapping", "@RequestMapping")
    results = []
    for f in read_java_files(root, "controller"):
        code = strip_comments(read_text(f))
        endpoints = sum(code.count(a) for a in endpoint_annotations)
        # RequestMapping a nivel de clase no cuenta como endpoint individual;
        # se resta 1 si aparece justo antes de "class "
        class_level = len(re.findall(r"@RequestMapping[^\n]*\n\s*(?:public\s+)?class\s", code))
        endpoints = max(endpoints - class_level, 0)
        preauth = code.count("@PreAuthorize")
        coverage = round((preauth / endpoints) * 100, 1) if endpoints else None
        results.append({
            "file": str(f),
            "endpoints": endpoints,
            "preauthorize_count": preauth,
            "coverage_pct": coverage,
        })
    return results


# --------------------------------------------------------------------------
# Check 5: DTO *Request sin Bean Validation
# --------------------------------------------------------------------------

def check_dto_validation(root: Path, config: dict) -> list[dict]:
    suffixes = tuple(config.get("dto_request_suffixes", ["Request"]))
    val_annotations = config.get("validation_annotations", [])
    findings = []

    for f in read_java_files(root, "dto"):
        if not f.stem.endswith(suffixes):
            continue
        code = read_text(f)
        has_validation = any(ann in code for ann in val_annotations)
        if not has_validation:
            findings.append({"file": str(f), "issue": "Sin ninguna anotación de Bean Validation"})

    return findings


# --------------------------------------------------------------------------
# Check 6: catch (Exception e) genérico
# --------------------------------------------------------------------------

def check_generic_catch(root: Path, packages: list[str]) -> list[dict]:
    findings = []
    pattern = re.compile(r"catch\s*\(\s*Exception\s+\w+\s*\)")
    for pkg in packages:
        for f in read_java_files(root, pkg):
            code = strip_comments(read_text(f))
            for i, line in enumerate(code.splitlines(), start=1):
                if pattern.search(line):
                    findings.append({"file": str(f), "line": i})
    return findings


# --------------------------------------------------------------------------
# Check 7: @Data en entidades (debería ser @Getter/@Setter/@Builder)
# --------------------------------------------------------------------------

def check_lombok_entities(root: Path) -> list[dict]:
    findings = []
    for f in read_java_files(root, "entity"):
        code = read_text(f)
        has_data = bool(re.search(r"@Data\b", code))
        has_getter = "@Getter" in code
        has_setter = "@Setter" in code
        has_builder = "@Builder" in code

        if has_data:
            findings.append({
                "file": str(f),
                "issue": "Usa @Data en vez de @Getter/@Setter/@Builder explícitos",
            })
        elif not (has_getter and has_setter):
            findings.append({
                "file": str(f),
                "issue": f"Falta @Getter y/o @Setter explícito "
                         f"(Getter={has_getter}, Setter={has_setter}, Builder={has_builder})",
            })
    return findings


# --------------------------------------------------------------------------
# Snapshot para diffing entre auditorías
# --------------------------------------------------------------------------

def build_snapshot(results: dict) -> dict:
    """Reduce los resultados a listas comparables (para detectar qué cambió)."""
    return {
        "missing_entities": sorted(results["entities"]["missing_vs_plan"]),
        "extra_entities": sorted(results["entities"]["extra_vs_plan"]),
        "layer_violation_files": sorted(v["file"] for v in results["layer_violations"]),
        "transactional_gaps": sorted(
            f"{g['file']}::{g['method']}" for g in results["transactional_gaps"]
        ),
        "generic_catch": sorted(f"{g['file']}:{g['line']}" for g in results["generic_catch"]),
        "lombok_issues": sorted(g["file"] for g in results["lombok_issues"]),
        "dto_validation_issues": sorted(g["file"] for g in results["dto_validation"]),
        "low_preauth_coverage": sorted(
            r["file"] for r in results["preauthorize_coverage"]
            if r["coverage_pct"] is not None and r["coverage_pct"] < 100
        ),
    }


def diff_snapshots(previous: dict, current: dict) -> str:
    lines = []
    for key in current:
        prev_set = set(previous.get(key, []))
        curr_set = set(current.get(key, []))
        added = sorted(curr_set - prev_set)
        resolved = sorted(prev_set - curr_set)
        if not added and not resolved:
            continue
        lines.append(f"### `{key}`")
        if added:
            lines.append("**Nuevos:**")
            lines.extend(f"- 🔴 {x}" for x in added)
        if resolved:
            lines.append("**Resueltos desde la última auditoría:**")
            lines.extend(f"- ✅ {x}" for x in resolved)
        lines.append("")
    return "\n".join(lines) if lines else "_Sin cambios respecto a la auditoría anterior._"


def find_previous_snapshot(history_dir: Path) -> dict | None:
    if not history_dir.exists():
        return None
    snapshots = sorted(history_dir.glob("*.json"))
    if not snapshots:
        return None
    with open(snapshots[-1], "r", encoding="utf-8") as f:
        return json.load(f)


# --------------------------------------------------------------------------
# Reporte Markdown
# --------------------------------------------------------------------------

def _list_or_none(lines: list, items: list, prefix: str, none_text: str = "- (ninguna)"):
    """Agrega ítems con prefijo, o un texto de 'ninguna' si la lista está vacía.
    (Reemplaza el patrón roto `lines.extend(...) or lines.append(...)`,
    que siempre ejecutaba el append porque list.extend() retorna None)."""
    if items:
        lines.extend(f"{prefix} {x}" for x in items)
    else:
        lines.append(none_text)


def render_markdown(config: dict, results: dict, diff_section: str, timestamp: str) -> str:
    lines = []
    lines.append(f"# Auditoría — {config['project']['name']} ({config['project']['version']})")
    lines.append(f"_Generado: {timestamp}_")
    lines.append("")

    # 1. Entidades
    e = results["entities"]
    lines.append("## 1. Entidades: plan vs. implementación")
    lines.append(f"- Planeadas: {len(config.get('entities', []))} | Encontradas: {len(e['found'])}")
    lines.append("")
    lines.append("**Faltantes (planeadas, no creadas):**")
    _list_or_none(lines, e["missing_vs_plan"], "- ❌")
    lines.append("")
    lines.append("**Extra (creadas, no estaban en el plan — confirmar si es intencional):**")
    _list_or_none(lines, e["extra_vs_plan"], "- ⚠️")
    lines.append("")

    if e["db_cross_check"] is None:
        lines.append(f"> Cruce con base de datos omitido: no se encontró "
                      f"`{config.get('schema_sql_path')}`. Genera un dump con "
                      f"`pg_dump --schema-only tu_bd > schema.sql` para habilitarlo.")
    else:
        dbc = e["db_cross_check"]
        lines.append(f"**Cruce con esquema** (`{dbc['schema_source']}`):")
        lines.append("Tablas sin entidad correspondiente:")
        _list_or_none(lines, dbc["tables_without_entity"], "- ❌")
        lines.append("Entidades cuyo @Table no coincide con ninguna tabla real:")
        _list_or_none(lines, dbc["entities_without_table"], "- ❌")
    lines.append("")

    # 2. Violaciones de capas
    lines.append("## 2. Controllers que acceden directo a un Repository")
    if results["layer_violations"]:
        for v in results["layer_violations"]:
            lines.append(f"- ⚠️ `{v['file']}` → {', '.join(v['repositories_referenced'])}")
    else:
        lines.append("- (ninguna detectada)")
    lines.append("")

    # 3. Transactional
    lines.append("## 3. Posibles métodos sin @Transactional (heurística, revisar manualmente)")
    if results["transactional_gaps"]:
        for g in results["transactional_gaps"]:
            lines.append(f"- ⚠️ `{g['file']}` método `{g['method']}` — {g['reason']}")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    # 4. PreAuthorize
    lines.append("## 4. Cobertura de @PreAuthorize por Controller")
    lines.append("| Controller | Endpoints | @PreAuthorize | Cobertura |")
    lines.append("|---|---|---|---|")
    for r in results["preauthorize_coverage"]:
        cov = f"{r['coverage_pct']}%" if r["coverage_pct"] is not None else "N/A (0 endpoints)"
        flag = " 🔴" if (r["coverage_pct"] or 0) < 100 else " ✅"
        lines.append(f"| `{Path(r['file']).name}` | {r['endpoints']} | {r['preauthorize_count']} | {cov}{flag} |")
    lines.append("")

    # 5. DTO validation
    lines.append("## 5. DTOs *Request sin Bean Validation")
    if results["dto_validation"]:
        for d in results["dto_validation"]:
            lines.append(f"- ❌ `{d['file']}` — {d['issue']}")
    else:
        lines.append("- (todos los DTO Request tienen al menos una validación)")
    lines.append("")

    # 6. catch genérico
    lines.append("## 6. `catch (Exception e)` genérico")
    if results["generic_catch"]:
        for g in results["generic_catch"]:
            lines.append(f"- ⚠️ `{g['file']}:{g['line']}`")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    # 7. Lombok
    lines.append("## 7. Entidades: @Data vs @Getter/@Setter/@Builder")
    if results["lombok_issues"]:
        for l in results["lombok_issues"]:
            lines.append(f"- ⚠️ `{l['file']}` — {l['issue']}")
    else:
        lines.append("- (todas las entidades cumplen la convención)")
    lines.append("")

    # 8. Diff
    lines.append("## 8. Cambios desde la última auditoría")
    lines.append(diff_section)
    lines.append("")

    return "\n".join(lines)


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Auditoría estática del backend IKernell V2")
    parser.add_argument("--config", default="audit_config.yaml", help="Ruta al YAML de configuración")
    parser.add_argument("--project-root", default=".", help="Raíz del proyecto Spring Boot")
    args = parser.parse_args()

    project_root = Path(args.project_root).resolve()
    config_path = Path(args.config)
    if not config_path.is_absolute():
        config_path = project_root / config_path

    config = load_config(config_path)
    source_root = project_root / config["source_root"]

    if not source_root.exists():
        print(f"ERROR: no existe {source_root}. Revisa 'source_root' en {config_path}")
        sys.exit(1)

    results = {
        "entities": check_entities(source_root, config),
        "layer_violations": check_layer_violations(source_root),
        "transactional_gaps": check_transactional_gaps(source_root),
        "preauthorize_coverage": check_preauthorize_coverage(source_root),
        "dto_validation": check_dto_validation(source_root, config),
        "generic_catch": check_generic_catch(source_root, config["packages"]),
        "lombok_issues": check_lombok_entities(source_root),
    }

    output_dir = project_root / config.get("output_dir", "audit_output")
    history_dir = project_root / config.get("history_dir", "audit_output/history")
    output_dir.mkdir(parents=True, exist_ok=True)
    history_dir.mkdir(parents=True, exist_ok=True)

    current_snapshot = build_snapshot(results)
    previous_snapshot = find_previous_snapshot(history_dir)
    diff_section = (
        diff_snapshots(previous_snapshot, current_snapshot)
        if previous_snapshot is not None
        else "_Primera auditoría registrada — no hay comparación previa._"
    )

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ts_slug = datetime.now().strftime("%Y%m%d_%H%M%S")

    report = render_markdown(config, results, diff_section, timestamp)

    (output_dir / "latest.md").write_text(report, encoding="utf-8")
    (history_dir / f"{ts_slug}.md").write_text(report, encoding="utf-8")
    (history_dir / f"{ts_slug}.json").write_text(
        json.dumps(current_snapshot, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    print(f"Reporte generado: {output_dir / 'latest.md'}")
    print(f"Histórico guardado en: {history_dir / (ts_slug + '.md')}")


if __name__ == "__main__":
    main()

