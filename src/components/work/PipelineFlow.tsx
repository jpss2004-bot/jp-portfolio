"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Pipeline.module.css";

export type Stage = { name: string; detail: string };

const HOLD = 3200;

/**
 * A document moving through a pipeline, drawn in code. It advances on its own
 * only while visible and never with reduced motion; every stage is a button.
 */
export function PipelineFlow({ stages, labels }: { stages: Stage[]; labels: { play: string; pause: string; stage: string; note: string } }) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(node);
    const start = window.setTimeout(() => { if (!reduced.matches) setPlaying(true); }, 0);
    return () => { observer.disconnect(); window.clearTimeout(start); };
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % stages.length), HOLD);
    return () => window.clearTimeout(timer);
  }, [playing, visible, index, stages.length]);

  const stage = stages[index];
  return (
    <div ref={root} className={styles.root} style={{ "--count": stages.length, "--at": index } as CSSProperties}>
      <div className={styles.rail}>
        <span className={styles.line} aria-hidden="true"><i /></span>
        <span className={styles.doc} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3v5h5M10 12h5M10 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </span>
        <ol className={styles.nodes}>
          {stages.map((item, i) => (
            <li key={item.name}>
              <button type="button" aria-current={i === index ? "step" : undefined} data-done={i < index || undefined} aria-label={`${labels.stage} ${i + 1}: ${item.name}`} onClick={() => { setIndex(i); setPlaying(false); }}>
                <i aria-hidden="true">{String(i + 1).padStart(2, "0")}</i>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.detail} aria-live={playing ? "off" : "polite"}>
        <p className={styles.step}>{String(index + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</p>
        <h3 key={stage.name}>{stage.name}</h3>
        <p key={stage.detail} className={styles.text}>{stage.detail}</p>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? `Ⅱ ${labels.pause}` : `▶ ${labels.play}`}</button>
        <span>{labels.note}</span>
      </div>
    </div>
  );
}
