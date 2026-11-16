import type { L } from "./content";

export type SystemStep = { name: L<string>; technology: string; detail: L<string> };
export type WorkStory = { headline: L<string>; ownership: L<string>; decision: L<string>; steps: SystemStep[] };

export const workStories: Record<string, WorkStory> = {
  checkwise: {
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
    headline: { en: "A NASA answer you can check, built in 48 hours.", es: "Una respuesta de la NASA que puedes comprobar, hecha en 48 horas." },
    ownership: { en: "Led a team of four: product direction, web interface, AI integration and the pitch.", es: "Lideré un equipo de cuatro: dirección de producto, interfaz web, integración de IA y la presentación." },
    decision: { en: "Let the model write, and let a rule-based checker remove any sentence its NASA source does not support.", es: "El modelo escribe y un verificador basado en reglas elimina cualquier oración que su fuente de la NASA no respalde." },
    steps: [],
  },
  neyvu: {
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
