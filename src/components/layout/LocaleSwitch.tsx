import Link from "next/link";
import { Fragment } from "react";
import { locales, type Locale } from "@/data/i18n";

const names: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/**
 * Plain EN / ES. The previous version drew Canadian and Mexican flags out of
 * CSS gradients, which conflated language with nationality and added noise to
 * the header for no navigational benefit.
 */
export function LocaleSwitch({ currentLocale, slug }: { currentLocale: Locale; slug?: string }) {
  return (
    <nav className="locale-switch" aria-label="Language">
      {locales.map((locale, index) => {
        const active = locale === currentLocale;
        return (
          <Fragment key={locale}>
            {index > 0 ? (
              <span className="locale-sep" aria-hidden="true">
                /
              </span>
            ) : null}
            <Link
              href={slug ? `/${locale}/projects/${slug}` : `/${locale}`}
              hrefLang={locale}
              lang={locale}
              aria-current={active ? "page" : undefined}
            >
              <span className="sr-only">{names[locale]}</span>
              <span aria-hidden="true">{locale.toUpperCase()}</span>
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
