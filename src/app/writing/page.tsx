import type { Metadata } from 'next'

import Container from '@components/atoms/Container'
import ArticleList from '@components/molecules/ArticleList'

import { readArticles } from '@utils/articles'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles by Satriko Aditya on web development, TypeScript and building products.',
  alternates: { canonical: '/writing' },
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
          <p className="text-muted-foreground">
            No articles yet. The first one is on its way.
          </p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
    </Container>
  )
}
