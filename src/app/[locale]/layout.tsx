import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { RevealObserver } from "@/components/RevealObserver";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { isLocale, locales } from "@/data/i18n";
import { profile } from "@/data/content";
import { siteUrl } from "@/lib/site";

/*
 * Archivo only sets the name in the hero reveal. Schibsted Grotesk carries
 * everything else; JetBrains Mono is reserved for dates and figures.
 */
/* `subsets` only controls preloading; the other ranges still load on demand. */
const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: profile.name }],
  creator: profile.name,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f9" },
    { media: "(prefers-color-scheme: dark)", color: "#121418" },
  ],
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Apply a saved theme before first paint. */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.dataset.js=""` }} />
        {children}
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
