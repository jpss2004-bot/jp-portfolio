"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { JournalCard } from "@/lib/journal-cards";
import { CardCover, CardMeta, CardTopics, JournalCardView } from "./JournalCards";
import styles from "./JournalCards.module.css";

type Labels = { all: string; topics: string; read: string; related: string; countOne: string; countMany: string; empty: string };

/** The Journal index: the latest post featured, the rest as cards, filterable by topic. */
export function JournalIndex({ cards, labels }: { cards: JournalCard[]; labels: Labels }) {
  const [topic, setTopic] = useState("all");
  const topics = [...new Map(cards.flatMap((card) => card.topics).map((item) => [item.key, item.label])).entries()];
  const shown = cards.filter((card) => topic === "all" || card.topics.some((item) => item.key === topic));
  const [lead, ...rest] = shown;
  return (
    <>
      {topics.length > 1 ? (
        <div className={styles.filters} role="group" aria-label={labels.topics}>
          <span>{labels.topics}</span>
          <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")}>{labels.all}</button>
          {topics.map(([key, label]) => <button key={key} type="button" aria-pressed={topic === key} onClick={() => setTopic(key)}>{label}</button>)}
          <p aria-live="polite">{shown.length} {shown.length === 1 ? labels.countOne : labels.countMany}</p>
        </div>
      ) : null}
      {lead ? (
        <article className={styles.featured} style={{ "--tone": lead.tone } as CSSProperties}>
          <CardCover card={lead} sizes="(max-width: 900px) 92vw, 640px" priority />
          <div className={styles.featuredBody}>
            <CardMeta card={lead} />
            <h2 className={styles.featuredTitle} lang={lead.language}><Link href={lead.href}>{lead.title}</Link></h2>
            <p className={styles.featuredSummary}>{lead.summary}</p>
            <CardTopics card={lead} />
            <p className={styles.featuredLinks}>
              <Link className={styles.readLink} href={lead.href}>{labels.read} <span aria-hidden="true">→</span></Link>
              {lead.project ? <Link className={styles.relatedLink} href={lead.project.href}>{labels.related} <span aria-hidden="true">↗</span></Link> : null}
            </p>
          </div>
        </article>
      ) : <p className={styles.empty}>{labels.empty}</p>}
      {rest.length ? <div className={styles.grid}>{rest.map((card) => <JournalCardView key={card.slug} card={card} headingLevel="h2" />)}</div> : null}
    </>
  );
}
