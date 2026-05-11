import { projects as legacyProjects, type Project } from "./portfolio";
import type { Locale, Localized } from "./i18n";

export type { Localized } from "./i18n";

export type ProjectLinkKind = "case-study" | "live" | "repo" | "video";
export type CaseStudyStatus = "live" | "prototype" | "research" | "coursework";

export type ProjectLink = {
  label: Localized<string>;
  href: string;
  kind: ProjectLinkKind;
};

export type ProofMetric = {
  label: Localized<string>;
  value: string;
  note?: Localized<string>;
};

export type Decision = {
  title: Localized<string>;
  tradeoff: Localized<string>;
  outcome: Localized<string>;
};

export type GalleryItem = {
  src: string;
  alt: Localized<string>;
  caption?: Localized<string>;
};

export type ProjectCaseStudy = {
  slug: string;
  featured: boolean;
  status: CaseStudyStatus;
  statusLabel: Localized<string>;
  year: string;
  title: Localized<string>;
  tagline: Localized<string>;
  role: Localized<string>;
  summary: Localized<string>;
  heroImage: string;
  tech: string[];
  proofs: ProofMetric[];
  links: ProjectLink[];
  challenge: Localized<string>;
  approach: Localized<string>;
  architecture: Localized<string[]>;
  decisions: Decision[];
  results: Localized<string[]>;
  nextSteps: Localized<string[]>;
  gallery: GalleryItem[];
  resumeBullet: Localized<string>;
};

type SpanishProjectCopy = {
  title: string;
  tagline: string;
  role: string;
  summary: string;
  challenge: string;
  approach: string;
  architecture: string[];
  results: string[];
  nextSteps: string[];
  resumeBullet: string;
};

function localized<T>(en: T, es: T): Localized<T> {
  return { en, es };
}

