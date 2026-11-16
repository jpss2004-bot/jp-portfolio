import Link from "next/link";
import type { CSSProperties } from "react";
import type { JournalCard } from "@/lib/journal-cards";
import { ProjectArt } from "@/components/work/ProjectArt";
import styles from "./JournalCards.module.css";

/** A post's cover: its own image, the related project's screenshot, or a quiet tile. */
export function CardCover({ card, sizes, priority = false }: { card: JournalCard; sizes: string; priority?: boolean }) {
  if (card.cover?.kind === "project") return <span className={styles.cover}><ProjectArt visual={card.cover.visual} name={card.title} sizes={sizes} priority={priority} hidden /></span>;
  if (card.cover?.kind === "image") {
    return (
      <span className={`${styles.cover} ${styles.imageCover}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- the gated asset route serves this file; next/image cannot optimise it at build time */}
        <img src={card.cover.src} alt="" loading={priority ? "eager" : "lazy"} />
      </span>
    );
  }
  return <span className={`${styles.cover} ${styles.plainCover}`} aria-hidden="true"><b>{card.topics[0]?.label ?? card.kind}</b></span>;
}

export function CardMeta({ card }: { card: JournalCard }) {
  return (
    <p className={styles.meta}>
      <time dateTime={card.date}>{card.dateLabel}</time>
      <span>{card.minutes}</span>
      {card.foreign ? <span>{card.foreign}</span> : null}
      {card.draft ? <span className={styles.draft}>Draft</span> : null}
    </p>
  );
}

export function CardTopics({ card }: { card: JournalCard }) {
  if (!card.topics.length) return null;
  return <ul className={styles.topics}>{card.topics.map((topic) => <li key={topic.key}>{topic.label}</li>)}</ul>;
}

/** A standard post card. The whole card is one link; the title carries its name. */
export function JournalCardView({ card, priority = false, headingLevel = "h3" }: { card: JournalCard; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={styles.card} style={{ "--tone": card.tone } as CSSProperties}>
      <CardCover card={card} sizes="(max-width: 760px) 92vw, 380px" priority={priority} />
      <div className={styles.body}>
        <CardMeta card={card} />
        <Heading className={styles.title} lang={card.language}><Link href={card.href}>{card.title}</Link></Heading>
        <p className={styles.summary}>{card.summary}</p>
        <CardTopics card={card} />
      </div>
    </article>
  );
}
