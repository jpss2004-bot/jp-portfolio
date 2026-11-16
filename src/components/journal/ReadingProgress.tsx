"use client";

import { useEffect, useRef } from "react";
import styles from "./Journal.module.css";

export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-journal-article]");
    if (!article) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      ref.current?.style.setProperty("--reading-progress", String(Math.min(1, Math.max(0, -rect.top / distance))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  return <div ref={ref} className={styles.progress} aria-hidden="true" />;
}
