import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import LatestWriting from '@components/organisms/LatestWriting'

import type { IArticle } from '@models/article'

const article = (n: number): IArticle => ({
  slug: `post-${n}`,
  title: `Post ${n}`,
  date: `2026-0${n}-01`,
  summary: `Summary ${n}`,
  tags: [],
  draft: false,
})

describe('LatestWriting', () => {
  it('renders nothing without articles', () => {
    const { container } = render(<LatestWriting articles={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('shows the three newest and links to all articles', () => {
    render(<LatestWriting articles={[4, 3, 2, 1].map(article)} />)
    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual(['Post 4', 'Post 3', 'Post 2'])
    expect(screen.getByRole('link', { name: /post 4/i })).toHaveAttribute(
      'href',
      '/writing/post-4',
    )
    expect(screen.getByRole('link', { name: /all articles/i })).toHaveAttribute(
      'href',
      '/writing',
    )
  })
})
