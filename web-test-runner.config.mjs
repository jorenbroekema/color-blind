import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  nodeResolve: true,
  files: ["test/**/*.test.js"],
  coverageConfig: {
    report: true,
    reportDir: "coverage",
    threshold: {
      statements: 94,
      branches: 73,
      functions: 100,
      lines: 94,
    },
  },
  browsers: [
    playwrightLauncher({
      product: "chromium",
    }),
  ],
};
