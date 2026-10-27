import { defineConfig, devices } from '@playwright/test'

// Set PLAYWRIGHT_BASE_URL to run the suite against a deployment instead of a local server.
const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: externalBaseUrl ?? 'http://localhost:3100',
    trace: 'on-first-retry',
  },
  ...(externalBaseUrl
    ? {}
    : {
        webServer: {
          command: 'yarn build && yarn next start -p 3100',
          url: 'http://localhost:3100',
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
        },
      }),
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
      testIgnore: /mobile|reduced-motion/,
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testMatch: /mobile|a11y/,
    },
    {
      name: 'reduced-motion',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: { reducedMotion: 'reduce' },
      },
      testMatch: /reduced-motion/,
    },
  ],
})
