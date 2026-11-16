import type { CSSProperties } from "react";
import type { MockKind } from "@/data/visuals";
import m from "./Mock.module.css";

/*
 * Interface screens drawn in code for projects whose real screens are private
 * or offline. Data is fictional; each screen only shows what the tool does.
 * Everything is sized in em against a container-width font size, so a screen
 * scales as one picture.
 */

const Check = () => <svg viewBox="0 0 16 16" className={m.icon} aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Dot = ({ tone }: { tone: string }) => <i className={m.dot} style={{ "--c": tone } as CSSProperties} />;

function Verifaid({ view }: { view: number }) {
  if (view === 1) {
    return (
      <div className={`${m.app} ${m.verifaid}`}>
        <div className={m.side}><b className={m.brand}>Verifaid</b><span>Operaciones</span><span className={m.on}>Revisión</span><span>Dictámenes</span><span>Organización</span></div>
        <div className={m.main}>
          <p className={m.kicker}>OPERACIÓN 2026-0148 · SEGUNDA APROBACIÓN</p>
          <p className={m.h}>¿Puede firmar el apoderado?</p>
          <div className={m.verdict}><Check /><div><b>Sí, con límite.</b><span>Facultades para actos de administración hasta $5,000,000 MXN.</span></div></div>
          <table className={m.table}><thead><tr><th>Dato</th><th>Valor</th><th>Fuente</th></tr></thead><tbody>
            <tr><td>Instrumento</td><td>48,213</td><td><span className={m.cite}>Doc 1 · v1 · p. 2</span></td></tr>
            <tr><td>Apoderado</td><td>Laura Méndez Ortiz</td><td><span className={m.cite}>Doc 1 · v1 · p. 14</span></td></tr>
            <tr><td>Límite de firma</td><td>$5,000,000 (cinco millones)</td><td><span className={m.cite}>Doc 1 · v1 · p. 15</span></td></tr>
            <tr><td>Registro público</td><td>Folio mercantil coincide</td><td><span className={m.cite}>Doc 3 · v2 · p. 1</span></td></tr>
          </tbody></table>
          <div className={m.row}><span className={m.muted}>Revisó: A. Torres · justificación registrada</span><span className={m.grow} /><span className={m.btnGhost}>Devolver</span><span className={m.btn}>Aprobar dictamen</span></div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${m.app} ${m.verifaid}`}>
      <div className={m.side}><b className={m.brand}>Verifaid</b><span>Operaciones</span><span className={m.on}>Revisión</span><span>Dictámenes</span><span>Organización</span></div>
      <div className={m.split}>
        <div className={m.page}>
          <p className={m.pageHead}>Escritura 48,213 · Página 15</p>
          {[92, 88, 95, 70].map((w, i) => <i key={i} className={m.line} style={{ width: `${w}%` }} />)}
          <p className={m.clause}><mark>…con facultades para actos de administración hasta por la cantidad de $5,000,000.00 (cinco millones de pesos 00/100 M.N.)…</mark></p>
          {[90, 84, 93, 60, 88, 76].map((w, i) => <i key={i} className={m.line} style={{ width: `${w}%` }} />)}
        </div>
        <div className={m.panel}>
          <p className={m.kicker}>EXTRACCIÓN CON CITA</p>
          <div className={m.fact}><span>Límite de firma</span><b>$5,000,000 MXN</b><em className={m.cite}>p. 15 · resaltado</em></div>
          <div className={m.fact}><span>Escrito con letra</span><b>Coincide con la cifra</b><em className={m.ok}><Check />verificado</em></div>
          <div className={m.fact}><span>Tipo de facultad</span><b>Actos de administración</b><em className={m.cite}>p. 14</em></div>
          <div className={m.stepper}>{["Preservar", "Transcribir", "Identificar", "Comparar", "Facultades", "Límites", "Concluir"].map((s, i) => <span key={s} data-done={i < 6 || undefined}>{s}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function Pipelines({ view }: { view: number }) {
  const stages = ["Conciliar", "Planear", "Copiar", "Leer", "Extraer", "Verificar", "Entregar"];
  if (view === 1) {
    return (
      <div className={`${m.app} ${m.term}`}>
        <div className={m.console}>
          <p><span className={m.prompt}>$</span> pipeline verify --archivo notarial</p>
          <p className={m.muted}>Comparando huellas SHA-256 del origen y la copia…</p>
          {["escrituras/1998", "escrituras/2004", "libros-actas/2011", "poderes/2017", "repuestos/varios"].map((d, i) => <p key={d}><span className={m.ok}>✓</span> {d.padEnd(22, " ")} <span className={m.muted}>{[212, 187, 164, 231, 109][i]} archivos · 0 diferencias</span></p>)}
          <p className={m.strong}>903 / 903 archivos verificados · 0 diferencias</p>
          <p><span className={m.prompt}>$</span> pipeline deliver --libro maestro.xlsx</p>
          <p className={m.muted}>Libro vinculado generado · 5 campos por documento</p>
          <p><span className={m.prompt}>$</span> <i className={m.caret} /></p>
        </div>
      </div>
    );
  }
  return (
    <div className={`${m.app} ${m.light}`}>
      <div className={m.main}>
        <div className={m.row}><p className={m.h}>Archivo legal · Telecom</p><span className={m.grow} /><span className={m.pill}>Batch API</span><span className={m.pill}>Solo copia</span></div>
        <div className={m.stages}>{stages.map((s, i) => <div key={s} data-done={i < 5 || undefined} data-now={i === 5 || undefined}><b>{String(i + 1).padStart(2, "0")}</b><span>{s}</span></div>)}</div>
        <div className={m.cards}>
          <div className={m.stat}><b>13,288</b><span>documentos</span></div>
          <div className={m.stat}><b>12</b><span>áreas legales</span></div>
          <div className={m.stat}><b>10</b><span>campos por documento</span></div>
          <div className={m.stat}><b>0</b><span>discrepancias en QA</span></div>
        </div>
        <table className={m.table}><thead><tr><th>Lote</th><th>Lectura</th><th>Extracción</th><th>Estado</th></tr></thead><tbody>
          {[["Contratos 01", "texto", "100%", "Verificado"], ["Instrumentos 02", "visión", "100%", "Verificado"], ["Regulatorio 03", "visión", "84%", "Extrayendo"]].map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td><span className={m.bar}><i style={{ width: r[2] }} /></span></td><td><Dot tone={r[3] === "Verificado" ? "var(--ok)" : "var(--warn)"} />{r[3]}</td></tr>)}
        </tbody></table>
      </div>
    </div>
  );
}

function Cotejo({ view }: { view: number }) {
  if (view === 1) {
    const fixes: [string, string, string, boolean, string][] = [
      ["Denominación", "Talleres Ribera, S.A.", "Talleres Ribera Alta, S.A. de C.V.", true, "Aplicada"],
      ["Capital social", "$50,000", "$500,000", false, "Omitida: la celda ya no contiene el valor esperado"],
      ["Comisario", "—", "Rocío Andrade", false, "Omitida: la tabla no coincide con un juego completo de encabezados"],
      ["Duración", "99 años", "Indefinida", false, "Omitida: sin evidencia en el PDF"],
    ];
    return (
      <div className={`${m.app} ${m.mac}`}>
        <div className={m.toolbar}><span className={m.lights}><i /><i /><i /></span><b>Cotejo</b><span className={m.muted}>Correcciones a la hoja de datos</span><span className={m.grow} /><span className={m.pill}>1 aplicada · 3 omitidas</span></div>
        <div className={m.main}>
          <p className={m.kicker}>SOLO SE ESCRIBE UNA CELDA SI LA EVIDENCIA SIGUE COINCIDIENDO</p>
          <table className={m.table}><thead><tr><th>Campo</th><th>Valor en la hoja</th><th>Valor en el PDF</th><th>Resultado</th></tr></thead><tbody>
            {fixes.map(([k, old, next, ok, why]) => <tr key={k}><td>{k}</td><td>{old}</td><td>{next}</td><td className={ok ? m.ok : m.muted}>{ok ? <><Check />{why}</> : why}</td></tr>)}
          </tbody></table>
          <div className={m.row}><span className={m.muted}>Exportar: HTML · Markdown · CSV · JSON</span><span className={m.grow} /><span className={m.btnGhost}>Ver reporte</span><span className={m.btn}>Guardar .docx corregido</span></div>
        </div>
      </div>
    );
  }
  const issues: [string, string, string, string][] = [["B", "Alta", "Fecha de constitución no coincide", "acta-constitutiva.pdf · p. 1"], ["D", "Media", "Falta el comisario en la hoja", "asamblea-2019.pdf · p. 3"], ["F", "Baja", "Nombre del notario abreviado", "poder-general.pdf · p. 2"]];
  return (
    <div className={`${m.app} ${m.mac}`}>
      <div className={m.toolbar}><span className={m.lights}><i /><i /><i /></span><b>Cotejo</b><span className={m.muted}>hoja-de-datos.docx ↔ 86 PDF</span><span className={m.grow} /><span className={m.pill}>OCR solo en páginas sin texto</span></div>
      <div className={m.split}>
        <div className={m.page}>
          <p className={m.pageHead}>acta-constitutiva.pdf · p. 1 · OCR (Vision)</p>
          {[88, 94, 72].map((w, i) => <i key={i} className={m.line} style={{ width: `${w}%` }} />)}
          <p className={m.ocr}><span>TALLERES RIBERA ALTA, S.A. DE C.V.</span></p>
          {[90, 81, 95, 66].map((w, i) => <i key={i} className={m.line} style={{ width: `${w}%` }} />)}
          <p className={m.ocr}><span>catorce de marzo de dos mil nueve</span></p>
          {[86, 92, 58].map((w, i) => <i key={i} className={m.line} style={{ width: `${w}%` }} />)}
        </div>
        <div className={m.panel}>
          <p className={m.kicker}>DISCREPANCIAS · 3</p>
          {issues.map(([cls, sev, what, where]) => <div key={what} className={m.issue}><b className={m.cls}>{cls}</b><div><span className={m.tripTitle}>{what}</span><em className={m.cite}>{where}</em></div><span className={m.sev} data-sev={sev}>{sev}</span></div>)}
          <p className={m.foot}>Carpetas «No Aplica» separadas de las vacías · Clases A–H</p>
        </div>
      </div>
    </div>
  );
}

function Geocoder({ view }: { view: number }) {
  if (view === 1) {
    const pins = [[22, 30], [38, 52], [55, 36], [64, 62], [30, 70], [72, 26], [47, 74]];
    return (
      <div className={`${m.app} ${m.desk}`}>
        <div className={m.toolbar}><b>POS Geocoder</b><span className={m.muted}>Revisión</span><span className={m.grow} /><span className={m.pill}>Catálogo INEGI · 156,988 filas</span></div>
        <div className={m.split}>
          <div className={m.map}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 30 35 60 50 100 42 M0 72 C 40 66 70 80 100 70 M28 0 C 32 40 24 70 30 100 M66 0 C 60 30 70 70 64 100" fill="none" stroke="currentColor" strokeWidth="0.6" /></svg>
            {pins.map(([x, y], i) => <span key={i} className={m.pin} data-on={i === 3 || undefined} style={{ left: `${x}%`, top: `${y}%` }} />)}
          </div>
          <div className={m.panel}>
            <p className={m.kicker}>COINCIDENCIA EN EL MISMO CÓDIGO POSTAL</p>
            <div className={m.fact}><span>Dirección encontrada</span><b>Av. Insurgentes Sur 1458, Actipan</b></div>
            <div className={m.fact}><span>Mejor candidato del catálogo</span><b>0.971</b><em className={m.ok}><Check />aceptado</em></div>
            <div className={m.fact}><span>Margen sobre el segundo</span><b>0.034</b><em className={m.muted}>mínimo 0.02</em></div>
            <div className={m.fact}><span>Clave INEGI</span><b>09-014-0001</b></div>
            <div className={m.fact}><span>Histórico</span><b>Difiere del registro anterior</b><em className={m.warn}>a revisión</em></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${m.app} ${m.desk}`}>
      <div className={m.toolbar}><b>POS Geocoder</b><span className={m.muted}>terminales-octubre.xlsx</span><span className={m.grow} /><span className={m.pill}>Caché local · reintentos</span></div>
      <div className={m.main}>
        <p className={m.kicker}>COLUMNAS DETECTADAS</p>
        <div className={m.cards}>
          <div className={m.stat}><b>Hoja 1</b><span>hoja con datos</span></div>
          <div className={m.stat}><b>Fila 3</b><span>encabezados</span></div>
          <div className={m.stat}><b>Latitud</b><span>confianza 98%</span></div>
          <div className={m.stat}><b>Longitud</b><span>confianza 98%</span></div>
        </div>
        <table className={m.table}><thead><tr><th>Terminal</th><th>Latitud</th><th>Longitud</th><th>Revisión previa</th></tr></thead><tbody>
          {[["TPV-004817", "19.4326", "−99.1332", "Lista"], ["TPV-004822", "25.6866", "−100.3161", "Lista"], ["TPV-004901", "0", "0", "Coordenadas vacías"]].map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3] === "Lista" ? <span className={m.ok}><Check />Lista</span> : <span className={m.warn}>{r[3]}</span>}</td></tr>)}
        </tbody></table>
        <div className={m.row}><span className={m.bar} style={{ width: "40%" }}><i style={{ width: "62%" }} /></span><span className={m.muted}>1,498 de 2,418 · faltan ~2 min</span><span className={m.grow} /><span className={m.btnGhost}>Cancelar</span><span className={m.btn}>Generar reporte</span></div>
      </div>
    </div>
  );
}

