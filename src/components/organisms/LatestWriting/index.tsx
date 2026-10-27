import Link from 'next/link'

import ArticleList from '@components/molecules/ArticleList'
import Section from '@components/molecules/Section'

import type { IArticle } from '@models/article'

export default function LatestWriting({
  articles,
}: {
  articles: readonly IArticle[]
}) {
  if (articles.length === 0) return null
  return (
    <Section
      id="writing"
      label="Latest writing"
      action={
        <Link
          href="/writing"
          className="hover:text-brand -my-2.5 inline-flex min-h-10 items-center text-sm font-medium transition-colors"
        >
          All articles →
        </Link>
      }
    >
      <ArticleList articles={articles.slice(0, 3)} />
    </Section>
  )
}