const spanishBySlug: Record<string, SpanishProjectCopy> = {
  savr: {
    title: "SAVR - Plataforma de Recomendaciones Contextuales",
    tagline: "Prototipo de flujo de trabajo para visibilidad de filas, estado de pacientes y priorizaci\\u00f3n de triage.",
    role: "Dirección de producto, API backend, flujos frontend, modelo de datos y logica de recomendacion",
    summary:
      "Prototipo de flujo de trabajo para visibilidad de filas en urgencias, seguimiento del estado de pacientes y priorizaci\\u00f3n de triage mediante formularios estructurados, persistencia local y vistas tipo dashboard.",
    challenge:
      "La busqueda de restaurantes suele ser generica. Normalmente filtra por ubicacion o cocina, pero ignora con quien vas, que ambiente quieres y que restricciones importan.",
    approach:
      "SAVR trata la decision como un problema de recomendacion contextual. El usuario puede describir su noche, construirla con opciones guiadas o usar un modo sorpresa con resultados explicables.",
    architecture: [
      "La interfaz maneja onboarding, entradas de recomendacion y presentacion de resultados.",
      "La API separa autenticacion, restaurantes, experiencias y rutas de recomendacion.",
      "El modelo de datos soporta preferencias, metadatos de restaurantes, ambiente y futuras señales de eventos.",
      "La capa de recomendacion conecta contexto del usuario con atributos del lugar y explica por que encaja.",
    ],
    results: [
      "Proyecto flagship porque combina producto, full-stack, logica de recomendacion, onboarding y experiencia de usuario.",
      "Estructura backend con FastAPI.",
      "Arquitectura frontend con React y TypeScript.",
      "Dirección de autenticacion, onboarding y flujos de recomendacion.",
      "Modos Describe, Build y Surprise como rutas de decision.",
    ],
    nextSteps: [
      "Agregar capturas reales de la app actual.",
      "Agregar demo desplegada cuando sea estable.",
      "Agregar explicaciones por platillo y ranking por eventos.",
    ],
    resumeBullet: "SAVR: recomendaciones contextuales para restaurantes con flujos explicables.",
  },
  "er-triage-queue-manager": {
    title: "ER Triage & Queue Manager",
    tagline: "Aplicaci\\u00f3n Flask desplegada que convierte frases familiares en un juego grupal.",
    role: "Diseño de sistema, implementacion en Python, modelo de datos y logica de flujo",
    summary:
      "Aplicaci\\u00f3n web desplegada con Flask que convierte frases familiares y chistes internos en un juego grupal con puntuaci\\u00f3n, carga de frases e interfaz simple en vivo.",
    challenge:
      "Los flujos de emergencias dependen de visibilidad compartida. Intake, signos vitales, prioridad, cuarto y tratamiento se fragmentan si no viven en un solo sistema.",
    approach:
      "El prototipo centraliza registro, signos vitales, scoring de prioridad, monitoreo de cola, paginas de paciente e historial de estado.",
    architecture: [
      "NiceGUI organiza vistas para intake, triage de enfermeria, cola y administracion.",
      "SQLite guarda pacientes, signos vitales, prioridad, cuarto e historial.",
      "La logica de prioridad conecta sintomas y signos vitales con posicion en la cola.",
      "Los dashboards muestran el estado del paciente para una demo clara.",
    ],
    results: [
      "Muestra modelado de flujos, estructura de interfaz, persistencia y conversion de un problema operativo en software.",
      "Estructura de aplicación Python.",
      "Modelo de base de datos SQLite.",
      "Estado de paciente e historial.",
      "Dashboard de cola y pantallas por rol.",
    ],
    nextSteps: [
      "Agregar capturas de cada flujo principal.",
      "Documentar claramente el algoritmo de scoring.",
      "Crear un video corto de demo.",
    ],
    resumeBullet: "ER Triage: prototipo de cola y estado de pacientes para flujos clínicos.",
  },
  "family-phrase-game": {
    title: "Family Phrase Game",
    tagline: "Caso de estudio sobre coordinaci\\u00f3n adaptativa de sem\\u00e1foros con simulaci\\u00f3n e IA.",
    role: "Implementacion full-stack, diseño del flujo de juego y despliegue",
    summary:
      "Caso de estudio de dise\\u00f1o de sistemas que explora c\\u00f3mo la simulaci\\u00f3n sint\\u00e9tica de tr\\u00e1fico, se\\u00f1ales de congesti\\u00f3n y razonamiento asistido por IA podr\\u00edan apoyar la coordinaci\\u00f3n adaptativa de sem\\u00e1foros.",
    challenge:
      "Los juegos genericos son divertidos, pero se vuelven mas significativos cuando el contenido es personal y especifico del grupo.",
    approach:
      "El juego usa frases enviadas por familiares y las presenta en una interfaz simple para que otros jugadores las describan y adivinen.",
    architecture: [
      "Flask sirve la aplicación y sus rutas.",
      "El frontend estatico muestra la superficie de juego.",
      "Las frases pueden prepararse desde respuestas de Google Forms.",
      "El despliegue permite jugar desde el navegador.",
    ],
    results: [
      "Muestra velocidad de ejecucion, despliegue y enfoque practico hacia usuarios reales.",
      "Despliegue activo en Render.",
      "Backend con Python Flask.",
      "Flujo de frases personalizadas.",
      "Loop de juego simple en web.",
    ],
    nextSteps: [
      "Agregar herramientas de importacion de frases.",
      "Agregar control de equipos, rondas y puntuacion.",
      "Mejorar la experiencia movil.",
    ],
    resumeBullet: "Family Phrase Game: app web desplegada para un juego familiar personalizado.",
  },
  "adaptive-traffic-ai": {
    title: "Adaptive Traffic AI System",
    tagline: "Concepto de producto de ciberseguridad para documentaci\\u00f3n y reportes m\\u00e1s seguros.",
    role: "Dirección de investigacion, plan de simulación y arquitectura de sistema",
    summary:
      "Concepto de producto de ciberseguridad para ayudar a usuarios a documentar llamadas sospechosas, clasificar riesgo y preparar flujos de denuncia estructurados con l\\u00edmites de privacidad y seguridad.",
    challenge:
      "El trafico urbano suele gestionarse por interseccion, pero la congestion se forma en redes completas. El sistema necesita razonar sobre la ciudad conectada.",
    approach:
      "El proyecto inicia con una simulación digital que genera datos sinteticos, prueba estrategias y evalua comportamiento adaptativo de forma segura.",
    architecture: [
      "La simulación genera estados de trafico y flujo de vehiculos.",
      "La capa de datos captura intersecciones, espera, densidad y congestion.",
      "La capa de IA propone ajustes según el estado de la red.",
      "El dashboard visualiza intersecciones, intervenciones y resultados.",
    ],
    results: [
      "Muestra pensamiento de sistemas, planeacion de IA, desarrollo con simulación y limites responsables.",
      "Modelo mental de recoleccion y preparacion de datos.",
      "Estrategia de desarrollo basada en simulación.",
      "Concepto de sistema de razonamiento.",
      "Dirección de evaluacion y dashboard.",
    ],
    nextSteps: [
      "Construir la primera simulación minima de una cuadricula.",
      "Definir algoritmos base para comparar.",
      "Crear un dashboard de evaluacion.",
    ],
    resumeBullet: "Traffic AI: concepto de IA con simulación para coordinación urbana.",
  },
  "cyber-reporting-assistant": {
    title: "Cyber Harassment Reporting Assistant",
    tagline: "Asistente de seguridad para documentar llamadas sospechosas y reportes.",
    role: "Concepto de producto, UX de seguridad y diseño de flujo de reporte",
    summary:
      "Concepto para organizar detalles de incidentes, clasificar señales de riesgo y generar material estructurado de reporte.",
    challenge:
      "Personas que enfrentan llamadas sospechosas o acoso digital muchas veces no saben que documentar ni que informacion importa.",
    approach:
      "El asistente guia la captura del incidente, la clasificacion de riesgo y la generacion de reportes con limites claros de privacidad y seguridad.",
    architecture: [
      "La interfaz recopila detalles del incidente de forma estructurada.",
      "La capa de clasificacion identifica urgencia y señales de riesgo.",
      "El generador convierte la informacion en documentacion organizada.",
      "Las reglas de almacenamiento definen privacidad, borrado y acceso.",
    ],
    results: [
      "Muestra pensamiento de producto en ciberseguridad, UX segura y diseño de flujos de reporte.",
      "Concepto de flujo de recoleccion de incidentes.",
      "Dirección de modelo de clasificacion de riesgo.",
      "Idea de generacion de reporte estructurado.",
      "Limites de privacidad y consentimiento.",
    ],
    nextSteps: [
      "Prototipar el flujo de reporte.",
      "Definir limites eticos y legales.",
      "Crear diagramas de arquitectura y salidas de ejemplo.",
    ],
    resumeBullet: "Cyber Reporting: concepto de producto para reportes de ciberacoso y llamadas sospechosas.",
  },
};

