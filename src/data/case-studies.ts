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
    tagline: "Plataforma full-stack de recomendaciones gastronómicas con flujos explicables.",
    role: "Dirección de producto, API backend, flujos frontend, modelo de datos y lógica de recomendación",
    summary:
      "Plataforma full-stack de recomendaciones gastronómicas que usa preferencias, presupuesto, contexto social e intención de salida para generar sugerencias más relevantes de restaurantes y experiencias.",
    challenge:
      "La búsqueda de restaurantes suele ser genérica. Normalmente filtra por ubicación o cocina, pero ignora con quién vas, qué ambiente quieres y qué restricciones importan.",
    approach:
      "SAVR trata la decisión como un problema de recomendación contextual. El usuario puede describir su noche, construirla con opciones guiadas o usar un modo sorpresa con resultados explicables.",
    architecture: [
      "La interfaz maneja onboarding, entradas de recomendación y presentación de resultados.",
      "La API separa autenticación, restaurantes, experiencias y rutas de recomendación.",
      "El modelo de datos soporta preferencias, metadatos de restaurantes, ambiente y futuras señales de eventos.",
      "La capa de recomendación conecta contexto del usuario con atributos del lugar y explica por qué encaja.",
    ],
    results: [
      "Construí una base full-stack funcional con rutas backend en FastAPI, pantallas de producto en React/TypeScript, autenticación, datos de restaurantes y flujos de recomendación.",
      "Convertí una idea amplia de producto en modos concretos de entrada: Describe Your Night, Build Your Night y Surprise Me.",
      "Agregué evidencia visible mediante capturas del proyecto, estructura de caso de estudio, detalles del stack y una explicación clara de cómo la lógica conecta con el contexto del usuario.",
    ],
    nextSteps: [
      "Agregar capturas reales de resultados de recomendación, diagramas de arquitectura y ejemplos de payloads API.",
      "Desplegar una demo pública estable cuando las rutas principales, los datos semilla y las salidas de recomendación estén limpias para producción.",
      "Expandir la lógica de ranking con recomendaciones a nivel platillo, señales de eventos, presets guardados y tarjetas de explicación más claras.",
    ],
    resumeBullet: "SAVR: plataforma full-stack de recomendaciones contextuales con FastAPI, React, TypeScript, SQL y flujos explicables.",
  },
  "er-triage-queue-manager": {
    title: "ER Triage & Queue Manager",
    tagline: "Prototipo de flujo de trabajo para visibilidad de filas, estado de pacientes y priorización de triage.",
    role: "Diseño de sistema, implementación en Python, modelo de datos y lógica de flujo",
    summary:
      "Prototipo de flujo de trabajo para visibilidad de filas en urgencias, seguimiento del estado de pacientes y priorización de triage mediante formularios estructurados, persistencia local y vistas tipo dashboard.",
    challenge:
      "Los flujos de emergencias dependen de visibilidad compartida. Intake, signos vitales, prioridad, cuarto y tratamiento se fragmentan si no viven en un solo sistema.",
    approach:
      "El prototipo centraliza registro, signos vitales, scoring de prioridad, monitoreo de cola, páginas de paciente e historial de estado.",
    architecture: [
      "NiceGUI organiza vistas para intake, triage de enfermería, cola y administración.",
      "SQLite guarda pacientes, signos vitales, prioridad, cuarto e historial.",
      "La lógica de prioridad conecta síntomas y signos vitales con posición en la cola.",
      "Los dashboards muestran el estado del paciente para una demo clara.",
    ],
    results: [
      "Definí un prototipo de flujo alrededor del estado de pacientes, visibilidad de fila, prioridad de triage y actualizaciones de dashboard.",
      "Practiqué convertir un proceso operativo de alta presión en formularios estructurados, persistencia local y estado visible en la interfaz.",
      "Creé una base de caso de estudio que después puede soportar ejemplos de scoring, diagramas de estado, capturas y pruebas de flujo.",
    ],
    nextSteps: [
      "Agregar capturas del formulario de triage, dashboard de fila y cambios de estado de pacientes.",
      "Documentar la lógica de scoring de prioridad con ejemplos que expliquen por qué un paciente se mueve en la fila.",
      "Crear un diagrama simple de estados y notas de prueba para ingreso, espera, tratamiento y cierre.",
    ],
    resumeBullet: "ER Triage: prototipo de cola y estado de pacientes para flujos clínicos con Python, NiceGUI y SQLite.",
  },
  "family-phrase-game": {
    title: "Family Phrase Game",
    tagline: "Aplicación Flask desplegada que convierte frases familiares en un juego grupal.",
    role: "Implementación full-stack, diseño del flujo de juego y despliegue",
    summary:
      "Aplicación web desplegada con Flask que convierte frases familiares y chistes internos en un juego grupal con puntuación, carga de frases e interfaz simple en vivo.",
    challenge:
      "Los juegos genéricos son divertidos, pero se vuelven más significativos cuando el contenido es personal y específico del grupo.",
    approach:
      "El juego usa frases enviadas por familiares y las presenta en una interfaz simple para que otros jugadores las describan y adivinen.",
    architecture: [
      "Flask sirve la aplicación y sus rutas.",
      "El frontend estático muestra la superficie de juego.",
      "Las frases pueden prepararse desde respuestas de Google Forms.",
      "El despliegue permite jugar desde el navegador.",
    ],
    results: [
      "Desplegué una aplicación web en Flask que se puede abrir desde el navegador y presentar como un sistema funcional.",
      "Construí el juego alrededor de carga de frases personalizadas, puntuación y pantallas simples de juego en lugar de bancos genéricos de palabras.",
      "Demostré ejecución rápida de MVP: convertir una idea para un evento familiar en una aplicación web desplegada con alcance claro.",
    ],
    nextSteps: [
      "Agregar un modo demo con frases de ejemplo para que los visitantes no lleguen a un estado vacío.",
      "Mejorar las instrucciones de carga de frases y el layout móvil de juego.",
      "Agregar una sección de README con capturas del juego, notas de despliegue e instrucciones de instalación.",
    ],
    resumeBullet: "Family Phrase Game: app web Flask desplegada para un juego familiar personalizado con carga de frases y puntuación.",
  },
  "adaptive-traffic-ai": {
    title: "Adaptive Traffic AI System",
    tagline: "Caso de estudio sobre coordinación adaptativa de semáforos con simulación e IA.",
    role: "Dirección de investigación, plan de simulación y arquitectura de sistema",
    summary:
      "Caso de estudio de diseño de sistemas que explora cómo la simulación sintética de tráfico, señales de congestión y razonamiento asistido por IA podrían apoyar la coordinación adaptativa de semáforos.",
    challenge:
      "El tráfico urbano suele gestionarse por intersección, pero la congestión se forma en redes completas. El sistema necesita razonar sobre la ciudad conectada.",
    approach:
      "El proyecto inicia con una simulación digital que genera datos sintéticos, prueba estrategias y evalúa comportamiento adaptativo de forma segura.",
    architecture: [
      "La simulación genera estados de tráfico y flujo de vehículos.",
      "La capa de datos captura intersecciones, espera, densidad y congestión.",
      "La capa de IA propone ajustes según el estado de la red.",
      "El dashboard visualiza intersecciones, intervenciones y resultados.",
    ],
    results: [
      "Definí la arquitectura para un sistema de coordinación de tráfico basado primero en simulación, sin afirmar despliegue real.",
      "Identifiqué el reto central de modelado: datos sintéticos, estados de congestión, restricciones de intersecciones y flujo de tráfico a nivel red.",
      "Creé una ruta de concepto a prototipo: simulación en cuadrícula, métricas de congestión, comportamiento base y experimentos de control adaptativo.",
    ],
    nextSteps: [
      "Construir una simulación mínima en Python con intersecciones, volumen de tráfico, tiempos de semáforo y estados de congestión.",
      "Capturar una visualización de simulación o screenshot de dashboard para el caso de estudio.",
      "Definir métricas de evaluación como tiempo promedio de espera, throughput, longitud de fila y reducción de cuellos de botella.",
    ],
    resumeBullet: "Traffic AI: caso de estudio de simulación para coordinación adaptativa de semáforos y flujo urbano.",
  },
  "cyber-reporting-assistant": {
    title: "Cyber Harassment Reporting Assistant",
    tagline: "Concepto de producto de ciberseguridad para documentación y reportes más seguros.",
    role: "Concepto de producto, UX de seguridad y diseño de flujo de reporte",
    summary:
      "Concepto de producto de ciberseguridad para ayudar a usuarios a documentar llamadas sospechosas, clasificar riesgo y preparar flujos de denuncia estructurados con límites de privacidad y seguridad.",
    challenge:
      "Personas que enfrentan llamadas sospechosas o acoso digital muchas veces no saben qué documentar ni qué información importa.",
    approach:
      "El asistente guía la captura del incidente, la clasificación de riesgo y la generación de reportes con límites claros de privacidad y seguridad.",
    architecture: [
      "La interfaz recopila detalles del incidente de forma estructurada.",
      "La capa de clasificación identifica urgencia y señales de riesgo.",
      "El generador convierte la información en documentación organizada.",
      "Las reglas de almacenamiento definen privacidad, borrado y acceso.",
    ],
    results: [
      "Enmarqué el asistente como apoyo de documentación y reporte con conciencia de privacidad, no como reemplazo de servicios de emergencia, autoridades o asesoría legal.",
      "Conecté pensamiento de respuesta a incidentes con un flujo orientado al usuario: captura de evidencia, etiquetas de riesgo, resúmenes y preparación para escalación.",
      "Definí límites de producto más seguros para manejar información sensible de llamadas, clasificación y salidas listas para reporte.",
    ],
    nextSteps: [
      "Construir un mockup seguro del flujo de reporte antes de implementar funciones de grabación o clasificación.",
      "Definir reglas de ciclo de vida de datos: qué se recopila, dónde se guarda, cuándo se elimina y qué controla el usuario.",
      "Agregar un ejemplo de reporte y una rúbrica de clasificación de riesgo con disclaimers claros de privacidad y seguridad.",
    ],
    resumeBullet: "Cyber Reporting: concepto de producto de ciberseguridad para documentación, clasificación de riesgo y reportes estructurados.",
  },
};

