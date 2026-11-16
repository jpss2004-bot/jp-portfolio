import type { Metadata } from "next";
import { shareImage } from "@/lib/share";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { pick, profile } from "@/data/content";
import { ui } from "@/data/ui";
import { Footer, Header, NameReveal } from "@/components/parts";

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
  const es = locale === "es";

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

        <section className="frame context" data-reveal="" aria-label={es ? "Contexto actual" : "Current context"}>
          <ul>
            <li><span>{es ? "Desarrollador de software" : "Software Developer"}</span><b>LegalShelf</b><i>{es ? "may 2026 – presente" : "May 2026 – present"}</i></li>
            <li><span>{es ? "Asistente de investigación" : "Research Assistant"}</span><b>Acadia AIoT Research Hub</b><i>{es ? "sep 2026 – presente" : "Sep 2026 – present"}</i></li>
            <li><span>{es ? "Líder de equipo" : "Team lead"}</span><b>NASA Space Apps Halifax</b><i>{es ? "nov 2026 · Flaregrain" : "Nov 2026 · Flaregrain"}</i></li>
            <li><span>{es ? "Ciencias de la Computación" : "B.Sc. Computer Science"}</span><b>Acadia University</b><i>{es ? "Generación 2027" : "Class of 2027"}</i></li>
          </ul>
        </section>

        <SelectedWork locale={locale} />

        <section id="experience" className="section band" aria-labelledby="experience-h">
          <div className="frame grid12">
            <header className="band-head" data-reveal="">
              <p className="band-num mono">02</p>
              <h2 id="experience-h" className="display-h">{es ? "Experiencia." : "Experience."}</h2>
              <p className="muted">{es ? "Dos roles en paralelo con la carrera: producto en producción y diseño para investigación." : "Two roles alongside my degree: production software and design for research."}</p>
            </header>
            <ol className="timeline">
              {[
                { period: es ? "sep 2026 – presente" : "Sep 2026 – present", role: es ? "Asistente de investigación" : "Research Assistant", org: <a className="link" href="https://aarh.acadiau.ca/" target="_blank" rel="noreferrer">Acadia AIoT Research Hub</a>, place: "Wolfville, NS", body: es ? "Lidero frontend, UX y diseño visual para el hub: diseño y desarrollo las interfaces que presentan su trabajo y sus sistemas." : "I lead frontend, UX and visual design for the hub, designing and developing the interfaces that present its work and systems.", tags: ["Frontend", "UX", es ? "Diseño visual" : "Visual design"] },
                { period: es ? "may 2026 – presente" : "May 2026 – present", role: es ? "Desarrollador de software" : "Software Developer", org: <>LegalShelf</>, place: "", body: es ? "Dirijo CheckWise y Verifaid, construí pipelines documentales y rediseñé el sitio de LegalShelf. Ahora trabajo en mejoras de la plataforma y nuevos módulos de IA." : "I lead CheckWise and Verifaid, built document pipelines and redesigned the LegalShelf site. I now work on platform enhancements and new AI modules.", tags: ["Python · FastAPI", "Next.js", "PostgreSQL", es ? "IA documental" : "Document AI"] },
                { period: es ? "nov 2026" : "Nov 2026", role: es ? "Líder de equipo, NASA Space Apps" : "Team lead, NASA Space Apps", org: <Link className="link" href={`/${locale}/projects/flaregrain`}>Flaregrain · Sparkline Foundry</Link>, place: "Halifax, NS", body: es ? "Formé y lideré un equipo de cuatro para construir en 48 horas una herramienta que responde preguntas sobre experimentos de fuego de la NASA con citas verificables." : "I formed and led a team of four to build, in 48 hours, a tool that answers questions about NASA fire experiments with checkable citations.", tags: [es ? "Liderazgo" : "Leadership", es ? "Recuperación e IA" : "Retrieval and AI", es ? "Presentación" : "Pitch"] },
              ].map((item) => (
                <li key={item.role} data-reveal="">
                  <p className="timeline-when mono">{item.period}{item.place ? <span>{item.place}</span> : null}</p>
                  <div className="timeline-what">
                    <h3>{item.role}</h3>
                    <p className="timeline-org">{item.org}</p>
                  </div>
                  <div className="timeline-how">
                    <p>{item.body}</p>
                    <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* About ----------------------------------------------------------- */}
        <section id="about" className="section band" aria-labelledby="about-h">
          <div className="frame grid12">
            <header className="band-head" data-reveal="">
              <p className="band-num mono">03</p>
              <h2 id="about-h" className="display-h">{es ? "Sobre mí." : "About."}</h2>
            </header>
            <div className="about-lede" data-reveal="">
              <p>{t.about.body[0]}</p>
            </div>
            <div className="about-body" data-reveal="">
              {t.about.body.slice(1).map((para) => (
                <p key={para.slice(0, 20)}>{para}</p>
              ))}
            </div>
            <dl className="about-facts about-sheet" data-reveal="">
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
        <section id="contact" className="section band contact-band" aria-labelledby="contact-h">
          <div className="frame grid12">
            <header className="band-head" data-reveal="">
              <p className="band-num mono">04</p>
              <h2 id="contact-h" className="display-h">{es ? "Contacto." : "Contact."}</h2>
            </header>
            <div className="contact-main" data-reveal="">
              <p className="contact-mail"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
              <p className="contact-note">{t.contact.body}</p>
            </div>
            <ul className="contact-list" data-reveal="">
              <li><a href={pick(profile.resume, locale)} target="_blank" rel="noreferrer"><span>{t.links.resume}</span><i aria-hidden="true">↗</i></a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noreferrer"><span>{t.links.linkedin}</span><i aria-hidden="true">↗</i></a></li>
              <li><a href={profile.github} target="_blank" rel="noreferrer"><span>{t.links.github}</span><i aria-hidden="true">↗</i></a></li>
            </ul>
            <p className="contact-avail">{t.availability}</p>
          </div>
        </section>
      </main>

      <Footer locale={locale} wide />
    </>
  );
}
