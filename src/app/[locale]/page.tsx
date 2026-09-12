import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { asOf, explorations, featured, method, pick, profile, shipped, summer } from "@/data/content";
import { ui } from "@/data/ui";
import { Footer, Header, NameReveal, ProjectMedia, StatusTag, SummerStrip, VisualFrame } from "@/components/parts";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "José Pablo Sámano Suárez · Software developer",
    description:
      "Computer Science at Acadia University, graduating 2027. Software developer at LegalShelf, lead developer of CheckWise, a REPSE compliance platform used by seven companies, and Verifaid, which decides whether a signature can legally proceed.",
  },
  es: {
    title: "José Pablo Sámano Suárez · Desarrollador de software",
    description:
      "Ciencias de la Computación en Acadia University, generación 2027. Desarrollador de software en LegalShelf, a cargo de CheckWise, una plataforma de cumplimiento REPSE que usan siete empresas, y de Verifaid, que decide si una firma puede proceder legalmente.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = meta[locale];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", es: "/es", "x-default": "/en" } },
    openGraph: {
      type: "profile",
      title: m.title,
      description: m.description,
      url: `/${locale}`,
      siteName: profile.name,
      locale: locale === "es" ? "es_MX" : "en_CA",
      alternateLocale: locale === "es" ? ["en_CA"] : ["es_MX"],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/og.png"] },
  };
}

