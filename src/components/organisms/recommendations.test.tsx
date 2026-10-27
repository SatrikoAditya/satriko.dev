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
    expect(screen.getByText('30 Sep 2024')).toBeInTheDocument()
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
  it('keeps the default clamp and ignores text clicks unless opted in', async () => {
    render(<ReadMore id="r2" paragraphs={['One.']} />)
    const text = screen.getByText('One.')
    expect(text).toHaveClass('line-clamp-5')
    await userEvent.click(text)
    expect(text).toHaveClass('line-clamp-5')
  })
  it('can clamp to other lines and toggle from the text', async () => {
    render(
      <ReadMore
        id="r3"
        paragraphs={['One.']}
        clampClassName="line-clamp-3"
        toggleOnTextClick
      />,
    )
    const text = screen.getByText('One.')
    expect(text).toHaveClass('line-clamp-3')
    await userEvent.click(text)
    expect(text).not.toHaveClass('line-clamp-3')
    expect(screen.getByRole('button', { name: 'Show less' })).toBeVisible()
  })
})
