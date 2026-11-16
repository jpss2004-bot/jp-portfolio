import type { Locale } from "@/data/i18n";
import { journalAsset, journalLabels, journalPath, readingMinutes, type JournalEntry } from "@/data/journal";
import { visuals, type ProjectVisual } from "@/data/visuals";

/* Spanish names for topics; anything missing is shown as written. */
const topicNames: Record<string, string> = {
  "AI infrastructure": "Infraestructura de IA", "Nova Scotia": "Nueva Escocia", "Public accountability": "Rendición de cuentas",
  Leadership: "Liderazgo", AI: "IA", "NASA Space Apps": "NASA Space Apps", Engineering: "Ingeniería",
  "Human review": "Revisión humana", "Local AI": "IA local", Product: "Producto",
};
export const topicLabel = (topic: string, locale: Locale) => (locale === "es" ? topicNames[topic] ?? topic : topic);

/* Posts about a project borrow its colour and screenshot as their cover. */
const relatedProject: Record<string, string> = {
  "leading-a-48-hour-nasa-build": "flaregrain",
  "keeping-model-readings-apart-from-human-decisions": "checkwise",
  "running-a-study-assistant-on-a-local-mac": "neyvu",
};

export type JournalCard = {
  slug: string; href: string; title: string; summary: string; language: Locale; draft: boolean;
  date: string; dateLabel: string; kind: string; minutes: string; foreign: string | null;
  topics: { key: string; label: string }[];
  tone: string; cover: { kind: "image"; src: string } | { kind: "project"; visual: ProjectVisual } | null;
  project?: { slug: string; href: string };
};

export function journalCard(entry: JournalEntry, locale: Locale): JournalCard {
  const t = journalLabels[locale];
  const date = entry.publishedAt ?? entry.writtenAt;
  const project = relatedProject[entry.slug];
  const visual = project ? visuals[project] : undefined;
  return {
    slug: entry.slug, href: journalPath(entry), title: entry.title, summary: entry.summary[locale], language: entry.language, draft: entry.status === "draft",
    date, dateLabel: new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date)),
    kind: t.kinds[entry.kind], minutes: `${readingMinutes(entry)} ${t.minutes}`, foreign: entry.language !== locale ? t.english : null,
    topics: entry.topics.map((key) => ({ key, label: topicLabel(key, locale) })),
    tone: visual?.tone ?? "#258c8b",
    cover: entry.cover ? { kind: "image", src: journalAsset(entry, "cover") } : visual ? { kind: "project", visual } : null,
    project: project ? { slug: project, href: `/${locale}/projects/${project}` } : undefined,
  };
}
