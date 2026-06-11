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

const mediaItemFields = groq`
  _key,
  caption,
  alt,
  youtube,
  "video": videoFile.asset->url,
  "image": image.asset->url
`;

export const projectPageQuery = groq`
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
    theme,
    "blocks": pageBuilder[] {
      _key,
      _type,
      _type == "heroBlock" => { heading, fullBleed, youtube, "video": videoFile.asset->url, "image": image.asset->url },
      _type == "videoBlock" => { layout, caption, autoplay, text, youtube, "video": videoFile.asset->url },
      _type == "textBlock" => { label, heading, body, layout },
      _type == "statementBlock" => { variant, text, statValue, statLabel, useAccent },
      _type == "carouselBlock" => { caption, "items": items[] { ${mediaItemFields} } },
      _type == "mediaGridBlock" => { columns, "items": items[] { ${mediaItemFields} } },
      _type == "imageBlock" => { layout, caption, alt, "image": image.asset->url },
      _type == "creditsBlock" => { "groups": groups[] { _key, title, names } },
      _type == "spacerBlock" => { size }
    }
  }
`;

export const projectNeighborsQuery = groq`
  *[_type == "workItem" && kind == "project" && defined(slug.current)]
    | order(order asc, title asc) { "slug": slug.current, title }
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
