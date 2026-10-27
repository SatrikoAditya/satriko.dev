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
    Reflect.deleteProperty(document.documentElement, 'animate')
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

  it('measures the radius to the farthest corner from another origin', async () => {
    const ready = Promise.resolve()
    Object.assign(document, {
      startViewTransition: (update: () => void) => {
        update()
        return { ready }
      },
    })
    const animate = vi.fn()
    document.documentElement.animate = animate
    Object.assign(window, { innerWidth: 1000, innerHeight: 800 })

    const { result } = renderHook(() => useThemeTransition())
    await act(async () => {
      result.current.toggleTheme({ x: 800, y: 700 })
      await ready
    })

    // Farthest corner is the top-left: 800 across, 700 down.
    const radius = Math.hypot(800, 700)
    expect(animate).toHaveBeenCalledWith(
      {
        clipPath: [
          'circle(0px at 800px 700px)',
          `circle(${radius}px at 800px 700px)`,
        ],
      },
      expect.anything(),
    )
  })

  it('still changes the theme, and handles the rejection, when the transition is skipped', async () => {
    const unhandled = vi.fn()
    process.on('unhandledRejection', unhandled)
    try {
      Object.assign(document, {
        startViewTransition: (update: () => void) => {
          update()
          // Created here with no handler attached, so only the hook's own .catch can handle it.
          return { ready: Promise.reject(new Error('skipped')) }
        },
      })
      const { result } = renderHook(() => useThemeTransition())
      await act(async () => {
        result.current.toggleTheme()
        // Let microtasks and the unhandled-rejection check (a macrotask) run.
        await new Promise((resolve) => setTimeout(resolve, 20))
      })
      expect(setTheme).toHaveBeenCalledWith('dark')
      expect(unhandled).not.toHaveBeenCalled()
    } finally {
      process.off('unhandledRejection', unhandled)
    }
  })
})
