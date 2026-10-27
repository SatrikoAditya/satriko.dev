import Image from 'next/image'

import { cn } from '@components/shadcn/utils'
import { Badge } from '@/components/ui/badge'

import type { IProject } from '@models/project'

export default function ProjectCard({
  project,
  detailed = false,
}: {
  project: IProject
  /** /projects shows the full summary, tech and links. */
  detailed?: boolean
}) {
  const live = project.links[0]
  return (
    <article className="group flex flex-col">
      <div className="border-border bg-secondary relative aspect-[16/10] overflow-hidden rounded-lg border">
        {project.screenshot ? (
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            fill
            sizes="(min-width: 640px) 296px, 100vw"
            className="object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden
            className="text-muted-foreground grid h-full place-items-center font-mono text-sm"
          >
            {project.title}
          </div>
        )}
        {live && (
          <Badge
            variant="secondary"
            className="bg-background/90 absolute top-2 left-2 gap-1.5"
          >
            <span aria-hidden className="bg-brand size-1.5 rounded-full" />
            Live
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground mt-3 font-mono text-[11px] tracking-wide uppercase">
        {project.kind === 'work' ? 'Client work' : 'Personal'} · {project.role}
      </p>
      <h3 className="mt-1 font-medium">{project.title}</h3>
      <p
        className={cn(
          'text-muted-foreground mt-1 text-sm leading-relaxed',
          !detailed && 'line-clamp-3',
        )}
      >
        {project.summary}
      </p>
      {detailed && (
        <>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="font-mono text-[11px] font-normal"
              >
                {t}
              </Badge>
            ))}
          </div>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand mt-0.5 inline-flex min-h-10 items-center self-start text-sm font-medium underline-offset-4 hover:underline"
            >
              {link.label} ↗
            </a>
          ))}
        </>
      )}
    </article>
  )
}
