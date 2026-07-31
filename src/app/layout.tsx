import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/data/portfolio";

/**
 * Three families, three distinct jobs.
 *
 * Archivo is loaded as a variable font with its width axis, so display lines
 * can be set heavy and slightly expanded — that is where the visual force
 * comes from, rather than from decoration. Geist and Geist Mono are a designed
 * pair, which keeps body copy and technical labels feeling like one system.
 */
const display = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
});

const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-var",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono-var",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jp-portfolio-beta.vercel.app").replace(/\/$/, "");

const description =
  "Jose Pablo Samano Suarez — Computer Science student at Acadia University building full-stack products and workflow tools. Case studies for CheckWise (REPSE compliance), SAVR (context-aware dining), and an ER triage queue manager, each with architecture, tradeoffs, and evidence.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jose Pablo Samano Suarez — Software Engineering, Cybersecurity, Product",
    template: "%s — JP Samano",
  },
  description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    type: "website",
    title: "Jose Pablo Samano Suarez — Software Engineering, Cybersecurity, Product",
    description,
    url: siteUrl,
    siteName: profile.fullName,
    locale: "en_CA",
    alternateLocale: ["es_MX"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jose Pablo Samano Suarez — software engineering, cybersecurity, and product portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jose Pablo Samano Suarez — Software Engineering, Cybersecurity, Product",
    description,
    images: ["/og.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Engineer",
  description,
  knowsLanguage: ["en", "es"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Acadia University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wolfville",
      addressRegion: "NS",
      addressCountry: "CA",
    },
  },
  knowsAbout: [
    "Software engineering",
    "Full-stack development",
    "Cybersecurity",
    "Regulatory compliance systems",
    "Data modeling",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        {/*
         * Person schema so search engines can connect the name, the site, and
         * the profiles to one entity. Rendered as a plain script tag rather
         * than through a component: it is static JSON, and React never needs
         * to hydrate or re-render it.
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