const metricLabelsEs: Record<string, string> = {
  "Core modes": "Modos",
  Architecture: "Arquitectura",
  Focus: "Enfoque",
  "Workflow stages": "Etapas",
  Database: "Base de datos",
  Interface: "Interfaz",
  Status: "Estado",
  Deploy: "Despliegue",
  Build: "Build",
  Mode: "Modo",
  Domain: "Dominio",
  Scope: "Alcance",
  Output: "Salida",
};

function getStatus(status: Project["status"]): CaseStudyStatus {
  if (status === "Live") return "live";
  if (status === "Prototype") return "prototype";
  if (status === "Case Study") return "research";
  return "prototype";
}

function getStatusLabel(status: Project["status"]): Localized<string> {
  const labels: Record<Project["status"], Localized<string>> = {
    Live: localized("Live", "Activo"),
    Prototype: localized("Prototype", "Prototipo"),
    "Case Study": localized("Case Study", "Caso de estudio"),
    "In Progress": localized("In Progress", "En progreso"),
  };

  return labels[status];
}

function getLinkKind(link: Project["links"][number]): ProjectLinkKind {
  const value = `${link.label} ${link.href}`.toLowerCase();

  if (value.includes("github")) return "repo";
  if (value.includes("live") || value.includes("demo") || value.includes("vercel") || value.includes("render")) return "live";
  if (value.includes("video")) return "video";

  return "case-study";
}

function getLinkLabel(link: Project["links"][number]): Localized<string> {
  const kind = getLinkKind(link);

  if (kind === "live") return localized(link.label, "App activa");
  if (kind === "repo") return localized(link.label, "GitHub");
  if (kind === "video") return localized(link.label, "Video");

  return localized(link.label, "Caso de estudio");
}

