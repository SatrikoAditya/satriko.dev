// @vitest-environment node
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { readArticles } from './articles'

const fixtures = join(process.cwd(), 'src/utils/__fixtures__')

describe('readArticles', () => {
  it('lists published articles newest first', () => {
    expect(readArticles(join(fixtures, 'articles'), false)).toEqual([
      {
        slug: 'second',
        title: 'Second post',
        date: '2026-03-02',
        summary: 'The newer one.',
        tags: [],
        draft: false,
      },
      {
        slug: 'first',
        title: 'First post',
        date: '2026-01-10',
        summary: 'The older one.',
        tags: ['nextjs', 'typescript'],
        draft: false,
      },
    ])
  })
  it('includes drafts when asked (development)', () => {
    expect(
      readArticles(join(fixtures, 'articles'), true).map((a) => a.slug),
    ).toEqual(['secret', 'second', 'first'])
  })
  it('fails loudly on a missing title', () => {
    expect(() => readArticles(join(fixtures, 'bad-articles'), true)).toThrow(
      'untitled.mdx: "title" is required',
    )
  })
  it('returns nothing for a missing folder', () => {
    expect(readArticles(join(fixtures, 'nope'), true)).toEqual([])
  })
})
