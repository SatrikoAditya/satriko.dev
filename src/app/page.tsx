import Container from '@components/atoms/Container'
import AboutSection from '@components/organisms/AboutSection'
import EducationSection from '@components/organisms/EducationSection'
import ExperienceSection from '@components/organisms/ExperienceSection'
import Hero from '@components/organisms/Hero'
import StackSection from '@components/organisms/StackSection'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <EducationSection />
    </Container>
  )
}
