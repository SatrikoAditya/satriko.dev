'use client'

import Link from 'next/link'

import Container from '@components/atoms/Container'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  return (
    <Container className="py-24">
      <p className="text-muted-foreground font-mono text-xs">Error</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mt-3">
        Please try again. If it keeps happening, email me.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Button className="h-10" onClick={() => retry()}>
          Try again
        </Button>
        <Link
          href="/"
          className="hover:text-brand inline-flex min-h-10 items-center underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </div>
    </Container>
  )
}
