"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Showcase.module.css";

export type IndexRow = { key: string; name: string; line: string; kind: string; year: string; href?: string; external: boolean; image?: string; contain?: boolean };

/**
 * Every other project as one index. Pointing at or focusing a row brings its
 * artwork and description into the panel beside the list.
 */
export function WorkIndex({ rows, label, openLabel }: { rows: IndexRow[]; label: string; openLabel: string }) {
  const [active, setActive] = useState(0);
  const current = rows[active];
  return (
    <div className={styles.index}>
      <ol className={styles.indexList} aria-label={label}>
        {rows.map((row, i) => {
          const body = (
            <>
              <span className={styles.indexNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.indexName}>{row.name}</span>
              <span className={styles.indexKind}>{row.kind}</span>
              <span className={styles.indexYear}>{row.year}</span>
              <span className={styles.indexLine}>{row.line}</span>
            </>
          );
          return (
            <li key={row.key} data-active={active === i || undefined} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              {row.href ? <a href={row.href} target={row.external ? "_blank" : undefined} rel={row.external ? "noreferrer" : undefined}>{body}</a> : <div tabIndex={0}>{body}</div>}
            </li>
          );
        })}
      </ol>
      <aside className={styles.indexPanel} aria-hidden="true">
        <div className={styles.indexArt}>
          {rows.map((row, i) => row.image ? (
            <Image key={row.key} src={row.image} alt="" fill sizes="460px" quality={85} data-on={active === i || undefined} style={{ objectFit: row.contain ? "contain" : "cover" }} />
          ) : null)}
          {!current.image ? <span className={styles.indexGlyph}>{current.name.slice(0, 1)}</span> : null}
        </div>
        <p className={styles.indexCaption}><strong>{current.name}</strong>{current.line}</p>
        {current.href ? <p className={styles.indexOpen}>{openLabel} <span>{current.external ? "↗" : "→"}</span></p> : null}
      </aside>
    </div>
  );
}
