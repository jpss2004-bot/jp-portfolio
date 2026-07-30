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
  factStatusValue: "Open to internships and junior technical roles",

  workLabel: "Selected work",
  workHeading: "Three systems, documented end to end.",
  workHeadingLines: ["Three systems,", "documented end to end."],
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
  capabilitiesLede: "Four layers of the same system — this is where I'm useful on a team.",
  howIWork: "How I work",

  profileLabel: "Profile",
  profileHeading: "Software engineering first, cybersecurity as a technical edge.",
  profileHeadingLines: ["Software engineering first,", "cybersecurity as a technical edge."],
  profileBody: [
    "I'm a Computer Science student at Acadia University, working toward roles in software engineering, cybersecurity, and technical product development.",
    "My projects sit where systems, security, and usability meet: APIs, data models, authentication, recommendation logic, dashboards, and deployable web apps. I work in English and Spanish, across Canada and Mexico.",
  ],
  trackRecord: "Track record",
  resumeEn: "Résumé — English (PDF)",
  resumeEs: "Résumé — Spanish (PDF)",

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
  conceptNote: "Concept documentation — no implementation yet.",
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
  factStatusValue: "Abierto a internships y roles técnicos junior",

  workLabel: "Proyectos seleccionados",
  workHeading: "Tres sistemas, documentados de principio a fin.",
  workHeadingLines: ["Tres sistemas, documentados", "de principio a fin."],
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
    "Soy estudiante de Ciencias de la Computación en Acadia University, avanzando hacia roles en ingeniería de software, ciberseguridad y desarrollo técnico de producto.",
    "Mis proyectos conectan sistemas, seguridad y usabilidad: APIs, modelos de datos, autenticación, lógica de recomendación, dashboards y aplicaciones web desplegables. Trabajo en inglés y español, entre Canadá y México.",
  ],
  trackRecord: "Trayectoria",
  resumeEn: "CV — Inglés (PDF)",
  resumeEs: "CV — Español (PDF)",

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
  conceptNote: "Documentación de concepto — todavía sin implementación.",
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
export const capabilityLayers: Record<Locale, { name: string; detail: string; tools: string }[]> = {
  en: [
    {
      name: "Interface",
      detail: "Product surfaces, responsive UI, and interaction design that reflects the real workflow.",
      tools: "React · Next.js · TypeScript · Tailwind CSS",
    },
    {
      name: "Application",
      detail: "Routes, server logic, authentication, validation, and feature implementation.",
      tools: "Python · FastAPI · Flask · REST APIs · JWT",
    },
    {
      name: "Data",
      detail: "Persistence, schemas, seed data, state transitions, and domain modelling.",
      tools: "PostgreSQL · SQLite · SQLAlchemy · Alembic",
    },
    {
      name: "Delivery",
      detail: "Version control, deployment, tests, documentation, and the case study that explains it.",
      tools: "GitHub · Vercel · Render · Pytest",
    },
  ],
  es: [
    {
      name: "Interfaz",
      detail: "Superficies de producto, UI responsiva y diseño de interacción que refleja el flujo real.",
      tools: "React · Next.js · TypeScript · Tailwind CSS",
    },
    {
      name: "Aplicación",
      detail: "Rutas, lógica de servidor, autenticación, validación e implementación de funciones.",
      tools: "Python · FastAPI · Flask · REST APIs · JWT",
    },
    {
      name: "Datos",
      detail: "Persistencia, esquemas, datos semilla, transiciones de estado y modelado de dominio.",
      tools: "PostgreSQL · SQLite · SQLAlchemy · Alembic",
    },
    {
      name: "Entrega",
      detail: "Control de versiones, despliegue, pruebas, documentación y el caso de estudio que lo explica.",
      tools: "GitHub · Vercel · Render · Pytest",
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
      detail: "Code, screenshots, architecture, and honest limits — something concrete to inspect.",
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
      title: "CheckWise for LegalShelf",
      detail: "Building a REPSE-compliance SaaS: FastAPI backend, Next.js frontend, AI-assisted reports centre.",
    },
    {
      label: "2026",
      title: "SAVR and deployed web apps",
      detail: "Context-aware recommendation systems and practical web apps taken from concept to implementation.",
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
      title: "CheckWise para LegalShelf",
      detail: "SaaS de cumplimiento REPSE: backend en FastAPI, frontend en Next.js y centro de reportes con IA.",
    },
    {
      label: "2026",
      title: "SAVR y aplicaciones web desplegadas",
      detail: "Sistemas de recomendación contextuales y apps web prácticas llevadas de concepto a implementación.",
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
