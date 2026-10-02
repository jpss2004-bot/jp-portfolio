import type { Locale } from "@/data/i18n";
import { ui } from "@/data/ui";
import styles from "./SystemVisual.module.css";

export type SystemKind = "verifaid" | "pipelines";

const copy = {
  en: {
    verifaid: {
      title: "From a document to a defensible decision",
      source: "Corporate documents + powers of attorney",
      sourceNote: "Preserve the original. Read the document and cross-check the registry.",
      result: "Who can sign, and within what limits?",
      resultNote: "A proposed conclusion carries its evidence all the way to review.",
      evidence: "Required for every finding",
      fields: ["Document", "Version", "Page", "Quoted excerpt"],
      gate: "Human approval",
      gateNote: "A named reviewer records the rationale. A second person approves.",
      held: "Missing evidence → hold for review",
      caption: "System diagram. Sources stay attached to the conclusion; approval stays with people.",
    },
    pipelines: {
      title: "An archive becomes a verifiable delivery",
      source: "Original archive",
      sourceNote: "Reconcile the index, plan the folders, copy the files. Leave originals untouched.",
      read: "Choose how to read each page",
      text: "Legible text",
      textNote: "Read the text layer",
      scan: "Scanned page",
      scanNote: "Render → Claude vision",
      extract: "Extract structured fields",
      extractNote: "Batch processing; work can stop and resume.",
      gate: "Verify before delivery",
      gateNote: "Compare file hashes and reconcile the folder tree, plan and workbook.",
      result: "Organized files + linked workbook",
      resultNote: "Two delivered archives: 13,288 documents and 903 notarial records.",
      caption: "System diagram. Copy-only processing, two reading paths, one verified output.",
    },
  },
  es: {
    verifaid: {
      title: "Del documento a una decisión verificable",
      source: "Documentos societarios + poderes",
      sourceNote: "Preservar el original. Leer el documento y contrastar con el registro.",
      result: "¿Quién puede firmar y con qué límites?",
      resultNote: "La conclusión propuesta conserva su evidencia hasta la revisión.",
      evidence: "Cada hallazgo requiere",
      fields: ["Documento", "Versión", "Página", "Fragmento citado"],
      gate: "Aprobación humana",
      gateNote: "Un revisor identificado registra su criterio. Una segunda persona aprueba.",
      held: "Falta evidencia → pasa a revisión",
      caption: "Diagrama del sistema. Las fuentes acompañan la conclusión; las personas aprueban.",
    },
    pipelines: {
      title: "Del archivo a una entrega verificable",
      source: "Archivo original",
      sourceNote: "Conciliar el índice, planear carpetas y copiar archivos. Conservar los originales.",
      read: "Elegir cómo leer cada página",
      text: "Texto legible",
      textNote: "Leer la capa de texto",
      scan: "Página escaneada",
      scanNote: "Renderizar → Claude visión",
      extract: "Extraer campos estructurados",
      extractNote: "Procesamiento por lotes; se puede detener y reanudar.",
      gate: "Verificar antes de entregar",
      gateNote: "Comparar hashes y conciliar árbol de carpetas, plan y libro de trabajo.",
      result: "Archivos organizados + libro con ligas",
      resultNote: "Dos archivos entregados: 13,288 documentos y 903 registros notariales.",
      caption: "Diagrama del sistema. Solo copias, dos rutas de lectura y una salida verificada.",
    },
  },
};

/** Authored system explanations, never presented as screenshots of private apps. */
export function SystemVisual({ kind, locale, className = "", detailed = false }: { kind: SystemKind; locale: Locale; className?: string; detailed?: boolean }) {
  const t = copy[locale][kind];
  const v = copy[locale].verifaid;
  const p = copy[locale].pipelines;
  return (
    <figure className={`shot media-frame ${styles.figure} ${className}`}>
      <div className={styles.sheet}>
        <p className={styles.title}>{t.title}</p>
        {kind === "verifaid" ? (
            <div className={styles.flow}>
              <div className={styles.node}><strong>{v.source}</strong>{detailed ? <p>{v.sourceNote}</p> : null}</div>
              <div className={styles.evidence}>
                <p>{v.evidence}</p>
                <ul>{v.fields.map((field) => <li key={field}>{field}</li>)}</ul>
              </div>
              <div className={styles.node}><strong>{v.result}</strong>{detailed ? <p>{v.resultNote}</p> : null}</div>
              <div className={`${styles.node} ${styles.gate}`}><strong>{v.gate}</strong><p>{v.gateNote}</p></div>
              <p className={styles.hold}>{v.held}</p>
            </div>
        ) : (
            <div className={styles.flow}>
              <div className={styles.node}><strong>{p.source}</strong>{detailed ? <p>{p.sourceNote}</p> : null}</div>
              <div className={styles.readers}>
                <p>{p.read}</p>
                <div className={styles.branches}>
                  <div><strong>{p.text}</strong><p>{p.textNote}</p></div>
                  <div><strong>{p.scan}</strong><p>{p.scanNote}</p></div>
                </div>
              </div>
              <div className={styles.node}><strong>{p.extract}</strong>{detailed ? <p>{p.extractNote}</p> : null}</div>
              <div className={`${styles.node} ${styles.gate}`}><strong>{p.gate}</strong><p>{p.gateNote}</p></div>
              <div className={styles.output}><strong>{p.result}</strong>{detailed ? <p>{p.resultNote}</p> : null}</div>
            </div>
        )}
        {detailed ? (
          <ol className={styles.stages} aria-label={locale === "es" ? "Etapas del pipeline" : "Pipeline stages"}>
            {ui[locale].diagram[kind].map((stage) => <li key={stage}>{stage}</li>)}
          </ol>
        ) : null}
      </div>
      <figcaption>{t.caption}</figcaption>
    </figure>
  );
}
