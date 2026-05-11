"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";
import { profile, stackLayers } from "@/data/portfolio";
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
    eyebrow: "Canada \\u2194 Mexico / Software Engineering / Cybersecurity / Product Systems",
    headline: "I build software systems that turn messy workflows into clear, reliable tools.",
    subhead:
      "Computer Science student at Acadia University focused on software engineering, full-stack development, cybersecurity, incident response, and practical product systems. I build tools that connect technical logic, user workflows, and clear evidence.",
    primaryCta: "View selected projects",
    resumeCta: "View resume",
    downloadResume: "Download PDF",
    githubCta: "Open GitHub",
    proofOne: "Open to internships",
    proofTwo: "English / Español",
    proofThree: "Software + cybersecurity",
    proofFour: "Python / React / FastAPI / SQL",
    sceneLabel: "Interactive Signal Atlas scene",
    sceneCaption: "Projects, proof, and technical decisions connected into one portfolio system.",
    workEyebrow: "Selected systems",
    workTitle: "Selected systems with clear proof paths.",
    workCopy:
      "Each project card connects the product problem, technical role, stack, proof signals, and case-study route behind the work.",
    stackEyebrow: "Technical map",
    stackTitle: "Stack grouped by where it creates value.",
    stackCopy: "Interface, application logic, data, and delivery are shown as a system, not a random skills cloud.",
    resumeEyebrow: "Recruiter utility",
    resumeTitle: "Resume access stays visible without taking over the story.",
    resumeCopy: "Resume built for software engineering, cybersecurity, and technical product roles. Includes Acadia University, Cybolt Academy, SAVR, software projects, technical skills, and bilingual background.",
    processEyebrow: "Operating method",
    processTitle: "How I turn ideas into systems.",
    processCopy: "The portfolio should show judgment: problem framing, architecture, tradeoffs, implementation, and iteration.",
    aboutEyebrow: "Builder profile",
    aboutTitle: "Software engineering first, cybersecurity as a technical edge.",
    aboutCopy:
      "I am a Computer Science student at Acadia University building toward roles in software engineering, cybersecurity, incident response, and technical product development. My work sits at the intersection of systems, security, and usability: APIs, data models, user flows, authentication, recommendation logic, dashboards, and deployable web applications.",
    contactEyebrow: "Contact",
    contactTitle: "Have a software engineering, cybersecurity, or product opportunity?",
    contactCopy: "I am open to internships, junior technical roles, project collaborations, and conversations with teams building practical software systems.",
    emailMe: "Email JP",
    openCase: "Read full case study",
    visualLabel: "project proof preview",
  },
  es: {
    navWork: "Proyectos",
    navStack: "Stack",
    navResume: "CV",
    navProcess: "Proceso",
    navContact: "Contacto",
    eyebrow: "Canad\\u00e1 \\u2194 M\\u00e9xico / Ingenier\\u00eda de Software / Ciberseguridad / Sistemas de Producto",
    headline: "Construyo sistemas de software que convierten flujos complejos en herramientas claras y confiables.",
    subhead:
      "Estudiante de Ciencias de la Computaci\\u00f3n en Acadia University con enfoque en ingenier\\u00eda de software, desarrollo full-stack, ciberseguridad, respuesta a incidentes y sistemas pr\\u00e1cticos de producto. Construyo herramientas que conectan l\\u00f3gica t\\u00e9cnica, flujos de usuario y evidencia clara.",
    primaryCta: "Abrir casos seleccionados",
    resumeCta: "Ver CV",
    downloadResume: "Descargar PDF",
    githubCta: "Abrir GitHub",
    proofOne: "Abierto a internships",
    proofTwo: "Ingl\\u00e9s / Espa\\u00f1ol",
    proofThree: "Software + ciberseguridad",
    proofFour: "Python / React / FastAPI / SQL",
    sceneLabel: "Escena interactiva de Signal Atlas",
    sceneCaption: "Proyectos, evidencia y decisiones técnicas conectadas en un solo sistema de portafolio.",
    workEyebrow: "Sistemas seleccionados",
    workTitle: "Sistemas seleccionados con rutas de evidencia claras.",
    workCopy: "Cada tarjeta conecta el problema de producto, el rol t\\u00e9cnico, el stack, las se\\u00f1ales de evidencia y la ruta al caso de estudio.",
    stackEyebrow: "Mapa t\\u00e9cnico",
    stackTitle: "Stack agrupado por el valor que aporta.",
    stackCopy: "Interfaz, l\\u00f3gica de aplicaci\\u00f3n, datos y entrega se muestran como sistema, no como lista aleatoria.",
    resumeEyebrow: "Utilidad para reclutadores",
    resumeTitle: "El acceso al CV se mantiene visible sin dominar la historia.",
    resumeCopy: "CV orientado a roles de ingenier\\u00eda de software, ciberseguridad y producto t\\u00e9cnico. Incluye Acadia University, Cybolt Academy, SAVR, proyectos de software, habilidades t\\u00e9cnicas y perfil biling\\u00fce.",
    processEyebrow: "M\\u00e9todo de trabajo",
    processTitle: "C\\u00f3mo convierto ideas en sistemas.",
    processCopy: "El portafolio debe mostrar criterio: problema, arquitectura, tradeoffs, implementaci\\u00f3n e iteraci\\u00f3n.",
    aboutEyebrow: "Perfil de constructor",
    aboutTitle: "Ingenier\\u00eda de software primero, ciberseguridad como ventaja t\\u00e9cnica.",
    aboutCopy:
      "Soy estudiante de Ciencias de la Computaci\\u00f3n en Acadia University y estoy construyendo mi perfil profesional hacia ingenier\\u00eda de software, ciberseguridad, respuesta a incidentes y desarrollo t\\u00e9cnico de producto. Mi trabajo conecta sistemas, seguridad y usabilidad: APIs, modelos de datos, flujos de usuario, autenticaci\\u00f3n, l\\u00f3gica de recomendaci\\u00f3n, dashboards y aplicaciones web desplegables.",
    contactEyebrow: "Contacto",
    contactTitle: "\\u00bfTienes una oportunidad en ingenier\\u00eda de software, ciberseguridad o producto?",
    contactCopy: "Estoy abierto a internships, roles t\\u00e9cnicos junior, colaboraciones de proyecto y conversaciones con equipos que construyen sistemas de software pr\\u00e1cticos.",
    emailMe: "Escribir a JP",
    openCase: "Leer caso completo",
    visualLabel: "vista de evidencia del proyecto",
  },
} as const;


