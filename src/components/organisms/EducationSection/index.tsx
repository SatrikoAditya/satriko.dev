import Section from '@components/molecules/Section'
import { Badge } from '@/components/ui/badge'

import { education } from '@content/education'
import { formatRange } from '@utils/dates'

export default function EducationSection() {
  return (
    <Section id="education" label="Education">
      <ul className="space-y-5">
        {education.map((e) => (
          <li
            key={e.id}
            className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-medium">
                <span>{e.institution}</span>
                {e.honors && (
                  <Badge variant="secondary" className="ml-2 align-middle">
                    Honors
                  </Badge>
                )}
              </p>
              <p className="text-muted-foreground text-sm">{e.program}</p>
              {e.note && (
                <p className="text-muted-foreground text-sm">{e.note}</p>
              )}
            </div>
            <p className="text-muted-foreground shrink-0 font-mono text-xs sm:pt-1">
              {formatRange(e)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
