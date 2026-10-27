import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import ReadMore from '@components/molecules/ReadMore'
import RecommendationsSection from '@components/organisms/RecommendationsSection'

describe('RecommendationsSection', () => {
  it('shows each recommender and links to LinkedIn', () => {
    render(<RecommendationsSection />)
    expect(screen.getByText('Amjad Ali')).toBeInTheDocument()
    expect(screen.getByText('Gilang Pratama')).toBeInTheDocument()
    // ICU 78 (Node 24) abbreviates en-GB September as "Sept".
    expect(screen.getByText(/30 Sept? 2024/)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /view on linkedin/i }),
    ).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/satriko-aditya-0313631ab/details/recommendations/',
    )
  })
})

describe('ReadMore', () => {
  it('expands and collapses the text', async () => {
    render(<ReadMore id="r1" paragraphs={['One.', 'Two.']} />)
    const button = screen.getByRole('button', { name: 'Read more' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
