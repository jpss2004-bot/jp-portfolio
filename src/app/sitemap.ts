import type { MetadataRoute } from "next";
import { allCaseSlugs } from "@/data/content";
import { locales } from "@/data/i18n";
import { siteUrl } from "@/lib/site";

const updated = new Date("2026-09-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (path: string) => ({
    languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
  });
  return [
    ...locales.map((l) => ({ url: `${siteUrl}/${l}`, lastModified: updated, alternates: pair("") })),
    ...locales.flatMap((l) => allCaseSlugs.map((slug) => ({ url: `${siteUrl}/${l}/projects/${slug}`, lastModified: updated, alternates: pair(`/projects/${slug}`) }))),
    { url: `${siteUrl}/summer-2026`, lastModified: updated },
  ];
}
