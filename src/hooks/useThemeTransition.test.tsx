import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useThemeTransition } from './useThemeTransition'

const setTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme }),
}))

const reducedMotion = (reduce: boolean) =>
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches: reduce && query.includes('prefers-reduced-motion: reduce'),
        media: query,
      }) as MediaQueryList,
  )

describe('useThemeTransition', () => {
  beforeEach(() => {
    setTheme.mockClear()
    reducedMotion(false)
  })
  afterEach(() => {
    vi.restoreAllMocks()
    Reflect.deleteProperty(document, 'startViewTransition')
  })

  it('switches instantly without the View Transitions API', () => {
    const { result } = renderHook(() => useThemeTransition())
    act(() => result.current.toggleTheme())
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('switches instantly when the visitor prefers reduced motion', () => {
    reducedMotion(true)
    const startViewTransition = vi.fn()
    Object.assign(document, { startViewTransition })
    const { result } = renderHook(() => useThemeTransition())
    act(() => result.current.toggleTheme({ x: 10, y: 20 }))
    expect(setTheme).toHaveBeenCalledWith('dark')
    expect(startViewTransition).not.toHaveBeenCalled()
  })

  it('reveals a circle from the origin inside a view transition', async () => {
    const ready = Promise.resolve()
    const startViewTransition = vi.fn((update: () => void) => {
      update()
      return { ready }
    })
    Object.assign(document, { startViewTransition })
    const animate = vi.fn()
    document.documentElement.animate = animate
    Object.assign(window, { innerWidth: 1000, innerHeight: 800 })

    const { result } = renderHook(() => useThemeTransition())
    await act(async () => {
      result.current.toggleTheme({ x: 100, y: 50 })
      await ready
    })

    expect(setTheme).toHaveBeenCalledWith('dark')
    const radius = Math.hypot(900, 750)
    expect(animate).toHaveBeenCalledWith(
      {
        clipPath: [
          'circle(0px at 100px 50px)',
          `circle(${radius}px at 100px 50px)`,
        ],
      },
      expect.objectContaining({ pseudoElement: '::view-transition-new(root)' }),
    )
  })

  it('still changes the theme when the transition is skipped', async () => {
    const ready = Promise.reject(new Error('skipped'))
    ready.catch(() => {})
    Object.assign(document, {
      startViewTransition: (update: () => void) => {
        update()
        return { ready }
      },
    })
    const { result } = renderHook(() => useThemeTransition())
    await act(async () => {
      result.current.toggleTheme()
      await ready.catch(() => {})
    })
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
