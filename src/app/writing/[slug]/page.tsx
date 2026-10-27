import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Container from '@components/atoms/Container'

import { getArticle, readArticles } from '@utils/articles'
import { formatDay } from '@utils/dates'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return readArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url: `/writing/${article.slug}`,
      publishedTime: article.date,
      authors: ['Satriko Aditya'],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  const { default: Post } = await import(`@/content/articles/${slug}.mdx`)
  return (
    <Container className="py-16">
      <article>
        <header>
          <time
            dateTime={article.date}
            className="text-muted-foreground font-mono text-xs"
          >
            {formatDay(article.date)}
          </time>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            {article.summary}
          </p>
        </header>
        <div className="prose-article mt-10">
          <Post />
        </div>
      </article>
    </Container>
  )
}
