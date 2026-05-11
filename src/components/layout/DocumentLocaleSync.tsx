"use client";

import { useEffect } from "react";
import type { Locale } from "@/data/i18n";

export function DocumentLocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.scrollBehavior = "smooth";
  }, [locale]);

  return null;
}