const projectDecisionLibrary: Record<string, Decision[]> = {
  savr: [
    {
      title: localized("Recommendation input model", "Modelo de entradas de recomendaci\u00f3n"),
      tradeoff: localized(
        "A simple restaurant list would be faster to build, but it would not capture why someone is going out, who they are with, budget, dietary limits, or atmosphere.",
        "Una lista simple de restaurantes ser\u00eda m\u00e1s r\u00e1pida de construir, pero no capturar\u00eda por qu\u00e9 alguien sale, con qui\u00e9n va, su presupuesto, restricciones o ambiente."
      ),
      outcome: localized(
        "Structured the product around Describe Your Night, Build Your Night, and Surprise Me so recommendation results can be explained and extended.",
        "Estructur\u00e9 el producto alrededor de Describe Your Night, Build Your Night y Surprise Me para que los resultados sean explicables y extensibles."
      ),
    },
    {
      title: localized("Backend and frontend contract", "Contrato entre backend y frontend"),
      tradeoff: localized(
        "Recommendation features become fragile when UI filters and backend scoring logic evolve separately.",
        "Las funciones de recomendaci\u00f3n se vuelven fr\u00e1giles cuando los filtros de UI y la l\u00f3gica de scoring del backend evolucionan por separado."
      ),
      outcome: localized(
        "Kept API routes, data fields, and result cards aligned around explicit preference signals, restaurant metadata, and explainable output.",
        "Mantuve rutas API, campos de datos y tarjetas de resultados alineadas con se\u00f1ales expl\u00edcitas de preferencia, metadatos de restaurantes y resultados explicables."
      ),
    },
    {
      title: localized("Proof before polish", "Evidencia antes de pulido visual"),
      tradeoff: localized(
        "Premium visuals can make a product look finished before the recommendation logic and data model are actually useful.",
        "Los visuales premium pueden hacer que un producto parezca terminado antes de que la l\u00f3gica de recomendaci\u00f3n y el modelo de datos sean realmente \u00fatiles."
      ),
      outcome: localized(
        "Prioritized working flows, authentication, restaurant data, presets, APIs, and recommendation cards before final visual polish.",
        "Prioric\u00e9 flujos funcionales, autenticaci\u00f3n, datos de restaurantes, presets, APIs y tarjetas de recomendaci\u00f3n antes del pulido visual final."
      ),
    },
  ],

  "er-triage-queue-manager": [
    {
      title: localized("Workflow model before interface", "Modelo de flujo antes de la interfaz"),
      tradeoff: localized(
        "A hospital queue screen can look useful even if it does not reflect patient states, priority changes, or staff handoff.",
        "Una pantalla de fila hospitalaria puede parecer \u00fatil aunque no refleje estados de pacientes, cambios de prioridad o transferencia entre personal."
      ),
      outcome: localized(
        "Modeled queue visibility, triage priority, patient status, and dashboard state before treating the UI as the final artifact.",
        "Model\u00e9 visibilidad de fila, prioridad de triage, estado de pacientes y dashboard antes de tratar la UI como el artefacto final."
      ),
    },
    {
      title: localized("Local persistence for prototype speed", "Persistencia local para velocidad de prototipo"),
      tradeoff: localized(
        "A cloud backend would be more realistic, but it would slow early iteration for a workflow prototype.",
        "Un backend en la nube ser\u00eda m\u00e1s realista, pero har\u00eda m\u00e1s lenta la iteraci\u00f3n temprana de un prototipo de flujo."
      ),
      outcome: localized(
        "Used local data persistence so the prototype could demonstrate patient state changes, queue behavior, and dashboard updates quickly.",
        "Us\u00e9 persistencia local para demostrar r\u00e1pidamente cambios de estado, comportamiento de fila y actualizaciones del dashboard."
      ),
    },
    {
      title: localized("Explainable priority over black-box scoring", "Prioridad explicable sobre scoring opaco"),
      tradeoff: localized(
        "Automated priority scoring can become unsafe or untrusted if users cannot understand why a patient moved in the queue.",
        "El scoring autom\u00e1tico de prioridad puede volverse inseguro o poco confiable si los usuarios no entienden por qu\u00e9 un paciente se movi\u00f3 en la fila."
      ),
      outcome: localized(
        "Kept triage logic structured so future versions can show the reason behind priority changes and attention flags.",
        "Mantuve la l\u00f3gica de triage estructurada para que futuras versiones puedan mostrar la raz\u00f3n detr\u00e1s de cambios de prioridad y alertas de atenci\u00f3n."
      ),
    },
  ],

  "family-phrase-game": [
    {
      title: localized("Personal content over generic word banks", "Contenido personal sobre bancos gen\u00e9ricos"),
      tradeoff: localized(
        "Generic catchphrase lists are easier to ship, but they remove the personal value of the family game.",
        "Las listas gen\u00e9ricas de frases son m\u00e1s f\u00e1ciles de lanzar, pero eliminan el valor personal del juego familiar."
      ),
      outcome: localized(
        "Designed phrase loading around family-submitted catchphrases so the game feels custom, funny, and replayable.",
        "Dise\u00f1\u00e9 la carga de frases alrededor de expresiones enviadas por la familia para que el juego se sienta personalizado, divertido y rejugable."
      ),
    },
    {
      title: localized("Simple live interface over account complexity", "Interfaz simple sobre complejidad de cuentas"),
      tradeoff: localized(
        "Accounts and database features could make the game more robust, but they would add friction before the event.",
        "Las cuentas y funciones de base de datos podr\u00edan hacer el juego m\u00e1s robusto, pero agregar\u00edan fricci\u00f3n antes del evento."
      ),
      outcome: localized(
        "Chose Flask, simple screens, scoring, and phrase loading to get a playable web app deployed quickly.",
        "Eleg\u00ed Flask, pantallas simples, puntuaci\u00f3n y carga de frases para desplegar r\u00e1pidamente una app web jugable."
      ),
    },
    {
      title: localized("Deployable MVP instead of local-only demo", "MVP desplegable en vez de demo local"),
      tradeoff: localized(
        "Running locally would be easier, but it would make the project harder to share, test, and explain.",
        "Correrlo localmente ser\u00eda m\u00e1s f\u00e1cil, pero har\u00eda el proyecto m\u00e1s dif\u00edcil de compartir, probar y explicar."
      ),
      outcome: localized(
        "Deployed the app so the project could be opened from a browser and presented as a real working system.",
        "Desplegu\u00e9 la app para que el proyecto pudiera abrirse desde el navegador y presentarse como un sistema funcional real."
      ),
    },
  ],

  "adaptive-traffic-ai": [
    {
      title: localized("Simulation before real-world claims", "Simulaci\u00f3n antes de promesas reales"),
      tradeoff: localized(
        "Real traffic-light control is high-stakes and cannot be responsibly claimed without validated data, infrastructure access, and safety testing.",
        "El control real de sem\u00e1foros es de alto riesgo y no debe afirmarse sin datos validados, acceso a infraestructura y pruebas de seguridad."
      ),
      outcome: localized(
        "Framed the project as a systems-design and simulation case study before any real-world deployment claim.",
        "Enmarqu\u00e9 el proyecto como caso de estudio de dise\u00f1o de sistemas y simulaci\u00f3n antes de cualquier afirmaci\u00f3n de despliegue real."
      ),
    },
    {
      title: localized("Synthetic data before city integration", "Datos sint\u00e9ticos antes de integraci\u00f3n urbana"),
      tradeoff: localized(
        "Live city integration sounds impressive, but without access and validation it would be unrealistic and hard to test.",
        "La integraci\u00f3n con una ciudad real suena impresionante, pero sin acceso y validaci\u00f3n ser\u00eda poco realista y dif\u00edcil de probar."
      ),
      outcome: localized(
        "Started from synthetic congestion patterns, simulation inputs, and evaluation metrics to test adaptive-control ideas safely.",
        "Part\u00ed de patrones sint\u00e9ticos de congesti\u00f3n, entradas de simulaci\u00f3n y m\u00e9tricas de evaluaci\u00f3n para probar ideas de control adaptativo con seguridad."
      ),
    },
    {
      title: localized("City-wide coordination over isolated optimization", "Coordinaci\u00f3n urbana sobre optimizaci\u00f3n aislada"),
      tradeoff: localized(
        "Optimizing one intersection can make a local signal look better while creating bottlenecks elsewhere.",
        "Optimizar una sola intersecci\u00f3n puede mejorar una se\u00f1al local mientras crea cuellos de botella en otras zonas."
      ),
      outcome: localized(
        "Treated coordination, constraints, congestion propagation, and network-level flow as core parts of the system design.",
        "Trat\u00e9 la coordinaci\u00f3n, restricciones, propagaci\u00f3n de congesti\u00f3n y flujo a nivel red como partes centrales del dise\u00f1o del sistema."
      ),
    },
  ],

  "cyber-reporting-assistant": [
    {
      title: localized("Privacy boundaries before automation", "L\u00edmites de privacidad antes de automatizaci\u00f3n"),
      tradeoff: localized(
        "A reporting assistant could help users document incidents, but it can also create risk if it stores sensitive call data carelessly.",
        "Un asistente de denuncias puede ayudar a documentar incidentes, pero tambi\u00e9n puede crear riesgo si almacena datos sensibles de llamadas sin cuidado."
      ),
      outcome: localized(
        "Framed the system around documentation, risk classification, and structured reporting with explicit privacy and safety boundaries.",
        "Enmarqu\u00e9 el sistema alrededor de documentaci\u00f3n, clasificaci\u00f3n de riesgo y reportes estructurados con l\u00edmites claros de privacidad y seguridad."
      ),
    },
    {
      title: localized("Assistance, not legal replacement", "Asistencia, no reemplazo legal"),
      tradeoff: localized(
        "Automating reports can reduce friction, but the tool should not pretend to replace authorities, emergency services, or legal advice.",
        "Automatizar reportes puede reducir fricci\u00f3n, pero la herramienta no debe pretender reemplazar autoridades, servicios de emergencia o asesor\u00eda legal."
      ),
      outcome: localized(
        "Kept the concept positioned as workflow support that helps users organize information before escalation.",
        "Mantuve el concepto como apoyo de flujo de trabajo que ayuda a organizar informaci\u00f3n antes de una posible escalaci\u00f3n."
      ),
    },
    {
      title: localized("Structured evidence over free-form notes", "Evidencia estructurada sobre notas libres"),
      tradeoff: localized(
        "Free-form notes are easy to collect, but they are harder to review, classify, and turn into a useful report.",
        "Las notas libres son f\u00e1ciles de recopilar, pero son m\u00e1s dif\u00edciles de revisar, clasificar y convertir en un reporte \u00fatil."
      ),
      outcome: localized(
        "Designed the concept around structured incident fields, risk labels, summaries, and report-ready outputs.",
        "Dise\u00f1\u00e9 el concepto alrededor de campos estructurados del incidente, etiquetas de riesgo, res\u00famenes y salidas listas para reporte."
      ),
    },
  ],
};

