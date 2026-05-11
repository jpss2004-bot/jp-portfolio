import type { ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import { Header, type HeaderNavItem } from "@/components/layout/Header";
import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";

type SiteShellProps = {
  locale: Locale;
  navItems: HeaderNavItem[];
  projectSlug?: string;
  children: ReactNode;
};

export function SiteShell({ locale, navItems, projectSlug, children }: SiteShellProps) {
  return (
    <main id="main-content" className="portfolio-page">
      <DocumentLocaleSync locale={locale} />
      <Header locale={locale} navItems={navItems} projectSlug={projectSlug} />
      {children}
    </main>
  );
}