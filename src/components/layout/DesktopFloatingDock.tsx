"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type DockItem = {
  href: string;
  label: string;
};

export function DesktopFloatingDock({ items }: { items: DockItem[] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav className="desktop-floating-dock" aria-label="Section shortcut dock">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}