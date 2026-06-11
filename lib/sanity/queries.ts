import { groq } from "next-sanity";

const workItemFields = groq`
  "slug": slug.current,
  title,
  eyebrow,
  description,
  year,
  tags,
  accent,
  code,
  "type": kind,
  youtube,
  "video": videoFile.asset->url,
  "rive": riveFile.asset->url,
  artboard,
  stateMachine,
  interactionMode,
  autoplayPreview,
  previewStart,
  previewEnd,
  "href": select(kind == "project" => "/work/" + slug.current)
`;

export const workItemsQuery = groq`
  *[_type == "workItem"] | order(order asc, title asc) { ${workItemFields} }
`;

export const projectBySlugQuery = groq`
  *[_type == "workItem" && kind == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    code,
    category,
    tags,
    year,
    role,
    accent,
    summary,
    story,
    result
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "workItem" && kind == "project" && defined(slug.current)].slug.current
`;

export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0] {
    headerStatement,
    contactHeading,
    contactBody,
    email,
    linkedin,
    capabilities,
    seoTitle,
    seoDescription,
    "featuredVideo": featuredWorkItem->videoFile.asset->url
  }
`;
