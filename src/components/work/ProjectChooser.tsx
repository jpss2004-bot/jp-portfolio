"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./Chooser.module.css";

export type ChooserItem = { slug: string; title: string; status: string; period: string; tone: string; className: string; style?: CSSProperties; panelClassName?: string; preview: ReactNode; panel: ReactNode };
type Labels = { open: string; close: string; previous: string; next: string };
type Scroll = "reveal" | "top" | null;

const padded = (n: number) => String(n).padStart(2, "0");

/**
 * Three project previews and one open panel at a time. Nothing is open on
 * load. Choosing a project puts it in the URL hash (Back closes it), switching
 * slides the panel sideways, and the previews stay where they are.
 *
 * Panels are server-rendered. Before hydration a closed panel is hidden only
 * when the inline script has set `data-js`, so without JavaScript every panel
 * stays readable.
 */
export function ProjectChooser({ items, labels }: { items: ChooserItem[]; labels: Labels }) {
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const openRef = useRef<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const anchor = useRef<{ el: HTMLElement; top: number } | null>(null);
  const scroll = useRef<Scroll>(null);

  const apply = useCallback((next: number | null) => {
    const current = openRef.current;
    if (next !== null) setDir(current === null || next > current ? "next" : "prev");
    openRef.current = next;
    setOpen(next);
  }, []);

  /* Open from the hash on load, and follow Back and Forward. */
  useEffect(() => {
    const slugs = items.map((item) => item.slug);
    const sync = (initial: boolean) => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const index = slugs.indexOf(hash);
      if (index >= 0) apply(index);
      /* Other hashes (#experience, #contact) leave the panel alone so nothing shifts above them. */
      else if (!initial && (hash === "" || hash === "work")) apply(null);
    };
    sync(true);
    const onPop = () => sync(false);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [items, apply]);

  const choose = (next: number | null, from: HTMLElement | null, mode: Scroll) => {
    const current = openRef.current;
    if (next === current) return;
    if (from) anchor.current = { el: from, top: from.getBoundingClientRect().top };
    scroll.current = mode;
    apply(next);
    const url = window.location.pathname + window.location.search + (next === null ? "" : `#${items[next].slug}`);
    if (next !== null && current === null) window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
  };

  /* Keep the tapped preview in place when a panel above it closes, then bring the new panel into view. */
  useLayoutEffect(() => {
    const held = anchor.current;
    anchor.current = null;
    if (held) {
      const moved = held.el.getBoundingClientRect().top - held.top;
      if (Math.abs(moved) > 1) window.scrollBy(0, moved);
    }
    const mode = scroll.current;
    scroll.current = null;
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (open !== null && mode) {
      const panel = document.getElementById(`panel-${items[open].slug}`);
      if (!panel) return;
      /* Centre the panel in the space under the header; a panel taller than that starts just below it. */
      const header = document.querySelector<HTMLElement>(".topbar")?.offsetHeight ?? 56;
      const room = document.documentElement.clientHeight - header;
      const rect = panel.getBoundingClientRect();
      const offset = rect.height < room - 16 ? header + (room - rect.height) / 2 : header + 8;
      const target = window.scrollY + rect.top - offset;
      if (Math.abs(target - window.scrollY) > 6) window.scrollTo({ top: target, behavior });
    } else if (open === null && held) {
      /* Closing jumps straight back to the preview; a smooth scroll here would fight the next one. */
      const top = held.el.getBoundingClientRect().top;
      if (top < 72) window.scrollTo({ top: window.scrollY + top - 96, behavior: "auto" });
    }
  }, [open, items]);

  return (
    <div className={styles.chooser} data-has-open={open !== null || undefined}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return [
          <div key={`${item.slug}-item`} id={item.slug} className={`${styles.item} ${item.className}`} style={item.style} data-on={isOpen || undefined}>
            <h3 className={styles.itemHead}>
              <button
                ref={(node) => { buttons.current[i] = node; }}
                id={`tab-${item.slug}`}
                type="button"
                className={styles.tile}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.slug}`}
                onClick={(event) => choose(isOpen ? null : i, event.currentTarget, isOpen ? null : "reveal")}
              >
                {item.preview}
                <span className={styles.cue} aria-hidden="true">{isOpen ? labels.close : labels.open}<i /></span>
              </button>
            </h3>
          </div>,
          <div
            key={`${item.slug}-panel`}
            id={`panel-${item.slug}`}
            role="region"
            aria-labelledby={`tab-${item.slug}`}
            className={`${styles.panel} ${item.className} ${item.panelClassName ?? ""}`}
            data-open={isOpen || undefined}
            data-dir={dir}
            data-tone={item.tone}
          >
            <div className={styles.panelInner}>
              <div className={styles.panelBar}>
                <p className={styles.panelCount}><b>{padded(i + 1)}</b> / {padded(items.length)}</p>
                <p className={styles.panelMeta}><span className={styles.status}><i aria-hidden="true" />{item.status}</span><span>{item.period}</span></p>
                <nav className={styles.panelNav} aria-label={`${item.title}: ${labels.previous} / ${labels.next}`}>
                  <button type="button" disabled={i === 0} onClick={() => choose(i - 1, null, "top")} aria-label={i > 0 ? `${labels.previous}: ${items[i - 1].title}` : labels.previous}><span aria-hidden="true">←</span>{i > 0 ? <b>{items[i - 1].title}</b> : null}</button>
                  <button type="button" disabled={i === items.length - 1} onClick={() => choose(i + 1, null, "top")} aria-label={i < items.length - 1 ? `${labels.next}: ${items[i + 1].title}` : labels.next}>{i < items.length - 1 ? <b>{items[i + 1].title}</b> : null}<span aria-hidden="true">→</span></button>
                </nav>
                <button type="button" className={styles.close} onClick={() => choose(null, buttons.current[i], null)}>{labels.close} <span aria-hidden="true">✕</span></button>
              </div>
              {item.panel}
            </div>
          </div>,
        ];
      })}
    </div>
  );
}
