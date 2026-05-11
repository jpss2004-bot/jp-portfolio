"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/data/i18n";
import { LocaleSwitch } from "./LocaleSwitch";

export type MobileNavItem = {
  href: string;
  label: string;
};

type MobileSheetNavProps = {
  locale: Locale;
  navItems: MobileNavItem[];
};

export function MobileSheetNav({ locale, navItems }: MobileSheetNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav-wrap">
      <button
        type="button"
        className="mobile-menu-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {open ? (
        <div className="mobile-sheet" role="dialog" aria-label="Mobile navigation">
          <div className="mobile-sheet-top">
            <strong>Signal Atlas</strong>
            <LocaleSwitch currentLocale={locale} />
          </div>
          <nav aria-label="Mobile sections">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}