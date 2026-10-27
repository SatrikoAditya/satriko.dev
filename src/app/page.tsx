import type { Metadata } from 'next'

import Container from '@components/atoms/Container'
import AboutSection from '@components/organisms/AboutSection'
import EducationSection from '@components/organisms/EducationSection'
import ExperienceSection from '@components/organisms/ExperienceSection'
import GithubActivity from '@components/organisms/GithubActivity'
import Hero from '@components/organisms/Hero'
import JsonLd from '@components/organisms/JsonLd'
import LatestWriting from '@components/organisms/LatestWriting'
import ProjectsSection from '@components/organisms/ProjectsSection'
import RecommendationsSection from '@components/organisms/RecommendationsSection'
import StackSection from '@components/organisms/StackSection'

import { readArticles } from '@utils/articles'
import { homeStructuredData } from '@utils/structuredData'

// Only the canonical: setting openGraph here would replace the layout's whole openGraph (shallow merge).
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

// The GitHub grid refreshes daily (ISR).
export const revalidate = 86400

export default function HomePage() {
  const articles = readArticles()
  return (
    <Container>
      <JsonLd data={homeStructuredData()} />
      <Hero />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <RecommendationsSection />
      <GithubActivity />
      <LatestWriting articles={articles} />
    </Container>
  )
}
