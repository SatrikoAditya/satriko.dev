'use client'

import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useThemeTransition } from '@hooks/useThemeTransition'

export default function ThemeToggle() {
  const { toggleTheme } = useThemeTransition()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-10"
      aria-label="Toggle theme"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }}
    >
      {/* Both icons render; CSS shows the right one, so there's no hydration flash. */}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  )
}
