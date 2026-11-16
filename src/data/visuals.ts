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
export type ProjectVisual = { tone: string; mark: Mark; shot?: Shot; owner?: string };

const legalshelf: Mark = { kind: "image", src: "/brand/legalshelf-mark.svg", width: 32, height: 32 };

export const visuals: Record<string, ProjectVisual> = {
  checkwise: { tone: "#0b7a72", mark: { kind: "project", slug: "checkwise" }, shot: { src: "/projects/checkwise/client-dashboard.webp", width: 1600, height: 900, label: "checkwise.com.mx" } },
  flaregrain: { tone: "#e0703f", mark: { kind: "project", slug: "flaregrain" }, shot: { src: "/projects/flaregrain/ask.webp", width: 1920, height: 1200, label: "flaregrain-submission.vercel.app" } },
  neyvu: { tone: "#5468d4", mark: { kind: "project", slug: "neyvu" }, shot: { src: "/projects/neyvu/answer.png", width: 1280, height: 800, label: "Neyvu · demo course" } },
  verifaid: { tone: "#7958ba", mark: { kind: "project", slug: "verifaid" }, owner: "LegalShelf" },
  "document-pipelines": { tone: "#00558a", mark: legalshelf, owner: "LegalShelf" },
  "legalshelf-mx": { tone: "#00558a", mark: legalshelf, shot: { src: "/projects/legalshelf-mx/home.webp", width: 1280, height: 800, label: "legalshelf.mx" } },
  savr: { tone: "#843c6c", mark: { kind: "monogram", text: "S" }, shot: { src: "/projects/savr/savr-dashboard.png", width: 2880, height: 1800, label: "SAVR" } },
  "band-of-brothers": { tone: "#c8553d", mark: { kind: "monogram", text: "B" }, shot: { src: "/art/bob.webp", width: 880, height: 550, label: "Band of Brothers" } },
  "la-red-de-casa": { tone: "oklch(0.60 0.125 42)", mark: { kind: "monogram", text: "R" } },
  Cotejo: { tone: "#1f6aa5", mark: legalshelf, owner: "LegalShelf" },
  "POS Geocoder": { tone: "#0f7383", mark: legalshelf, owner: "LegalShelf" },
  "Red 360+1": { tone: "#e53838", mark: { kind: "image", src: "/brand/red360-mark.svg", width: 64, height: 64 }, shot: { src: "/art/red360.webp", width: 1200, height: 700, label: "red360mas1.com" } },
  "AI in legal practice": { tone: "#c4572f", mark: { kind: "monogram", text: "AI" } },
  "er-triage-queue-manager": { tone: "#243c6c", mark: { kind: "monogram", text: "ER" }, shot: { src: "/projects/er-triage-queue-manager/shot-dashboard.png", width: 2880, height: 1800, label: "ER Triage & Queue Manager" } },
  "family-phrase-game": { tone: "#e8800c", mark: { kind: "monogram", text: "F" }, shot: { src: "/projects/family-phrase-game/family-phrase-game-main.png", width: 1277, height: 896, label: "family-phrase-game.onrender.com" } },
};

export const fallbackVisual = (name: string): ProjectVisual => ({ tone: "oklch(0.62 0.155 38)", mark: { kind: "monogram", text: name.slice(0, 1) } });
export const visualFor = (key: string, name: string) => visuals[key] ?? fallbackVisual(name);

/* Organisation colours used outside the project list. */
export const orgTones = { legalshelf: "#00558a", acadia: "#113e74", flaregrain: "#e0703f", coral: "oklch(0.62 0.155 38)", journal: "#258c8b" };
