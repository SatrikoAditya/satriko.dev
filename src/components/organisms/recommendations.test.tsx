import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

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
  afterEach(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollHeight')
    Reflect.deleteProperty(HTMLElement.prototype, 'clientHeight')
  })
  // jsdom has no layout, so fake the measurements the component reads.
  const measure = (scrollHeight: number, clientHeight: number) => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: scrollHeight,
    })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: clientHeight,
    })
  }

  it('expands and collapses clamped text', async () => {
    measure(200, 100)
    render(<ReadMore id="r1" paragraphs={['One.', 'Two.']} />)
    const button = await screen.findByRole('button', { name: 'Read more' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Show less' }))
    expect(screen.getByRole('button', { name: 'Read more' })).toBeVisible()
  })
  it('shows no toggle when the text fits', () => {
    measure(100, 100)
    render(<ReadMore id="r4" paragraphs={['Short.']} toggleOnTextClick />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('Short.')).not.toHaveClass('cursor-pointer')
  })
  it('ignores text clicks unless opted in', async () => {
    measure(200, 100)
    render(<ReadMore id="r2" paragraphs={['One.']} />)
    await screen.findByRole('button', { name: 'Read more' })
    const text = screen.getByText('One.')
    expect(text).toHaveClass('line-clamp-5')
    await userEvent.click(text)
    expect(text).toHaveClass('line-clamp-5')
  })
  it('can clamp to other lines and toggle from the text', async () => {
    measure(200, 100)
    render(
      <ReadMore
        id="r3"
        paragraphs={['One.']}
        clampClassName="line-clamp-3"
        toggleOnTextClick
      />,
    )
    await screen.findByRole('button', { name: 'Read more' })
    const text = screen.getByText('One.')
    expect(text).toHaveClass('line-clamp-3')
    await userEvent.click(text)
    expect(text).not.toHaveClass('line-clamp-3')
    expect(screen.getByRole('button', { name: 'Show less' })).toBeVisible()
  })
})
