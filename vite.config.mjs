import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react({jsxRuntime: "classic"})],
  server: {host: "127.0.0.1", port: 3010, strictPort: true},
  preview: {host: "127.0.0.1", port: 4173, strictPort: true},
  test: {
    environment: "jsdom",
    setupFiles: ["./src/testSetup.js"],
    clearMocks: true,
    restoreMocks: true
  }
});
