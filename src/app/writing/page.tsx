import type { Metadata } from 'next'

import Container from '@components/atoms/Container'
import ArticleList from '@components/molecules/ArticleList'

import { readArticles } from '@utils/articles'

export function generateMetadata(): Metadata {
  return {
    title: 'Writing',
    description:
      'Articles by Satriko Aditya on web development, TypeScript and building products.',
    alternates: { canonical: '/writing' },
    // Reachable by URL, but not worth indexing until there is something to read.
    ...(readArticles().length === 0 && { robots: { index: false } }),
  }
}

export default function WritingPage() {
  const articles = readArticles()
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="text-muted-foreground mt-2">
        Notes on building for the web.
      </p>
      <div className="mt-10">
        {articles.length === 0 ? (
          <>
            <p className="text-muted-foreground font-mono text-xs">
              Coming soon
            </p>
            <p className="text-muted-foreground mt-2 max-w-prose">
              I&apos;m writing my first articles — notes on building fast,
              friendly products for the web. Check back soon.
            </p>
          </>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
    </Container>
  )
}
