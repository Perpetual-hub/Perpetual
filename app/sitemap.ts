import type { MetadataRoute } from "next";
import { DATA_AS_OF, getCountries, getProjects, getRegions } from "@/lib/data";
import { TECHNOLOGIES } from "@/lib/tech";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = new Date(DATA_AS_OF);
  const page = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path}`,
    lastModified: at,
    priority,
  });
  return [
    page("/", 1),
    page("/projects", 0.9),
    page("/statistics", 0.8),
    page("/methodology", 0.5),
    page("/about", 0.4),
    page("/corrections", 0.3),
    ...TECHNOLOGIES.map((t) => page(`/sectors/${t.id}`, 0.8)),
    ...getRegions().map((r) => page(`/regions/${r.key}`)),
    ...getCountries().map((c) => page(`/countries/${c.key}`)),
    ...getProjects().map((p) => ({ ...page(`/projects/${p.slug}`, 0.5), lastModified: new Date(p.lastUpdated) })),
  ];
}
