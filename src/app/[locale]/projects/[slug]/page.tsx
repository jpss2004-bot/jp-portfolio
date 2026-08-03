import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getLocalizedValue } from "@/data/case-studies";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { getCopy, resumeHref } from "@/data/site-copy";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConceptPlate } from "@/components/ui/ConceptPlate";
import { FieldBackground } from "@/components/ui/FieldBackground";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = getCaseStudy(slug);
  if (!project) return {};

  return {
    title: getLocalizedValue(project.title, locale),
    description: getLocalizedValue(project.summary, locale),
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        es: `/es/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: getLocalizedValue(project.title, locale),
      description: getLocalizedValue(project.summary, locale),
      url: `/${locale}/projects/${project.slug}`,
      type: "article",
      siteName: profile.fullName,
      locale: locale === "es" ? "es_MX" : "en_CA",
      alternateLocale: locale === "es" ? ["en_CA"] : ["es_MX"],
      images: project.gallery[0]
      ? [
        {
          url: project.gallery[0].src,
          alt: getLocalizedValue(project.gallery[0].alt, locale),
        },
        ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: getLocalizedValue(project.title, locale),
      description: getLocalizedValue(project.summary, locale),
      images: project.gallery[0] ? [project.gallery[0].src] : undefined,
    },
  };
}

/**
 * A body block. The heading carries it on its own — the small eyebrow label
 * that used to sit above every title has been dropped so the big type reads
 * as the hierarchy rather than competing with a caption.
 */
function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="section">
      <div className="wrap wrap-text">
        <h2 className="h2" data-reveal="fade">
          {heading}
        </h2>
        <div style={{ marginTop: "var(--stack-5)" }} data-reveal="fade">
          {children}
        </div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const t = getCopy(locale);
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const title = getLocalizedValue(project.title, locale);
  /*
   * The hero leads with `summary`, not `tagline`: the tagline is the index
   * entry on the homepage, and running both here restated the same sentence
   * twice within one screen.
   */
  const summary = getLocalizedValue(project.summary, locale);
  const role = getLocalizedValue(project.role, locale);
  const challenge = getLocalizedValue(project.challenge, locale);
  const approach = getLocalizedValue(project.approach, locale);
  const architecture = getLocalizedValue(project.architecture, locale);
  const results = getLocalizedValue(project.results, locale);
  const nextSteps = getLocalizedValue(project.nextSteps, locale);
  /*
   * Concept projects carry the legacy "Case Study" status, which reads as a
   * deliverable rather than a maturity level. Say "Concept" so the status
   * column can't imply something was built.
   */
  const status =
    project.kind === "concept"
      ? locale === "es"
        ? "Concepto"
        : "Concept"
      : getLocalizedValue(project.statusLabel, locale);
  const type = getLocalizedValue(project.type, locale);

  const liveLink = project.links.find((link) => link.kind === "live");
  const repoLink = project.links.find((link) => link.kind === "repo");

  const position = caseStudies.findIndex((entry) => entry.slug === project.slug);
  const previous = position > 0 ? caseStudies[position - 1] : null;
  const next = position < caseStudies.length - 1 ? caseStudies[position + 1] : null;

  const navItems = [
    { href: `/${locale}#work`, label: t.nav.work },
    { href: `/${locale}#capabilities`, label: t.nav.capabilities },
    { href: `/${locale}#profile`, label: t.nav.profile },
    { href: `/${locale}#contact`, label: t.nav.contact },
  ];

  const lead = project.gallery[0];

  return (
    <div lang={locale}>
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      <FieldBackground />

      <div className="page">
      <Header locale={locale} navItems={navItems} projectSlug={project.slug} />

      <main id="main">
        <section className="wrap case-hero">
          <Link href={`/${locale}#work`} className="back-link">
            <span aria-hidden="true">←</span>
            {t.backToWork}
          </Link>

          <h1 className="case-hero-title" data-reveal="fade" style={{ marginTop: "var(--stack-5)" }}>
            {title}
          </h1>
          <p className="lede case-hero-tagline">{summary}</p>

          <dl className="case-facts">
            <div>
              <dt>{t.caseRole}</dt>
              <dd>{role}</dd>
            </div>
            <div>
              <dt>{t.caseType}</dt>
              <dd>{type}</dd>
            </div>
            <div>
              <dt>{t.caseStatus}</dt>
              <dd>{status}</dd>
            </div>
            <div>
              <dt>{t.caseYear}</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          {/*
           * Strongest available evidence leads: a running app, else the
           * source, else an invitation to ask. Concept projects have neither,
           * so they only offer the contact route.
           */}
          <div className="case-actions">
            {liveLink ? (
              <a className="btn btn-primary" href={liveLink.href} target="_blank" rel="noreferrer">
                {t.liveApp}
              </a>
            ) : repoLink ? (
              <a className="btn btn-primary" href={repoLink.href} target="_blank" rel="noreferrer">
                {t.sourceCode}
              </a>
            ) : (
              <Link className="btn btn-primary" href={`/${locale}#contact`}>
                {t.getInTouch}
              </Link>
            )}

            {liveLink && repoLink ? (
              <a className="link" href={repoLink.href} target="_blank" rel="noreferrer">
                {t.sourceCode}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : null}

            {liveLink || repoLink ? (
              <Link className="link" href={`/${locale}#contact`}>
                {t.getInTouch}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : null}
          </div>
        </section>

        {/*
          * Lead visual: a real capture, or an explicit concept plate. A built
          * project that simply has no captures yet gets neither — showing the
          * concept plate there would claim nothing was implemented, which for
          * real client work is worse than showing no image at all.
          */}
        <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
          {lead ? (
            <figure className="figure">
              <div className="figure-media">
                <Image
                  src={lead.src}
                  alt={getLocalizedValue(lead.alt, locale)}
                  width={2880}
                  height={1800}
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  quality={82}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              {lead.caption ? <figcaption>{getLocalizedValue(lead.caption, locale)}</figcaption> : null}
            </figure>
          ) : project.kind === "concept" ? (
            <ConceptPlate
              title={title}
              nodes={getLocalizedValue(project.conceptNodes, locale)}
              locale={locale}
            />
          ) : null}
        </div>

        {/*
          * Blocks render only when there is something to say. A project added
          * before its case study is written shows what is known and nothing
          * else, rather than empty headings.
          */}
        {challenge ? (
          <Block heading={t.problemHeading}>
            <div className="prose lede">
              <p>{challenge}</p>
            </div>
          </Block>
        ) : null}

        {approach ? (
          <Block heading={t.approachHeading}>
            <div className="prose lede">
              <p>{approach}</p>
            </div>
          </Block>
        ) : null}

        {architecture.length > 0 ? (
          <Block heading={t.architectureHeading}>
          <ol className="bullets">
            {architecture.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          {project.tech.length > 0 ? (
            <p className="tools" style={{ marginTop: "var(--stack-4)" }}>
              {t.stack}: {project.tech.join(" · ")}
            </p>
          ) : null}
          </Block>
        ) : null}

        {project.decisions.length > 0 ? (
          <Block heading={t.decisionsHeading}>
            <div>
              {project.decisions.map((decision) => (
                <article className="decision" key={getLocalizedValue(decision.title, locale)}>
                  <h3 className="h3">{getLocalizedValue(decision.title, locale)}</h3>
                  <div className="decision-body">
                    <div>
                      <p className="label">{t.tradeoff}</p>
                      <p className="small">{getLocalizedValue(decision.tradeoff, locale)}</p>
                    </div>
                    <div>
                      <p className="label label-accent">{t.outcome}</p>
                      <p className="small">{getLocalizedValue(decision.outcome, locale)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Evidence: every remaining real capture, at a size you can read. */}
        {project.gallery.length > 1 ? (
          <section className="section">
            <div className="wrap head">
              <h2 className="h2" data-reveal="fade">
                {t.evidenceHeading}
              </h2>
            </div>
            <div className="wrap gallery">
              {project.gallery.slice(1).map((item) => (
                <figure className="figure" key={item.src}>
                  <div className="figure-media">
                    <Image
                      src={item.src}
                      alt={getLocalizedValue(item.alt, locale)}
                      width={2880}
                      height={1800}
                      sizes="(max-width: 1400px) 100vw, 1400px"
                      quality={82}
                      loading="lazy"
                    />
                  </div>
                  {item.caption ? <figcaption>{getLocalizedValue(item.caption, locale)}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {project.kind === "concept" ? (
          <Block heading={t.evidenceHeading}>
            <p className="body">{t.noInterfaceYet}</p>
          </Block>
        ) : null}

        {results.filter(Boolean).length > 0 ? (
          <Block heading={t.resultsHeading}>
          <ul className="bullets">
            {results.filter(Boolean).map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </Block>
        ) : null}

        {nextSteps.length > 0 ? (
          <Block heading={t.nextStepsHeading}>
          <ul className="bullets">
            {nextSteps.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </Block>
        ) : null}

        <nav className="wrap case-nav" aria-label={t.caseStudyLabel}>
          {previous ? (
            <Link href={`/${locale}/projects/${previous.slug}`}>
              <span className="label">← {t.prevCase}</span>
              <strong>{getLocalizedValue(previous.title, locale)}</strong>
            </Link>
          ) : null}
          {next ? (
            <Link href={`/${locale}/projects/${next.slug}`} className="is-next">
              <span className="label">{t.nextCase} →</span>
              <strong>{getLocalizedValue(next.title, locale)}</strong>
            </Link>
          ) : null}
        </nav>

        <div className="band-ink">
          <section className="wrap contact">
            <h2 className="h2" data-reveal="fade">
              {t.contactHeading}
            </h2>
            <a className="contact-email" href={`mailto:${profile.email}`} data-reveal="fade">
              {profile.email}
            </a>
            <div className="contact-links" data-reveal="fade">
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a className="link" href={resumeHref(locale)} target="_blank" rel="noreferrer">
                {t.resumePdf}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </section>

          <Footer locale={locale} projectSlug={project.slug} />
        </div>
      </main>
      </div>
    </div>
  );
}
