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
    tagline: "Un sistema de recomendaciones que entiende el contexto, no solo la cocina.",
    role: "Direccion de producto, API backend, flujos frontend, modelo de datos y logica de recomendacion",
    summary:
      "SAVR ayuda a elegir restaurantes y experiencias segun gusto, presupuesto, ambiente, grupo, restricciones y el tipo de noche que busca el usuario.",
    challenge:
      "La busqueda de restaurantes suele ser generica. Normalmente filtra por ubicacion o cocina, pero ignora con quien vas, que ambiente quieres y que restricciones importan.",
    approach:
      "SAVR trata la decision como un problema de recomendacion contextual. El usuario puede describir su noche, construirla con opciones guiadas o usar un modo sorpresa con resultados explicables.",
    architecture: [
      "La interfaz maneja onboarding, entradas de recomendacion y presentacion de resultados.",
      "La API separa autenticacion, restaurantes, experiencias y rutas de recomendacion.",
      "El modelo de datos soporta preferencias, metadatos de restaurantes, ambiente y futuras senales de eventos.",
      "La capa de recomendacion conecta contexto del usuario con atributos del lugar y explica por que encaja.",
    ],
    results: [
      "Proyecto flagship porque combina producto, full-stack, logica de recomendacion, onboarding y experiencia de usuario.",
      "Estructura backend con FastAPI.",
      "Arquitectura frontend con React y TypeScript.",
      "Direccion de autenticacion, onboarding y flujos de recomendacion.",
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
    tagline: "Prototipo de flujo clinico para intake, triage, colas y estado de tratamiento.",
    role: "Diseno de sistema, implementacion en Python, modelo de datos y logica de flujo",
    summary:
      "Prototipo de sala de emergencias para registro de pacientes, signos vitales, prioridad automatizada, visibilidad de cola y progreso de tratamiento.",
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
      "Estructura de aplicacion Python.",
      "Modelo de base de datos SQLite.",
      "Estado de paciente e historial.",
      "Dashboard de cola y pantallas por rol.",
    ],
    nextSteps: [
      "Agregar capturas de cada flujo principal.",
      "Documentar claramente el algoritmo de scoring.",
      "Crear un video corto de demo.",
    ],
    resumeBullet: "ER Triage: prototipo de cola y estado de pacientes para flujos clinicos.",
  },
  "family-phrase-game": {
    title: "Family Phrase Game",
    tagline: "Juego tipo Catchphrase personalizado con frases reales de familia.",
    role: "Implementacion full-stack, diseno del flujo de juego y despliegue",
    summary:
      "Aplicacion Flask desplegada para jugar con frases personalizadas recolectadas desde un flujo de Google Forms.",
    challenge:
      "Los juegos genericos son divertidos, pero se vuelven mas significativos cuando el contenido es personal y especifico del grupo.",
    approach:
      "El juego usa frases enviadas por familiares y las presenta en una interfaz simple para que otros jugadores las describan y adivinen.",
    architecture: [
      "Flask sirve la aplicacion y sus rutas.",
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
    tagline: "Concepto con simulacion para coordinacion adaptativa de semaforos.",
    role: "Direccion de investigacion, plan de simulacion y arquitectura de sistema",
    summary:
      "Concepto de sistema para entrenar y probar coordinacion de semaforos con IA en una ciudad simulada antes de explorar uso real.",
    challenge:
      "El trafico urbano suele gestionarse por interseccion, pero la congestion se forma en redes completas. El sistema necesita razonar sobre la ciudad conectada.",
    approach:
      "El proyecto inicia con una simulacion digital que genera datos sinteticos, prueba estrategias y evalua comportamiento adaptativo de forma segura.",
    architecture: [
      "La simulacion genera estados de trafico y flujo de vehiculos.",
      "La capa de datos captura intersecciones, espera, densidad y congestion.",
      "La capa de IA propone ajustes segun el estado de la red.",
      "El dashboard visualiza intersecciones, intervenciones y resultados.",
    ],
    results: [
      "Muestra pensamiento de sistemas, planeacion de IA, desarrollo con simulacion y limites responsables.",
      "Modelo mental de recoleccion y preparacion de datos.",
      "Estrategia de desarrollo basada en simulacion.",
      "Concepto de sistema de razonamiento.",
      "Direccion de evaluacion y dashboard.",
    ],
    nextSteps: [
      "Construir la primera simulacion minima de una cuadricula.",
      "Definir algoritmos base para comparar.",
      "Crear un dashboard de evaluacion.",
    ],
    resumeBullet: "Traffic AI: concepto de IA con simulacion para coordinacion urbana.",
  },
  "cyber-reporting-assistant": {
    title: "Cyber Harassment Reporting Assistant",
    tagline: "Asistente de seguridad para documentar llamadas sospechosas y reportes.",
    role: "Concepto de producto, UX de seguridad y diseno de flujo de reporte",
    summary:
      "Concepto para organizar detalles de incidentes, clasificar senales de riesgo y generar material estructurado de reporte.",
    challenge:
      "Personas que enfrentan llamadas sospechosas o acoso digital muchas veces no saben que documentar ni que informacion importa.",
    approach:
      "El asistente guia la captura del incidente, la clasificacion de riesgo y la generacion de reportes con limites claros de privacidad y seguridad.",
    architecture: [
      "La interfaz recopila detalles del incidente de forma estructurada.",
      "La capa de clasificacion identifica urgencia y senales de riesgo.",
      "El generador convierte la informacion en documentacion organizada.",
      "Las reglas de almacenamiento definen privacidad, borrado y acceso.",
    ],
    results: [
      "Muestra pensamiento de producto en ciberseguridad, UX segura y diseno de flujos de reporte.",
      "Concepto de flujo de recoleccion de incidentes.",
      "Direccion de modelo de clasificacion de riesgo.",
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

function buildDecisions(project: Project, es: SpanishProjectCopy): Decision[] {
  const englishSource = project.challenges.length > 0 ? project.challenges : project.architecture;
  const spanishSource = es.architecture.length > 0 ? es.architecture : [es.challenge, es.approach];

  return englishSource.slice(0, 3).map((item, index) => ({
    title: localized(`Decision ${index + 1}`, `Decision ${index + 1}`),
    tradeoff: localized(item, spanishSource[index] ?? es.challenge),
    outcome: localized(project.next[index] ?? project.solution, es.nextSteps[index] ?? es.approach),
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