#!/usr/bin/env python3
"""
audit_backend.py — Auditoría estática reutilizable para el backend IKernell V2.

Uso:
    python3 tools/audit_backend.py [--config audit_config.yaml] [--project-root .]

Genera:
    <output_dir>/latest.md                 (reporte legible)
    <history_dir>/audit_<timestamp>.md     (copia histórica)
    <history_dir>/audit_<timestamp>.json   (snapshot de datos para diffing)

Limitaciones conocidas (léelas antes de confiar ciegamente en el resultado):
- El análisis de Java se hace con regex, NO con un parser AST real.
  Esto significa que casos raros de formato (anotaciones multilínea muy
  atípicas, código generado, comentarios que contienen código de ejemplo)
  pueden generar falsos positivos o negativos.
- La detección de "@Transactional faltante" es HEURÍSTICA: marca métodos
  públicos que llaman a .save/.delete/.deleteById dentro de una clase con
  @Transactional(readOnly = true) a nivel de clase, sin @Transactional propio.
  Revisa manualmente cada hallazgo antes de asumir que es un bug real.
- "check_enum_candidates" es una heurística basada en palabras clave de
  nombre de columna (configurables en enum_candidate_keywords). No sabe
  leer el CHECK constraint real de la base de datos — solo sugiere dónde
  mirar. Un falso positivo aquí no es grave: peor es no revisar.
- El cruce con la base de datos requiere un dump de esquema (schema_sql_path
  en el config). Si no existe el archivo, esa sección se omite.
"""

import argparse
import json
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


def _find_project_root(source_root: Path, config: dict) -> Path:
    """source_root suele ser <project>/src/main/java/com/ikernell/backend.
    Subimos hasta encontrar pom.xml, o hasta 8 niveles como fallback."""
    current = source_root
    for _ in range(8):
        if (current / "pom.xml").exists():
            return current
        if current.parent == current:
            break
        current = current.parent
    return source_root  # fallback


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

    missing = sorted(planned - found_names)
    extra = sorted(found_names - planned)

    result = {
        "found": found,
        "missing_vs_plan": missing,
        "extra_vs_plan": extra,
    }

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
            continue

        method_pattern = re.compile(
            r"((?:@\w+(?:\([^)]*\))?\s*)*)"
            r"public\s+[\w<>,\[\]\s]+?\s+(\w+)\s*\([^)]*\)\s*\{",
        )
        for m in method_pattern.finditer(code):
            annotations, method_name = m.group(1), m.group(2)
            if "@Transactional" in annotations:
                continue

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
# Check 4: Cobertura de @PreAuthorize por controller (+ excepciones aceptadas)
# --------------------------------------------------------------------------

