import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/data/i18n";
import styles from "./Work.module.css";

/* Drawn marks for projects without their own artwork, in the same line style as Verifaid and Flaregrain. */
const drawnMarks: Record<string, string[]> = {
  "document-pipelines": ["M12 8h22l8 8v26H12Z", "M34 8v8h8", "M20 52h28V24", "M18 24h14", "M18 32h10"],
  cotejo: ["M6 12h20v40H6Z", "M38 12h20v40H38Z", "M12 22h8", "M12 30h8", "M44 22h8", "M44 30h8", "M26 30h12", "M22 44l4 4 8-8"],
  "pos-geocoder": ["M32 58s18-15 18-30a18 18 0 0 0-36 0c0 15 18 30 18 30Z", "M25 20h14v14H25Z", "M29 27h6"],
  "la-red-de-casa": ["M8 30 32 10l24 20", "M14 25v29h36V25", "M22 46c5-9 15-1 20-10", "M42 36h.1"],
  "band-of-brothers": ["M32 6 52 13v17c0 14-9 23-20 28-11-5-20-14-20-28V13Z", "M24 25h16", "M24 33h16", "M32 21v16"],
  savr: ["M10 32h44a22 22 0 0 1-44 0Z", "M24 22c0-4 4-5 4-9", "M36 22c0-4 4-5 4-9", "M6 32h52"],
  "er-triage-queue-manager": ["M6 34h12l5-13 9 26 5-13h21"],
  "family-phrase-game": ["M10 12h44v30H30L18 52V42h-8Z", "M22 24h20", "M22 32h12"],
  "red-360": ["M32 12a20 20 0 1 1 0 40 20 20 0 0 1 0-40", "M24 18a14 14 0 1 0 0 28", "M40 18a14 14 0 1 1 0 28", "M50 8v8", "M46 12h8"],
  "ai-legal-practice": ["M32 10v42", "M20 52h24", "M14 18h36", "M20 18 12 34h16Z", "M44 18l-8 16h16Z"],
};

/** Original product artwork, kept separate from generic diagram symbols. */
export function ProjectMark({ slug }: { slug: string }) {
  if (slug === "verifaid") return <svg className={styles.projectMark} aria-hidden="true" viewBox="0 0 64 64" fill="none"><path d="M13 6h29l10 10v8H42V6M13 6v46l13-13c4-4 8-2 6 4l-5 10c-1 3 2 5 5 2l8-8c4-4 7-2 7 2 0 3 2 4 6 4h7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (slug === "checkwise") return <span className={styles.projectMark} aria-hidden="true"><Image className={styles.markLight} src="/projects/checkwise/mark.png" width={354} height={250} sizes="72px" alt="" /><Image className={styles.markDark} src="/projects/checkwise/mark-dark.png" width={354} height={250} sizes="72px" alt="" /></span>;
  if (slug === "flaregrain") return <svg className={styles.projectMark} aria-hidden="true" viewBox="0 0 64 64" fill="none"><path d="M32 6c2 10 14 16 14 30a14 14 0 0 1-28 0c0-6 3-9 6-13 1 5 3 7 6 8-2-9 0-17 2-25Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" /><path d="M12 56h40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>;
  const drawn = drawnMarks[slug];
  if (drawn) return <svg className={styles.projectMark} aria-hidden="true" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">{drawn.map((d) => <path key={d} d={d} />)}</svg>;
  if (slug === "neyvu") return <span className={styles.projectMark} aria-hidden="true"><Image className={styles.markLight} src="/projects/neyvu/mark.svg" width={100} height={100} alt="" /><Image className={styles.markDark} src="/projects/neyvu/mark-dark.svg" width={100} height={100} alt="" /></span>;
  return null;
}

