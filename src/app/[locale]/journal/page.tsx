import type { Metadata } from "next";
import { shareImage } from "@/lib/share";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/parts";
import { StructuredData } from "@/components/StructuredData";
import { JournalEntryCard } from "@/components/journal/JournalEntryCard";
import { isLocale, locales } from "@/data/i18n";
import { journalLabels, journalPreview, visibleEntries } from "@/data/journal";
import { journalStructuredData } from "@/lib/journal-schema";
import styles from "@/components/journal/Journal.module.css";

type Props = { params: Promise<{ locale: string }> };
export const generateStaticParams = () => locales.map((locale) => ({ locale }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = journalLabels[locale];
  return { title: `${t.name} · JP Sámano`, description: t.introduction, alternates: { canonical: `/${locale}/journal`, languages: { en: "/en/journal", es: "/es/journal", "x-default": "/en/journal" }, types: { "application/rss+xml": "/journal/feed.xml" } }, robots: journalPreview ? { index: false, follow: false } : undefined, openGraph: { title: `${t.name} · JP Sámano`, description: t.introduction, url: `/${locale}/journal`, type: "website", images: [shareImage(locale, "journal", `${t.name} · JP Sámano`)] }, twitter: { card: "summary_large_image", title: `${t.name} · JP Sámano`, description: t.introduction, images: [shareImage(locale, "journal", `${t.name} · JP Sámano`)] } };
}
export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = journalLabels[locale];
  const entries = visibleEntries();
  return <><StructuredData data={journalStructuredData(locale, entries)} /><a className="skip-link" href="#main">{locale === "es" ? "Ir al contenido" : "Skip to content"}</a><Header locale={locale} altHref="/journal" />
    <main className={styles.journal} id="main" tabIndex={-1}>
      <header className={styles.indexHeading}><h1>{t.name}.</h1><p>{t.introduction}</p></header>
      {entries.some((entry) => entry.status === "draft") ? <p className={styles.preview}><strong>{t.draft}.</strong>{t.preview}</p> : null}
      {entries[0] ? <JournalEntryCard entry={entries[0]} locale={locale} featured /> : <p className={styles.empty}>{locale === "es" ? "Estoy preparando mis primeras entradas. Mientras tanto, puedes explorar mi trabajo." : "I’m preparing my first entries. In the meantime, you can explore my work."} <Link href={`/${locale}#work`}>{locale === "es" ? "Ver proyectos" : "View projects"}</Link></p>}
      {entries.slice(1).map((entry) => <JournalEntryCard key={entry.slug} entry={entry} locale={locale} />)}
      <div className={styles.indexFooter}><a href="/journal/feed.xml">RSS</a><span>{locale === "es" ? "Un espacio para desarrollar ideas y volver a ellas." : "A place to develop ideas and return to them."}</span></div>
    </main><Footer locale={locale} wide /></>;
}
