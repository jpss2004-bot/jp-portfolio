import type { Locale } from "./i18n";

/**
 * Single source of truth for the portfolio.
 *
 * Every figure here is dated and verifiable from git history or the project
 * itself. When a number changes, change it here and update `asOf`.
 */

export type L<T> = { en: T; es: T };
export const pick = <T,>(value: L<T>, locale: Locale): T => value[locale] ?? value.en;

export const asOf: L<string> = { en: "as of 11 September 2026", es: "al 11 de septiembre de 2026" };

export const profile = {
  name: "José Pablo Sámano Suárez",
  shortName: "JP Sámano",
  plainName: "Jose Pablo Samano Suarez",
  nameLines: [
    ["José", "Pablo"],
    ["Sámano", "Suárez"],
  ] as const,
  email: "jpss2004@icloud.com",
  github: "https://github.com/jpss2004-bot",
  linkedin: "https://ca.linkedin.com/in/jose-pablo-samano-suarez",
  resume: { en: "/resume/jp-samano-resume-en.pdf", es: "/resume/jp-samano-resume-es.pdf" } as L<string>,
  portrait: "/jp-samano-dark.jpg",
};

export type Status = "production" | "pilot" | "delivered" | "deployed" | "live" | "prototype";

export const statusLabel: Record<Status, L<string>> = {
  production: { en: "In production", es: "En producción" },
  pilot: { en: "Controlled pilot", es: "Piloto controlado" },
  delivered: { en: "Delivered", es: "Entregado" },
  deployed: { en: "Deployed", es: "Publicado" },
  live: { en: "Live", es: "En línea" },
  prototype: { en: "Prototype", es: "Prototipo" },
};

export type Fact = { value: string; label: L<string> };
export type Media =
  | { type: "image"; src: string; width: number; height: number; alt: L<string> }
  | { type: "diagram"; diagram: "verifaid" | "pipelines" };
export type Visual =
  | { kind: "image"; src: string; width: number; height: number; alt: L<string>; caption?: L<string> }
  | { kind: "video"; src: string; poster: string; width: number; height: number; alt: L<string>; caption?: L<string> };
export type Decision = { title: L<string>; why: L<string> };
export type Figure = { src: string; width: number; height: number; alt: L<string>; caption: L<string> };
export type LinkItem = { href: string; label: L<string> };

export type CaseStudy = {
  problem: L<string>;
  constraints: L<string[]>;
  decisions: Decision[];
  built?: L<string[]>;
  outcome: L<string>;
  evidence: L<string[]>;
  gallery?: Figure[];
  next?: L<string[]>;
};

export type Project = {
  slug: string;
  title: L<string>;
  status: Status;
  period: L<string>;
  role: L<string>;
  oneLiner: L<string>;
  facts: Fact[];
  media?: Media;
  /** Large visuals for the home stage and the case hero. */
  visuals?: { primary: Visual; secondary?: Visual; tile?: Visual };
  diagram?: "verifaid" | "pipelines";
  links: LinkItem[];
  stack: string[];
  caseStudy?: CaseStudy;
};

const visit = (href: string, en = "Visit the live site", es = "Ver el sitio en línea"): LinkItem => ({ href, label: { en, es } });

/* ------------------------------------------------------------------ */
/* Selected work                                                        */
/* ------------------------------------------------------------------ */

