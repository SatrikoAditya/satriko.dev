import { beforeEach, describe, expect, it, vi } from 'vitest'

import robots from './robots'
import sitemap from './sitemap'

const { readArticles } = vi.hoisted(() => ({ readArticles: vi.fn() }))
vi.mock('@utils/articles', () => ({ readArticles }))

const article = {
  slug: 'hello',
  title: 'Hello',
  date: '2026-01-10',
  summary: 's',
  tags: [],
  draft: false,
}

describe('sitemap', () => {
  beforeEach(() => {
    readArticles.mockReturnValue([article])
  })

  it('omits /writing while there are no published articles', () => {
    readArticles.mockReturnValue([])
    const urls = sitemap().map((entry) => entry.url)
    expect(urls).toEqual([
      'https://satriko.dev',
      'https://satriko.dev/projects',
    ])
  })

  it('lists the main pages on satriko.dev', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(urls).toEqual(
      expect.arrayContaining([
        'https://satriko.dev',
        'https://satriko.dev/projects',
        'https://satriko.dev/writing',
        'https://satriko.dev/writing/hello',
      ]),
    )
  })

  it('dates every entry', () => {
    for (const entry of sitemap()) {
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
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
