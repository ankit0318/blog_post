import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to ensure _redirects is copied to the build output
    {
      name: "copy-redirects",
      closeBundle() {
        // This will run after the build is complete
        const publicRedirectsPath = resolve(__dirname, "public", "_redirects");
        const outputRedirectsPath = resolve(__dirname, "dist", "_redirects");

        // Check if the file exists in public and copy it
        if (fs.existsSync(publicRedirectsPath)) {
          fs.copyFileSync(publicRedirectsPath, outputRedirectsPath);
          console.log("✓ _redirects file copied to build output");
        } else {
          console.warn("⚠ _redirects file not found in public directory");
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    outDir: "dist",
  },
  publicDir: "public",
});
