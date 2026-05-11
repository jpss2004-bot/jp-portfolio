import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/data/portfolio";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jp-portfolio-beta.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JP Samano | Signal Atlas",
    template: "%s | JP Samano",
  },
  description:
    "Bilingual software systems portfolio for JP Samano: full-stack projects, workflow tools, AI-assisted systems, architecture notes, and proof-first case studies.",
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
    title: "JP Samano | Signal Atlas",
    description:
      "Bilingual portfolio organized around routes, nodes, proof, and technical decisions.",
    url: siteUrl,
    siteName: "JP Samano Signal Atlas",
    locale: "en_CA",
    alternateLocale: ["es_MX"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JP Samano | Signal Atlas",
    description:
      "Bilingual software systems portfolio with full-stack projects, workflow tools, and proof-first case studies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
