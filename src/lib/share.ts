import type { Locale } from "@/data/i18n";

/** A new pathname avoids reusing the old, tightly cropped og.png cache entry. */
export function shareImage(locale: Locale, key = "home", alt = "JP Sámano") {
  return { url: `/share/${locale}/${key}`, width: 1200, height: 630, type: "image/png", alt };
}
