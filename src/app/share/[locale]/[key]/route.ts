import { isLocale, locales } from "@/data/i18n";
import { allCaseSlugs, getProject, pick } from "@/data/content";
import { entryLocales, getJournalEntry, hasLocale, journalLabels, localized, visibleEntries } from "@/data/journal";
import { renderShareCard } from "@/lib/share-card";

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return [...locales.flatMap(locale => ["home", "journal", ...allCaseSlugs].map(key => ({ locale, key }))), ...visibleEntries().flatMap(entry => entryLocales(entry).map(locale => ({ locale, key: `article-${entry.slug}` })))];
}
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; key: string }> }) {
  const { locale, key } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  const es = locale === "es";
  if (key === "home") return renderShareCard({ locale, title: "José Pablo Sámano Suárez", titleLines: ["José Pablo", "Sámano Suárez"], subtitle: es ? "Desarrollo full-stack y backend" : "Full-stack & backend engineering", portrait: true });
  if (key === "journal") return renderShareCard({ locale, title: journalLabels[locale].name, subtitle: es ? "Software, IA e ideas · JP Sámano" : "Software, AI & ideas · JP Sámano", portrait: true });
  const project = getProject(key);
  if (project) return renderShareCard({ locale, title: pick(project.title, locale), subtitle: es ? "Un proyecto de JP Sámano" : "A project by JP Sámano", documentMark: key === "verifaid", mark: key === "checkwise" ? "/projects/checkwise/mark-dark.png" : key === "neyvu" ? "/projects/neyvu/mark-dark.svg" : undefined });
  const entry = key.startsWith("article-") ? getJournalEntry(key.slice(8)) : undefined;
  if (entry && hasLocale(entry, locale)) return renderShareCard({ locale, title: localized(entry, locale).title, subtitle: `${journalLabels[locale].name} · JP Sámano`, article: true, portrait: true });
  return new Response(null, { status: 404 });
}
