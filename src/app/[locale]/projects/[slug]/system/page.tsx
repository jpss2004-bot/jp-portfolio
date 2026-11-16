import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { shareImage } from "@/lib/share";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { getProject, pick, profile } from "@/data/content";
import { systems, systemSlugs } from "@/data/systems";
import { visualFor } from "@/data/visuals";
import { Footer, Header } from "@/components/parts";
import { StructuredData } from "@/components/StructuredData";
import { systemStructuredData } from "@/lib/structured-data";
import { SystemMapView } from "@/components/work/system/SystemMap";
import { WorkMotion } from "@/components/work/WorkMotion";
import { ProjectMark } from "@/components/work/ProjectMark";
import { StageAtmosphere } from "@/components/work/StageAtmosphere";
import workStyles from "@/components/work/Work.module.css";
import s from "@/components/work/system/SystemPage.module.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => systemSlugs.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

const titleFor = (name: string, locale: Locale) => (locale === "es" ? `Cómo funciona ${name}` : `How ${name} works`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const map = systems[slug];
  if (!isLocale(locale) || !project || !map) return {};
  const title = `${titleFor(pick(project.title, locale), locale)} · ${profile.shortName}`;
  const description = map.intro[locale];
  const path = `/projects/${slug}/system`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { en: `/en${path}`, es: `/es${path}`, "x-default": `/en${path}` } },
    openGraph: { type: "article", title, description, url: `/${locale}${path}`, siteName: profile.name, locale: locale === "es" ? "es_MX" : "en_CA", images: [shareImage(locale, slug, title)] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage(locale, slug, title)] },
  };
}

export default async function SystemPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const project = getProject(slug);
  const map = systems[slug];
  if (!isLocale(raw) || !project || !map) notFound();
  const locale: Locale = raw;
  const es = locale === "es";
  const name = pick(project.title, locale);
  const title = titleFor(name, locale);
  const tone = visualFor(slug, name).tone;
  const caseHref = `/${locale}/projects/${slug}`;
  const request = map.parts.filter((p) => p.when === "request").length;
  const ahead = map.parts.filter((p) => p.when === "ahead").length;
  const index = systemSlugs.indexOf(slug);
  const prev = systemSlugs[index - 1], next = systemSlugs[index + 1];
  const titleOf = (other: string) => pick(getProject(other)!.title, locale);

  return (
    <>
      <StructuredData data={systemStructuredData(project, locale, title, map.intro[locale])} />
      <a href="#main" className="skip-link">{es ? "Ir al contenido" : "Skip to content"}</a>
      <Header locale={locale} altHref={`/projects/${slug}/system`} />
      <WorkMotion locale={locale} showControls={false} className={`${workStyles.caseMotion} ${workStyles[slug] ?? workStyles.toned}`} style={{ "--tone": tone } as CSSProperties}>
        <div className={workStyles.caseBackdrop} data-motion-scene><StageAtmosphere /></div>
        <main id="main" className={`case ${s.page}`} tabIndex={-1} data-tone={tone}>
          <header className={`frame ${s.head}`}>
            <p className={s.back}><Link className="link" href={caseHref}>← {es ? `El caso de ${name}` : `${name} case study`}</Link></p>
            <div className={s.titleRow}>
              <ProjectMark slug={slug} />
              <p className={s.kicker}>{es ? "Mapa del sistema" : "System map"}</p>
            </div>
            <h1 className={s.title}>{title}</h1>
            <p className={s.lead}>{map.intro[locale]}</p>
            <dl className={s.facts}>
              <div><dt>{es ? "pasos por solicitud" : "steps per request"}</dt><dd>{request}</dd></div>
              {ahead ? <div><dt>{es ? "pasos preparados antes" : "steps built ahead"}</dt><dd>{ahead}</dd></div> : null}
              <div><dt>{es ? "lugares donde corre" : "places it runs"}</dt><dd>{map.lanes.length}</dd></div>
            </dl>
          </header>

          <section className="frame" aria-labelledby="system-map-h">
            <h2 id="system-map-h" className="sr-only">{es ? "Mapa del sistema" : "System map"}</h2>
            <div className={s.body}><SystemMapView map={map} locale={locale} name={name} /></div>
          </section>

          <footer className={`frame ${s.foot}`}>
            <p className={s.sources}><b>{es ? "Fuentes" : "Sources"}</b>{map.sources[locale]} {es ? "Es un mapa lógico, no telemetría en vivo." : "It is a logical map, not live telemetry."}</p>
            <nav className={s.pager} aria-label={es ? "Otros mapas de sistema" : "Other system maps"}>
              {prev ? <Link href={`/${locale}/projects/${prev}/system`}><span>← {es ? "Mapa anterior" : "Previous map"}</span><b>{titleOf(prev)}</b></Link> : <Link href={caseHref}><span>← {es ? "Volver al caso" : "Back to the case"}</span><b>{name}</b></Link>}
              {next ? <Link href={`/${locale}/projects/${next}/system`}><span>{es ? "Siguiente mapa" : "Next map"} →</span><b>{titleOf(next)}</b></Link> : <Link href={`/${locale}/work`}><span>{es ? "Todo el trabajo" : "All work"} →</span><b>{es ? "Proyectos" : "Projects"}</b></Link>}
            </nav>
          </footer>
        </main>
      </WorkMotion>
      <Footer locale={locale} wide />
    </>
  );
}
