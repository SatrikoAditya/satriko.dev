import Container from '@components/atoms/Container'
import AboutSection from '@components/organisms/AboutSection'
import EducationSection from '@components/organisms/EducationSection'
import ExperienceSection from '@components/organisms/ExperienceSection'
import GithubActivity from '@components/organisms/GithubActivity'
import Hero from '@components/organisms/Hero'
import LatestWriting from '@components/organisms/LatestWriting'
import ProjectsSection from '@components/organisms/ProjectsSection'
import RecommendationsSection from '@components/organisms/RecommendationsSection'
import StackSection from '@components/organisms/StackSection'

import { readArticles } from '@utils/articles'

// The GitHub grid refreshes daily (ISR).
export const revalidate = 86400

export default function HomePage() {
  const articles = readArticles()
  return (
    <Container>
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
