import type { Project } from "./content";

/*
 * Short case studies for four smaller projects. Facts come from each project's
 * own repository, plan and handoff notes; client names and data are left out.
 */
export const moreCases: Project[] = [
  {
    slug: "cotejo",
    title: { en: "Cotejo", es: "Cotejo" },
    status: "delivered",
    period: { en: "Jun – Jul 2026", es: "jun – jul 2026" },
    role: { en: "Engineer, LegalShelf", es: "Ingeniero, LegalShelf" },
    oneLiner: {
      en: "A macOS app that checks corporate data sheets against the underlying legal PDFs with on-device OCR, and never writes a cell it couldn't verify.",
      es: "Una app para macOS que coteja hojas de datos corporativos contra los PDFs legales con OCR en el dispositivo, y nunca escribe una celda que no pudo verificar.",
    },
    facts: [
      { value: "441", label: { en: "PDFs in the first review set", es: "PDFs en el primer conjunto" } },
      { value: "A–H", label: { en: "issue classes with severity", es: "clases de discrepancia con severidad" } },
      { value: "42", label: { en: "automated tests", es: "pruebas automatizadas" } },
    ],
    metricNote: { en: "Figures from the project plan and repository, July 2026.", es: "Cifras del plan y del repositorio del proyecto, julio de 2026." },
    links: [],
    stack: ["Swift 5.9", "SwiftUI", "SwiftPM", "PDFKit", "Vision OCR", "macOS 13+"],
    caseStudy: {
      problem: {
        en: "Corporate data sheets summarise each company's legal documents, and analysts checked them against hundreds of PDFs by hand. Many pages are scans with no text, and a mistake in the sheet travels into every later review.",
        es: "Las hojas de datos corporativos resumen los documentos legales de cada empresa, y los analistas las cotejaban a mano contra cientos de PDFs. Muchas páginas son escaneos sin texto, y un error en la hoja se arrastra a cada revisión posterior.",
      },
      constraints: {
        en: ["Confidential documents stay on the machine; the optional Claude layer is off by default and only ever sees redacted excerpts.", "A correction must never overwrite a value it cannot verify.", "Folders marked “No Aplica” must be told apart from folders that are simply empty."],
        es: ["Los documentos confidenciales se quedan en la máquina; la capa opcional de Claude está apagada por defecto y solo ve fragmentos anonimizados.", "Una corrección nunca debe sobrescribir un valor que no pueda verificar.", "Las carpetas «No Aplica» deben distinguirse de las que simplemente están vacías."],
      },
      decisions: [
        { title: { en: "Text layer first, OCR only where needed", es: "Primero la capa de texto, OCR solo donde haga falta" }, why: { en: "Cotejo reads filename metadata, then each PDF's own text, and runs Apple's Vision OCR only on pages without text. Scans are handled on the device, and pages that already have text are never re-read.", es: "Cotejo lee los metadatos del nombre, luego el texto del propio PDF, y usa el OCR de Vision de Apple solo en páginas sin texto. Los escaneos se procesan en el dispositivo y las páginas con texto nunca se vuelven a leer." } },
        { title: { en: "Write a correction only while the evidence still matches", es: "Escribir una corrección solo si la evidencia sigue coincidiendo" }, why: { en: "A correction is applied only if the table matches a full set of column headers and the cell still holds the expected old value. Anything else is skipped with a reason. In its self-test, four proposed corrections gave one applied and three refused.", es: "Una corrección se aplica solo si la tabla coincide con un juego completo de encabezados y la celda conserva el valor esperado. Lo demás se omite con su motivo. En su autoprueba, de cuatro correcciones propuestas se aplicó una y se rechazaron tres." } },
      ],
      built: {
        en: ["A Swift engine shared by a SwiftUI app and a command-line tool, built with SwiftPM.", "A data-sheet reader for fields, tables and analyst comments, and a comparison engine that sorts mismatches into classes A–H with severity, confidence, file and page.", "Issue-only reports in HTML, Markdown, CSV and JSON, plus an optional corrected data sheet."],
        es: ["Un motor en Swift compartido por una app SwiftUI y una herramienta de línea de comandos, construido con SwiftPM.", "Un lector de la hoja para campos, tablas y comentarios, y un motor que clasifica las diferencias en clases A–H con severidad, confianza, archivo y página.", "Reportes solo de discrepancias en HTML, Markdown, CSV y JSON, más una hoja corregida opcional."],
      },
      outcome: {
        en: "Analysts get a report of only what differs, each item pointing to the file and page that proves it. The first review set covered five companies, five data sheets and 441 PDFs.",
        es: "Los analistas reciben un reporte solo de lo que difiere, y cada punto señala el archivo y la página que lo prueba. El primer conjunto cubrió cinco empresas, cinco hojas de datos y 441 PDFs.",
      },
      evidence: {
        en: ["17 commits between 16 June and 10 July 2026; 42 automated tests.", "Client documents are confidential; the app can be walked through on request."],
        es: ["17 commits entre el 16 de junio y el 10 de julio de 2026; 42 pruebas automatizadas.", "Los documentos del cliente son confidenciales; puedo mostrar la app en una llamada."],
      },
    },
  },
  {
    slug: "pos-geocoder",
    title: { en: "POS Geocoder", es: "POS Geocoder" },
    status: "delivered",
    period: { en: "Jun – Jul 2026", es: "jun – jul 2026" },
    role: { en: "Engineer, LegalShelf", es: "Ingeniero, LegalShelf" },
    oneLiner: {
      en: "A desktop app that turns payment-terminal coordinates into audited addresses with official INEGI codes, from a 156,988-row catalog.",
      es: "Una app de escritorio que convierte coordenadas de terminales de pago en direcciones auditadas con claves oficiales del INEGI, a partir de un catálogo de 156,988 filas.",
    },
    facts: [
      { value: "156,988", label: { en: "rows in the INEGI catalog", es: "filas en el catálogo INEGI" } },
      { value: "5", label: { en: "sheets in each audited report", es: "hojas en cada reporte auditado" } },
      { value: "60", label: { en: "automated tests", es: "pruebas automatizadas" } },
    ],
    metricNote: { en: "Figures from the project repository and its reference database, July 2026.", es: "Cifras del repositorio del proyecto y su base de referencia, julio de 2026." },
    links: [],
    stack: ["Python 3.11", "PySide6", "SQLite", "openpyxl", "reportlab", "Google Geocoding API", "PyInstaller"],
    caseStudy: {
      problem: {
        en: "The team located payment terminals with a workbook converted from Google Sheets, and its QUERY formulas stopped working in Excel. They still needed a street address and official INEGI codes for every coordinate, with a record of how each one was decided.",
        es: "El equipo ubicaba terminales de pago con un libro convertido desde Google Sheets, y sus fórmulas QUERY dejaron de funcionar en Excel. Seguían necesitando una dirección y las claves oficiales del INEGI para cada coordenada, con registro de cómo se decidió cada una.",
      },
      constraints: {
        en: ["Used by non-technical staff: drop in a spreadsheet, get a report.", "Never silently overwrite earlier records.", "Ship as a Mac app with no setup."],
        es: ["Lo usa personal no técnico: arrastrar una hoja y obtener un reporte.", "Nunca sobrescribir en silencio los registros anteriores.", "Entregarse como app para Mac, sin instalación."],
      },
      decisions: [
        { title: { en: "Accept a match only with a clear margin", es: "Aceptar una coincidencia solo con margen claro" }, why: { en: "Catalog candidates are scored within the exact postal code. A match is accepted automatically only when it scores high and clearly beats the runner-up; otherwise the code is left blank and flagged for manual review with the top three candidates.", es: "Los candidatos del catálogo se califican dentro del código postal exacto. Solo se acepta en automático cuando la calificación es alta y supera con claridad al segundo; si no, la clave queda en blanco y se marca para revisión manual con los tres mejores candidatos." } },
        { title: { en: "Compare with history, never overwrite it", es: "Comparar con el histórico, nunca sobrescribirlo" }, why: { en: "New results are checked against 29,496 earlier records; differences are flagged in the audit sheet and nothing earlier is overwritten.", es: "Los resultados nuevos se cotejan con 29,496 registros anteriores; las diferencias se marcan en la hoja de auditoría y no se sobrescribe nada anterior." } },
      ],
      built: {
        en: ["Column detection that finds the sheet, header row and coordinates, shows its confidence and can be overridden, plus a pre-run check for unusable rows.", "Concurrent geocoding with a local SQLite cache, about 20 requests a second and retries; progress with an estimate and a cancel button.", "An Excel report with five sheets, including review and audit sheets, and an optional PDF."],
        es: ["Detección de columnas que encuentra la hoja, los encabezados y las coordenadas, muestra su confianza y se puede corregir, más una revisión previa de filas inutilizables.", "Geocodificación concurrente con caché SQLite local, unas 20 solicitudes por segundo y reintentos; avance con estimado y botón para cancelar.", "Un reporte en Excel de cinco hojas, con hojas de revisión y auditoría, y un PDF opcional."],
      },
      outcome: {
        en: "The broken workbook was replaced by a one-click desktop report, delivered at the end of July 2026 as a packaged app for Apple Silicon Macs.",
        es: "El libro que ya no funcionaba se sustituyó por un reporte de escritorio de un clic, entregado a finales de julio de 2026 como app empaquetada para Macs con Apple Silicon.",
      },
      evidence: {
        en: ["Reference database: 156,988 catalog rows and 29,496 historical records.", "60 automated tests. The client's data is confidential; the app can be walked through on request."],
        es: ["Base de referencia: 156,988 filas de catálogo y 29,496 registros históricos.", "60 pruebas automatizadas. Los datos del cliente son confidenciales; puedo mostrar la app en una llamada."],
      },
    },
  },
  {
    slug: "red-360",
    title: { en: "Red 360+1", es: "Red 360+1" },
    status: "deployed",
    period: { en: "Jul – Aug 2026", es: "jul – ago 2026" },
    role: { en: "Designer and developer, freelance", es: "Diseñador y desarrollador, freelance" },
    oneLiner: {
      en: "A 19-page bilingual redesign of a civil-society organization's institutional site, shipped in August after 34 tagged releases.",
      es: "Rediseño bilingüe de 19 páginas del sitio institucional de una organización de la sociedad civil, publicado en agosto tras 34 versiones etiquetadas.",
    },
    facts: [
      { value: "19", label: { en: "pages in Spanish and English", es: "páginas en español e inglés" } },
      { value: "34", label: { en: "tagged releases", es: "versiones etiquetadas" } },
      { value: "134/134", label: { en: "files identical to the repo at handoff", es: "archivos idénticos al repositorio en la entrega" } },
    ],
    metricNote: { en: "Release and handoff figures: 11 August 2026.", es: "Cifras de versiones y entrega: 11 de agosto de 2026." },
    media: { type: "image", src: "/art/red360.webp", width: 1200, height: 700, alt: { en: "Red 360+1 home page in Spanish", es: "Página de inicio de Red 360+1 en español" } },
    visuals: { primary: { kind: "image", src: "/art/red360.webp", width: 1200, height: 700, alt: { en: "Red 360+1 home page in Spanish", es: "Página de inicio de Red 360+1 en español" }, caption: { en: "The live home page.", es: "La página de inicio en línea." } } },
    links: [{ href: "https://red360mas1.com", label: { en: "Visit the site", es: "Ver el sitio" } }],
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Apache", "SFTP"],
    caseStudy: {
      problem: {
        en: "A civil-society organization needed its institutional site rebuilt in Spanish and English, on the shared hosting it already had, without the site breaking during the work.",
        es: "Una organización de la sociedad civil necesitaba rehacer su sitio institucional en español e inglés, en el hosting compartido que ya tenía, sin que el sitio fallara durante el trabajo.",
      },
      constraints: {
        en: ["Shared hosting reached over SFTP, with no build pipeline.", "Every change goes live on the organization's real site.", "Client decisions had to be recorded, round by round."],
        es: ["Hosting compartido por SFTP, sin pipeline de compilación.", "Cada cambio se publica en el sitio real de la organización.", "Las decisiones del cliente debían quedar registradas, ronda por ronda."],
      },
      decisions: [
        { title: { en: "Hand-written and static", es: "Escrito a mano y estático" }, why: { en: "HTML, CSS and JavaScript with no framework, Spanish at the root and English under /en/. Apache caches styles and scripts for a year and never caches pages, so updates show up immediately.", es: "HTML, CSS y JavaScript sin framework, español en la raíz e inglés en /en/. Apache guarda en caché estilos y scripts por un año y nunca las páginas, así los cambios aparecen de inmediato." } },
        { title: { en: "Deploy like a release", es: "Publicar como una versión" }, why: { en: "Each deploy compared files with production, checked a backup by checksum, uploaded assets before pages with the cache key bumped in the same batch, then verified that what was live was byte-identical to the repository.", es: "Cada publicación comparaba archivos con producción, verificaba un respaldo por checksum, subía recursos antes que páginas con la clave de caché actualizada en el mismo lote y luego verificaba que lo publicado fuera idéntico al repositorio." } },
      ],
      built: {
        en: ["A diagnosis of the old site and a 14-page proposal.", "19 bilingual pages, a contact form, cookie consent and an ecosystem map.", "Audits and four documented rounds of client decisions."],
        es: ["Un diagnóstico del sitio anterior y una propuesta de 14 páginas.", "19 páginas bilingües, formulario de contacto, consentimiento de cookies y un mapa del ecosistema.", "Auditorías y cuatro rondas documentadas de decisiones del cliente."],
      },
      outcome: {
        en: "The site went live in July and was handed off on 11 August 2026 after 34 tagged releases, with all 134 files identical to the repository and no client decisions left open.",
        es: "El sitio se publicó en julio y se entregó el 11 de agosto de 2026 tras 34 versiones etiquetadas, con los 134 archivos idénticos al repositorio y sin decisiones pendientes del cliente.",
      },
      evidence: {
        en: ["Live at red360mas1.com.", "34 tags between 11 July and 10 August 2026; the internal audit score rose from 7.4 to 7.9 out of 10."],
        es: ["En línea en red360mas1.com.", "34 etiquetas entre el 11 de julio y el 10 de agosto de 2026; la calificación de la auditoría interna subió de 7.4 a 7.9 sobre 10."],
      },
    },
  },
  {
    slug: "ai-legal-practice",
    title: { en: "AI in legal practice", es: "IA en la práctica legal" },
    status: "delivered",
    period: { en: "Jul 2026", es: "jul 2026" },
    role: { en: "Speaker", es: "Ponente" },
    oneLiner: {
      en: "A 35-minute talk and site on using AI tools with legal judgment, for a Mexico City law firm.",
      es: "Una plática de 35 minutos y un sitio sobre el uso de IA con criterio jurídico, para un despacho de la Ciudad de México.",
    },
    facts: [
      { value: "35 min", label: { en: "talk", es: "plática" } },
      { value: "21", label: { en: "slides", es: "diapositivas" } },
      { value: "6", label: { en: "sections", es: "secciones" } },
    ],
    links: [],
    stack: ["Talk", "Slides", "Landing page"],
    caseStudy: {
      problem: {
        en: "A law firm wanted to use AI tools without putting client confidentiality or professional judgment at risk. The lawyers needed to know what the tools actually do, where they fail, and which decisions must stay with them.",
        es: "Un despacho quería usar herramientas de IA sin poner en riesgo la confidencialidad de sus clientes ni el criterio profesional. Los abogados necesitaban saber qué hacen realmente, dónde fallan y qué decisiones deben seguir siendo suyas.",
      },
      constraints: {
        en: ["A non-technical audience of lawyers.", "Client confidentiality comes first.", "A fair comparison across AI providers."],
        es: ["Un público de abogados, no técnico.", "La confidencialidad del cliente va primero.", "Una comparación justa entre proveedores de IA."],
      },
      decisions: [
        { title: { en: "Treat AI tools as vendors", es: "Tratar las herramientas de IA como proveedores" }, why: { en: "Start from the firm's own risks: data protection, professional secrecy, intellectual property and human judgment. Each tool is assessed the way a firm would assess any provider that handles client information.", es: "Partir de los riesgos del propio despacho: protección de datos, secreto profesional, propiedad intelectual y juicio humano. Cada herramienta se evalúa como el despacho evaluaría a cualquier proveedor que maneja información de clientes." } },
        { title: { en: "Help, not replace", es: "Ayuda, no reemplazo" }, why: { en: "The talk closes on the lawyer plus AI: the tool drafts and searches, the lawyer verifies and decides.", es: "La plática cierra con el abogado más la IA: la herramienta redacta y busca, el abogado verifica y decide." } },
      ],
      built: {
        en: ["A 21-slide talk in six sections: risks, the six layers of AI, a provider comparison, tokens and context windows, working with projects, skills and connectors, and the lawyer plus AI.", "A landing page for the talk."],
        es: ["Una plática de 21 diapositivas en seis secciones: riesgos, las seis capas de la IA, comparación de proveedores, tokens y ventanas de contexto, trabajo con proyectos, skills y conectores, y el abogado más la IA.", "Una landing page para la plática."],
      },
      outcome: {
        en: "Delivered to a Mexico City law firm in July 2026.",
        es: "Presentada a un despacho de la Ciudad de México en julio de 2026.",
      },
      evidence: {
        en: ["The slides are confidential to the firm; I can walk through the structure on request."],
        es: ["Las diapositivas son confidenciales para el despacho; puedo explicar la estructura en una llamada."],
      },
    },
  },
];
