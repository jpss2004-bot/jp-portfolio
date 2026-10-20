"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import styles from "./Work.module.css";

/** One scroll listener, batched reads/writes, and no React renders per frame. */
export function WorkMotion({ children, locale }: { children: ReactNode; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const plates = [...root.querySelectorAll<HTMLElement>("[data-work-plate]")];
    let frame = 0;
    const draw = () => {
      frame = 0;
      if (paused || media.matches) return;
      const height = window.innerHeight;
      const values = plates.map((plate) => {
        const r = plate.getBoundingClientRect();
        return Math.max(0, Math.min(1, (height - r.top) / (height * 0.72)));
      });
      plates.forEach((plate, i) => plate.style.setProperty("--work-progress", String(values[i])));
    };
    const schedule = () => { if (!frame && !paused && !media.matches) frame = requestAnimationFrame(draw); };
    const preference = () => {
      root.dataset.motion = paused || media.matches ? "off" : "on";
      schedule();
    };
    preference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    media.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", preference);
    };
  }, [paused]);

  return (
    <div ref={ref} className={styles.motionRoot}>
      <div className={styles.motionControl}>
        <span>{locale === "es" ? "Del producto a la arquitectura" : "From the product to the architecture"}</span>
        <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {locale === "es" ? (paused ? "Reanudar movimiento" : "Pausar movimiento") : (paused ? "Resume motion" : "Pause motion")}
        </button>
      </div>
      {children}
    </div>
  );
}
