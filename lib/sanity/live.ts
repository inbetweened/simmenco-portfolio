import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Live-enabled fetch: published content streams updates to visitors,
 * and draft mode (used by the Studio's Presentation tab) sees
 * unpublished changes with visual-editing overlays.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
