import type { L } from "./content";

export type SystemStep = { name: L<string>; technology: string; detail: L<string> };
export type Annotation = { x: number; y: number; text: L<string> };
export type Milestone = { when: L<string>; what: L<string> };
export type WalkScene = { src: string; fx: number; fy: number; zoom: number; text: L<string> };
export type WorkStory = { headline: L<string>; ownership: L<string>; decision: L<string>; steps: SystemStep[]; annotations?: Annotation[]; timeline?: Milestone[]; walkthrough?: { width: number; height: number; scenes: WalkScene[] } };

export const workStories: Record<string, WorkStory> = {
  checkwise: {
    walkthrough: { width: 1600, height: 900, scenes: [
      { src: "/projects/checkwise/provider-upload.webp", fx: 59, fy: 43, zoom: 1.55, text: { en: "A provider starts from a specific obligation, never from a blank upload form.", es: "El proveedor parte de una obligación concreta, nunca de un formulario en blanco." } },
      { src: "/projects/checkwise/calendar.webp", fx: 68, fy: 72, zoom: 1.5, text: { en: "Every provider by month. The colour marks the most critical state.", es: "Cada proveedor por mes. El color marca el estado más crítico." } },
      { src: "/projects/checkwise/reviewer.webp", fx: 34, fy: 62, zoom: 1.6, text: { en: "Prevalidation explains what it read: here, the tax ID does not match the provider.", es: "La prevalidación explica qué leyó: aquí, el RFC no coincide con el proveedor." } },
      { src: "/projects/checkwise/reviewer.webp", fx: 73, fy: 86, zoom: 1.6, text: { en: "The reviewer decides. Approving against a warning requires a written justification.", es: "El revisor decide. Aprobar pese a una advertencia exige una justificación escrita." } },
      { src: "/projects/checkwise/client-dashboard.webp", fx: 50, fy: 40, zoom: 1.25, text: { en: "The client sees one verdict for the whole portfolio and where the risk sits.", es: "El cliente ve un veredicto para todo el portafolio y dónde está el riesgo." } },
    ] },
    annotations: [
      { x: 13, y: 39, text: { en: "One verdict for the whole provider portfolio.", es: "Un veredicto para todo el portafolio de proveedores." } },
      { x: 55, y: 50.5, text: { en: "Providers by state: current, in process, at risk.", es: "Proveedores por estado: al día, en proceso, en riesgo." } },
      { x: 30, y: 71, text: { en: "What needs attention first, ranked by the cost of waiting.", es: "Lo que requiere atención primero, según el costo de esperar." } },
      { x: 76, y: 81, text: { en: "Exposure by authority: IMSS, INFONAVIT, STPS and SAT.", es: "Exposición por autoridad: IMSS, INFONAVIT, STPS y SAT." } },
    ],
    timeline: [
      { when: { en: "May 2026", es: "may 2026" }, what: { en: "Development starts at LegalShelf.", es: "Inicia el desarrollo en LegalShelf." } },
      { when: { en: "Jun – Sep 2026", es: "jun – sep 2026" }, what: { en: "667 pull requests merged behind test gates.", es: "667 pull requests fusionados tras verificaciones." } },
      { when: { en: "11 Sep 2026", es: "11 sep 2026" }, what: { en: "7 client companies, about 20,000 documents processed.", es: "7 empresas cliente, cerca de 20,000 documentos procesados." } },
      { when: { en: "19 Oct 2026", es: "19 oct 2026" }, what: { en: "Release: contract-based workflows and calendars.", es: "Liberación: flujos y calendarios por contrato." } },
    ],
    headline: { en: "A document becomes a decision you can trace.", es: "De un documento a una decisión que puedes rastrear." },
    ownership: { en: "Data model, backend APIs, review workflows, frontend and delivery.", es: "Modelo de datos, APIs, flujos de revisión, frontend y entrega." },
    decision: { en: "Model the obligation and contract first. Every upload, period and review then has a place in the system.", es: "Modelar primero la obligación y el contrato. Así cada carga, periodo y revisión tiene un lugar en el sistema." },
    steps: [
      { name: { en: "Upload", es: "Carga" }, technology: "Next.js", detail: { en: "A provider starts from an obligation and period. Contract-based workflows keep the upload attached to the right context.", es: "El proveedor parte de una obligación y periodo. Los flujos por contrato conservan el contexto correcto de la carga." } },
      { name: { en: "Validate", es: "Validación" }, technology: "FastAPI", detail: { en: "The API checks identity, scope and document signals, and prepares a reading that can be inspected by a reviewer.", es: "La API verifica identidad, alcance y señales del documento, y prepara una lectura que el revisor puede inspeccionar." } },
      { name: { en: "Relate", es: "Relaciones" }, technology: "PostgreSQL", detail: { en: "Client, provider, contract, institution and cycle form a shared data model for calendars, reporting and document state.", es: "Cliente, proveedor, contrato, institución y ciclo forman un modelo compartido para calendarios, reportes y estados." } },
      { name: { en: "Review", es: "Revisión" }, technology: "Human + rules", detail: { en: "Critical decisions require authorized review. Configured objective rules and AI readings have distinct responsibilities.", es: "Las decisiones críticas requieren revisión autorizada. Las reglas objetivas configuradas y las lecturas de IA tienen responsabilidades distintas." } },
      { name: { en: "Trace", es: "Trazabilidad" }, technology: "Audit trail", detail: { en: "The result remains attached to the evidence, period, decision and responsible person, rather than becoming another isolated spreadsheet.", es: "El resultado conserva su evidencia, periodo, decisión y responsable, en lugar de convertirse en otra hoja aislada." } },
    ],
  },
  flaregrain: {
    annotations: [
      { x: 40, y: 16.5, text: { en: "A plain-language question starts the run.", es: "Una pregunta en lenguaje sencillo inicia el proceso." } },
      { x: 57, y: 51, text: { en: "Every sentence cites its NASA report page.", es: "Cada oración cita su página de un reporte de la NASA." } },
      { x: 39.5, y: 64.5, text: { en: "The checker reports what it kept and removed.", es: "El verificador reporta qué conservó y qué eliminó." } },
      { x: 37, y: 78, text: { en: "Team notes are labelled as not model text.", es: "Las notas del equipo se etiquetan como texto no generado." } },
    ],
    timeline: [
      { when: { en: "9 Nov 2026", es: "9 nov 2026" }, what: { en: "Team formed; research briefs and architecture maps.", es: "Equipo formado; resúmenes de investigación y mapas de arquitectura." } },
      { when: { en: "13 Nov", es: "13 nov" }, what: { en: "Kickoff: scope and ownership agreed.", es: "Arranque: alcance y responsabilidades acordados." } },
      { when: { en: "14 Nov", es: "14 nov" }, what: { en: "Build day: real NASA data, Ask and Compare.", es: "Día de construcción: datos reales de la NASA, Ask y Compare." } },
      { when: { en: "15 Nov", es: "15 nov" }, what: { en: "User test, pitch and submission.", es: "Prueba con usuarios, presentación y entrega." } },
    ],
    headline: { en: "A NASA answer you can check, built in 48 hours.", es: "Una respuesta de la NASA que puedes comprobar, hecha en 48 horas." },
    ownership: { en: "Led a team of four: product direction, web interface, AI integration and the pitch.", es: "Lideré un equipo de cuatro: dirección de producto, interfaz web, integración de IA y la presentación." },
    decision: { en: "Let the model write, and let a rule-based checker remove any sentence its NASA source does not support.", es: "El modelo escribe y un verificador basado en reglas elimina cualquier oración que su fuente de la NASA no respalde." },
    steps: [],
  },
  neyvu: {
    walkthrough: { width: 1280, height: 800, scenes: [
      { src: "/projects/neyvu/source.png", fx: 50, fy: 18, zoom: 1.5, text: { en: "A saved course source, with the date it was collected.", es: "Una fuente guardada del curso, con la fecha en que se recopiló." } },
      { src: "/projects/neyvu/source.png", fx: 42, fy: 74, zoom: 1.5, text: { en: "The original text stays intact. Neyvu does not collect submission status.", es: "El texto original se conserva. Neyvu no recopila el estado de entrega." } },
      { src: "/projects/neyvu/answer.png", fx: 72, fy: 30, zoom: 1.5, text: { en: "A question asked against that source.", es: "Una pregunta sobre esa fuente." } },
      { src: "/projects/neyvu/answer.png", fx: 57, fy: 60, zoom: 1.55, text: { en: "The answer cites the saved source version it used.", es: "La respuesta cita la versión guardada de la fuente que utilizó." } },
      { src: "/projects/neyvu/answer.png", fx: 45, fy: 90, zoom: 1.5, text: { en: "Each answer is scoped to one course.", es: "Cada respuesta se limita a un curso." } },
    ] },
    annotations: [
      { x: 52, y: 15, text: { en: "Demo data is labelled; it is never a student account.", es: "Los datos de demostración se etiquetan; nunca son una cuenta real." } },
      { x: 73, y: 28, text: { en: "A question about a saved course source.", es: "Una pregunta sobre una fuente guardada del curso." } },
      { x: 74.5, y: 60.5, text: { en: "The citation opens the saved source version.", es: "La cita abre la versión guardada de la fuente." } },
      { x: 36, y: 91, text: { en: "Answers are scoped to one course.", es: "Las respuestas se limitan a un curso." } },
    ],
    timeline: [
      { when: { en: "Sep 2026", es: "sep 2026" }, what: { en: "Build starts: course workspace and source reader.", es: "Inicio: espacio por curso y lector de fuentes." } },
      { when: { en: "Oct 2026", es: "oct 2026" }, what: { en: "Working pilot with a public access page.", es: "Piloto funcional con página pública de acceso." } },
      { when: { en: "Now", es: "Ahora" }, what: { en: "Onboarding pilot students.", es: "Incorporación de estudiantes al piloto." } },
      { when: { en: "Next", es: "Siguiente" }, what: { en: "Physical-phone and new-student acceptance.", es: "Aceptación en teléfonos físicos y con nuevos estudiantes." } },
    ],
    headline: { en: "Your courses. Their sources. One place to think.", es: "Tus cursos. Sus fuentes. Un espacio para pensar." },
    ownership: { en: "Product direction, full-stack app, desktop collection, local AI and release checks.", es: "Dirección de producto, app full-stack, recopilación de escritorio, IA local y verificaciones." },
    decision: { en: "Keep the workspace useful while AI is offline. Queue the question and preserve the student's work.", es: "Mantener útil el espacio cuando la IA no está disponible. Encolar la pregunta y conservar el trabajo." },
    steps: [
      { name: { en: "Collect", es: "Recopilar" }, technology: "Companion", detail: { en: "The student signs into Moodle on a paired desktop. Collection gaps and timestamps stay visible.", es: "El estudiante inicia sesión en Moodle desde un escritorio vinculado. Las fechas y faltantes de recopilación siguen visibles." } },
      { name: { en: "Preserve", es: "Conservar" }, technology: "PostgreSQL", detail: { en: "Tenant-scoped storage keeps original files and immutable source versions separate for each student.", es: "El almacenamiento aislado conserva archivos originales y versiones inmutables para cada estudiante." } },
      { name: { en: "Queue", es: "Encolar" }, technology: "Leased jobs", detail: { en: "A hosted job queue bridges the web workspace and local worker. Notes and planning remain available while an answer waits.", es: "Una cola alojada conecta el espacio web y el worker local. Notas y planificación siguen disponibles mientras espera la respuesta." } },
      { name: { en: "Reason", es: "Procesar" }, technology: "Qwen + SymPy", detail: { en: "A local Mac processes the selected material. Exact-math and source checks support the model's study assistance.", es: "Una Mac local procesa el material seleccionado. Las verificaciones de matemáticas y fuentes respaldan la ayuda del modelo." } },
      { name: { en: "Cite", es: "Citar" }, technology: "Versioned evidence", detail: { en: "The conversation links back to the saved source. Official deadlines stay separate from personal study plans and AI suggestions.", es: "La conversación enlaza a la fuente guardada. Las fechas oficiales se separan de planes personales y sugerencias de IA." } },
    ],
  },
  verifaid: {
    headline: { en: "Every conclusion has a source. Every approval has an owner.", es: "Cada conclusión tiene fuente. Cada aprobación, responsable." },
    ownership: { en: "Document pipeline, source citations, tenant isolation and approval workflows.", es: "Pipeline documental, citas, aislamiento y flujos de aprobación." },
    decision: { en: "Require document, version, page and excerpt before a conclusion reaches the reviewer.", es: "Exigir documento, versión, página y fragmento antes de presentar una conclusión al revisor." },
    steps: [
      { name: { en: "Preserve", es: "Preservar" }, technology: "Original files", detail: { en: "Preserve the original corporate document and its version. A failed reading can be retried without overwriting its history.", es: "Conservar el documento corporativo y su versión. Una lectura fallida puede repetirse sin sobrescribir su historial." } },
      { name: { en: "Extract", es: "Extraer" }, technology: "Python + Claude", detail: { en: "Read clauses, people and powers with citations to the actual page position, including instrument-number and transcription checks.", es: "Leer cláusulas, personas y facultades con citas a la posición real de la página, verificando instrumentos y transcripción." } },
      { name: { en: "Compare", es: "Contrastar" }, technology: "Registry + clauses", detail: { en: "Compare the supporting documents and registry evidence. Signing limits come from the clause, including amounts written in words.", es: "Contrastar documentos y evidencia del registro. Los límites de firma provienen de la cláusula, incluidos montos escritos con letra." } },
      { name: { en: "Approve", es: "Aprobar" }, technology: "Two-person review", detail: { en: "An identified reviewer records the rationale. A second authorized person approves; the model does not grant itself approval power.", es: "Un revisor identificado registra la justificación. Una segunda persona autorizada aprueba; el modelo no se concede esa facultad." } },
      { name: { en: "Issue", es: "Emitir" }, technology: "Versioned PDF", detail: { en: "Approved-opinion PDF issuance records the responsible reviewer, version and fingerprint. Electronic signing remains a distinct release gate.", es: "La emisión del dictamen aprobado en PDF registra responsable, versión y huella. La firma electrónica sigue siendo una compuerta distinta." } },
    ],
  },
};
