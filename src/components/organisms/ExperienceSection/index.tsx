import CompanyChip from '@components/molecules/CompanyChip'
import Section from '@components/molecules/Section'
import { Badge } from '@/components/ui/badge'

import { jobs, SOFT_SKILL } from '@content/experience'
import { formatRange } from '@utils/dates'

export default function ExperienceSection() {
  return (
    <Section id="experience" label="Experience">
      <ol aria-label="Work experience">
        {jobs.map((job) => {
          const tools = job.tools.filter((t) => t !== SOFT_SKILL)
          return (
            <li
              key={job.id}
              aria-label={`${job.role} at ${job.company}`}
              className="group relative pb-10 pl-6 last:pb-0"
            >
              {/* This job's stretch of the timeline line, plus its dot. */}
              <span aria-hidden className="absolute inset-y-0 left-0">
                <span className="bg-muted-foreground/30 group-hover:bg-foreground/60 group-focus-within:bg-foreground/60 absolute inset-y-0 left-[5px] w-0.5 transition-colors duration-200" />
                <span className="border-muted-foreground/50 bg-background group-hover:border-brand group-hover:bg-brand group-focus-within:border-brand group-focus-within:bg-brand absolute top-0.5 left-0 size-3 rounded-full border-2 transition-colors duration-200 motion-safe:group-focus-within:scale-110 motion-safe:group-hover:scale-110" />
              </span>
              <p className="text-muted-foreground font-mono text-xs">
                {formatRange(job)} · {job.location}
                {job.remote ? ' · Remote' : ''}
              </p>
              <h3 className="mt-1 font-medium">
                {job.role} <span className="text-muted-foreground">at</span>{' '}
                <CompanyChip name={job.company} logo={job.logo} />
              </h3>
              {job.summary && (
                <p className="text-muted-foreground mt-2 text-sm">
                  {job.summary}
                </p>
              )}
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {tools.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tools.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="font-mono text-[11px] font-normal"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
