import { journalPath, publishedEntries } from "@/data/journal";
import { profile } from "@/data/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";
const xml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!);
export function GET() {
  const items = publishedEntries().map((entry) => `<item><title>${xml(entry.title)}</title><link>${siteUrl}${journalPath(entry)}</link><guid isPermaLink="true">${siteUrl}${journalPath(entry)}</guid><description>${xml(entry.summary[entry.language])}</description><pubDate>${new Date(entry.publishedAt!).toUTCString()}</pubDate></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(profile.shortName)} — Journal</title><link>${siteUrl}/en/journal</link><description>Articles, notes and resources by ${xml(profile.name)}.</description><atom:link href="${siteUrl}/journal/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
