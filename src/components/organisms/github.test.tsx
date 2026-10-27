import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GithubActivityView } from '@components/organisms/GithubActivity'

describe('GithubActivityView', () => {
  it('draws one square per day and the total', () => {
    const { container } = render(
      <GithubActivityView
        calendar={{
          total: 1234,
          weeks: [
            [
              { date: '2026-10-25', count: 0, level: 0 },
              { date: '2026-10-26', count: 3, level: 2 },
            ],
          ],
        }}
      />,
    )
    expect(
      screen.getByRole('img', { name: '1234 contributions in the last year' }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('rect')).toHaveLength(2)
    expect(
      screen.getByText('1,234 contributions in the last year'),
    ).toBeInTheDocument()
  })
  it('falls back to a profile link without data', () => {
    render(<GithubActivityView calendar={null} />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/SatrikoAditya',
    )
  })
})
