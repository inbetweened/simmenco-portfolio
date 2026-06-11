import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "headerStatement",
      title: "Header statement",
      description: "The line next to the logo in the header.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactHeading",
      title: "Contact heading",
      type: "string",
    }),
    defineField({
      name: "contactBody",
      title: "Contact body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featuredWorkItem",
      title: "Featured work item",
      description: "Its video plays on the home page. Pick an item with a video file.",
      type: "reference",
      to: [{ type: "workItem" }],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
