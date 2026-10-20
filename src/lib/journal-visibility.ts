import type { JournalEntry } from "@/data/journal";

export function publishedJournal(entries: JournalEntry[]) {
  return entries.filter((entry) => entry.status === "published").sort((a, b) => (b.publishedAt ?? b.writtenAt).localeCompare(a.publishedAt ?? a.writtenAt));
}
export function visibleJournal(entries: JournalEntry[], preview: boolean) {
  return preview ? [...entries].sort((a, b) => b.writtenAt.localeCompare(a.writtenAt)) : publishedJournal(entries);
}
