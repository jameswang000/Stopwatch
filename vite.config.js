import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Stopwatch/",
  plugins: [react()],
  test: { globals: true, environment: "jsdom", setupFiles: "./tests/setup.js" },
});
