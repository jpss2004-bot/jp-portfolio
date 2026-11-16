"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Tints the page background with the colour of whatever is in the middle of
 * the screen. Sections, projects and roles declare their colour with
 * `data-tone`; the smallest one under the centre line wins.
 */
export function ToneField() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let last = "";
    const read = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let best: { tone: string; height: number } | null = null;
      for (const node of document.querySelectorAll<HTMLElement>("[data-tone]")) {
        if (node.offsetParent === null && getComputedStyle(node).position !== "fixed") continue;
        const rect = node.getBoundingClientRect();
        if (rect.top > mid || rect.bottom < mid || !node.dataset.tone) continue;
        if (!best || rect.height < best.height) best = { tone: node.dataset.tone, height: rect.height };
      }
      const tone = best?.tone ?? "transparent";
      if (tone !== last) { root.style.setProperty("--page-tone", tone); last = tone; }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    /* Opening or switching a project changes what sits under the centre line. */
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-open"] });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [pathname]);
  return null;
}
