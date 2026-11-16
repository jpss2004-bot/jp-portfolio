"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Walkthrough.module.css";

export type Scene = { src: string; fx: number; fy: number; zoom: number; text: string };
type Labels = { play: string; pause: string; previous: string; next: string; step: string; note: string };

const HOLD = 4600;

/**
 * A product walkthrough built in code: real captures, a camera that pans and
 * zooms to each point, and a caption per step. It plays only while visible,
 * never with reduced motion, and every step is reachable from the list.
 */
export function Walkthrough({ scenes, width, height, labels, alt }: { scenes: Scene[]; width: number; height: number; labels: Labels; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);
  const scene = scenes[index];
  const sources = [...new Set(scenes.map((item) => item.src))];

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(node);
    const start = window.setTimeout(() => { if (!reduced.matches) setPlaying(true); }, 0);
    return () => { observer.disconnect(); window.clearTimeout(start); };
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setTimeout(() => { setIndex((current) => (current + 1) % scenes.length); setCycle((n) => n + 1); }, HOLD);
    return () => window.clearTimeout(timer);
  }, [playing, visible, index, cycle, scenes.length]);

  const go = (next: number) => { setIndex((next + scenes.length) % scenes.length); setCycle((n) => n + 1); };
  /* Centre the focus point as far as the zoom allows without showing an edge. */
  const fx = scene.fx / 100, fy = scene.fy / 100, z = scene.zoom;
  const tx = Math.max(-(1 - fx) * (z - 1), Math.min(fx * (z - 1), 0.5 - fx));
  const ty = Math.max(-(1 - fy) * (z - 1), Math.min(fy * (z - 1), 0.5 - fy));
  const camera = { transformOrigin: `${scene.fx}% ${scene.fy}%`, transform: `translate(${tx * 100}%, ${ty * 100}%) scale(${z})` } as CSSProperties;

  return (
    <div ref={root} className={styles.root} data-playing={playing && visible ? "" : undefined}>
      <div className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
        <div className={styles.camera} style={camera}>
          {sources.map((src, i) => (
            <Image key={src} src={src} alt={i === 0 ? alt : ""} width={width} height={height} sizes="(max-width: 900px) 100vw, 900px" quality={85} data-on={scene.src === src || undefined} />
          ))}
        </div>
        <span className={styles.focus} aria-hidden="true" key={`${index}-${cycle}`} />
        <p className={styles.caption} key={index}><b>{String(index + 1).padStart(2, "0")}</b>{scene.text}</p>
        <div className={styles.progress} aria-hidden="true"><i key={`${index}-${cycle}`} style={{ animationDuration: `${HOLD}ms` }} /></div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.play} onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>{playing ? `Ⅱ ${labels.pause}` : `▶ ${labels.play}`}</button>
        <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous}>←</button>
        <button type="button" onClick={() => go(index + 1)} aria-label={labels.next}>→</button>
        <span>{labels.note}</span>
      </div>
      <ol className={styles.steps}>
        {scenes.map((item, i) => (
          <li key={item.text}><button type="button" aria-current={index === i ? "step" : undefined} aria-label={`${labels.step} ${i + 1}: ${item.text}`} onClick={() => { go(i); setPlaying(false); }}><span>{String(i + 1).padStart(2, "0")}</span>{item.text}</button></li>
        ))}
      </ol>
    </div>
  );
}
