"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive background field.
 *
 * A fixed measurement grid that reacts to the pointer: a soft lens brightens
 * the rules underneath it and a pair of crosshair guides track the cursor, so
 * the page reads like a drawing surface rather than a static page.
 *
 * Deliberately not a particle system or a shader — it is two CSS gradients and
 * three custom properties. Pointer updates are coalesced into a single rAF, so
 * moving the mouse costs one style write per frame and no layout. It disables
 * itself under reduced motion and on coarse pointers, where there is no cursor
 * to follow and the effect would only cost battery.
 */
export function FieldBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let active = false;

    const write = () => {
      frame = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--lens", active ? "1" : "0");
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      active = true;
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onLeave = () => {
      active = false;
      if (!frame) frame = requestAnimationFrame(write);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="field" aria-hidden="true" />;
}
