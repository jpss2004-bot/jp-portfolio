"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/i18n";
import { SignalWave } from "@/components/home/SignalWave";

type Chapter = { id: string; idx: string; en: string; es: string };

export const CHAPTERS: Chapter[] = [
  { id: "signal", idx: "00", en: "SIGNAL", es: "SEÑAL" },
  { id: "work", idx: "01", en: "SYSTEMS", es: "SISTEMAS" },
  { id: "stack", idx: "02", en: "STACK", es: "STACK" },
  { id: "process", idx: "03", en: "METHOD", es: "MÉTODO" },
  { id: "about", idx: "04", en: "ORIGIN", es: "ORIGEN" },
  { id: "contact", idx: "05", en: "TRANSMISSION", es: "TRANSMISIÓN" },
];

/**
 * Persistent instrument HUD — the narrative through-line. Tracks the active
 * chapter via IntersectionObserver, shows scroll progress, and lets you tune
 * (jump) between chapters. Fixed bottom bar + a top scroll-progress line.
 */
export function SignalHUD({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const p = root.scrollTop / Math.max(root.scrollHeight - root.clientHeight, 1);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) {
          const i = CHAPTERS.findIndex((c) => c.id === vis.target.id);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.4, 0.8] },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const ch = CHAPTERS[active];

  return (
    <>
      <div className="signal-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav className="signal-hud" aria-label={locale === "es" ? "Capítulos de señal" : "Signal chapters"}>
        <div className="hud-wave" aria-hidden="true">
          <SignalWave className="hud-wave-canvas" />
        </div>

        <div className="hud-now">
          <span className="hud-idx">{ch.idx}</span>
          <span className="hud-sep">/</span>
          <span className="hud-name">{locale === "es" ? ch.es : ch.en}</span>
        </div>

        <ol className="hud-ticks">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className={i === active ? "active" : ""}
                aria-current={i === active ? "true" : undefined}
                aria-label={`${c.idx} ${locale === "es" ? c.es : c.en}`}
              >
                <span className="hud-tick" />
                <span className="hud-tick-label">{c.idx}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="hud-meter">
          <span className="hud-meter-dot" />
          <span className="hud-pct">{String(Math.round(progress * 100)).padStart(3, "0")}</span>
        </div>
      </nav>
    </>
  );
}
