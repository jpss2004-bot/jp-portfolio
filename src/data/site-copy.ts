import type { Locale } from "./i18n";

/**
 * All user-facing UI copy, in both locales. Written as plain UTF-8 — the
 * previous version stored `\u` escapes and ran them through JSON.parse at
 * render time, which made the Spanish copy unreadable in source.
 */

type Copy = {
  nav: { work: string; capabilities: string; profile: string; contact: string };
  skipToContent: string;
  resume: string;
  resumePdf: string;
  mainNav: string;
  menu: string;
  close: string;
  wordmarkRole: string;

  heroLabel: string;
  heroHeadline: string;
  heroHeadlineLines: string[];
  heroNameLines: string[];
  heroSub: string;
  heroCtaWork: string;
  heroCtaResume: string;
  factBased: string;
  factBasedValue: string;
  factFocus: string;
  factFocusValue: string;
  factStatus: string;
  factStatusValue: string;

  workLabel: string;
  workHeading: string;
  workHeadingLines: string[];
  workLede: string;
  workRole: string;
  workStack: string;
  workProof: string;
  readCase: string;
  alsoBuilt: string;
  viewGithub: string;

  capabilitiesLabel: string;
  capabilitiesHeading: string;
  capabilitiesHeadingLines: string[];
  capabilitiesLede: string;
  howIWork: string;

  profileLabel: string;
  profileHeading: string;
  profileHeadingLines: string[];
  profileBody: string[];
  trackRecord: string;
  resumeEn: string;
  resumeEs: string;

  contactLabel: string;
  contactHeading: string;
  contactHeadingLines: string[];
  contactLede: string;
  footerRights: string;

  // Case study page
  caseStudyLabel: string;
  backToWork: string;
  caseRole: string;
  caseYear: string;
  caseStatus: string;
  caseType: string;
  problem: string;
  problemHeading: string;
  approach: string;
  approachHeading: string;
  architecture: string;
  architectureHeading: string;
  decisions: string;
  decisionsHeading: string;
  tradeoff: string;
  outcome: string;
  evidence: string;
  evidenceHeading: string;
  results: string;
  resultsHeading: string;
  nextSteps: string;
  nextStepsHeading: string;
  stack: string;
  liveApp: string;
  sourceCode: string;
  getInTouch: string;
  prevCase: string;
  nextCase: string;
  conceptNote: string;
  noInterfaceYet: string;

  notFoundLabel: string;
  notFoundHeading: string;
  notFoundBody: string;
  notFoundHome: string;
  notFoundWork: string;
};

