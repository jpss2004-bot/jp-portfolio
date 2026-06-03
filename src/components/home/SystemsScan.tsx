"use client";

import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";

function shortName(title: string) {
  // "SAVR - Context-Aware Dining Platform" -> "SAVR"; "ER Triage & Queue Manager" -> "ER Triage"
  const head = title.split(/[-–—:|&]/)[0].trim();
  return head.length > 18 ? head.slice(0, 17).trim() + "…" : head;
}

/**
 * Systems index — a clear, functional navigator for the five systems. Each is a
 * labeled, numbered station on a signal baseline; selecting one jumps to (and
 * highlights) its case-study card below. The "signal" aesthetic, made useful.
 */
export function SystemsScan({ locale }: { locale: Locale }) {
  const items = caseStudies.map((p, i) => ({
    slug: p.slug,
    num: String(i + 1).padStart(2, "0"),
    name: shortName(getLocalizedValue(p.title, locale)),
    year: p.year,
  }));

  return (
    <nav className="sys-index" aria-label={locale === "es" ? "Índice de sistemas" : "Systems index"}>
      <div className="sys-index-head">
        <span className="sys-index-label">
          <span className="sys-index-live" />
          {locale === "es" ? "ÍNDICE DE SISTEMAS" : "SYSTEMS INDEX"}
        </span>
        <span className="sys-index-hint">
          {String(items.length).padStart(2, "0")} {locale === "es" ? "sistemas · elige para saltar" : "systems · select to jump"}
        </span>
      </div>

      <ul className="sys-index-track">
        {items.map((it) => (
          <li key={it.slug}>
            <a href={`#sys-${it.slug}`} className="sys-node">
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
