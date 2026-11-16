"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./Annotated.module.css";

export type Note = { x: number; y: number; text: string };

/**
 * A product capture with numbered callouts. The legend under the image carries
 * the text, so nothing depends on hover; pointing at either side highlights
 * the other. An optional film replaces the capture in place when started.
 */
export function AnnotatedShot({ src, width, height, alt, notes, caption, openLabel, video, priority = false }: {
  src: string; width: number; height: number; alt: string; notes: Note[]; caption?: string; openLabel: string;
  video?: { src: string; poster: string; label: string; watch: string; back: string }; priority?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={`shot media-frame media-interface ${styles.figure}`}>
      <div className={`media-canvas ${styles.canvas}`}>
        {playing && video ? (
          <video className={styles.film} src={video.src} poster={video.poster} width={1920} height={1080} controls autoPlay playsInline aria-label={video.label} />
        ) : (
          <>
            <Image className="shot-media" src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 94vw, 1120px" quality={85} loading={priority ? "eager" : "lazy"} />
            <ol className={styles.spots} aria-hidden="true">
              {notes.map((note, i) => (
                <li key={note.text} data-active={active === i || undefined} style={{ "--x": `${note.x}%`, "--y": `${note.y}%`, "--i": i } as CSSProperties} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}>{i + 1}</li>
              ))}
            </ol>
            {video ? <button type="button" className={styles.watch} onClick={() => setPlaying(true)}><span aria-hidden="true">▶</span>{video.watch}</button> : null}
          </>
        )}
      </div>
      <figcaption className={styles.caption}>
        <ol className={styles.legend}>
          {notes.map((note, i) => (
            <li key={note.text} data-active={active === i || undefined} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)}><span>{i + 1}</span>{note.text}</li>
          ))}
        </ol>
        <p className={styles.meta}>
          {caption ? <span>{caption}</span> : null}
          {playing && video ? <button type="button" onClick={() => setPlaying(false)}>{video.back}</button> : <a href={src} target="_blank" rel="noreferrer">{openLabel}</a>}
        </p>
      </figcaption>
    </figure>
  );
}
