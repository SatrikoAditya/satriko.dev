import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import NotFound from './not-found'

const { readArticles } = vi.hoisted(() => ({ readArticles: vi.fn() }))
vi.mock('@utils/articles', () => ({ readArticles }))

describe('not found page', () => {
  beforeEach(() => {
    readArticles.mockReturnValue([{ slug: 'hello' }])
  })

  it('offers links to the main pages', () => {
    render(<NotFound />)
    for (const [name, href] of [
      ['Home', '/'],
      ['Projects', '/projects'],
      ['Writing', '/writing'],
    ])
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })

  it('leaves out Writing while there are no published articles', () => {
    readArticles.mockReturnValue([])
    render(<NotFound />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    )
    expect(screen.queryByRole('link', { name: 'Writing' })).toBeNull()
  })
})
