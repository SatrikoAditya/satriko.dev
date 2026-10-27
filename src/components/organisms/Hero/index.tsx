import { Download } from 'lucide-react'

import StatusBadge from '@components/atoms/StatusBadge'
import IconLink from '@components/molecules/IconLink'
import LocalTime from '@components/molecules/LocalTime'
import { Button } from '@/components/ui/button'

import { githubPath, linkedinPath } from '@constants/brandIcons'
import { site } from '@constants/site'
import { about } from '@content/about'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-in pt-16 pb-12 sm:pt-24"
    >
      <StatusBadge />
      <h1
        id="hero-title"
        className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
      >
        Hi, I&apos;m {about.name}
      </h1>
      <p className="text-muted-foreground mt-1 text-xl sm:text-2xl">
        {about.title}
      </p>
      <p className="mt-4 max-w-prose">{about.pitch}</p>
      <div className="mt-3">
        <LocalTime />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-1.5">
        <Button asChild className="h-10">
          <a href={`mailto:${site.email}`}>Contact me</a>
        </Button>
        <Button asChild variant="outline" className="h-10">
          <a href={site.resumePdf} download>
            Resume <Download className="size-4" />
          </a>
        </Button>
        <IconLink href={site.linkedin} label="LinkedIn" path={linkedinPath} />
        <IconLink href={site.github} label="GitHub" path={githubPath} />
      </div>
    </section>
  )
}
