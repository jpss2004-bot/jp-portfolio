"use client";

import { useEffect, useRef, type ReactNode } from "react";
import m from "./Mock.module.css";

/*
 * Plays a coded screen's steps while it is on screen. The steps are CSS
 * animations that stay paused until `data-play` is set, so scrolling away
 * pauses them and coming back resumes. Without JavaScript, with reduced
 * motion or in print the screen shows its final frame.
 */
export function MockPlay({ children, label }: { children: ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.setAttribute("data-play", "");
      else el.removeAttribute("data-play");
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${m.player} ${m.screen}`} data-mock="" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {children}
    </div>
  );
}
