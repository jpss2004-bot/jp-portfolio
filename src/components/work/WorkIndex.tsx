"use client";

import Image from "next/image";
import { useState } from "react";
import type { IndexRow } from "@/data/work-index";
import styles from "./Showcase.module.css";

type Filter = { key: string; label: string };
type Labels = { list: string; open: string; all: string; type: string; year: string; empty: string; count: (n: number) => string };

/**
 * Projects as one index. Pointing at or focusing a row brings its artwork and
 * description into the panel beside the list. With `categories`, the list can
 * be narrowed by type and year.
 */
export function WorkIndex({ rows, labels, categories, years }: { rows: IndexRow[]; labels: Omit<Labels, "count"> & { countOne: string; countMany: string }; categories?: Filter[]; years?: string[] }) {
  const [active, setActive] = useState(rows[0]?.key);
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const shown = rows.filter((row) => (category === "all" || row.category === category) && (year === "all" || row.yearNum === year));
  const current = shown.find((row) => row.key === active) ?? shown[0];
  const chip = (value: string, selected: string, set: (v: string) => void, label: string) => (
    <button key={value} type="button" aria-pressed={selected === value} onClick={() => set(value)}>{label}</button>
  );
  return (
    <>
      {categories ? (
        <div className={styles.filters}>
          <div role="group" aria-label={labels.type}><span>{labels.type}</span>{chip("all", category, setCategory, labels.all)}{categories.map((item) => chip(item.key, category, setCategory, item.label))}</div>
          {years && years.length > 1 ? <div role="group" aria-label={labels.year}><span>{labels.year}</span>{chip("all", year, setYear, labels.all)}{years.map((value) => chip(value, year, setYear, value))}</div> : null}
          <p aria-live="polite">{shown.length} {shown.length === 1 ? labels.countOne : labels.countMany}</p>
        </div>
      ) : null}
      <div className={styles.index}>
        <ol className={styles.indexList} aria-label={labels.list}>
          {shown.map((row, i) => {
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
              <li key={row.key} data-active={current?.key === row.key || undefined} onPointerEnter={() => setActive(row.key)} onFocus={() => setActive(row.key)}>
                {row.href ? <a href={row.href} target={row.external ? "_blank" : undefined} rel={row.external ? "noreferrer" : undefined}>{body}</a> : <div tabIndex={0}>{body}</div>}
              </li>
            );
          })}
          {!shown.length ? <li className={styles.indexEmpty}>{labels.empty}</li> : null}
        </ol>
        {current ? (
          <aside className={styles.indexPanel} aria-hidden="true">
            <div className={styles.indexArt}>
              {shown.map((row) => row.image ? (
                <Image key={row.key} src={row.image} alt="" fill sizes="460px" quality={85} data-on={current.key === row.key || undefined} style={{ objectFit: row.contain ? "contain" : "cover" }} />
              ) : null)}
              {!current.image ? <span className={styles.indexGlyph}>{current.name.slice(0, 1)}</span> : null}
            </div>
            <p className={styles.indexCaption}><strong>{current.name}</strong>{current.line}</p>
            {current.href ? <p className={styles.indexOpen}>{labels.open} <span>{current.external ? "↗" : "→"}</span></p> : null}
          </aside>
        ) : null}
      </div>
    </>
  );
}
