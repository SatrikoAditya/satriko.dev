'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'fallback'>('idle')
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('no clipboard')
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      setState('fallback')
    }
    setTimeout(() => setState('idle'), 2500)
  }
  return (
    <span className="inline-flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="size-10"
        onClick={copy}
        aria-label="Copy email"
      >
        {state === 'copied' ? (
          <Check className="size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
      <span role="status" className="text-muted-foreground text-sm">
        {state === 'copied'
          ? 'Copied!'
          : state === 'fallback'
            ? 'Select the address and press ⌘/Ctrl+C'
            : ''}
      </span>
    </span>
  )
}
