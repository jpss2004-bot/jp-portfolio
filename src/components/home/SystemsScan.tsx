"use client";

import Link from "next/link";
import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";

// Visual "signal strength" per project slot (spectrum-analyzer heights, %).
const HEIGHTS = [86, 54, 70, 46, 62, 58, 50];

function codeFor(slug: string) {
  return slug.split("-")[0].toUpperCase().slice(0, 4);
}

/**
 * Systems frequency scan — reframes the projects as signals detected on a band.
 * Each project is a vertical signal bar (varying strength) you can tune into;
 * hovering lights it up, clicking opens the case study.
 */
export function SystemsScan({ locale }: { locale: Locale }) {
  const items = caseStudies.map((p, i) => ({
    slug: p.slug,
    code: codeFor(p.slug),
    title: getLocalizedValue(p.title, locale),
    year: p.year,
    height: HEIGHTS[i % HEIGHTS.length],
    pos: caseStudies.length > 1 ? 6 + (i * 88) / (caseStudies.length - 1) : 50,
  }));

  return (
    <div className="sys-scan" aria-label={locale === "es" ? "Escaneo de frecuencia de sistemas" : "Systems frequency scan"}>
      <div className="sys-scan-head">
        <span className="sys-scan-label">
          <span className="sys-scan-live" />
          {locale === "es" ? "ESCANEO DE FRECUENCIA" : "FREQUENCY SCAN"}
        </span>
        <span className="sys-scan-range">
          {String(caseStudies.length).padStart(2, "0")} {locale === "es" ? "SEÑALES DETECTADAS" : "SIGNALS DETECTED"}
        </span>
      </div>

      <div className="sys-scan-band">
        {[0, 25, 50, 75, 100].map((g) => (
          <span key={g} className="sys-scan-grid" style={{ left: `${g}%` }} />
        ))}
        {items.map((it) => (
          <Link
            key={it.slug}
            href={`/${locale}/projects/${it.slug}`}
            className="sys-peak"
            style={{ left: `${it.pos}%` }}
            aria-label={`${it.code} — ${it.title}`}
          >
            <span className="sys-peak-dot" />
            <span className="sys-peak-bar" style={{ height: `${it.height}%` }} />
            <span className="sys-peak-code">{it.code}</span>
            <span className="sys-peak-card">
              <strong>{it.title}</strong>
              <em>{it.year}</em>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
