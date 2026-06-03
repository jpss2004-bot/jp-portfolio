"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Scroll-triggered zoom-in reveal. Wraps a content block; as it scrolls into
 * view it rises and scales up from slightly behind. Honors reduced motion.
 */
export function Reveal({
  children,
  className,
  y = 52,
  zoom = true,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  zoom?: boolean;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: zoom ? 0.93 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
