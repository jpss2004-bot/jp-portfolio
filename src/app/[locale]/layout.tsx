import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { isLocale, locales } from "@/data/i18n";
import { profile } from "@/data/content";
import { siteUrl } from "@/lib/site";

/*
 * Archivo only sets the name in the hero reveal. Schibsted Grotesk carries
 * everything else; JetBrains Mono is reserved for dates and figures.
 */
const display = Archivo({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap", axes: ["wdth"] });
const sans = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: [profile.plainName, profile.shortName, "JP Samano"],
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Developer",
  worksFor: { "@type": "Organization", name: "LegalShelf" },
  knowsLanguage: ["es", "en"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Acadia University",
    address: { "@type": "PostalAddress", addressLocality: "Wolfville", addressRegion: "NS", addressCountry: "CA" },
  },
  knowsAbout: ["Software engineering", "Full-stack development", "Regulatory compliance systems", "Document AI", "AI-assisted software development"],
  sameAs: [profile.github, profile.linkedin],
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