const en: Copy = {
  nav: { work: "Work", capabilities: "Capabilities", profile: "Profile", contact: "Contact" },
  skipToContent: "Skip to content",
  resume: "Résumé",
  resumePdf: "Résumé (PDF)",
  mainNav: "Main navigation",
  menu: "Menu",
  close: "Close",
  wordmarkRole: "Software · Security · Product",

  heroLabel: "Software engineering · Cybersecurity · Product",
  heroHeadline: "I build systems that turn messy workflows into clear, reliable tools.",
  heroHeadlineLines: ["I build systems that turn", "messy workflows into", "clear, reliable tools."],
  heroNameLines: ["Jose Pablo", "Samano Suarez"],
  heroSub:
    "Computer Science at Acadia University. I ship full-stack products and workflow tools, then document the decisions behind them.",
  heroCtaWork: "See selected work",
  heroCtaResume: "Résumé (PDF)",
  factBased: "Based",
  factBasedValue: "Nova Scotia, Canada · Mexico City",
  factFocus: "Focus",
  factFocusValue: "Full-stack · Cybersecurity · Product",
  factStatus: "Status",
  factStatusValue: "Internships now, full-time from May 2027",

  workLabel: "Selected work",
  workHeading: "Four systems, documented end to end.",
  workHeadingLines: ["Four systems,", "documented end to end."],
  workLede:
    "Each one started with a real problem, uses a stack I chose deliberately, and comes with evidence you can inspect.",
  workRole: "Role",
  workStack: "Stack",
  workProof: "Proof",
  readCase: "Read the case study",
  alsoBuilt: "Also built",
  viewGithub: "GitHub",

  capabilitiesLabel: "Capabilities",
  capabilitiesHeading: "What I work across.",
  capabilitiesHeadingLines: ["What I work across."],
  capabilitiesLede: "Four layers of the same system: this is where I'm useful on a team.",
  howIWork: "How I work",

  profileLabel: "Profile",
  profileHeading: "Software engineering first, cybersecurity as a technical edge.",
  profileHeadingLines: ["Software engineering first,", "cybersecurity as a technical edge."],
  profileBody: [
    "Computer Science at Acadia University, working toward software engineering, cybersecurity, and technical product roles. My projects sit where systems, security, and usability meet: APIs, data models, auth, recommendation logic, dashboards. I work in English and Spanish, across Canada and Mexico.",
  ],
  trackRecord: "Track record",
  resumeEn: "Résumé: English (PDF)",
  resumeEs: "Résumé: Spanish (PDF)",

  contactLabel: "Contact",
  contactHeading: "Open to internships, junior technical roles, and project collaborations.",
  contactHeadingLines: ["Open to internships and", "junior technical roles."],
  contactLede: "Email is the fastest way to reach me.",
  footerRights: "Built and maintained by JP Samano.",

  caseStudyLabel: "Case study",
  backToWork: "Back to work",
  caseRole: "Role",
  caseYear: "Year",
  caseStatus: "Status",
  caseType: "Type",
  problem: "Problem",
  problemHeading: "What this project solves",
  approach: "Approach",
  approachHeading: "How I built it",
  architecture: "Architecture",
  architectureHeading: "System structure",
  decisions: "Decisions",
  decisionsHeading: "Tradeoffs I made",
  tradeoff: "Tradeoff",
  outcome: "Outcome",
  evidence: "Evidence",
  evidenceHeading: "What it looks like",
  results: "Results",
  resultsHeading: "What came out of it",
  nextSteps: "Roadmap",
  nextStepsHeading: "Next iteration",
  stack: "Stack",
  liveApp: "Open live app",
  sourceCode: "Source on GitHub",
  getInTouch: "Ask for a walkthrough",
  prevCase: "Previous",
  nextCase: "Next",
  conceptNote: "Concept documentation: no implementation yet.",
  noInterfaceYet:
    "This project is a documented systems-design study. There is no built interface to show, so nothing here is presented as a screenshot.",

  notFoundLabel: "404",
  notFoundHeading: "This page doesn't exist.",
  notFoundBody: "The link may be out of date, or the page may have moved.",
  notFoundHome: "Go to the homepage",
  notFoundWork: "See selected work",
};

