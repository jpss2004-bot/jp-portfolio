"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks `[data-reveal]` elements with `data-in` the first time they enter the
 * viewport. The hidden starting state only applies once the inline script has
 * set `data-js` on the root, so content stays visible without JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) { nodes.forEach((node) => { node.dataset.in = ""; }); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.in = "";
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
