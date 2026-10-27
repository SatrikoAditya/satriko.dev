import type { Metadata } from 'next'

import Container from '@components/atoms/Container'
import ProjectCard from '@components/molecules/ProjectCard'

import { projects } from '@content/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Web and mobile products Satriko Aditya has built, from AI workflow builders to a multilingual travel site.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="text-muted-foreground mt-2 max-w-prose">
        Most of my client work is private, so the screenshots leave out client
        data and only live sites are linked.
      </p>
      <div className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-x-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} detailed />
        ))}
      </div>
    </Container>
  )
}
