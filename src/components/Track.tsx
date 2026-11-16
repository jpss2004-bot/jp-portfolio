"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

/*
 * Custom Vercel Analytics events. They carry only page paths, project slugs
 * and file names: nothing about the visitor.
 */

/** One listener for every résumé link on the page, wherever it is. */
export function TrackDownloads() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith("/resume/")) return;
      track("Resume downloaded", { file: url.pathname.split("/").pop() ?? "", page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/** Fires once when the visitor reaches this point of the page. */
export function TrackReadToEnd({ event, project }: { event: string; project: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      track(event, { project });
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [event, project]);
  return <div ref={ref} aria-hidden="true" />;
}

