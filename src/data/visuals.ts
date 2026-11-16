/**
 * How each project is shown in previews and indexes: its real colour, its real
 * mark where one exists, and a real screenshot where a public one exists.
 * Projects without public screens get a branded tile instead of an illustration.
 */
export type Mark =
  | { kind: "project"; slug: string }
  | { kind: "image"; src: string; width: number; height: number }
  | { kind: "monogram"; text: string };

export type Shot = { src: string; width: number; height: number; label: string };
export type MockKind = "verifaid" | "document-pipelines" | "cotejo" | "pos-geocoder" | "la-red-de-casa" | "ai-legal-practice";
export type ProjectVisual = { tone: string; mark: Mark; shot?: Shot; mock?: MockKind; owner?: string };

export const visuals: Record<string, ProjectVisual> = {
  checkwise: { tone: "#0b7a72", mark: { kind: "project", slug: "checkwise" }, shot: { src: "/projects/checkwise/client-dashboard.webp", width: 1600, height: 900, label: "checkwise.com.mx" } },
  flaregrain: { tone: "#e0703f", mark: { kind: "project", slug: "flaregrain" }, shot: { src: "/projects/flaregrain/ask.webp", width: 1920, height: 1200, label: "flaregrain-submission.vercel.app" } },
  neyvu: { tone: "#5468d4", mark: { kind: "project", slug: "neyvu" }, shot: { src: "/projects/neyvu/answer.png", width: 1280, height: 800, label: "Neyvu · demo course" } },
  verifaid: { tone: "#7958ba", mark: { kind: "project", slug: "verifaid" }, mock: "verifaid", owner: "LegalShelf" },
  "document-pipelines": { tone: "#00558a", mark: { kind: "project", slug: "document-pipelines" }, mock: "document-pipelines", owner: "LegalShelf" },
  "legalshelf-mx": { tone: "#00558a", mark: { kind: "image", src: "/brand/legalshelf-mark.svg", width: 32, height: 32 }, shot: { src: "/projects/legalshelf-mx/home.webp", width: 1280, height: 800, label: "legalshelf.mx" } },
  savr: { tone: "#843c6c", mark: { kind: "project", slug: "savr" }, shot: { src: "/projects/savr/savr-dashboard.png", width: 2880, height: 1800, label: "SAVR" } },
  "band-of-brothers": { tone: "#c8553d", mark: { kind: "project", slug: "band-of-brothers" }, shot: { src: "/art/bob.webp", width: 880, height: 550, label: "Band of Brothers" } },
  "la-red-de-casa": { tone: "oklch(0.60 0.125 42)", mark: { kind: "project", slug: "la-red-de-casa" }, mock: "la-red-de-casa" },
  cotejo: { tone: "#1f6aa5", mark: { kind: "project", slug: "cotejo" }, mock: "cotejo", owner: "LegalShelf" },
  "pos-geocoder": { tone: "#0f7383", mark: { kind: "project", slug: "pos-geocoder" }, mock: "pos-geocoder", owner: "LegalShelf" },
  "red-360": { tone: "#e53838", mark: { kind: "image", src: "/brand/red360-mark.svg", width: 64, height: 64 }, shot: { src: "/art/red360.webp", width: 1200, height: 700, label: "red360mas1.com" } },
  "ai-legal-practice": { tone: "#c4572f", mark: { kind: "project", slug: "ai-legal-practice" }, mock: "ai-legal-practice" },
  "er-triage-queue-manager": { tone: "#243c6c", mark: { kind: "project", slug: "er-triage-queue-manager" }, shot: { src: "/projects/er-triage-queue-manager/shot-dashboard.png", width: 2880, height: 1800, label: "ER Triage & Queue Manager" } },
  "family-phrase-game": { tone: "#e8800c", mark: { kind: "project", slug: "family-phrase-game" }, shot: { src: "/projects/family-phrase-game/family-phrase-game-main.png", width: 1277, height: 896, label: "family-phrase-game.onrender.com" } },
};

export const fallbackVisual = (name: string): ProjectVisual => ({ tone: "oklch(0.62 0.155 38)", mark: { kind: "monogram", text: name.slice(0, 1) } });
export const visualFor = (key: string, name: string) => visuals[key] ?? fallbackVisual(name);

/* Organisation colours used outside the project list. */
export const orgTones = { legalshelf: "#00558a", acadia: "#113e74", flaregrain: "#e0703f", coral: "oklch(0.62 0.155 38)", journal: "#258c8b" };
