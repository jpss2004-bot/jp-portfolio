import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getLocalizedValue } from "@/data/case-studies";
import { isLocale, locales, type Locale } from "@/data/i18n";

const labels = {
  en: {
    back: "Back to portfolio",
    requestWalkthrough: "Request walkthrough",
    role: "Role",
    problemEyebrow: "Problem",
    problemTitle: "What this project solves",
    solutionEyebrow: "Solution",
    solutionTitle: "How I approached it",
    architectureEyebrow: "Architecture",
    architectureTitle: "How the system is structured",
    decisionsEyebrow: "Decisions",
    decisionsTitle: "Tradeoffs and outcomes",
    resultsEyebrow: "Results",
    resultsTitle: "Evidence and impact",
    nextEyebrow: "Next iteration",
    nextTitle: "What I would improve next",
    snapshot: "Snapshot",
    impact: "Impact",
    proof: "Proof",
    stack: "Stack",
  },
  es: {
    back: "Volver al portafolio",
    requestWalkthrough: "Pedir walkthrough",
    role: "Rol",
    problemEyebrow: "Problema",
    problemTitle: "QuÃ© resuelve este proyecto",
    solutionEyebrow: "SoluciÃ³n",
    solutionTitle: "CÃ³mo lo abordÃ©",
    architectureEyebrow: "Arquitectura",
    architectureTitle: "CÃ³mo estÃ¡ estructurado el sistema",
    decisionsEyebrow: "Decisiones",
    decisionsTitle: "Tradeoffs y resultados",
    resultsEyebrow: "Resultados",
    resultsTitle: "Evidencia e impacto",
    nextEyebrow: "Siguiente iteraciÃ³n",
    nextTitle: "QuÃ© mejorarÃ­a despuÃ©s",
    snapshot: "Resumen",
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

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

function CaseBlock({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="project-detail-block">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div>{children}</div>
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

  return (
    <main id="main-content" className="portfolio-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="shell project-hero-detail">
        <Link href={`/${locale}`} className="button button-soft">
          {t.back}
        </Link>

        <div className="project-hero-grid">
          <div>
            <div className="project-badges">
              <Badge>{getLocalizedValue(project.statusLabel, locale)}</Badge>
              <Badge>{project.year}</Badge>
              {project.featured ? <Badge>Featured</Badge> : null}
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

          <aside className="project-detail-console">
            <div className="console-topline">
              <div className="window-dots"><span /><span /><span /></div>
              <p>SIGNAL-ATLAS.CASE</p>
            </div>
            <div className="mockup-lines">
              {project.proofs.map((metric) => (
                <div key={getLocalizedValue(metric.label, locale)}>
                  <span>{getLocalizedValue(metric.label, locale)}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <div className="terminal-card">
              <p>{t.role}</p>
              <code>{role}</code>
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
          <CaseBlock eyebrow={t.architectureEyebrow} title={t.architectureTitle}>
            <ul>
              {architecture.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>
          <CaseBlock eyebrow={t.decisionsEyebrow} title={t.decisionsTitle}>
            <div className="principle-list">
              {project.decisions.map((decision) => {
                const decisionTitle = getLocalizedValue(decision.title, locale);
                return (
                  <article key={decisionTitle}>
                    <span>{decisionTitle}</span>
                    <div>
                      <h3>{getLocalizedValue(decision.tradeoff, locale)}</h3>
                      <p>{getLocalizedValue(decision.outcome, locale)}</p>
                    </div>
                  </article>
                );
              })}
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

        <aside className="project-sidebar">
          <p className="eyebrow">{t.snapshot}</p>
          <h3>{t.impact}</h3>
          <p>{results[0]}</p>
          <h3>{t.proof}</h3>
          <ul>{results.slice(1).map((item) => <li key={item}>{item}</li>)}</ul>
          <h3>{t.stack}</h3>
          <div className="stack-row">{project.tech.map((tool) => <span key={tool}>{tool}</span>)}</div>
        </aside>
      </section>
    </main>
  );
}

