"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { TiltCard } from "@/components/home/TiltCard";
import { caseStudies, getLocalizedValue } from "@/data/case-studies";
import type { Locale } from "@/data/i18n";
import { profile, stackLayers } from "@/data/portfolio";
import { Header } from "@/components/layout/Header";
import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";
import { SignalWave, modeForChapter } from "@/components/home/SignalWave";
import { SignalHUD } from "@/components/home/SignalHUD";
import { SignalBoot } from "@/components/home/SignalBoot";
import { SystemsScan } from "@/components/home/SystemsScan";
import { Reveal } from "@/components/home/Reveal";

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
      "Computer Science student at Acadia University, focused on software engineering and cybersecurity. I build full-stack products and workflow tools, and back each one with real proof. Open to internships and junior technical roles.",
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
    workEyebrow: "Selected work",
    workTitle: "Five projects, and the proof behind each one.",
    workCopy:
      "Full-stack products, workflow tools, and security concepts. For each one you can see the problem it solves, my role, the stack, and what I actually built.",
    stackEyebrow: "Technical map",
    stackTitle: "The stack, grouped by what it does.",
    stackCopy: "Interface, application, data, and delivery, so you can see how I work across a whole system instead of reading a list of tools.",
    resumeEyebrow: "Resume",
    resumeTitle: "My one-page resume, ready to download.",
    resumeCopy: "Built for software engineering, cybersecurity, and technical product roles. Covers Acadia University, the Cybolt cybersecurity program, SAVR, and the projects below.",
    processEyebrow: "How I work",
    processTitle: "How I turn ideas into systems.",
    processCopy: "How I take a project from idea to a working system: frame the problem, design the architecture, weigh the tradeoffs, build it, then iterate.",
    aboutEyebrow: "About",
    aboutTitle: "Software engineering first, cybersecurity as a technical edge.",
    aboutCopy:
      "I'm a Computer Science student at Acadia University, working toward roles in software engineering, cybersecurity, and technical product development. My projects sit where systems, security, and usability meet: APIs, data models, authentication, recommendation logic, dashboards, and deployable web apps.",
    contactEyebrow: "Contact",
    contactTitle: "Have a software engineering, cybersecurity, or product opportunity?",
    contactCopy: "I'm open to internships, junior technical roles, and project collaborations. The fastest way to reach me is email.",
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
      "Estudiante de Ciencias de la Computaci\\u00f3n en Acadia University, con enfoque en ingenier\\u00eda de software y ciberseguridad. Construyo productos full-stack y herramientas de flujo, y respaldo cada uno con evidencia real. Abierto a internships y roles t\\u00e9cnicos junior.",
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
    workEyebrow: "Trabajo seleccionado",
    workTitle: "Cinco proyectos, y la evidencia detr\\u00e1s de cada uno.",
    workCopy: "Productos full-stack, herramientas de flujo y conceptos de seguridad. En cada uno puedes ver el problema que resuelve, mi rol, el stack y lo que realmente constru\\u00ed.",
    stackEyebrow: "Mapa t\\u00e9cnico",
    stackTitle: "El stack, agrupado por lo que hace.",
    stackCopy: "Interfaz, aplicaci\\u00f3n, datos y entrega, para que veas c\\u00f3mo trabajo en todo un sistema en vez de leer una lista de herramientas.",
    resumeEyebrow: "CV",
    resumeTitle: "Mi CV de una p\\u00e1gina, listo para descargar.",
    resumeCopy: "Orientado a roles de ingenier\\u00eda de software, ciberseguridad y producto t\\u00e9cnico. Incluye Acadia University, el programa de ciberseguridad Cybolt, SAVR y los proyectos de abajo.",
    processEyebrow: "C\\u00f3mo trabajo",
    processTitle: "C\\u00f3mo convierto ideas en sistemas.",
    processCopy: "C\\u00f3mo llevo un proyecto de idea a sistema funcional: defino el problema, dise\\u00f1o la arquitectura, sopeso los tradeoffs, lo construyo y luego itero.",
    aboutEyebrow: "Sobre m\\u00ed",
    aboutTitle: "Ingenier\\u00eda de software primero, ciberseguridad como ventaja t\\u00e9cnica.",
    aboutCopy:
      "Soy estudiante de Ciencias de la Computaci\\u00f3n en Acadia University, avanzando hacia roles en ingenier\\u00eda de software, ciberseguridad y desarrollo t\\u00e9cnico de producto. Mis proyectos conectan sistemas, seguridad y usabilidad: APIs, modelos de datos, autenticaci\\u00f3n, l\\u00f3gica de recomendaci\\u00f3n, dashboards y aplicaciones web desplegables.",
    contactEyebrow: "Contacto",
    contactTitle: "\\u00bfTienes una oportunidad en ingenier\\u00eda de software, ciberseguridad o producto?",
    contactCopy: "Estoy abierto a internships, roles t\\u00e9cnicos junior y colaboraciones de proyecto. La forma m\\u00e1s r\\u00e1pida de contactarme es por correo.",
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
    <Reveal className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copyText}</p>
    </Reveal>
  );
}

