import { readFile } from "node:fs/promises";
import path from "node:path";
import { getJournalEntry, visibleEntries } from "@/data/journal";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return visibleEntries().flatMap((entry) => (["pdf", "cover"] as const).filter((asset) => entry[asset]).map((asset) => ({ slug: entry.slug, asset })));
}
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; asset: string }> }) {
  const { slug, asset } = await params;
  const entry = getJournalEntry(slug);
  if (!entry || (asset !== "pdf" && asset !== "cover") || !entry[asset]) return new Response("Not found", { status: 404 });
  const file = await readFile(path.join(process.cwd(), entry[asset]));
  return new Response(new Uint8Array(file), { headers: { "Content-Type": asset === "pdf" ? "application/pdf" : "image/png", "Content-Disposition": `${asset === "pdf" ? "attachment" : "inline"}; filename="${entry.slug}.${asset === "pdf" ? "pdf" : "png"}"`, ...(entry.status === "draft" ? { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" } : { "Cache-Control": "public, max-age=3600" }) } });
}
