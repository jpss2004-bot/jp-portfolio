import Link from "next/link";
import type { Locale } from "@/data/i18n";

type LocaleSwitchProps = {
  currentLocale: Locale;
  slug?: string;
};

function localeHref(locale: Locale, slug?: string) {
  return slug ? `/${locale}/projects/${slug}` : `/${locale}`;
}

function FlagCanada() {
  return (
    <span className="flag flag-canada" aria-hidden="true">
      <span />
    </span>
  );
}

function FlagMexico() {
  return (
    <span className="flag flag-mexico" aria-hidden="true">
      <span />
    </span>
  );
}

export function LocaleSwitch({ currentLocale, slug }: LocaleSwitchProps) {
  const items = [
    { locale: "en" as const, label: "EN", sr: "English", Flag: FlagCanada },
    { locale: "es" as const, label: "ES", sr: "Espa\u00f1ol", Flag: FlagMexico },
  ];

  return (
    <nav className="language-switch" aria-label="Language selector">
      {items.map(({ locale, label, sr, Flag }) => {
        const active = currentLocale === locale;

        return (
          <Link
            key={locale}
            href={localeHref(locale, slug)}
            hrefLang={locale}
            aria-label={sr}
            aria-current={active ? "page" : undefined}
            className={active ? "language-option active" : "language-option"}
          >
            <Flag />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}