const es: Copy = {
  nav: { work: "Proyectos", capabilities: "Capacidades", profile: "Perfil", contact: "Contacto" },
  skipToContent: "Saltar al contenido",
  resume: "CV",
  resumePdf: "CV (PDF)",
  mainNav: "Navegación principal",
  menu: "Menú",
  close: "Cerrar",
  wordmarkRole: "Software · Seguridad · Producto",

  heroLabel: "Ingeniería de software · Ciberseguridad · Producto",
  heroHeadline: "Construyo sistemas que convierten flujos de trabajo confusos en herramientas claras y confiables.",
  heroHeadlineLines: ["Construyo sistemas que", "convierten flujos confusos", "en herramientas confiables."],
  heroNameLines: ["Jose Pablo", "Samano Suarez"],
  heroSub:
    "Ciencias de la Computación en Acadia University. Desarrollo productos full-stack y herramientas de flujo de trabajo, y documento las decisiones detrás de cada uno.",
  heroCtaWork: "Ver proyectos",
  heroCtaResume: "CV (PDF)",
  factBased: "Ubicación",
  factBasedValue: "Nueva Escocia, Canadá · Ciudad de México",
  factFocus: "Enfoque",
  factFocusValue: "Full-stack · Ciberseguridad · Producto",
  factStatus: "Disponibilidad",
  factStatusValue: "Prácticas ahora, tiempo completo desde mayo 2027",

  workLabel: "Proyectos seleccionados",
  workHeading: "Cuatro sistemas, documentados de principio a fin.",
  workHeadingLines: ["Cuatro sistemas, documentados", "de principio a fin."],
  workLede:
    "Cada uno partió de un problema real, usa un stack elegido a propósito y viene con evidencia que puedes revisar.",
  workRole: "Rol",
  workStack: "Stack",
  workProof: "Evidencia",
  readCase: "Leer el caso completo",
  alsoBuilt: "También construí",
  viewGithub: "GitHub",

  capabilitiesLabel: "Capacidades",
  capabilitiesHeading: "En qué trabajo.",
  capabilitiesHeadingLines: ["En qué trabajo."],
  capabilitiesLede: "Cuatro capas del mismo sistema: aquí es donde aporto en un equipo.",
  howIWork: "Cómo trabajo",

  profileLabel: "Perfil",
  profileHeading: "Ingeniería de software primero, ciberseguridad como ventaja técnica.",
  profileHeadingLines: ["Ingeniería de software primero,", "ciberseguridad como ventaja técnica."],
  profileBody: [
    "Ciencias de la Computación en Acadia University, avanzando hacia roles en ingeniería de software, ciberseguridad y producto técnico. Mis proyectos conectan sistemas, seguridad y usabilidad: APIs, modelos de datos, autenticación, lógica de recomendación, dashboards. Trabajo en inglés y español, entre Canadá y México.",
  ],
  trackRecord: "Trayectoria",
  resumeEn: "CV: Inglés (PDF)",
  resumeEs: "CV: Español (PDF)",

  contactLabel: "Contacto",
  contactHeading: "Abierto a internships, roles técnicos junior y colaboraciones de proyecto.",
  contactHeadingLines: ["Abierto a internships y", "roles técnicos junior."],
  contactLede: "El correo es la forma más rápida de contactarme.",
  footerRights: "Construido y mantenido por JP Samano.",

  caseStudyLabel: "Caso de estudio",
  backToWork: "Volver a proyectos",
  caseRole: "Rol",
  caseYear: "Año",
  caseStatus: "Estado",
  caseType: "Tipo",
  problem: "Problema",
  problemHeading: "Qué resuelve este proyecto",
  approach: "Enfoque",
  approachHeading: "Cómo lo construí",
  architecture: "Arquitectura",
  architectureHeading: "Estructura del sistema",
  decisions: "Decisiones",
  decisionsHeading: "Tradeoffs que tomé",
  tradeoff: "Tradeoff",
  outcome: "Resultado",
  evidence: "Evidencia",
  evidenceHeading: "Cómo se ve",
  results: "Resultados",
  resultsHeading: "Qué salió de esto",
  nextSteps: "Roadmap",
  nextStepsHeading: "Siguiente iteración",
  stack: "Stack",
  liveApp: "Abrir app en vivo",
  sourceCode: "Código en GitHub",
  getInTouch: "Pedir un walkthrough",
  prevCase: "Anterior",
  nextCase: "Siguiente",
  conceptNote: "Documentación de concepto: todavía sin implementación.",
  noInterfaceYet:
    "Este proyecto es un estudio documentado de diseño de sistemas. No hay una interfaz construida que mostrar, así que nada aquí se presenta como captura de pantalla.",

  notFoundLabel: "404",
  notFoundHeading: "Esta página no existe.",
  notFoundBody: "El enlace puede estar desactualizado o la página pudo haber cambiado de lugar.",
  notFoundHome: "Ir al inicio",
  notFoundWork: "Ver proyectos",
};

const copy: Record<Locale, Copy> = { en, es };

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}

export function resumeHref(locale: Locale) {
  return locale === "es" ? "/resume/jp-samano-resume-es.pdf" : "/resume/jp-samano-resume-en.pdf";
}

/** Capability layers — replaces the four tag-stuffed "stack cards". */
export const capabilityLayers: Record<
  Locale,
  { name: string; glyph: string; detail: string; marks: { slug: string; label: string }[] }[]
