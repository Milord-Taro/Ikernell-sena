import { ROUTE_SLUG_EXCEPTIONS } from "../config.js";

function deriveSlug(entityName, entityEndpoints) {
    if (ROUTE_SLUG_EXCEPTIONS[entityName]) {
        return ROUTE_SLUG_EXCEPTIONS[entityName];
    }

    if (entityEndpoints.length === 0) return null;

    const basePath = entityEndpoints[0].path
        .replace(/^\/api\//, "")
        .split("/")[0];

    return basePath || null;
}

export function analyzeEntityRisk(backendEntities, coverageRows, frontendRoutes) {
    const rows = [];

    for (const entity of backendEntities) {
        const entityCoverage = coverageRows.filter(r => r.entidad === entity.name);
        const totalEndpoints = entityCoverage.length;
        const coveredEndpoints = entityCoverage.filter(r => r.consumidoFE).length;
        const hasService = coveredEndpoints > 0;

        const slug = deriveSlug(entity.name, entity.endpoints);
        const hasRoute = slug
            ? frontendRoutes.some(r => r.path.toLowerCase().includes(slug.toLowerCase()))
            : false;

        let risk = "—";
        if (hasService && !hasRoute) risk = "⚠️ Service sin ruta (inalcanzable desde UI)";
        else if (!hasService && hasRoute) risk = "⚠️ Ruta sin service (pantalla sin datos)";
        else if (!hasService && !hasRoute) risk = "⏳ Pendiente (sin service ni ruta)";
        else if (hasService && hasRoute && coveredEndpoints < totalEndpoints) risk = "🟡 Parcial (faltan endpoints)";
        else if (hasService && hasRoute && coveredEndpoints === totalEndpoints) risk = "✅ Completo";

        rows.push({
            entidad: entity.name,
            slug: slug || "?",
            hasService,
            hasRoute,
            endpointsCubiertos: `${coveredEndpoints}/${totalEndpoints}`,
            risk
        });
    }

    return rows;
}
