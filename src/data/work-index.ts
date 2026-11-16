import { pick, primaryProjects, shipped, statusLabel, supportingProjects } from "./content";
import type { Locale } from "./i18n";

export type Category = "featured" | "product" | "webapp" | "desktop" | "website" | "learning";
export type IndexRow = { key: string; name: string; line: string; kind: string; year: string; yearNum: string; category: Category; href?: string; external: boolean; image?: string; contain?: boolean };

export const categoryLabels: Record<Category, { en: string; es: string }> = {
  featured: { en: "Featured", es: "Destacados" },
  product: { en: "Products and pipelines", es: "Productos y pipelines" },
  webapp: { en: "Web apps", es: "Apps web" },
  desktop: { en: "Desktop tools", es: "Herramientas de escritorio" },
  website: { en: "Websites", es: "Sitios web" },
  learning: { en: "Talks and coursework", es: "Pláticas y trabajo académico" },
};

const art: Record<string, { src: string; contain?: boolean; category: Category }> = {
  checkwise: { src: "/projects/checkwise/client-dashboard.webp", category: "featured" },
  flaregrain: { src: "/projects/flaregrain/ask.webp", category: "featured" },
  neyvu: { src: "/projects/neyvu/answer.png", category: "featured" },
  verifaid: { src: "/art/verifaid-3d.webp", contain: true, category: "product" },
  "document-pipelines": { src: "/art/pipelines-3d.webp", contain: true, category: "product" },
  "legalshelf-mx": { src: "/projects/legalshelf-mx/home.webp", category: "website" },
  SAVR: { src: "/projects/savr/savr-dashboard.png", category: "webapp" },
  "Band of Brothers": { src: "/art/bob.webp", category: "webapp" },
  "La Red de Casa": { src: "/art/redcasa-3d.webp", contain: true, category: "webapp" },
  Cotejo: { src: "/art/cotejo-3d.webp", contain: true, category: "desktop" },
  "POS Geocoder": { src: "/art/geocoder-3d.webp", contain: true, category: "desktop" },
  "Red 360+1": { src: "/art/red360.webp", category: "website" },
  "AI in legal practice": { src: "/art/talk-3d.webp", contain: true, category: "learning" },
  "ER Triage & Queue Manager": { src: "/projects/er-triage-queue-manager/shot-dashboard.png", category: "learning" },
  "Family Phrase Game": { src: "/projects/family-phrase-game/family-phrase-game-main.png", category: "webapp" },
};

const yearOf = (text: string) => text.match(/20\d\d/)?.[0] ?? "";

/** Every project as one list. `withFeatured` adds the three homepage stories. */
export function workRows(locale: Locale, withFeatured = false): IndexRow[] {
  const cases = [...(withFeatured ? primaryProjects : []), ...supportingProjects];
  return [
    ...cases.map((project) => ({
      key: project.slug,
      name: pick(project.title, locale),
      line: pick(project.oneLiner, locale),
      kind: pick(statusLabel[project.status], locale),
      year: pick(project.period, locale),
      yearNum: yearOf(project.period.en),
      category: art[project.slug]?.category ?? "product",
      href: `/${locale}/projects/${project.slug}`,
      external: false,
      image: art[project.slug]?.src,
      contain: art[project.slug]?.contain,
    })),
    ...shipped.map((item) => ({
      key: item.name,
      name: item.name,
      line: pick(item.line, locale),
      kind: pick(item.kind, locale),
      year: item.year,
      yearNum: item.year,
      category: art[item.name]?.category ?? "webapp",
      href: item.slug ? `/${locale}/projects/${item.slug}` : item.href,
      external: !item.slug && !!item.href,
      image: art[item.name]?.src,
      contain: art[item.name]?.contain,
    })),
  ];
}
