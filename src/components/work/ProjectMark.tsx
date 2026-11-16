import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/data/i18n";
import styles from "./Work.module.css";

/** Original product artwork, kept separate from generic diagram symbols. */
export function ProjectMark({ slug }: { slug: string }) {
  if (slug === "verifaid") return <svg className={styles.projectMark} aria-hidden="true" viewBox="0 0 64 64" fill="none"><path d="M13 6h29l10 10v8H42V6M13 6v46l13-13c4-4 8-2 6 4l-5 10c-1 3 2 5 5 2l8-8c4-4 7-2 7 2 0 3 2 4 6 4h7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (slug === "checkwise") return <span className={styles.projectMark} aria-hidden="true"><Image className={styles.markLight} src="/projects/checkwise/mark.png" width={354} height={250} sizes="72px" alt="" /><Image className={styles.markDark} src="/projects/checkwise/mark-dark.png" width={354} height={250} sizes="72px" alt="" /></span>;
  if (slug === "flaregrain") return <svg className={styles.projectMark} aria-hidden="true" viewBox="0 0 64 64" fill="none"><path d="M32 6c2 10 14 16 14 30a14 14 0 0 1-28 0c0-6 3-9 6-13 1 5 3 7 6 8-2-9 0-17 2-25Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" /><path d="M12 56h40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>;
  if (slug === "neyvu") return <span className={styles.projectMark} aria-hidden="true"><Image className={styles.markLight} src="/projects/neyvu/mark.svg" width={100} height={100} alt="" /><Image className={styles.markDark} src="/projects/neyvu/mark-dark.svg" width={100} height={100} alt="" /></span>;
  return null;
}

const symbols: Record<string, string> = {
  document: "M7 3h7l4 4v14H7z M14 3v5h5 M10 12h5 M10 16h5",
  review: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M16 9l2 2 4-4",
  queue: "M4 5h16v4H4z M4 15h16v4H4z M8 9v6 M16 9v6",
  desktop: "M3 4h18v13H3z M8 21h8 M12 17v4",
  external: "M14 3h7v7 M21 3l-9 9 M10 5H3v16h16v-7",
};

export function TechnologyIcon({ name }: { name: string }) {
  if (symbols[name]) return <svg className={styles.technologyIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={symbols[name]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <span className={styles.technologyIcon} style={{ "--icon": `url(/icons/${name}.svg)` } as CSSProperties} aria-hidden="true" />;
}

const stacks: Record<string, [string, string][]> = {
  checkwise: [["nextdotjs", "Next.js"], ["python", "Python"], ["fastapi", "FastAPI"], ["postgresql", "PostgreSQL"], ["react", "React"]],
  flaregrain: [["python", "Python"], ["queue", "BM25"], ["desktop", "Ollama"], ["review", "Rule checker"], ["vercel", "Vercel"], ["github", "GitHub"]],
  neyvu: [["nextdotjs", "Next.js"], ["typescript", "TypeScript"], ["postgresql", "PostgreSQL"], ["python", "Python"], ["render", "Render"]],
  verifaid: [["python", "Python"], ["fastapi", "FastAPI"], ["postgresql", "PostgreSQL"], ["nextdotjs", "Next.js"], ["react", "React"]],
};

export function TechnologyRow({ slug, locale }: { slug: string; locale: Locale }) {
  return <ul className={styles.technologyRow} aria-label={locale === "es" ? "Tecnologías del proyecto" : "Project technologies"}>{stacks[slug]?.map(([icon, label]) => <li key={icon}><TechnologyIcon name={icon} /><span>{label}</span></li>)}</ul>;
}
