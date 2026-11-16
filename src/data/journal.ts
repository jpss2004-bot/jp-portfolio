import entry_leading_a_48_hour_nasa_build from "../../content/journal/leading-a-48-hour-nasa-build.json";
import { publishedJournal, visibleJournal } from "@/lib/journal-visibility";
import { validateJournalEntries } from "@/lib/validate-journal";
import novaScotia from "../../content/journal/ai-investment-nova-scotia-trust.json";
import type { Locale } from "./i18n";

export type JournalBlock =
  | { type: "paragraph" | "quote"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; figure: "capacity" | "cooling" }
  | { type: "resource"; title: string; href: string; description: string };
export type JournalEntry = {
  slug: string;
  status: "draft" | "published";
  kind: "article" | "note" | "resource";
  language: Locale;
  title: string;
  summary: Record<Locale, string>;
  writtenAt: string;
  publishedAt?: string;
  updatedAt?: string;
  topics: string[];
  blocks: JournalBlock[];
  references: { id: string; label: string; url: string }[];
  pdf?: string;
  cover?: string;
  externalPublication?: { label: string; url: string };
};

export const journalEntries = [entry_leading_a_48_hour_nasa_build, novaScotia] as JournalEntry[];
validateJournalEntries(journalEntries);
export const journalPreview = process.env.NODE_ENV === "development" || process.env.JOURNAL_PREVIEW === "1";
export function publishedEntries() {
  return publishedJournal(journalEntries);
}
export function visibleEntries() {
  return visibleJournal(journalEntries, journalPreview);
}
export const showJournal = visibleEntries().length > 0;
export function getJournalEntry(slug: string) {
  return visibleEntries().find((entry) => entry.slug === slug);
}
export const journalPath = (entry: JournalEntry) => `/${entry.language}/journal/${entry.slug}`;
export const journalAsset = (entry: JournalEntry, asset: "pdf" | "cover") => `/journal/assets/${entry.slug}/${asset}`;
export function readingMinutes(entry: JournalEntry) {
  const text = entry.blocks.flatMap((block) => "text" in block ? [block.text] : block.type === "list" ? block.items : []).join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 220));
}
export const journalLabels = {
  en: { name: "Journal", introduction: "Articles, notes and things worth keeping. On software, AI and the decisions around them.", read: "Read the article", english: "In English", original: "Original English article", written: "Written", published: "Published", minutes: "min read", draft: "Draft preview", preview: "This entry is a draft. It is excluded from the public sitemap and feed.", contents: "In this article", sources: "Sources", pdf: "Download the original PDF", kinds: { article: "Article", note: "Note", resource: "Resource" } },
  es: { name: "Diario", introduction: "Artículos, notas y referencias que vale la pena guardar. Sobre software, IA y las decisiones que los rodean.", read: "Leer el artículo", english: "En inglés", original: "Artículo original en inglés", written: "Escrito", published: "Publicado", minutes: "min de lectura", draft: "Vista previa del borrador", preview: "Esta entrada es un borrador. No aparece en el sitemap ni en el feed públicos.", contents: "En este artículo", sources: "Fuentes", pdf: "Descargar el PDF original", kinds: { article: "Artículo", note: "Nota", resource: "Recurso" } },
};
