"use client";

import { useEffect, useState } from "react";
import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";

function shortName(title: string) {
  // "SAVR - Context-Aware Dining Platform" -> "SAVR"; "ER Triage & Queue Manager" -> "ER Triage"
  const head = title.split(/[-–—:|&]/)[0].trim();
  return head.length > 18 ? head.slice(0, 17).trim() + "…" : head;
}

/**
 * Systems index — a live navigator/tracker for the five systems. It highlights
 * the system you're currently reading (synced to scroll), previews its tagline,
 * and lets you jump to any of them. A "you are here" minimap, made useful.
 */
export function SystemsScan({ locale }: { locale: Locale }) {
  const items = caseStudies.map((p, i) => ({
    slug: p.slug,
    num: String(i + 1).padStart(2, "0"),
    name: shortName(getLocalizedValue(p.title, locale)),
    year: p.year,
    tagline: getLocalizedValue(p.tagline, locale),
  }));
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) {
          const i = caseStudies.findIndex((p) => `sys-${p.slug}` === vis.target.id);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.3, 0.7] },
    );
    caseStudies.forEach((p) => {
      const el = document.getElementById(`sys-${p.slug}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const current = items[active];

  return (
    <nav className="sys-index" aria-label={locale === "es" ? "Índice de sistemas" : "Systems index"}>
      <div className="sys-index-head">
        <span className="sys-index-label">
          <span className="sys-index-live" />
          {locale === "es" ? "ÍNDICE DE SISTEMAS" : "SYSTEMS INDEX"}
        </span>
        <span className="sys-index-now" aria-live="polite">
          <span className="sys-index-now-num">{current.num}</span>
          {current.tagline}
        </span>
      </div>

      <ul className="sys-index-track">
        {items.map((it, i) => (
          <li key={it.slug}>
            <a
              href={`#sys-${it.slug}`}
              className={i === active ? "sys-node active" : "sys-node"}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="sys-node-num">{it.num}</span>
              <span className="sys-node-name">{it.name}</span>
              <span className="sys-node-year">{it.year}</span>
              <span className="sys-node-mark" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