function buildDecisions(project: Project): Decision[] {
  const customDecisions = projectDecisionLibrary[project.slug];

  if (customDecisions) {
    return customDecisions;
  }

  const source = project.challenges.length > 0 ? project.challenges : project.architecture;

  return source.slice(0, 3).map((item, index) => ({
    title: localized("Decision " + (index + 1), "Decisi\u00f3n " + (index + 1)),
    tradeoff: localized(item),
    outcome: localized(project.next[index] ?? project.solution),
  }));
}

function toCaseStudy(project: Project, index: number): ProjectCaseStudy {
  const es = spanishBySlug[project.slug];

  if (!es) {
    throw new Error(`Missing Spanish project copy for ${project.slug}`);
  }

  return {
    slug: project.slug,
    featured: index < 3,
    status: getStatus(project.status),
    statusLabel: getStatusLabel(project.status),
    year: project.year,
    title: localized(project.name, es.title),
    tagline: localized(project.oneLiner, es.tagline),
    role: localized(project.role, es.role),
    summary: localized(project.summary, es.summary),
    heroImage: `/projects/${project.slug}/hero.svg`,
    tech: project.stack,
    proofs: project.metrics.map((metric) => ({
      label: localized(metric.label, metricLabelsEs[metric.label] ?? metric.label),
      value: metric.value,
      note: localized(project.type, es.tagline),
    })),
    links: project.links.map((link) => ({
      label: getLinkLabel(link),
      href: link.href,
      kind: getLinkKind(link),
    })),
    challenge: localized(project.problem, es.challenge),
    approach: localized(project.solution, es.approach),
    architecture: localized(project.architecture, es.architecture),
    decisions: buildDecisions(project, es),
    results: localized([project.impact, ...project.proof], es.results),
    nextSteps: localized(project.next, es.nextSteps),
    gallery: [
      {
        src: `/projects/${project.slug}/proof-1.svg`,
        alt: localized(`${project.shortName} primary proof visual`, `${project.shortName} visual principal de evidencia`),
        caption: localized(
          "Primary visual proof panel for the case study.",
          "Visual principal temporal. Reemplazar con una captura real cuando estÃ© disponible.",
        ),
      },
      {
        src: `/projects/${project.slug}/architecture.svg`,
        alt: localized(`${project.shortName} architecture visual`, `${project.shortName} diagrama de arquitectura`),
        caption: localized(
          "Architecture and system-flow visual for the case study.",
          "Diagrama de arquitectura y flujo del sistema para el caso de estudio.",
        ),
      },
      {
        src: `/projects/${project.slug}/proof-2.svg`,
        alt: localized(`${project.shortName} secondary proof visual`, `${project.shortName} visual secundario de evidencia`),
        caption: localized(
          "Secondary visual for interface, workflow, or result evidence.",
          "Visual secundario para evidencia de interfaz, flujo o resultados.",
        ),
      },
    ],
    resumeBullet: localized(`${project.shortName}: ${project.oneLiner}`, es.resumeBullet),
  };
}

