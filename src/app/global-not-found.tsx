import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = { title: "Not found · José Pablo Sámano Suárez", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <main className="col notfound">
          <h1 className="h1">This page doesn&apos;t exist.</h1>
          <p className="muted">The link may be old. Everything is on the home page.</p>
          <p><Link className="link" href="/en">Go to the home page</Link> · <Link className="link" href="/es">Ir al inicio</Link></p>
        </main>
      </body>
    </html>
  );
}
