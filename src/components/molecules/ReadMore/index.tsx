'use client'

import { useState } from 'react'

import { cn } from '@components/shadcn/utils'

export default function ReadMore({
  id,
  paragraphs,
  clampClassName = 'line-clamp-5',
  className,
  toggleOnTextClick = false,
}: {
  id: string
  paragraphs: readonly string[]
  /** Tailwind line-clamp class applied while collapsed. */
  clampClassName?: string
  /** Extra classes for the text, e.g. a colour. */
  className?: string
  /** Also toggle when the text is clicked or tapped (the button stays the keyboard control). */
  toggleOnTextClick?: boolean
}) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)
  return (
    <div>
      {/* One element so line-clamp works across paragraphs. */}
      <p
        id={id}
        onClick={
          toggleOnTextClick
            ? () => {
                // Let people select text without it collapsing underneath them.
                if (window.getSelection()?.toString()) return
                toggle()
              }
            : undefined
        }
        className={cn(
          'text-sm leading-relaxed whitespace-pre-line',
          toggleOnTextClick && 'cursor-pointer',
          !open && clampClassName,
          className,
        )}
      >
        {paragraphs.join('\n\n')}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="hover:text-brand -mt-0.5 inline-flex min-h-10 items-center text-sm font-medium transition-colors"
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </div>
  )
}