export const caseStudies: ProjectCaseStudy[] = legacyProjects.map(toCaseStudy).map((project) => {
  if (project.slug === "savr") {
    return {
      ...project,
      heroImage: "/projects/savr/savr-onboarding.png",
      gallery: [
        {
          src: "/projects/savr/savr-onboarding.png",
          alt: localized("SAVR guided onboarding profile setup screenshot", "Captura del onboarding guiado de SAVR"),
          caption: localized(
            "Real interface proof from the SAVR profile setup flow.",
            "Evidencia real de interfaz del flujo de configuración de perfil de SAVR.",
          ),
        },
        {
          src: "/projects/savr/architecture.svg",
          alt: localized("SAVR architecture and recommendation flow visual", "Diagrama de arquitectura y recomendación de SAVR"),
          caption: localized(
            "System architecture view connecting onboarding, restaurant data, and recommendation logic.",
            "Vista de arquitectura que conecta onboarding, datos de restaurantes y lógica de recomendación.",
          ),
        },
        {
          src: "/projects/savr/proof-2.svg",
          alt: localized("SAVR recommendation proof panel", "Panel de evidencia de recomendaciones SAVR"),
          caption: localized(
            "Recommendation-flow proof panel for Describe, Build, and Surprise paths.",
            "Panel de evidencia del flujo de recomendaciones para las rutas Describe, Build y Surprise.",
          ),
        },
      ],
      nextSteps: localized(
        [
          "Add recommendation-result screenshots from the deployed app.",
          "Add a stable live demo once the production database and auth flow are ready.",
          "Add dish-level explanations and event-aware scoring.",
        ],
        [
          "Agregar capturas de resultados de recomendación de la app desplegada.",
          "Agregar una demo estable cuando la base de datos y autenticación de producción estén listas.",
          "Agregar explicaciones por platillo y ranking por eventos.",
        ],
      ),
    };
  }

  if (project.slug === "family-phrase-game") {
    return {
      ...project,
      heroImage: "/projects/family-phrase-game/family-phrase-game-main.png",
      gallery: [
        {
          src: "/projects/family-phrase-game/family-phrase-game-main.png",
          alt: localized("Family Phrase Game live interface screenshot", "Captura de la interfaz de Family Phrase Game"),
          caption: localized(
            "Real deployed interface proof from the Family Phrase Game MVP.",
            "Evidencia real de la interfaz desplegada del MVP Family Phrase Game.",
          ),
        },
        {
          src: "/projects/family-phrase-game/architecture.svg",
          alt: localized("Family Phrase Game architecture visual", "Diagrama de arquitectura de Family Phrase Game"),
          caption: localized(
            "Simple Flask deployment architecture for a fast family-event web app.",
            "Arquitectura simple de despliegue Flask para una app web de evento familiar.",
          ),
        },
        {
          src: "/projects/family-phrase-game/proof-2.svg",
          alt: localized("Family Phrase Game gameplay flow visual", "Visual del flujo de juego de Family Phrase Game"),
          caption: localized(
            "Gameplay proof panel showing phrase loading, scoring, and round controls.",
            "Panel de evidencia del juego con carga de frases, puntuación y controles de ronda.",
          ),
        },
      ],
    };
  }

  return project;
});

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getLocalizedValue<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}