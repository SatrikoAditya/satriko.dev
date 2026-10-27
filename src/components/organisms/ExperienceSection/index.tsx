import CompanyChip from '@components/molecules/CompanyChip'
import Section from '@components/molecules/Section'
import { Badge } from '@/components/ui/badge'

import { jobs, SOFT_SKILL } from '@content/experience'
import { formatRange } from '@utils/dates'

export default function ExperienceSection() {
  return (
    <Section id="experience" label="Experience">
      <ol aria-label="Work experience" className="border-border ml-1 border-l">
        {jobs.map((job) => {
          const tools = job.tools.filter((t) => t !== SOFT_SKILL)
          return (
            <li
              key={job.id}
              aria-label={`${job.role} at ${job.company}`}
              className="relative pb-10 pl-6 last:pb-0"
            >
              <span
                aria-hidden
                className="border-background bg-foreground absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2"
              />
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
