import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  expect: { timeout: 10_000 },
  workers: 1,
  retries: 0,
  reporter: "list",
  use: { actionTimeout: 15_000, navigationTimeout: 20_000, reducedMotion: "reduce", baseURL: "http://127.0.0.1:3100", trace: "off", screenshot: "off", video: "off", launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] } : {} },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"], reducedMotion: "no-preference" } },
  ],
  webServer: [
    { command: "../.venv/bin/python ../scripts/run-e2e-backend.py", url: "http://127.0.0.1:8100/api/health", reuseExistingServer: false },
    { command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3101", url: "http://127.0.0.1:3101", env: { NEXT_TELEMETRY_DISABLED: "1" }, reuseExistingServer: false, timeout: 180_000 },
    { command: "node ../scripts/e2e-gateway.mjs", url: "http://127.0.0.1:3100", reuseExistingServer: false },
  ],
});
