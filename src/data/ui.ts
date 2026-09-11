import type { Locale } from "./i18n";

const en = {
  skip: "Skip to content",
  nav: { work: "Work", build: "How I build", summer: "Summer 2026", about: "About" },
  resume: "Résumé",
  identity:
    "Computer Science at Acadia University, graduating 2027. Software developer at LegalShelf, where I lead development of CheckWise, a compliance platform used by seven companies in Mexico.",
  availability: "Open to internships and co-op now, full-time from May 2027. Canadian study permit, co-op eligible. Nova Scotia and Mexico City.",
  links: { resume: "Résumé (PDF)", email: "Email", linkedin: "LinkedIn", github: "GitHub" },
  work: {
    heading: "Selected work",
    lede: "Four systems from summer 2026, each with the problem, the decisions and the evidence.",
    readCase: "Read the case study",
    private: "Private codebase, walkthrough on request",
  },
  build: {
    heading: "How I build",
    lede: "Most of my 2026 code was written by AI agents under my direction. I treat that as an engineering discipline: I design the system around the agents, and the system decides what reaches production.",
    figures:
      "On CheckWise, 98% of commits were co-authored with Claude and checked by more than 7,800 automated tests on four self-hosted CI runners.",
  },
  summer: {
    heading: "Summer 2026",
    lede: "Eighteen weeks, eighteen projects. Each bar is one week of commits across every repository.",
    chartLabel: "Commits per week, 11 May to 11 September 2026",
    report: "Read the full summer report",
  },
  shipped: { heading: "Also shipped", open: "Open", caseStudy: "Case study" },
  about: {
    heading: "About",
    body: [
      "I grew up in Mexico City and study Computer Science at Acadia University in Nova Scotia. I like problems where software has to be exactly right: compliance, legal documents, clinical queues.",
      "Since May 2026 I have worked as a software developer at LegalShelf, a legal-tech company in Mexico City. I lead development of CheckWise and Verifaid and built the document pipelines and internal tools around them.",
    ],
    facts: [
      { label: "Education", value: "B.Sc. Computer Science, Acadia University, 2027" },
      { label: "Languages", value: "Spanish (native), English (C2), French (A2)" },
      { label: "Based in", value: "Wolfville, Nova Scotia · Mexico City" },
      { label: "Work authorization", value: "Canadian study permit, co-op eligible · Mexican citizen" },
      { label: "Availability", value: "Internships and co-op now · full-time from May 2027" },
    ],
  },
  contact: {
    heading: "Contact",
    body: "The fastest way to reach me is email. I'm happy to walk through any of this work, including the private codebases.",
  },
  footer: "Built with Next.js. Figures are dated; engineering figures come from git history.",
  status: "Status",
  period: "Period",
  role: "Role",
  stackLabel: "Stack",
  case: {
    back: "All work",
    problem: "Problem",
    constraints: "Constraints",
    decisions: "Decisions",
    built: "How it was built",
    outcome: "Outcome",
    evidence: "Evidence",
    gallery: "Screens",
    next: "Next",
    links: "Links",
    prev: "Previous",
    nextCase: "Next",
    asOf: "Figures",
  },
  notFound: { heading: "This page doesn't exist.", body: "The link may be old. Everything is on the home page.", home: "Go to the home page" },
  diagram: {
    verifaid: ["Preserve original", "Transcribe", "Identify", "Compare", "Extract powers", "Read caps", "Conclude"],
    verifaidNote: "Every datum cites document, version, page and excerpt. A person approves.",
    pipelines: ["Reconcile", "Plan", "Copy", "Read", "Extract", "Verify", "Deliver"],
    pipelinesNote: "Text when legible, Claude vision when scanned, all through the Batch API. Copy-only, hash-verified.",
  },
};

type Dict = typeof en;