> = {
  en: [
    {
      name: "Interface",
      glyph: "interface",
      detail: "Product surfaces, responsive UI, and interaction design that reflects the real workflow.",
      marks: [{ slug: "react", label: "React" }, { slug: "nextdotjs", label: "Next.js" }, { slug: "typescript", label: "TypeScript" }, { slug: "tailwindcss", label: "Tailwind CSS" }],
    },
    {
      name: "Application",
      glyph: "application",
      detail: "Routes, server logic, authentication, validation, and feature implementation.",
      marks: [{ slug: "python", label: "Python" }, { slug: "fastapi", label: "FastAPI" }, { slug: "flask", label: "Flask" }],
    },
    {
      name: "Data",
      glyph: "data",
      detail: "Persistence, schemas, seed data, state transitions, and domain modelling.",
      marks: [{ slug: "postgresql", label: "PostgreSQL" }, { slug: "sqlite", label: "SQLite" }, { slug: "sqlalchemy", label: "SQLAlchemy" }],
    },
    {
      name: "Delivery",
      glyph: "delivery",
      detail: "Version control, deployment, tests, documentation, and the case study that explains it.",
      marks: [{ slug: "github", label: "GitHub" }, { slug: "vercel", label: "Vercel" }, { slug: "render", label: "Render" }],
    },
  ],
  es: [
    {
      name: "Interfaz",
      glyph: "interface",
      detail: "Superficies de producto, UI responsiva y diseño de interacción que refleja el flujo real.",
      marks: [{ slug: "react", label: "React" }, { slug: "nextdotjs", label: "Next.js" }, { slug: "typescript", label: "TypeScript" }, { slug: "tailwindcss", label: "Tailwind CSS" }],
    },
    {
      name: "Aplicación",
      glyph: "application",
      detail: "Rutas, lógica de servidor, autenticación, validación e implementación de funciones.",
      marks: [{ slug: "python", label: "Python" }, { slug: "fastapi", label: "FastAPI" }, { slug: "flask", label: "Flask" }],
    },
    {
      name: "Datos",
      glyph: "data",
      detail: "Persistencia, esquemas, datos semilla, transiciones de estado y modelado de dominio.",
      marks: [{ slug: "postgresql", label: "PostgreSQL" }, { slug: "sqlite", label: "SQLite" }, { slug: "sqlalchemy", label: "SQLAlchemy" }],
    },
    {
      name: "Entrega",
      glyph: "delivery",
      detail: "Control de versiones, despliegue, pruebas, documentación y el caso de estudio que lo explica.",
      marks: [{ slug: "github", label: "GitHub" }, { slug: "vercel", label: "Vercel" }, { slug: "render", label: "Render" }],
    },
  ],
};

/** How I work — four principles, one line each. */
export const principles: Record<Locale, { title: string; detail: string }[]> = {
  en: [
    {
      title: "Build real systems, not demos.",
      detail: "Problem framing, architecture, implementation, proof, then the next iteration.",
    },
    {
      title: "Make technical decisions explainable.",
      detail: "Every project documents the tradeoff I took and what it cost me.",
    },
    {
      title: "Design the workflow before the screen.",
      detail: "The interface should reflect the real process and system state behind it.",
    },
    {
      title: "Show the evidence.",
      detail: "Code, screenshots, architecture, and honest limits: something concrete to inspect.",
    },
  ],
  es: [
    {
      title: "Construir sistemas reales, no demos.",
      detail: "Definir el problema, la arquitectura, la implementación, la evidencia y la siguiente iteración.",
    },
    {
      title: "Hacer explicables las decisiones técnicas.",
      detail: "Cada proyecto documenta el tradeoff que tomé y lo que costó.",
    },
    {
      title: "Diseñar el flujo antes que la pantalla.",
      detail: "La interfaz debe reflejar el proceso real y el estado del sistema detrás.",
    },
    {
      title: "Mostrar la evidencia.",
      detail: "Código, capturas, arquitectura y límites honestos: algo concreto que revisar.",
    },
  ],
};

