/* eslint-disable @next/next/no-img-element -- ImageResponse renders PNGs and requires plain img elements with embedded assets. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Locale } from "@/data/i18n";

type Card = { title: string; subtitle: string; locale: Locale; mark?: string; portrait?: boolean; article?: boolean; documentMark?: boolean; titleLines?: string[] };
const regular = readFile(join(process.cwd(), "public/fonts/libre-franklin-regular.ttf"));
const semibold = readFile(join(process.cwd(), "public/fonts/libre-franklin-semibold.ttf"));

export async function renderShareCard(card: Card) {
  const [normal, bold] = await Promise.all([regular, semibold]);
  const file = card.portrait ? "/jp-samano-dark.jpg" : card.mark;
  const art = file ? `data:image/${file.endsWith(".svg") ? "svg+xml" : file.endsWith(".png") ? "png" : "jpeg"};base64,${(await readFile(join(process.cwd(), "public", file))).toString("base64")}` : undefined;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111b25", color: "#eef5f5", fontFamily: "Franklin", position: "relative" }}>
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
        <path d="M0 140H170Q230 140 230 200V430Q230 490 290 490H350M1200 140H1030Q970 140 970 200V430Q970 490 910 490H850M0 315H240M960 315H1200" stroke="#3d818d" strokeWidth="2" fill="none" />
        <circle cx="170" cy="140" r="10" fill="#55bdb2" /><circle cx="1030" cy="140" r="10" fill="#78a5df" />
        <circle cx="230" cy="315" r="7" fill="#55bdb2" /><circle cx="970" cy="315" r="7" fill="#78a5df" />
      </svg>
      {/* Everything meaningful stays inside the central 560 × 520 square crop. */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 560, height: 520, textAlign: "center", padding: "16px 10px" }}>
        {art ? <img src={art} alt="" width={card.portrait ? 80 : 86} height={card.portrait ? 106 : 86} style={{ objectFit: card.portrait ? "cover" : "contain", borderRadius: card.portrait ? 40 : 0, marginBottom: 24 }} /> : <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 28 }}><path d={card.documentMark ? "M13 6h29l10 10v8H42V6M13 6v46l13-13c4-4 8-2 6 4l-5 10c-1 3 2 5 5 2l8-8c4-4 7-2 7 2 0 3 2 4 6 4h7" : "M20 16L4 32l16 16M44 16l16 16-16 16M37 10L27 54"} stroke="#78c6c0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        <div style={{ display: "flex", fontSize: card.article ? 42 : card.title.length > 28 ? 44 : 58, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-1.8px", justifyContent: "center", flexDirection: "column" }}>{card.titleLines ? card.titleLines.map(line => <span key={line}>{line}</span>) : card.title}</div>
        <div style={{ display: "flex", fontSize: 23, lineHeight: 1.45, color: "#bdd2da", marginTop: 22, justifyContent: "center" }}>{card.subtitle}</div>
        <div style={{ display: "flex", fontSize: 18, color: "#77c8c1", marginTop: 38 }}>jpsamanosuarez.com</div>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Franklin", data: normal, weight: 400, style: "normal" }, { name: "Franklin", data: bold, weight: 600, style: "normal" }], headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } },
  );
}
