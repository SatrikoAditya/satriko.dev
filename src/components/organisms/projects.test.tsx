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
  it('falls back to a title tile without a screenshot', () => {
    render(
      <ProjectCard project={{ ...projects[0], screenshot: null, links: [] }} />,
    )
    expect(screen.queryByText('Live')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
