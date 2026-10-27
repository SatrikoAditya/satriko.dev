import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import AboutSection from '@components/organisms/AboutSection'
import Hero from '@components/organisms/Hero'
import StackSection from '@components/organisms/StackSection'

afterEach(() => vi.useRealTimers())

describe('Hero', () => {
  it('leads with the name, title, status and contact actions', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: "Hi, I'm Satriko Aditya" }),
    ).toBeInTheDocument()
    expect(screen.getByText('Full Stack Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Open to work & collaboration')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute(
      'href',
      'mailto:satrikoaditya@gmail.com',
    )
    expect(screen.getByRole('link', { name: /résumé/i })).toHaveAttribute(
      'href',
      '/resume/Satriko-Aditya-Resume.pdf',
    )
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  })
  it('shows the current time in Bogor', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-10-27T09:20:00Z'))
    render(<Hero />)
    expect(await screen.findByText('16:20')).toBeInTheDocument()
  })
})

describe('intro sections', () => {
  it('renders the about paragraphs and every stack logo', () => {
    render(
      <>
        <AboutSection />
        <StackSection />
      </>,
    )
    expect(
      screen.getByText(/Full Stack Software Engineer with 5\+ years/),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'TypeScript' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Next.js' })).toBeInTheDocument()
  })
})
