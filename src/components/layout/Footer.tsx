import type { Locale } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { getCopy } from "@/data/site-copy";
import { LocaleSwitch } from "./LocaleSwitch";

export function Footer({ locale, projectSlug }: { locale: Locale; projectSlug?: string }) {
  const t = getCopy(locale);

  return (
    <footer className="site-footer">
      <div className="wrap footer-bar">
        <span>
          © {new Date().getFullYear()} {profile.fullName}. {t.footerRights}
        </span>
        <LocaleSwitch currentLocale={locale} slug={projectSlug} />
      </div>
    </footer>
  );
}
