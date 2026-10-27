import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ErrorPage from './error'

describe('error page', () => {
  it('explains the problem and lets people retry', async () => {
    const retry = vi.fn()
    render(<ErrorPage error={new Error('boom')} retry={retry} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })

  it('links back to the home page', () => {
    render(<ErrorPage error={new Error('boom')} retry={vi.fn()} />)
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
