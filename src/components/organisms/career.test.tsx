import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CompanyChip from '@components/molecules/CompanyChip'
import EducationSection from '@components/organisms/EducationSection'
import ExperienceSection from '@components/organisms/ExperienceSection'

describe('ExperienceSection', () => {
  it('lists the three roles newest first with their dates', () => {
    render(<ExperienceSection />)
    const items = within(
      screen.getByRole('list', { name: 'Work experience' }),
    ).getAllByRole('listitem', { name: /.+/ })
    expect(items.map((li) => li.getAttribute('aria-label'))).toEqual([
      'Full Stack Developer at Jitera',
      'Software Engineer at Charcentric',
      'Full Stack Developer at PT Immobi Solusi Prima',
    ])
    expect(
      within(items[0]).getByText(/Oct 2024 – Oct 2026/),
    ).toBeInTheDocument()
  })
  it('keeps soft skills out of the tech chips', () => {
    render(<ExperienceSection />)
    expect(
      screen.queryByText('Presentation and Public Speaking'),
    ).not.toBeInTheDocument()
  })
})

describe('CompanyChip', () => {
  it("shows the company's initial when there is no logo", () => {
    render(<CompanyChip name="Jitera" logo={null} />)
    expect(screen.getByText('J')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Jitera')).toBeInTheDocument()
  })
  it('shows the logo image instead of the initial tile', () => {
    const { container } = render(
      <CompanyChip name="Jitera" logo="/images/companies/jitera.svg" />,
    )
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.getAttribute('alt')).toBe('')
    expect(img?.getAttribute('src')).toContain('jitera.svg')
    expect(screen.queryByText('J')).toBeNull()
  })
})

describe('EducationSection', () => {
  it('lists the three schools', () => {
    render(<EducationSection />)
    for (const name of [
      'BINUS (Bina Nusantara) University',
      'Hacktiv8',
      'SMK Negeri 3 Bogor',
    ])
      expect(screen.getByText(name)).toBeInTheDocument()
  })
})
