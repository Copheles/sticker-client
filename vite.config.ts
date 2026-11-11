import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Always treat `client/` as the project root (even if vite is started elsewhere)
  root: rootDir,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "@tanstack/react-query",
      "axios",
      "lucide-react",
      "react",
      "react-dom",
      "react-router-dom",
    ],
  },
  server: {
    port: 5174,
    fs: {
      allow: [rootDir],
    },
  },
});
