import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "../..");

export const PATHS = {

    backend: path.join(ROOT, "ikernell-backend"),

    frontend: path.join(ROOT, "ikernell-frontend"),

    output: path.join(__dirname, "output")
};

export const EXCLUDED_DIRECTORIES = [

    ".git",
    ".idea",
    ".vscode",

    "node_modules",

    "target",
    "dist",
    "build",

    ".mvn",

    "coverage"

];
