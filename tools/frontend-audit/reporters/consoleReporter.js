export function printBackendTable(entities) {
    console.table(
        entities.map(entity => ({
            Entidad: entity.name,
            Repository: entity.repository,
            Service: entity.service,
            Controller: entity.controller,
            Endpoints: entity.endpoints.length
        }))
    );
}

export function printCoverageTable(rows) {
    console.table(
        rows.map(r => ({
            Entidad: r.entidad,
            Metodo: r.metodo,
            Path: r.path,
            PreAuthorize: r.preAuthorize,
            "Consumido FE": r.consumidoFE ? "✅" : "❌",
            Fuente: `${r.sourceFile}:${r.line}`
        }))
    );
}

export function printGapsOnly(rows) {
    const gaps = rows.filter(r => !r.consumidoFE);

    if (gaps.length === 0) {
        console.log("\n✅ No hay gaps: todos los endpoints del backend tienen al menos una llamada equivalente en frontend/services.\n");
        return;
    }

    console.log(`\n⚠️  ${gaps.length} endpoint(s) del backend sin consumo detectado en frontend:\n`);
    console.table(
        gaps.map(r => ({
            Entidad: r.entidad,
            Metodo: r.metodo,
            Path: r.path,
            PreAuthorize: r.preAuthorize,
            Fuente: `${r.sourceFile}:${r.line}`
        }))
    );
}

export function printSummary(summary) {
    console.log("\n=======================================");
    console.log(" Resumen de Cobertura");
    console.log("=======================================");
    console.log(`Total endpoints backend: ${summary.total}`);
    console.log(`Consumidos por frontend: ${summary.covered}`);
    console.log(`Gaps detectados:         ${summary.missing}`);
    console.log(`Cobertura:               ${summary.coveragePercent}%\n`);

    if (Object.keys(summary.gapsByEntity).length > 0) {
        console.log("Gaps por entidad:");
        for (const [entity, count] of Object.entries(summary.gapsByEntity)) {
            console.log(`  - ${entity}: ${count}`);
        }
        console.log("");
    }
}

export function printEntityRiskTable(rows) {
    console.log("\n=======================================");
    console.log(" Cruce Service × Ruta por Entidad");
    console.log("=======================================\n");

    console.table(
        rows.map(r => ({
            Entidad: r.entidad,
            "Slug detectado": r.slug,
            Service: r.hasService ? "✅" : "❌",
            Ruta: r.hasRoute ? "✅" : "❌",
            Endpoints: r.endpointsCubiertos,
            Riesgo: r.risk
        }))
    );

    const criticos = rows.filter(r => r.risk.startsWith("⚠️"));
    if (criticos.length > 0) {
        console.log(`\n🔴 ${criticos.length} entidad(es) con riesgo de desincronización service/ruta:\n`);
        criticos.forEach(r => console.log(`  - ${r.entidad}: ${r.risk}`));
        console.log("");
    }
}
