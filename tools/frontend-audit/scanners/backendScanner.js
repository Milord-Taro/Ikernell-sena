import path from "node:path";
import fs from "node:fs";

import { PATHS } from "../config.js";
import { scanFiles } from "./fileScanner.js";

const MAPPING_REGEX = /@(Get|Post|Put|Patch|Delete)Mapping(?:\(\s*(?:value\s*=\s*)?"([^"]*)"\s*\))?/;
const CLASS_MAPPING_REGEX = /@RequestMapping\(\s*(?:value\s*=\s*)?"([^"]*)"\s*\)/;
const PREAUTHORIZE_REGEX = /@PreAuthorize\(\s*"([^"]*)"\s*\)/;

function normalizePath(p) {
    return ("/" + p).replace(/\/+/g, "/").replace(/\/$/, "") || "/";
}

export function extractEndpoints(controllerFilePath) {
    if (!controllerFilePath || !fs.existsSync(controllerFilePath)) return [];

    const content = fs.readFileSync(controllerFilePath, "utf-8");
    const lines = content.split("\n");

    const basePathMatch = content.match(CLASS_MAPPING_REGEX);
    const basePath = basePathMatch ? basePathMatch[1] : "";

    const endpoints = [];

    for (let i = 0; i < lines.length; i++) {
        const mappingMatch = lines[i].match(MAPPING_REGEX);
        if (!mappingMatch) continue;

        const method = mappingMatch[1].toUpperCase();
        const subPath = mappingMatch[2] || "";

        // Busca @PreAuthorize hacia atrás, hasta encontrar otra anotación de mapping
        // o la firma del método anterior (máx 5 líneas de lookback)
        let preAuthorize = null;
        for (let j = i - 1; j >= 0 && j >= i - 5; j--) {
            if (MAPPING_REGEX.test(lines[j])) break;
            const paMatch = lines[j].match(PREAUTHORIZE_REGEX);
            if (paMatch) {
                preAuthorize = paMatch[1];
                break;
            }
        }

        endpoints.push({
            method,
            path: normalizePath(basePath + subPath),
            preAuthorize,
            sourceFile: path.basename(controllerFilePath),
            line: i + 1
        });
    }

    return endpoints;
}

export function scanBackend() {
    const files = scanFiles(PATHS.backend);
    const entities = [];
    const entityMap = new Map();

    for (const file of files) {
        if (!file.includes(`${path.sep}entity${path.sep}`)) continue;
        if (!file.endsWith(".java")) continue;

        const fileName = path.basename(file);
        if (fileName === "package-info.java") continue;
        if (fileName.startsWith("Base")) continue;

        const entity = {
            name: path.basename(file, ".java"),
            entityFile: file,
            repository: false,
            service: false,
            controller: false,
            controllerFile: null,
            endpoints: []
        };

        entities.push(entity);
        entityMap.set(entity.name, entity);
    }

    for (const file of files) {
        const fileName = path.basename(file);

        for (const entity of entities) {
            if (fileName === `${entity.name}Repository.java`) {
                entity.repository = true;
            }
            if (fileName === `${entity.name}Service.java`) {
                entity.service = true;
            }
            if (fileName === `${entity.name}Controller.java`) {
                entity.controller = true;
                entity.controllerFile = file;
            }
        }
    }

    for (const entity of entities) {
        if (entity.controller) {
            entity.endpoints = extractEndpoints(entity.controllerFile);
        }
    }

    return entities.sort((a, b) => a.name.localeCompare(b.name));
}
