"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Story.module.css";

export type StoryStep = { title: string; text: string; src: string; fx: number; fy: number; zoom: number };

/**
 * Pinned product story: scrolling moves through the steps while a camera pans
 * and zooms over real captures. The step buttons do the same without scrolling,
 * and with reduced motion the section is not pinned at all.
 */
export function ScrollStory({ steps, width, height, kicker, alt, note }: { steps: StoryStep[]; width: number; height: number; kicker: string; alt: string; note: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const read = () => {
      frame = 0;
      if (reduced.matches) return;
      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      setProgress((current) => (Math.abs(current - p) > 0.004 ? p : current));
      setIndex(Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [steps.length]);

  const jump = (target: number) => {
    const node = track.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setIndex(target); setProgress((target + 0.5) / steps.length); return; }
    const top = node.getBoundingClientRect().top + window.scrollY;
    const span = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((target + 0.5) / steps.length), behavior: "smooth" });
  };

  const step = steps[index];
  const fx = step.fx / 100, fy = step.fy / 100, z = step.zoom;
  const tx = Math.max(-(1 - fx) * (z - 1), Math.min(fx * (z - 1), 0.5 - fx));
  const ty = Math.max(-(1 - fy) * (z - 1), Math.min(fy * (z - 1), 0.5 - fy));
  const camera = { transformOrigin: `${step.fx}% ${step.fy}%`, transform: `translate(${tx * 100}%, ${ty * 100}%) scale(${z})` } as CSSProperties;
  const sources = [...new Set(steps.map((item) => item.src))];

  return (
    <div ref={track} className={styles.track} style={{ "--steps": steps.length } as CSSProperties}>
      <div className={styles.pin}>
        <div className={styles.scene}>
          <div className={styles.copy}>
            <p className={styles.kicker}>{kicker}</p>
            <p className={styles.counter} aria-hidden="true"><b>{String(index + 1).padStart(2, "0")}</b> / {String(steps.length).padStart(2, "0")}</p>
            <div className={styles.words} aria-live="polite">
              {steps.map((item, i) => (
                <div key={item.title} className={styles.word} data-on={i === index || undefined} data-past={i < index || undefined} aria-hidden={i === index ? undefined : true}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <ol className={styles.steps}>
              {steps.map((item, i) => (
                <li key={item.title}><button type="button" aria-current={i === index ? "step" : undefined} onClick={() => jump(i)}><span>{String(i + 1).padStart(2, "0")}</span>{item.title}</button></li>
              ))}
            </ol>
          </div>
          <figure className={styles.screen}>
            <div className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
              <div className={styles.camera} style={camera}>
                {sources.map((src, i) => <Image key={src} src={src} alt={i === 0 ? alt : ""} width={width} height={height} sizes="(max-width: 900px) 100vw, 860px" quality={85} data-on={step.src === src || undefined} />)}
              </div>
            </div>
            <figcaption>{note}</figcaption>
          </figure>
          <div className={styles.meter} aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>
        </div>
      </div>
    </div>
  );
}
