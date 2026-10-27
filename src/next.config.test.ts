// @vitest-environment node
import { describe, expect, it } from 'vitest'

import config from '../next.config'

describe('next config', () => {
  it('sends security headers on every path', async () => {
    const rules = await config.headers?.()
    const rule = rules?.find((r) => r.source === '/:path*')
    expect(rule?.headers).toEqual(
      expect.arrayContaining([
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'DENY' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ]),
    )
  })
})
