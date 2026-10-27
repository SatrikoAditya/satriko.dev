import type { Metadata } from 'next'
import Link from 'next/link'

import Container from '@components/atoms/Container'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
]

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-muted-foreground font-mono text-xs">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="text-muted-foreground mt-3">
        It may have moved. Try the{' '}
        <Link
          href="/"
          className="text-foreground -my-2.5 inline-flex min-h-10 items-center underline underline-offset-4"
        >
          home page
        </Link>
        .
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-brand inline-flex min-h-10 items-center underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
