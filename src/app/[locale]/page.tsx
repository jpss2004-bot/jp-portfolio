import { notFound } from "next/navigation";
import { SignalAtlasHomeClient } from "@/components/home/SignalAtlasHomeClient";
import { isLocale, locales } from "@/data/i18n";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SignalAtlasHomeClient initialLocale={locale} />;
}
