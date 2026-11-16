import type { Metadata } from "next";
import { shareImage } from "@/lib/share";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/parts";
import { StructuredData } from "@/components/StructuredData";
import { CapacityFigure, CoolingFigure } from "@/components/journal/JournalFigures";
import { EntryMeta } from "@/components/journal/JournalEntryCard";
import { ReadingProgress } from "@/components/journal/ReadingProgress";
import { ArticleContents } from "@/components/journal/ArticleContents";
import { isLocale } from "@/data/i18n";
import { getJournalEntry, journalAsset, journalLabels, journalPath, journalPreview, visibleEntries } from "@/data/journal";
import { profile } from "@/data/content";
import { journalStructuredData } from "@/lib/journal-schema";
import styles from "@/components/journal/Journal.module.css";

type Props = { params: Promise<{ locale: string; slug: string }> };
export const generateStaticParams = () => visibleEntries().map((entry) => ({ locale: entry.language, slug: entry.slug }));
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getJournalEntry(slug);
  if (!isLocale(locale) || !entry || entry.language !== locale) return {};
  const path = journalPath(entry);
  return { title: `${entry.title} · ${profile.shortName}`, description: entry.summary[locale], alternates: { canonical: path, languages: { [entry.language]: path, "x-default": path } }, robots: journalPreview || entry.status === "draft" ? { index: false, follow: false } : undefined, authors: [{ name: profile.name, url: `/${locale}` }], openGraph: { type: "article", title: entry.title, description: entry.summary[locale], url: path, authors: [profile.name], ...(entry.publishedAt ? { publishedTime: entry.publishedAt, modifiedTime: entry.updatedAt ?? entry.publishedAt } : {}), images: [shareImage(locale, `article-${entry.slug}`, entry.title)] }, twitter: { card: "summary_large_image", title: entry.title, description: entry.summary[locale], images: [shareImage(locale, `article-${entry.slug}`, entry.title)] } };
}
function CitationText({ text }: { text: string }) {
  return text.split(/(\[[\da-z, ]+\])/g).map((part, index) => /^\[[\da-z, ]+\]$/.test(part) ? <sup className={styles.citation} key={index}>{part.slice(1, -1).split(",").map((id, i) => <a key={id} href={`#source-${id.trim()}`} aria-label={`Source ${id.trim()}`}>{i > 0 ? "," : ""}{id.trim()}</a>)}</sup> : part);
}
export default async function JournalArticle({ params }: Props) {
  const { locale, slug } = await params;
  const entry = getJournalEntry(slug);
  if (!isLocale(locale) || !entry || entry.language !== locale) notFound();
  const t = journalLabels[locale];
  const headings = entry.blocks.flatMap((block) => block.type === "heading" ? [block] : []);
  return <><StructuredData data={journalStructuredData(locale, [], entry)} /><a className="skip-link" href="#main">{locale === "es" ? "Ir al contenido" : "Skip to content"}</a><Header locale={locale} altHref="/journal" languageHrefs={{ [entry.language]: journalPath(entry) }} /><ReadingProgress />
    <main className={styles.journal} id="main" tabIndex={-1}>
      <header className={styles.articleHeader}><Link className={styles.back} href={`/${locale}/journal`}>{t.name}</Link>{entry.status === "draft" ? <p className={styles.preview}><strong>{t.draft}.</strong>{t.preview}</p> : null}<h1 lang={entry.language}>{entry.title}</h1><EntryMeta entry={entry} locale={locale} /><p><Link href={`/${locale}#about`}>{profile.name}</Link></p></header>
      <div className={styles.articleLayout}>
        <ArticleContents label={t.contents}><a href="#article-start">{locale === "es" ? "La propuesta" : "The proposal"}</a>{headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}{entry.references.length ? <a href="#sources">{t.sources}</a> : null}{entry.pdf ? <a href={journalAsset(entry, "pdf")}>{t.pdf}</a> : null}</ArticleContents>
        <article className={styles.articleBody} lang={entry.language} data-journal-article id="article-start">
          {entry.slug === "ai-investment-nova-scotia-trust" ? <CapacityFigure locale={locale} /> : null}
          {entry.blocks.map((block, index) => {
            if (block.type === "heading") return <h2 id={block.id} key={block.id}>{block.text}</h2>;
            if (block.type === "paragraph") return <p key={index} id={`paragraph-${index}`}><CitationText text={block.text} /></p>;
            if (block.type === "quote") return <blockquote key={index}><CitationText text={block.text} /></blockquote>;
            if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}><CitationText text={item} /></li>)}</ul>;
            if (block.type === "figure") return block.figure === "cooling" ? <CoolingFigure key={index} locale={locale} /> : <CapacityFigure key={index} locale={locale} />;
            if (block.type === "resource") return <div className={styles.resource} key={index}><a href={block.href}>{block.title}</a><p>{block.description}</p></div>;
          })}
          {entry.references.length ? <><h2 id="sources">{t.sources}</h2><ol className={styles.sourceList}>{entry.references.map((reference) => <li key={reference.id} id={`source-${reference.id}`}><span>[{reference.id}] </span><a href={reference.url}>{reference.label}</a></li>)}</ol></> : null}
          <div className={styles.articleEnd}>{entry.externalPublication ? <a href={entry.externalPublication.url}>{entry.externalPublication.label}</a> : null}{entry.pdf ? <a href={journalAsset(entry, "pdf")}>{t.pdf}</a> : null}<Link href={`/${locale}/journal`}>{locale === "es" ? "Volver al diario" : "Back to the journal"}</Link><a href={`mailto:${profile.email}?subject=${encodeURIComponent(entry.title)}`}>{locale === "es" ? "Comparte tus comentarios" : "Send me your thoughts"}</a></div>
        </article>
      </div>
    </main><Footer locale={locale} wide /></>;
}