const CHAPTER_INFO: Record<string, { idx: string; name: { en: string; es: string }; kicker: { en: string; es: string } }> = {
  work: {
    idx: "01",
    name: { en: "SYSTEMS", es: "SISTEMAS" },
    kicker: {
      en: "Five systems, each built to turn a messy problem into something clear and provable.",
      es: "Cinco sistemas, cada uno construido para convertir un problema complejo en algo claro y demostrable.",
    },
  },
  stack: {
    idx: "02",
    name: { en: "STACK", es: "STACK" },
    kicker: {
      en: "The tools I build with, grouped by what they do across a system.",
      es: "Las herramientas con las que construyo, agrupadas por lo que hacen en un sistema.",
    },
  },
  process: {
    idx: "03",
    name: { en: "METHOD", es: "MÉTODO" },
    kicker: {
      en: "How I take a project from a rough idea to a working, explainable system.",
      es: "Cómo llevo un proyecto de una idea cruda a un sistema funcional y explicable.",
    },
  },
  about: {
    idx: "04",
    name: { en: "ORIGIN", es: "ORIGEN" },
    kicker: {
      en: "Where I'm coming from: a bilingual CS student building between Canada and Mexico.",
      es: "De dónde vengo: un estudiante de CS bilingüe que construye entre Canadá y México.",
    },
  },
  contact: {
    idx: "05",
    name: { en: "TRANSMISSION", es: "TRANSMISIÓN" },
    kicker: {
      en: "Reach out about internships, roles, or building something together.",
      es: "Escríbeme sobre internships, vacantes o para construir algo juntos.",
    },
  },
};

function ChapterHeader({ id, language }: { id: string; language: Locale }) {
  const ch = CHAPTER_INFO[id];
  if (!ch) return null;
  return (
    <div className="chapter-head">
      <span className="chapter-idx" aria-hidden="true">{ch.idx}</span>
      <div className="chapter-meta">
        <div className="chapter-line-row">
          <span className="chapter-name">{ch.name[language]}</span>
          <span className="chapter-rule" />
          <span className="chapter-tag">CH.{ch.idx}</span>
        </div>
        <p className="chapter-kicker">{ch.kicker[language]}</p>
        <div className="chapter-wave" aria-hidden="true">
          <SignalWave className="chapter-wave-canvas" mode={modeForChapter(id)} />
        </div>
      </div>
    </div>
  );
}

