import Image from "next/image";
import { journalLabels, showJournal } from "@/data/journal";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/data/i18n";
import { pick, profile, statusLabel, summer, type Media, type Status, type Visual } from "@/data/content";
import { VideoDemo } from "@/components/VideoDemo";
import { SystemVisual } from "@/components/SystemVisual";
import { ui } from "@/data/ui";
import { MobileMenu } from "./MobileMenu";
import menuStyles from "./MobileMenu.module.css";

/* ---------------------------------------------------------------------- */
/* Header                                                                   */
/* ---------------------------------------------------------------------- */

export function Header({ locale, altHref, home = false, languageHrefs }: { locale: Locale; altHref: string; home?: boolean; languageHrefs?: Partial<Record<Locale, string>> }) {
  const t = ui[locale];
  const base = `/${locale}`;
  const items = [
    { href: `${base}#work`, label: t.nav.work },
    { href: `${base}#build`, label: t.nav.build },
    { href: `${base}#summer`, label: t.nav.summer },
    { href: `${base}#about`, label: t.nav.about },
    ...(showJournal ? [{ href: `${base}/journal`, label: journalLabels[locale].name }] : []),
  ];
  return (
    <header className={`topbar ${menuStyles.header}`}>
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
            <Link href={languageHrefs?.en ?? `/en${altHref}`} hrefLang="en" aria-current={locale === "en" ? "true" : undefined} lang="en">
              EN
            </Link>
            <Link href={languageHrefs?.es ?? `/es${altHref}`} hrefLang="es" aria-current={locale === "es" ? "true" : undefined} lang="es">
              ES
            </Link>
          </nav>
          <a className="btn" href={pick(profile.resume, locale)} target="_blank" rel="noreferrer">
            {t.resume}
          </a>
          <MobileMenu label={locale === "es" ? "Menú" : "Menu"} items={[
            items[0],
            { href: `${base}#experience`, label: locale === "es" ? "Experiencia" : "Experience" },
            ...items.slice(1),
            { href: `${base}#contact`, label: locale === "es" ? "Contacto" : "Contact" },
            { href: pick(profile.resume, locale), label: `${t.resume} (PDF)` },
          ]} />
        </div>
      </div>
    </header>
  );
}

export function Footer({ locale, wide = false }: { locale: Locale; wide?: boolean }) {
  return (
    <footer className={`footer ${wide ? "frame" : "col"}`}>
      <p>© 2026 {profile.name}</p>
      {showJournal ? <p><Link href={`/${locale}/journal`}>{journalLabels[locale].name}</Link></p> : null}
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
      <figure className="shot media-frame media-interface">
        <div className="media-canvas">
        <a className="media-open" href={media.src} target="_blank" rel="noreferrer" aria-label={`${locale === "es" ? "Abrir imagen completa" : "Open full-size image"}: ${pick(media.alt, locale)}`}><Image
          src={media.src}
          alt={pick(media.alt, locale)}
          width={media.width}
          height={media.height}
          sizes="(max-width: 900px) 100vw, 1040px"
          quality={85}
          loading={priority ? "eager" : "lazy"}
        /></a>
        </div>
        <figcaption><span>{locale === "es" ? "Captura del producto" : "Product capture"}</span><a href={media.src} target="_blank" rel="noreferrer">{locale === "es" ? "Abrir imagen completa" : "Open full-size image"}</a></figcaption>
      </figure>
    );
  }
  return <Diagram kind={media.diagram} locale={locale} />;
}

export function Diagram({ kind, locale }: { kind: "verifaid" | "pipelines"; locale: Locale }) {
  return <SystemVisual kind={kind} locale={locale} detailed />;
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

/* Product captures and authored explanations share a quiet frame. */
export function VisualFrame({ visual, locale, sizes = "(max-width: 900px) 100vw, 760px", priority = false, className = "", detailed = false }: { visual: Visual; locale: Locale; sizes?: string; priority?: boolean; className?: string; detailed?: boolean }) {
  if (visual.kind === "system") return <SystemVisual kind={visual.system} locale={locale} className={className} detailed={detailed} />;
  const enlarge = locale === "es" ? "Abrir imagen completa" : "Open full-size image";
  return (
    <figure className={`shot media-frame media-interface ${className}`}>
      <div className="media-canvas">
        {visual.kind === "video" ? (
          <VideoDemo src={visual.src} poster={visual.poster} label={pick(visual.alt, locale)} width={visual.width} height={visual.height} />
        ) : (
          <a className={`media-open${visual.focus ? " media-focus-compliance" : ""}`} href={visual.src} target="_blank" rel="noreferrer" aria-label={`${enlarge}: ${pick(visual.alt, locale)}`}>
            <Image className="shot-media" src={visual.src} alt={pick(visual.alt, locale)} width={visual.width} height={visual.height} sizes={sizes} quality={85} loading={priority ? "eager" : "lazy"} />
          </a>
        )}
      </div>
      <figcaption>
        {visual.caption ? <span>{pick(visual.caption, locale)}</span> : null}
        {visual.kind === "image" ? <a href={visual.src} target="_blank" rel="noreferrer">{enlarge}</a> : null}
      </figcaption>
    </figure>
  );
}
