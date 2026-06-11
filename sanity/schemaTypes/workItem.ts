import { defineField, defineType } from "sanity";
import { WORK_TAGS } from "@/lib/types";

export const workItem = defineType({
  name: "workItem",
  title: "Work Item",
  type: "document",
  fieldsets: [
    {
      name: "projectDetails",
      title: "Project details (case study page)",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Motion (video / YouTube)", value: "motion" },
          { title: "Rive (interactive)", value: "rive" },
          { title: "Project (case study)", value: "project" },
        ],
        layout: "radio",
      },
      initialValue: "motion",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Short category label shown above the title, e.g. “Motion Study”.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Used by the work archive filters. “Everything” is automatic — don’t add it.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [...WORK_TAGS] },
    }),
    defineField({
      name: "accent",
      title: "Accent color",
      description: "Hex color used as the card accent, e.g. #b8ff4d.",
      type: "string",
      validation: (rule) =>
        rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { name: "hex color" }),
    }),
    defineField({
      name: "code",
      title: "Code",
      description: "Short placeholder code shown when an item has no media.",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Items are sorted by this number, lowest first.",
      type: "number",
      initialValue: 100,
    }),

    defineField({
      name: "youtube",
      title: "YouTube embed URL",
      description: "Embed URL, e.g. https://www.youtube.com/embed/xyz. Takes priority over a video file.",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "motion",
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.kind !== "motion",
    }),
    defineField({
      name: "autoplayPreview",
      title: "Autoplay preview",
      description: "Play the preview automatically instead of on hover.",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.kind !== "motion",
    }),
    defineField({
      name: "previewStart",
      title: "Preview start (seconds)",
      type: "number",
      hidden: ({ parent }) => parent?.kind !== "motion",
    }),
    defineField({
      name: "previewEnd",
      title: "Preview end (seconds)",
      type: "number",
      hidden: ({ parent }) => parent?.kind !== "motion",
    }),

    defineField({
      name: "riveFile",
      title: "Rive file",
      type: "file",
      options: { accept: ".riv" },
      hidden: ({ parent }) => parent?.kind !== "rive",
    }),
    defineField({
      name: "artboard",
      title: "Artboard",
      type: "string",
      hidden: ({ parent }) => parent?.kind !== "rive",
    }),
    defineField({
      name: "stateMachine",
      title: "State machine",
      type: "string",
      hidden: ({ parent }) => parent?.kind !== "rive",
    }),
    defineField({
      name: "interactionMode",
      title: "Interaction mode",
      type: "string",
      options: { list: ["cursor-gaze"] },
      hidden: ({ parent }) => parent?.kind !== "rive",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      fieldset: "projectDetails",
      hidden: ({ parent }) => parent?.kind !== "project",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      fieldset: "projectDetails",
      hidden: ({ parent }) => parent?.kind !== "project",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      fieldset: "projectDetails",
      hidden: ({ parent }) => parent?.kind !== "project",
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "text",
      rows: 6,
      fieldset: "projectDetails",
      hidden: ({ parent }) => parent?.kind !== "project",
    }),
    defineField({
      name: "result",
      title: "Result",
      type: "text",
      rows: 4,
      fieldset: "projectDetails",
      hidden: ({ parent }) => parent?.kind !== "project",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", kind: "kind" },
    prepare({ title, subtitle, kind }) {
      return { title, subtitle: [kind, subtitle].filter(Boolean).join(" · ") };
    },
  },
});
