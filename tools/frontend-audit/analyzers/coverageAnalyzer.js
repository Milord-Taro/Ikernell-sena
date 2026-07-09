function stripApiPrefix(p) {
    return p.replace(/^\/api(?=\/|$)/, "") || "/";
}

function normalizeForCompare(p) {
    return stripApiPrefix(p.replace(/\{[^}]+\}/g, "{param}"));
}

function pathsMatch(a, b) {
    return normalizeForCompare(a) === normalizeForCompare(b);
}

export function analyzeEndpointCoverage(backendEntities, frontendCalls) {
    const rows = [];

    for (const entity of backendEntities) {
        for (const ep of entity.endpoints) {
            const consumed = frontendCalls.some(
                call => call.method === ep.method && pathsMatch(call.path, ep.path)
            );

            rows.push({
                entidad: entity.name,
                metodo: ep.method,
                path: ep.path,
                preAuthorize: ep.preAuthorize || "—",
                consumidoFE: consumed,
                sourceFile: ep.sourceFile,
                line: ep.line
            });
        }
    }

    return rows;
}

export function summarizeCoverage(rows) {
    const total = rows.length;
    const covered = rows.filter(r => r.consumidoFE).length;
    const gaps = rows.filter(r => !r.consumidoFE);

    const gapsByEntity = {};
    for (const gap of gaps) {
        gapsByEntity[gap.entidad] = (gapsByEntity[gap.entidad] || 0) + 1;
    }

    return {
        total,
        covered,
        missing: total - covered,
        coveragePercent: total === 0 ? 0 : Math.round((covered / total) * 100),
        gaps,
        gapsByEntity
    };
}
