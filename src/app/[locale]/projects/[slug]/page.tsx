import type { Metadata } from "next";
import { shareImage } from "@/lib/share";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { allCaseSlugs, caseOrder, getProject, pick, profile, statusLabel, type Figure } from "@/data/content";
import { ui } from "@/data/ui";
import { Footer, Header, ProjectMedia, VisualFrame } from "@/components/parts";

import { StructuredData } from "@/components/StructuredData";
import { projectStructuredData } from "@/lib/structured-data";

import { SystemExplorer } from "@/components/work/SystemExplorer";
import { CountUp } from "@/components/CountUp";
import { Walkthrough } from "@/components/work/Walkthrough";
import { workStories } from "@/data/work";
import { ScrollSpyNav } from "@/components/work/ScrollSpyNav";
import { architectures } from "@/data/architecture";
import { WorkMotion } from "@/components/work/WorkMotion";
import { ProjectStage } from "@/components/work/ProjectStage";
import { ProjectMark } from "@/components/work/ProjectMark";
import { StageAtmosphere } from "@/components/work/StageAtmosphere";
import workStyles from "@/components/work/Work.module.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => allCaseSlugs.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const title = `${pick(project.title, locale)} · ${profile.shortName}`;
  const description = pick(project.oneLiner, locale);
  const path = `/projects/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { en: `/en${path}`, es: `/es${path}`, "x-default": `/en${path}` } },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/${locale}${path}`,
      siteName: profile.name,
      locale: locale === "es" ? "es_MX" : "en_CA",
      images: [shareImage(locale, slug, title)],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage(locale, slug, title)] },
  };
}

function Inline({ figure, locale }: { figure: Figure; locale: Locale }) {
  const open = locale === "es" ? "Abrir imagen completa" : "Open full-size image";
  return (
    <figure className="case-inline shot media-frame media-interface" data-reveal="rise">
      <div className="media-canvas">
        <a className="media-open" href={figure.src} target="_blank" rel="noreferrer" aria-label={`${open}: ${pick(figure.alt, locale)}`}><Image src={figure.src} alt={pick(figure.alt, locale)} width={figure.width} height={figure.height} sizes="(max-width: 900px) 100vw, 1000px" quality={85} /></a>
      </div>
      <figcaption><span>{pick(figure.caption, locale)}</span><a href={figure.src} target="_blank" rel="noreferrer">{open}</a></figcaption>
    </figure>
  );
}

