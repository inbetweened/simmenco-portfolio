/**
 * One-off content migration: uploads media from /public and creates the
 * 8 work items + the siteSettings singleton in Sanity.
 *
 * Run with:  npx sanity exec scripts/migrate-to-sanity.ts --with-user-token
 * Re-running is safe: documents use deterministic IDs (createOrReplace).
 */
import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-06-01" });

async function uploadFile(publicRelPath: string): Promise<string> {
  const absPath = path.join(process.cwd(), "public", publicRelPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Missing media file: ${absPath}`);
  }
  const asset = await client.assets.upload("file", fs.createReadStream(absPath), {
    filename: path.basename(absPath),
  });
  console.log(`Uploaded ${publicRelPath} -> ${asset._id}`);
  return asset._id;
}

const fileRef = (assetId: string) => ({
  _type: "file" as const,
  asset: { _type: "reference" as const, _ref: assetId },
});

type MigrationDoc = { _id: string; _type: string } & Record<string, unknown>;

async function run() {
  console.log(`Project: ${client.config().projectId}, dataset: ${client.config().dataset}`);

  const motionIntro = await uploadFile("videos/motion-design-intro-2.mp4");
  const zebi = await uploadFile("videos/zebi/video.mp4");
  const ama = await uploadFile("videos/ama-buswerbung/ama-buswerbung.mp4");
  const dots = await uploadFile("videos/dots-ting/dots-ting.mp4");
  const swissPlastics = await uploadFile("videos/swiss-plastics-award/winner-produktinnovation.mp4");
  const gridSmileys = await uploadFile("rive/grid_smileys.riv");
  const isoToy = await uploadFile("rive/iso_toy_169.riv");

  const workItems: MigrationDoc[] = [
    {
      _id: "workItem-ticketportal-aussteller-explainer",
      _type: "workItem",
      title: "Ticket Portal for Exhibitors",
      slug: { _type: "slug", current: "ticketportal-aussteller-explainer" },
      kind: "motion",
      eyebrow: "Explainer Video",
      description:
        "Explainer video for an exhibitor ticket portal, created for a digital platform workflow.",
      year: "2026",
      tags: ["Motion"],
      accent: "#277da8",
      order: 10,
      youtube: "https://www.youtube.com/embed/wKoD7PpOio4",
    },
    {
      _id: "workItem-motion-design-intro",
      _type: "workItem",
      title: "Motion Design Intro",
      slug: { _type: "slug", current: "motion-design-intro" },
      kind: "motion",
      eyebrow: "Motion Study",
      description: "Text animation experiment made as a compact motion-design craft sample.",
      year: "2026",
      tags: ["Motion"],
      accent: "#657733",
      order: 20,
      videoFile: fileRef(motionIntro),
      autoplayPreview: true,
    },
    {
      _id: "workItem-zebi-logo-animation",
      _type: "workItem",
      title: "Zebi Logo Animation",
      slug: { _type: "slug", current: "zebi-logo-animation" },
      kind: "motion",
      eyebrow: "Logo Animation",
      description: "Logo animation for the Zebi rebrand.",
      year: "2026",
      tags: ["Motion"],
      accent: "#10100e",
      order: 30,
      videoFile: fileRef(zebi),
      autoplayPreview: true,
    },
    {
      _id: "workItem-ama-buswerbung",
      _type: "workItem",
      title: "AMA Bus Advertising",
      slug: { _type: "slug", current: "ama-buswerbung" },
      kind: "motion",
      eyebrow: "Motion Campaign",
      description: "Bus advertising motion piece for Aargauer Messe Aarau.",
      year: "2026",
      tags: ["Motion"],
      accent: "#277da8",
      order: 40,
      videoFile: fileRef(ama),
      autoplayPreview: true,
      previewStart: 0,
      previewEnd: 5,
    },
    {
      _id: "workItem-dots-ting",
      _type: "workItem",
      title: "Geometry Nodes",
      slug: { _type: "slug", current: "dots-ting" },
      kind: "motion",
      eyebrow: "3D Blender Study",
      description: "Geometry Nodes study exploring procedural dot motion in Blender.",
      year: "2026",
      tags: ["Motion", "3D Animation"],
      accent: "#b8ff4d",
      order: 50,
      videoFile: fileRef(dots),
    },
    {
      _id: "workItem-swiss-plastics-award",
      _type: "workItem",
      title: "Swiss Plastics Expo Award",
      slug: { _type: "slug", current: "swiss-plastics-award" },
      kind: "motion",
      eyebrow: "Award Motion System",
      description: "Winner and nominee animations created for the Swiss Plastics Expo Award.",
      year: "2026",
      tags: ["Motion"],
      accent: "#ff5f38",
      order: 60,
      videoFile: fileRef(swissPlastics),
    },
    {
      _id: "workItem-cursor-gaze",
      _type: "workItem",
      title: "Cursor Gaze",
      slug: { _type: "slug", current: "cursor-gaze" },
      kind: "rive",
      eyebrow: "Rive Study",
      description: "Interactive cursor-focused Rive animation study.",
      year: "2026",
      tags: ["Interaction"],
      accent: "#d9ff63",
      order: 70,
      riveFile: fileRef(gridSmileys),
      artboard: "isometric",
      stateMachine: "State Machine 1",
      interactionMode: "cursor-gaze",
    },
    {
      _id: "workItem-iso-toy",
      _type: "workItem",
      title: "Iso Toy",
      slug: { _type: "slug", current: "iso-toy" },
      kind: "rive",
      eyebrow: "Rive Study",
      description: "Small isometric interaction study built in Rive.",
      year: "2026",
      tags: ["Interaction"],
      accent: "#78d8ff",
      order: 80,
      riveFile: fileRef(isoToy),
      artboard: "Artboard",
      stateMachine: "State Machine 1",
    },
  ];

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    headerStatement:
      "A collection of work across print, motion, digital, and everything in between.",
    contactHeading: "Let's Make It Sharp.",
    contactBody:
      "Available for motion design, visual systems, interactive web work, and brand-led digital projects.",
    email: "daniel@simmen.co",
    linkedin: "https://www.linkedin.com/in/danielsimmen",
    capabilities: [
      "Interactive portfolios",
      "Product interfaces",
      "Motion systems",
      "Brand-led web experiences",
      "Creative frontend prototypes",
    ],
    seoTitle: "Daniel Simmen Portfolio",
    seoDescription: "A motion-led portfolio for design, systems, and digital craft.",
    featuredWorkItem: {
      _type: "reference",
      _ref: "workItem-motion-design-intro",
    },
  };

  const tx = client.transaction();
  for (const doc of workItems) tx.createOrReplace(doc);
  tx.createOrReplace(siteSettings);
  await tx.commit();

  console.log(`Created ${workItems.length} work items + siteSettings. Done.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
