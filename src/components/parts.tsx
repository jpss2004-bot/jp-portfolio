import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/data/i18n";
import { pick, profile, statusLabel, summer, type Media, type Status } from "@/data/content";
import { ui } from "@/data/ui";

/* ---------------------------------------------------------------------- */
/* Header                                                                   */
/* ---------------------------------------------------------------------- */

export function Header({ locale, altHref, home = false }: { locale: Locale; altHref: string; home?: boolean }) {
  const t = ui[locale];
  const base = `/${locale}`;
  const items = [
    { href: `${base}#work`, label: t.nav.work },
    { href: `${base}#build`, label: t.nav.build },
    { href: `${base}#summer`, label: t.nav.summer },
    { href: `${base}#about`, label: t.nav.about },
  ];
  return (
    <header className="topbar">
      <div className="topbar-in">
        <Link className="wordmark" href={base} aria-current={home ? "page" : undefined}>
          {profile.shortName}
        </Link>
        <nav className="topnav" aria-label={locale === "es" ? "Secciones" : "Sections"}>
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="topbar-end">
          <nav className="lang" aria-label={locale === "es" ? "Idioma" : "Language"}>
            <Link href={`/en${altHref}`} hrefLang="en" aria-current={locale === "en" ? "true" : undefined} lang="en">
              EN
            </Link>
            <Link href={`/es${altHref}`} hrefLang="es" aria-current={locale === "es" ? "true" : undefined} lang="es">
              ES
            </Link>
          </nav>
          <a className="btn" href={pick(profile.resume, locale)} target="_blank" rel="noreferrer">
            {t.resume}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="footer col">
      <p>© 2026 {profile.name}</p>
      <p className="muted">{ui[locale].footer}</p>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* Hero: the name reveal                                                    */
/* ---------------------------------------------------------------------- */

/**
 * Two lines of display type rise into place, then the portrait settles into
 * the column between the words. The portrait has its own column, so it frames
 * the name without covering a letter at any width.
 */
export function NameReveal({ locale }: { locale: Locale }) {
  const [[a, b], [c, d]] = profile.nameLines;
  const word = (text: string, line: number, side: "l" | "r") => (
    <span className={`nw nw-${side}`} style={{ gridRow: line + 1 }}>
      <span className="nw-in" style={{ "--i": line } as CSSProperties}>
        {text}
      </span>
    </span>
  );
  return (
    <h1 className="name" aria-label={profile.name}>
      {word(a, 0, "l")}
      {word(b, 0, "r")}
      {word(c, 1, "l")}
      {word(d, 1, "r")}
      <span className="name-portrait" aria-hidden="true">
        <Image
          src={profile.portrait}
          alt=""
          width={760}
          height={1018}
          sizes="(max-width: 700px) 72px, 150px"
          quality={85}
          loading="eager"
          fetchPriority="high"
        />
      </span>
      <span className="sr-only">{locale === "es" ? "Retrato de José Pablo Sámano Suárez" : "Portrait of José Pablo Sámano Suárez"}</span>
    </h1>
  );
}

/* ---------------------------------------------------------------------- */
/* Small pieces                                                             */
/* ---------------------------------------------------------------------- */

export function StatusTag({ status, locale }: { status: Status; locale: Locale }) {
  return (
    <span className={`status status-${status}`}>
      <i aria-hidden="true" />
      {pick(statusLabel[status], locale)}
    </span>
  );
}

export function ProjectMedia({ media, locale, priority = false }: { media: Media; locale: Locale; priority?: boolean }) {
  if (media.type === "image") {
    return (
      <figure className="shot">
        <Image
          src={media.src}
          alt={pick(media.alt, locale)}
          width={media.width}
          height={media.height}
          sizes="(max-width: 900px) 100vw, 1040px"
          quality={85}
          priority={priority}
        />
      </figure>
    );
  }
  return <Diagram kind={media.diagram} locale={locale} />;
}

/* A flat, honest drawing of the pipeline: stages on a line, the final one filled. */
export function Diagram({ kind, locale }: { kind: "verifaid" | "pipelines"; locale: Locale }) {
  const t = ui[locale].diagram;
  const stages = kind === "verifaid" ? t.verifaid : t.pipelines;
  const note = kind === "verifaid" ? t.verifaidNote : t.pipelinesNote;
  const w = 1040;
  const h = 250;
  const pad = 70;
  const step = (w - pad * 2) / (stages.length - 1);
  return (
    <figure className="shot diagram">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${stages.join(" → ")}. ${note}`}>
        <line x1={pad} x2={w - pad} y1={120} y2={120} className="d-line" />
        {stages.map((s, i) => {
          const x = pad + i * step;
          const last = i === stages.length - 1;
          return (
            <g key={s}>
              <circle cx={x} cy={120} r={last ? 11 : 7} className={last ? "d-node d-node-end" : "d-node"} />
              <text x={x} y={i % 2 ? 168 : 86} textAnchor="middle" className="d-label">
                {s}
              </text>
              <text x={x} y={i % 2 ? 186 : 66} textAnchor="middle" className="d-index">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="d-list" aria-hidden="true">
        {stages.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

/* One bar per week of commits. Single series, so no legend; the title names it. */
export function SummerStrip({ locale }: { locale: Locale }) {
  const data = summer.weekly;
  const max = Math.max(...data);
  const w = 720;
  const h = 120;
  const gap = 4;
  const bw = (w - gap * (data.length - 1)) / data.length;
  const start = new Date(summer.weekStart + "T12:00:00");
  const fmt = (i: number) =>
    new Date(+start + i * 7 * 864e5).toLocaleDateString(locale === "es" ? "es-MX" : "en-CA", { month: "short", day: "numeric" });
  return (
    <figure className="strip">
      <svg viewBox={`0 0 ${w} ${h + 22}`} role="img" aria-label={ui[locale].summer.chartLabel}>
        {data.map((v, i) => {
          const bh = Math.max(2, (v / max) * h);
          return (
            <rect key={i} x={i * (bw + gap)} y={h - bh} width={bw} height={bh} rx={2} className="bar">
              <title>{`${fmt(i)}: ${v}`}</title>
            </rect>
          );
        })}
        <line x1={0} x2={w} y1={h + 0.5} y2={h + 0.5} className="base" />
        <text x={0} y={h + 17} className="tick">{fmt(0)}</text>
        <text x={w} y={h + 17} textAnchor="end" className="tick">{fmt(data.length - 1)}</text>
      </svg>
      <figcaption className="sr-only">{ui[locale].summer.chartLabel}</figcaption>
    </figure>
  );
}
