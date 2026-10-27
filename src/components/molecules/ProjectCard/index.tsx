import Image from 'next/image'
import Link from 'next/link'

import ReadMore from '@components/molecules/ReadMore'
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

  const shot = (
    <div className="border-border bg-secondary relative aspect-[16/10] overflow-hidden rounded-lg border">
      {project.screenshot ? (
        <Image
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          fill
          sizes="(min-width: 640px) 296px, 100vw"
          className={cn(
            'object-cover object-top transition-transform duration-300',
            detailed
              ? 'motion-safe:group-hover:scale-[1.02]'
              : 'motion-safe:group-has-[a:focus-visible]:scale-[1.02] motion-safe:group-has-[a:hover]:scale-[1.02]',
          )}
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
  )

  const kind = (
    <p className="text-muted-foreground mt-3 font-mono text-[11px] tracking-wide uppercase">
      {project.kind === 'work' ? 'Client work' : 'Personal'} · {project.role}
    </p>
  )

  if (detailed) {
    return (
      <article id={project.id} className="group flex scroll-mt-20 flex-col">
        {shot}
        {kind}
        <h3 className="mt-1 font-medium">{project.title}</h3>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          {project.summary}
        </p>
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
      </article>
    )
  }

  // Only the screenshot and the name navigate; the description expands in place.
  // The screenshot link repeats the name link, so it stays out of the tab order and
  // the accessibility tree while keeping mouse and tap navigation.
  const imageLinkProps = {
    'aria-hidden': true,
    tabIndex: -1,
    className: 'block rounded-lg',
  } as const
  const nameLinkProps = {
    className:
      'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-10 items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  }
  const name = (
    <>
      <span>
        {project.title}
        {live && (
          <>
            {' '}
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </span>
      {live && (
        <span aria-hidden className="text-muted-foreground text-sm">
          ↗
        </span>
      )}
    </>
  )

  return (
    <article className="group flex flex-col">
      {live ? (
        <a
          href={live.href}
          target="_blank"
          rel="noreferrer"
          {...imageLinkProps}
        >
          {shot}
        </a>
      ) : (
        <Link href={`/projects#${project.id}`} {...imageLinkProps}>
          {shot}
        </Link>
      )}
      {kind}
      <h3 className="group-has-[a:focus-visible]:text-brand group-has-[a:hover]:text-brand -mt-1 -mb-2 font-medium transition-colors">
        {live ? (
          <a
            href={live.href}
            target="_blank"
            rel="noreferrer"
            {...nameLinkProps}
          >
            {name}
          </a>
        ) : (
          <Link href={`/projects#${project.id}`} {...nameLinkProps}>
            {name}
          </Link>
        )}
      </h3>
      <div className="mt-1">
        <ReadMore
          id={`${project.id}-summary`}
          paragraphs={[project.summary]}
          clampClassName="line-clamp-3"
          className="text-muted-foreground"
          toggleOnTextClick
        />
      </div>
    </article>
  )
}
