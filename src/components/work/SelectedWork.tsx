import Image from "next/image";
import Link from "next/link";
import { explorations, pick, primaryProjects, shipped, statusLabel, summer, supportingProjects } from "@/data/content";
import { workStories } from "@/data/work";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/i18n";
import { ProjectMark } from "./ProjectMark";
import { ProjectStage } from "./ProjectStage";
import { ScrollSpyNav } from "./ScrollSpyNav";
import { WorkIndex, type IndexRow } from "./WorkIndex";
import { WorkMotion } from "./WorkMotion";
import stage from "./Work.module.css";
import styles from "./Showcase.module.css";

type Inset = { src: string; width: number; height: number; label: { en: string; es: string } };

/* A second, smaller view that overlaps each stage. */
const insets: Record<string, Inset> = {
  checkwise: { src: "/projects/checkwise/reviewer.webp", width: 1600, height: 900, label: { en: "Reviewer desk", es: "Mesa de revisión" } },
  flaregrain: { src: "/projects/flaregrain/compare.webp", width: 1920, height: 1080, label: { en: "Compare two experiments", es: "Comparar dos experimentos" } },
  neyvu: { src: "/projects/neyvu/source.png", width: 1280, height: 800, label: { en: "Source reader", es: "Lector de fuentes" } },
};

const art: Record<string, { src: string; contain?: boolean }> = {
  verifaid: { src: "/art/verifaid-3d.webp", contain: true },
  "document-pipelines": { src: "/art/pipelines-3d.webp", contain: true },
  "legalshelf-mx": { src: "/projects/legalshelf-mx/home.webp" },
  SAVR: { src: "/projects/savr/savr-dashboard.png" },
  "Band of Brothers": { src: "/art/bob.webp" },
  "La Red de Casa": { src: "/art/redcasa-3d.webp", contain: true },
  Cotejo: { src: "/art/cotejo-3d.webp", contain: true },
  "POS Geocoder": { src: "/art/geocoder-3d.webp", contain: true },
  "Red 360+1": { src: "/art/red360.webp" },
  "AI in legal practice": { src: "/art/talk-3d.webp", contain: true },
  "ER Triage & Queue Manager": { src: "/projects/er-triage-queue-manager/shot-dashboard.png" },
  "Family Phrase Game": { src: "/projects/family-phrase-game/family-phrase-game-main.png" },
};