const localizedStackLayers = {
  en: stackLayers,
  es: [
    {
      layer: "Interfaz",
      description: "Superficies de producto, UI responsiva, dise\u00f1o de interacci\u00f3n y presentaci\u00f3n profesional.",
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flujos UX"],
    },
    {
      layer: "Aplicaci\u00f3n",
      description: "Rutas, l\u00f3gica de servidor, autenticaci\u00f3n, validaci\u00f3n e implementaci\u00f3n de funciones.",
      tools: ["Python", "FastAPI", "Flask", "REST APIs", "JWT Auth"],
    },
    {
      layer: "Datos",
      description: "Persistencia, esquemas, datos semilla, transiciones de estado y modelado de dominio.",
      tools: ["PostgreSQL", "SQLite", "SQLAlchemy", "Modelado de datos", "Testing"],
    },
    {
      layer: "Entrega",
      description: "Control de versiones, despliegue, documentaci\u00f3n, demos y narrativa de proyectos.",
      tools: ["GitHub", "Vercel", "Render", "README docs", "Casos de estudio"],
    },
  ],
} satisfies Record<Locale, { layer: string; description: string; tools: string[] }[]>;

const localizedOperatingPrinciples = {
  en: [
    {
      title: "Build real systems, not just demos.",
      detail: "Problem framing, architecture, interface, implementation, proof, and next iteration.",
    },
    {
      title: "Make technical decisions explainable.",
      detail: "Tradeoffs, constraints, decisions, and outcomes should be visible to recruiters and technical reviewers.",
    },
    {
      title: "Design the workflow before designing the screen.",
      detail: "The interface should reflect the real process, user state, and system behavior behind the product.",
    },
    {
      title: "Show proof: code, screenshots, demos, architecture, and outcomes.",
      detail: "Each project should give visitors something concrete to inspect.",
    },
  ],
  es: [
    {
      title: "Construir sistemas reales, no solo demos.",
      detail: "Problema, arquitectura, interfaz, implementaci\u00f3n, evidencia e iteraci\u00f3n siguiente.",
    },
    {
      title: "Hacer explicables las decisiones t\u00e9cnicas.",
      detail: "Tradeoffs, restricciones, decisiones y resultados deben ser claros para reclutadores y revisores t\u00e9cnicos.",
    },
    {
      title: "Dise\u00f1ar el flujo antes de dise\u00f1ar la pantalla.",
      detail: "La interfaz debe reflejar el proceso real, el estado del usuario y el comportamiento del sistema.",
    },
    {
      title: "Mostrar evidencia: c\u00f3digo, capturas, demos, arquitectura y resultados.",
      detail: "Cada proyecto debe dar al visitante algo concreto para revisar.",
    },
  ],
} satisfies Record<Locale, { title: string; detail: string }[]>;

