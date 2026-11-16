import Image from "next/image";
import type { CSSProperties } from "react";
import type { Mark, ProjectVisual } from "@/data/visuals";
import { ProjectMark } from "./ProjectMark";
import styles from "./Art.module.css";

/** A project's mark: its real artwork, the company mark, or a monogram in its colour. */
export function MarkGlyph({ mark, tone, className = "" }: { mark: Mark; tone: string; className?: string }) {
  const style = { "--tone": tone } as CSSProperties;
  if (mark.kind === "project") return <span className={`${styles.glyph} ${className}`} style={style} aria-hidden="true"><ProjectMark slug={mark.slug} /></span>;
  if (mark.kind === "image") return <span className={`${styles.glyph} ${styles.chip} ${className}`} style={style} aria-hidden="true"><Image src={mark.src} alt="" width={mark.width} height={mark.height} /></span>;
  return <span className={`${styles.glyph} ${styles.monogram} ${className}`} style={style} aria-hidden="true">{mark.text}</span>;
}

/**
 * Every project image uses the same frame: a plate in the project's colour and,
 * on it, either the whole screenshot centred in a browser window, or a branded
 * tile when there is no public screen to show.
 */
export function ProjectArt({ visual, name, sizes, priority = false, className = "", hidden = false }: { visual: ProjectVisual; name: string; sizes: string; priority?: boolean; className?: string; hidden?: boolean }) {
  const shot = visual.shot;
  const style = { "--tone": visual.tone, "--ratio": shot ? shot.width / shot.height : 1 } as CSSProperties;
  if (shot) {
    return (
      <span className={`${styles.frame} ${className}`} style={style} aria-hidden={hidden || undefined}>
        <span className={styles.window}>
          <span className={styles.bar} aria-hidden="true"><i /><i /><i /><em>{shot.label}</em></span>
          <Image src={shot.src} alt="" width={shot.width} height={shot.height} sizes={sizes} quality={80} loading={priority ? "eager" : "lazy"} />
        </span>
      </span>
    );
  }
  return (
    <span className={`${styles.frame} ${styles.tile} ${className}`} style={style} aria-hidden={hidden || undefined}>
      <MarkGlyph mark={visual.mark} tone={visual.tone} className={styles.tileMark} />
      <b className={styles.tileName}>{name}</b>
      {visual.owner ? <small className={styles.tileOwner}>{visual.owner}</small> : null}
    </span>
  );
}
