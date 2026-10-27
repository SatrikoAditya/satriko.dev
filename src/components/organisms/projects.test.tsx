import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ProjectCard from '@components/molecules/ProjectCard'
import ProjectsSection from '@components/organisms/ProjectsSection'

import { projects } from '@content/projects'

describe('ProjectsSection', () => {
  it('shows the four featured projects and links to all', () => {
    render(<ProjectsSection />)
    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual([
      "Satriko's Room",
      'Sativa Trip Indonesia',
      'DataX Pipeline Builder',
      'ProGen',
    ])
    expect(screen.getByRole('link', { name: /view all/i })).toHaveAttribute(
      'href',
      '/projects',
    )
  })
})

describe('ProjectsSection cards', () => {
  it('links a live project to its site in a new tab', () => {
    render(<ProjectsSection />)
    const link = screen.getByRole('link', { name: /sativa trip indonesia/i })
    expect(link).toHaveAttribute('href', 'https://sativatripindonesia.com/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(link).toHaveTextContent('(opens in a new tab)')
  })
  it('links a project without a live site to its /projects card', () => {
    render(<ProjectsSection />)
    const link = screen.getByRole('link', { name: /datax pipeline builder/i })
    expect(link).toHaveAttribute('href', '/projects#datax-pipeline-builder')
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveTextContent('(opens in a new tab)')
  })
  it('gives home card links concise accessible names', () => {
    render(<ProjectsSection />)
    expect(
      screen.getByRole('link', {
        name: 'Sativa Trip Indonesia (opens in a new tab)',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'DataX Pipeline Builder' }),
    ).toBeInTheDocument()
  })
  it('describes home card links with their summary', () => {
    render(<ProjectsSection />)
    const link = screen.getByRole('link', { name: 'DataX Pipeline Builder' })
    const summary = projects.find(
      (p) => p.id === 'datax-pipeline-builder',
    )!.summary
    expect(link).toHaveAccessibleDescription(summary)
  })
  it('has no interactive elements nested inside a card link', () => {
    render(<ProjectsSection />)
    for (const name of [/sativa trip indonesia/i, /datax pipeline builder/i]) {
      const link = screen.getByRole('link', { name })
      expect(link.querySelectorAll('a, button, input')).toHaveLength(0)
    }
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
