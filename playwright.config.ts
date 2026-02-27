import { defineConfig, devices } from "@playwright/test";

type EnvironmentName = "dev" | "staging" | "prod";

const envName = (process.env.TEST_ENV ?? "dev") as EnvironmentName;

const environments: Record<
  EnvironmentName,
  { baseURL: string; retries: number }
> = {
  dev: {
    baseURL: "https://demowebshop.tricentis.com/",
    retries: 0,
  },
  staging: {
    baseURL: "https://demowebshop.tricentis.com/",
    retries: 1,
  },
  prod: {
    baseURL: "https://demowebshop.tricentis.com/",
    retries: 2,
  },
};

const selectedEnvironment = environments[envName] ?? environments.dev;

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : selectedEnvironment.retries,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    baseURL: process.env.BASE_URL ?? selectedEnvironment.baseURL,
    trace: "on-first-retry",
    video: "retain-on-failure",
    extraHTTPHeaders: {
      "x-test-environment": envName,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
