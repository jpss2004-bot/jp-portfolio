import type { Locale } from "@/data/i18n";
import { profile } from "@/data/content";
import { journalAsset, journalLabels, journalPath, type JournalEntry } from "@/data/journal";
import { identityGraph } from "./structured-data";
import { articleDates } from "./publication-dates";
import { siteUrl } from "./site";

export function journalStructuredData(locale: Locale, entries: JournalEntry[], entry?: JournalEntry) {
  const journalUrl = `${siteUrl}/${locale}/journal`;
  const url = entry ? `${siteUrl}${journalPath(entry)}` : journalUrl;
  const person = { "@id": `${siteUrl}/#person` };
  const blog = { "@id": `${journalUrl}#journal` };
  const article = { "@id": `${url}#article` };
  const description = entry?.summary[entry.language] ?? journalLabels[locale].introduction;
  const image = entry?.cover ? {
    "@type": "ImageObject",
    "@id": `${url}#primaryimage`,
    url: `${siteUrl}${journalAsset(entry, "cover")}`,
    contentUrl: `${siteUrl}${journalAsset(entry, "cover")}`,
  } : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(locale),
      {
        "@type": "Blog", ...blog, url: journalUrl, name: journalLabels[locale].name,
        description: journalLabels[locale].introduction, inLanguage: locale,
        author: person, publisher: person, isPartOf: { "@id": `${siteUrl}/#website` },
        ...(entry ? { blogPost: article } : {}),
      },
      {
        "@type": entry ? "WebPage" : "CollectionPage", "@id": `${url}#webpage`, url,
        name: entry?.title ?? `${journalLabels[locale].name} · ${profile.shortName}`,
        description, inLanguage: entry?.language ?? locale, author: person,
        isPartOf: entry ? [{ "@id": `${siteUrl}/#website` }, blog] : { "@id": `${siteUrl}/#website` },
        mainEntity: entry ? article : { "@id": `${journalUrl}#entries` },
        about: blog, breadcrumb: { "@id": `${url}#breadcrumb` },
        // Preserve the known publication day without inventing a publication time.
        ...(entry?.publishedAt ? { datePublished: entry.publishedAt } : {}),
        ...(entry?.updatedAt ? { dateModified: entry.updatedAt } : {}),
        ...(image ? { primaryImageOfPage: { "@id": image["@id"] } } : {}),
      },
      ...(image ? [image] : []),
      ...(entry ? [{
        "@type": "BlogPosting", ...article, url, headline: entry.title, description,
        inLanguage: entry.language, author: person, publisher: person, isPartOf: blog,
        mainEntityOfPage: { "@id": `${url}#webpage` }, dateCreated: entry.writtenAt,
        ...articleDates(entry),
        ...(image ? { image: { "@id": image["@id"] } } : {}),
        isAccessibleForFree: true, keywords: entry.topics,
        ...(entry.externalPublication ? { sameAs: entry.externalPublication.url } : {}),
        ...(entry.pdf ? { encoding: {
          "@type": "MediaObject", contentUrl: `${siteUrl}${journalAsset(entry, "pdf")}`,
          encodingFormat: "application/pdf", inLanguage: entry.language,
        } } : {}),
        citation: entry.references.map(reference => ({ "@type": "CreativeWork", name: reference.label, url: reference.url })),
      }] : [{
        "@type": "ItemList", "@id": `${journalUrl}#entries`, numberOfItems: entries.length,
        itemListElement: entries.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${siteUrl}${journalPath(item)}` })),
      }]),
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.shortName, item: `${siteUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: journalLabels[locale].name, item: journalUrl },
          ...(entry ? [{ "@type": "ListItem", position: 3, name: entry.title, item: url }] : []),
        ],
      },
    ],
  };
}
