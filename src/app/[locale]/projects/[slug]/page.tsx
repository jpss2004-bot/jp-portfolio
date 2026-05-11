import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SignalAtmosphere } from "@/components/home/SignalAtmosphere";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  caseStudies,
  getCaseStudy,
  getLocalizedValue,
  type ProjectCaseStudy,
} from "@/data/case-studies";
import { isLocale, locales, type Locale } from "@/data/i18n";

const navLabels = {
  en: {
    work: "Work",
    stack: "Stack",
    resume: "Resume",
    contact: "Contact",
  },
  es: {
    work: "Proyectos",
    stack: "Stack",
    resume: "CV",
    contact: "Contacto",
  },
} as const;

const labels = {
  en: {
    back: "Back to portfolio",
    requestWalkthrough: "Request walkthrough",
    role: "Role",
    featured: "Featured",
    problemEyebrow: "Problem",
    problemTitle: "What this project solves",
    solutionEyebrow: "Solution",
    solutionTitle: "How I approached it",
    galleryEyebrow: "Proof gallery",
    galleryTitle: "Visual evidence and system proof",
    galleryNote: "Temporary proof visuals are used until real screenshots are added.",
    architectureEyebrow: "Architecture",
    architectureTitle: "How the system is structured",
    decisionsEyebrow: "Decisions",
    decisionsTitle: "Tradeoffs and outcomes",
    resultsEyebrow: "Results",
    resultsTitle: "Evidence and impact",
    nextEyebrow: "Next iteration",
    nextTitle: "What I would improve next",
    snapshot: "Proof panel",
    impact: "Impact",
    proof: "Proof",
    stack: "Stack",
  },
  es: {
    back: "Volver al portafolio",
    requestWalkthrough: "Pedir walkthrough",
    role: "Rol",
    featured: "Destacado",
    problemEyebrow: "Problema",
    problemTitle: "QuÃ© resuelve este proyecto",
    solutionEyebrow: "SoluciÃ³n",
    solutionTitle: "CÃ³mo lo abordÃ©",
    galleryEyebrow: "GalerÃ­a de evidencia",
    galleryTitle: "Evidencia visual y prueba del sistema",
    galleryNote: "Estos visuales son temporales hasta agregar capturas reales.",
    architectureEyebrow: "Arquitectura",
    architectureTitle: "CÃ³mo estÃ¡ estructurado el sistema",
    decisionsEyebrow: "Decisiones",
    decisionsTitle: "Tradeoffs y resultados",
    resultsEyebrow: "Resultados",
    resultsTitle: "Evidencia e impacto",
    nextEyebrow: "Siguiente iteraciÃ³n",
    nextTitle: "QuÃ© mejorarÃ­a despuÃ©s",
    snapshot: "Panel de evidencia",
    impact: "Impacto",
    proof: "Evidencia",
    stack: "Stack",
  },
} as const;

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type PageLabels = typeof labels.en | typeof labels.es;

