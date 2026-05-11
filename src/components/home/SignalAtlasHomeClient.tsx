"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";
import { operatingPrinciples, profile, stackLayers, timeline } from "@/data/portfolio";
import { DesktopFloatingDock } from "@/components/layout/DesktopFloatingDock";
import { Header } from "@/components/layout/Header";
import { SignalAtmosphere } from "@/components/home/SignalAtmosphere";
import { SignalJourneyRail } from "@/components/home/SignalJourneyRail";
import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";
import { SignalRouteProgress } from "@/components/home/SignalRouteProgress";

export type Language = Locale;

const copy = {
  en: {
    navWork: "Work",
    navStack: "Stack",
    navResume: "Resume",
    navProcess: "Process",
    navContact: "Contact",
    eyebrow: "Canada \\u2194 Mexico / Bilingual software systems",
    headline: "I turn messy workflows into software people can trust.",
    subhead:
      "Computer Science student building backend-heavy products, workflow tools, and AI-assisted systems with clear interfaces, practical architecture, and visible proof.",
    primaryCta: "Explore selected systems",
    resumeCta: "View resume",
    downloadResume: "Download PDF",
    githubCta: "Open GitHub",
    proofOne: "Open to internships",
    proofTwo: "English / Español",
    proofThree: "Backend + product",
    proofFour: "Next.js / Python / SQL",
    sceneLabel: "Interactive Signal Atlas scene",
    sceneCaption: "Projects, proof, and technical decisions connected into one portfolio system.",
    workEyebrow: "Selected systems",
    workTitle: "Selected systems with clear proof paths.",
    workCopy:
      "Each card highlights the role, stack, proof signals, real project evidence, and the case-study route behind the work.",
    stackEyebrow: "Technical map",
    stackTitle: "Stack grouped by where it creates value.",
    stackCopy: "Interface, application logic, data, and delivery are shown as a system, not a random skills cloud.",
    resumeEyebrow: "Recruiter utility",
    resumeTitle: "Resume access stays visible without taking over the story.",
    resumeCopy: "Open or download the resume, then use the project cards and case studies as proof behind the bullet points.",
    processEyebrow: "Operating method",
    processTitle: "How I turn ideas into systems.",
    processCopy: "The portfolio should show judgment: problem framing, architecture, tradeoffs, implementation, and iteration.",
    aboutEyebrow: "Builder profile",
    aboutTitle: "A Canada/Mexico portfolio with technical proof.",
    aboutCopy:
      "My strongest work connects software engineering, product thinking, and practical workflows. The visual system is personal, but the content stays recruiter-readable.",
    contactEyebrow: "Contact",
    contactTitle: "Have an internship, project, or technical opportunity?",
    contactCopy: "Open to internships, junior product engineering roles, and practical technical collaborations.",
    emailMe: "Email JP",
    openCase: "Read case study",
    visualLabel: "project proof preview",
  },
  es: {
    navWork: "Proyectos",
    navStack: "Stack",
    navResume: "CV",
    navProcess: "Proceso",
    navContact: "Contacto",
    eyebrow: "Canad\\u00e1 \\u2194 M\\u00e9xico / Sistemas de software biling\\u00fces",
    headline: "Convierto flujos complejos en software confiable.",
    subhead:
      "Estudiante de Ciencias de la Computaci\\u00f3n que construye productos con backend fuerte, herramientas de flujo de trabajo y sistemas asistidos por IA con criterio de producto, arquitectura y evidencia.",
    primaryCta: "Explorar sistemas seleccionados",
    resumeCta: "Ver CV",
    downloadResume: "Descargar PDF",
    githubCta: "Abrir GitHub",
    proofOne: "Abierto a internships",
    proofTwo: "Ingl\\u00e9s / Espa\\u00f1ol",
    proofThree: "Backend + producto",
    proofFour: "Next.js / Python / SQL",
    sceneLabel: "Escena interactiva de Signal Atlas",
    sceneCaption: "Proyectos, evidencia y decisiones técnicas conectadas en un solo sistema de portafolio.",
    workEyebrow: "Sistemas seleccionados",
    workTitle: "Sistemas seleccionados con rutas de evidencia claras.",
    workCopy:
      "Cada tarjeta resume el rol, el stack, las señales de evidencia y la ruta al caso de estudio. Las capturas reales reemplazarÃ¡n los visuales temporales conforme maduren los proyectos.",
    stackEyebrow: "Mapa t\\u00e9cnico",
    stackTitle: "Stack agrupado por el valor que aporta.",
    stackCopy: "Interfaz, l\\u00f3gica de aplicaci\\u00f3n, datos y entrega se muestran como sistema, no como lista aleatoria.",
    resumeEyebrow: "Utilidad para reclutadores",
    resumeTitle: "El acceso al CV se mantiene visible sin dominar la historia.",
    resumeCopy: "Abre o descarga el CV, luego usa las tarjetas y casos de estudio como evidencia detr\\u00e1s de cada punto.",
    processEyebrow: "M\\u00e9todo de trabajo",
    processTitle: "C\\u00f3mo convierto ideas en sistemas.",
    processCopy: "El portafolio debe mostrar criterio: problema, arquitectura, tradeoffs, implementaci\\u00f3n e iteraci\\u00f3n.",
    aboutEyebrow: "Perfil de constructor",
    aboutTitle: "Un portafolio Canad\\u00e1/M\\u00e9xico con evidencia t\\u00e9cnica.",
    aboutCopy:
      "Mi trabajo conecta ingenier\\u00eda de software, pensamiento de producto y flujos reales. El sistema visual es personal, pero el contenido sigue siendo claro para reclutadores.",
    contactEyebrow: "Contacto",
    contactTitle: "\\u00bfTienes una oportunidad, proyecto o internship?",
    contactCopy: "Abierto a internships, roles junior de ingeniería de producto y colaboraciones técnicas prácticas.",
    emailMe: "Escribir a JP",
    openCase: "Leer caso de estudio",
    visualLabel: "vista de evidencia del proyecto",
  },
} as const;

