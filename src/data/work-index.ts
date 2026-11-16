import { pick, primaryProjects, shipped, statusLabel, supportingProjects } from "./content";
import type { Locale } from "./i18n";
import { visualFor, type ProjectVisual } from "./visuals";

export type Category = "featured" | "product" | "webapp" | "desktop" | "website" | "learning";
export type IndexRow = { key: string; name: string; line: string; kind: string; year: string; yearNum: string; category: Category; href?: string; external: boolean; visual: ProjectVisual };

export const categoryLabels: Record<Category, { en: string; es: string }> = {
  featured: { en: "Featured", es: "Destacados" },
  product: { en: "Products and pipelines", es: "Productos y pipelines" },
  webapp: { en: "Web apps", es: "Apps web" },
  desktop: { en: "Desktop tools", es: "Herramientas de escritorio" },
  website: { en: "Websites", es: "Sitios web" },
  learning: { en: "Talks and coursework", es: "Pláticas y trabajo académico" },
};

const categories: Record<string, Category> = {
  checkwise: "featured", flaregrain: "featured", neyvu: "featured",
  verifaid: "product", "document-pipelines": "product",
  "legalshelf-mx": "website", "Red 360+1": "website",
  savr: "webapp", "band-of-brothers": "webapp", "la-red-de-casa": "webapp", "family-phrase-game": "webapp",
  Cotejo: "desktop", "POS Geocoder": "desktop",
  "AI in legal practice": "learning", "er-triage-queue-manager": "learning",
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
      category: categories[project.slug] ?? "product",
      href: `/${locale}/projects/${project.slug}`,
      external: false,
      visual: visualFor(project.slug, pick(project.title, locale)),
    })),
    ...shipped.map((item) => ({
      key: item.slug ?? item.name,
      name: item.name,
      line: pick(item.line, locale),
      kind: pick(item.kind, locale),
      year: item.year,
      yearNum: item.year,
      category: categories[item.slug ?? item.name] ?? "webapp",
      href: item.slug ? `/${locale}/projects/${item.slug}` : item.href,
      external: !item.slug && !!item.href,
      visual: visualFor(item.slug ?? item.name, item.name),
    })),
  ];
}