function Badge({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

function CaseBlock({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="project-detail-block signal-surface">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function ProofGallery({
  project,
  locale,
  t,
}: {
  project: ProjectCaseStudy;
  locale: Locale;
  t: PageLabels;
}) {
  const galleryItems = project.gallery.length > 0
    ? project.gallery
    : [
        {
          src: project.heroImage,
          alt: project.title,
          caption: undefined,
        },
      ];

  return (
    <section className="project-detail-block proof-gallery-block signal-surface">
      <div className="proof-gallery-heading">
        <div>
          <p className="eyebrow">{t.galleryEyebrow}</p>
          <h2>{t.galleryTitle}</h2>
        </div>
        <p>{t.galleryNote}</p>
      </div>

      <div className="proof-gallery-grid">
        {galleryItems.map((item, index) => {
          const alt = getLocalizedValue(item.alt, locale);
          const caption = item.caption ? getLocalizedValue(item.caption, locale) : undefined;

          return (
            <figure className={index === 0 ? "proof-gallery-item proof-gallery-item-large" : "proof-gallery-item"} key={item.src}>
              <div className="proof-gallery-media">
                <Image
                  src={item.src}
                  alt={alt}
                  width={1200}
                  height={720}
                  sizes={index === 0 ? "(max-width: 980px) 100vw, 52vw" : "(max-width: 980px) 100vw, 26vw"}
                  unoptimized
                />
              </div>
              {caption ? <figcaption>{caption}</figcaption> : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const project = getCaseStudy(slug);

  if (!project) {
    return {};
  }

  const title = getLocalizedValue(project.title, locale);
  const description = getLocalizedValue(project.summary, locale);

  return {
    title: `${title} | JP Samano`,
    description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        es: `/es/projects/${project.slug}`,
      },
    },
  };
}

export default async function LocaleProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const t = labels[locale];
  const nav = navLabels[locale];
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  const title = getLocalizedValue(project.title, locale);
  const summary = getLocalizedValue(project.summary, locale);
  const tagline = getLocalizedValue(project.tagline, locale);
  const role = getLocalizedValue(project.role, locale);
  const challenge = getLocalizedValue(project.challenge, locale);
  const approach = getLocalizedValue(project.approach, locale);
  const architecture = getLocalizedValue(project.architecture, locale);
  const results = getLocalizedValue(project.results, locale);
  const nextSteps = getLocalizedValue(project.nextSteps, locale);
  const visualAlt = getLocalizedValue(project.gallery[0]?.alt ?? project.title, locale);

  const navItems = [
    { href: `/${locale}#work`, label: nav.work },
    { href: `/${locale}#stack`, label: nav.stack },
    { href: `/${locale}#resume`, label: nav.resume },
    { href: `/${locale}#contact`, label: nav.contact },
  ];

  return (
    <SiteShell locale={locale} navItems={navItems} projectSlug={project.slug}>
      <SignalAtmosphere locale={locale} mode="project" />

      <section className="shell project-hero-detail">
        <Link href={`/${locale}`} className="button button-soft project-back-link">
          {t.back}
        </Link>

        <div className="project-hero-grid">
          <div className="project-hero-copy-panel">
            <div className="project-badges">
              <Badge>{getLocalizedValue(project.statusLabel, locale)}</Badge>
              <Badge>{project.year}</Badge>
              {project.featured ? <Badge>{t.featured}</Badge> : null}
            </div>
            <h1>{title}</h1>
            <p>{summary}</p>
            <p className="project-one-liner">{tagline}</p>

            <div className="hero-actions">
              {project.links.length > 0 ? (
                project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={link.kind === "live" ? "button button-primary" : "button button-soft"}
                  >
                    {getLocalizedValue(link.label, locale)}
                  </a>
                ))
              ) : (
                <Link href={`/${locale}#contact`} className="button button-primary">
                  {t.requestWalkthrough}
                </Link>
              )}
            </div>
          </div>

          <aside className="project-proof-panel signal-surface" aria-label={t.snapshot}>
            <div className="project-proof-media">
              <Image
                src={project.heroImage}
                alt={visualAlt}
                width={1200}
                height={720}
                sizes="(max-width: 980px) 100vw, 38vw"
                priority
                unoptimized
              />
            </div>

            <div className="project-proof-facts">
              <p className="eyebrow">{t.snapshot}</p>

              <h3>{t.role}</h3>
              <p>{role}</p>

              <h3>{t.impact}</h3>
              <p>{results[0] ?? summary}</p>

              <h3>{t.stack}</h3>
              <div className="stack-row">
                {project.tech.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="shell project-detail-layout">
        <div className="project-detail-main">
          <CaseBlock eyebrow={t.problemEyebrow} title={t.problemTitle}>
            <p>{challenge}</p>
          </CaseBlock>

          <CaseBlock eyebrow={t.solutionEyebrow} title={t.solutionTitle}>
            <p>{approach}</p>
          </CaseBlock>

          <ProofGallery project={project} locale={locale} t={t} />

          <CaseBlock eyebrow={t.architectureEyebrow} title={t.architectureTitle}>
            <ul>
              {architecture.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>

          <CaseBlock eyebrow={t.decisionsEyebrow} title={t.decisionsTitle}>
            <div className="principle-list decision-log-list">
              {project.decisions.map((decision, index) => (
                <article key={`${project.slug}-decision-${index}`}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{getLocalizedValue(decision.tradeoff, locale)}</h3>
                    <p>{getLocalizedValue(decision.outcome, locale)}</p>
                  </div>
                </article>
              ))}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow={t.resultsEyebrow} title={t.resultsTitle}>
            <ul>
              {results.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>

          <CaseBlock eyebrow={t.nextEyebrow} title={t.nextTitle}>
            <ul>
              {nextSteps.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>
        </div>

        <aside className="project-sidebar signal-surface">
          <p className="eyebrow">{t.proof}</p>
          <h3>{title}</h3>
          <p>{tagline}</p>
          <ul>
            {results.slice(1).map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="stack-row">
            {project.tech.slice(0, 6).map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
