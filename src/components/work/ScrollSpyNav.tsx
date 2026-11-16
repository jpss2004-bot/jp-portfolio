"use client";

import { useEffect, useState } from "react";

export type SpyItem = { id: string; label: string; index?: string };

/** In-page navigation that marks the section currently being read. */
export function ScrollSpyNav({ items, label, className, lead, trail }: { items: SpyItem[]; label: string; className?: string; lead?: React.ReactNode; trail?: React.ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    if (!targets.length) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id); });
      const first = items.find((item) => visible.has(item.id));
      setActive(first ? first.id : null);
    }, { rootMargin: "-30% 0px -55% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);
  return (
    <nav className={className} aria-label={label}>
      {lead}
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
              {item.index ? <span>{item.index}</span> : null}
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      {trail}
    </nav>
  );
}
