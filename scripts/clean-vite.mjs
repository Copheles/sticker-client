import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteCache = path.join(clientRoot, "node_modules", ".vite");

fs.rmSync(viteCache, { recursive: true, force: true });
console.log("[client] Cleared Vite cache:", viteCache);
