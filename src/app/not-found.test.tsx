import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NotFound from './not-found'

describe('not found page', () => {
  it('offers links to the main pages', () => {
    render(<NotFound />)
    for (const [name, href] of [
      ['Home', '/'],
      ['Projects', '/projects'],
      ['Writing', '/writing'],
    ])
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })
})
