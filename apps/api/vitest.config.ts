import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      reporter: ["text", "html"],
      thresholds: { statements: 80, branches: 70, functions: 80, lines: 80 },
      exclude: ["dist/**", "prisma/**", "src/server.ts"]
    }
  }
});