const es: Dict = {
  skip: "Ir al contenido",
  nav: { work: "Trabajo", build: "Cómo construyo", summer: "Verano 2026", about: "Sobre mí" },
  resume: "CV",
  identity:
    "Ciencias de la Computación en Acadia University, generación 2027. Desarrollador de software en LegalShelf, donde dirijo el desarrollo de CheckWise, una plataforma de cumplimiento que usan siete empresas en México.",
  availability: "Disponible para prácticas y co-op desde ahora, tiempo completo desde mayo de 2027. Permiso de estudio canadiense con elegibilidad para co-op. Nueva Escocia y Ciudad de México.",
  links: { resume: "CV (PDF)", email: "Correo", linkedin: "LinkedIn", github: "GitHub" },
  work: {
    heading: "Trabajo seleccionado",
    lede: "Cuatro sistemas del verano de 2026, cada uno con el problema, las decisiones y la evidencia.",
    readCase: "Leer el caso",
    private: "Código privado, lo muestro en una llamada",
  },
  build: {
    heading: "Cómo construyo",
    lede: "La mayor parte de mi código de 2026 la escribieron agentes de IA bajo mi dirección. Lo trato como una disciplina de ingeniería: diseño el sistema alrededor de los agentes, y el sistema decide qué llega a producción.",
    figures:
      "En CheckWise, el 98% de los commits fue en coautoría con Claude y pasó por más de 7,800 pruebas automatizadas en cuatro runners de CI propios.",
  },
  summer: {
    heading: "Verano 2026",
    lede: "Dieciocho semanas, dieciocho proyectos. Cada barra es una semana de commits en todos los repositorios.",
    chartLabel: "Commits por semana, del 11 de mayo al 11 de septiembre de 2026",
    report: "Leer el reporte completo del verano",
  },
  shipped: { heading: "También entregué", open: "Abrir", caseStudy: "Caso" },
  about: {
    heading: "Sobre mí",
    body: [
      "Crecí en la Ciudad de México y estudio Ciencias de la Computación en Acadia University, en Nueva Escocia. Me gustan los problemas donde el software tiene que ser exacto: cumplimiento, documentos legales, filas clínicas.",
      "Desde mayo de 2026 trabajo como desarrollador de software en LegalShelf, una empresa legal-tech de la Ciudad de México. Dirijo el desarrollo de CheckWise y Verifaid y construí los pipelines de documentos y las herramientas internas a su alrededor.",
    ],
    facts: [
      { label: "Estudios", value: "Licenciatura en Ciencias de la Computación, Acadia University, 2027" },
      { label: "Idiomas", value: "Español (nativo), inglés (C2), francés (A2)" },
      { label: "Ubicación", value: "Wolfville, Nueva Escocia · Ciudad de México" },
      { label: "Permiso de trabajo", value: "Permiso de estudio canadiense con elegibilidad para co-op · ciudadano mexicano" },
      { label: "Disponibilidad", value: "Prácticas y co-op desde ahora · tiempo completo desde mayo de 2027" },
    ],
  },
  contact: {
    heading: "Contacto",
    body: "La forma más rápida de contactarme es por correo. Con gusto explico cualquiera de estos proyectos, incluidos los de código privado.",
  },
  footer: "Hecho con Next.js. Las cifras están fechadas; las de ingeniería salen del historial de git.",
  status: "Estado",
  period: "Periodo",
  role: "Rol",
  stackLabel: "Tecnologías",
  case: {
    back: "Todo el trabajo",
    problem: "Problema",
    constraints: "Restricciones",
    decisions: "Decisiones",
    built: "Cómo se construyó",
    outcome: "Resultado",
    evidence: "Evidencia",
    gallery: "Pantallas",
    next: "Siguiente",
    links: "Enlaces",
    prev: "Anterior",
    nextCase: "Siguiente",
    asOf: "Cifras",
  },
  notFound: { heading: "Esta página no existe.", body: "Puede que el enlace sea antiguo. Todo está en la página de inicio.", home: "Ir al inicio" },
  diagram: {
    verifaid: ["Preservar original", "Transcribir", "Identificar", "Comparar", "Extraer facultades", "Leer límites", "Concluir"],
    verifaidNote: "Cada dato cita documento, versión, página y fragmento. Una persona aprueba.",
    pipelines: ["Conciliar", "Planear", "Copiar", "Leer", "Extraer", "Verificar", "Entregar"],
    pipelinesNote: "Texto si es legible, Claude visión si es escaneo, todo por la Batch API. Solo copia, verificado por hash.",
  },
};

export const ui: Record<Locale, Dict> = { en, es };
export type UI = Dict;