const metricLabelsEs: Record<string, string> = {
  "Core modes": "Modos principales",
  Architecture: "Arquitectura",
  Focus: "Enfoque",
  "Workflow stages": "Etapas de flujo",
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
  if (status === "In Progress") return "prototype";
  return "research";
}

function getStatusLabel(status: Project["status"]): Localized<string> {
  const esStatus: Record<Project["status"], string> = {
    Live: "En vivo",
    Prototype: "Prototipo",
    "Case Study": "Caso de estudio",
    "In Progress": "En progreso",
  };

  return localized(status, esStatus[status]);
}

function getLinkKind(link: Project["links"][number]): ProjectLinkKind {
  const label = link.label.toLowerCase();
  if (label.includes("live") || label.includes("demo") || label.includes("app")) return "live";
  if (label.includes("video")) return "video";
  if (label.includes("github") || label.includes("repo")) return "repo";
  return "case-study";
}

function getLinkLabel(link: Project["links"][number]): Localized<string> {
  const kind = getLinkKind(link);
  if (kind === "live") return localized(link.label, "Abrir demo");
  if (kind === "repo") return localized(link.label, "Abrir GitHub");
  if (kind === "video") return localized(link.label, "Ver video");
  return localized(link.label, link.label);
}

const projectDecisionLibrary: Record<string, Decision[]> = {
  savr: [
    {
      title: localized("Recommendation input model", "Modelo de entradas de recomendación"),
      tradeoff: localized(
        "A simple restaurant list would be faster to build, but it would not capture why someone is going out, who they are with, budget, dietary limits, or atmosphere.",
        "Una lista simple de restaurantes sería más rápida de construir, pero no capturaría por qué alguien sale, con quién va, su presupuesto, restricciones o ambiente."
      ),
      outcome: localized(
        "Structured the product around Describe Your Night, Build Your Night, and Surprise Me so recommendation results can be explained and extended.",
        "Estructuré el producto alrededor de Describe Your Night, Build Your Night y Surprise Me para que los resultados sean explicables y extensibles."
      ),
    },
    {
      title: localized("Backend and frontend contract", "Contrato entre backend y frontend"),
      tradeoff: localized(
        "Recommendation features become fragile when UI filters and backend scoring logic evolve separately.",
        "Las funciones de recomendación se vuelven frágiles cuando los filtros de UI y la lógica de scoring del backend evolucionan por separado."
      ),
      outcome: localized(
        "Kept API routes, data fields, and result cards aligned around explicit preference signals, restaurant metadata, and explainable output.",
        "Mantuve rutas API, campos de datos y tarjetas de resultados alineadas con señales explícitas de preferencia, metadatos de restaurantes y resultados explicables."
      ),
    },
    {
      title: localized("Proof before polish", "Evidencia antes de pulido visual"),
      tradeoff: localized(
        "Premium visuals can make a product look finished before the recommendation logic and data model are actually useful.",
        "Los visuales premium pueden hacer que un producto parezca terminado antes de que la lógica de recomendación y el modelo de datos sean realmente útiles."
      ),
      outcome: localized(
        "Prioritized working flows, authentication, restaurant data, presets, APIs, and recommendation cards before final visual polish.",
        "Prioricé flujos funcionales, autenticación, datos de restaurantes, presets, APIs y tarjetas de recomendación antes del pulido visual final."
      ),
    },
  ],
  "er-triage-queue-manager": [
    {
      title: localized("Workflow model before interface", "Modelo de flujo antes de la interfaz"),
      tradeoff: localized(
        "A hospital queue screen can look useful even if it does not reflect patient states, priority changes, or staff handoff.",
        "Una pantalla de fila hospitalaria puede parecer útil aunque no refleje estados de pacientes, cambios de prioridad o transferencia entre personal."
      ),
      outcome: localized(
        "Modeled queue visibility, triage priority, patient status, and dashboard state before treating the UI as the final artifact.",
        "Modelé visibilidad de fila, prioridad de triage, estado de pacientes y dashboard antes de tratar la UI como el artefacto final."
      ),
    },
    {
      title: localized("Local persistence for prototype speed", "Persistencia local para velocidad de prototipo"),
      tradeoff: localized(
        "A cloud backend would be more realistic, but it would slow early iteration for a workflow prototype.",
        "Un backend en la nube sería más realista, pero haría más lenta la iteración temprana de un prototipo de flujo."
      ),
      outcome: localized(
        "Used local data persistence so the prototype could demonstrate patient state changes, queue behavior, and dashboard updates quickly.",
        "Usé persistencia local para demostrar rápidamente cambios de estado, comportamiento de fila y actualizaciones del dashboard."
      ),
    },
    {
      title: localized("Explainable priority over black-box scoring", "Prioridad explicable sobre scoring opaco"),
      tradeoff: localized(
        "Automated priority scoring can become unsafe or untrusted if users cannot understand why a patient moved in the queue.",
        "El scoring automático de prioridad puede volverse inseguro o poco confiable si los usuarios no entienden por qué un paciente se movió en la fila."
      ),
      outcome: localized(
        "Kept triage logic structured so future versions can show the reason behind priority changes and attention flags.",
        "Mantuve la lógica de triage estructurada para que futuras versiones puedan mostrar la razón detrás de cambios de prioridad y alertas de atención."
      ),
    },
  ],
  "family-phrase-game": [
    {
      title: localized("Personal content over generic word banks", "Contenido personal sobre bancos genéricos"),
      tradeoff: localized(
        "Generic catchphrase lists are easier to ship, but they remove the personal value of the family game.",
        "Las listas genéricas de frases son más fáciles de lanzar, pero eliminan el valor personal del juego familiar."
      ),
      outcome: localized(
        "Designed phrase loading around family-submitted catchphrases so the game feels custom, funny, and replayable.",
        "Diseñé la carga de frases alrededor de expresiones enviadas por la familia para que el juego se sienta personalizado, divertido y rejugable."
      ),
    },
    {
      title: localized("Simple live interface over account complexity", "Interfaz simple sobre complejidad de cuentas"),
      tradeoff: localized(
        "Accounts and database features could make the game more robust, but they would add friction before the event.",
        "Las cuentas y funciones de base de datos podrían hacer el juego más robusto, pero agregarían fricción antes del evento."
      ),
      outcome: localized(
        "Chose Flask, simple screens, scoring, and phrase loading to get a playable web app deployed quickly.",
        "Elegí Flask, pantallas simples, puntuación y carga de frases para desplegar rápidamente una app web jugable."
      ),
    },
    {
      title: localized("Deployable MVP instead of local-only demo", "MVP desplegable en vez de demo local"),
      tradeoff: localized(
        "Running locally would be easier, but it would make the project harder to share, test, and explain.",
        "Correrlo localmente sería más fácil, pero haría el proyecto más difícil de compartir, probar y explicar."
      ),
      outcome: localized(
        "Deployed the app so the project could be opened from a browser and presented as a real working system.",
        "Desplegué la app para que el proyecto pudiera abrirse desde el navegador y presentarse como un sistema funcional real."
      ),
    },
  ],
  "adaptive-traffic-ai": [
    {
      title: localized("Simulation before real-world claims", "Simulación antes de promesas reales"),
      tradeoff: localized(
        "Real traffic-light control is high-stakes and cannot be responsibly claimed without validated data, infrastructure access, and safety testing.",
        "El control real de semáforos es de alto riesgo y no debe afirmarse sin datos validados, acceso a infraestructura y pruebas de seguridad."
      ),
      outcome: localized(
        "Framed the project as a systems-design and simulation case study before any real-world deployment claim.",
        "Enmarqué el proyecto como caso de estudio de diseño de sistemas y simulación antes de cualquier afirmación de despliegue real."
      ),
    },
    {
      title: localized("Synthetic data before city integration", "Datos sintéticos antes de integración urbana"),
      tradeoff: localized(
        "Live city integration sounds impressive, but without access and validation it would be unrealistic and hard to test.",
        "La integración con una ciudad real suena impresionante, pero sin acceso y validación sería poco realista y difícil de probar."
      ),
      outcome: localized(
        "Started from synthetic congestion patterns, simulation inputs, and evaluation metrics to test adaptive-control ideas safely.",
        "Partí de patrones sintéticos de congestión, entradas de simulación y métricas de evaluación para probar ideas de control adaptativo con seguridad."
      ),
    },
    {
      title: localized("City-wide coordination over isolated optimization", "Coordinación urbana sobre optimización aislada"),
      tradeoff: localized(
        "Optimizing one intersection can make a local signal look better while creating bottlenecks elsewhere.",
        "Optimizar una sola intersección puede mejorar una señal local mientras crea cuellos de botella en otras zonas."
      ),
      outcome: localized(
        "Treated coordination, constraints, congestion propagation, and network-level flow as core parts of the system design.",
        "Traté la coordinación, restricciones, propagación de congestión y flujo a nivel red como partes centrales del diseño del sistema."
      ),
    },
  ],
  "cyber-reporting-assistant": [
    {
      title: localized("Privacy boundaries before automation", "Límites de privacidad antes de automatización"),
      tradeoff: localized(
        "A reporting assistant could help users document incidents, but it can also create risk if it stores sensitive call data carelessly.",
        "Un asistente de denuncias puede ayudar a documentar incidentes, pero también puede crear riesgo si almacena datos sensibles de llamadas sin cuidado."
      ),
      outcome: localized(
        "Framed the system around documentation, risk classification, and structured reporting with explicit privacy and safety boundaries.",
        "Enmarqué el sistema alrededor de documentación, clasificación de riesgo y reportes estructurados con límites claros de privacidad y seguridad."
      ),
    },
    {
      title: localized("Assistance, not legal replacement", "Asistencia, no reemplazo legal"),
      tradeoff: localized(
        "Automating reports can reduce friction, but the tool should not pretend to replace authorities, emergency services, or legal advice.",
        "Automatizar reportes puede reducir fricción, pero la herramienta no debe pretender reemplazar autoridades, servicios de emergencia o asesoría legal."
      ),
      outcome: localized(
        "Kept the concept positioned as workflow support that helps users organize information before escalation.",
        "Mantuve el concepto como apoyo de flujo de trabajo que ayuda a organizar información antes de una posible escalación."
      ),
    },
    {
      title: localized("Structured evidence over free-form notes", "Evidencia estructurada sobre notas libres"),
      tradeoff: localized(
        "Free-form notes are easy to collect, but they are harder to review, classify, and turn into a useful report.",
        "Las notas libres son fáciles de recopilar, pero son más difíciles de revisar, clasificar y convertir en un reporte útil."
      ),
      outcome: localized(
        "Designed the concept around structured incident fields, risk labels, summaries, and report-ready outputs.",
        "Diseñé el concepto alrededor de campos estructurados del incidente, etiquetas de riesgo, resúmenes y salidas listas para reporte."
      ),
    },
  ],
};

