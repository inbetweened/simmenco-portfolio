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

export type ProjectTheme = {
  background?: string | null;
  text?: string | null;
};

export type MediaItem = {
  _key: string;
  caption?: string | null;
  alt?: string | null;
  youtube?: string | null;
  video?: string | null;
  image?: string | null;
};

type BaseBlock = { _key: string };

export type HeroBlock = BaseBlock & {
  _type: "heroBlock";
  heading?: string | null;
  fullBleed?: boolean | null;
  youtube?: string | null;
  video?: string | null;
  image?: string | null;
};

export type VideoBlock = BaseBlock & {
  _type: "videoBlock";
  layout?: "full" | "contained" | "split" | null;
  caption?: string | null;
  autoplay?: boolean | null;
  text?: string | null;
  youtube?: string | null;
  video?: string | null;
};

export type TextBlock = BaseBlock & {
  _type: "textBlock";
  label?: string | null;
  heading?: string | null;
  body?: unknown[] | null;
  layout?: "narrow" | "wide" | null;
};

export type StatementBlock = BaseBlock & {
  _type: "statementBlock";
  variant?: "quote" | "transition" | "stat" | null;
  text?: string | null;
  statValue?: string | null;
  statLabel?: string | null;
  useAccent?: boolean | null;
};

export type CarouselBlock = BaseBlock & {
  _type: "carouselBlock";
  caption?: string | null;
  items?: MediaItem[] | null;
};

export type MediaGridBlock = BaseBlock & {
  _type: "mediaGridBlock";
  columns?: number | null;
  items?: MediaItem[] | null;
};

export type ImageBlock = BaseBlock & {
  _type: "imageBlock";
  layout?: "full" | "contained" | null;
  caption?: string | null;
  alt?: string | null;
  image?: string | null;
};

export type CreditsBlock = BaseBlock & {
  _type: "creditsBlock";
  groups?: { _key: string; title?: string | null; names?: string[] | null }[] | null;
};

export type SpacerBlock = BaseBlock & {
  _type: "spacerBlock";
  size?: "small" | "medium" | "large" | null;
};

export type PageBlock =
  | HeroBlock
  | VideoBlock
  | TextBlock
  | StatementBlock
  | CarouselBlock
  | MediaGridBlock
  | ImageBlock
  | CreditsBlock
  | SpacerBlock;

export type ProjectPage = {
  slug: string;
  title: string;
  code?: string | null;
  category?: string | null;
  tags?: string[] | null;
  year?: string | null;
  role?: string | null;
  accent?: string | null;
  summary?: string | null;
  theme?: ProjectTheme | null;
  blocks?: PageBlock[] | null;
};

export type ProjectNeighbor = {
  slug: string;
  title: string;
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
