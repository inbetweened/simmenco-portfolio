import { cache } from "react";
import type { QueryParams } from "next-sanity";
import type { Project, SiteSettings, WorkItem } from "@/lib/types";
import { client } from "./client";
import {
  projectBySlugQuery,
  projectSlugsQuery,
  siteSettingsQuery,
  workItemsQuery,
} from "./queries";

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: "force-cache",
    next: { tags },
  });
}

export const getWorkItems = cache(() =>
  sanityFetch<WorkItem[]>({ query: workItemsQuery, tags: ["workItem"] }),
);

// featuredVideo dereferences a workItem, so both tags apply
export const getSiteSettings = cache(() =>
  sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings", "workItem"],
  }),
);

export const getProjectBySlug = cache((slug: string) =>
  sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["workItem"],
  }),
);

export const getProjectSlugs = () =>
  sanityFetch<string[]>({ query: projectSlugsQuery, tags: ["workItem"] });