function buildGallery(project: Project): GalleryItem[] {
  return [
    {
      src: "/projects/" + project.slug + "/proof-1.svg",
      alt: localized(project.shortName + " primary proof visual", project.shortName + " visual principal de evidencia"),
      caption: localized(
        "Primary visual proof panel for the case study.",
        "Visual principal de evidencia para el caso de estudio."
      ),
    },
    {
      src: "/projects/" + project.slug + "/architecture.svg",
      alt: localized(project.shortName + " architecture visual", project.shortName + " diagrama de arquitectura"),
      caption: localized(
        "Architecture and system-flow visual for the case study.",
        "Diagrama de arquitectura y flujo del sistema para el caso de estudio."
      ),
    },
    {
      src: "/projects/" + project.slug + "/proof-2.svg",
      alt: localized(project.shortName + " secondary proof visual", project.shortName + " visual secundario de evidencia"),
      caption: localized(
        "Secondary visual for interface, workflow, or result evidence.",
        "Visual secundario para evidencia de interfaz, flujo o resultados."
      ),
    },
  ];
}

function buildDecisions(project: Project): Decision[] {
  const customDecisions = projectDecisionLibrary[project.slug];

  if (customDecisions) {
    return customDecisions;
  }

  const source = project.challenges.length > 0 ? project.challenges : project.architecture;

  return source.slice(0, 3).map((item, index) => ({
    title: localized("Decision " + (index + 1), "Decisión " + (index + 1)),
    tradeoff: localized(item, item),
    outcome: localized(project.next[index] ?? project.solution, project.next[index] ?? project.solution),
  }));
}

function toCaseStudy(project: Project, index: number): ProjectCaseStudy {
  const es = spanishBySlug[project.slug];

  if (!es) {
    throw new Error("Missing Spanish project copy for " + project.slug);
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
    heroImage: "/projects/" + project.slug + "/hero.svg",
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
    decisions: buildDecisions(project),
    results: localized([project.impact, ...project.proof], es.results),
    nextSteps: localized(project.next, es.nextSteps),
    gallery: buildGallery(project),
    resumeBullet: localized(project.shortName + ": " + project.oneLiner, es.resumeBullet),
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
            "Evidencia real de interfaz del flujo de configuración de perfil de SAVR."
          ),
        },
        ...project.gallery.slice(1),
      ],
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
            "Evidencia real de la interfaz desplegada del MVP Family Phrase Game."
          ),
        },
        ...project.gallery.slice(1),
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
