'use client'

import { useState } from 'react'

import { cn } from '@components/shadcn/utils'

export default function ReadMore({
  id,
  paragraphs,
}: {
  id: string
  paragraphs: readonly string[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* One element so line-clamp works across paragraphs. */}
      <p
        id={id}
        className={cn(
          'text-sm leading-relaxed whitespace-pre-line',
          !open && 'line-clamp-5',
        )}
      >
        {paragraphs.join('\n\n')}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="hover:text-brand mt-2 text-sm font-medium transition-colors"
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </div>
  )
}
