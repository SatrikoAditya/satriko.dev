import { ArrowUp } from 'lucide-react'

import Container from '@components/atoms/Container'
import CopyEmailButton from '@components/molecules/CopyEmailButton'

import { site } from '@constants/site'

const linkClass =
  'inline-flex min-h-10 items-center underline-offset-4 hover:text-brand hover:underline transition-colors'

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      aria-label="Contact"
      className="reveal border-border mt-12 border-t py-16"
    >
      <Container>
        <p className="text-muted-foreground">
          Building fast, friendly products for the web and mobile.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            className="hover:text-brand inline-flex min-h-10 items-center text-2xl font-medium break-all transition-colors sm:text-3xl"
          >
            {site.email}
          </a>
          <CopyEmailButton email={site.email} />
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-6 text-sm">
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
          </li>
          <li>
            <a href={site.resumePdf} download className={linkClass}>
              Résumé
            </a>
          </li>
        </ul>
        <p className="text-muted-foreground mt-8 text-sm">
          Prefer something playful?{' '}
          <a
            href={site.roomUrl}
            className={`text-foreground -my-2.5 ${linkClass}`}
          >
            Visit my room →
          </a>
        </p>
        <div className="text-muted-foreground mt-10 flex items-center justify-between text-xs">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="hover:text-foreground hover:bg-accent inline-grid size-10 place-items-center rounded-full border transition-colors"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
