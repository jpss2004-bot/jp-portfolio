"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/data/i18n";
import { getCopy, resumeHref } from "@/data/site-copy";
import { Logo } from "@/components/ui/Logo";
import { LocaleSwitch } from "./LocaleSwitch";

export type NavItem = { href: string; label: string };

const HOME_LABEL = "Jose Pablo Samano Suarez — home";

/**
 * Sticky header. Client-side only for the mobile disclosure — everything else
 * is static markup, and the nav links work with JavaScript disabled.
 */
export function Header({
  locale,
  navItems,
  projectSlug,
}: {
  locale: Locale;
  navItems: NavItem[];
  projectSlug?: string;
}) {
  const t = getCopy(locale);
  const [open, setOpen] = useState(false);
  const sheetId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Link href={`/${locale}`} className="wordmark" aria-label={HOME_LABEL}>
          <Logo size={30} />
          <span className="wordmark-text">
            <strong>Jose Pablo Samano</strong>
            <span>{t.wordmarkRole}</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label={t.mainNav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LocaleSwitch currentLocale={locale} slug={projectSlug} />
          <a className="btn btn-line" href={resumeHref(locale)} target="_blank" rel="noreferrer">
            {t.resume}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={sheetId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.close : t.menu}
            <span className="nav-toggle-bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id={sheetId} className="wrap nav-sheet" aria-label={t.mainNav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={resumeHref(locale)} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            {t.resumePdf}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
