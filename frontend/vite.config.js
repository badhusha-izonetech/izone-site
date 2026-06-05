import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dropConsole = () => ({
  name: "drop-console",
  renderChunk(code) {
    return code
      .replace(/\bconsole\.(log|warn|error|info|debug|trace)\s*\([^)]*\);?/g, "")
      .replace(/\bdebugger;/g, "");
  },
});

export default defineConfig({
  plugins: [react(), dropConsole()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    target: "esnext",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
  },
});
