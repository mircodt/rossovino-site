import type { MetadataRoute } from "next";
import { PROPERTY_ORDER, SITE } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  for (const slug of PROPERTY_ORDER) {
    const base = `${SITE.url}/${slug}`;
    entries.push(
      { url: base, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/camere`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/servizi`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
      { url: `${base}/contatti`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    );
  }

  entries.push({
    url: `${SITE.url}/contatti`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  });

  return entries;
}
