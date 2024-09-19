import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/reactapp/dist/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        assetFileNames: "index.css",
      },
    },
  },
});