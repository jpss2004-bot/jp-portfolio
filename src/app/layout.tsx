import type { Metadata } from "next";
import { Host_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const sans = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-geist",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jp-portfolio-beta.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JP Samano | Signal Atlas",
    template: "%s | JP Samano",
  },
  description:
    "Jose Pablo Samano Suarez — software engineer across full-stack, cybersecurity, and product. Real systems shipped with proof: SAVR (context-aware dining), CheckWise (REPSE compliance), and ER Triage — each with architecture, live demos, and explainable technical decisions.",
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
    title: "Jose Pablo Samano Suarez — Software Engineering · Cybersecurity · Product",
    description:
      "Software engineer across full-stack, cybersecurity, and product. Real systems shipped with proof — SAVR, CheckWise, ER Triage — with architecture, live demos, and explainable decisions.",
    url: siteUrl,
    siteName: "JP Samano Signal Atlas",
    locale: "en_CA",
    alternateLocale: ["es_MX"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jose Pablo Samano Suarez — Software Engineering, Cybersecurity, and Product portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jose Pablo Samano Suarez — Software · Cybersecurity · Product",
    description:
      "Real systems shipped with proof — SAVR, CheckWise, ER Triage — with architecture, live demos, and explainable technical decisions.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
