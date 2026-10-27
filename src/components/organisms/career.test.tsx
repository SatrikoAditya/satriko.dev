import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CompanyChip from '@components/molecules/CompanyChip'
import EducationSection from '@components/organisms/EducationSection'
import ExperienceSection from '@components/organisms/ExperienceSection'

describe('ExperienceSection', () => {
  it('lists the four roles newest first with their dates', () => {
    render(<ExperienceSection />)
    const items = within(
      screen.getByRole('list', { name: 'Work experience' }),
    ).getAllByRole('listitem', { name: /.+/ })
    expect(items.map((li) => li.getAttribute('aria-label'))).toEqual([
      'Full Stack Developer at Jitera',
      'Software Engineer at Charcentric',
      'Full Stack Developer at PT Immobi Solusi Prima',
      'Information Technology Support Engineer at Institut Pertanian Bogor (IPB) University',
    ])
    expect(within(items[0]).getByText(/Oct 2024 – Present/)).toBeInTheDocument()
  })
  it('keeps soft skills out of the tech chips and the internship short', () => {
    render(<ExperienceSection />)
    expect(
      screen.queryByText('Presentation and Public Speaking'),
    ).not.toBeInTheDocument()
    const ipb = screen.getByRole('listitem', {
      name: /at Institut Pertanian Bogor/,
    })
    expect(within(ipb).getAllByRole('listitem')).toHaveLength(1)
  })
})

describe('CompanyChip', () => {
  it("shows the company's initial when there is no logo", () => {
    render(<CompanyChip name="Jitera" logo={null} />)
    expect(screen.getByText('J')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Jitera')).toBeInTheDocument()
  })
})

describe('EducationSection', () => {
  it('lists the three schools and the Hacktiv8 honors', () => {
    render(<EducationSection />)
    for (const name of [
      'BINUS (Bina Nusantara) University',
      'Hacktiv8',
      'SMK Negeri 3 Bogor',
    ])
      expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByText('Honors')).toBeInTheDocument()
  })
})
