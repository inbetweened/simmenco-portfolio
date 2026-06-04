import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" href={`/work/${project.slug}`}>
      <div className="project-media" style={{ "--accent": project.accent } as React.CSSProperties}>
        <span>{project.code}</span>
      </div>
      <div className="project-meta">
        <div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </div>
        <small>
          {project.category}
          <br />
          {project.year}
        </small>
      </div>
    </Link>
  );
}
