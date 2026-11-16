import type { L } from "./content";

/*
 * System maps: how each project works, told three ways.
 *  - Flow: the steps of one request, in order, plus work done ahead of time.
 *  - Where it runs: each part in the place it actually runs, and what crosses between places.
 *  - Data: what the data looks like at each stage, with counts.
 * Facts come from each project's repository and notes. These are logical maps,
 * not live telemetry.
 */

export type Tone = "interface" | "service" | "data" | "human";

/** A place where code runs or data lives: the browser, a host, a laptop, the repo. */
export type SystemLane = { id: string; name: L<string>; host: L<string> };

/** One component. `when` decides whether it belongs to the request or to work done ahead of time. */
export type SystemPart = {
  id: string;
  name: L<string>;
  technology: string | L<string>;
  icon: string;
  tone: Tone;
  lane: string;
  when: "ahead" | "request" | "review";
  /** Optional column in the "Where it runs" view, to keep connectors clear of other cards. */
  col?: number;
  summary: L<string>;
  inputs: L<string>[];
  outputs: L<string>[];
  numbers?: { value: string; label: L<string> }[];
};

/** What passes between two parts. `via` names the boundary it crosses (HTTPS, a tunnel, a file). `uses` marks a lookup, not a step. */
export type SystemLink = { from: string; to: string; carries: L<string>; via?: L<string>; uses?: boolean };

/** One shape the data takes on its way through the system. */
/** `alongside`: produced at the same time as the previous stage, not from it. */
export type DataStage = { id: string; name: L<string>; form: L<string>; count?: string; unit?: L<string>; part: string; detail: L<string>; alongside?: boolean };

export type SystemMap = {
  intro: L<string>;
  /** An example request, shown above the flow. */
  example?: L<string>;
  lanes: SystemLane[];
  parts: SystemPart[];
  links: SystemLink[];
  data: DataStage[];
  sources: L<string>;
};

const l = (en: string, es: string): L<string> => ({ en, es });

