import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getLocalizedValue } from "@/data/case-studies";
import { isLocale, locales, type Locale } from "@/data/i18n";

const labels = {
  en: {
    back: "Back to portfolio",
    requestWalkthrough: "Request walkthrough",
    featured: "Featured",
    projectDossier: "Project dossier",
    recruiterRead: "Recruiter quick read",
    role: "Role",
    status: "Status",
    year: "Year",
    primaryProof: "Primary proof",
    stack: "Stack",
    projectLinks: "Project links",
    noPublicDemo: "Walkthrough available on request",
    problemEyebrow: "Problem",
    problemTitle: "What this project solves",
    solutionEyebrow: "Solution",
    solutionTitle: "How I approached it",
    architectureEyebrow: "Architecture",
    architectureTitle: "System structure",
    decisionsEyebrow: "Decisions",
    decisionsTitle: "Tradeoffs and outcomes",
    tradeoff: "Tradeoff",
    outcome: "Outcome",
    resultsEyebrow: "Proof",
    resultsTitle: "Evidence and impact",
    nextEyebrow: "Roadmap",
    nextTitle: "Next iteration",
    snapshot: "Snapshot",
    whyItMatters: "Why it matters",
    resumeBullet: "Resume-ready bullet",
  },
  es: {
    back: "Volver al portafolio",
    requestWalkthrough: "Solicitar walkthrough",
    featured: "Destacado",
    projectDossier: "Dossier del proyecto",
    recruiterRead: "Lectura r\u00e1pida para reclutadores",
    role: "Rol",
    status: "Estado",
    year: "A\u00f1o",
    primaryProof: "Evidencia principal",
    stack: "Stack",
    projectLinks: "Enlaces del proyecto",
    noPublicDemo: "Walkthrough disponible bajo solicitud",
    problemEyebrow: "Problema",
    problemTitle: "Qu\u00e9 resuelve este proyecto",
    solutionEyebrow: "Soluci\u00f3n",
    solutionTitle: "C\u00f3mo lo abord\u00e9",
    architectureEyebrow: "Arquitectura",
    architectureTitle: "Estructura del sistema",
    decisionsEyebrow: "Decisiones",
    decisionsTitle: "Tradeoffs y resultados",
    tradeoff: "Tradeoff",
    outcome: "Resultado",
    resultsEyebrow: "Evidencia",
    resultsTitle: "Evidencia e impacto",
    nextEyebrow: "Roadmap",
    nextTitle: "Siguiente iteraci\u00f3n",
    snapshot: "Resumen",
    whyItMatters: "Por qu\u00e9 importa",
    resumeBullet: "Bullet listo para CV",
  },
} as const;

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function Badge({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return <span className={strong ? "tag tag-strong" : "tag"}>{children}</span>;
}

function CaseBlock({
  eyebrow,
  title,
  children,
  variant = "default",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "proof" | "roadmap";
}) {
  return (
    <section className={`case-polish-block case-polish-block-${variant}`}>
      <div className="case-polish-block-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

function getLinkRank(kind: string) {
  if (kind === "live") return 0;
  if (kind === "repo") return 1;
  if (kind === "video") return 2;
  return 3;
}

function isUsableProofImage(src: string) {
  return Boolean(src && !src.endsWith("/hero.png"));
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
  const status = getLocalizedValue(project.statusLabel, locale);
  const resumeBullet = getLocalizedValue(project.resumeBullet, locale);
  const sortedLinks = [...project.links].sort((a, b) => getLinkRank(a.kind) - getLinkRank(b.kind));
  const primaryLink = sortedLinks[0];
  const visual = project.gallery[0];
  const visualSrc = visual?.src ?? project.heroImage;
  const visualAlt = visual ? getLocalizedValue(visual.alt, locale) : `${title} proof visual`;
  const hasRealProofImage = isUsableProofImage(visualSrc);
  const firstMetric = project.proofs[0];

  return (
    <main id="main-content" className="portfolio-page case-study-page-polish">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="shell case-polish-hero">
        <div className="case-polish-topbar">
          <Link href={`/${locale}`} className="button button-soft">
            {t.back}
          </Link>
          <div className="case-polish-topbar-meta">
            <span>{t.projectDossier}</span>
            <strong>SIGNAL-ATLAS.CASE</strong>
          </div>
        </div>

        <div className="case-polish-hero-grid">
          <div className="case-polish-hero-copy">
            <div className="project-badges">
              <Badge>{status}</Badge>
              <Badge>{project.year}</Badge>
              {project.featured ? <Badge strong>{t.featured}</Badge> : null}
            </div>

            <h1>{title}</h1>
            <p className="case-polish-tagline">{tagline}</p>
            <p className="case-polish-summary">{summary}</p>

            <div className="hero-actions case-polish-actions">
              {primaryLink ? (
                <a
                  href={primaryLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className={primaryLink.kind === "live" ? "button button-primary" : "button button-soft"}
                >
                  {getLocalizedValue(primaryLink.label, locale)}
                </a>
              ) : (
                <Link href={`/${locale}#contact`} className="button button-primary">
                  {t.requestWalkthrough}
                </Link>
              )}

              {sortedLinks.slice(primaryLink ? 1 : 0).map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="button button-soft">
                  {getLocalizedValue(link.label, locale)}
                </a>
              ))}

              <Link href={`/${locale}#contact`} className="button button-ghost">
                {t.requestWalkthrough}
              </Link>
            </div>
          </div>

          <aside className="case-polish-snapshot" aria-label={t.snapshot}>
            <div className="console-topline">
              <div className="window-dots"><span /><span /><span /></div>
              <p>{t.recruiterRead}</p>
            </div>

            <dl className="case-polish-facts">
              <div>
                <dt>{t.role}</dt>
                <dd>{role}</dd>
              </div>
              <div>
                <dt>{t.status}</dt>
                <dd>{status}</dd>
              </div>
              <div>
                <dt>{t.year}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>{t.primaryProof}</dt>
                <dd>{firstMetric ? `${firstMetric.value} / ${getLocalizedValue(firstMetric.label, locale)}` : t.noPublicDemo}</dd>
              </div>
            </dl>

            <div className="case-polish-mini-stack">
              <p>{t.stack}</p>
              <div>{project.tech.slice(0, 8).map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </aside>
        </div>

        <div className="case-polish-proof-visual">
          {hasRealProofImage ? (
            <Image
              src={visualSrc}
              alt={visualAlt}
              fill
              priority={project.featured}
              sizes="(max-width: 900px) 100vw, 1120px"
              className="case-polish-proof-image"
            />
          ) : (
            <div className="case-polish-generated-proof" aria-label={visualAlt}>
              <span>{title}</span>
              <strong>{t.projectDossier}</strong>
              <p>{tagline}</p>
            </div>
          )}
        </div>
      </section>

      <section className="shell case-polish-layout">
        <div className="case-polish-main">
          <CaseBlock eyebrow={t.problemEyebrow} title={t.problemTitle}>
            <p className="case-polish-lede">{challenge}</p>
          </CaseBlock>

          <CaseBlock eyebrow={t.solutionEyebrow} title={t.solutionTitle}>
            <p className="case-polish-lede">{approach}</p>
          </CaseBlock>

          <CaseBlock eyebrow={t.architectureEyebrow} title={t.architectureTitle}>
            <div className="case-polish-list-grid">
              {architecture.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow={t.decisionsEyebrow} title={t.decisionsTitle}>
            <div className="case-polish-decisions">
              {project.decisions.map((decision, index) => {
                const decisionTitle = getLocalizedValue(decision.title, locale);
                return (
                  <article key={decisionTitle}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{decisionTitle}</h3>
                      <div className="case-polish-decision-copy">
                        <p><strong>{t.tradeoff}:</strong> {getLocalizedValue(decision.tradeoff, locale)}</p>
                        <p><strong>{t.outcome}:</strong> {getLocalizedValue(decision.outcome, locale)}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow={t.resultsEyebrow} title={t.resultsTitle} variant="proof">
            <div className="case-polish-proof-grid">
              {results.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow={t.nextEyebrow} title={t.nextTitle} variant="roadmap">
            <div className="case-polish-roadmap">
              {nextSteps.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </CaseBlock>
        </div>

        <aside className="case-polish-sidebar">
          <div className="case-polish-sidebar-card">
            <p className="eyebrow">{t.whyItMatters}</p>
            <h3>{t.snapshot}</h3>
            <p>{results[0]}</p>
          </div>

          <div className="case-polish-sidebar-card">
            <p className="eyebrow">{t.resumeBullet}</p>
            <p>{resumeBullet}</p>
          </div>

          <div className="case-polish-sidebar-card">
            <p className="eyebrow">{t.stack}</p>
            <div className="stack-row case-polish-sidebar-stack">
              {project.tech.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </div>

          <div className="case-polish-sidebar-card">
            <p className="eyebrow">{t.projectLinks}</p>
            <div className="case-polish-sidebar-links">
              {sortedLinks.length > 0 ? (
                sortedLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {getLocalizedValue(link.label, locale)}
                  </a>
                ))
              ) : (
                <Link href={`/${locale}#contact`}>{t.requestWalkthrough}</Link>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
