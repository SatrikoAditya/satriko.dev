import Image from 'next/image'
import Link from 'next/link'

import Container from '@components/atoms/Container'
import ThemeToggle from '@components/molecules/ThemeToggle'
import CommandPalette from '@components/organisms/CommandPalette'
import MobileMenu from '@components/organisms/MobileMenu'

import { navLinks } from '@constants/navigation'
import { readArticles } from '@utils/articles'

export default function SiteNav() {
  const articles = readArticles().map(({ slug, title }) => ({ slug, title }))

  return (
    <header
      id="top"
      className="bg-background/80 sticky top-0 z-40 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-h-10 min-w-10 items-center">
          <Image
            src="/images/avatar.webp"
            alt=""
            width={32}
            height={32}
            className="ring-border size-8 rounded-full object-cover ring-1"
          />
          <span className="sr-only">Satriko Aditya, home</span>
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <CommandPalette articles={articles} />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
