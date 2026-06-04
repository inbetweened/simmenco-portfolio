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

export const projects: Project[] = [];

export const capabilities = [
  "Interactive portfolios",
  "Product interfaces",
  "Motion systems",
  "Brand-led web experiences",
  "Creative frontend prototypes",
];

export type WorkFilter =
  | "Everything"
  | "Motion"
  | "3D Animation"
  | "Graphic Design"
  | "Interaction"
  | "Systems"
  | "Live Action";

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

export const workFilters: WorkFilter[] = [
  "Everything",
  "Motion",
  "3D Animation",
  "Graphic Design",
  "Interaction",
  "Systems",
  "Live Action",
];

export const workItems: WorkItem[] = [
  ...projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    eyebrow: project.category,
    description: project.summary,
    year: project.year,
    tags: project.tags as WorkFilter[],
    accent: project.accent,
    code: project.code,
    type: "project" as const,
    href: `/work/${project.slug}`,
  })),
  {
    slug: "ticketportal-aussteller-explainer",
    title: "Ticket Portal for Exhibitors",
    eyebrow: "Explainer Video",
    description: "Explainer video for an exhibitor ticket portal, created for a digital platform workflow.",
    year: "2026",
    tags: ["Everything", "Motion"],
    accent: "#277da8",
    type: "motion",
    youtube: "https://www.youtube.com/embed/wKoD7PpOio4",
  },
  {
    slug: "motion-design-intro",
    title: "Motion Design Intro",
    eyebrow: "Motion Study",
    description: "Text animation experiment made as a compact motion-design craft sample.",
    year: "2026",
    tags: ["Everything", "Motion"],
    accent: "#657733",
    type: "motion",
    video: "/videos/motion-design-intro-2.mp4",
    autoplayPreview: true,
  },
  {
    slug: "zebi-logo-animation",
    title: "Zebi Logo Animation",
    eyebrow: "Logo Animation",
    description: "Logo animation for the Zebi rebrand.",
    year: "2026",
    tags: ["Everything", "Motion"],
    accent: "#10100e",
    type: "motion",
    video: "/videos/zebi/video.mp4",
    autoplayPreview: true,
  },
  {
    slug: "ama-buswerbung",
    title: "AMA Bus Advertising",
    eyebrow: "Motion Campaign",
    description: "Bus advertising motion piece for Aargauer Messe Aarau.",
    year: "2026",
    tags: ["Everything", "Motion"],
    accent: "#277da8",
    type: "motion",
    video: "/videos/ama-buswerbung/ama-buswerbung.mp4",
    autoplayPreview: true,
    previewStart: 0,
    previewEnd: 5,
  },
  {
    slug: "dots-ting",
    title: "Geometry Nodes",
    eyebrow: "3D Blender Study",
    description: "Geometry Nodes study exploring procedural dot motion in Blender.",
    year: "2026",
    tags: ["Everything", "Motion", "3D Animation"],
    accent: "#b8ff4d",
    type: "motion",
    video: "/videos/dots-ting/dots-ting.mp4",
  },
  {
    slug: "swiss-plastics-award",
    title: "Swiss Plastics Expo Award",
    eyebrow: "Award Motion System",
    description: "Winner and nominee animations created for the Swiss Plastics Expo Award.",
    year: "2026",
    tags: ["Everything", "Motion"],
    accent: "#ff5f38",
    type: "motion",
    video: "/videos/swiss-plastics-award/winner-produktinnovation.mp4",
  },
  {
    slug: "cursor-gaze",
    title: "Cursor Gaze",
    eyebrow: "Rive Study",
    description: "Interactive cursor-focused Rive animation study.",
    year: "2026",
    tags: ["Everything", "Interaction"],
    accent: "#d9ff63",
    type: "rive",
    rive: "/rive/grid_smileys.riv",
    artboard: "isometric",
    stateMachine: "State Machine 1",
    interactionMode: "cursor-gaze",
  },
  {
    slug: "iso-toy",
    title: "Iso Toy",
    eyebrow: "Rive Study",
    description: "Small isometric interaction study built in Rive.",
    year: "2026",
    tags: ["Everything", "Interaction"],
    accent: "#78d8ff",
    type: "rive",
    rive: "/rive/iso_toy_169.riv",
    artboard: "Artboard",
    stateMachine: "State Machine 1",
  },
];
