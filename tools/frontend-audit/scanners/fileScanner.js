import fs from "node:fs";
import path from "node:path";

import { EXCLUDED_DIRECTORIES } from "../config.js";

/**
 * Recorre recursivamente un directorio y devuelve
 * la lista completa de archivos encontrados.
 */
export function scanFiles(directory) {

    const files = [];

    walk(directory, files);

    return files;
}

function walk(currentPath, files) {

    const entries = fs.readdirSync(currentPath, {
        withFileTypes: true,
    });

    for (const entry of entries) {

        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {

		    if (EXCLUDED_DIRECTORIES.includes(entry.name)) {
			   continue;
		    }

		    walk(fullPath, files);
		    continue;
		}

        files.push(fullPath);
    }

}
