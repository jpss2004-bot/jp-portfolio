import Link from "next/link";
import type { Locale } from "@/data/i18n";
import { journalLabels, visibleEntries } from "@/data/journal";
import { journalCard } from "@/lib/journal-cards";
import { JournalCardView } from "./JournalCards";
import styles from "./Journal.module.css";

/** The latest three posts on the homepage. */
export function JournalTeaser({ locale }: { locale: Locale }) {
  const entries = visibleEntries().slice(0, 3);
  if (!entries.length) return null;
  const es = locale === "es";
  return (
    <section className={styles.teaser} data-tone="#258c8b" aria-labelledby="journal-home-heading">
      <header className={styles.teaserHead}>
        <h2 id="journal-home-heading"><Link href={`/${locale}/journal`}>{journalLabels[locale].name}</Link></h2>
        <p>{es ? "Notas largas sobre lo que construyo y las decisiones detrás." : "Longer notes on what I build and the decisions behind it."}</p>
        <Link className={styles.teaserAll} href={`/${locale}/journal`}>{es ? "Todas las entradas" : "All entries"} <span aria-hidden="true">→</span></Link>
      </header>
      <div className={styles.teaserGrid}>
        {entries.map((entry) => <JournalCardView key={entry.slug} card={journalCard(entry, locale)} />)}
      </div>
    </section>
  );
}
