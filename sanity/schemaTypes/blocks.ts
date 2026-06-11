import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Page-builder blocks for project case-study subpages.
 * Layout vocabulary derived from BUCK-style case studies:
 * disciplined single column, variety via media width, carousels,
 * and rhythm breaks.
 */

const HEX_RULE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const mediaItem = defineType({
  name: "mediaItem",
  title: "Media",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "videoFile", title: "Video file", type: "file", options: { accept: "video/mp4" } }),
    defineField({ name: "youtube", title: "YouTube embed URL", type: "url" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { media: "image", caption: "caption" },
    prepare({ media, caption }) {
      return { title: caption || "Media", media };
    },
  },
});

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: "Optional — defaults to the project title.",
      type: "string",
    }),
    defineField({ name: "videoFile", title: "Video file", type: "file", options: { accept: "video/mp4" } }),
    defineField({ name: "youtube", title: "YouTube embed URL", type: "url" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "fullBleed", title: "Full bleed", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { heading: "heading", media: "image" },
    prepare({ heading, media }) {
      return { title: heading || "Hero", subtitle: "Hero", media };
    },
  },
});

export const videoBlock = defineType({
  name: "videoBlock",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "videoFile", title: "Video file", type: "file", options: { accept: "video/mp4" } }),
    defineField({ name: "youtube", title: "YouTube embed URL", type: "url" }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["full", "contained", "split"], layout: "radio" },
      initialValue: "contained",
    }),
    defineField({
      name: "text",
      title: "Side text",
      description: "Shown next to the video in the split layout.",
      type: "text",
      rows: 4,
      hidden: ({ parent }) => parent?.layout !== "split",
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "autoplay",
      title: "Autoplay loop (muted)",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { caption: "caption", layout: "layout" },
    prepare({ caption, layout }) {
      return { title: caption || "Video", subtitle: `Video · ${layout ?? "contained"}` };
    },
  },
});

export const textBlock = defineType({
  name: "textBlock",
  title: "Text",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: "Small section label, e.g. “Story” or “Process”.",
      type: "string",
    }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["narrow", "wide"], layout: "radio" },
      initialValue: "narrow",
    }),
  ],
  preview: {
    select: { label: "label", heading: "heading" },
    prepare({ label, heading }) {
      return { title: heading || label || "Text", subtitle: "Text" };
    },
  },
});

export const statementBlock = defineType({
  name: "statementBlock",
  title: "Statement / Callout",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Pull quote", value: "quote" },
          { title: "Centered transition", value: "transition" },
          { title: "Big stat", value: "stat" },
        ],
        layout: "radio",
      },
      initialValue: "transition",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      hidden: ({ parent }) => parent?.variant === "stat",
    }),
    defineField({
      name: "statValue",
      title: "Stat value",
      description: "e.g. “207,360”",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "stat",
    }),
    defineField({
      name: "statLabel",
      title: "Stat label",
      description: "e.g. “possible paths”",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "stat",
    }),
    defineField({ name: "useAccent", title: "Use project accent color", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { text: "text", statValue: "statValue", variant: "variant" },
    prepare({ text, statValue, variant }) {
      return { title: statValue || text || "Statement", subtitle: `Statement · ${variant ?? ""}` };
    },
  },
});

export const carouselBlock = defineType({
  name: "carouselBlock",
  title: "Carousel",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Slides",
      type: "array",
      of: [defineArrayMember({ type: "mediaItem" })],
      validation: (rule) => rule.min(2),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { items: "items", caption: "caption" },
    prepare({ items, caption }) {
      return { title: caption || "Carousel", subtitle: `Carousel · ${items?.length ?? 0} slides` };
    },
  },
});

export const mediaGridBlock = defineType({
  name: "mediaGridBlock",
  title: "Media grid",
  type: "object",
  fields: [
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [2, 3], layout: "radio" },
      initialValue: 2,
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "mediaItem" })],
    }),
  ],
  preview: {
    select: { items: "items", columns: "columns" },
    prepare({ items, columns }) {
      return { title: "Media grid", subtitle: `${columns ?? 2}-up · ${items?.length ?? 0} items` };
    },
  },
});

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["full", "contained"], layout: "radio" },
      initialValue: "contained",
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { media: "image", caption: "caption" },
    prepare({ media, caption }) {
      return { title: caption || "Image", subtitle: "Image", media };
    },
  },
});

export const creditGroup = defineType({
  name: "creditGroup",
  title: "Credit group",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Group title", type: "string" }),
    defineField({
      name: "names",
      title: "Names",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", names: "names" },
    prepare({ title, names }) {
      return { title: title || "Credits", subtitle: `${names?.length ?? 0} names` };
    },
  },
});

export const creditsBlock = defineType({
  name: "creditsBlock",
  title: "Credits",
  type: "object",
  fields: [
    defineField({
      name: "groups",
      title: "Groups",
      type: "array",
      of: [defineArrayMember({ type: "creditGroup" })],
    }),
  ],
  preview: {
    select: { groups: "groups" },
    prepare({ groups }) {
      return { title: "Credits", subtitle: `${groups?.length ?? 0} groups` };
    },
  },
});

export const spacerBlock = defineType({
  name: "spacerBlock",
  title: "Spacer",
  type: "object",
  fields: [
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: { list: ["small", "medium", "large"], layout: "radio" },
      initialValue: "medium",
    }),
  ],
  preview: {
    select: { size: "size" },
    prepare({ size }) {
      return { title: `Spacer · ${size ?? "medium"}` };
    },
  },
});

export const blockTypes = [
  mediaItem,
  heroBlock,
  videoBlock,
  textBlock,
  statementBlock,
  carouselBlock,
  mediaGridBlock,
  imageBlock,
  creditGroup,
  creditsBlock,
  spacerBlock,
];

export const PAGE_BUILDER_OF = [
  { type: "heroBlock" },
  { type: "videoBlock" },
  { type: "textBlock" },
  { type: "statementBlock" },
  { type: "carouselBlock" },
  { type: "mediaGridBlock" },
  { type: "imageBlock" },
  { type: "creditsBlock" },
  { type: "spacerBlock" },
];

export { HEX_RULE };
