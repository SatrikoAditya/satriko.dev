import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Providers from '@components/templates/providers'

import CommandPalette from '.'

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

const renderPalette = (
  articles: { slug: string; title: string }[] = [
    { slug: 'hello', title: 'Hello post' },
  ],
) =>
  render(
    <Providers>
      <CommandPalette articles={articles} />
    </Providers>,
  )

describe('CommandPalette', () => {
  it('opens with Ctrl+K and navigates to a section', async () => {
    renderPalette()
    await userEvent.keyboard('{Control>}k{/Control}')
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Experience'))
    expect(push).toHaveBeenCalledWith('/#experience')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
  })
  it('lists articles and copies the email', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    renderPalette()
    await userEvent.click(
      screen.getByRole('button', { name: /open command menu/i }),
    )
    await userEvent.click(screen.getByText('Hello post'))
    expect(push).toHaveBeenCalledWith('/writing/hello')
    await userEvent.click(
      screen.getByRole('button', { name: /open command menu/i }),
    )
    await userEvent.click(screen.getByText('Copy email'))
    expect(writeText).toHaveBeenCalledWith('satrikoaditya@gmail.com')
    expect(await screen.findByText('Copied!')).toBeInTheDocument()
  })
  it('lists the Writing shortcut only when there are articles', async () => {
    const { unmount } = renderPalette()
    await userEvent.keyboard('{Control>}k{/Control}')
    expect(await screen.findByText('Writing')).toBeInTheDocument()
    unmount()
    renderPalette([])
    await userEvent.keyboard('{Control>}k{/Control}')
    expect(await screen.findByText('Experience')).toBeInTheDocument()
    expect(screen.queryByText('Writing')).not.toBeInTheDocument()
  })
})
