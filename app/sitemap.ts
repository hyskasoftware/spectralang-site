import type { MetadataRoute } from "next";
import { buildDocsTree, flattenPages } from "@/lib/docs-tree";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const tree = buildDocsTree();
  const pages = flattenPages(tree);

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const p of pages) {
    entries.push({
      url: `${SITE_URL}${p.href}`,
      lastModified: new Date(),
      changeFrequency: p.kind === "topic" ? "monthly" : "weekly",
      priority: p.kind === "topic" ? 0.6 : 0.8,
    });
  }

  entries.push({
    url: `${SITE_URL}/license`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.2,
  });

  return entries;
}
