import Container from '@components/atoms/Container'
import AboutSection from '@components/organisms/AboutSection'
import Hero from '@components/organisms/Hero'
import StackSection from '@components/organisms/StackSection'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <AboutSection />
      <StackSection />
    </Container>
  )
}
