import type { Project } from "./content";

/**
 * Flaregrain: NASA Space Apps Halifax 2026, "Flame in Freefall".
 * Figures come from the team's submission page and the repository's
 * ENGINEERING.md as of 15 November 2026.
 */
export const flaregrain: Project = {
  slug: "flaregrain",
  title: { en: "Flaregrain", es: "Flaregrain" },
  status: "submitted",
  period: { en: "Nov 2026 · 48-hour build", es: "nov 2026 · 48 horas" },
  role: { en: "Team lead: product, web interface and AI integration", es: "Líder del equipo: producto, interfaz web e integración de IA" },
  oneLiner: {
    en: "Ask a plain-language question about NASA's microgravity fire experiments and get an answer you can check. Every sentence links to the NASA page behind it. Built by a team of four at NASA Space Apps Halifax.",
    es: "Haz una pregunta sencilla sobre los experimentos de fuego en microgravedad de la NASA y recibe una respuesta que puedes comprobar. Cada oración enlaza a la página de la NASA que la respalda. Hecho por un equipo de cuatro en NASA Space Apps Halifax.",
  },
  facts: [
    { value: "48 h", label: { en: "from kickoff to submission", es: "del arranque a la entrega" } },
    { value: "24", label: { en: "NASA investigations ingested", es: "investigaciones de la NASA procesadas" } },
    { value: "24,573", label: { en: "values normalized from 2,009 table rows", es: "valores normalizados de 2,009 filas" } },
    { value: "4", label: { en: "people on the team I led", es: "personas en el equipo que lideré" } },
  ],
  metricNote: { en: "Figures from the team's submission and technical write-up, 15 November 2026.", es: "Cifras de la entrega del equipo y su documento técnico, 15 de noviembre de 2026." },
  media: { type: "image", src: "/projects/flaregrain/ask.webp", width: 1920, height: 1200, alt: { en: "Flaregrain Ask page: an AI summary where each sentence cites a NASA report page", es: "Página Ask de Flaregrain: un resumen de IA donde cada oración cita una página de un reporte de la NASA" } },
  visuals: {
    primary: {
      kind: "video", src: "/projects/flaregrain/demo.mp4", poster: "/projects/flaregrain/demo-poster.webp", width: 1920, height: 1080,
      alt: { en: "Flaregrain demo: asking a question, reading the cited answer and comparing two experiments", es: "Demo de Flaregrain: una pregunta, la respuesta con citas y la comparación de dos experimentos" },
      caption: { en: "The 29-second demo submitted to NASA Space Apps. Screen recording of the live site, with sound.", es: "El demo de 29 segundos entregado a NASA Space Apps. Grabación de pantalla del sitio en línea, con sonido." },
    },
  },
  links: [
    { href: "https://flaregrain-submission.vercel.app", label: { en: "Open Flaregrain", es: "Abrir Flaregrain" } },
    { href: "https://github.com/jpss2004-bot/flaregrain-submission", label: { en: "Repository", es: "Repositorio" } },
    { href: "https://github.com/jpss2004-bot/flaregrain-submission/blob/main/flaregrain/ENGINEERING.md", label: { en: "Technical write-up", es: "Documento técnico" } },
    { href: "https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/", label: { en: "The NASA challenge", es: "El reto de la NASA" } },
  ],
  stack: ["Python", "Node.js", "HTML, CSS and JavaScript", "Three.js", "Ollama", "qwen3:4b", "BM25 retrieval", "Playwright", "Vercel", "Tailscale"],
  team: [
    { name: "José Pablo Sámano Suárez", role: { en: "Team lead. Product direction, web interface, AI integration and the pitch.", es: "Líder del equipo. Dirección de producto, interfaz web, integración de IA y la presentación." } },
    { name: "Grish Acharya", role: { en: "Visual design and styling.", es: "Diseño visual y estilos." } },
    { name: "Nora Forghani", role: { en: "Fire beyond Earth pages, front-end review and user testing.", es: "Páginas de Fire beyond Earth, revisión de frontend y pruebas con usuarios." } },
    { name: "Osman Khurram", role: { en: "Data intake and checking NASA values against the source reports.", es: "Ingesta de datos y verificación de valores de la NASA contra los reportes originales." } },
  ],
  caseStudy: {
    problem: {
      en: "NASA has years of controlled experiments on how fires start, spread and go out in microgravity, but the evidence is scattered across 24 investigations, about 2,000 table rows and separate report PDFs, and the sources sometimes disagree. The \"Flame in Freefall\" challenge asked for a dashboard that uses AI to summarize and interpret those results for space fire safety. The risk in any such tool is that it blurs what NASA measured with what a model wrote.",
      es: "La NASA tiene años de experimentos controlados sobre cómo inicia, se propaga y se apaga el fuego en microgravedad, pero la evidencia está repartida en 24 investigaciones, cerca de 2,000 filas de tablas y reportes en PDF, y las fuentes a veces no coinciden. El reto \"Flame in Freefall\" pedía un tablero que usara IA para resumir e interpretar esos resultados para la seguridad contra incendios en el espacio. El riesgo de una herramienta así es confundir lo que la NASA midió con lo que escribió un modelo.",
    },
    constraints: {
      en: [
        "Two days on site, 14 and 15 November 2026, with a fixed submission deadline.",
        "Four people who had not built together before, each working from their own computer and their own AI coding assistant.",
        "No paid AI service: the model had to be open and run on a team member's computer.",
        "No NASA value could come from a model. Each one had to trace to a report page or table.",
      ],
      es: [
        "Dos días presenciales, 14 y 15 de noviembre de 2026, con una hora de entrega fija.",
        "Cuatro personas que no habían construido juntas, cada una desde su computadora y con su propio asistente de programación.",
        "Sin servicios de IA de pago: el modelo debía ser abierto y correr en la computadora de un integrante.",
        "Ningún valor de la NASA podía salir de un modelo. Cada uno debía rastrearse a una página o tabla de un reporte.",
      ],
    },
    decisions: [
      {
        title: { en: "Recruit for the gaps, then scope before the weekend", es: "Reclutar para cubrir los huecos y definir el alcance antes del fin de semana" },
        why: {
          en: "I recruited the team around the skills the challenge needed, then spent the week before the event on research briefs, architecture maps and a rehearsal dashboard. By Saturday morning the team was choosing between concrete options rather than starting from a blank page.",
          es: "Recluté al equipo según las habilidades que pedía el reto y dediqué la semana previa a resúmenes de investigación, mapas de arquitectura y un tablero de ensayo. El sábado por la mañana el equipo elegía entre opciones concretas en lugar de empezar de cero.",
        },
      },
      {
        title: { en: "Hand work off through GitHub, not through chat", es: "Entregar el trabajo por GitHub, no por chat" },
        why: {
          en: "Each handoff was an issue, a branch and review evidence, so anyone could continue from the record on a different computer with a fresh agent session. Ownership was split explicitly: one person owned structure and logic, another owned the look, and markup carried shared class names so the two never collided.",
          es: "Cada entrega fue un issue, una rama y evidencia de revisión, para que cualquiera pudiera continuar desde el registro en otra computadora con una sesión nueva del agente. La responsabilidad se dividió de forma explícita: una persona llevaba estructura y lógica, otra el aspecto visual, y el marcado usaba nombres de clase compartidos para no chocar.",
        },
      },
      {
        title: { en: "Let the model write, and let a checker decide what stays", es: "El modelo escribe y un verificador decide qué se queda" },
        why: {
          en: "The model may only use numbered facts from the sources it was given. A rule-based checker removes any sentence with a wrong number, a wrong record or no citation, and the page says how many it removed. Across 139 saved explanations it kept 492 sentences and removed 270.",
          es: "El modelo solo puede usar hechos numerados de las fuentes que recibió. Un verificador basado en reglas elimina cualquier oración con un número equivocado, un registro equivocado o sin cita, y la página indica cuántas eliminó. En 139 explicaciones guardadas conservó 492 oraciones y eliminó 270.",
        },
      },
      {
        title: { en: "Keyword retrieval that ranks the same way every time", es: "Recuperación por palabras clave que siempre ordena igual" },
        why: {
          en: "The public Ask page ranks NASA records and report pages with BM25 and skips contents and reference pages. The same question always returns the same ranking, which made answers reproducible for judges and made regressions easy to catch in browser checks.",
          es: "La página pública Ask ordena registros y páginas de reportes de la NASA con BM25 y omite índices y referencias. La misma pregunta siempre devuelve el mismo orden, lo que hizo las respuestas reproducibles para los jueces y facilitó detectar regresiones en las pruebas de navegador.",
        },
      },
      {
        title: { en: "Degrade to saved evidence when the model is down", es: "Mostrar evidencia guardada cuando el modelo no responde" },
        why: {
          en: "The live model runs on a team computer behind a secure tunnel. Live answers are capped per hour and cached, and when the model is unavailable the page shows the saved explanation and the evidence instead of an error.",
          es: "El modelo en vivo corre en la computadora de un integrante detrás de un túnel seguro. Las respuestas en vivo tienen límite por hora y caché, y cuando el modelo no está disponible la página muestra la explicación guardada y la evidencia en lugar de un error.",
        },
      },
    ],
    built: {
      en: [
        "Intake: downloads NASA's PSI combustion area and reports, checksums each file and normalizes 24,573 values, flagging 575. Thirteen records were checked by hand against the original report pages.",
        "Retrieval: 1,595 report passages from 9 NASA documents. The rules-only ranking measured recall@5 of 0.850 over 108 scored question wordings.",
        "Answers: qwen3:4b through Ollama writes sentences that must cite record fields; the checker filters them. A stress test of 343,758 synthetic sentences found no misses for wrong numbers or wrong records, with a known gap for invented details.",
        "Site: a Node.js server with plain HTML, CSS and JavaScript on Vercel. Ask, Compare, Evidence and Fire beyond Earth, plus a System design page that reports these measurements.",
        "Process: Claude Code and Codex wrote most of the code under the team's direction and review, and ran audits, browser checks and regression checks. Commits written this way carry a co-author trailer.",
      ],
      es: [
        "Ingesta: descarga el área de combustión de PSI de la NASA y sus reportes, calcula la huella de cada archivo y normaliza 24,573 valores, con 575 marcados. Trece registros se verificaron a mano contra las páginas originales.",
        "Recuperación: 1,595 pasajes de 9 documentos de la NASA. El ordenamiento basado en reglas midió recall@5 de 0.850 sobre 108 redacciones de preguntas evaluadas.",
        "Respuestas: qwen3:4b mediante Ollama escribe oraciones que deben citar campos de los registros; el verificador las filtra. Una prueba de estrés con 343,758 oraciones sintéticas no encontró fallas en números o registros equivocados, con una limitación conocida para detalles inventados.",
        "Sitio: un servidor Node.js con HTML, CSS y JavaScript sin framework, en Vercel. Ask, Compare, Evidence y Fire beyond Earth, más una página System design que reporta estas mediciones.",
        "Proceso: Claude Code y Codex escribieron la mayor parte del código bajo la dirección y revisión del equipo, y ejecutaron auditorías, pruebas de navegador y de regresión. Esos commits llevan una línea de coautoría.",
      ],
    },
    outcome: {
      en: "We submitted a live site, a public repository, a 29-second demo and an 11-slide pitch within the weekend. The checker also caught our own mistake: our hand-written answer to \"How long did the flame take to go out after airflow was cut?\" said the sources give no elapsed time. Sent through the model, the same question cited a page of NASA's BASS-II report we had missed, where the flame went out within 2 seconds. The checker passed the sentence, we read the page, and we corrected the site that afternoon.",
      es: "Entregamos un sitio en línea, un repositorio público, un demo de 29 segundos y una presentación de 11 diapositivas dentro del fin de semana. El verificador también detectó un error nuestro: la respuesta que escribimos a mano para \"¿Cuánto tardó la flama en apagarse tras cortar el flujo de aire?\" decía que las fuentes no daban un tiempo. Al enviar la misma pregunta al modelo, citó una página del reporte BASS-II de la NASA que habíamos pasado por alto, donde la flama se apagó en menos de 2 segundos. El verificador aprobó la oración, leímos la página y corregimos el sitio esa misma tarde.",
    },
    evidence: {
      en: [
        "Live at flaregrain-submission.vercel.app, with a public repository and technical write-up.",
        "The public site carries 13 hand-checked records; the full dataset covers 24 investigations, 2,009 table rows and 24,573 values.",
        "For a Moon base atmosphere (30% oxygen at 10.2 psi), the archive holds only 8 table rows, all from one investigation and all in microgravity. The site shows that gap rather than filling it.",
        "Model text is always labelled as an AI summary and never as NASA evidence. NASA does not endorse Flaregrain.",
      ],
      es: [
        "En línea en flaregrain-submission.vercel.app, con repositorio público y documento técnico.",
        "El sitio público incluye 13 registros verificados a mano; el conjunto completo cubre 24 investigaciones, 2,009 filas de tablas y 24,573 valores.",
        "Para la atmósfera de una base lunar (30% de oxígeno a 10.2 psi), el archivo solo tiene 8 filas, todas de una investigación y todas en microgravedad. El sitio muestra ese vacío en lugar de rellenarlo.",
        "El texto del modelo siempre se etiqueta como resumen de IA y nunca como evidencia de la NASA. La NASA no respalda Flaregrain.",
      ],
    },
    gallery: [
      {
        src: "/projects/flaregrain/ask.webp", width: 1920, height: 1200,
        alt: { en: "Ask page with a cited AI summary and the checker result", es: "Página Ask con un resumen de IA con citas y el resultado del verificador" },
        caption: { en: "Ask: the answer that corrected us. Each sentence cites a NASA page, and the checker reports what it kept and removed.", es: "Ask: la respuesta que nos corrigió. Cada oración cita una página de la NASA y el verificador reporta qué conservó y qué eliminó." },
      },
      {
        src: "/projects/flaregrain/compare.webp", width: 1920, height: 1080,
        alt: { en: "Compare page with BASS-II B1 and Saffire I-1 side by side", es: "Página Compare con BASS-II B1 y Saffire I-1 lado a lado" },
        caption: { en: "Compare: two experiments side by side, with what they share, how they differ and what the sources leave open.", es: "Compare: dos experimentos lado a lado, con lo que comparten, en qué difieren y lo que las fuentes dejan abierto." },
      },
      {
        src: "/projects/flaregrain/fire-beyond-earth.webp", width: 1920, height: 1080,
        alt: { en: "Fire beyond Earth page showing habitat atmospheres and tested coverage", es: "Página Fire beyond Earth con atmósferas de hábitats y cobertura de pruebas" },
        caption: { en: "Fire beyond Earth: seven habitat atmospheres, how many NASA tests ran near each, and what is untested.", es: "Fire beyond Earth: siete atmósferas de hábitats, cuántas pruebas de la NASA hay cerca de cada una y qué falta por probar." },
      },
      {
        src: "/projects/flaregrain/system-design.webp", width: 1920, height: 1080,
        alt: { en: "System design page with the pipeline and its measurements", es: "Página System design con el pipeline y sus mediciones" },
        caption: { en: "System design: the pipeline from NASA files to a checked sentence, with the numbers we measured.", es: "System design: el pipeline de los archivos de la NASA a una oración verificada, con las cifras que medimos." },
      },
      {
        src: "/projects/flaregrain/direction-topic-atlas.webp", width: 1920, height: 1367,
        alt: { en: "An early visual direction for the dashboard, with a topic atlas", es: "Una dirección visual temprana del tablero, con un atlas de temas" },
        caption: { en: "Design process: one of the visual directions reviewed before the event. The team chose a darker, quieter interface.", es: "Proceso de diseño: una de las direcciones visuales revisadas antes del evento. El equipo eligió una interfaz más oscura y sobria." },
      },
      {
        src: "/projects/flaregrain/architecture-data-platform.webp", width: 1920, height: 1103,
        alt: { en: "Pre-event architecture map from NASA inputs to a reviewed answer", es: "Mapa de arquitectura previo al evento, de los datos de la NASA a una respuesta revisada" },
        caption: { en: "Design process: the architecture map I prepared on 9 November for the team kickoff. The shipped system is simpler.", es: "Proceso de diseño: el mapa de arquitectura que preparé el 9 de noviembre para el arranque del equipo. El sistema entregado es más simple." },
      },
    ],
  },
};