const symbols: Record<string, string> = {
  document: "M7 3h7l4 4v14H7z M14 3v5h5 M10 12h5 M10 16h5",
  review: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M16 9l2 2 4-4",
  queue: "M4 5h16v4H4z M4 15h16v4H4z M8 9v6 M16 9v6",
  desktop: "M3 4h18v13H3z M8 21h8 M12 17v4",
  external: "M14 3h7v7 M21 3l-9 9 M10 5H3v16h16v-7",
  search: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z M20 20l-4.8-4.8",
  cpu: "M7 7h10v10H7z M10 10h4v4h-4z M9 3v4 M15 3v4 M9 17v4 M15 17v4 M3 9h4 M3 15h4 M17 9h4 M17 15h4",
  shield: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z M8.8 12.2l2.2 2.2 4.3-4.6",
  database: "M4.5 6c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3z M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6 M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3",
  browser: "M3 5h18v14H3z M3 9h18 M6 7h.01 M9 7h.01",
  tunnel: "M4 20v-9a8 8 0 0 1 16 0v9 M8.5 20v-8.5a3.5 3.5 0 0 1 7 0V20 M2 20h20",
};

/* Each technology in its own brand colour; "ink" ones follow the text colour in both themes. */
const brand: Record<string, string> = {
  nextdotjs: "ink", vercel: "ink", github: "ink", flask: "ink",
  python: "#3776ab", fastapi: "#009688", postgresql: "#4169e1", react: "#087ea4",
  typescript: "#3178c6", render: "#2f9e83", sqlalchemy: "#d71f00", sqlite: "#0f6fa3", tailwindcss: "#0891b2",
};

export function TechnologyIcon({ name }: { name: string }) {
  const tone = brand[name];
  const style = (tone && tone !== "ink" ? { "--brand": tone } : {}) as CSSProperties;
  if (symbols[name]) return <svg className={styles.technologyIcon} data-brand="project" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={symbols[name]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <span className={styles.technologyIcon} data-brand={tone === "ink" ? "ink" : tone ? "brand" : "project"} style={{ ...style, "--icon": `url(/icons/${name}.svg)` } as CSSProperties} aria-hidden="true" />;
}

const stacks: Record<string, [string, string][]> = {
  checkwise: [["nextdotjs", "Next.js"], ["python", "Python"], ["fastapi", "FastAPI"], ["postgresql", "PostgreSQL"], ["react", "React"]],
  flaregrain: [["python", "Python"], ["queue", "BM25"], ["desktop", "Ollama"], ["review", "Rule checker"], ["vercel", "Vercel"], ["github", "GitHub"]],
  neyvu: [["nextdotjs", "Next.js"], ["typescript", "TypeScript"], ["postgresql", "PostgreSQL"], ["python", "Python"], ["render", "Render"]],
  verifaid: [["python", "Python"], ["fastapi", "FastAPI"], ["postgresql", "PostgreSQL"], ["nextdotjs", "Next.js"], ["react", "React"]],
  "document-pipelines": [["python", "Python"], ["queue", "Claude Batch API"], ["review", "SHA-256 gate"], ["document", "Excel delivery"]],
  "la-red-de-casa": [["nextdotjs", "Next.js"], ["react", "React"], ["typescript", "TypeScript"], ["postgresql", "PostgreSQL"], ["render", "Render"]],
  "band-of-brothers": [["python", "Python"], ["external", "ESPN API"], ["vercel", "Vercel"], ["github", "GitHub"]],
  cotejo: [["desktop", "Swift · SwiftUI"], ["document", "PDFKit"], ["review", "Vision OCR"], ["queue", "SwiftPM"]],
  "pos-geocoder": [["python", "Python"], ["desktop", "PySide6"], ["sqlite", "SQLite"], ["external", "Google Geocoding API"], ["document", "openpyxl"]],
};

export function TechnologyRow({ slug, locale }: { slug: string; locale: Locale }) {
  return <ul className={styles.technologyRow} aria-label={locale === "es" ? "Tecnologías del proyecto" : "Project technologies"}>{stacks[slug]?.map(([icon, label]) => <li key={icon}><TechnologyIcon name={icon} /><span>{label}</span></li>)}</ul>;
}
