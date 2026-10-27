import Link from 'next/link'

import type { IArticle } from '@models/article'
import { formatDay } from '@utils/dates'

export default function ArticleList({
  articles,
}: {
  articles: readonly IArticle[]
}) {
  return (
    <ul className="divide-border divide-y">
      {articles.map((a) => (
        <li key={a.slug} className="py-5 first:pt-0">
          <Link href={`/writing/${a.slug}`} className="group block">
            <time
              dateTime={a.date}
              className="text-muted-foreground font-mono text-xs"
            >
              {formatDay(a.date)}
            </time>
            <h3 className="group-hover:text-brand mt-1 font-medium transition-colors">
              {a.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">{a.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