export function SelectedWork({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const t = ui[locale];
  const total = String(primaryProjects.length).padStart(2, "0");

  const rows: IndexRow[] = [
    ...supportingProjects.map((project) => ({
      key: project.slug,
      name: pick(project.title, locale),
      line: pick(project.oneLiner, locale),
      kind: pick(statusLabel[project.status], locale),
      year: pick(project.period, locale),
      href: `/${locale}/projects/${project.slug}`,
      external: false,
      image: art[project.slug]?.src,
      contain: art[project.slug]?.contain,
    })),
    ...shipped.map((item) => ({
      key: item.name,
      name: item.name,
      line: pick(item.line, locale),
      kind: pick(item.kind, locale),
      year: item.year,
      href: item.slug ? `/${locale}/projects/${item.slug}` : item.href,
      external: !item.slug && !!item.href,
      image: art[item.name]?.src,
      contain: art[item.name]?.contain,
    })),
  ];

  return (
    <section id="work" className={styles.work} aria-labelledby="work-h">
      <ScrollSpyNav
        className={styles.spy}
        label={es ? "Proyectos" : "Projects"}
        lead={<span className={styles.spyLead}>{es ? "Trabajo" : "Work"}</span>}
        items={[
          ...primaryProjects.map((project, i) => ({ id: project.slug, label: pick(project.title, locale), index: String(i + 1).padStart(2, "0") })),
          { id: "more-work", label: es ? "Más trabajo" : "More work", index: "+" + rows.length },
        ]}
        trail={<a className={styles.spyContact} href="#contact">{es ? "Contacto" : "Contact"} <span aria-hidden="true">↗</span></a>}
      />

      <header className={styles.intro}>
        <p className={styles.introNum}>01</p>
        <h2 id="work-h">{es ? "Trabajo seleccionado." : "Selected work."}</h2>
        <div className={styles.introAside}>
          <p>{es ? "De la interfaz al modelo de datos. Tres proyectos que muestran cómo diseño, construyo y lidero software." : "From the interface to the data model. Three projects that show how I design, build and lead software."}</p>
          <ol className={styles.introIndex}>
            {primaryProjects.map((project, i) => (
              <li key={project.slug}><a href={`#${project.slug}`}><span>{String(i + 1).padStart(2, "0")}</span><b>{pick(project.title, locale)}</b><i>{pick(statusLabel[project.status], locale)}</i></a></li>
            ))}
          </ol>
        </div>
      </header>

      <WorkMotion locale={locale}>
        {primaryProjects.map((project, i) => {
          const story = workStories[project.slug];
          const href = `/${locale}/projects/${project.slug}`;
          const inset = insets[project.slug];
          const live = project.links[0];
          return (
            <article key={project.slug} id={project.slug} className={`${stage.project} ${stage[project.slug] ?? ""} ${styles.spread} ${i % 2 ? styles.flip : ""}`}>
              <header className={styles.spreadHead}>
                <p className={styles.count}><b>{String(i + 1).padStart(2, "0")}</b><span>/ {total}</span></p>
                <h3><Link href={href}><ProjectMark slug={project.slug} /><span>{pick(project.title, locale)}</span></Link></h3>
                <p className={styles.spreadMeta}><span className={styles.status}><i aria-hidden="true" />{pick(statusLabel[project.status], locale)}</span><span>{pick(project.period, locale)}</span></p>
              </header>

              <div className={styles.spreadGrid}>
                <div className={styles.stageCol}><ProjectStage project={project} locale={locale} priority={i === 0} /></div>
                <div className={styles.story}>
                  <h4>{pick(story.headline, locale)}</h4>
                  <p className={styles.oneLiner}>{pick(project.oneLiner, locale)}</p>
                  <dl className={styles.ownership}>
                    <div><dt>{es ? "Mi responsabilidad" : "My responsibility"}</dt><dd>{pick(story.ownership, locale)}</dd></div>
                    <div><dt>{es ? "Una decisión clave" : "A key decision"}</dt><dd>{pick(story.decision, locale)}</dd></div>
                  </dl>
                  <p className={styles.links}>
                    <Link className={styles.cta} href={href}>{es ? "Explorar el caso" : "Explore the case study"} <span aria-hidden="true">→</span></Link>
                    {live ? <a href={project.slug === "neyvu" ? live.href.replace("lang=en", `lang=${locale}`) : live.href} target="_blank" rel="noreferrer">{pick(live.label, locale)} <span aria-hidden="true">↗</span></a> : null}
                  </p>
                  {inset ? (
                    <figure className={styles.inset}>
                      <Link href={href} tabIndex={-1} aria-hidden="true"><Image src={inset.src} alt="" width={inset.width} height={inset.height} sizes="(max-width: 900px) 70vw, 420px" quality={85} /></Link>
                      <figcaption><span>{String(i + 1).padStart(2, "0")}.2</span>{inset.label[locale]}</figcaption>
                    </figure>
                  ) : null}
                </div>
              </div>

              <div className={styles.proof}>
                <dl>{project.facts.slice(0, 4).map((fact) => <div key={fact.label.en}><dd>{fact.value}</dd><dt>{pick(fact.label, locale)}</dt></div>)}</dl>
                {project.metricNote ? <p>{pick(project.metricNote, locale)}</p> : null}
              </div>
            </article>
          );
        })}
      </WorkMotion>

      <div id="more-work" className={styles.more}>
        <header className={styles.moreHead}>
          <h3>{es ? "Más trabajo" : "More work"}</h3>
          <p>{es ? `${rows.length} proyectos más: productos, herramientas de escritorio, sitios y trabajo académico.` : `${rows.length} more projects: products, desktop tools, websites and coursework.`}</p>
        </header>
        <WorkIndex rows={rows} label={es ? "Más proyectos" : "More projects"} openLabel={es ? "Abrir" : "Open"} />
        <p id="explorations" className={styles.footnote}>
          {pick(explorations, locale)}{" "}
          <a className="link" href={`${summer.href}?lang=${locale}`}>{t.summer.report} →</a>
        </p>
      </div>
    </section>
  );
}
