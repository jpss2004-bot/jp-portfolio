import type { Locale } from "@/data/i18n";
import { profile } from "@/data/content";
import { entryLocales, journalAsset, journalLabels, journalPath, localized, type JournalEntry } from "@/data/journal";
import { identityGraph } from "./structured-data";
import { articleDates } from "./publication-dates";
import { siteUrl } from "./site";

export function journalStructuredData(locale: Locale, entries: JournalEntry[], entry?: JournalEntry) {
  const journalUrl = `${siteUrl}/${locale}/journal`;
  const url = entry ? `${siteUrl}${journalPath(entry, locale)}` : journalUrl;
  const view = entry ? localized(entry, locale) : undefined;
  /* Each language version is its own work; a translation points at the original and the original lists its translations. */
  const version = (e: JournalEntry, l: Locale) => ({ "@type": "BlogPosting", "@id": `${siteUrl}${journalPath(e, l)}#article`, url: `${siteUrl}${journalPath(e, l)}`, inLanguage: l });
  const versions = entry ? {
    ...(view?.translated ? { translationOfWork: version(entry, entry.language) } : {}),
    ...(!view?.translated && entryLocales(entry).length > 1 ? { workTranslation: entryLocales(entry).slice(1).map((l) => version(entry, l)) } : {}),
  } : {};
  const person = { "@id": `${siteUrl}/#person` };
  const blog = { "@id": `${journalUrl}#journal` };
  const article = { "@id": `${url}#article` };
  const description = entry && view ? entry.summary[view.language] : journalLabels[locale].introduction;
  /* Articles without their own cover use their 1200×630 share card as the primary image. */
  const imageUrl = entry ? (entry.cover ? `${siteUrl}${journalAsset(entry, "cover")}` : `${siteUrl}/share/${view!.language}/article-${entry.slug}`) : undefined;
  const image = entry && imageUrl ? {
    "@type": "ImageObject",
    "@id": `${url}#primaryimage`,
    url: imageUrl,
    contentUrl: imageUrl,
    ...(entry.cover ? {} : { width: 1200, height: 630 }),
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
        name: view?.title ?? `${journalLabels[locale].name} · ${profile.shortName}`,
        description, inLanguage: view?.language ?? locale, author: person,
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
        "@type": "BlogPosting", ...article, url, headline: view!.title, description,
        inLanguage: view!.language, author: person, publisher: person, isPartOf: blog, ...versions,
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
        itemListElement: entries.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: localized(item, locale).title, url: `${siteUrl}${journalPath(item, locale)}` })),
      }]),
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.shortName, item: `${siteUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: journalLabels[locale].name, item: journalUrl },
          ...(entry ? [{ "@type": "ListItem", position: 3, name: view!.title, item: url }] : []),
        ],
      },
    ],
  };
}