export const systems: Record<string, SystemMap> = {
  flaregrain: {
    intro: l(
      "Flaregrain answers plain-language questions about NASA's microgravity fire experiments. Vercel ranks NASA sources, an open model on the team's Mac mini writes from numbered facts, a rule-based checker removes any sentence its sources don't support, and Vercel checks the result again before you see it.",
      "Flaregrain responde preguntas en lenguaje sencillo sobre los experimentos de fuego en microgravedad de la NASA. Vercel ordena las fuentes de la NASA, un modelo abierto en la Mac mini del equipo escribe a partir de hechos numerados, un verificador basado en reglas elimina cualquier oración que sus fuentes no respalden y Vercel revisa el resultado otra vez antes de mostrarlo.",
    ),
    example: l("How long did the flame keep burning after the airflow stopped?", "¿Cuánto tiempo siguió ardiendo la flama después de que se detuvo el flujo de aire?"),
    lanes: [
      { id: "browser", name: l("Your browser", "Tu navegador"), host: l("Static pages: HTML, CSS and JavaScript", "Páginas estáticas: HTML, CSS y JavaScript") },
      { id: "vercel", name: l("Vercel", "Vercel"), host: l("One Node.js function serves the whole site, 45 s limit", "Una función de Node.js sirve todo el sitio, límite de 45 s") },
      { id: "mac", name: l("The team's Mac mini", "La Mac mini del equipo"), host: l("Reached through Funnel, open at set hours", "Se llega por Funnel, abierto en horarios fijos") },
      { id: "repo", name: l("GitHub repo", "Repositorio en GitHub"), host: l("Committed data, bundled into the function", "Datos versionados, incluidos en la función") },
      { id: "build", name: l("Team machines, offline", "Computadoras del equipo, sin conexión"), host: l("Python intake, standard library only", "Ingesta en Python, solo biblioteca estándar") },
      { id: "nasa", name: l("NASA servers", "Servidores de la NASA"), host: l("PSI and NTRS archives", "Archivos PSI y NTRS") },
    ],
    parts: [
      { id: "nasa", name: l("NASA archives", "Archivos de la NASA"), technology: "PSI / NTRS", icon: "external", tone: "data", lane: "nasa", when: "ahead", col: 0,
        summary: l("Combustion investigations from NASA's Physical Sciences Informatics archive, with their experimental tables, and report PDFs from NTRS and nasa.gov. Every value on the site links back to a NASA page.", "Investigaciones de combustión del archivo Physical Sciences Informatics de la NASA, con sus tablas experimentales, y reportes en PDF de NTRS y nasa.gov. Cada valor del sitio enlaza a una página de la NASA."),
        inputs: [l("Public NASA archives", "Archivos públicos de la NASA")],
        outputs: [l("Investigation records (JSON) and experimental tables (CSV)", "Registros de investigación (JSON) y tablas experimentales (CSV)"), l("Report PDFs", "Reportes en PDF")],
        numbers: [{ value: "24", label: l("combustion investigations", "investigaciones de combustión") }, { value: "9", label: l("report PDFs", "reportes en PDF") }] },
      { id: "intake", name: l("Python intake", "Ingesta en Python"), technology: "Python 3.9+", icon: "python", tone: "data", lane: "build", when: "ahead", col: 0,
        summary: l("Downloads every NASA file and records its SHA-256. Normalizes each table value to one unit, flags damaged values without overwriting them, and cuts report pages into passages of about 600 characters. A rebuild on 15 November reproduced every data file byte for byte.", "Descarga cada archivo de la NASA y registra su SHA-256. Normaliza cada valor de las tablas a una unidad, marca valores dañados sin sobrescribirlos y corta las páginas de los reportes en pasajes de unos 600 caracteres. Una reconstrucción el 15 de noviembre reprodujo cada archivo byte por byte."),
        inputs: [l("NASA records, tables and PDFs", "Registros, tablas y PDF de la NASA")],
        outputs: [l("Normalized values, each with its unit and source cell", "Valores normalizados, cada uno con su unidad y celda de origen"), l("Report passages with their page number", "Pasajes de reportes con su número de página")],
        numbers: [{ value: "2,009", label: l("table rows read", "filas de tablas leídas") }, { value: "24,573", label: l("values normalized", "valores normalizados") }, { value: "575", label: l("values flagged", "valores marcados") }, { value: "1,595", label: l("report passages", "pasajes de reportes") }] },
      { id: "public", name: l("Public data", "Datos públicos"), technology: "JSON", icon: "database", tone: "data", lane: "repo", when: "ahead", col: 1,
        summary: l("What the public site carries. The 13 records were compiled by the team and checked against the original report pages; every value keeps its page. There is no database: the files ship inside the Vercel function.", "Lo que contiene el sitio público. Los 13 registros los compiló el equipo y los verificó contra las páginas originales de los reportes; cada valor conserva su página. No hay base de datos: los archivos van dentro de la función de Vercel."),
        inputs: [l("Report passages from the intake", "Pasajes de reportes de la ingesta"), l("Records checked by hand", "Registros verificados a mano")],
        outputs: [l("Records, passages, prepared comparisons and saved explanations", "Registros, pasajes, comparaciones preparadas y explicaciones guardadas")],
        numbers: [{ value: "13", label: l("hand-checked records, 114 fields", "registros verificados a mano, 114 campos") }, { value: "1,321", label: l("report passages from 5 NASA documents", "pasajes de 5 documentos de la NASA") }, { value: "39", label: l("saved explanations", "explicaciones guardadas") }] },
      { id: "ask", name: l("Ask page", "Página Ask"), technology: "HTML / JavaScript", icon: "browser", tone: "interface", lane: "browser", when: "request",
        summary: l("You type a question. The page shows its work as it goes: searching NASA records, sources found, writing from N facts, checking every sentence.", "Escribes una pregunta. La página muestra su trabajo mientras avanza: busca en los registros de la NASA, encuentra fuentes, escribe a partir de N hechos y verifica cada oración."),
        inputs: [l("Your question", "Tu pregunta")],
        outputs: [l("The question, up to 300 characters", "La pregunta, hasta 300 caracteres")] },
      { id: "rank", name: l("Ranking", "Ordenamiento"), technology: "Node.js / BM25", icon: "search", tone: "service", lane: "vercel", when: "request",
        summary: l("A hand-written BM25 search over the records and passages, built in memory. It skips contents and reference pages, and the same question always gives the same sources. A question with no fire-science words gets a note instead, and nothing reaches the model.", "Una búsqueda BM25 escrita a mano sobre los registros y pasajes, construida en memoria. Omite índices y referencias, y la misma pregunta siempre da las mismas fuentes. Una pregunta sin palabras de ciencia del fuego recibe una nota y nada llega al modelo."),
        inputs: [l("The question", "La pregunta"), l("Records and passages", "Registros y pasajes")],
        outputs: [l("Up to 3 records and 3 report passages", "Hasta 3 registros y 3 pasajes de reportes"), l("Numbered facts F1…Fn and their fingerprint", "Hechos numerados F1…Fn y su huella")],
        numbers: [{ value: "3 + 3", label: l("records + passages at most", "registros + pasajes como máximo") }, { value: "23–31", label: l("numbered facts on five sample questions", "hechos numerados en cinco preguntas de prueba") }] },
      { id: "model", name: l("Open model", "Modelo abierto"), technology: "Ollama / qwen3:4b", icon: "cpu", tone: "service", lane: "mac", when: "request", col: 2,
        summary: l("A small proxy rebuilds the same numbered facts from its own copy of the public data, then qwen3:4b writes one to four sentences, each citing facts by number. Repeated questions get the saved answer at once.", "Un pequeño proxy reconstruye los mismos hechos numerados con su propia copia de los datos públicos y qwen3:4b escribe de una a cuatro oraciones, cada una citando hechos por número. Las preguntas repetidas reciben la respuesta guardada al instante."),
        inputs: [l("The question and source IDs, never the source text", "La pregunta y los ID de las fuentes, nunca el texto")],
        outputs: [l("1 to 4 draft sentences with citations", "De 1 a 4 oraciones de borrador con citas")],
        numbers: [{ value: "6", label: l("fresh answers an hour, one at a time", "respuestas nuevas por hora, una a la vez") }, { value: "4–6 s", label: l("for a fresh answer in testing; under 1 s reused", "por respuesta nueva en pruebas; menos de 1 s reutilizada") }] },
      { id: "checker", name: l("Sentence checker", "Verificador de oraciones"), technology: l("Rules, no model", "Reglas, sin modelo"), icon: "shield", tone: "service", lane: "mac", when: "request", col: 3,
        summary: l("Keeps a sentence only if every number and record it mentions matches the facts it cites. It removes wrong numbers or units, the wrong record, causes the sources don't state, missing citations and disputed values. Known gap: an invented detail that reuses words from the cited facts usually passes.", "Conserva una oración solo si cada número y registro que menciona coincide con los hechos que cita. Elimina números o unidades equivocados, el registro equivocado, causas que las fuentes no dicen, citas faltantes y valores disputados. Límite conocido: un detalle inventado que reutiliza palabras de los hechos citados suele pasar."),
        inputs: [l("Draft sentences and the facts they cite", "Oraciones de borrador y los hechos que citan")],
        outputs: [l("Kept sentences, and removed ones with their problem", "Oraciones conservadas y eliminadas con su problema")],
        numbers: [{ value: "343,758", label: l("synthetic sentences in the stress test", "oraciones sintéticas en la prueba de estrés") }, { value: "0", label: l("of 47,480 wrong-number sentences passed", "de 47,480 oraciones con número equivocado pasaron") }] },
      { id: "gate", name: l("Match check", "Revisión de coincidencia"), technology: "Node.js", icon: "review", tone: "service", lane: "vercel", when: "request",
        summary: l("Vercel accepts the answer only if it names the same sources, matches the facts fingerprint, and every sentence cites a valid fact with no problems. Otherwise the page shows the closest NASA sources and says why.", "Vercel acepta la respuesta solo si nombra las mismas fuentes, coincide con la huella de los hechos y cada oración cita un hecho válido sin problemas. Si no, la página muestra las fuentes de la NASA más cercanas y explica por qué."),
        inputs: [l("Kept and removed sentences, the fingerprint", "Oraciones conservadas y eliminadas, la huella")],
        outputs: [l("Kept sentences with NASA links, the removed count and up to 4 reasons", "Oraciones conservadas con enlaces a la NASA, el número de eliminadas y hasta 4 motivos")],
        numbers: [{ value: "4", label: l("sentences at most, 600 characters each", "oraciones como máximo, 600 caracteres cada una") }, { value: "40 s", label: l("before it falls back to the sources", "antes de volver a las fuentes") }] },
      { id: "answer", name: l("Cited answer", "Respuesta con citas"), technology: l("AI summary, labelled", "Resumen de IA, etiquetado"), icon: "document", tone: "interface", lane: "browser", when: "request",
        summary: l("Labelled \u201cAI summary \u00b7 NASA sources linked below\u201d. Each kept sentence ends with a link to the NASA page it cites, a badge counts kept and removed sentences, and \u201cHow this answer was made\u201d lists the five steps. Removed text is never shown.", "Etiquetada \u201cAI summary \u00b7 NASA sources linked below\u201d. Cada oración conservada termina con un enlace a la página de la NASA que cita, una etiqueta cuenta las oraciones conservadas y eliminadas, y \u201cHow this answer was made\u201d enumera los cinco pasos. El texto eliminado nunca se muestra."),
        inputs: [l("Kept sentences and NASA links", "Oraciones conservadas y enlaces a la NASA")],
        outputs: [l("An answer you can check sentence by sentence", "Una respuesta que puedes verificar oración por oración")] },
    ],
    links: [
      { from: "nasa", to: "intake", carries: l("Records, tables and PDFs", "Registros, tablas y PDF"), via: l("Download, SHA-256 kept", "Descarga con SHA-256") },
      { from: "intake", to: "public", carries: l("Report passages", "Pasajes de reportes"), via: l("Committed to GitHub", "Versionado en GitHub") },
      { from: "public", to: "rank", carries: l("Records and passages", "Registros y pasajes"), via: l("Bundled at deploy", "Incluidos al desplegar"), uses: true },
      { from: "public", to: "model", carries: l("The same public data", "Los mismos datos públicos"), via: l("Copy on the Mac mini", "Copia en la Mac mini"), uses: true },
      { from: "ask", to: "rank", carries: l("Question", "Pregunta"), via: l("HTTPS", "HTTPS") },
      { from: "rank", to: "model", carries: l("Question + source IDs", "Pregunta + ID de fuentes"), via: l("Funnel", "Funnel") },
      { from: "model", to: "checker", carries: l("Draft sentences", "Oraciones de borrador") },
      { from: "checker", to: "gate", carries: l("Checked sentences + fingerprint", "Oraciones verificadas + huella"), via: l("Funnel", "Funnel") },
      { from: "gate", to: "answer", carries: l("Kept sentences + NASA links", "Oraciones conservadas + enlaces"), via: l("HTTPS", "HTTPS") },
    ],
    data: [
      { id: "files", name: l("NASA files", "Archivos de la NASA"), form: l("Record JSON, table CSVs, report PDFs", "JSON de registros, CSV de tablas, PDF de reportes"), count: "24 + 9", unit: l("investigations + PDFs", "investigaciones + PDF"), part: "nasa", detail: l("Each raw file saved with its SHA-256 and size.", "Cada archivo se guarda con su SHA-256 y tamaño.") },
      { id: "values", name: l("Normalized values", "Valores normalizados"), form: l("Value, unit and source cell", "Valor, unidad y celda de origen"), count: "24,573", unit: l("from 2,009 table rows", "de 2,009 filas de tablas"), part: "intake", detail: l("575 flagged; a corrected reading never replaces the printed one.", "575 marcados; una lectura corregida nunca reemplaza la impresa.") },
      { id: "passages", alongside: true, name: l("Report passages", "Pasajes de reportes"), form: l("About 600 characters, with page number", "Unos 600 caracteres, con número de página"), count: "1,595", unit: l("from 9 PDFs", "de 9 PDF"), part: "intake", detail: l("Contents, acronym and reference pages are skipped later, at ranking.", "Índices, acrónimos y referencias se omiten después, al ordenar.") },
      { id: "public", name: l("Public data", "Datos públicos"), form: l("JSON files in the repo", "Archivos JSON en el repositorio"), count: "13 + 1,321", unit: l("records + passages", "registros + pasajes"), part: "public", detail: l("The 24,573 values stay in the private full-data demo.", "Los 24,573 valores se quedan en la demo privada con todos los datos.") },
      { id: "question", name: l("Question", "Pregunta"), form: l("Plain text", "Texto simple"), count: "≤ 300", unit: l("characters", "caracteres"), part: "ask", detail: l("Lower-cased and cut to 200 characters before it reaches the model.", "Se pasa a minúsculas y se corta a 200 caracteres antes de llegar al modelo.") },
      { id: "sources", name: l("Ranked sources", "Fuentes ordenadas"), form: l("Record IDs and passage numbers", "ID de registros y números de pasaje"), count: "3 + 3", unit: l("at most", "como máximo"), part: "rank", detail: l("Shown to you first, before any model text.", "Se muestran primero, antes de cualquier texto del modelo.") },
      { id: "facts", name: l("Numbered facts", "Hechos numerados"), form: l("F1…Fn: one per record field or passage", "F1…Fn: uno por campo de registro o pasaje"), count: "23–31", unit: l("on five sample questions", "en cinco preguntas de prueba"), part: "rank", detail: l("Plus an FNV-1a fingerprint that the answer must match.", "Más una huella FNV-1a que la respuesta debe igualar.") },
      { id: "drafts", name: l("Draft sentences", "Oraciones de borrador"), form: l("Sentences citing F-numbers", "Oraciones que citan números F"), count: "1–4", unit: l("per question", "por pregunta"), part: "model", detail: l("Written by the model; not evidence.", "Escritas por el modelo; no son evidencia.") },
      { id: "kept", name: l("Kept sentences", "Oraciones conservadas"), form: l("Sentences that match their cited facts", "Oraciones que coinciden con sus hechos citados"), count: "≤ 4", unit: l("shown, each linked to NASA", "mostradas, cada una enlazada a la NASA"), part: "checker", detail: l("Removed ones are counted, with up to 4 reasons; their text is never shown.", "Las eliminadas se cuentan, con hasta 4 motivos; su texto nunca se muestra.") },
    ],
    sources: l(
      "From the Flaregrain submission repository at commit fabff85, the version the live site reports, and its data files. The checker's rules come from the project's documentation and stress test; the model proxy's code is private and isn't in the repository.",
      "Del repositorio de entrega de Flaregrain en el commit fabff85, la versión que reporta el sitio en vivo, y sus archivos de datos. Las reglas del verificador vienen de la documentación del proyecto y su prueba de estrés; el código del proxy del modelo es privado y no está en el repositorio.",
    ),
  },
};

export const systemSlugs = Object.keys(systems);
