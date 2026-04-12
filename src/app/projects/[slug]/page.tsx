import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROJECTS } from '@/lib/constants'
import { ProjectPageClient } from './ProjectPageClient'

interface Props {
  params: { slug: string }
}

// Pre-generate all known project routes at build time
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) return { title: 'Not Found' }
  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) notFound()

  return <ProjectPageClient project={project} />
}
