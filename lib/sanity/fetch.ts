import { cache } from "react";
import type { ProjectNeighbor, ProjectPage, SiteSettings, WorkItem } from "@/lib/types";
import { sanityFetch } from "./live";
import {
  projectNeighborsQuery,
  projectPageQuery,
  projectSlugsQuery,
  siteSettingsQuery,
  workItemsQuery,
} from "./queries";

export const getWorkItems = cache(async () => {
  const { data } = await sanityFetch({ query: workItemsQuery });
  return data as WorkItem[];
});

export const getSiteSettings = cache(async () => {
  const { data } = await sanityFetch({ query: siteSettingsQuery });
  return data as SiteSettings | null;
});

export const getProjectPage = cache(async (slug: string) => {
  const { data } = await sanityFetch({ query: projectPageQuery, params: { slug } });
  return data as ProjectPage | null;
});

export const getProjectNeighbors = cache(async () => {
  const { data } = await sanityFetch({ query: projectNeighborsQuery });
  return data as ProjectNeighbor[];
});

export const getProjectSlugs = async () => {
  const { data } = await sanityFetch({ query: projectSlugsQuery, perspective: "published", stega: false });
  return data as string[];
};