const localizedTimeline = {
  en: [
    {
      label: "Now",
      title: "Building a professional project portfolio",
      description: "Turning full-stack projects, prototypes, and product ideas into polished case studies with evidence, architecture, and public links.",
    },
    {
      label: "2026",
      title: "SAVR and deployed web apps",
      description: "Developing context-aware recommendation systems and fast practical web apps that move from concept to implementation.",
    },
    {
      label: "2025",
      title: "Software engineering and workflow systems",
      description: "Building projects around triage workflows, AI traffic concepts, cybersecurity reporting, and software design practices.",
    },
    {
      label: "Foundation",
      title: "Computer Science at Acadia University",
      description: "Coursework across software engineering, data structures, discrete math, systems, cybersecurity, and human-machine interaction.",
    },
  ],
  es: [
    {
      label: "Ahora",
      title: "Construyendo un portafolio profesional de proyectos",
      description: "Convirtiendo proyectos full-stack, prototipos e ideas de producto en casos de estudio con evidencia, arquitectura y enlaces p\u00fablicos.",
    },
    {
      label: "2026",
      title: "SAVR y aplicaciones web desplegadas",
      description: "Desarrollando sistemas de recomendaci\u00f3n contextuales y apps web pr\u00e1cticas que pasan de concepto a implementaci\u00f3n.",
    },
    {
      label: "2025",
      title: "Ingenier\u00eda de software y sistemas de flujo de trabajo",
      description: "Construyendo proyectos sobre triage, conceptos de IA para tr\u00e1fico, reportes de ciberseguridad y pr\u00e1cticas de dise\u00f1o de software.",
    },
    {
      label: "Base",
      title: "Ciencias de la Computaci\u00f3n en Acadia University",
      description: "Cursos en ingenier\u00eda de software, estructuras de datos, matem\u00e1ticas discretas, sistemas, ciberseguridad e interacci\u00f3n humano-m\u00e1quina.",
    },
  ],
} satisfies Record<Locale, { label: string; title: string; description: string }[]>;


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
        {localizedStackLayers[language].map((layer, index) => (
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
          <small>{language === "es" ? "Software / Ciberseguridad / Producto" : "Software Engineering / Cybersecurity / Product"}</small>
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
        {localizedOperatingPrinciples[language].map((principle, index) => (
          <article key={principle.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
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
        {localizedTimeline[language].map((item) => (
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