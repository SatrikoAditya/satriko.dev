import ReadMore from '@components/molecules/ReadMore'

import type { IRecommendation } from '@models/recommendation'
import { formatDay } from '@utils/dates'
import { initials } from '@utils/initials'

export default function RecommendationCard({
  recommendation: r,
}: {
  recommendation: IRecommendation
}) {
  return (
    <figure className="border-border bg-card flex min-w-0 flex-col gap-4 rounded-lg border p-5">
      <blockquote>
        <ReadMore id={`rec-${r.id}`} paragraphs={r.paragraphs} />
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <span
          aria-hidden
          className="bg-secondary grid size-9 shrink-0 place-items-center rounded-full font-mono text-xs"
        >
          {initials(r.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium">{r.name}</span>
          <span className="text-muted-foreground block truncate text-xs">
            {r.headline}
          </span>
          <span className="text-muted-foreground block text-xs">
            <time dateTime={r.date}>{formatDay(r.date)}</time> ·{' '}
            {r.relationship}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