function decode(value: string) {
  return JSON.parse(`"${value}"`) as string;
}

function Badge({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return <span className={strong ? "tag tag-strong" : "tag"}>{children}</span>;
}

function SectionTitle({ eyebrow, title, copyText }: { eyebrow: string; title: string; copyText: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copyText}</p>
    </div>
  );
}

function AtlasScene({ language }: { language: Locale }) {
  const t = copy[language];
  const nodes = [
    { label: "SAVR", className: "scene-node-a" },
    { label: "ER", className: "scene-node-b" },
    { label: "AI", className: "scene-node-c" },
    { label: language === "es" ? decode("M\\u00e9xico") : "Mexico", className: "scene-node-d" },
    { label: "Canada", className: "scene-node-e" },
    { label: "Proof", className: "scene-node-f" },
  ];

  return (
    <aside className="atlas-stage" aria-label={t.sceneLabel}>
      <div className="stage-glow" />
      <div className="stage-grid" />
      <div className="orbital-system" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="atlas-core">
          <span>JP</span>
          <small>Signal Atlas</small>
        </div>
        {nodes.map((node) => (
          <div className={`scene-node ${node.className}`} key={node.label}>
            <span />
            <strong>{node.label}</strong>
          </div>
        ))}
      </div>
      <svg className="route-web" viewBox="0 0 620 460" aria-hidden="true">
        <path d="M118 330 C196 104, 410 84, 512 140" />
        <path d="M142 138 C246 244, 382 298, 516 318" />
        <path d="M104 340 C242 396, 398 396, 520 318" />
        <path d="M310 230 C330 150, 392 120, 512 140" />
      </svg>
      <div className="scene-caption">
        <small>SIGNAL FIELD / ROUTES + NODES</small>
        <p>{t.sceneCaption}</p>
      </div>
    </aside>
  );
}

