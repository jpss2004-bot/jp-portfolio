"use client";

import { useContext, useEffect, useRef } from "react";
import type { Locale } from "@/data/i18n";
import { MotionPause } from "./WorkMotion";
import styles from "./Work.module.css";

export function LoopFilm({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLVideoElement>(null);
  const paused = useContext(MotionPause);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || paused || media.matches || document.hidden) { video.pause(); return; }
      video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .15 });
    observer.observe(video);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); media.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); video.pause(); };
  }, [paused]);
  return <figure className={styles.loopFilm}><video ref={ref} poster="/projects/checkwise/loops/review-decision.webp" width={1280} height={672} muted loop playsInline controls preload="none" aria-label={locale === "es" ? "Recorrido de revisión de CheckWise, en bucle" : "Looping CheckWise review walkthrough"}><source src="/projects/checkwise/loops/review-decision.mp4" type="video/mp4" /></video><figcaption>{locale === "es" ? "Recorrido real de revisión, con datos de demostración. Reproducción en bucle." : "Actual review workflow with demo data. Looping product walkthrough."}</figcaption></figure>;
}
