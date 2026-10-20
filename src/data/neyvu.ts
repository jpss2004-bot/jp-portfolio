import type { Project } from "./content";

export const neyvu: Project = {
  slug: "neyvu",
  title: { en: "Neyvu", es: "Neyvu" },
  status: "pilot",
  period: { en: "Sep 2026 – present", es: "sep 2026 – presente" },
  role: { en: "Creator & full-stack developer", es: "Creador y desarrollador full-stack" },
  oneLiner: {
    en: "A course-aware AI assistant that brings Moodle material, notes and study planning into one workspace, with local inference and answers linked to saved sources.",
    es: "Un asistente de IA que reúne material de Moodle, notas y planificación de estudio en un solo espacio, con inferencia local y respuestas vinculadas a sus fuentes.",
  },
  facts: [
    { value: "Beta", label: { en: "working product · onboarding students", es: "producto funcional · incorporando estudiantes" } },
    { value: "Local", label: { en: "AI inference", es: "inferencia de IA" } },
    { value: "PostgreSQL", label: { en: "isolated student workspaces", es: "espacios aislados por estudiante" } },
  ],
  metricNote: { en: "Working pilot, onboarding users. Status reviewed 20 October 2026; no adoption or revenue claim.", es: "Piloto funcional, incorporando usuarios. Estado revisado el 20 de octubre de 2026; sin cifras de adopción o ingresos." },
  media: { type: "image", src: "/projects/neyvu/answer.png", width: 1280, height: 800, alt: { en: "Neyvu conversation with a fictional sample assignment and source citations", es: "Conversación de Neyvu con una tarea ficticia y citas a las fuentes" } },
  visuals: { primary: { kind: "image", src: "/projects/neyvu/answer.png", width: 1280, height: 800, alt: { en: "Neyvu course conversation, captured from the product with fictional demo data", es: "Conversación por curso en Neyvu, captura del producto con datos ficticios" }, caption: { en: "Actual product capture. Fictional demo course, not a student account.", es: "Captura real del producto. Curso ficticio de demostración, no una cuenta de estudiante." } } },
  links: [{ href: "https://schoolvault-beta-web.onrender.com/beta/join?lang=en", label: { en: "Explore the pilot", es: "Conocer el piloto" } }],
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Python", "Electron", "Ollama", "Qwen", "SymPy", "Render"],
  caseStudy: {
    problem: {
      en: "Course information is scattered across Moodle pages, files, announcements and personal notes. A useful study assistant needs to keep the source and its age visible, distinguish official requirements from a student's plan, and preserve work when collection or inference fails.",
      es: "La información de los cursos está repartida entre páginas de Moodle, archivos, avisos y notas personales. Un asistente útil necesita mostrar la fuente y su antigüedad, distinguir requisitos oficiales del plan personal y conservar el trabajo cuando falla la recopilación o la inferencia.",
    },
    constraints: {
      en: ["Separate every student's identity, saved sources, files and conversations.", "Students sign into Moodle themselves through a paired desktop Companion; the phone website is a separate surface.", "Run AI on a local Mac worker. The hosted workspace must remain useful when inference is unavailable.", "Never infer a submission, grade or deadline from unrelated evidence. Show missing coverage and source timestamps."],
      es: ["Separar la identidad, fuentes, archivos y conversaciones de cada estudiante.", "Cada estudiante inicia sesión en Moodle mediante un Companion de escritorio vinculado; el sitio móvil es una superficie distinta.", "Ejecutar la IA en un worker local en Mac. El espacio alojado debe seguir siendo útil cuando la inferencia no está disponible.", "No inferir entregas, calificaciones o fechas a partir de evidencia ajena. Mostrar cobertura incompleta y fechas de recopilación."],
    },
    decisions: [
      { title: { en: "Pin the evidence to the answer", es: "Fijar la evidencia de cada respuesta" }, why: { en: "Answer jobs reference immutable source versions. Updating a note later must not silently change what an earlier answer cited. AI-written study drafts stay separate from original course evidence.", es: "Las tareas de respuesta referencian versiones inmutables. Editar una nota después no debe cambiar silenciosamente la fuente citada antes. Los borradores de IA permanecen separados de la evidencia original del curso." } },
      { title: { en: "Separate the cloud workspace from local inference", es: "Separar el espacio en la nube de la inferencia local" }, why: { en: "A leased job queue connects the Render application to the local model worker. Saved notes, files and calendar remain accessible while questions wait for the worker, and a failed answer can retain a recoverable draft.", es: "Una cola con leases conecta la aplicación en Render con el worker del modelo local. Notas, archivos y calendario siguen accesibles mientras las preguntas esperan, y un fallo puede conservar un borrador recuperable." } },
      { title: { en: "Keep the student's plan separate from official dates", es: "Separar el plan personal de las fechas oficiales" }, why: { en: "A planned study day is not an assignment deadline, and saved course information may be incomplete. Those boundaries are explicit in the data model and interface rather than left to a language model to guess.", es: "Un día planeado de estudio no es una fecha de entrega, y la información guardada puede estar incompleta. Esos límites son explícitos en el modelo de datos y la interfaz, sin dejar que un modelo de lenguaje los adivine." } },
    ],
    built: {
      en: ["Designed and built the course workspace, source reader, conversations and study planning.", "Connected tenant-scoped PostgreSQL storage, original files, a paired desktop collector and local AI jobs.", "Built source-citation, exact-math, failure-recovery and release checks around the assistant."],
      es: ["Diseñé y construí el espacio por curso, lector de fuentes, conversaciones y planificación.", "Conecté PostgreSQL con aislamiento por estudiante, archivos originales, un recolector de escritorio vinculado y tareas de IA local.", "Construí verificaciones de citas, matemáticas exactas, recuperación y liberación del asistente."],
    },
    outcome: { en: "A working product with a public pilot-access page. I am onboarding pilot students. The current system combines hosted web access with a desktop Moodle collector and local AI processing; it is an independent student-built pilot, not an Acadia-operated service.", es: "Un producto funcional con una página pública para solicitar acceso al piloto. Estoy incorporando estudiantes. El sistema combina acceso web alojado, recopilación de Moodle desde escritorio y procesamiento local de IA; es un piloto independiente, no un servicio operado por Acadia." },
    evidence: { en: ["Public pilot page and a responsive web workspace.", "Product screenshots below use explicitly fictional demonstration material.", "Source versions, tenant isolation, queued work and recovery are represented in the implementation and release records."], es: ["Página pública del piloto y espacio web responsivo.", "Las capturas usan material de demostración explícitamente ficticio.", "Versiones de fuentes, aislamiento, colas y recuperación están representados en la implementación y los registros de liberación."] },
    next: { en: ["Onboard pilot students and measure the first successful course setup.", "Complete physical-phone and new-student acceptance; keep known academic gaps visible."], es: ["Incorporar estudiantes y medir la primera configuración exitosa de un curso.", "Completar la aceptación en teléfonos físicos y con nuevos estudiantes; mantener visibles las limitaciones académicas."] },
    gallery: [{ src: "/projects/neyvu/source.png", width: 1280, height: 800, alt: { en: "A saved fictional assignment in Neyvu's source reader", es: "Tarea ficticia guardada en el lector de fuentes de Neyvu" }, caption: { en: "Source reader: the original material stays available beside the conversation. Fictional demo content.", es: "Lector de fuentes: el material original sigue disponible junto a la conversación. Contenido ficticio." } }],
  },
};
