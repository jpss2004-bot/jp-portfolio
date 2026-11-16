"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a figure up once when it scrolls into view. The server renders the
 * final value, so the number is correct without JavaScript or with reduced motion.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    const match = value.match(/\d[\d,]*/);
    if (!node || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[0].replace(/,/g, ""));
    if (!Number.isFinite(target) || target < 2) return;
    const before = value.slice(0, match.index);
    const after = value.slice((match.index ?? 0) + match[0].length);
    const grouped = match[0].includes(",");
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        const current = Math.round(target * eased);
        node.textContent = before + (grouped ? current.toLocaleString("en-US") : String(current)) + after;
        if (t < 1) frame = requestAnimationFrame(tick); else node.textContent = value;
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); node.textContent = value; };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}