export default async function CasePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(raw) || !project) notFound();
  const locale: Locale = raw;
  const t = ui[locale];
  const c = project.caseStudy;
  const order = caseOrder();
  const idx = order.findIndex((p) => p.slug === slug);
  const prev = order[idx - 1];
  const next = order[idx + 1];
  const base = `/${locale}`;
  const es = locale === "es";
  const story = workStories[slug];
  const walk = story?.walkthrough;
  const gallery = c?.gallery ?? [];
  const inline = gallery.length >= 4 ? [gallery[1], gallery[2]] : [];
  const screens = gallery.filter((g) => !inline.includes(g));
  const sections = [
    ...(architectures[slug] ? [{ id: "system", label: es ? "Sistema" : "System" }] : []),
    ...(c ? [
      { id: "problem", label: t.case.problem },
      { id: "constraints", label: t.case.constraints },
      { id: "decisions", label: t.case.decisions },
      ...(walk || project.visuals?.secondary ? [{ id: "walkthrough", label: es ? "Recorrido" : "Walkthrough" }] : []),
      ...(c.built ? [{ id: "built", label: t.case.built }] : []),
      ...(project.team?.length ? [{ id: "team", label: es ? "Equipo" : "Team" }] : []),
      { id: "outcome", label: t.case.outcome },
      { id: "evidence", label: t.case.evidence },
      ...(screens.length ? [{ id: "screens", label: t.case.gallery }] : []),
    ] : []),
    { id: "stack", label: t.stackLabel },
    ...(c?.next?.en.length ? [{ id: "next", label: es ? "En desarrollo" : "In progress" }] : []),
  ].map((item, i) => ({ ...item, index: String(i + 1).padStart(2, "0") }));
  const num = (id: string) => sections.find((item) => item.id === id)?.index ?? "";

  return (
    <>
      <StructuredData data={projectStructuredData(project, locale)} />
      <a href="#main" className="skip-link">{t.skip}</a>
      <Header locale={locale} altHref={`/projects/${slug}`} />
      <WorkMotion locale={locale} showControls={!!architectures[slug]} className={architectures[slug] ? `${workStyles.caseMotion} ${workStyles[slug] ?? ""}` : ""}>
      {architectures[slug] ? <div className={workStyles.caseBackdrop} data-motion-scene><StageAtmosphere /></div> : null}
      <main id="main" className="case" tabIndex={-1}>
        <header className="frame grid12 case-head">
          <p className="back case-back"><Link className="link" href={`${base}#work`}>← {t.case.back}</Link></p>
          <p className="case-index mono">{String(idx + 1).padStart(2, "0")}<span> / {String(order.length).padStart(2, "0")}</span></p>
          <div className={`case-title ${workStyles.caseTitle}`}>
            {architectures[slug] ? <ProjectMark slug={slug} /> : null}
            <h1 className="case-h1">{pick(project.title, locale)}</h1>
          </div>
          <p className="lead case-lead">{pick(project.oneLiner, locale)}</p>
          <dl className="case-meta case-spec">
            <div><dt>{t.role}</dt><dd>{pick(project.role, locale)}</dd></div>
            <div><dt>{t.period}</dt><dd className="mono">{pick(project.period, locale)}</dd></div>
            <div><dt>{t.status}</dt><dd>{pick(statusLabel[project.status], locale)}</dd></div>
            {project.links[0] ? <div><dt>{t.case.links}</dt><dd><a className="link" href={project.links[0].href} target="_blank" rel="noreferrer">{pick(project.links[0].label, locale)} ↗</a></dd></div> : null}
          </dl>
        </header>

        {architectures[slug] ? <div className={`frame case-media ${workStyles.caseStage}`}><ProjectStage project={project} locale={locale} priority /></div> : project.visuals ? (
          <div className="frame case-media">
            <VisualFrame visual={project.visuals.primary} locale={locale} detailed priority sizes="(max-width: 900px) 100vw, 1240px" />
          </div>
        ) : project.media ? (
          <div className="frame case-media">
            <ProjectMedia media={project.media} locale={locale} priority />
          </div>
        ) : null}

        <div className="frame case-proof">
          <dl>
            {project.facts.map((f) => (
              <div key={f.value + pick(f.label, locale)}>
                <dd><CountUp value={f.value} /></dd>
                <dt>{pick(f.label, locale)}</dt>
              </div>
            ))}
          </dl>
          <p className="muted small">{project.metricNote ? pick(project.metricNote, locale) : (locale === "es" ? "Cifras históricas al 11 de septiembre de 2026." : "Historical figures as of 11 September 2026.")}</p>
        </div>

        <div className="frame grid12 case-layout">
          <ScrollSpyNav className="case-rail" label={locale === "es" ? "Contenido del caso" : "Case contents"} lead={<p className="case-rail-title">{locale === "es" ? "En este caso" : "In this case"}</p>} items={sections} />

          <div className="case-main">
            {architectures[slug] ? <section id="system" className={`case-sec ${workStyles.caseSystem}`} aria-label={locale === "es" ? "Arquitectura del sistema" : "System architecture"}><h2>{locale === "es" ? "Cómo se conecta el sistema" : "How the system connects"}</h2><SystemExplorer headingLevel="h3" architecture={architectures[slug]} locale={locale} name={pick(project.title, locale)} /></section> : null}

            {c ? (
              <>
                <section id="problem" className="case-sec case-row" data-reveal="">
                  <h2 className="case-h2"><span className="mono">{num("problem")}</span>{t.case.problem}</h2>
                  <p className="case-statement">{pick(c.problem, locale)}</p>
                </section>
                <section id="constraints" className="case-sec case-row" data-reveal="">
                  <h2 className="case-h2"><span className="mono">{num("constraints")}</span>{t.case.constraints}</h2>
                  <ul className="case-points">{pick(c.constraints, locale).map((item) => <li key={item.slice(0, 40)}>{item}</li>)}</ul>
                </section>
                <section id="decisions" className="case-sec case-row" data-reveal="">
                  <h2 className="case-h2"><span className="mono">{num("decisions")}</span>{t.case.decisions}</h2>
                  <ol className="case-decisions">
                    {c.decisions.map((d, i) => (
                      <li key={d.title.en}>
                        <span className="mono" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                        <h3>{pick(d.title, locale)}</h3>
                        <p>{pick(d.why, locale)}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                {inline[0] ? <Inline figure={inline[0]} locale={locale} /> : null}
                {story?.decision ? (
                  <blockquote className="case-pull" data-reveal="">
                    <p>{pick(story.decision, locale)}</p>
                    <footer>{es ? "La decisión que definió el proyecto" : "The decision that shaped the project"}</footer>
                  </blockquote>
                ) : null}
                {walk ? (
                  <section id="walkthrough" className="case-sec case-row" data-reveal="">
                    <h2 className="case-h2"><span className="mono">{num("walkthrough")}</span>{es ? "Recorrido del producto" : "Product walkthrough"}</h2>
                    <Walkthrough
                      width={walk.width} height={walk.height} alt={`${pick(project.title, locale)}: ${es ? "recorrido del producto" : "product walkthrough"}`}
                      scenes={walk.scenes.map((item) => ({ src: item.src, fx: item.fx, fy: item.fy, zoom: item.zoom, text: pick(item.text, locale) }))}
                      labels={es ? { play: "Reproducir", pause: "Pausar", previous: "Paso anterior", next: "Paso siguiente", step: "Paso", note: "Capturas reales con datos de demostración." } : { play: "Play", pause: "Pause", previous: "Previous step", next: "Next step", step: "Step", note: "Real captures with demo data." }}
                    />
                  </section>
                ) : project.visuals?.secondary ? (
                  <section id="walkthrough" className="case-sec case-row" data-reveal="">
                    <h2 className="case-h2"><span className="mono">{num("walkthrough")}</span>{es ? "Recorrido del producto" : "Product walkthrough"}</h2>
                    <VisualFrame visual={project.visuals.secondary} locale={locale} sizes="(max-width: 900px) 100vw, 860px" />
                  </section>
                ) : null}
                {c.built ? (
                  <section id="built" className="case-sec case-row" data-reveal="">
                    <h2 className="case-h2"><span className="mono">{num("built")}</span>{t.case.built}</h2>
                    <ul className="case-points">{pick(c.built, locale).map((item) => <li key={item.slice(0, 40)}>{item}</li>)}</ul>
                  </section>
                ) : null}
                {inline[1] ? <Inline figure={inline[1]} locale={locale} /> : null}
                {project.team?.length ? (
                  <section id="team" className="case-sec case-row" data-reveal="">
                    <h2 className="case-h2"><span className="mono">{num("team")}</span>{locale === "es" ? "Equipo" : "Team"}</h2>
                    <dl className="team">
                      {project.team.map((member) => (
                        <div key={member.name}><dt>{member.name}</dt><dd>{pick(member.role, locale)}</dd></div>
                      ))}
                    </dl>
                  </section>
                ) : null}
                <section id="outcome" className="case-sec case-row" data-reveal="">
                  <h2 className="case-h2"><span className="mono">{num("outcome")}</span>{t.case.outcome}</h2>
                  <div className="case-outcome">
                    <p className="case-statement">{pick(c.outcome, locale)}</p>
                    <dl className="case-keys">
                      {project.facts.slice(0, 2).map((f) => (
                        <div key={f.value + f.label.en}><dd><CountUp value={f.value} /></dd><dt>{pick(f.label, locale)}</dt></div>
                      ))}
                    </dl>
                  </div>
                </section>
                <section id="evidence" className="case-sec case-row" data-reveal="">
                  <h2 className="case-h2"><span className="mono">{num("evidence")}</span>{t.case.evidence}</h2>
                  <ul className="case-points">{pick(c.evidence, locale).map((item) => <li key={item.slice(0, 40)}>{item}</li>)}</ul>
                </section>
              </>
            ) : null}

            {screens.length ? (
              <section id="screens" className="case-sec case-row" data-reveal="" aria-label={t.case.gallery}>
                <h2 className="case-h2"><span className="mono">{num("screens")}</span>{t.case.gallery}</h2>
                <div className="case-gallery">
                  {screens.map((g) => (
                    <figure key={g.src} className="shot media-frame media-interface">
                      <div className="media-canvas">
                      <a className="media-open" href={g.src} target="_blank" rel="noreferrer" aria-label={`${locale === "es" ? "Abrir imagen completa" : "Open full-size image"}: ${pick(g.alt, locale)}`}><Image src={g.src} alt={pick(g.alt, locale)} width={g.width} height={g.height} sizes="(max-width: 900px) 100vw, 860px" quality={85} /></a>
                      </div>
                      <figcaption><span>{pick(g.caption, locale)}</span><a href={g.src} target="_blank" rel="noreferrer">{locale === "es" ? "Abrir imagen completa" : "Open full-size image"}</a></figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            <section id="stack" className="case-sec case-row" data-reveal="">
              <h2 className="case-h2"><span className="mono">{num("stack")}</span>{t.stackLabel}</h2>
              <ul className="case-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              {project.links.length ? (
                <p className="hero-links case-links">
                  {project.links.map((l) => (
                    <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">{pick(l.label, locale)} ↗</a>
                  ))}
                </p>
              ) : null}
            </section>

            {c?.next?.en.length ? <section id="next" className="case-sec case-row" data-reveal=""><h2 className="case-h2"><span className="mono">{num("next")}</span>{locale === "es" ? "En desarrollo" : "In progress"}</h2><ul className="case-points">{pick(c.next, locale).map((item) => <li key={item.slice(0, 40)}>{item}</li>)}</ul></section> : null}
          </div>
        </div>

        <nav className="frame case-pager" aria-label={locale === "es" ? "Más proyectos" : "More projects"}>
          {prev ? <Link href={`${base}/projects/${prev.slug}`}><span>← {t.case.prev}</span><b>{pick(prev.title, locale)}</b></Link> : <span />}
          {next ? <Link href={`${base}/projects/${next.slug}`}><span>{t.case.nextCase} →</span><b>{pick(next.title, locale)}</b></Link> : <span />}
        </nav>
      </main>
      </WorkMotion>
      <Footer locale={locale} wide />
    </>
  );
}
