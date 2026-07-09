import fs from "node:fs";
import path from "node:path";

import { PATHS } from "../config.js";
import { scanFiles } from "./fileScanner.js";

const CALL_REGEX = /\b(?:api|axios|http|apiClient)\.(get|post|put|patch|delete)(?:<[^>]*>)?\(\s*[`'"]([^`'"]*)[`'"]/g;
const ROUTE_REGEX = /<Route\s+path=["']([^"']+)["']/g;

function normalizeTemplatePath(p) {
    return ("/" + p.replace(/\$\{[^}]+\}/g, "{param}"))
        .replace(/\/+/g, "/")
        .replace(/\/$/, "") || "/";
}

export function scanFrontendCalls() {
    if (!fs.existsSync(PATHS.frontend)) return [];

    const files = scanFiles(PATHS.frontend).filter(
        f => f.includes(`${path.sep}services${path.sep}`) && (f.endsWith(".ts") || f.endsWith(".tsx"))
    );

    const calls = [];

    for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        for (const match of content.matchAll(CALL_REGEX)) {
            calls.push({
                method: match[1].toUpperCase(),
                path: normalizeTemplatePath(match[2]),
                sourceFile: path.basename(file)
            });
        }
    }

    return calls;
}

// scanners/frontendScanner.js — reemplaza scanFrontendRoutes()

export function scanFrontendRoutes() {
    if (!fs.existsSync(PATHS.frontend)) return [];

    const files = scanFiles(PATHS.frontend).filter(
        f => f.endsWith(".tsx") || f.endsWith(".ts")
    );

    const routes = [];

    for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        if (!content.includes("<Route")) continue; // filtro rápido antes del regex

        for (const match of content.matchAll(ROUTE_REGEX)) {
            routes.push({
                path: match[1],
                sourceFile: path.basename(file)
            });
        }
    }

    return routes;
}