export const featured: Project[] = [
  {
    slug: "checkwise",
    title: { en: "CheckWise", es: "CheckWise" },
    status: "production",
    period: { en: "May – Sep 2026", es: "may – sep 2026" },
    role: { en: "Lead developer, LegalShelf", es: "Desarrollador principal, LegalShelf" },
    oneLiner: {
      en: "A REPSE compliance platform that proves every service provider is current with SAT, IMSS and INFONAVIT, every month. Used by 7 client companies; reviewers clear about 50 documents a day, at roughly a minute each.",
      es: "Una plataforma de cumplimiento REPSE que demuestra, cada mes, que cada proveedor está al corriente con SAT, IMSS e INFONAVIT. La usan 7 empresas cliente; los revisores resuelven unos 50 documentos al día, en cerca de un minuto cada uno.",
    },
    facts: [
      { value: "7", label: { en: "client companies", es: "empresas cliente" } },
      { value: "~20,000", label: { en: "documents processed", es: "documentos procesados" } },
      { value: "2,454", label: { en: "commits to production", es: "commits a producción" } },
      { value: "7,800+", label: { en: "automated tests", es: "pruebas automatizadas" } },
    ],
    media: {
      type: "image",
      src: "/projects/checkwise/client-dashboard.webp",
      width: 1600,
      height: 900,
      alt: {
        en: "CheckWise client dashboard: a compliance verdict for the whole provider portfolio, what needs attention, and where the risk sits",
        es: "Panel del cliente en CheckWise: veredicto de cumplimiento de todo el portafolio, lo que requiere atención y dónde está el riesgo",
      },
    },
    visuals: {
      primary: { kind: "video", src: "/projects/checkwise/loops/review-decision.mp4", poster: "/projects/checkwise/loops/review-decision.webp", width: 1280, height: 672, alt: { en: "CheckWise in use: the client acceptance inbox, then a document with its automatic reading", es: "CheckWise en uso: la bandeja de aceptación del cliente y un documento con su lectura automática" }, caption: { en: "Recorded from the real app with demo data.", es: "Grabado en la app real con datos de demostración." } },
      secondary: { kind: "image", src: "/projects/checkwise/client-dashboard.webp", width: 1600, height: 900, alt: { en: "CheckWise client dashboard", es: "Panel del cliente en CheckWise" }, caption: { en: "Recorded from the real app with demo data.", es: "Grabado en la app real con datos de demostración." } },
      tile: { kind: "video", src: "/projects/checkwise/loops/provider-upload-tile.mp4", poster: "/projects/checkwise/loops/provider-upload-tile.webp", width: 800, height: 420, alt: { en: "CheckWise provider dashboard and guided upload", es: "Panel del proveedor y carga guiada en CheckWise" } },
    },
    links: [visit("https://checkwise.com.mx")],
    stack: ["Python", "FastAPI", "PostgreSQL", "Next.js 16", "React 19", "TypeScript", "Claude API", "Google Document AI", "Render", "Vercel", "Playwright"],
    caseStudy: {
      problem: {
        en: "Mexico's 2021 outsourcing reform (REPSE) makes a company jointly liable for its service providers' labor and tax obligations. To stay covered, companies must collect and check recurring evidence from every provider: monthly, bimonthly, four-monthly and annual filings across SAT, IMSS, INFONAVIT and the labor ministry. In practice that meant thousands of PDFs, spreadsheets and email threads, and no clear view of exposure.",
        es: "La reforma de subcontratación de 2021 (REPSE) hace a una empresa responsable solidaria de las obligaciones laborales y fiscales de sus proveedores. Para estar cubierta, debe reunir y revisar evidencia recurrente de cada proveedor: declaraciones mensuales, bimestrales, cuatrimestrales y anuales ante SAT, IMSS, INFONAVIT y la STPS. En la práctica eran miles de PDFs, hojas de cálculo y correos, sin una vista clara de la exposición.",
      },
      constraints: {
        en: [
          "Three audiences with different jobs: providers who upload, LegalShelf reviewers who decide, and client companies who read risk.",
          "Providers are often non-technical accountants working in Spanish, many on a phone.",
          "Legal accuracy: automation can flag a document but must never approve or reject one on its own.",
          "A small team shipping straight to production, with no staging environment.",
        ],
        es: [
          "Tres públicos con trabajos distintos: proveedores que cargan, revisores de LegalShelf que deciden y empresas cliente que leen el riesgo.",
          "Los proveedores suelen ser contadores no técnicos que trabajan en español, muchos desde el celular.",
          "Precisión legal: la automatización puede señalar un documento, pero nunca aprobarlo ni rechazarlo por sí sola.",
          "Un equipo pequeño que publica directo a producción, sin ambiente intermedio.",
        ],
      },
      decisions: [
        {
          title: { en: "Model obligations as institution × cycle, not a checklist", es: "Modelar obligaciones como institución × ciclo, no como lista" },
          why: {
            en: "A flat checklist can't express that an IMSS payment is monthly while an INFONAVIT filing is bimonthly. Modeling each obligation by institution and cycle made the calendar, the reminders and the risk view fall out of one structure.",
            es: "Una lista plana no puede expresar que un pago del IMSS es mensual y una declaración del INFONAVIT es bimestral. Modelar cada obligación por institución y ciclo hizo que el calendario, los recordatorios y la vista de riesgo salieran de una sola estructura.",
          },
        },
        {
          title: { en: "The AI advises; a person decides", es: "La IA sugiere; una persona decide" },
          why: {
            en: "Every upload gets an automatic prevalidation: one plain verdict, the fields it read, and where on the page it read them. The decision stays with a reviewer, and every decision records who made it and why.",
            es: "Cada carga recibe una prevalidación automática: un veredicto claro, los datos que leyó y en qué parte de la página los leyó. La decisión queda en manos de un revisor, y cada decisión registra quién la tomó y por qué.",
          },
        },
        {
          title: { en: "One status vocabulary, enforced by tests", es: "Un solo vocabulario de estados, protegido por pruebas" },
          why: {
            en: "Three portals describing the same document differently erodes trust fast. Status labels live in one module and sweep tests fail the build if a screen invents its own wording.",
            es: "Tres portales que describen el mismo documento de forma distinta destruyen la confianza. Las etiquetas de estado viven en un solo módulo y las pruebas rompen el build si una pantalla inventa su propia redacción.",
          },
        },
        {
          title: { en: "Ship with agents, behind gates", es: "Publicar con agentes, detrás de compuertas" },
          why: {
            en: "To move at this pace without a staging tier, every change passes type checks, coverage ratchets and CI before it can merge. The agents write most of the code; the gates and the review decide what reaches production.",
            es: "Para avanzar a este ritmo sin ambiente intermedio, cada cambio pasa revisión de tipos, umbrales de cobertura y CI antes de fusionarse. Los agentes escriben la mayor parte del código; las compuertas y la revisión deciden qué llega a producción.",
          },
        },
      ],
      built: {
        en: [
          "Most of the code was written by Claude Code agents under my direction: 98% of commits are co-authored with Claude.",
          "Each agent works in its own git worktree, so parallel sessions never overwrite each other.",
          "A searchable knowledge base (\"the vault\") holds every lesson and trap, and is recalled automatically at the start of each task.",
          "An autonomous shift runs every six hours to find, fix and prove bugs, then asks for merge approval in Slack.",
          "Nothing merges without tests, type checks and CI on four self-hosted runners. I review and authorize what ships.",
        ],
        es: [
          "La mayor parte del código la escribieron agentes de Claude Code bajo mi dirección: el 98% de los commits es en coautoría con Claude.",
          "Cada agente trabaja en su propio worktree de git, para que las sesiones en paralelo nunca choquen.",
          "Una base de conocimiento consultable (\"el vault\") guarda cada lección y cada trampa, y se consulta sola al inicio de cada tarea.",
          "Un turno autónomo corre cada seis horas para encontrar, corregir y probar errores, y pide aprobación en Slack para fusionar.",
          "Nada se fusiona sin pruebas, revisión de tipos y CI en cuatro runners propios. Yo reviso y autorizo lo que se publica.",
        ],
      },
      outcome: {
        en: "CheckWise serves 7 client companies and more than 15 vendors, with about 20,000 documents processed; reviewers now clear around 50 documents a day at roughly a minute each. It has six surfaces: a provider portal, a client portal, a reviewer console, a public site, an in-app academy with 33 filmed lessons, and a reporting suite. Uploads get live SAT invoice-folio checks and AI-generated-document detection, and clients can set their own auto-accept and auto-reject rules.",
        es: "CheckWise atiende a 7 empresas cliente y más de 15 proveedores, con cerca de 20,000 documentos procesados; los revisores resuelven unos 50 documentos al día en cerca de un minuto cada uno. Tiene seis superficies: portal de proveedores, portal de clientes, consola de revisión, sitio público, una academia integrada con 33 lecciones filmadas y un módulo de reportes. Las cargas pasan por verificación en vivo de folios CFDI ante el SAT y detección de documentos generados por IA, y los clientes pueden definir sus propias reglas de aceptación y rechazo automático.",
      },
      evidence: {
        en: [
          "7 client companies, 15+ vendors and about 20,000 documents processed in production.",
          "2,454 commits on the main branch between 12 May and 11 September 2026.",
          "667 merged pull requests between June and September.",
          "5,199 backend, 2,542 frontend and 71 end-to-end tests at the last full verified run (29 August).",
          "Live at checkwise.com.mx. The source is private; I'm happy to walk through it.",
        ],
        es: [
          "7 empresas cliente, más de 15 proveedores y cerca de 20,000 documentos procesados en producción.",
          "2,454 commits en la rama principal entre el 12 de mayo y el 11 de septiembre de 2026.",
          "667 pull requests fusionados entre junio y septiembre.",
          "5,199 pruebas de backend, 2,542 de frontend y 71 end-to-end en la última corrida completa verificada (29 de agosto).",
          "En línea en checkwise.com.mx. El código es privado; con gusto lo muestro en una llamada.",
        ],
      },
      gallery: [
        {
          src: "/projects/checkwise/reviewer.webp", width: 1600, height: 900,
          alt: { en: "Reviewer desk with prevalidation and document preview", es: "Mesa de revisión con prevalidación y vista previa del documento" },
          caption: { en: "Reviewer desk: the prevalidation explains what it read and where; the reviewer decides.", es: "Mesa de revisión: la prevalidación explica qué leyó y dónde; el revisor decide." },
        },
        {
          src: "/projects/checkwise/calendar.webp", width: 1600, height: 900,
          alt: { en: "REPSE calendar by institution and month", es: "Calendario REPSE por institución y mes" },
          caption: { en: "The REPSE calendar: obligations by institution and month, derived from the institution × cycle model.", es: "El calendario REPSE: obligaciones por institución y mes, derivadas del modelo institución × ciclo." },
        },
        {
          src: "/projects/checkwise/provider-upload.webp", width: 1600, height: 900,
          alt: { en: "Provider portal guided upload", es: "Carga guiada en el portal de proveedores" },
          caption: { en: "Provider portal: uploads always start from a specific obligation, so a file can't land in the wrong period.", es: "Portal de proveedores: cada carga parte de una obligación concreta, para que un archivo no quede en el periodo equivocado." },
        },
      ],
    },
  },
  {
    slug: "verifaid",
    title: { en: "Verifaid", es: "Verifaid" },
    status: "pilot",
    period: { en: "Jul – Sep 2026", es: "jul – sep 2026" },
    role: { en: "Lead developer, LegalShelf", es: "Desarrollador principal, LegalShelf" },
    oneLiner: {
      en: "Decides whether a signature can legally proceed: it reads corporate documents and powers of attorney, cross-checks public registries, and says who can sign and within what limits, citing the exact page. 50+ operations cleared for a paying client.",
      es: "Decide si una firma puede proceder legalmente: lee documentos corporativos y poderes, los cruza con registros públicos y dice quién puede firmar y con qué límites, citando la página exacta. Más de 50 operaciones resueltas para un cliente de pago.",
    },
    facts: [
      { value: "50+", label: { en: "operations cleared", es: "operaciones resueltas" } },
      { value: "262", label: { en: "commits in six weeks", es: "commits en seis semanas" } },
      { value: "7", label: { en: "pipeline stages", es: "etapas del pipeline" } },
      { value: "596", label: { en: "automated tests", es: "pruebas automatizadas" } },
    ],
    visuals: {
      primary: { kind: "video", src: "/art/verifaid-loop.mp4", poster: "/art/verifaid-loop.webp", width: 1280, height: 720, alt: { en: "Illustration: a stamp marks a stack of legal documents as verified", es: "Ilustración: un sello marca como verificado un paquete de documentos legales" } },
      secondary: { kind: "image", src: "/art/verifaid-bp.webp", width: 1600, height: 893, alt: { en: "Line drawing of the verification path: documents, power of attorney, registry, seal", es: "Dibujo del camino de verificación: documentos, poder, registro, sello" }, caption: { en: "Documents and powers are read, checked against registries, then sealed by a person.", es: "Se leen documentos y poderes, se cruzan con registros y una persona sella la decisión." } },
      tile: { kind: "image", src: "/art/verifaid-3d.webp", width: 1600, height: 893, alt: { en: "Illustration of documents, a pen and a verification stamp", es: "Ilustración de documentos, una pluma y un sello de verificación" } },
    },
    diagram: "verifaid",
    links: [],
    stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "React", "TypeScript", "Claude API", "Cloudflare R2", "Render", "Vercel"],
    caseStudy: {
      problem: {
        en: "Before a lender disburses a loan, lawyers read the borrower's corporate documents to confirm that the person signing actually has the authority to sign, and up to what amount. It is slow, it depends on who reads it, and the reasoning is rarely written down in a way someone else can check.",
        es: "Antes de dispersar un crédito, los abogados leen los documentos corporativos del acreditado para confirmar que quien firma realmente tiene facultades para hacerlo, y hasta qué monto. Es lento, depende de quién lo lea y el razonamiento rara vez queda escrito de forma que otra persona pueda verificarlo.",
      },
      constraints: {
        en: [
          "The system may recommend, but a named person must approve every conclusion.",
          "Nothing may be asserted without a citation to document, version, page and excerpt.",
          "Synthetic data only until a real-data gate is passed; originals are preserved untouched.",
          "Each client organization's data must be isolated at the database level.",
        ],
        es: [
          "El sistema puede recomendar, pero una persona identificada debe aprobar cada conclusión.",
          "Nada puede afirmarse sin citar documento, versión, página y fragmento.",
          "Solo datos sintéticos hasta superar una compuerta de datos reales; los originales se conservan intactos.",
          "Los datos de cada organización cliente deben aislarse a nivel de base de datos.",
        ],
      },
      decisions: [
        {
          title: { en: "Citations before conclusions", es: "Citas antes que conclusiones" },
          why: {
            en: "Every extracted fact carries its source, and the citation viewer opens the real page with the excerpt highlighted. A cited page is worth more than a confidence score.",
            es: "Cada dato extraído lleva su fuente, y el visor de citas abre la página real con el fragmento resaltado. Una página citada vale más que un puntaje de confianza.",
          },
        },
        {
          title: { en: "Read the law the way a lawyer does", es: "Leer como lo haría un abogado" },
          why: {
            en: "Signing caps are read from the clause itself, including amounts written out in words, and attorneys-in-fact are read from the appointment clause. The powers catalog follows the Civil Code.",
            es: "Los límites se leen de la propia cláusula, incluidos los montos escritos con letra, y los apoderados se leen de la cláusula de nombramiento. El catálogo de facultades sigue el Código Civil.",
          },
        },
        {
          title: { en: "Isolation in the database, approval as a granted power", es: "Aislamiento en la base de datos, aprobación como facultad otorgada" },
          why: {
            en: "Row-level security in PostgreSQL isolates each organization, the API authenticates the caller instead of trusting a header, and the right to approve is granted explicitly rather than inherited from a role.",
            es: "La seguridad a nivel de fila en PostgreSQL aísla a cada organización, la API autentica a quien llama en lugar de confiar en un encabezado, y el derecho a aprobar se otorga explícitamente en vez de heredarse de un rol.",
          },
        },
      ],
      outcome: {
        en: "Verifaid returns a decision, not a report: whether signing can proceed, why it cannot, and who holds the authority to sign. It has cleared more than 50 operations for a paying client. In six weeks the platform went from an empty repository to a controlled pilot: a seven-stage pipeline, a citation viewer, traceable human approval where every review keeps its rationale, and a second person required to approve. Dictamen signing and the path to real client documents are the next milestones.",
        es: "Verifaid entrega una decisión, no un reporte: si la firma puede proceder, por qué no y quién tiene las facultades para firmar. Ha resuelto más de 50 operaciones para un cliente de pago. En seis semanas la plataforma pasó de un repositorio vacío a un piloto controlado: un pipeline de siete etapas, un visor de citas y una aprobación humana trazable donde cada revisión conserva su justificación y requiere una segunda persona. La firma del dictamen y el paso a documentos reales de clientes son los siguientes hitos.",
      },
      evidence: {
        en: [
          "50+ operations cleared for a paying client.",
          "262 commits and 85 merged pull requests between 29 July and 11 September 2026.",
          "311 API tests (52 of them tenant-isolation tests) and 285 web tests at the last known-good run.",
          "Private codebase under the client's confidentiality terms; a walkthrough is available on request.",
        ],
        es: [
          "Más de 50 operaciones resueltas para un cliente de pago.",
          "262 commits y 85 pull requests fusionados entre el 29 de julio y el 11 de septiembre de 2026.",
          "311 pruebas de API (52 de aislamiento entre organizaciones) y 285 pruebas web en la última corrida correcta.",
          "Código privado bajo los términos de confidencialidad del cliente; puedo mostrarlo en una llamada.",
        ],
      },
    },
  },
  {
    slug: "document-pipelines",
    title: { en: "Legal document pipelines", es: "Pipelines de documentos legales" },
    status: "delivered",
    period: { en: "Jun – Jul 2026", es: "jun – jul 2026" },
    role: { en: "Engineer, LegalShelf", es: "Ingeniero, LegalShelf" },
    oneLiner: {
      en: "Organized and extracted metadata from two confidential legal archives with Claude vision and the Batch API: 13,288 documents for a telecom operator and 903 notarial records for a security-services group.",
      es: "Organicé y extraje metadatos de dos archivos legales confidenciales con Claude visión y la Batch API: 13,288 documentos de un operador de telecomunicaciones y 903 registros notariales de un grupo de seguridad.",
    },
    facts: [
      { value: "14,191", label: { en: "documents processed", es: "documentos procesados" } },
      { value: "903/903", label: { en: "files hash-verified", es: "archivos verificados por hash" } },
      { value: "10", label: { en: "fields per document", es: "campos por documento" } },
      { value: "3 days", label: { en: "first archive, build and run", es: "primer archivo, construcción y corrida" } },
    ],
    visuals: {
      primary: { kind: "video", src: "/art/pipelines-loop.mp4", poster: "/art/pipelines-loop.webp", width: 1280, height: 720, alt: { en: "Illustration: a sheet leaves an untidy stack and files itself into a folder", es: "Ilustración: una hoja sale de una pila desordenada y se archiva en una carpeta" } },
      secondary: { kind: "image", src: "/art/pipelines-bp.webp", width: 1600, height: 893, alt: { en: "Line drawing of the pipeline: archive box, scanner, folder rack, verified ledger", es: "Dibujo del pipeline: caja de archivo, escáner, archivero y libro verificado" }, caption: { en: "From an archive box to a verified ledger, copy-only at every step.", es: "De una caja de archivo a un libro verificado, sin mover originales en ningún paso." } },
      tile: { kind: "image", src: "/art/pipelines-3d.webp", width: 1600, height: 893, alt: { en: "Illustration of a paper stack being filed into folders", es: "Ilustración de una pila de papel archivándose en carpetas" } },
    },
    diagram: "pipelines",
    links: [],
    stack: ["Python", "Claude API", "Batch API", "PyMuPDF", "openpyxl", "Google Apps Script"],
    caseStudy: {
      problem: {
        en: "A telecom operator's legal department had more than 13,000 scanned contracts, corporate instruments and regulatory filings, indexed by a spreadsheet nobody trusted. A second client kept its notarial deeds and corporate-book entries on a USB drive, with duplicates and no structure.",
        es: "El área legal de un operador de telecomunicaciones tenía más de 13,000 contratos, instrumentos corporativos y trámites regulatorios escaneados, indexados en una hoja de cálculo en la que nadie confiaba. Un segundo cliente guardaba sus escrituras y asientos de libros corporativos en una USB, con duplicados y sin estructura.",
      },
      constraints: {
        en: [
          "Confidential client documents: nothing may be moved or modified, only copied.",
          "Most pages are scans with no text layer.",
          "The client's own index was unreliable but still useful as a hint.",
          "A fixed budget per document, and a pipeline that can stop and resume at any point.",
        ],
        es: [
          "Documentos confidenciales: nada puede moverse ni modificarse, solo copiarse.",
          "La mayoría de las páginas son escaneos sin capa de texto.",
          "El índice del cliente no era confiable, pero seguía siendo útil como pista.",
          "Un presupuesto fijo por documento y un pipeline que puede detenerse y reanudarse en cualquier punto.",
        ],
      },
      decisions: [
        {
          title: { en: "A hybrid reader instead of a separate OCR step", es: "Un lector híbrido en lugar de un paso de OCR aparte" },
          why: {
            en: "Pages with legible text are read as text; scans are rendered and sent to Claude vision. It removed a whole OCR stage and its error modes.",
            es: "Las páginas con texto legible se leen como texto; los escaneos se renderizan y se envían a Claude visión. Eliminó toda una etapa de OCR y sus fallas.",
          },
        },
        {
          title: { en: "The Batch API, and the client's index as a prior", es: "La Batch API, y el índice del cliente como referencia" },
          why: {
            en: "Batching halved the cost, and passing the client's existing index as a hint let the model verify and correct it instead of starting blind.",
            es: "El procesamiento por lotes redujo el costo a la mitad, y pasar el índice existente como pista permitió al modelo verificarlo y corregirlo en lugar de empezar a ciegas.",
          },
        },
        {
          title: { en: "Copy-only, with a hash gate before anything is touched", es: "Solo copiar, con una compuerta de hashes antes de tocar algo" },
          why: {
            en: "The organizer only ever copies, and a verification gate compares every file by hash. For the notarial archive it passed 903 of 903 with zero mismatches.",
            es: "El organizador solo copia, y una compuerta de verificación compara cada archivo por hash. En el archivo notarial pasó 903 de 903 sin ninguna diferencia.",
          },
        },
      ],
      outcome: {
        en: "The telecom archive was organized into 12 legal areas with 10 fields extracted per document, delivered with a reconciled master workbook. The notarial archive was classified into notarized, corporate and spare documents with five fields each and delivered through a linked workbook. When the first client flagged annex handling, I traced the cause and designed a second phase that reconciles every annex one to one.",
        es: "El archivo del operador quedó organizado en 12 áreas legales con 10 campos por documento, entregado con un libro maestro conciliado. El archivo notarial quedó clasificado en documentos protocolizados, societarios y otros, con cinco campos cada uno, y se entregó con un libro con ligas. Cuando el primer cliente señaló el manejo de anexos, rastreé la causa y diseñé una segunda fase que concilia cada anexo uno a uno.",
      },
      evidence: {
        en: [
          "13,288 documents extracted; a QA audit found zero mismatches between folder tree, plan and workbook.",
          "903 of 903 notarial files verified by hash before delivery.",
          "Client names and documents are confidential; the pipeline design is available to walk through.",
        ],
        es: [
          "13,288 documentos extraídos; una auditoría de calidad no encontró diferencias entre árbol, plan y libro.",
          "903 de 903 archivos notariales verificados por hash antes de la entrega.",
          "Los nombres y documentos de los clientes son confidenciales; puedo explicar el diseño del pipeline.",
        ],
      },
    },
  },
  {
    slug: "legalshelf-mx",
    title: { en: "legalshelf.mx", es: "legalshelf.mx" },
    status: "deployed",
    period: { en: "Aug – Sep 2026", es: "ago – sep 2026" },
    role: { en: "Developer, LegalShelf", es: "Desarrollador, LegalShelf" },
    oneLiner: {
      en: "The company's marketing site, rebuilt from Webflow in Astro in 16 days. Deployed to production on Vercel, ready for the domain switch.",
      es: "El sitio de marketing de la empresa, reconstruido de Webflow a Astro en 16 días. Publicado en producción en Vercel, listo para el cambio de dominio.",
    },
    facts: [
      { value: "204", label: { en: "commits in 16 days", es: "commits en 16 días" } },
      { value: "35", label: { en: "legacy URLs preserved", es: "URLs heredadas preservadas" } },
      { value: "40 → 7 ms", label: { en: "total blocking time", es: "tiempo total de bloqueo" } },
    ],
    media: {
      type: "image",
      src: "/projects/legalshelf-mx/home.webp",
      width: 1280,
      height: 800,
      alt: { en: "The rebuilt legalshelf.mx home page", es: "La página de inicio reconstruida de legalshelf.mx" },
    },
    visuals: {
      primary: { kind: "image", src: "/projects/legalshelf-mx/home.webp", width: 1280, height: 800, alt: { en: "The rebuilt legalshelf.mx home page", es: "La página de inicio reconstruida de legalshelf.mx" } },
      tile: { kind: "image", src: "/projects/legalshelf-mx/home.webp", width: 1280, height: 800, alt: { en: "legalshelf.mx home page", es: "Inicio de legalshelf.mx" } },
    },
    links: [visit("https://legalshelf-gamma.vercel.app", "View the deployment", "Ver el sitio publicado")],
    stack: ["Astro", "Tailwind", "TypeScript", "GSAP", "Vercel"],
    caseStudy: {
      problem: {
        en: "The old Webflow site no longer said what the company sells, operational certainty rather than document storage, and it couldn't be versioned, tested or measured.",
        es: "El sitio en Webflow ya no decía lo que la empresa vende, certeza operativa y no almacenamiento de documentos, y no se podía versionar, probar ni medir.",
      },
      constraints: {
        en: [
          "Keep every existing Webflow URL alive for search and inbound links.",
          "Spanish-first copy governed by a positioning document with strict vocabulary rules.",
          "Heavy art direction (video, 3D characters) without hurting performance.",
        ],
        es: [
          "Mantener vivas todas las URLs de Webflow por búsqueda y enlaces externos.",
          "Textos en español regidos por un documento de posicionamiento con reglas estrictas de vocabulario.",
          "Dirección de arte pesada (video, personajes 3D) sin sacrificar rendimiento.",
        ],
      },
      decisions: [
        {
          title: { en: "Astro, static by default", es: "Astro, estático por defecto" },
          why: {
            en: "A marketing site doesn't need a client framework on every page. Static output with islands kept blocking time at 7 ms.",
            es: "Un sitio de marketing no necesita un framework de cliente en cada página. La salida estática con islas dejó el tiempo de bloqueo en 7 ms.",
          },
        },
        {
          title: { en: "Harnesses that measure", es: "Arneses que miden" },
          why: {
            en: "A contrast harness that measures real rendered pixels and a 36-route smoke test caught the one production incident (18 pages briefly returning 404) the same day.",
            es: "Un arnés de contraste que mide los píxeles reales y una prueba de humo de 36 rutas detectaron el único incidente en producción (18 páginas devolviendo 404 por un momento) el mismo día.",
          },
        },
      ],
      outcome: {
        en: "A 12-section home page built from the positioning document, plus platform, guided tour, industries, resources, blog, case studies and glossary pages. Deployed on Vercel; pointing the domain at it is the remaining step.",
        es: "Un home de 12 secciones construido desde el documento de posicionamiento, además de páginas de plataforma, recorrido guiado, industrias, recursos, blog, casos y glosario. Publicado en Vercel; apuntar el dominio es el paso que falta.",
      },
      evidence: {
        en: ["204 commits between 26 August and 10 September 2026.", "13 redirect rules covering 35 legacy URLs."],
        es: ["204 commits entre el 26 de agosto y el 10 de septiembre de 2026.", "13 reglas de redirección que cubren 35 URLs heredadas."],
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/* Also shipped                                                         */
/* ------------------------------------------------------------------ */

export type Shipped = {
  slug?: string;
  name: string;
  year: string;
  kind: L<string>;
  line: L<string>;
  href?: string;
  status: Status;
  image?: { src: string; width: number; height: number; alt: L<string> };
};

export const shipped: Shipped[] = [
  {
    slug: "savr", name: "SAVR", year: "2026", status: "live", href: "https://context-aware-dining-platform-1.vercel.app", image: { src: "/projects/savr/savr-recommendations-results.png", width: 1440, height: 900, alt: { en: "SAVR ranked recommendations", es: "Recomendaciones de SAVR" } },
    kind: { en: "Web app", es: "App web" },
    line: { en: "Context-aware restaurant recommendations that explain why each one fits. 10 active users around Wolfville, NS.", es: "Recomendaciones de restaurantes según el contexto, que explican por qué encaja cada una. 10 usuarios activos en Wolfville, Nueva Escocia." },
  },
  {
    name: "Band of Brothers", year: "2026", status: "live", href: "https://bandofbrothers-seven.vercel.app", image: { src: "/art/bob.webp", width: 880, height: 550, alt: { en: "Band of Brothers weekly issue", es: "Número semanal de Band of Brothers" } },
    kind: { en: "Web app", es: "App web" },
    line: { en: "Draft engine and weekly newsletter for the 12-team fantasy league I run, with an automated Tuesday issue.", es: "Motor de draft y boletín semanal para la liga de fantasy de 12 equipos que administro, con un número automático cada martes." },
  },
  {
    name: "La Red de Casa", year: "2026", status: "live", href: "https://la-red-de-casa.vercel.app", image: { src: "/art/redcasa-3d.webp", width: 1200, height: 900, alt: { en: "Illustration of a house, a car and keys on a calendar", es: "Ilustración de una casa, un auto y llaves sobre un calendario" } },
    kind: { en: "Web app", es: "App web" },
    line: { en: "A phone-first app that coordinates a family's trips, cars and drivers, with parent approval.", es: "Una app para el celular que coordina los traslados, autos y choferes de una familia, con aprobación de los papás." },
  },
  {
    name: "Cotejo", year: "2026", status: "delivered", image: { src: "/art/cotejo-3d.webp", width: 1200, height: 900, alt: { en: "Illustration of two sheets compared under a magnifier", es: "Ilustración de dos hojas comparadas con una lupa" } },
    kind: { en: "macOS app · Swift", es: "App para macOS · Swift" },
    line: { en: "Checks corporate data sheets against the underlying legal PDFs with on-device OCR, and never writes a cell it couldn't verify.", es: "Coteja hojas de datos corporativos contra los PDFs legales con OCR en el dispositivo, y nunca escribe una celda que no pudo verificar." },
  },
  {
    name: "POS Geocoder", year: "2026", status: "delivered", image: { src: "/art/geocoder-3d.webp", width: 1200, height: 900, alt: { en: "Illustration of a payment terminal on a map with a pin", es: "Ilustración de una terminal de pago sobre un mapa con un pin" } },
    kind: { en: "Desktop app · PySide6", es: "App de escritorio · PySide6" },
    line: { en: "Turns payment-terminal coordinates into audited addresses with official INEGI codes, from a 157,000-row catalog.", es: "Convierte coordenadas de terminales de pago en direcciones auditadas con claves oficiales del INEGI, a partir de un catálogo de 157,000 filas." },
  },
  {
    name: "Red 360+1", year: "2026", status: "delivered", image: { src: "/art/red360.webp", width: 1200, height: 700, alt: { en: "Red 360+1 home page", es: "Inicio de Red 360+1" } },
    kind: { en: "Website · freelance", es: "Sitio web · freelance" },
    line: { en: "A 19-page bilingual redesign of a civil-society organization's institutional site, shipped in August after 34 tagged releases.", es: "Rediseño bilingüe de 19 páginas del sitio institucional de una organización de la sociedad civil, publicado en agosto tras 34 versiones etiquetadas." },
  },
  {
    name: "AI in legal practice", year: "2026", status: "delivered", image: { src: "/art/talk-3d.webp", width: 1200, height: 900, alt: { en: "Illustration of a lectern and microphone", es: "Ilustración de un atril y un micrófono" } },
    kind: { en: "Talk · landing page", es: "Plática · landing page" },
    line: { en: "A 35-minute talk and site on using AI tools with legal judgment, for a Mexico City law firm.", es: "Una plática de 35 minutos y un sitio sobre el uso de IA con criterio jurídico, para un despacho de la Ciudad de México." },
  },
  {
    slug: "er-triage-queue-manager", name: "ER Triage & Queue Manager", year: "2025", status: "prototype", image: { src: "/projects/er-triage-queue-manager/shot-dashboard.png", width: 1440, height: 900, alt: { en: "ER triage queue dashboard", es: "Panel de la fila de urgencias" } },
    kind: { en: "Coursework · Python", es: "Proyecto académico · Python" },
    line: { en: "An emergency-room queue that ranks patients by ESI v4 acuity and shows the clinical reasoning behind every level.", es: "Una fila de urgencias que ordena pacientes por agudeza ESI v4 y muestra el razonamiento clínico de cada nivel." },
  },
  {
    slug: "family-phrase-game", name: "Family Phrase Game", year: "2026", status: "live", href: "https://family-phrase-game.onrender.com/", image: { src: "/projects/family-phrase-game/family-phrase-game-main.png", width: 1440, height: 900, alt: { en: "Family Phrase Game screen", es: "Pantalla del juego de frases" } },
    kind: { en: "Web app · Flask", es: "App web · Flask" },
    line: { en: "A party game built from phrases our family submitted, deployed in time for the event it was made for.", es: "Un juego de fiesta hecho con frases que envió nuestra familia, publicado a tiempo para el evento para el que se hizo." },
  },
];

/* Case studies for shipped projects that have one. Ported from the previous site. */
export const shippedCases: Project[] = [
  {
    slug: "savr",
    title: { en: "SAVR", es: "SAVR" },
    status: "live",
    period: { en: "2026", es: "2026" },
    role: { en: "Full-stack developer", es: "Desarrollador full-stack" },
    oneLiner: {
      en: "A dining platform that recommends restaurants and dishes from your preferences, budget and company, and explains why each result fits.",
      es: "Una plataforma que recomienda restaurantes y platillos según tus preferencias, presupuesto y compañía, y explica por qué encaja cada resultado.",
    },
    facts: [
      { value: "10", label: { en: "active users", es: "usuarios activos" } },
      { value: "~50", label: { en: "restaurants near Wolfville, NS", es: "restaurantes cerca de Wolfville" } },
      { value: "3", label: { en: "ways to ask", es: "formas de pedir" } },
    ],
    media: { type: "image", src: "/projects/savr/savr-recommendations-results.png", width: 1440, height: 900, alt: { en: "SAVR ranked recommendations", es: "Recomendaciones clasificadas de SAVR" } },
    links: [visit("https://context-aware-dining-platform-1.vercel.app", "Open the app", "Abrir la app"), { href: "https://github.com/jpss2004-bot/context-aware-dining-platform-1", label: { en: "Source on GitHub", es: "Código en GitHub" } }],
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "React", "TypeScript", "Vite", "Playwright"],
    caseStudy: {
      problem: {
        en: "Restaurant apps filter by location and cuisine but ignore why you're going out, who you're with and what actually constrains the night.",
        es: "Las apps de restaurantes filtran por ubicación y cocina, pero ignoran por qué sales, con quién vas y qué limita realmente la noche.",
      },
      constraints: {
        en: ["Capture enough context without a heavy onboarding.", "Recommendations must be explainable, not a black box."],
        es: ["Capturar suficiente contexto sin un onboarding pesado.", "Las recomendaciones deben ser explicables, no una caja negra."],
      },
      decisions: [
        {
          title: { en: "Three ways to ask", es: "Tres formas de pedir" },
          why: {
            en: "Build Your Night (guided), Describe Your Night (plain language) and Surprise Me cover different moods without forcing one flow.",
            es: "Build Your Night (guiado), Describe Your Night (lenguaje natural) y Surprise Me cubren distintos estados de ánimo sin forzar un solo flujo.",
          },
        },
        {
          title: { en: "Every result states why it fits", es: "Cada resultado dice por qué encaja" },
          why: {
            en: "Each match shows a fit score and the preferences behind it, so the user can correct the model instead of guessing.",
            es: "Cada resultado muestra un puntaje de ajuste y las preferencias detrás, para que el usuario corrija el modelo en lugar de adivinar.",
          },
        },
      ],
      outcome: {
        en: "A live full-stack app with 10 active users: authentication, onboarding, saved presets, three recommendation flows and an AI-updated database of about 50 restaurants within 30 miles of Wolfville, NS. Relaunched in June 2026.",
        es: "Una app full-stack en línea con 10 usuarios activos: autenticación, onboarding, presets guardados, tres flujos de recomendación y una base de datos actualizada con IA de unos 50 restaurantes a menos de 50 km de Wolfville. Relanzada en junio de 2026.",
      },
      evidence: {
        en: ["Live app and public source code.", "Screens captured from the running app."],
        es: ["App en línea y código público.", "Pantallas capturadas de la app en funcionamiento."],
      },
      gallery: [
        { src: "/projects/savr/savr-recommendations-hub.png", width: 1440, height: 900, alt: { en: "SAVR recommendation modes", es: "Modos de recomendación de SAVR" }, caption: { en: "Three ways to ask for a recommendation.", es: "Tres formas de pedir una recomendación." } },
        { src: "/projects/savr/savr-onboarding.png", width: 1440, height: 900, alt: { en: "SAVR onboarding", es: "Onboarding de SAVR" }, caption: { en: "Onboarding captures diet, cuisine, atmosphere and budget.", es: "El onboarding captura dieta, cocina, ambiente y presupuesto." } },
        { src: "/projects/savr/savr-restaurants.png", width: 1440, height: 900, alt: { en: "SAVR restaurant catalog", es: "Catálogo de restaurantes de SAVR" }, caption: { en: "The catalog: 54 venues with town, price tier, pace and tags.", es: "El catálogo: 54 lugares con localidad, precio, ritmo y etiquetas." } },
      ],
    },
  },
  {
    slug: "er-triage-queue-manager",
    title: { en: "ER Triage & Queue Manager", es: "Gestor de triaje y fila de urgencias" },
    status: "prototype",
    period: { en: "2025", es: "2025" },
    role: { en: "System design and implementation (coursework)", es: "Diseño e implementación del sistema (proyecto académico)" },
    oneLiner: {
      en: "An emergency-room queue that ranks patients by ESI v4 acuity, shows the clinical reasoning behind every level, and keeps an audit trail of every status change.",
      es: "Una fila de urgencias que ordena pacientes por agudeza ESI v4, muestra el razonamiento clínico de cada nivel y guarda un registro de cada cambio de estado.",
    },
    facts: [
      { value: "ESI v4", label: { en: "acuity standard", es: "estándar de agudeza" } },
      { value: "5", label: { en: "workflow stages", es: "etapas del flujo" } },
    ],
    media: { type: "image", src: "/projects/er-triage-queue-manager/shot-dashboard.png", width: 1440, height: 900, alt: { en: "ER queue dashboard ranked by acuity", es: "Panel de la fila de urgencias ordenado por agudeza" } },
    links: [{ href: "https://github.com/jpss2004-bot/ER-Triage-System", label: { en: "Source on GitHub", es: "Código en GitHub" } }],
    stack: ["Python", "NiceGUI", "SQLite", "pytest"],
    caseStudy: {
      problem: {
        en: "Emergency rooms depend on shared visibility. Intake, vitals, priority, room and treatment fragment quickly when they don't live in one system.",
        es: "Las urgencias dependen de una visibilidad compartida. Ingreso, signos vitales, prioridad, sala y tratamiento se fragmentan rápido si no viven en un solo sistema.",
      },
      constraints: {
        en: ["Represent a high-pressure clinical workflow without overloading the interface.", "Make every status transition traceable."],
        es: ["Representar un flujo clínico de alta presión sin saturar la interfaz.", "Hacer rastreable cada cambio de estado."],
      },
      decisions: [
        {
          title: { en: "Explainable priority over a black-box score", es: "Prioridad explicable sobre un puntaje opaco" },
          why: {
            en: "Clinicians won't trust a queue that moves a patient without saying why, so every ESI level shows the reasoning behind it.",
            es: "El personal clínico no confía en una fila que mueve a un paciente sin decir por qué, así que cada nivel ESI muestra su razonamiento.",
          },
        },
        {
          title: { en: "Local persistence for iteration speed", es: "Persistencia local para iterar rápido" },
          why: {
            en: "SQLite kept the prototype fast to change while still persisting patients, vitals, rooms and history.",
            es: "SQLite mantuvo el prototipo fácil de cambiar sin dejar de guardar pacientes, signos vitales, salas e historial.",
          },
        },
      ],
      outcome: {
        en: "A working prototype with intake, nurse triage with decision support, a live queue and an audit log.",
        es: "Un prototipo funcional con ingreso, triaje de enfermería con apoyo a la decisión, fila en vivo y registro de auditoría.",
      },
      evidence: { en: ["Public source code with tests.", "Screens captured from the running app."], es: ["Código público con pruebas.", "Pantallas capturadas de la app en funcionamiento."] },
      gallery: [
        { src: "/projects/er-triage-queue-manager/shot-triage-form.png", width: 1440, height: 900, alt: { en: "Triage form with suggested acuity", es: "Formulario de triaje con agudeza sugerida" }, caption: { en: "Vitals, SpO2, AVPU and red flags compute a suggested level live.", es: "Signos vitales, SpO2, AVPU y banderas rojas calculan un nivel sugerido en vivo." } },
        { src: "/projects/er-triage-queue-manager/shot-patient-detail.png", width: 1440, height: 900, alt: { en: "Patient detail with reasoning", es: "Detalle de paciente con razonamiento" }, caption: { en: "Every level shows its clinical reasoning.", es: "Cada nivel muestra su razonamiento clínico." } },
        { src: "/projects/er-triage-queue-manager/shot-audit-log.png", width: 1440, height: 900, alt: { en: "Status audit log", es: "Registro de cambios de estado" }, caption: { en: "Who changed what, and when.", es: "Quién cambió qué y cuándo." } },
      ],
    },
  },
  {
    slug: "family-phrase-game",
    title: { en: "Family Phrase Game", es: "Juego de frases familiares" },
    status: "live",
    period: { en: "2026", es: "2026" },
    role: { en: "Built and deployed", es: "Construido y publicado" },
    oneLiner: {
      en: "A party game built from phrases our family submitted, shipped as a web app in time for the event it was made for.",
      es: "Un juego de fiesta hecho con frases que envió nuestra familia, publicado como app web a tiempo para el evento para el que se hizo.",
    },
    facts: [{ value: "Flask", label: { en: "on Render", es: "en Render" } }],
    media: { type: "image", src: "/projects/family-phrase-game/family-phrase-game-main.png", width: 1440, height: 900, alt: { en: "Family Phrase Game screen", es: "Pantalla del juego de frases" } },
    links: [visit("https://family-phrase-game.onrender.com/", "Open the game (free hosting, may take 30 seconds to wake)", "Abrir el juego (hosting gratuito, puede tardar 30 segundos en despertar)"), { href: "https://github.com/jpss2004-bot/family-phrase-game", label: { en: "Source on GitHub", es: "Código en GitHub" } }],
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Render"],
    caseStudy: {
      problem: {
        en: "Generic party games are fun, but they get better when the content is personal to the people playing.",
        es: "Los juegos de fiesta genéricos son divertidos, pero mejoran cuando el contenido es personal para quienes juegan.",
      },
      constraints: { en: ["A fixed date: it had to work at the event."], es: ["Una fecha fija: tenía que funcionar en el evento."] },
      decisions: [
        {
          title: { en: "Simple screens over accounts", es: "Pantallas simples en lugar de cuentas" },
          why: {
            en: "Accounts and a database would have added friction before the event; phrase loading, a timer and scoring were enough.",
            es: "Cuentas y base de datos habrían agregado fricción antes del evento; bastaban carga de frases, temporizador y puntuación.",
          },
        },
      ],
      outcome: { en: "Deployed and played at the family event.", es: "Publicado y jugado en el evento familiar." },
      evidence: { en: ["The deployed game."], es: ["El juego publicado."] },
    },
  },
];

export const explorations: L<string> = {
  en: "Explorations: an adaptive traffic-signal study and a reporting assistant for online harassment, written up as concepts without code.",
  es: "Exploraciones: un estudio de semáforos adaptativos y un asistente para reportar acoso en línea, documentados como conceptos sin código.",
};

/* ------------------------------------------------------------------ */
/* Summer 2026                                                          */
/* ------------------------------------------------------------------ */

export const summer = {
  weekStart: "2026-05-11",
  weekly: [107, 199, 89, 156, 118, 219, 107, 42, 231, 154, 172, 253, 294, 323, 149, 173, 208, 222],
  facts: [
    { value: "18", label: { en: "projects", es: "proyectos" } },
    { value: "3,215", label: { en: "commits", es: "commits" } },
    { value: "14,191", label: { en: "legal documents processed", es: "documentos legales procesados" } },
  ] as Fact[],
  href: "/summer-2026",
};

/* ------------------------------------------------------------------ */
/* How I build                                                          */
/* ------------------------------------------------------------------ */

export const method: { title: L<string>; body: L<string> }[] = [
  { title: { en: "Direct", es: "Dirigir" }, body: { en: "I scope the change, write the brief and fix the constraints before any code exists.", es: "Defino el alcance, escribo el encargo y fijo las restricciones antes de que exista código." } },
  { title: { en: "Isolate", es: "Aislar" }, body: { en: "Each agent works in its own git worktree, so parallel sessions never overwrite each other.", es: "Cada agente trabaja en su propio worktree de git, para que las sesiones en paralelo nunca choquen." } },
  { title: { en: "Gate", es: "Verificar" }, body: { en: "Nothing merges without tests, type checks, coverage ratchets and CI on self-hosted runners.", es: "Nada se fusiona sin pruebas, revisión de tipos, umbrales de cobertura y CI en runners propios." } },
  { title: { en: "Remember", es: "Recordar" }, body: { en: "A searchable knowledge base of every lesson and trap, recalled automatically at the start of each task.", es: "Una base de conocimiento con cada lección y cada trampa, que se consulta sola al inicio de cada tarea." } },
  { title: { en: "Automate", es: "Automatizar" }, body: { en: "An autonomous shift every six hours finds, fixes and proves bugs, then asks for merge approval in Slack.", es: "Un turno autónomo cada seis horas encuentra, corrige y prueba errores, y pide aprobación en Slack para fusionar." } },
  { title: { en: "Ship", es: "Publicar" }, body: { en: "I review and authorize the merge. The main branch deploys to production.", es: "Reviso y autorizo la fusión. La rama principal se publica a producción." } },
];

export const allCaseSlugs = [...featured, ...shippedCases].map((p) => p.slug);
export function getProject(slug: string): Project | undefined {
  return [...featured, ...shippedCases].find((p) => p.slug === slug);
}
export function caseOrder(): Project[] {
  return [...featured, ...shippedCases];
}
