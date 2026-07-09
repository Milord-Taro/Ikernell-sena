import path from "node:path";

import { scanBackend } from "./scanners/backendScanner.js";
import { scanFrontendCalls, scanFrontendRoutes } from "./scanners/frontendScanner.js";
import { scanFiles } from "./scanners/fileScanner.js";
import { analyzeEndpointCoverage, summarizeCoverage } from "./analyzers/coverageAnalyzer.js";
import { analyzeEntityRisk } from "./analyzers/entityRiskAnalyzer.js";
import { printBackendTable, printGapsOnly, printSummary, printEntityRiskTable } from "./reporters/consoleReporter.js";
import { writeCoverageReport } from "./reporters/markdownReporter.js";
import { PATHS } from "./config.js";

console.log("=======================================");
console.log(" IKernell Frontend Coverage Audit");
console.log("=======================================\n");

const backend = scanBackend();
printBackendTable(backend);

const serviceFiles = scanFiles(PATHS.frontend).filter(
    f => f.includes(`${path.sep}services${path.sep}`) && (f.endsWith(".ts") || f.endsWith(".tsx"))
);
console.log("\nArchivos encontrados en services/:");
serviceFiles.forEach(f => console.log(`  - ${f}`));

const frontendCalls = scanFrontendCalls();
const frontendRoutes = scanFrontendRoutes();

console.log("Rutas detalladas:", frontendRoutes);

console.log(`\nLlamadas detectadas en frontend/services: ${frontendCalls.length}`);
console.log(`Rutas registradas en frontend router: ${frontendRoutes.length}`);

const coverageRows = analyzeEndpointCoverage(backend, frontendCalls);
const summary = summarizeCoverage(coverageRows);

printGapsOnly(coverageRows);
printSummary(summary);

const riskRows = analyzeEntityRisk(backend, coverageRows, frontendRoutes);
printEntityRiskTable(riskRows);

const reportPath = writeCoverageReport(coverageRows, summary, riskRows);
console.log(`📄 Reporte guardado en: ${reportPath}\n`);

export const ROUTE_SLUG_EXCEPTIONS = {
    // Clave: nombre de la entidad backend (debe coincidir EXACTAMENTE con
    // el nombre de la clase, ej. "Usuario", "MensajeContacto").
    // Valor: el slug real usado en las rutas del frontend, si difiere
    // del que se derivaría automáticamente del path del backend.
    //
    // Ejemplo: si el backend expone /api/mensajes-contacto pero decides
    // nombrar la ruta del frontend /dashboard/mensajes (más corto):
    // MensajeContacto: "mensajes",
};
