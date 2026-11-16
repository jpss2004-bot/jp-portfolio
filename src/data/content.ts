import type { Locale } from "./i18n";
import { neyvu } from "./neyvu";
import { flaregrain } from "./flaregrain";
import { additionalCases } from "./additional-cases";

/**
 * Single source of truth for the portfolio.
 *
 * Every figure here is dated and verifiable from git history or the project
 * itself. When a number changes, change it here and update `asOf`.
 */

export type L<T> = { en: T; es: T };
export const pick = <T,>(value: L<T>, locale: Locale): T => value[locale] ?? value.en;

export const asOf: L<string> = { en: "reviewed 20 October 2026", es: "revisado el 20 de octubre de 2026" };

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

export type Status = "production" | "pilot" | "delivered" | "deployed" | "live" | "prototype" | "submitted";

export const statusLabel: Record<Status, L<string>> = {
  production: { en: "In production", es: "En producción" },
  pilot: { en: "Controlled pilot", es: "Piloto controlado" },
  delivered: { en: "Delivered", es: "Entregado" },
  deployed: { en: "Deployed", es: "Publicado" },
  live: { en: "Live", es: "En línea" },
  prototype: { en: "Prototype", es: "Prototipo" },
  submitted: { en: "NASA Space Apps 2026", es: "NASA Space Apps 2026" },
};

export type Fact = { value: string; label: L<string> };
export type Media =
  | { type: "image"; src: string; width: number; height: number; alt: L<string> }
  | { type: "diagram"; diagram: "verifaid" | "pipelines" };
