import Link from "next/link";
import type { Locale } from "@/data/i18n";
import { hasLocale, journalLabels, journalPath, localized, readingMinutes, type JournalEntry } from "@/data/journal";
import { CapacityFigure } from "./JournalFigures";
import styles from "./Journal.module.css";

/** `inArticle`: the article header states the language itself, so the meta line leaves it out. */
export function EntryMeta({ entry, locale, inArticle = false }: { entry: JournalEntry; locale: Locale; inArticle?: boolean }) {
  const t = journalLabels[locale];
  const date = entry.publishedAt ?? entry.writtenAt;
  return <div className={styles.meta}><time dateTime={date}>{new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date))}</time><span>{t.kinds[entry.kind]}</span><span>{readingMinutes(entry, locale)} {t.minutes}</span>{entry.language !== locale && !inArticle ? <span>{hasLocale(entry, locale) ? t.translatedFrom : t.english}</span> : null}</div>;
}
export function JournalEntryCard({ entry, locale, featured = false }: { entry: JournalEntry; locale: Locale; featured?: boolean }) {
  const view = localized(entry, locale);
  if (!featured) return <article className={styles.entryRow}><span className={styles.meta}>{journalLabels[locale].kinds[entry.kind]}</span><div><h2 lang={view.language}><Link href={journalPath(entry, locale)}>{view.title}</Link></h2><p>{entry.summary[locale]}</p><EntryMeta entry={entry} locale={locale} /></div></article>;
  return <article className={styles.feature}><div className={styles.featureCopy}><EntryMeta entry={entry} locale={locale} /><h2 lang={view.language}><Link href={journalPath(entry, locale)}>{view.title}</Link></h2><p>{entry.summary[locale]}</p><Link className={styles.readLink} href={journalPath(entry, locale)}>{journalLabels[locale].read}</Link></div>{entry.slug === "ai-investment-nova-scotia-trust" ? <CapacityFigure locale={locale} compact /> : null}</article>;
}
