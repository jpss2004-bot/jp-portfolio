import Link from "next/link";
import type { Locale } from "@/data/i18n";
import { journalLabels, journalPath, readingMinutes, type JournalEntry } from "@/data/journal";
import { CapacityFigure } from "./JournalFigures";
import styles from "./Journal.module.css";

export function EntryMeta({ entry, locale }: { entry: JournalEntry; locale: Locale }) {
  const t = journalLabels[locale];
  const date = entry.publishedAt ?? entry.writtenAt;
  return <div className={styles.meta}><time dateTime={date}>{new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date))}</time><span>{t.kinds[entry.kind]}</span><span>{readingMinutes(entry)} {t.minutes}</span>{entry.language !== locale ? <span>{t.english}</span> : null}</div>;
}
export function JournalEntryCard({ entry, locale, featured = false }: { entry: JournalEntry; locale: Locale; featured?: boolean }) {
  if (!featured) return <article className={styles.entryRow}><span className={styles.meta}>{journalLabels[locale].kinds[entry.kind]}</span><div><h2 lang={entry.language}><Link href={journalPath(entry)}>{entry.title}</Link></h2><p>{entry.summary[locale]}</p><EntryMeta entry={entry} locale={locale} /></div></article>;
  return <article className={styles.feature}><div className={styles.featureCopy}><EntryMeta entry={entry} locale={locale} /><h2 lang={entry.language}><Link href={journalPath(entry)}>{entry.title}</Link></h2><p>{entry.summary[locale]}</p><Link className={styles.readLink} href={journalPath(entry)}>{journalLabels[locale].read}</Link></div>{entry.slug === "ai-investment-nova-scotia-trust" ? <CapacityFigure locale={locale} compact /> : null}</article>;
}
