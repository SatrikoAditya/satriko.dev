import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import CopyEmailButton from '@components/molecules/CopyEmailButton'
import SiteFooter from '@components/organisms/SiteFooter'
import SiteNav from '@components/organisms/SiteNav'
import Providers from '@components/templates/providers'

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))

describe('SiteNav', () => {
  it('links to the home sections and the writing page', () => {
    render(
      <Providers>
        <SiteNav />
      </Providers>,
    )
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const [name, href] of [
      ['About', '/#about'],
      ['Experience', '/#experience'],
      ['Projects', '/#projects'],
      ['Writing', '/writing'],
    ])
      expect(
        Array.from(nav.querySelectorAll('a')).find(
          (a) => a.textContent === name,
        ),
      ).toHaveAttribute('href', href)
    expect(
      screen.getByRole('button', { name: 'Toggle theme' }),
    ).toBeInTheDocument()
  })

  it('has a photo avatar home link', () => {
    render(
      <Providers>
        <SiteNav />
      </Providers>,
    )
    const home = screen.getByRole('link', { name: 'Satriko Aditya, home' })
    expect(home).toHaveAttribute('href', '/')
    expect(home.querySelector('img')).not.toBeNull()
  })
})

describe('SiteFooter', () => {
  it('shows the email and every contact link', () => {
    render(<SiteFooter />)
    expect(
      screen.getByRole('link', { name: 'satrikoaditya@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:satrikoaditya@gmail.com')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/satriko-aditya-0313631ab/',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/SatrikoAditya',
    )
    expect(screen.getByRole('link', { name: 'Résumé' })).toHaveAttribute(
      'href',
      '/resume/Satriko-Aditya-Resume.pdf',
    )
    expect(
      screen.getByRole('link', { name: /visit my room/i }),
    ).toHaveAttribute('href', 'https://room.satriko.dev')
  })
})

describe('CopyEmailButton', () => {
  it('copies the email and says so', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<CopyEmailButton email="a@b.co" />)
    await userEvent.click(screen.getByRole('button', { name: 'Copy email' }))
    expect(writeText).toHaveBeenCalledWith('a@b.co')
    expect(screen.getByRole('status')).toHaveTextContent('Copied!')
  })
})
