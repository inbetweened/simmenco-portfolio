import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project ? `${project.title} | DS Portfolio` : "Project | DS Portfolio",
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell project-page">
      <Header />
      <section className="project-hero">
        <Link className="back-link" href="/#work">
          Back to work
        </Link>
        <h1>{project.title}</h1>
        <div className="project-hero-media" style={{ "--accent": project.accent } as React.CSSProperties}>
          <span>{project.code}</span>
        </div>
      </section>

      <section className="project-body">
        <aside className="facts">
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span>{project.role}</span>
        </aside>
        <div className="project-copy">
          <p>{project.summary}</p>
          <div>
            <h2>Story</h2>
            <p>{project.story}</p>
          </div>
          <div>
            <h2>Result</h2>
            <p>{project.result}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
