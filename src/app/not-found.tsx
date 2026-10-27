import Link from 'next/link'

import Container from '@components/atoms/Container'

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-muted-foreground font-mono text-xs">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="text-muted-foreground mt-3">
        It may have moved. Try the{' '}
        <Link href="/" className="text-foreground underline underline-offset-4">
          home page
        </Link>
        .
      </p>
    </Container>
  )
}
