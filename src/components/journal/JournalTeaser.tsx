import Link from "next/link";
import type { Locale } from "@/data/i18n";
import { journalLabels, journalPath, visibleEntries } from "@/data/journal";
import styles from "./Journal.module.css";

export function JournalTeaser({ locale }: { locale: Locale }) {
  const entry = visibleEntries()[0];
  if (!entry) return null;
  return <section className={styles.teaser} aria-labelledby="journal-home-heading"><div><h2 id="journal-home-heading"><Link href={`/${locale}/journal`}>{journalLabels[locale].name}</Link></h2><article><h3 lang={entry.language}><Link href={journalPath(entry)}>{entry.title}</Link></h3><p>{entry.summary[locale]}</p></article></div></section>;
}
