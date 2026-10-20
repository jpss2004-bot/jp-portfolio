import type { JournalEntry } from "@/data/journal";

export function validateJournalEntries(entries: JournalEntry[]): void {
  const slugs = new Set<string>();
  const validDate = (value: string | undefined) => !!value && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) && Number.isFinite(Date.parse(value));
  const validUrl = (value: string) => { try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; } };
  for (const entry of entries) {
    const fail = (message: string): never => { throw new Error(`Journal ${entry.slug}: ${message}`); };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || slugs.has(entry.slug)) fail("invalid or duplicate slug");
    slugs.add(entry.slug);
    if (!["draft", "published"].includes(entry.status) || !["en", "es"].includes(entry.language) || !["article", "note", "resource"].includes(entry.kind)) fail("invalid status, language or kind");
    if (!entry.title?.trim() || !entry.summary.en?.trim() || !entry.summary.es?.trim()) fail("title and bilingual summaries are required");
    if (!validDate(entry.writtenAt)) fail("writtenAt must be an ISO date");
    if (entry.status === "published" && !validDate(entry.publishedAt)) fail("published entries require a real publishedAt date");
    if (entry.updatedAt && !validDate(entry.updatedAt)) fail("updatedAt must be an ISO date");
    if (entry.externalPublication && !validUrl(entry.externalPublication.url)) fail("publication link must use http(s)");
    const ids = new Set(entry.references.map((reference) => reference.id));
    if (ids.size !== entry.references.length || entry.references.some((reference) => !/^[\da-z]+$/.test(reference.id) || !validUrl(reference.url))) fail("invalid or duplicate references");
    const headings = new Set(["article-start", "sources", "main"]);
    for (const block of entry.blocks) {
      if (!["paragraph", "heading", "quote", "list", "figure", "resource"].includes(block.type)) fail("unknown content block");
      if (block.type === "heading") {
        if (!/^[a-z0-9-]+$/.test(block.id) || headings.has(block.id)) fail("invalid or duplicate heading ID");
        headings.add(block.id);
      }
      if (block.type === "figure" && !["capacity", "cooling"].includes(block.figure)) fail("unknown diagram");
      if (block.type === "resource" && !validUrl(block.href)) fail("resource links must use http(s)");
      const texts = "text" in block ? [block.text] : block.type === "list" ? block.items : [];
      for (const text of texts) {
        if (!text.trim()) fail("empty content block");
        for (const match of text.matchAll(/\[([\da-z, ]+)\]/g)) {
          if (match[1].split(",").some((id) => !ids.has(id.trim()))) fail("unresolved citation");
        }
      }
    }
    for (const asset of [entry.pdf, entry.cover]) {
      if (asset && !/^content\/journal\/assets\/[a-z0-9.-]+\.(pdf|png)$/.test(asset)) fail("invalid asset path");
    }
  }
}