function Hero({ language }: { language: Locale }) {
  const t = copy[language];
  const resumeFile = language === "es" ? "/resume/jp-samano-resume-es.pdf" : "/resume/jp-samano-resume-en.pdf";
  const heroRef = useRef<HTMLElement>(null);
  const readout = [
    { k: language === "es" ? "ESTADO" : "STATUS", v: decode(t.proofOne) },
    { k: language === "es" ? "IDIOMA" : "LANG", v: decode(t.proofTwo) },
    { k: language === "es" ? "ENFOQUE" : "FOCUS", v: decode(t.proofThree) },
    { k: "STACK", v: decode(t.proofFour) },
  ];

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", (((e.clientX - r.left) / r.width - 0.5)).toFixed(3));
    el.style.setProperty("--hy", (((e.clientY - r.top) / r.height - 0.5)).toFixed(3));
  };
  const resetPointer = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--hx", "0");
    el.style.setProperty("--hy", "0");
  };

  return (
    <section id="signal" ref={heroRef} onPointerMove={onPointer} onPointerLeave={resetPointer} className="instr-hero shell">
      <div className="instr-hero-glow" aria-hidden="true" />
      <div className="instr-hero-main">
        <p className="instr-kicker">
          <span className="instr-kicker-dot" />
          {decode(t.eyebrow)}
        </p>
        <h1 className="instr-headline">{t.headline}</h1>
        <p className="instr-sub">{decode(t.subhead)}</p>

        <div className="instr-actions">
          <a href="#work" className="btn btn-accent">{t.primaryCta}</a>
          <a href={resumeFile} target="_blank" rel="noreferrer" className="btn btn-line">{t.resumeCta}</a>
        </div>
      </div>

      <aside className="instr-panel" aria-label="System readout">
        <div className="instr-panel-head">
          <span className="instr-live"><span className="instr-live-dot" />{language === "es" ? "SEÑAL // EN VIVO" : "SIGNAL // LIVE"}</span>
          <span className="instr-panel-id">JP—OS</span>
        </div>
        <div className="instr-wave">
          <SignalWave className="instr-wave-canvas" />
        </div>
        <dl className="instr-readout">
          {readout.map((row) => (
            <div key={row.k}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
        </dl>
      </aside>
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
      <ChapterHeader id="work" language={language} />
      <SystemsScan locale={language} />
      <div className="section-heading-row">
        <SectionTitle eyebrow={t.workEyebrow} title={decode(t.workTitle)} copyText={decode(t.workCopy)} />
        <a href={profile.github} target="_blank" rel="noreferrer" className="button button-soft">{t.githubCta}</a>
      </div>

      <Reveal amount={0.1}>
      <div className="project-grid synchronized-grid">
        {caseStudies.map((project, index) => {
          const title = getLocalizedValue(project.title, language);
          const summary = getLocalizedValue(project.summary, language);
          const tagline = getLocalizedValue(project.tagline, language);
          const role = getLocalizedValue(project.role, language);
          const status = getLocalizedValue(project.statusLabel, language);
          const metrics = project.proofs.slice(0, 3);

          return (
            <TiltCard
              href={`/${language}/projects/${project.slug}`}
              key={project.slug}
              id={`sys-${project.slug}`}
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
            </TiltCard>
          );
        })}
      </div>
      </Reveal>
    </section>
  );
}

function Stack({ language }: { language: Locale }) {
  const t = copy[language];

  return (
    <section id="stack" className="section shell">
      <ChapterHeader id="stack" language={language} />
      <SectionTitle eyebrow={decode(t.stackEyebrow)} title={decode(t.stackTitle)} copyText={decode(t.stackCopy)} />
      <Reveal amount={0.1}>
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
      </Reveal>
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
      <ChapterHeader id="process" language={language} />
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
      <ChapterHeader id="about" language={language} />
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
      <ChapterHeader id="contact" language={language} />
      <div>
        <p className="eyebrow">{decode(t.contactEyebrow)}</p>
        <h2>{decode(t.contactTitle)}</h2>
        <p>{decode(t.contactCopy)}</p>
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
    <main id="main-content" className="portfolio-page instr-page">
      <DocumentLocaleSync locale={language} />
      <SignalBoot locale={language} />
      <div className="instr-grid-bg" aria-hidden="true" />
      <Header locale={language} navItems={dockItems} />
      <SignalHUD locale={language} />
      <Hero language={language} />
      <Work language={language} />
      <Stack language={language} />
      <ResumeSection language={language} />
      <Process language={language} />
      <About language={language} />
      <Contact language={language} />
    </main>
  );
}