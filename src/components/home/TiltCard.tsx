"use client";

import Link from "next/link";
import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * Project card with pointer-driven 3D tilt. Sets --rx/--ry CSS variables the
 * stylesheet reads into a perspective transform. No-ops under reduced motion.
 */
export function TiltCard({
  href,
  id,
  className,
  children,
  max = 6.5,
}: {
  href: string;
  id?: string;
  className?: string;
  children: ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const ry = ((e.clientX - r.left) / r.width - 0.5) * (max * 2);
    const rx = ((e.clientY - r.top) / r.height - 0.5) * (-max * 2);
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      ref={ref}
      id={id}
      href={href}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </Link>
  );
}
