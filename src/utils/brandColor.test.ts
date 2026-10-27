import { describe, expect, it } from 'vitest'

import { brandColor } from './brandColor'

describe('brandColor', () => {
  it('keeps a mid-tone brand colour in both themes', () => {
    expect(brandColor('3178C6')).toEqual({ light: '#3178C6', dark: '#3178C6' })
  })
  it('falls back to the text colour for near-black brands in dark mode', () => {
    expect(brandColor('000000')).toEqual({
      light: '#000000',
      dark: 'var(--foreground)',
    })
  })
  it('falls back to the text colour for near-white brands in light mode', () => {
    expect(brandColor('FFFFFF')).toEqual({
      light: 'var(--foreground)',
      dark: '#FFFFFF',
    })
  })
})