function Hero({ language }: { language: Locale }) {
  const t = copy[language];
  const resumeFile = language === "es" ? "/resume/jp-samano-resume-es.pdf" : "/resume/jp-samano-resume-en.pdf";
  const proofItems = [t.proofOne, t.proofTwo, t.proofThree, t.proofFour];

  return (
    <section className="hero shell">
      <div className="hero-copy reveal-up">
        <Badge strong>{decode(t.eyebrow)}</Badge>
        <h1>{t.headline}</h1>
        <p className="hero-subtitle">{decode(t.subhead)}</p>

        <div className="hero-actions">
          <a href="#work" className="button button-primary">{t.primaryCta}</a>
          <a href={resumeFile} target="_blank" rel="noreferrer" className="button button-soft">{t.resumeCta}</a>
          <a href={resumeFile} download className="button button-ghost">{t.downloadResume}</a>
        </div>

        <div className="proof-strip" aria-label="Quick proof signals">
          {proofItems.map((item) => (
            <div key={item}>
              <span />
              <strong>{decode(item)}</strong>
            </div>
          ))}
        </div>
      </div>
      <AtlasScene language={language} />
    </section>
  );
}

function projectVisual(slug: string) {
  const realProofImages: Record<string, string> = {
    savr: "/projects/savr/savr-onboarding.png",
    "family-phrase-game": "/projects/family-phrase-game/family-phrase-game-main.png",
  };

  return realProofImages[slug] ?? `/projects/${slug}/preview.svg`;
}

