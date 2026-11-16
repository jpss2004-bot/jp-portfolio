"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./MobileMenu.module.css";

export function MobileMenu({ items, label }: { items: { href: string; label: string }[]; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target) && ref.current) ref.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", escape); };
  }, []);
  return <details ref={ref} className={styles.menu}>
    <summary>{label}<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.5" /></svg></summary>
    <nav aria-label={label} onClick={(event) => { if (event.target instanceof Element && event.target.closest("a") && ref.current) ref.current.open = false; }}>
      {items.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
    </nav>
  </details>;
}
