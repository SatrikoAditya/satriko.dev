import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import ProjectCard from '@components/molecules/ProjectCard'
import ProjectsSection from '@components/organisms/ProjectsSection'

import { projects } from '@content/projects'

describe('ProjectsSection', () => {
  it('shows the four featured projects and links to all', () => {
    render(<ProjectsSection />)
    expect(
      screen
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent?.replace(/\s*\(opens in a new tab\)↗$/, '')),
    ).toEqual([
      'Club Wonder',
      "Satriko's Room",
      'Sativa Trip Indonesia',
      'DataX Pipeline Builder',
    ])
    expect(screen.getByRole('link', { name: /view all/i })).toHaveAttribute(
      'href',
      '/projects',
    )
  })
})

describe('ProjectsSection cards', () => {
  it('links a live project name to its site in a new tab', () => {
    render(<ProjectsSection />)
    const link = screen.getByRole('link', {
      name: 'Sativa Trip Indonesia (opens in a new tab)',
    })
    expect(link).toHaveAttribute('href', 'https://sativatripindonesia.com/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
  })
  it('links a project without a live site to its /projects card', () => {
    render(<ProjectsSection />)
    const link = screen.getByRole('link', { name: 'DataX Pipeline Builder' })
    expect(link).toHaveAttribute('href', '/projects#datax-pipeline-builder')
    expect(link).not.toHaveAttribute('target')
  })
  it('keeps one focusable link per card, with the screenshot link out of the tab order', () => {
    const { container } = render(<ProjectsSection />)
    for (const article of container.querySelectorAll('article')) {
      const links = [...article.querySelectorAll('a')]
      expect(links).toHaveLength(2)
      const [image, name] = links
      expect(image).toHaveAttribute('href', name.getAttribute('href'))
      expect(image).toHaveAttribute('aria-hidden', 'true')
      expect(image).toHaveAttribute('tabindex', '-1')
      expect(name).not.toHaveAttribute('tabindex')
      expect(name).not.toHaveAttribute('aria-hidden')
    }
    // Hidden image links do not show up as links.
    expect(
      screen.getAllByRole('link', { name: /Club Wonder|Sativa|DataX|Room/ }),
    ).toHaveLength(4)
  })
  it('expands and collapses a clamped description in place without navigating', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 200,
    })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 100,
    })
    try {
      render(<ProjectsSection />)
      const sativa = projects.find((p) => p.id === 'sativa-trip-indonesia')!
      const text = screen.getByText(sativa.summary)
      expect(text).toHaveClass('line-clamp-3')
      const button = (
        await screen.findAllByRole('button', { name: 'Read more' })
      ).find((b) => b.getAttribute('aria-controls') === text.id)!
      expect(button).toHaveAttribute('aria-controls', text.id)
      await userEvent.click(text)
      expect(text).not.toHaveClass('line-clamp-3')
      expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute(
        'aria-expanded',
        'true',
      )
      await userEvent.click(screen.getByRole('button', { name: 'Show less' }))
      expect(text).toHaveClass('line-clamp-3')
      expect(button).toHaveTextContent('Read more')
      // Neither the text nor the button sits inside a link.
      expect(text.closest('a')).toBeNull()
      expect(button.closest('a')).toBeNull()
    } finally {
      Reflect.deleteProperty(HTMLElement.prototype, 'scrollHeight')
      Reflect.deleteProperty(HTMLElement.prototype, 'clientHeight')
    }
  })
  it('shows no toggle on a card whose description fits', () => {
    render(<ProjectsSection />)
    expect(screen.queryByRole('button', { name: /read more/i })).toBeNull()
  })
})

describe('ProjectCard', () => {
  it('marks live projects and shows tech and links when detailed', () => {
    const sativa = projects.find((p) => p.id === 'sativa-trip-indonesia')!
    render(<ProjectCard project={sativa} detailed />)
    expect(screen.getByText('Live')).toBeInTheDocument()
    expect(screen.getByText('next-intl')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visit site/i })).toHaveAttribute(
      'href',
      'https://sativatripindonesia.com/',
    )
  })
  it('detailed cards carry an id so /projects#id lands on them', () => {
    const sativa = projects.find((p) => p.id === 'sativa-trip-indonesia')!
    const { container } = render(<ProjectCard project={sativa} detailed />)
    expect(container.querySelector('article')).toHaveAttribute(
      'id',
      'sativa-trip-indonesia',
    )
  })
  it('falls back to a title tile without a screenshot', () => {
    render(
      <ProjectCard project={{ ...projects[0], screenshot: null, links: [] }} />,
    )
    expect(screen.queryByText('Live')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
