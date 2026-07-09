import fs from "node:fs";
import path from "node:path";

import { PATHS } from "../config.js";

function today() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

export function writeCoverageReport(rows, summary, riskRows) {
    if (!fs.existsSync(PATHS.output)) {
        fs.mkdirSync(PATHS.output, { recursive: true });
    }

    const gaps = rows.filter(r => !r.consumidoFE);

    let md = `# Reporte de Cobertura Frontend — IKernell\n\n`;
    md += `**Fecha:** ${new Date().toISOString()}\n\n`;
    md += `## Resumen\n\n`;
    md += `- Total endpoints backend: **${summary.total}**\n`;
    md += `- Consumidos por frontend: **${summary.covered}**\n`;
    md += `- Gaps detectados: **${summary.missing}**\n`;
    md += `- Cobertura: **${summary.coveragePercent}%**\n\n`;

    if (riskRows && riskRows.length > 0) {
        md += `## Cruce Service × Ruta por Entidad\n\n`;
        md += `| Entidad | Slug | Service | Ruta | Endpoints | Riesgo |\n`;
        md += `|---|---|---|---|---|---|\n`;
        for (const r of riskRows) {
            md += `| ${r.entidad} | ${r.slug} | ${r.hasService ? "✅" : "❌"} | ${r.hasRoute ? "✅" : "❌"} | ${r.endpointsCubiertos} | ${r.risk} |\n`;
        }
        md += `\n`;

        const criticos = riskRows.filter(r => r.risk.startsWith("⚠️"));
        if (criticos.length > 0) {
            md += `### 🔴 Riesgos de desincronización\n\n`;
            for (const c of criticos) {
                md += `- **${c.entidad}**: ${c.risk}\n`;
            }
            md += `\n`;
        }
    }

    if (gaps.length > 0) {
        md += `## Gaps por entidad\n\n`;
        for (const [entity, count] of Object.entries(summary.gapsByEntity)) {
            md += `- ${entity}: ${count}\n`;
        }
        md += `\n## Detalle de gaps\n\n`;
        md += `| Entidad | Método | Path | PreAuthorize | Fuente |\n`;
        md += `|---|---|---|---|---|\n`;
        for (const g of gaps) {
            md += `| ${g.entidad} | ${g.metodo} | \`${g.path}\` | ${g.preAuthorize} | ${g.sourceFile}:${g.line} |\n`;
        }
    } else {
        md += `## ✅ Sin gaps\n\nTodos los endpoints tienen consumo detectado en frontend.\n`;
    }

    md += `\n## Detalle completo\n\n`;
    md += `| Entidad | Método | Path | Consumido FE |\n`;
    md += `|---|---|---|---|\n`;
    for (const r of rows) {
        md += `| ${r.entidad} | ${r.metodo} | \`${r.path}\` | ${r.consumidoFE ? "✅" : "❌"} |\n`;
    }

    const filePath = path.join(PATHS.output, `coverage-${today()}.md`);
    fs.writeFileSync(filePath, md, "utf-8");

    return filePath;
}