function RedDeCasa() {
  return (
    <div className={`${m.app} ${m.casa}`}>
      <div className={m.phoneStage}>
        <div className={m.phone}>
          <p className={m.phoneHead}><b>Semana</b><span>17–23 nov</span></p>
          <div className={m.days}>{["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i} data-on={i === 1 || undefined}>{d}<b>{17 + i}</b></span>)}</div>
          {[["7:30", "Escuela", "Sedán gris · Luis", "Confirmado"], ["13:15", "Natación", "Camioneta · por asignar", "Pendiente"], ["18:00", "Casa de los abuelos", "Sedán gris · Luis", "Confirmado"]].map(([t, w, a, s]) => (
            <div key={t} className={m.trip} data-pending={s === "Pendiente" || undefined}><b>{t}</b><div><span className={m.tripTitle}>{w}</span><span className={m.muted}>{a}</span></div><em>{s}</em></div>
          ))}
          <div className={m.approve}><span>Solicitud de Ana · Natación 13:15</span><span className={m.btn}>Aprobar</span></div>
        </div>
        <div className={m.phoneNote}><b>Sin choques</b><span>El sedán ya está asignado a las 13:00; la solicitud propone la camioneta.</span></div>
      </div>
    </div>
  );
}

function Talk() {
  return (
    <div className={`${m.app} ${m.talk}`}>
      <div className={m.landing}>
        <p className={m.kicker}>PLÁTICA · DESPACHO DE ABOGADOS · JULIO 2026</p>
        <p className={m.display}>IA en la práctica legal</p>
        <p className={m.lead}>Qué hacen las herramientas de IA, qué riesgos traen para un despacho y dónde sigue mandando el criterio profesional.</p>
        <div className={m.agenda}>{[["01", "Riesgos: datos, secreto profesional y PI"], ["02", "Las seis capas de la IA"], ["03", "Comparativa de proveedores"], ["04", "Tokens y ventanas de contexto"], ["05", "Proyectos, Skills y MCP"], ["06", "Abogado + IA"]].map(([n, t]) => <div key={n}><b>{n}</b><span>{t}</span></div>)}</div>
        <div className={m.slide}><span>Diapositiva 21 / 21</span><b>La IA ayuda, no reemplaza.</b></div>
      </div>
    </div>
  );
}

/** With a label the screen is one image to assistive technology; without one it is decorative. */
export function MockScreen({ kind, view = 0, label }: { kind: MockKind; view?: number; label?: string }) {
  return (
    <div className={m.screen} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {kind === "verifaid" ? <Verifaid view={view} /> : kind === "document-pipelines" ? <Pipelines view={view} /> : kind === "cotejo" ? <Cotejo view={view} /> : kind === "pos-geocoder" ? <Geocoder view={view} /> : kind === "la-red-de-casa" ? <RedDeCasa /> : <Talk />}
    </div>
  );
}

export const mockLabels: Record<MockKind, [string, string]> = {
  verifaid: ["Verifaid · Revisión", "Verifaid · Dictamen"],
  "document-pipelines": ["Panel del pipeline", "pipeline verify"],
  cotejo: ["Cotejo · Discrepancias", "Cotejo · Correcciones"],
  "pos-geocoder": ["POS Geocoder · Entrada", "POS Geocoder · Revisión"],
  "la-red-de-casa": ["la-red-de-casa.vercel.app/semana", ""],
  "ai-legal-practice": ["IA en la práctica legal", ""],
};
export const mockViews: Record<MockKind, number> = { verifaid: 2, "document-pipelines": 2, cotejo: 2, "pos-geocoder": 2, "la-red-de-casa": 1, "ai-legal-practice": 1 };

/** Screen-reader descriptions: accurate about what the picture is. */
export const mockAlt: Record<MockKind, { en: string; es: string }[]> = {
  verifaid: [{ en: "Illustration of Verifaid's review screen: a highlighted clause beside the extracted signing limit and its citation", es: "Ilustración de la pantalla de revisión de Verifaid: una cláusula resaltada junto al límite de firma extraído y su cita" }, { en: "Illustration of Verifaid's second-approval screen with each fact and its source", es: "Ilustración de la pantalla de segunda aprobación de Verifaid con cada dato y su fuente" }],
  "document-pipelines": [{ en: "Illustration of the pipeline dashboard: seven stages and extraction progress by batch", es: "Ilustración del panel del pipeline: siete etapas y avance de extracción por lote" }, { en: "Illustration of the hash verification run: 903 of 903 files verified", es: "Ilustración de la verificación por hash: 903 de 903 archivos verificados" }],
  cotejo: [{ en: "Illustration of Cotejo: an OCR'd PDF page beside the list of mismatches with class, severity and source page", es: "Ilustración de Cotejo: una página con OCR junto a la lista de discrepancias con clase, severidad y página" }, { en: "Illustration of Cotejo's corrections: one applied, three skipped with their reasons", es: "Ilustración de las correcciones de Cotejo: una aplicada y tres omitidas con su motivo" }],
  "pos-geocoder": [{ en: "Illustration of POS Geocoder's input screen: detected columns, a pre-run check and progress", es: "Ilustración de la pantalla de entrada de POS Geocoder: columnas detectadas, revisión previa y avance" }, { en: "Illustration of POS Geocoder's review: a map beside the matched address, score, margin and INEGI code", es: "Ilustración de la revisión de POS Geocoder: un mapa junto a la dirección, calificación, margen y clave INEGI" }],
  "la-red-de-casa": [{ en: "Illustration of La Red de Casa on a phone: the week's trips and a pending parent approval", es: "Ilustración de La Red de Casa en un teléfono: los traslados de la semana y una aprobación pendiente" }],
  "ai-legal-practice": [{ en: "Illustration of the talk's page: title, six sections and the closing slide", es: "Ilustración de la página de la plática: título, seis secciones y la diapositiva final" }],
};