/** Track record — dated, factual. */
export const trackRecord: Record<Locale, { label: string; title: string; detail: string }[]> = {
  en: [
    {
      label: "Now",
      title: "CheckWise in production for LegalShelf",
      detail: "REPSE-compliance SaaS in daily use: 3 client companies, 15+ vendors, close to 20,000 documents processed.",
    },
    {
      label: "2026",
      title: "Data pipelines and SAVR shipped",
      detail: "Database cleanup and metadata-extraction pipelines, plus taking SAVR from prototype to a deployed app.",
    },
    {
      label: "2025",
      title: "Workflow systems and security",
      detail: "Triage workflows, adaptive-traffic research, and cybersecurity reporting concepts.",
    },
    {
      label: "Foundation",
      title: "Computer Science, Acadia University",
      detail: "Software engineering, data structures, discrete math, systems, cybersecurity, and HCI.",
    },
  ],
  es: [
    {
      label: "Ahora",
      title: "CheckWise en producción para LegalShelf",
      detail: "SaaS de cumplimiento REPSE en uso diario: 3 empresas cliente, 15+ proveedores y cerca de 20,000 documentos procesados.",
    },
    {
      label: "2026",
      title: "Pipelines de datos y SAVR desplegado",
      detail: "Limpieza de bases de datos y pipelines de extracción de metadatos, más llevar SAVR de prototipo a app desplegada.",
    },
    {
      label: "2025",
      title: "Sistemas de flujo de trabajo y seguridad",
      detail: "Flujos de triage, investigación de tráfico adaptativo y conceptos de reportes de ciberseguridad.",
    },
    {
      label: "Base",
      title: "Ciencias de la Computación, Acadia University",
      detail: "Ingeniería de software, estructuras de datos, matemáticas discretas, sistemas, ciberseguridad e IHC.",
    },
  ],
};

/**
 * The four figures worth leading with. Every one is taken from documented
 * project facts — nothing here is rounded up or invented.
 */
export const stats: Record<Locale, { figure: string; detail: string }[]> = {
  en: [
    { figure: "~20,000", detail: "compliance documents processed through CheckWise in production." },
    { figure: "3 clients", detail: "real companies on the platform, with 15+ vendors onboarded." },
    { figure: "3 live apps", detail: "CheckWise, SAVR, and Family Phrase Game, all deployed and openable." },
    { figure: "EN / ES", detail: "designed, built, and documented in both languages, across Canada and Mexico." },
  ],
  es: [
    { figure: "~20,000", detail: "documentos de cumplimiento procesados en CheckWise en producción." },
    { figure: "3 clientes", detail: "empresas reales en la plataforma, con 15+ proveedores dados de alta." },
    { figure: "3 apps en vivo", detail: "CheckWise, SAVR y Family Phrase Game, desplegadas y abiertas al público." },
    { figure: "EN / ES", detail: "diseñado, construido y documentado en ambos idiomas, entre Canadá y México." },
  ],
};

/** The single strongest figure per featured project, for the work rows. */
export const caseFigure: Record<string, Record<Locale, { figure: string; detail: string }>> = {
  checkwise: {
    en: {
      figure: "~20,000 documents",
      detail: "processed in production for 3 client companies, with 15+ vendors onboarded.",
    },
    es: {
      figure: "~20,000 documentos",
      detail: "procesados en producción para 3 empresas cliente, con 15+ proveedores dados de alta.",
    },
  },
  savr: {
    en: {
      figure: "Deployed",
      detail: "Three input modes, and every recommendation states why that venue fits the night you described.",
    },
    es: {
      figure: "Desplegado",
      detail: "Tres modos de entrada, y cada recomendación explica por qué ese lugar encaja con tu noche.",
    },
  },
  verifaid: {
    en: {
      figure: "In production",
      detail: "Document verification running for LegalShelf, the second system I have shipped for that client.",
    },
    es: {
      figure: "En producción",
      detail: "Verificación de documentos en marcha para LegalShelf, el segundo sistema que he entregado a ese cliente.",
    },
  },
  "er-triage-queue-manager": {
    en: {
      figure: "ESI v4",
      detail: "The real emergency-department acuity standard, with the clinical reasoning shown for every level.",
    },
    es: {
      figure: "ESI v4",
      detail: "El estándar real de agudeza en urgencias, mostrando el razonamiento clínico de cada nivel.",
    },
  },
};
