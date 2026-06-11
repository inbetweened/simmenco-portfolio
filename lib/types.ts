export const WORK_TAGS = [
  "Motion",
  "3D Animation",
  "Graphic Design",
  "Interaction",
  "Systems",
  "Live Action",
] as const;

export type WorkTag = (typeof WORK_TAGS)[number];

export type WorkFilter = "Everything" | WorkTag;

export const workFilters: WorkFilter[] = ["Everything", ...WORK_TAGS];

export type WorkItem = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  year: string;
  tags: WorkFilter[];
  accent: string;
  code?: string;
  type: "project" | "motion" | "rive";
  href?: string;
  video?: string;
  youtube?: string;
  rive?: string;
  artboard?: string;
  stateMachine?: string;
  autoplayPreview?: boolean;
  previewStart?: number;
  previewEnd?: number;
  interactionMode?: "cursor-gaze";
};

export type Project = {
  slug: string;
  title: string;
  code: string;
  category: string;
  tags: string[];
  year: string;
  role: string;
  accent: string;
  summary: string;
  story: string;
  result: string;
};

export type SiteSettings = {
  headerStatement: string | null;
  contactHeading: string | null;
  contactBody: string | null;
  email: string | null;
  linkedin: string | null;
  capabilities: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  featuredVideo: string | null;
};
