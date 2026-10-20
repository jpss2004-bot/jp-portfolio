import type { Metadata } from "next";
import { shareImage } from "@/lib/share";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { explorations, method, pick, profile, shipped, summer } from "@/data/content";
import { ui } from "@/data/ui";
import { Footer, Header, NameReveal, SummerStrip } from "@/components/parts";

import { StructuredData } from "@/components/StructuredData";
import { homeStructuredData } from "@/lib/structured-data";

import { JournalTeaser } from "@/components/journal/JournalTeaser";

import { SelectedWork } from "@/components/work/SelectedWork";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "José Pablo Sámano Suárez · Software developer",
    description:
      "Software developer at LegalShelf and Research Assistant at Acadia AIoT Research Hub. Computer Science at Acadia University, graduating 2027. Selected work in compliance, document AI and legal systems.",
  },
  es: {
    title: "José Pablo Sámano Suárez · Desarrollador de software",
    description:
      "Desarrollador de software en LegalShelf y asistente de investigación en Acadia AIoT Research Hub. Ciencias de la Computación en Acadia University, generación 2027. Trabajo en cumplimiento, IA documental y sistemas legales.",
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
      images: [shareImage(locale, "home", m.title)],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [shareImage(locale, "home", m.title)] },
  };
}

/* The display face sets only the name, so only the home page loads it. */
const display = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap", axes: ["wdth"] });

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui[locale];
  const p = (path: string) => `/${locale}${path}`;

  return (
    <>
      <StructuredData data={homeStructuredData(locale, meta[locale])} />
      <a href="#main" className="skip-link">{t.skip}</a>
      <Header locale={locale} altHref="" home />

      <main id="main" tabIndex={-1}>
        {/* Hero ------------------------------------------------------------ */}
        <section className={`hero ${display.variable}`}>
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

        <SelectedWork locale={locale} />

        <section id="experience" className="section" aria-labelledby="experience-h">
          <div className="frame">
            <h2 id="experience-h" className="h2">{locale === "es" ? "Experiencia actual" : "Current experience"}</h2>
            <div className="experience">
              <article>
                <p className="meta">{locale === "es" ? "sep 2026 – presente" : "Sep 2026 – present"}</p>
                <h3 className="h4">{locale === "es" ? "Asistente de investigación" : "Research Assistant"}</h3>
                <p><a className="link" href="https://aarh.acadiau.ca/" target="_blank" rel="noreferrer">Acadia AIoT Research Hub</a></p>
                <p className="muted">{locale === "es" ? "Lidero frontend, UX y diseño visual para el hub: diseño y desarrollo las interfaces que presentan su trabajo y sus sistemas." : "I lead frontend, UX and visual design for the hub, designing and developing the interfaces that present its work and systems."}</p>
              </article>
              <article>
                <p className="meta">{locale === "es" ? "may 2026 – presente" : "May 2026 – present"}</p>
                <h3 className="h4">{locale === "es" ? "Desarrollador de software" : "Software Developer"}</h3>
                <p>LegalShelf</p>
                <p className="muted">{locale === "es" ? "Dirijo CheckWise y Verifaid, construí pipelines documentales y rediseñé el sitio de LegalShelf. Ahora trabajo en mejoras de la plataforma y nuevos módulos de IA." : "I lead CheckWise and Verifaid, built document pipelines and redesigned the LegalShelf site. I am now working on platform enhancements and new AI modules."}</p>
              </article>
            </div>
          </div>
        </section>

        {/* How I build ----------------------------------------------------- */}
        <section id="build" className="section" aria-labelledby="build-h">
          <div className="frame build-content">
            <div>
              <h2 id="build-h" className="h2">{t.build.heading}</h2>
              <p className="lead">{t.build.lede}</p>
              <ul className="steps">
                {method.map((step) => (
                  <li key={step.title.en}>
                    <div>
                      <h3 className="h4">{pick(step.title, locale)}</h3>
                      <p className="muted">{pick(step.body, locale)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="note">{t.build.figures}</p>
            </div>

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
              <a className="btn btn-strong" href={`${summer.href}?lang=${locale}`}>{t.summer.report} →</a>
            </div>
          </div>
        </section>

        {/* Additional work stays compact; its details live in the cases. */}
        <section className="section" aria-labelledby="shipped-h">
          <div className="frame">
            <h2 id="shipped-h" className="h2">{t.shipped.heading}</h2>
            <ul className="shipped">
              {shipped.map((s) => {
                const href = s.slug ? p(`/projects/${s.slug}`) : s.href;
                const external = !s.slug && !!s.href;
                return (
                  <li key={s.name}>
                    <div className="shipped-main">
                      <h3 className="shipped-name">
                        {href ? <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{s.name}</a> : s.name}
                      </h3>
                      <p className="shipped-line muted">{pick(s.line, locale)}</p>
                    </div>
                    <span className="shipped-meta">{s.year} · {pick(s.kind, locale)}</span>
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

        <JournalTeaser locale={locale} />

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
