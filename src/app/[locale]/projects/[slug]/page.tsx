import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/data/i18n";
import { allCaseSlugs, asOf, caseOrder, getProject, pick, profile } from "@/data/content";
import { ui } from "@/data/ui";
import { Diagram, Footer, Header, ProjectMedia, StatusTag, VisualFrame } from "@/components/parts";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => allCaseSlugs.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const title = `${pick(project.title, locale)} · ${profile.shortName}`;
  const description = pick(project.oneLiner, locale);
  const path = `/projects/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { en: `/en${path}`, es: `/es${path}`, "x-default": `/en${path}` } },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/${locale}${path}`,
      siteName: profile.name,
      locale: locale === "es" ? "es_MX" : "en_CA",
      images: [{ url: project.media?.type === "image" ? project.media.src.replace(/\.webp$/, ".webp") : "/og.png", alt: title }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="plain">
      {items.map((item) => (
        <li key={item.slice(0, 40)}>{item}</li>
      ))}
    </ul>
  );
}

export default async function CasePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(raw) || !project) notFound();
  const locale: Locale = raw;
  const t = ui[locale];
  const c = project.caseStudy;
  const order = caseOrder();
  const idx = order.findIndex((p) => p.slug === slug);
  const prev = order[idx - 1];
  const next = order[idx + 1];
  const base = `/${locale}`;

  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <Header locale={locale} altHref={`/projects/${slug}`} />
      <main id="main" className="case">
        <div className="col">
          <p className="back"><Link className="link" href={`${base}#work`}>← {t.case.back}</Link></p>
          <div className="case-title">
            <h1 className="h1">{pick(project.title, locale)}</h1>
            <StatusTag status={project.status} locale={locale} />
          </div>
          <p className="lead">{pick(project.oneLiner, locale)}</p>
          <dl className="case-meta">
            <div><dt>{t.role}</dt><dd>{pick(project.role, locale)}</dd></div>
            <div><dt>{t.period}</dt><dd className="mono">{pick(project.period, locale)}</dd></div>
            <div><dt>{t.status}</dt><dd><StatusTag status={project.status} locale={locale} /></dd></div>
          </dl>
        </div>

        {project.visuals ? (
          <div className="wide case-media">
            <VisualFrame visual={project.visuals.primary} locale={locale} priority sizes="(max-width: 900px) 100vw, 1040px" />
          </div>
        ) : project.media ? (
          <div className="wide case-media">
            <ProjectMedia media={project.media} locale={locale} priority />
          </div>
        ) : null}

        <div className="col">
          <dl className="facts facts-case">
            {project.facts.map((f) => (
              <div key={f.value + pick(f.label, locale)}>
                <dt>{pick(f.label, locale)}</dt>
                <dd className="mono">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="muted small">{t.case.asOf} {pick(asOf, locale)}.</p>

          {c ? (
            <>
              <section className="case-sec">
                <h2 className="h2">{t.case.problem}</h2>
                <p className="prose">{pick(c.problem, locale)}</p>
              </section>
              {project.diagram ? (
                <section className="case-sec case-diagram">
                  <Diagram kind={project.diagram} locale={locale} />
                </section>
              ) : null}
              <section className="case-sec">
                <h2 className="h2">{t.case.constraints}</h2>
                <List items={pick(c.constraints, locale)} />
              </section>
              <section className="case-sec">
                <h2 className="h2">{t.case.decisions}</h2>
                <ol className="decisions">
                  {c.decisions.map((d) => (
                    <li key={d.title.en}>
                      <h3 className="h4">{pick(d.title, locale)}</h3>
                      <p className="prose">{pick(d.why, locale)}</p>
                    </li>
                  ))}
                </ol>
              </section>
              {project.visuals?.secondary && project.visuals.secondary.kind === "image" && project.visuals.secondary.src.startsWith("/art/") ? (
                <div className="case-sec">
                  <VisualFrame visual={project.visuals.secondary} locale={locale} sizes="(max-width: 900px) 100vw, 700px" />
                </div>
              ) : null}
              {c.built ? (
                <section className="case-sec">
                  <h2 className="h2">{t.case.built}</h2>
                  <List items={pick(c.built, locale)} />
                  <p><Link className="link" href={`${base}#build`}>{t.nav.build} →</Link></p>
                </section>
              ) : null}
              <section className="case-sec">
                <h2 className="h2">{t.case.outcome}</h2>
                <p className="prose">{pick(c.outcome, locale)}</p>
              </section>
              <section className="case-sec">
                <h2 className="h2">{t.case.evidence}</h2>
                <List items={pick(c.evidence, locale)} />
              </section>
            </>
          ) : null}
        </div>

        {c?.gallery?.length ? (
          <section className="wide case-sec gallery" aria-label={t.case.gallery}>
            <h2 className="h2 col-inline">{t.case.gallery}</h2>
            {c.gallery.map((g) => (
              <figure key={g.src} className="shot">
                <Image src={g.src} alt={pick(g.alt, locale)} width={g.width} height={g.height} sizes="(max-width: 900px) 100vw, 1040px" quality={85} />
                <figcaption>{pick(g.caption, locale)}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        <div className="col">
          <section className="case-sec">
            <h2 className="h2">{t.stackLabel}</h2>
            <p className="stack">{project.stack.map((s) => <span key={s}>{s}</span>)}</p>
          </section>
          {project.links.length ? (
            <section className="case-sec">
              <h2 className="h2">{t.case.links}</h2>
              <p className="hero-links">
                {project.links.map((l) => (
                  <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">{pick(l.label, locale)} ↗</a>
                ))}
              </p>
            </section>
          ) : null}

          <nav className="pager" aria-label={locale === "es" ? "Más proyectos" : "More projects"}>
            {prev ? <Link className="link" href={`${base}/projects/${prev.slug}`}>← {pick(prev.title, locale)}</Link> : <span />}
            {next ? <Link className="link" href={`${base}/projects/${next.slug}`}>{pick(next.title, locale)} →</Link> : <span />}
          </nav>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
