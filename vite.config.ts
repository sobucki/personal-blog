import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup-tests.js",
    coverage: {
      provider: "v8",
      exclude: [
        "**/types.ts",
        "**/*.d.ts",
        "**/__tests__/**",
        "**/node_modules/**",
        "**/.eslintrc.cjs",
        "src/main.tsx",
      ],
    },
  },
});
