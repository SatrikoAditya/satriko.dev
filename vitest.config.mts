import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    // server-only throws outside the react-server condition; tests are not server components.
    alias: {
      'server-only': new URL('./vitest.server-only.ts', import.meta.url)
        .pathname,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
})
