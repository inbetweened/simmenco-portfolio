import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { BlockRenderer } from "@/components/blocks/Blocks";
import {
  getProjectNeighbors,
  getProjectPage,
  getProjectSlugs,
  getSiteSettings,
} from "@/lib/sanity/fetch";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectPage(slug);

  return {
    title: project ? `${project.title} | DS Portfolio` : "Project | DS Portfolio",
    description: project?.summary ?? undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings, neighbors] = await Promise.all([
    getProjectPage(slug),
    getSiteSettings(),
    getProjectNeighbors(),
  ]);

  if (!project) {
    notFound();
  }

  const themeStyle = {
    "--case-bg": project.theme?.background ?? "var(--paper)",
    "--case-ink": project.theme?.text ?? "var(--ink)",
    "--accent": project.accent ?? "var(--signal)",
  } as React.CSSProperties;

  const index = neighbors.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? neighbors[index - 1] : null;
  const next = index >= 0 && index < neighbors.length - 1 ? neighbors[index + 1] : null;

  return (
    <main className="page-shell case-page" style={themeStyle}>
      <Header
        statement={settings?.headerStatement}
        email={settings?.email}
        linkedin={settings?.linkedin}
      />

      <section className="case-intro">
        <Link className="back-link" href="/work">
          Back to work
        </Link>
        <h1>{project.title}</h1>
        <div className="case-facts">
          {[project.category, project.year, project.role].filter(Boolean).map((fact) => (
            <span key={fact as string}>{fact}</span>
          ))}
        </div>
        {project.summary ? <p className="case-summary">{project.summary}</p> : null}
      </section>

      {project.blocks?.length ? (
        <div className="case-blocks">
          {project.blocks.map((block) => (
            <BlockRenderer key={block._key} block={block} title={project.title} />
          ))}
        </div>
      ) : null}

      {previous || next ? (
        <nav className="case-nav" aria-label="More projects">
          {previous ? (
            <Link href={`/work/${previous.slug}`}>
              <span>Previous</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="is-next" href={`/work/${next.slug}`}>
              <span>Next</span>
              <strong>{next.title}</strong>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </main>
  );
}
