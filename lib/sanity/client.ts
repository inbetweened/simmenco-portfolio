import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// useCdn must stay false: Next's Data Cache (tags + webhook revalidation) is the
// caching layer; the Sanity API CDN would keep serving stale data after a publish.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: { studioUrl: "/studio" },
});