function Work({ language }: { language: Locale }) {
  const t = copy[language];

  return (
    <section id="work" className="section shell work-section">
      <div className="section-heading-row">
        <SectionTitle eyebrow={t.workEyebrow} title={decode(t.workTitle)} copyText={decode(t.workCopy)} />
        <a href={profile.github} target="_blank" rel="noreferrer" className="button button-soft">{t.githubCta}</a>
      </div>

      <div className="project-grid synchronized-grid">
        {caseStudies.map((project, index) => {
          const title = getLocalizedValue(project.title, language);
          const summary = getLocalizedValue(project.summary, language);
          const tagline = getLocalizedValue(project.tagline, language);
          const role = getLocalizedValue(project.role, language);
          const status = getLocalizedValue(project.statusLabel, language);
          const metrics = project.proofs.slice(0, 3);

          return (
            <Link
              href={`/${language}/projects/${project.slug}`}
              key={project.slug}
              className={index === 0 ? "project-card featured" : "project-card"}
            >
              <div className="project-card-visual">
                <Image
                  src={projectVisual(project.slug)}
                  width={1200}
                  height={720}
                  alt={`${title} ${t.visualLabel}`}
                  sizes={index === 0 ? "(max-width: 980px) 100vw, 66vw" : "(max-width: 980px) 100vw, 33vw"}
                  unoptimized
                  priority={index === 0}
                />
                <div className="visual-sheen" />
                <div className="project-status-pill">{status}</div>
              </div>

              <div className="project-card-content">
                <div className="project-title-row">
                  <div>
                    <p>{project.year} / {project.status.replace("-", " ").toUpperCase()}</p>
                    <h3>{title}</h3>
                  </div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="project-one-liner">{tagline}</p>
                <p className="project-summary">{summary}</p>
              </div>

              <div className="metric-band">
                {metrics.map((metric) => (
                  <div key={getLocalizedValue(metric.label, language)}>
                    <small>{getLocalizedValue(metric.label, language)}</small>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>

              <div className="stack-row">
                {project.tech.slice(0, 5).map((tool) => <span key={tool}>{tool}</span>)}
              </div>

              <div className="card-footer">
                <span>{role.split(",")[0]}</span>
                <strong>{t.openCase}</strong>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Stack({ language }: { language: Locale }) {
  const t = copy[language];

  return (
    <section id="stack" className="section shell">
      <SectionTitle eyebrow={decode(t.stackEyebrow)} title={decode(t.stackTitle)} copyText={decode(t.stackCopy)} />
      <div className="stack-cards stack-cards-wide">
        {stackLayers.map((layer, index) => (
          <article className="stack-card" key={layer.layer}>
            <span>0{index + 1}</span>
            <h3>{layer.layer}</h3>
            <p>{layer.description}</p>
            <div>{layer.tools.map((tool) => <Badge key={tool}>{tool}</Badge>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResumeSection({ language }: { language: Locale }) {
  const t = copy[language];
  const resumeFile = language === "es" ? "/resume/jp-samano-resume-es.pdf" : "/resume/jp-samano-resume-en.pdf";

  return (
    <section id="resume" className="section shell">
      <div className="resume-card">
        <div>
          <p className="eyebrow">{decode(t.resumeEyebrow)}</p>
          <h2>{decode(t.resumeTitle)}</h2>
          <p>{decode(t.resumeCopy)}</p>
        </div>
        <div className="resume-preview" aria-hidden="true">
          <span />
          <span />
          <span />
          <strong>JP Samano</strong>
          <small>Software systems / Backend / Product</small>
        </div>
        <div className="resume-actions">
          <a href={resumeFile} target="_blank" rel="noreferrer" className="button button-primary">{t.resumeCta}</a>
          <a href={resumeFile} download className="button button-soft">{t.downloadResume}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="button button-ghost">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

function Process({ language }: { language: Locale }) {
  const t = copy[language];

  return (
    <section id="process" className="section shell two-column">
      <SectionTitle eyebrow={decode(t.processEyebrow)} title={decode(t.processTitle)} copyText={decode(t.processCopy)} />
      <div className="principle-list">
        {operatingPrinciples.map((principle, index) => (
          <article key={principle}>
            <span>{index + 1}</span>
            <div>
              <h3>{principle}</h3>
              <p>Problem framing, architecture, interface, implementation, proof, and next iteration.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About({ language }: { language: Locale }) {
  const t = copy[language];

  return (
    <section id="about" className="section shell about-grid">
      <div className="about-card">
        <p className="eyebrow">{decode(t.aboutEyebrow)}</p>
        <h2>{decode(t.aboutTitle)}</h2>
        <p>{decode(t.aboutCopy)}</p>
      </div>
      <div className="timeline-list">
        {timeline.map((item) => (
          <article key={item.title}>
            <small>{item.label}</small>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ language }: { language: Locale }) {
  const t = copy[language];

  return (
    <section id="contact" className="section shell contact-card">
      <div>
        <p className="eyebrow">{decode(t.contactEyebrow)}</p>
        <h2>{decode(t.contactTitle)}</h2>
        <p>{t.contactCopy}</p>
      </div>
      <div className="contact-actions">
        <a className="button button-primary" href={`mailto:${profile.email}`}>{t.emailMe}</a>
        <a className="button button-soft" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="button button-soft" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}

export function SignalAtlasHomeClient({ initialLocale = "en" }: { initialLocale?: Language }) {
  const language = initialLocale;
  const t = copy[language];
  const dockItems = [
    { href: "#work", label: t.navWork },
    { href: "#stack", label: t.navStack },
    { href: "#resume", label: t.navResume },
    { href: "#contact", label: t.navContact },
  ];

  return (
    <main id="main-content" className="portfolio-page">
      <DocumentLocaleSync locale={language} />
      <SignalAtmosphere locale={language} mode="home" />
      <Header locale={language} navItems={dockItems} />
      <SignalJourneyRail locale={language} />
      <SignalRouteProgress locale={language} />
      <Hero language={language} />
      <Work language={language} />
      <Stack language={language} />
      <ResumeSection language={language} />
      <Process language={language} />
      <About language={language} />
      <Contact language={language} />
      <DesktopFloatingDock items={dockItems} />
    </main>
  );
}