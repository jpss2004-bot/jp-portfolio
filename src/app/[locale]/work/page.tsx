import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { profile } from "@/data/content";
import { categoryLabels, workRows, type Category } from "@/data/work-index";
import { ui } from "@/data/ui";
import { Footer, Header } from "@/components/parts";
import { WorkIndex } from "@/components/work/WorkIndex";
import { shareImage } from "@/lib/share";
import styles from "@/components/work/Showcase.module.css";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: { title: `All work · ${profile.shortName}`, description: "Every project by José Pablo Sámano Suárez: products, pipelines, web apps, desktop tools, websites, talks and coursework. Filter by type and year." },
  es: { title: `Todo el trabajo · ${profile.shortName}`, description: "Todos los proyectos de José Pablo Sámano Suárez: productos, pipelines, apps web, herramientas de escritorio, sitios, pláticas y trabajo académico. Filtra por tipo y año." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = meta[locale];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${locale}/work`, languages: { en: "/en/work", es: "/es/work", "x-default": "/en/work" } },
    openGraph: { type: "website", title: m.title, description: m.description, url: `/${locale}/work`, siteName: profile.name, images: [shareImage(locale, "home", m.title)] },
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const es = locale === "es";
  const rows = workRows(locale, true);
  const present = new Set(rows.map((row) => row.category));
  const categories = (Object.keys(categoryLabels) as Category[]).filter((key) => present.has(key)).map((key) => ({ key, label: categoryLabels[key][locale] }));
  const years = [...new Set(rows.map((row) => row.yearNum).filter(Boolean))].sort().reverse();
  return (
    <>
      <a href="#main" className="skip-link">{ui[locale].skip}</a>
      <Header locale={locale} altHref="/work" />
      <main id="main" className={styles.page} tabIndex={-1}>
        <p className="back"><Link className="link" href={`/${locale}`}>← {es ? "Inicio" : "Home"}</Link></p>
        <header className={styles.pageHead}>
          <h1>{es ? "Todo el trabajo." : "All work."}</h1>
          <p>{es ? `${rows.length} proyectos desde 2025. Filtra por tipo o año; cada fila abre su caso o el sitio en línea.` : `${rows.length} projects since 2025. Filter by type or year; each row opens its case study or the live site.`}</p>
        </header>
        <WorkIndex
          rows={rows}
          categories={categories}
          years={years}
          labels={{ list: es ? "Proyectos" : "Projects", open: es ? "Abrir" : "Open", all: es ? "Todos" : "All", type: es ? "Tipo" : "Type", year: es ? "Año" : "Year", empty: es ? "Ningún proyecto coincide con esos filtros." : "No project matches those filters.", countOne: es ? "proyecto" : "project", countMany: es ? "proyectos" : "projects" }}
        />
      </main>
      <Footer locale={locale} wide />
    </>
  );
}
