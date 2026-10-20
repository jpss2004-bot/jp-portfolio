import type { Locale } from "./i18n";

const en = {
  skip: "Skip to content",
  nav: { work: "Work", build: "How I build", summer: "Summer 2026", about: "About" },
  resume: "Résumé",
  identity:
    "Software developer at LegalShelf and Research Assistant at Acadia’s AIoT Research Hub. Studying Computer Science at Acadia University, graduating in 2027.",
  availability: "Open to internships and co-op now, full-time from May 2027. Canadian study permit, co-op eligible. Nova Scotia and Mexico City.",
  links: { resume: "Résumé (PDF)", email: "Email", linkedin: "LinkedIn", github: "GitHub" },
  work: {
    heading: "Selected work",
    lede: "Production software, a working AI pilot, and the engineering decisions behind them.",
    readCase: "Read the case study",
    private: "Private codebase, walkthrough on request",
  },
  build: {
    heading: "How I build",
    lede: "I own the system from the data model to the interface: define the workflow, choose the boundaries, test failure paths, and review what ships. AI agents help me implement; architecture, constraints and release decisions stay with me.",
    figures:
      "Summer 2026 snapshot: 98% of CheckWise commits were co-authored with Claude, with more than 7,800 automated tests and four self-hosted CI runners. Details and dates are in the summer report.",
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
      "At LegalShelf I lead development of CheckWise and Verifaid, build document pipelines, and work on the platform’s next AI capabilities. At Acadia’s AIoT Research Hub I lead frontend, UX and visual design. Neyvu is my independent course-aware AI product, now onboarding pilot users.",
      "At Trinity College School, my high school, I captained the football team for two years, earned back-to-back Lineman of the Year awards and received the Leadership Award in my final year.",
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
    "Desarrollador de software en LegalShelf y asistente de investigación en el AIoT Research Hub de Acadia. Estudio Ciencias de la Computación en Acadia University y me gradúo en 2027.",
  availability: "Disponible para prácticas y co-op desde ahora, tiempo completo desde mayo de 2027. Permiso de estudio canadiense con elegibilidad para co-op. Nueva Escocia y Ciudad de México.",
  links: { resume: "CV (PDF)", email: "Correo", linkedin: "LinkedIn", github: "GitHub" },
  work: {
    heading: "Trabajo seleccionado",
    lede: "Software en producción, un piloto funcional de IA y las decisiones de ingeniería detrás de cada uno.",
    readCase: "Leer el caso",
    private: "Código privado, lo muestro en una llamada",
  },
  build: {
    heading: "Cómo construyo",
    lede: "Me hago cargo del sistema, desde el modelo de datos hasta la interfaz: defino el flujo, elijo los límites, pruebo las fallas y reviso lo que se publica. Los agentes de IA me ayudan a implementar; la arquitectura, las restricciones y las decisiones de liberación son mías.",
    figures:
      "Corte del verano de 2026: el 98% de los commits de CheckWise fue en coautoría con Claude, con más de 7,800 pruebas automatizadas y cuatro runners de CI propios. El reporte del verano incluye detalles y fechas.",
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
      "En LegalShelf dirijo el desarrollo de CheckWise y Verifaid, construyo pipelines documentales y trabajo en las siguientes capacidades de IA de la plataforma. En el AIoT Research Hub de Acadia lidero frontend, UX y diseño visual. Neyvu es mi producto independiente de IA para cursos, ahora incorporando usuarios al piloto.",
      "En Trinity College School, donde cursé la preparatoria, fui capitán de fútbol americano durante dos años, recibí el premio Lineman of the Year en años consecutivos y el Leadership Award en mi último año.",
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