def check_preauthorize_coverage(root: Path, config: dict) -> list[dict]:
    endpoint_annotations = ("@GetMapping", "@PostMapping", "@PutMapping",
                            "@PatchMapping", "@DeleteMapping", "@RequestMapping")
    exceptions = config.get("preauthorize_exceptions", {}) or {}
    results = []

    for f in read_java_files(root, "controller"):
        code = strip_comments(read_text(f))
        endpoints = sum(code.count(a) for a in endpoint_annotations)
        class_level_reqmap = len(re.findall(r"@RequestMapping[^\n]*\n\s*(?:public\s+)?class\s", code))
        endpoints = max(endpoints - class_level_reqmap, 0)

        total_preauth = code.count("@PreAuthorize")

        class_decl_match = re.search(r"\bclass\s+\w+", code)
        class_level_preauth = False
        if class_decl_match:
            before_class = code[: class_decl_match.start()]
            last_import = list(re.finditer(r"^\s*import\s+[^\n]+;", before_class, re.MULTILINE))
            annotation_region = before_class[last_import[-1].end():] if last_import else before_class
            class_level_preauth = "@PreAuthorize" in annotation_region

        filename = Path(f).name
        accepted_exception = filename in exceptions

        if class_level_preauth:
            coverage = 100.0 if endpoints else None
            note = "Protegido a nivel de clase (cubre todos los endpoints)"
        elif accepted_exception:
            coverage = round((total_preauth / endpoints) * 100, 1) if endpoints else None
            note = f"Excepción aceptada: {exceptions[filename]}"
        else:
            coverage = round((total_preauth / endpoints) * 100, 1) if endpoints else None
            note = None

        results.append({
            "file": str(f),
            "endpoints": endpoints,
            "preauthorize_count": total_preauth,
            "class_level_preauth": class_level_preauth,
            "accepted_exception": accepted_exception,
            "coverage_pct": coverage,
            "note": note,
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
# Check 8 (NUEVO): candidatos a enum+AttributeConverter no detectados
# --------------------------------------------------------------------------

FIELD_PATTERN = re.compile(
    r"((?:@\w+(?:\([^)]*\))?\s*)*)"
    r"private\s+(\w+)\s+(\w+)\s*;"
)


def check_enum_candidates(root: Path, config: dict) -> list[dict]:
    """
    Heurística: busca campos String en entidades cuya columna (o nombre de
    campo, si no hay @Column explícito) SEA EXACTAMENTE una de las palabras
    clave configuradas (ej. 'estado', 'tipo', 'prioridad') -- no basta con
    que la contenga como substring, para no disparar falsos positivos en
    nombres compuestos como 'codigo_tipo_error' (que contiene "tipo" pero
    no es una columna de estado/catálogo). Y que NO tengan @Convert.
    """
    keywords = {k.lower() for k in config.get("enum_candidate_keywords", [])}
    findings = []
    if not keywords:
        return findings

    for f in read_java_files(root, "entity"):
        code = strip_comments(read_text(f))
        for m in FIELD_PATTERN.finditer(code):
            annotations, field_type, field_name = m.groups()

            col_name_match = re.search(r'@Column\s*\([^)]*name\s*=\s*"([^"]+)"', annotations)
            column_name = col_name_match.group(1) if col_name_match else field_name

            if column_name.lower() not in keywords:
                continue
            if field_type != "String":
                continue
            if "@Convert" in annotations:
                continue

            findings.append({
                "file": str(f),
                "field": field_name,
                "column": column_name,
                "issue": (
                    f"Columna/campo '{column_name}' coincide EXACTAMENTE con una palabra "
                    f"clave de tipo catálogo/estado, pero el campo Java es String plano "
                    f"sin @Convert. Si el CHECK constraint real tiene tildes o espacios, "
                    f"probablemente necesites enum + AttributeConverter "
                    f"(ver EstadoProyecto/EstadoProyectoConverter como ejemplo)."
                ),
            })
    return findings


# --------------------------------------------------------------------------
# Check 9 (NUEVO): DTOs *Response que exponen campos sensibles
# --------------------------------------------------------------------------

def check_sensitive_exposure(root: Path, config: dict) -> list[dict]:
    keywords = [k.lower() for k in config.get(
        "sensitive_response_keywords",
        ["contrasena", "password", "hashcontrasena", "clave"],
    )]
    findings = []

    for f in read_java_files(root, "dto"):
        if not f.stem.endswith("Response"):
            continue
        code = strip_comments(read_text(f))
        for m in re.finditer(r"private\s+\w+\s+(\w+)\s*;", code):
            field_name = m.group(1)
            if any(kw in field_name.lower() for kw in keywords):
                findings.append({
                    "file": str(f),
                    "field": field_name,
                    "issue": f"Expone un campo llamado '{field_name}' que suena a dato "
                             f"sensible. Confirma que sea intencional.",
                })
    return findings


# --------------------------------------------------------------------------
# Check 10 (NUEVO): secretos hardcodeados en application*.properties
# --------------------------------------------------------------------------

def check_hardcoded_secrets(project_root: Path, config: dict) -> list[dict]:
    keywords = [k.lower() for k in config.get(
        "secret_keywords", ["password", "secret", "contrasena"],
    )]
    props_dir = project_root / config.get("properties_path", "src/main/resources")
    findings = []
    if not props_dir.exists():
        return findings

    for f in sorted(props_dir.glob("application*.properties")):
        for i, line in enumerate(read_text(f).splitlines(), start=1):
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or "=" not in stripped:
                continue
            key, _, value = stripped.partition("=")
            key_l = key.strip().lower()
            value = value.strip()
            if any(kw in key_l for kw in keywords) and value and not value.startswith("${"):
                findings.append({
                    "file": str(f),
                    "line": i,
                    "issue": f"'{key.strip()}' tiene un valor literal en vez de "
                             f"'${{VARIABLE_DE_ENTORNO}}'. Revisa que no sea un secreto real.",
                })
    return findings


# --------------------------------------------------------------------------
# Check 11 (NUEVO): @RequestBody de un *Request sin @Valid
# --------------------------------------------------------------------------

def check_missing_valid(root: Path, config: dict) -> list[dict]:
    suffixes = tuple(config.get("dto_request_suffixes", ["Request"]))
    findings = []

    method_sig_pattern = re.compile(
        r"@(?:PostMapping|PutMapping|PatchMapping)[^\n]*\n"
        r"(?:\s*@\w+(?:\([^)]*\))?\s*\n)*"
        r"\s*public\s+[^{;]*?\(([^)]*)\)\s*\{",
    )

    for f in read_java_files(root, "controller"):
        code = strip_comments(read_text(f))
        for m in method_sig_pattern.finditer(code):
            params = m.group(1)
            for suffix in suffixes:
                req_match = re.search(rf"@RequestBody\s+(\w+{suffix})\s+\w+", params)
                if req_match and "@Valid" not in params:
                    findings.append({
                        "file": str(f),
                        "dto": req_match.group(1),
                        "issue": f"Recibe {req_match.group(1)} con @RequestBody pero sin "
                                 f"@Valid: las validaciones del DTO no se ejecutarían.",
                    })
    return findings


# --------------------------------------------------------------------------
# Check 12 (NUEVO): componentes de seguridad requeridos, presencia real
# --------------------------------------------------------------------------

def check_required_security(root: Path, config: dict) -> list[dict]:
    required = config.get("required_security", [])
    findings = []
    if not required:
        return findings

    existing_stems = {f.stem for f in root.rglob("*.java")}
    for name in required:
        if name not in existing_stems:
            findings.append({
                "name": name,
                "issue": f"No se encontró ningún archivo {name}.java en el proyecto.",
            })
    return findings


# --------------------------------------------------------------------------
# Check 13 (NUEVO): marcadores de trabajo pendiente dejados en comentarios
# --------------------------------------------------------------------------

def check_pending_markers(root: Path, packages: list[str], config: dict) -> list[dict]:
    """
    Busca marcadores como TODO/FIXME/PENDIENTE/ALCANCE ACTUAL en CUALQUIER
    línea (a propósito NO se usa strip_comments aquí: estos marcadores
    viven precisamente dentro de comentarios/Javadoc). Sirve para no
    perder de vista decisiones de alcance recortado que se dejaron
    documentadas en el código pero nunca en un checklist central.
    """
    markers = config.get("pending_markers", ["TODO", "FIXME", "PENDIENTE", "ALCANCE ACTUAL"])
    findings = []

    for pkg in packages:
        for f in read_java_files(root, pkg):
            for i, line in enumerate(read_text(f).splitlines(), start=1):
                for marker in markers:
                    if marker in line:
                        findings.append({
                            "file": str(f),
                            "line": i,
                            "marker": marker,
                            "text": line.strip(),
                        })
                        break  # una línea cuenta una sola vez aunque matchee varios marcadores

    return findings


# --------------------------------------------------------------------------
# Snapshot para diffing entre auditorías
# --------------------------------------------------------------------------

def build_snapshot(results: dict) -> dict:
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
            if r["coverage_pct"] is not None
            and r["coverage_pct"] < 100
            and not r.get("accepted_exception")
        ),
        "enum_candidates": sorted(
            f"{g['file']}::{g['field']}" for g in results["enum_candidates"]
        ),
        "sensitive_exposure": sorted(
            f"{g['file']}::{g['field']}" for g in results["sensitive_exposure"]
        ),
        "hardcoded_secrets": sorted(
            f"{g['file']}:{g['line']}" for g in results["hardcoded_secrets"]
        ),
        "missing_valid": sorted(
            f"{g['file']}::{g['dto']}" for g in results["missing_valid"]
        ),
        "missing_security_files": sorted(g["name"] for g in results["required_security"]),
        "pending_markers": sorted(
            f"{g['file']}:{g['line']}" for g in results["pending_markers"]
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
    if items:
        lines.extend(f"{prefix} {x}" for x in items)
    else:
        lines.append(none_text)


def render_markdown(config: dict, results: dict, diff_section: str, timestamp: str) -> str:
    lines = []
    lines.append(f"# Auditoría — {config['project']['name']} ({config['project']['version']})")
    lines.append(f"_Generado: {timestamp}_")
    lines.append("")

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

    lines.append("## 2. Controllers que acceden directo a un Repository")
    if results["layer_violations"]:
        for v in results["layer_violations"]:
            lines.append(f"- ⚠️ `{v['file']}` → {', '.join(v['repositories_referenced'])}")
    else:
        lines.append("- (ninguna detectada)")
    lines.append("")

    lines.append("## 3. Posibles métodos sin @Transactional (heurística, revisar manualmente)")
    if results["transactional_gaps"]:
        for g in results["transactional_gaps"]:
            lines.append(f"- ⚠️ `{g['file']}` método `{g['method']}` — {g['reason']}")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    lines.append("## 4. Cobertura de @PreAuthorize por Controller")
    lines.append("| Controller | Endpoints | @PreAuthorize | Cobertura | Nota |")
    lines.append("|---|---|---|---|---|")
    for r in results["preauthorize_coverage"]:
        cov = f"{r['coverage_pct']}%" if r["coverage_pct"] is not None else "N/A (0 endpoints)"
        is_ok = r["class_level_preauth"] or r.get("accepted_exception") or (r["coverage_pct"] or 0) >= 100
        flag = " ✅" if is_ok else " 🔴"
        note = r.get("note") or ""
        lines.append(f"| `{Path(r['file']).name}` | {r['endpoints']} | {r['preauthorize_count']} | {cov}{flag} | {note} |")
    lines.append("")

    lines.append("## 5. DTOs *Request sin Bean Validation")
    if results["dto_validation"]:
        for d in results["dto_validation"]:
            lines.append(f"- ❌ `{d['file']}` — {d['issue']}")
    else:
        lines.append("- (todos los DTO Request tienen al menos una validación)")
    lines.append("")

    lines.append("## 6. `catch (Exception e)` genérico")
    if results["generic_catch"]:
        for g in results["generic_catch"]:
            lines.append(f"- ⚠️ `{g['file']}:{g['line']}`")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    lines.append("## 7. Entidades: @Data vs @Getter/@Setter/@Builder")
    if results["lombok_issues"]:
        for l in results["lombok_issues"]:
            lines.append(f"- ⚠️ `{l['file']}` — {l['issue']}")
    else:
        lines.append("- (todas las entidades cumplen la convención)")
    lines.append("")

    lines.append("## 8. Posibles candidatos a enum + AttributeConverter no resueltos")
    if results["enum_candidates"]:
        for g in results["enum_candidates"]:
            lines.append(f"- ⚠️ `{g['file']}` campo `{g['field']}` — {g['issue']}")
    else:
        lines.append("- (ninguno detectado con las palabras clave configuradas)")
    lines.append("")

    lines.append("## 9. DTOs *Response que exponen campos sensibles")
    if results["sensitive_exposure"]:
        for g in results["sensitive_exposure"]:
            lines.append(f"- 🔴 `{g['file']}` campo `{g['field']}` — {g['issue']}")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    lines.append("## 10. Posibles secretos hardcodeados en application*.properties")
    if results["hardcoded_secrets"]:
        for g in results["hardcoded_secrets"]:
            lines.append(f"- 🔴 `{g['file']}:{g['line']}` — {g['issue']}")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    lines.append("## 11. `@RequestBody` de un *Request sin `@Valid`")
    if results["missing_valid"]:
        for g in results["missing_valid"]:
            lines.append(f"- 🔴 `{g['file']}` — {g['issue']}")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    lines.append("## 12. Componentes de seguridad requeridos")
    if results["required_security"]:
        for g in results["required_security"]:
            lines.append(f"- ❌ `{g['name']}` — {g['issue']}")
    else:
        lines.append("- (todos los componentes requeridos están presentes)")
    lines.append("")

    lines.append("## 13. Marcadores de trabajo pendiente (TODO/FIXME/ALCANCE ACTUAL)")
    if results["pending_markers"]:
        for g in results["pending_markers"]:
            lines.append(f"- 📝 `{g['file']}:{g['line']}` (`{g['marker']}`) — {g['text']}")
    else:
        lines.append("- (ninguno detectado)")
    lines.append("")

    lines.append("## 14. Cambios desde la última auditoría")
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
        "preauthorize_coverage": check_preauthorize_coverage(source_root, config),
        "dto_validation": check_dto_validation(source_root, config),
        "generic_catch": check_generic_catch(source_root, config["packages"]),
        "lombok_issues": check_lombok_entities(source_root),
        "enum_candidates": check_enum_candidates(source_root, config),
        "sensitive_exposure": check_sensitive_exposure(source_root, config),
        "hardcoded_secrets": check_hardcoded_secrets(project_root, config),
        "missing_valid": check_missing_valid(source_root, config),
        "required_security": check_required_security(source_root, config),
        "pending_markers": check_pending_markers(source_root, config["packages"], config),
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
    (history_dir / f"audit_{ts_slug}.md").write_text(report, encoding="utf-8")
    (history_dir / f"audit_{ts_slug}.json").write_text(
        json.dumps(current_snapshot, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    print(f"Reporte generado: {output_dir / 'latest.md'}")
    print(f"Histórico guardado en: {history_dir / ('audit_' + ts_slug + '.md')}")


if __name__ == "__main__":
    main()