import { describe, expect, it } from 'vitest'

import robots from './robots'
import sitemap from './sitemap'

describe('sitemap', () => {
  it('lists the main pages on satriko.dev', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(urls).toEqual(
      expect.arrayContaining([
        'https://satriko.dev',
        'https://satriko.dev/projects',
        'https://satriko.dev/writing',
      ]),
    )
  })
})

describe('robots', () => {
  it('allows everything and points at the sitemap', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://satriko.dev/sitemap.xml',
      host: 'https://satriko.dev',
    })
  })
})
