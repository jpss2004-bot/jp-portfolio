import type { Project } from "./content";

export const additionalCases: Project[] = [
  {
    slug: "band-of-brothers", title: { en: "Band of Brothers", es: "Band of Brothers" }, status: "live",
    period: { en: "2026", es: "2026" }, role: { en: "Creator & league commissioner", es: "Creador y comisionado de la liga" },
    oneLiner: { en: "A fantasy-football draft engine and league site with opponent simulations, ESPN integration and a scheduled weekly newsletter.", es: "Un motor de draft y sitio de fantasy football con simulaciones de rivales, integración de ESPN y un boletín semanal programado." },
    facts: [{ value: "12", label: { en: "league managers", es: "managers en la liga" } }, { value: "10", label: { en: "seasons of league history", es: "temporadas de historia" } }],
    metricNote: { en: "Historical project snapshot: 11 September 2026. Current scheduled-job operation is not represented by these figures.", es: "Corte histórico: 11 de septiembre de 2026. Estas cifras no acreditan la operación actual de tareas programadas." },
    links: [{ href: "https://bandofbrothers-seven.vercel.app", label: { en: "Visit the league site", es: "Ver el sitio de la liga" } }],
    stack: ["Python", "ESPN API", "Node.js", "Vercel Functions", "PostgreSQL"],
    caseStudy: {
      problem: { en: "Running a fantasy league involves a live draft, years of history and a new story every week. I wanted useful draft decisions and a shared league home, with numbers that stay correct when the commentary changes.", es: "Administrar una liga implica un draft en vivo, años de historia y una nueva historia cada semana. Quería decisiones útiles y un espacio común, con cifras que sigan correctas al cambiar el comentario." },
      constraints: { en: ["Use the live ESPN board and historical league results.", "Keep numeric facts separate from editorial wording.", "Make scheduled issues reviewable before publication."], es: ["Usar el tablero en vivo de ESPN y resultados históricos.", "Separar hechos numéricos de la redacción editorial.", "Permitir revisar los números programados antes de publicarlos."] },
      decisions: [
        { title: { en: "Rank a pick against the next available option", es: "Evaluar el pick contra la siguiente opción" }, why: { en: "The draft engine considers value over the next available player and simulates opponents' tendencies, rather than treating a global player ranking as the whole decision.", es: "El motor considera el valor sobre el siguiente jugador disponible y simula tendencias de los rivales, en lugar de usar únicamente un ranking general." } },
        { title: { en: "Protect facts when prose changes", es: "Proteger los hechos al cambiar la redacción" }, why: { en: "The weekly publishing workflow prepares a pull request. Consistency checks keep the underlying numbers fixed while the issue's wording is rewritten.", es: "El flujo semanal prepara un pull request. Las verificaciones mantienen las cifras originales mientras se reescribe el texto del boletín." } },
      ],
      outcome: { en: "Built the draft-night dashboard, draft reports, a ten-season history, weekly picks and newsletter tooling for the league I run. The live site offers a public example of the product; scheduled publishing is a separate operational responsibility.", es: "Construí el tablero del draft, reportes, historia de diez temporadas, pronósticos semanales y herramientas editoriales para mi liga. El sitio muestra el producto; la publicación programada es una responsabilidad operativa separada." },
      evidence: { en: ["Public league website.", "Documented draft model, live ESPN integration and weekly publishing workflow in the project source."], es: ["Sitio público de la liga.", "Modelo de draft, integración de ESPN y flujo editorial documentados en el proyecto."] },
    },
  },
  {
    slug: "la-red-de-casa", title: { en: "La Red de Casa", es: "La Red de Casa" }, status: "live",
    period: { en: "2026", es: "2026" }, role: { en: "Full-stack developer", es: "Desarrollador full-stack" },
    oneLiner: { en: "A household scheduling app for trips, cars and drivers, with parent approval, recurring bookings and double-booking prevention.", es: "Una app familiar para traslados, autos y choferes, con aprobación de los papás, reservas recurrentes y prevención de conflictos." },
    facts: [{ value: "Web + API", label: { en: "separate application services", es: "servicios separados" } }],
    metricNote: { en: "Implementation and original delivery are documented. A walkthrough is available on request; the public entry did not complete loading in the October 20 check.", es: "La implementación y entrega original están documentadas. Puedo mostrarla en una llamada; el acceso público no terminó de cargar en la revisión del 20 de octubre." },
    links: [], stack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Render", "Vercel"],
    caseStudy: {
      problem: { en: "A family coordinated trips, drivers and cars through scattered messages. A useful schedule needs to express who can request a trip, who approves it and whether a vehicle or driver is already assigned.", es: "Una familia coordinaba traslados, choferes y autos por mensajes dispersos. Una agenda útil necesita expresar quién solicita, quién aprueba y si el recurso ya está asignado." },
      constraints: { en: ["Make the main workflow usable on a phone.", "Require parent approval and prevent conflicting bookings.", "Handle edits and notifications without spamming the household."], es: ["Hacer utilizable el flujo principal desde el celular.", "Exigir aprobación de los papás y evitar reservas conflictivas.", "Gestionar cambios y avisos sin saturar a la familia."] },
      decisions: [
        { title: { en: "Model the approval, not just the calendar", es: "Modelar la aprobación, además del calendario" }, why: { en: "A booking is a workflow with request, review and assignment. Permissions and conflict checks belong in the service boundary, with the interface reflecting the saved state.", es: "Una reserva es un flujo de solicitud, revisión y asignación. Permisos y conflictos pertenecen al servicio; la interfaz refleja el estado guardado." } },
        { title: { en: "Make notifications bounded", es: "Limitar las notificaciones" }, why: { en: "Editing a trip should not trigger repeated noisy messages. The project includes notification rate limits and recovery/error handling alongside the scheduling features.", es: "Editar un traslado no debe generar mensajes repetidos. El proyecto incluye límites de notificaciones y recuperación de errores junto a las funciones de agenda." } },
      ],
      outcome: { en: "Delivered an installable web app, a separate API, household onboarding guidance and a deployment runbook. This case preserves the engineering evidence even when an external demo is unavailable.", es: "Entregué una app web instalable, API independiente, guía de incorporación y manual de despliegue. Este caso conserva la evidencia técnica aunque la demo externa no esté disponible." },
      evidence: { en: ["Implementation, onboarding and deployment documentation.", "Documented permission, conflict and notification behavior. Request a guided walkthrough."], es: ["Implementación, incorporación y despliegue documentados.", "Comportamiento de permisos, conflictos y notificaciones documentado. Puedo mostrarla en una llamada."] },
    },
  },
];
