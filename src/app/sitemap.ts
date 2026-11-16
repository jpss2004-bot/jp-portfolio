import type { MetadataRoute } from "next";
import { allCaseSlugs } from "@/data/content";
import { locales } from "@/data/i18n";
import { journalPath, publishedEntries } from "@/data/journal";
import { siteUrl } from "@/lib/site";

const updated = new Date("2026-11-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (path: string) => ({
    languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
  });
  return [
    ...locales.map((l) => ({ url: `${siteUrl}/${l}`, lastModified: updated, alternates: pair("") })),
    ...locales.map((l) => ({ url: `${siteUrl}/${l}/work`, lastModified: updated, alternates: pair("/work") })),
    ...locales.flatMap((l) => allCaseSlugs.map((slug) => ({ url: `${siteUrl}/${l}/projects/${slug}`, lastModified: updated, alternates: pair(`/projects/${slug}`) }))),
    ...(publishedEntries().length ? [
      ...locales.map((locale) => ({ url: `${siteUrl}/${locale}/journal`, lastModified: updated, alternates: pair("/journal") })),
      ...publishedEntries().map((entry) => ({ url: `${siteUrl}${journalPath(entry)}`, lastModified: new Date(entry.updatedAt ?? entry.publishedAt!), alternates: { languages: { [entry.language]: `${siteUrl}${journalPath(entry)}` } } })),
    ] : []),
    { url: `${siteUrl}/summer-2026`, lastModified: new Date("2026-09-11") },
  ];
}
