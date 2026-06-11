/**
 * Seeds one sample case-study project demonstrating every page-builder
 * block, reusing media assets already uploaded during the migration.
 * Safe to re-run (createOrReplace) and safe to delete in the Studio.
 *
 * Run with:  npx sanity exec scripts/seed-sample-case-study.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-06-01" });

const VIDEO_INTRO = "file-467f82ab4a0e7845c3a6c371661947e642f40767-mp4";
const VIDEO_ZEBI = "file-e9c1e2d069e57d954f52dbad7cea2d6c3ed93402-mp4";
const VIDEO_AMA = "file-94ffa20b308ae32c611734dedd5d020c4210bd52-mp4";
const VIDEO_DOTS = "file-3b35188d947cf0f27e8c6eda1bc534feb1d3cb22-mp4";

const fileRef = (assetId: string) => ({
  _type: "file" as const,
  asset: { _type: "reference" as const, _ref: assetId },
});

const span = (text: string) => ({
  _type: "block",
  _key: `blk-${text.length}-${text.slice(0, 8).replace(/\W/g, "")}`,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: "s1", text, marks: [] }],
});

const doc = {
  _id: "workItem-sample-case-study",
  _type: "workItem",
  title: "Sample Case Study",
  slug: { _type: "slug", current: "sample-case-study" },
  kind: "project",
  eyebrow: "Case Study",
  description: "A sample case study demonstrating the page-builder blocks. Delete me when you build a real one.",
  year: "2026",
  tags: ["Motion"],
  accent: "#d9ff63",
  order: 999,
  category: "Demo",
  role: "Design & Animation",
  summary:
    "This page demonstrates every block in the page builder. Open it in the Studio's Presentation tab to edit visually.",
  theme: { background: "#f8f7f2", text: "#10100e" },
  pageBuilder: [
    {
      _type: "heroBlock",
      _key: "hero1",
      fullBleed: true,
      videoFile: fileRef(VIDEO_INTRO),
    },
    {
      _type: "textBlock",
      _key: "text1",
      label: "The Brief",
      heading: "Every layout starts with a story",
      layout: "narrow",
      body: [
        span(
          "This is a text block in the narrow layout. Write the project story here — what the client needed, what you made, why it works. Click any of this text in the Presentation tab and the matching field opens.",
        ),
      ],
    },
    {
      _type: "videoBlock",
      _key: "video1",
      layout: "full",
      videoFile: fileRef(VIDEO_ZEBI),
      autoplay: true,
      caption: "Full-bleed video block, autoplay loop",
    },
    {
      _type: "statementBlock",
      _key: "stmt1",
      variant: "transition",
      text: "A centered transition statement carries the reader to the next chapter.",
    },
    {
      _type: "videoBlock",
      _key: "video2",
      layout: "split",
      videoFile: fileRef(VIDEO_AMA),
      autoplay: true,
      text: "The split layout pairs a video with a short side note — good for process clips that need a sentence of context.",
      caption: "Split video block",
    },
    {
      _type: "statementBlock",
      _key: "stat1",
      variant: "stat",
      statValue: "207,360",
      statLabel: "possible paths",
      useAccent: false,
    },
    {
      _type: "carouselBlock",
      _key: "car1",
      caption: "Carousel block — browse with the arrows",
      items: [
        { _type: "mediaItem", _key: "c1", videoFile: fileRef(VIDEO_INTRO), caption: "Slide one" },
        { _type: "mediaItem", _key: "c2", videoFile: fileRef(VIDEO_DOTS), caption: "Slide two" },
        { _type: "mediaItem", _key: "c3", videoFile: fileRef(VIDEO_ZEBI), caption: "Slide three" },
      ],
    },
    {
      _type: "mediaGridBlock",
      _key: "grid1",
      columns: 2,
      items: [
        { _type: "mediaItem", _key: "g1", videoFile: fileRef(VIDEO_AMA), caption: "Grid item one" },
        { _type: "mediaItem", _key: "g2", videoFile: fileRef(VIDEO_DOTS), caption: "Grid item two" },
      ],
    },
    {
      _type: "spacerBlock",
      _key: "sp1",
      size: "large",
    },
    {
      _type: "creditsBlock",
      _key: "cred1",
      groups: [
        { _type: "creditGroup", _key: "cg1", title: "Design & Animation", names: ["Daniel Simmen"] },
        { _type: "creditGroup", _key: "cg2", title: "Tools", names: ["Blender", "After Effects", "Rive"] },
      ],
    },
  ],
};

async function run() {
  await client.createOrReplace(doc);
  console.log("Seeded workItem-sample-case-study -> /work/sample-case-study");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
