import type { Locale } from "@/data/i18n";
import { journalAsset, journalLabels, journalPath, type JournalEntry } from "@/data/journal";
import { identityGraph } from "./structured-data";
import { siteUrl } from "./site";

export function journalStructuredData(locale: Locale, entries: JournalEntry[], entry?: JournalEntry) {
  const journalUrl = `${siteUrl}/${locale}/journal`;
  const url = entry ? `${siteUrl}${journalPath(entry)}` : journalUrl;
  const person = { "@id": `${siteUrl}/#person` };
  return { "@context": "https://schema.org", "@graph": [
    ...identityGraph(locale),
    { "@type": "Blog", "@id": `${journalUrl}#journal`, url: journalUrl, name: journalLabels[locale].name, inLanguage: locale, publisher: person, isPartOf: { "@id": `${siteUrl}/#website` } },
    { "@type": entry ? "WebPage" : "CollectionPage", "@id": `${url}#webpage`, url, name: entry?.title ?? journalLabels[locale].name, inLanguage: entry?.language ?? locale, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": entry ? `${url}#article` : `${journalUrl}#entries` }, ...(entry ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}) },
    ...(entry ? [
      { "@type": "Article", "@id": `${url}#article`, url, headline: entry.title, description: entry.summary[entry.language], inLanguage: entry.language, author: person, publisher: person, isPartOf: { "@id": `${journalUrl}#journal` }, mainEntityOfPage: { "@id": `${url}#webpage` }, dateCreated: entry.writtenAt, ...(entry.publishedAt ? { datePublished: entry.publishedAt, dateModified: entry.updatedAt ?? entry.publishedAt } : {}), ...(entry.cover ? { image: `${siteUrl}${journalAsset(entry, "cover")}` } : {}), keywords: entry.topics, ...(entry.externalPublication ? { sameAs: entry.externalPublication.url } : {}), citation: entry.references.map((reference) => ({ "@type": "CreativeWork", name: reference.label, url: reference.url })) },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "JP Sámano", item: `${siteUrl}/${locale}` },
        { "@type": "ListItem", position: 2, name: journalLabels[locale].name, item: journalUrl },
        { "@type": "ListItem", position: 3, name: entry.title, item: url },
      ] },
    ] : [{ "@type": "ItemList", "@id": `${journalUrl}#entries`, numberOfItems: entries.length, itemListElement: entries.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${siteUrl}${journalPath(item)}` })) }]),
  ] };
}
