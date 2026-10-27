import Link from 'next/link'

import ProjectCard from '@components/molecules/ProjectCard'
import Section from '@components/molecules/Section'

import { featuredProjectIds, projects } from '@content/projects'

export default function ProjectsSection() {
  const featured = featuredProjectIds.map((id) =>
    projects.find((p) => p.id === id)!,
  )
  return (
    <Section
      id="projects"
      label="Projects"
      action={
        <Link
          href="/projects"
          className="hover:text-brand -my-2.5 inline-flex min-h-10 items-center text-sm font-medium transition-colors"
        >
          View all →
        </Link>
      }
    >
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