/* Bento spans, in order, on a twelve-column grid: two, then three, then four across. */
const span = [6, 6, 4, 4, 4, 3, 3, 3, 3];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui[locale];
  const p = (path: string) => `/${locale}${path}`;

  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <Header locale={locale} altHref="" home />

      <main id="main">
        {/* Hero ------------------------------------------------------------ */}
        <section className="hero">
          <NameReveal locale={locale} />
          <div className="hero-copy">
            <p className="identity">{t.identity}</p>
            <p className="hero-links">
              <a className="link" href={pick(profile.resume, locale)} target="_blank" rel="noreferrer">{t.links.resume}</a>
              <a className="link" href={`mailto:${profile.email}`}>{t.links.email}</a>
              <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">{t.links.linkedin}</a>
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">{t.links.github}</a>
            </p>
            <p className="availability">{t.availability}</p>
          </div>
        </section>

        {/* Reel: the four systems at a glance ------------------------------ */}
        <nav className="reel" aria-label={t.work.heading}>
          {featured.map((project) =>
            project.visuals?.tile ? (
              <Link key={project.slug} className="reel-tile" href={`#${project.slug}`}>
                <VisualFrame visual={project.visuals.tile} locale={locale} sizes="(max-width: 700px) 80vw, 320px" />
                <span className="reel-cap">
                  <b>{pick(project.title, locale)}</b>
                  <StatusTag status={project.status} locale={locale} />
                </span>
              </Link>
            ) : null,
          )}
        </nav>

        {/* Selected work: one stage per system ---------------------------- */}
        <section id="work" className="section" aria-labelledby="work-h">
          <div className="frame section-head">
            <h2 id="work-h" className="h2">{t.work.heading}</h2>
            <p className="muted">{t.work.lede}</p>
          </div>

          <ol className="stages">
            {featured.map((project, i) => (
              <li key={project.slug} id={project.slug} className={`stage${i % 2 ? " stage-flip" : ""}`}>
                <div className="stage-text">
                  <div className="work-title">
                    <h3 className="h3">
                      <Link href={p(`/projects/${project.slug}`)}>{pick(project.title, locale)}</Link>
                    </h3>
                    <StatusTag status={project.status} locale={locale} />
                  </div>
                  <p className="meta">
                    <span className="mono">{pick(project.period, locale)}</span>
                    <span>{pick(project.role, locale)}</span>
                  </p>
                  <p className="work-line">{pick(project.oneLiner, locale)}</p>
                  <dl className="facts">
                    {project.facts.map((f) => (
                      <div key={f.value + pick(f.label, locale)}>
                        <dt>{pick(f.label, locale)}</dt>
                        <dd className="mono">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="work-links">
                    <Link className="link" href={p(`/projects/${project.slug}`)}>{t.work.readCase} →</Link>
                    {project.links.map((l) => (
                      <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">{pick(l.label, locale)} ↗</a>
                    ))}
                    {project.links.length === 0 ? <span className="muted small">{t.work.private}</span> : null}
                  </p>
                </div>

                <div className="stage-media">
                  {project.visuals ? (
                    <>
                      <VisualFrame visual={project.visuals.primary} locale={locale} priority={i === 0} className="stage-primary" />
                      {project.visuals.secondary ? (
                        <VisualFrame visual={project.visuals.secondary} locale={locale} className="stage-secondary" sizes="(max-width: 900px) 90vw, 520px" />
                      ) : null}
                    </>
                  ) : project.media ? (
                    <ProjectMedia media={project.media} locale={locale} priority={i === 0} />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <p className="frame muted small asof">{pick(asOf, locale).replace(/^./, (c) => c.toUpperCase())}.</p>
        </section>

        {/* How I build ----------------------------------------------------- */}
        <section id="build" className="section" aria-labelledby="build-h">
          <div className="split">
            <div>
              <h2 id="build-h" className="h2">{t.build.heading}</h2>
              <p className="lead">{t.build.lede}</p>
              <ol className="steps">
                {method.map((step, i) => (
                  <li key={step.title.en}>
                    <span className="mono step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="h4">{pick(step.title, locale)}</h3>
                      <p className="muted">{pick(step.body, locale)}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="note">{t.build.figures}</p>
            </div>
            <figure className="shot split-art">
              <Image
                className="shot-media"
                src="/art/build-bp.webp"
                width={1600}
                height={893}
                sizes="(max-width: 900px) 100vw, 560px"
                quality={85}
                alt={locale === "es" ? "Dibujo del sistema: escritorios aislados, una sola compuerta y producción" : "Line drawing of the system: isolated desks, one checkpoint, then production"}
              />
              <figcaption>{locale === "es" ? "Sesiones aisladas, una memoria compartida, una sola compuerta hacia producción." : "Isolated sessions, one shared memory, a single gate into production."}</figcaption>
            </figure>
          </div>
        </section>

        {/* Summer 2026 ----------------------------------------------------- */}
        <section id="summer" className="section" aria-labelledby="summer-h">
          <div className="frame summer">
            <div className="summer-head">
              <h2 id="summer-h" className="h2">{t.summer.heading}</h2>
              <p className="muted">{t.summer.lede}</p>
            </div>
            <SummerStrip locale={locale} />
            <div className="summer-foot">
              <p className="summer-facts">
                {summer.facts.map((f) => (
                  <span key={f.value}><b>{f.value}</b> {pick(f.label, locale)}</span>
                ))}
              </p>
              <a className="btn btn-strong" href={summer.href}>{t.summer.report} →</a>
            </div>
          </div>
        </section>

        {/* Also shipped: bento --------------------------------------------- */}
        <section className="section" aria-labelledby="shipped-h">
          <div className="frame">
            <h2 id="shipped-h" className="h2 bento-h">{t.shipped.heading}</h2>
            <ul className="bento">
              {shipped.map((s, i) => {
                const href = s.slug ? p(`/projects/${s.slug}`) : s.href;
                const external = !s.slug && !!s.href;
                const body = (
                  <>
                    {s.image ? (
                      <span className="bento-img">
                        <Image src={s.image.src} alt={pick(s.image.alt, locale)} width={s.image.width} height={s.image.height} sizes="(max-width: 700px) 100vw, 480px" quality={75} />
                      </span>
                    ) : null}
                    <span className="bento-text">
                      <span className="bento-name">{s.name}{external ? " ↗" : ""}</span>
                      <span className="bento-meta mono">{s.year} · {pick(s.kind, locale)}</span>
                      <span className="bento-line">{pick(s.line, locale)}</span>
                    </span>
                  </>
                );
                return (
                  <li key={s.name} className={`bento-card span-${span[i] ?? 4}`}>
                    {href ? (
                      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{body}</a>
                    ) : (
                      <div>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p id="explorations" className="muted small">{pick(explorations, locale)}</p>
          </div>
        </section>

        {/* About ----------------------------------------------------------- */}
        <section id="about" className="section" aria-labelledby="about-h">
          <div className="split about-split">
            <div>
              <h2 id="about-h" className="h2">{t.about.heading}</h2>
              {t.about.body.map((para) => (
                <p key={para.slice(0, 20)} className="prose">{para}</p>
              ))}
            </div>
            <dl className="about-facts">
              {t.about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact --------------------------------------------------------- */}
        <section id="contact" className="section" aria-labelledby="contact-h">
          <div className="frame contact">
            <h2 id="contact-h" className="h2">{t.contact.heading}</h2>
            <p className="prose">{t.contact.body}</p>
            <p className="contact-mail"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p className="hero-links">
              <a className="link" href={pick(profile.resume, locale)} target="_blank" rel="noreferrer">{t.links.resume}</a>
              <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">{t.links.linkedin}</a>
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">{t.links.github}</a>
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} wide />
    </>
  );
}
