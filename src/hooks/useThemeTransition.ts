'use client'

import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'

type Origin = { x: number; y: number }

const DURATION_MS = 450

/**
 * Switches between light and dark with a circular reveal that grows from `origin`
 * (the viewport centre by default). Falls back to an instant switch when the
 * View Transitions API is missing or the visitor prefers reduced motion.
 */
export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = useCallback(
    (origin?: Origin) => {
      const next = resolvedTheme === 'dark' ? 'light' : 'dark'
      const canAnimate =
        'startViewTransition' in document &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!canAnimate) {
        setTheme(next)
        return
      }

      const x = origin?.x ?? window.innerWidth / 2
      const y = origin?.y ?? window.innerHeight / 2
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      try {
        // flushSync makes React commit the new theme before the browser takes the "after" snapshot.
        const transition = document.startViewTransition(() => {
          flushSync(() => setTheme(next))
        })
        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${radius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: DURATION_MS,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
              },
            )
          })
          // A skipped transition still switches the theme, so there is nothing to recover.
          .catch(() => {})
      } catch {
        setTheme(next)
      }
    },
    [resolvedTheme, setTheme],
  )

  return { resolvedTheme, toggleTheme }
}
