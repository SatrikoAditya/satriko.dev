'use client'

import { useEffect, useRef, useState } from 'react'

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
  // False on the server and until measured, so a fitting text never flashes a toggle.
  const [isClamped, setIsClamped] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el || open) return
    const measure = () => setIsClamped(el.scrollHeight > el.clientHeight + 1)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [open, clampClassName, paragraphs])

  const canToggle = isClamped || open
  const toggle = () => setOpen((o) => !o)
  return (
    <div>
      {/* One element so line-clamp works across paragraphs. */}
      <p
        id={id}
        ref={textRef}
        onClick={
          toggleOnTextClick && canToggle
            ? () => {
                // Let people select text without it collapsing underneath them.
                if (window.getSelection()?.toString()) return
                toggle()
              }
            : undefined
        }
        className={cn(
          'text-sm leading-relaxed whitespace-pre-line',
          toggleOnTextClick && canToggle && 'cursor-pointer',
          !open && clampClassName,
          className,
        )}
      >
        {paragraphs.join('\n\n')}
      </p>
      {canToggle && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={toggle}
          className="hover:text-brand -mt-0.5 inline-flex min-h-10 items-center text-sm font-medium transition-colors"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
