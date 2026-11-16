import entry_leading_a_48_hour_nasa_build from "../../content/journal/leading-a-48-hour-nasa-build.json";
import { publishedJournal, visibleJournal } from "@/lib/journal-visibility";
import { validateJournalEntries } from "@/lib/validate-journal";
import novaScotia from "../../content/journal/ai-investment-nova-scotia-trust.json";
import entry_keeping_model_readings from "../../content/journal/keeping-model-readings-apart-from-human-decisions.json";
import entry_local_mac from "../../content/journal/running-a-study-assistant-on-a-local-mac.json";
import entry_address_match from "../../content/journal/when-to-trust-an-address-match.json";
import type { Locale } from "./i18n";

export type JournalBlock =
  | { type: "paragraph" | "quote"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; figure: "capacity" | "cooling" }
  | { type: "resource"; title: string; href: string; description: string };
/** A full translation of an entry's title and body. Sources stay in their original language. */
export type JournalTranslation = { title: string; blocks: JournalBlock[] };
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
  /** `labels` gives the link text on translated pages. */
  externalPublication?: { label: string; labels?: Partial<Record<Locale, string>>; url: string };
  translations?: Partial<Record<Locale, JournalTranslation>>;
};

export const journalEntries = [entry_leading_a_48_hour_nasa_build, novaScotia, entry_keeping_model_readings, entry_local_mac, entry_address_match] as JournalEntry[];
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
/** Languages an entry can be read in: its original first, then translations. */
export const entryLocales = (entry: JournalEntry): Locale[] => [entry.language, ...(Object.keys(entry.translations ?? {}) as Locale[]).filter((locale) => locale !== entry.language)];
export const hasLocale = (entry: JournalEntry, locale: Locale) => entryLocales(entry).includes(locale);
/** The entry as read in one language; falls back to the original. */
export function localized(entry: JournalEntry, locale: Locale) {
  const translation = locale !== entry.language ? entry.translations?.[locale] : undefined;
  return translation
    ? { title: translation.title, blocks: translation.blocks, language: locale, translated: true }
    : { title: entry.title, blocks: entry.blocks, language: entry.language, translated: false };
}
/** The article URL in `locale` when that version exists, otherwise the original. */
export const journalPath = (entry: JournalEntry, locale?: Locale) => `/${locale && hasLocale(entry, locale) ? locale : entry.language}/journal/${entry.slug}`;
export const journalAsset = (entry: JournalEntry, asset: "pdf" | "cover") => `/journal/assets/${entry.slug}/${asset}`;
export function readingMinutes(entry: JournalEntry, locale?: Locale) {
  const blocks = locale ? localized(entry, locale).blocks : entry.blocks;
  const text = blocks.flatMap((block) => "text" in block ? [block.text] : block.type === "list" ? block.items : []).join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 220));
}
export const journalLabels = {
  en: { name: "Journal", introduction: "Articles, notes and things worth keeping. On software, AI and the decisions around them.", read: "Read the article", english: "In English", original: "Original English article", translatedFrom: "Translated from Spanish", readOriginal: "Read the original in Spanish", start: "Introduction", written: "Written", published: "Published", minutes: "min read", draft: "Draft preview", preview: "This entry is a draft. It is excluded from the public sitemap and feed.", contents: "In this article", sources: "Sources", pdf: "Download the original PDF", kinds: { article: "Article", note: "Note", resource: "Resource" } },
  es: { name: "Diario", introduction: "Artículos, notas y referencias que vale la pena guardar. Sobre software, IA y las decisiones que los rodean.", read: "Leer el artículo", english: "En inglés", original: "Artículo original en inglés", translatedFrom: "Traducido del inglés", readOriginal: "Leer el original en inglés", start: "Introducción", written: "Escrito", published: "Publicado", minutes: "min de lectura", draft: "Vista previa del borrador", preview: "Esta entrada es un borrador. No aparece en el sitemap ni en el feed públicos.", contents: "En este artículo", sources: "Fuentes", pdf: "Descargar el PDF original", kinds: { article: "Artículo", note: "Nota", resource: "Recurso" } },
};
