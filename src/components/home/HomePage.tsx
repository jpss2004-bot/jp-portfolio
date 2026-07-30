import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { capabilityLayers, getCopy, principles, resumeHref, trackRecord } from "@/data/site-copy";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FieldBackground } from "@/components/ui/FieldBackground";
import { Lines } from "@/components/ui/Lines";

/** Primary evidence image for each featured case, chosen from real captures. */
const featuredImage: Record<string, string> = {
  checkwise: "/projects/checkwise/checkwise-review-queue.png",
  savr: "/projects/savr/savr-recommendations-results.png",
  "er-triage-queue-manager": "/projects/er-triage-queue-manager/shot-dashboard.png",
};

export function HomePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);

  const featured = caseStudies.filter((project) => project.featured);
  const rest = caseStudies.filter((project) => !project.featured);

  const navItems = [
    { href: "#work", label: t.nav.work },
    { href: "#capabilities", label: t.nav.capabilities },
    { href: "#profile", label: t.nav.profile },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    /*
     * lang lives here rather than on <html>: the root layout is shared by both
     * locales, and tagging the subtree server-side gets screen readers the
     * right pronunciation without a client-side patch after hydration.
     */
    <div lang={locale}>
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      <FieldBackground />

      <div className="page">
        <Header locale={locale} navItems={navItems} />

        <main id="main">
          {/* ---- Hero: centred, full width, type-led -------------------- */}
          {/*
           * No eyebrow above the headline. The wordmark already states the
           * discipline and the facts rail below repeats the focus — a third
           * small label here only weakened the opening line.
           */}
          <section className="wrap hero">
            <h1 className="hero-headline" data-reveal="lines">
              <Lines lines={t.heroHeadlineLines} />
            </h1>

            <p className="lede hero-sub" data-reveal="fade" style={{ "--i": 3 } as CSSProperties}>
              {t.heroSub}
            </p>

            <div className="hero-actions" data-reveal="fade" style={{ "--i": 4 } as CSSProperties}>
              <a className="btn btn-primary" href="#work">
                {t.heroCtaWork}
              </a>
              <a className="link" href={resumeHref(locale)} target="_blank" rel="noreferrer">
                {t.heroCtaResume}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <div className="hero-portrait" data-reveal="fade" style={{ "--i": 5 } as CSSProperties}>
              <Image
                src="/jp-samano-cutout.png"
                alt={`${profile.fullName}, ${locale === "es" ? "retrato" : "portrait"}`}
                width={740}
                height={880}
                sizes="(max-width: 700px) 220px, 380px"
                quality={88}
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <dl className="facts" data-reveal="fade" style={{ "--i": 6 } as CSSProperties}>
              <div>
                <dt>{t.factBased}</dt>
                <dd>{t.factBasedValue}</dd>
              </div>
              <div>
                <dt>{t.factFocus}</dt>
                <dd>{t.factFocusValue}</dd>
              </div>
              <div>
                <dt>{t.factStatus}</dt>
                <dd>{t.factStatusValue}</dd>
              </div>
            </dl>
          </section>

          {/* ---- Selected work ----------------------------------------- */}
          <section id="work" className="wrap section">
            <div className="head">
              <h2 className="h2" data-reveal="lines">
                <Lines lines={t.workHeadingLines} />
              </h2>
              <p className="lede" data-reveal="fade" style={{ "--i": 2 } as CSSProperties}>
                {t.workLede}
              </p>
            </div>

            <div className="cases">
              {featured.map((project, index) => {
                const title = getLocalizedValue(project.title, locale);
                const tagline = getLocalizedValue(project.tagline, locale);
                const role = getLocalizedValue(project.role, locale);
                const href = `/${locale}/projects/${project.slug}`;
                const proof = project.proofs[0];

                return (
                  <article className="case-row" key={project.slug} data-reveal="fade">
                    <Link href={href} className="case-media-link" tabIndex={-1} aria-hidden="true">
                      <div className="case-media">
                        <Image
                          src={featuredImage[project.slug]}
                          alt=""
                          width={2880}
                          height={1800}
                          sizes="(max-width: 900px) 100vw, 60vw"
                          quality={82}
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : undefined}
                        />
                      </div>
                    </Link>

                    <div>
                      <div className="case-index">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="index-status">
                          {getLocalizedValue(project.statusLabel, locale)}
                        </span>
                      </div>

                      <h3 className="h3 case-title">
                        <Link href={href}>{title}</Link>
                      </h3>
                      <p className="case-line">{tagline}</p>

                      <dl className="case-spec">
                        <div>
                          <dt>{t.workRole}</dt>
                          <dd>{role.split(",")[0]}</dd>
                        </div>
                        <div>
                          <dt>{t.workStack}</dt>
                          <dd>{project.tech.slice(0, 4).join(" · ")}</dd>
                        </div>
                        {proof ? (
                          <div>
                            <dt>{t.workProof}</dt>
                            <dd>
                              {proof.value} {getLocalizedValue(proof.label, locale).toLowerCase()}
                            </dd>
                          </div>
                        ) : null}
                      </dl>

                      <p className="case-cta">
                        <Link href={href} className="link">
                          {t.readCase}
                          <span className="arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="index-list" data-reveal="fade">
              {rest.map((project, index) => (
                <Link key={project.slug} href={`/${locale}/projects/${project.slug}`} className="index-row">
                  <span className="index-num">{String(featured.length + index + 1).padStart(2, "0")}</span>
                  <span className="index-name">{project.shortName}</span>
                  <span className="index-desc">{getLocalizedValue(project.type, locale)}</span>
                  <span className="index-status">
                    {project.kind === "concept"
                      ? locale === "es"
                        ? "Concepto"
                        : "Concept"
                      : getLocalizedValue(project.statusLabel, locale)}{" "}
                    · {project.year}
                  </span>
                  <span className="index-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <p style={{ marginTop: "var(--stack-5)" }} data-reveal="fade">
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">
                {t.viewGithub}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </p>
          </section>

          {/* ---- Capabilities ------------------------------------------ */}
          <section id="capabilities" className="wrap section">
            <div className="head">
              <h2 className="h2" data-reveal="lines">
                <Lines lines={t.capabilitiesHeadingLines} />
              </h2>
              <p className="lede" data-reveal="fade" style={{ "--i": 1 } as CSSProperties}>
                {t.capabilitiesLede}
              </p>
            </div>

            <div className="cols" data-reveal="fade">
              {capabilityLayers[locale].map((layer, index) => (
                <div className="col" key={layer.name}>
                  <span className="col-num">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="col-name">{layer.name}</h3>
                  <p>{layer.detail}</p>
                  <p className="col-tools">{layer.tools}</p>
                </div>
              ))}
            </div>

            <div className="cols cols-2" style={{ marginTop: "var(--stack-7)" }} data-reveal="fade">
              {principles[locale].map((principle, index) => (
                <div className="col" key={principle.title}>
                  <span className="col-num">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="col-name">{principle.title}</h3>
                  <p>{principle.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---- Profile ------------------------------------------------ */}
          <section id="profile" className="wrap section">
            <div className="head">
              <h2 className="h2" data-reveal="lines">
                <Lines lines={t.profileHeadingLines} />
              </h2>
            </div>

            {/*
             * No second portrait here. The cut-out figure carries the hero, and
             * running the same face twice on one page read as filler rather
             * than as evidence.
             */}
            <div className="profile" data-reveal="fade">
              <div>
                <div className="profile-copy lede">
                  {t.profileBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <dl className="rows" style={{ marginTop: "var(--stack-6)" }}>
                  {trackRecord[locale].map((entry) => (
                    <div className="row" key={entry.title}>
                      <dt className="row-num">{entry.label}</dt>
                      <dd className="row-name">{entry.title}</dd>
                      <dd className="row-body">{entry.detail}</dd>
                    </div>
                  ))}
                </dl>

                <div className="resume-links">
                  <a className="link" href="/resume/jp-samano-resume-en.pdf" target="_blank" rel="noreferrer">
                    {t.resumeEn}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                  <a className="link" href="/resume/jp-samano-resume-es.pdf" target="_blank" rel="noreferrer">
                    {t.resumeEs}
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
                </div>
              </div>
            </div>
          </section>

          {/* ---- Contact (the one dark band) ---------------------------- */}
          <div className="band-ink">
            <section id="contact" className="wrap contact">
              <h2 className="h2" data-reveal="lines">
                <Lines lines={t.contactHeadingLines} />
              </h2>
              <p className="lede" data-reveal="fade" style={{ "--i": 2 } as CSSProperties}>
                {t.contactLede}
              </p>

              <a className="contact-email" href={`mailto:${profile.email}`} data-reveal="fade" style={{ "--i": 3 } as CSSProperties}>
                {profile.email}
              </a>

              <div className="contact-links" data-reveal="fade" style={{ "--i": 4 } as CSSProperties}>
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

            <Footer locale={locale} />
          </div>
        </main>
      </div>
    </div>
  );
}