export type Visual =
  | { kind: "image"; src: string; width: number; height: number; alt: L<string>; caption?: L<string>; focus?: "compliance-verdict" }
  | { kind: "video"; src: string; poster: string; width: number; height: number; alt: L<string>; caption?: L<string> }
  | { kind: "system"; system: "verifaid" | "pipelines" };
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
  metricNote?: L<string>;
  media?: Media;
  /** Large visuals for the home stage and the case hero. */
  visuals?: { primary: Visual; secondary?: Visual };
  diagram?: "verifaid" | "pipelines";
  links: LinkItem[];
  stack: string[];
  /** Named collaborators, for team projects. */
  team?: { name: string; role: L<string> }[];
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
    period: { en: "May 2026 – present", es: "may 2026 – presente" },
    role: { en: "Lead developer, LegalShelf", es: "Desarrollador principal, LegalShelf" },
    oneLiner: {
      en: "Recurring REPSE compliance for Mexican companies. Providers upload evidence, reviewers decide, and clients see their exposure across SAT, IMSS and INFONAVIT.",
      es: "Cumplimiento REPSE recurrente para empresas mexicanas. Los proveedores cargan evidencia, los revisores deciden y los clientes ven su exposición ante SAT, IMSS e INFONAVIT.",
    },
    facts: [
      { value: "7", label: { en: "client companies", es: "empresas cliente" } },
      { value: "~20,000", label: { en: "documents processed", es: "documentos procesados" } },
      { value: "14,714", label: { en: "backend + frontend tests · Sep 2026", es: "pruebas backend + frontend · sep 2026" } },
      { value: "6", label: { en: "product surfaces", es: "superficies del producto" } },
    ],
    metricNote: { en: "Customer and document figures: 11 September 2026. Test total: September 2026. Product narrative reviewed 20 October.", es: "Cifras de clientes y documentos: 11 de septiembre de 2026. Pruebas: septiembre de 2026. Relato del producto revisado el 20 de octubre." },
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
      primary: { kind: "image", src: "/projects/checkwise/client-dashboard.webp", width: 1600, height: 900, focus: "compliance-verdict", alt: { en: "CheckWise client dashboard: compliance across providers and obligations needing attention", es: "Panel del cliente en CheckWise: cumplimiento de proveedores y obligaciones que requieren atención" }, caption: { en: "Client dashboard. Actual application with demo data.", es: "Panel del cliente. App real con datos de demostración." } },
      secondary: { kind: "video", src: "/projects/checkwise/loops/review-decision.mp4", poster: "/projects/checkwise/loops/review-decision.webp", width: 1280, height: 672, alt: { en: "CheckWise review walkthrough", es: "Recorrido de revisión en CheckWise" }, caption: { en: "8-second review walkthrough. Actual app with demo data; the tutorial spotlight highlights the active control.", es: "Recorrido de revisión de 8 segundos. App real con datos de demostración; el tutorial resalta el control activo." } },
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
          "Critical review decisions require authorized human review. Objective checks and client-configured rules have an explicit, auditable scope.",
          "A small team responsible for production operation, migration review and controlled releases.",
        ],
        es: [
          "Tres públicos con trabajos distintos: proveedores que cargan, revisores de LegalShelf que deciden y empresas cliente que leen el riesgo.",
          "Los proveedores suelen ser contadores no técnicos que trabajan en español, muchos desde el celular.",
          "Las decisiones críticas requieren revisión humana autorizada. Las verificaciones objetivas y reglas configuradas por el cliente tienen un alcance explícito y auditable.",
          "Un equipo pequeño responsable de la operación, revisión de migraciones y liberaciones controladas.",
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
          title: { en: "Explicit rules, traceable review", es: "Reglas explícitas, revisión trazable" },
          why: {
            en: "Every upload gets an automatic prevalidation: one plain verdict, the fields it read, and where on the page it read them. Critical decisions stay with an authorized reviewer; configured acceptance/rejection rules are separate from the model reading, and transitions retain their audit trail.",
            es: "Cada carga recibe una prevalidación automática: un veredicto claro, los datos que leyó y en qué parte de la página los leyó. Las decisiones críticas quedan en manos de un revisor autorizado; las reglas configuradas de aceptación y rechazo son distintas de la lectura del modelo, y las transiciones conservan su historial.",
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
            en: "I define the architecture and change constraints before using coding agents. Type checks, relevant tests, coverage requirements and review establish what is ready for a controlled release.",
            es: "Defino arquitectura y restricciones antes de usar agentes de programación. Revisión de tipos, pruebas pertinentes, cobertura y revisión determinan qué está listo para una liberación controlada.",
          },
        },
      ],
      built: {
        en: [
          "Owned the obligation model, backend APIs, review interfaces and delivery across provider, client and reviewer surfaces.",
          "Connected institutions, cycles, periods and contracts so calendars and review state share the same domain model.",
          "Built document reading and review workflows with an explicit separation between model suggestions, configured rules and authorized human decisions.",
          "Direct AI coding agents in isolated worktrees, define the constraints and test gates, and review the changes before release.",
        ],
        es: [
          "Me hice cargo del modelo de obligaciones, APIs, interfaces de revisión y entrega para proveedores, clientes y revisores.",
          "Conecté instituciones, ciclos, periodos y contratos para que calendarios y estados compartan el modelo de dominio.",
          "Construí flujos documentales separando sugerencias del modelo, reglas configuradas y decisiones humanas autorizadas.",
          "Dirijo agentes de programación en worktrees aislados, defino restricciones y verificaciones, y reviso los cambios antes de liberarlos.",
        ],
      },
      outcome: {
        en: "The September 2026 snapshot recorded 7 client companies, 15+ vendors and about 20,000 documents processed, with reviewers clearing around 50 documents a day at roughly a minute each. The October 19 release added contract-based provider workflows, contract calendars and lead tools. It has six surfaces: a provider portal, a client portal, a reviewer console, a public site, an in-app academy with 33 filmed lessons, and a reporting suite. Uploads get live SAT invoice-folio checks and AI-generated-document detection, and clients can set their own auto-accept and auto-reject rules.",
        es: "El corte de septiembre de 2026 registró 7 empresas cliente, más de 15 proveedores y cerca de 20,000 documentos procesados; los revisores resolvían unos 50 documentos diarios en cerca de un minuto cada uno. La liberación del 19 de octubre añadió flujos por contrato para proveedores, calendarios por contrato y herramientas de prospectos. Tiene seis superficies: portal de proveedores, portal de clientes, consola de revisión, sitio público, una academia integrada con 33 lecciones filmadas y un módulo de reportes. Las cargas pasan por verificación en vivo de folios CFDI ante el SAT y detección de documentos generados por IA, y los clientes pueden definir sus propias reglas de aceptación y rechazo automático.",
      },
      evidence: {
        en: [
          "7 client companies, 15+ vendors and about 20,000 documents processed in production.",
          "2,454 commits on the main branch between 12 May and 11 September 2026.",
          "667 merged pull requests between June and September.",
          "9,941 backend and 4,773 frontend tests in the September 2026 verification snapshot; this is a dated baseline, not a live counter.",
          "Live at checkwise.com.mx. The source is private; I'm happy to walk through it.",
        ],
        es: [
          "7 empresas cliente, más de 15 proveedores y cerca de 20,000 documentos procesados en producción.",
          "2,454 commits en la rama principal entre el 12 de mayo y el 11 de septiembre de 2026.",
          "667 pull requests fusionados entre junio y septiembre.",
          "9,941 pruebas de backend y 4,773 de frontend en el corte de verificación de septiembre de 2026; es una referencia fechada, no un contador en vivo.",
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
  flaregrain,
  neyvu,
  {
    slug: "verifaid",
    title: { en: "Verifaid", es: "Verifaid" },
    status: "pilot",
    period: { en: "Jul 2026 – present", es: "jul 2026 – presente" },
    metricNote: { en: "Pilot figures and test baseline: 11 September 2026. Implementation reviewed through 14 September; status reviewed 20 October.", es: "Cifras del piloto y referencia de pruebas: 11 de septiembre de 2026. Implementación revisada hasta el 14 de septiembre; estado revisado el 20 de octubre." },
    role: { en: "Lead developer, LegalShelf", es: "Desarrollador principal, LegalShelf" },
    oneLiner: {
      en: "Who can legally sign, and within what limits? Verifaid reads corporate documents and powers of attorney, cites the exact page, and leaves approval to a second reviewer.",
      es: "¿Quién puede firmar legalmente y con qué límites? Verifaid lee documentos societarios y poderes, cita la página exacta y deja la aprobación a un segundo revisor.",
    },
    facts: [
      { value: "50+", label: { en: "operations cleared", es: "operaciones resueltas" } },
      { value: "7", label: { en: "pipeline stages", es: "etapas del pipeline" } },
      { value: "262", label: { en: "commits in six weeks", es: "commits en seis semanas" } },
      { value: "596", label: { en: "automated tests", es: "pruebas automatizadas" } },
    ],
    visuals: {
      primary: { kind: "system", system: "verifaid" },
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
        en: "Verifaid returns a decision, not a report: whether signing can proceed, why it cannot, and who holds the authority to sign. It has cleared more than 50 operations for a paying client. In six weeks the platform went from an empty repository to a controlled pilot: a seven-stage pipeline, a citation viewer, traceable human approval where every review keeps its rationale, and a second person required to approve. Subsequent implementation added approved-opinion PDF issuance with a responsible reviewer, version and fingerprint, plus recovery of failed document readings. PDF issuance is distinct from an electronic-signing rollout; the real-data and signing gates remain explicit.",
        es: "Verifaid entrega una decisión, no un reporte: si la firma puede proceder, por qué no y quién tiene las facultades para firmar. Ha resuelto más de 50 operaciones para un cliente de pago. En seis semanas la plataforma pasó de un repositorio vacío a un piloto controlado: un pipeline de siete etapas, un visor de citas y una aprobación humana trazable donde cada revisión conserva su justificación y requiere una segunda persona. La implementación posterior añadió emisión de dictámenes aprobados en PDF con responsable, versión y huella, además de recuperación de lecturas fallidas. Emitir un PDF es distinto de liberar firma electrónica; las compuertas de datos reales y firma siguen explícitas.",
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
      primary: { kind: "system", system: "pipelines" },
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
    period: { en: "Aug – Oct 2026", es: "ago – oct 2026" },
    role: { en: "Developer, LegalShelf", es: "Desarrollador, LegalShelf" },
    oneLiner: {
      en: "A bilingual rebuild of the company’s site in Astro, followed by a broader visual, interaction and structured-data update. Published on the Vercel feedback deployment; the domain transition is separate.",
      es: "Reconstrucción bilingüe del sitio de la empresa en Astro, seguida de una actualización visual, de interacción y datos estructurados. Publicada en Vercel para revisión; el cambio de dominio es un paso independiente.",
    },
    facts: [
      { value: "35", label: { en: "legacy URLs preserved", es: "URLs heredadas preservadas" } },
      { value: "87", label: { en: "routes in the October 18 build", es: "rutas en el build del 18 de octubre" } },
      { value: "EN / ES", label: { en: "shared bilingual architecture", es: "arquitectura bilingüe compartida" } },
    ],
    metricNote: { en: "Legacy URL baseline: September 2026. Bilingual route/build verification: 18 October 2026.", es: "Referencia de URLs heredadas: septiembre de 2026. Verificación de rutas y build bilingüe: 18 de octubre de 2026." },
    media: {
      type: "image",
      src: "/projects/legalshelf-mx/home.webp",
      width: 1280,
      height: 800,
      alt: { en: "The rebuilt legalshelf.mx home page", es: "La página de inicio reconstruida de legalshelf.mx" },
    },
    visuals: {
      primary: { kind: "image", src: "/projects/legalshelf-mx/home.webp", width: 1280, height: 800, alt: { en: "The rebuilt legalshelf.mx home page", es: "La página de inicio reconstruida de legalshelf.mx" }, caption: { en: "Marketing site rebuilt in Astro. Actual page capture.", es: "Sitio de marketing reconstruido en Astro. Captura de la página real." } },
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
            en: "A marketing site doesn't need a client framework on every page. Static output with islands keeps interactive behavior localized; the October update adds bilingual pages without shipping a translation service to the browser.",
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
        en: "A 12-section home page built from the positioning document, plus platform, guided tour, industries, resources, blog, case studies and glossary pages. The October 17–18 update extended the site in Spanish and English, with visual, motion, privacy-control and structured-data checks. Published to the Vercel feedback alias; the domain transition remains a separate step. I am also working on broader LegalShelf platform enhancements and AI modules, which remain work in progress.",
        es: "Un home de 12 secciones construido desde el documento de posicionamiento, además de páginas de plataforma, recorrido guiado, industrias, recursos, blog, casos y glosario. La actualización del 17–18 de octubre amplió el sitio en español e inglés, con verificaciones visuales, de movimiento, privacidad y datos estructurados. Publicado en el alias de Vercel para revisión; el cambio de dominio sigue separado. También trabajo en mejoras de la plataforma LegalShelf y módulos de IA, aún en desarrollo.",
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
};

export const shipped: Shipped[] = [
  {
    slug: "savr", name: "SAVR", year: "2026", status: "live", href: "https://context-aware-dining-platform-1.vercel.app",
    kind: { en: "Web app", es: "App web" },
    line: { en: "Context-aware restaurant recommendations that explain why each one fits. 10 active users around Wolfville, NS.", es: "Recomendaciones de restaurantes según el contexto, que explican por qué encaja cada una. 10 usuarios activos en Wolfville, Nueva Escocia." },
  },
  {
    slug: "band-of-brothers", name: "Band of Brothers", year: "2026", status: "live", href: "https://bandofbrothers-seven.vercel.app",
    kind: { en: "Web app", es: "App web" },
    line: { en: "Draft engine and weekly newsletter for the 12-team fantasy league I run, with an automated Tuesday issue.", es: "Motor de draft y boletín semanal para la liga de fantasy de 12 equipos que administro, con un número automático cada martes." },
  },
  {
    slug: "la-red-de-casa", name: "La Red de Casa", year: "2026", status: "live", href: "https://la-red-de-casa.vercel.app",
    kind: { en: "Web app", es: "App web" },
    line: { en: "A phone-first app that coordinates a family's trips, cars and drivers, with parent approval.", es: "Una app para el celular que coordina los traslados, autos y choferes de una familia, con aprobación de los papás." },
  },
  {
    name: "Cotejo", year: "2026", status: "delivered",
    kind: { en: "macOS app · Swift", es: "App para macOS · Swift" },
    line: { en: "Checks corporate data sheets against the underlying legal PDFs with on-device OCR, and never writes a cell it couldn't verify.", es: "Coteja hojas de datos corporativos contra los PDFs legales con OCR en el dispositivo, y nunca escribe una celda que no pudo verificar." },
  },
  {
    name: "POS Geocoder", year: "2026", status: "delivered",
    kind: { en: "Desktop app · PySide6", es: "App de escritorio · PySide6" },
    line: { en: "Turns payment-terminal coordinates into audited addresses with official INEGI codes, from a 157,000-row catalog.", es: "Convierte coordenadas de terminales de pago en direcciones auditadas con claves oficiales del INEGI, a partir de un catálogo de 157,000 filas." },
  },
  {
    name: "Red 360+1", year: "2026", status: "delivered",
    kind: { en: "Website · freelance", es: "Sitio web · freelance" },
    line: { en: "A 19-page bilingual redesign of a civil-society organization's institutional site, shipped in August after 34 tagged releases.", es: "Rediseño bilingüe de 19 páginas del sitio institucional de una organización de la sociedad civil, publicado en agosto tras 34 versiones etiquetadas." },
  },
  {
    name: "AI in legal practice", year: "2026", status: "delivered",
    kind: { en: "Talk · landing page", es: "Plática · landing page" },
    line: { en: "A 35-minute talk and site on using AI tools with legal judgment, for a Mexico City law firm.", es: "Una plática de 35 minutos y un sitio sobre el uso de IA con criterio jurídico, para un despacho de la Ciudad de México." },
  },
  {
    slug: "er-triage-queue-manager", name: "ER Triage & Queue Manager", year: "2025", status: "prototype",
    kind: { en: "Coursework · Python", es: "Proyecto académico · Python" },
    line: { en: "An emergency-room queue that ranks patients by ESI v4 acuity and shows the clinical reasoning behind every level.", es: "Una fila de urgencias que ordena pacientes por agudeza ESI v4 y muestra el razonamiento clínico de cada nivel." },
  },
  {
    slug: "family-phrase-game", name: "Family Phrase Game", year: "2026", status: "live", href: "https://family-phrase-game.onrender.com/",
    kind: { en: "Web app · Flask", es: "App web · Flask" },
    line: { en: "A party game built from phrases our family submitted, deployed in time for the event it was made for.", es: "Un juego de fiesta hecho con frases que envió nuestra familia, publicado a tiempo para el evento para el que se hizo." },
  },
];

/* Case studies for shipped projects that have one. Ported from the previous site. */
export const shippedCases: Project[] = [
  ...additionalCases,
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
  { title: { en: "Gate", es: "Verificar" }, body: { en: "I define the relevant tests, type checks and coverage requirements, then inspect the results for the change being released.", es: "Defino las pruebas, revisión de tipos y cobertura pertinentes, y reviso los resultados del cambio que se va a liberar." } },
  { title: { en: "Remember", es: "Recordar" }, body: { en: "A searchable knowledge base of every lesson and trap, recalled automatically at the start of each task.", es: "Una base de conocimiento con cada lección y cada trampa, que se consulta sola al inicio de cada tarea." } },
  { title: { en: "Automate", es: "Automatizar" }, body: { en: "During summer 2026, a shift every six hours found, fixed and proved bugs, then requested my approval to merge.", es: "Durante el verano de 2026, un turno cada seis horas encontraba, corregía y probaba errores, y pedía mi aprobación para fusionar." } },
  { title: { en: "Ship", es: "Publicar" }, body: { en: "I review and authorize the merge. The main branch deploys to production.", es: "Reviso y autorizo la fusión. La rama principal se publica a producción." } },
];

export const primaryProjects = ["checkwise", "flaregrain", "neyvu"].map((slug) => featured.find((p) => p.slug === slug)!);
export const supportingProjects = featured.filter((p) => !primaryProjects.includes(p));

export const allCaseSlugs = [...featured, ...shippedCases].map((p) => p.slug);
export function getProject(slug: string): Project | undefined {
  return [...featured, ...shippedCases].find((p) => p.slug === slug);
}
export function caseOrder(): Project[] {
  return [...primaryProjects, ...supportingProjects, ...shippedCases];
}
