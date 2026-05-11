export type Locale = "en" | "es";

export type Localized<T> = {
  en: T;
  es: T;
};

export const locales = ["en", "es"] as const;
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "es";
}

export function localePrefix(locale: Locale) {
  return `/${locale}`;
}
