import Link from "next/link";
import type { Locale } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileSheetNav, type MobileNavItem } from "./MobileSheetNav";

export type HeaderNavItem = MobileNavItem;

type HeaderProps = {
  locale: Locale;
  navItems: HeaderNavItem[];
};

export function Header({ locale, navItems }: HeaderProps) {
  const resumeFile = locale === "es" ? "/resume/jp-samano-resume-es.pdf" : "/resume/jp-samano-resume-en.pdf";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}`} className="brand-mark" aria-label="JP Samano home">
          <span className="brand-orb">JP</span>
          <span>
            <strong>JP Samano</strong>
            <small>Signal Atlas</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LocaleSwitch currentLocale={locale} />
          <a href={resumeFile} target="_blank" rel="noreferrer" className="header-resume-link">
            Resume
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="header-icon-link">
            GitHub
          </a>
          <MobileSheetNav locale={locale} navItems={navItems} />
        </div>
      </div>
    </header>
  );
}