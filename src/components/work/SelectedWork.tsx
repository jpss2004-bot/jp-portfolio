import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { explorations, pick, primaryProjects, statusLabel, summer } from "@/data/content";
import { workRows } from "@/data/work-index";
import { workStories } from "@/data/work";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/i18n";
import { ProjectChooser, type ChooserItem } from "./ProjectChooser";
import { ProjectMark } from "./ProjectMark";
import { ProjectStage } from "./ProjectStage";
import { WorkIndex } from "./WorkIndex";
import { WorkMotion } from "./WorkMotion";
import stage from "./Work.module.css";
import chooser from "./Chooser.module.css";
import styles from "./Showcase.module.css";

/**
 * Featured work as a chooser: three previews, one open project at a time.
 * The deeper material (pinned scenes, timelines, walkthroughs) lives on each
 * case page, so nobody has to scroll past a project they did not pick.
 */
export function SelectedWork({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const t = ui[locale];
  const all = workRows(locale);
  const rows = all.slice(0, 5);

  const items: ChooserItem[] = primaryProjects.map((project, i) => {
    const story = workStories[project.slug];
    const href = `/${locale}/projects/${project.slug}`;
    const live = project.links[0];
    const image = project.media?.type === "image" ? project.media : null;
    return {
      slug: project.slug,
      title: pick(project.title, locale),
      status: pick(statusLabel[project.status], locale),
      period: pick(project.period, locale),
      className: `${stage.project} ${stage[project.slug] ?? ""} ${project.slug === "flaregrain" ? chooser.nightItem : ""}`,
      panelClassName: project.slug === "flaregrain" ? chooser.night : undefined,
      preview: (
        <>
          {image ? (
            <span className={chooser.thumb}>
              <Image src={image.src} alt="" width={image.width} height={image.height} sizes="(max-width: 760px) 38vw, 30vw" quality={80} loading={i === 0 ? "eager" : "lazy"} />
            </span>
          ) : null}
          <span className={chooser.itemText}>
            <span className={chooser.itemIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={chooser.itemName}><ProjectMark slug={project.slug} /><span>{pick(project.title, locale)}</span></span>
            <span className={chooser.itemLine}>{pick(story.headline, locale)}</span>
            <span className={chooser.itemRole}>{pick(project.role, locale)}</span>
          </span>
        </>
      ),
      panel: (
        <div className={chooser.panelGrid}>
          <div className={chooser.panelStage}><ProjectStage project={project} locale={locale} /></div>
          <div className={chooser.panelStory}>
            <p className={chooser.panelTitle}><ProjectMark slug={project.slug} /><span>{pick(project.title, locale)}</span></p>
            <h4>{pick(story.headline, locale)}</h4>
            <dl className={chooser.ownership}>
              <div><dt>{es ? "Mi responsabilidad" : "My responsibility"}</dt><dd>{pick(story.ownership, locale)}</dd></div>
              <div><dt>{es ? "Una decisión clave" : "A key decision"}</dt><dd>{pick(story.decision, locale)}</dd></div>
            </dl>
            <p className={chooser.links}>
              <Link className={chooser.cta} href={href}>{es ? "Ver el caso completo" : "Read the full case study"} <span aria-hidden="true">→</span></Link>
              {live ? <a href={project.slug === "neyvu" ? live.href.replace("lang=en", `lang=${locale}`) : live.href} target="_blank" rel="noreferrer">{pick(live.label, locale)} <span aria-hidden="true">↗</span></a> : null}
            </p>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="work" className={styles.work} aria-labelledby="work-h">
      <header className={styles.intro}>
        <p className={styles.introNum}>01</p>
        <h2 id="work-h" data-reveal="">{es ? "Trabajo seleccionado." : "Selected work."}</h2>
        <div className={styles.introAside} data-reveal="" style={{ "--d": "140ms" } as CSSProperties}>
          <p>{es ? "Tres proyectos: cómo diseño, construyo y lidero software." : "Three projects: how I design, build and lead software."}</p>
          <p className={styles.introHint}>{es ? "Elige uno para abrirlo." : "Pick one to open it."}</p>
        </div>
      </header>

      <WorkMotion locale={locale}>
        <ProjectChooser
          items={items}
          labels={es ? { open: "Abrir", close: "Cerrar", previous: "Anterior", next: "Siguiente" } : { open: "Open", close: "Close", previous: "Previous", next: "Next" }}
        />
      </WorkMotion>

      <div id="more-work" className={styles.more}>
        <header className={styles.moreHead} data-reveal="">
          <h3>{es ? "Más trabajo" : "More work"}</h3>
          <p>{es ? `${all.length} proyectos más. Aquí, los cinco primeros.` : `${all.length} more projects. The first five are here.`}</p>
        </header>
        <WorkIndex rows={rows} labels={{ list: es ? "Más proyectos" : "More projects", open: es ? "Abrir" : "Open", all: es ? "Todos" : "All", type: es ? "Tipo" : "Type", year: es ? "Año" : "Year", empty: "", countOne: "", countMany: "" }} />
        <p className={styles.allWork}><Link href={`/${locale}/work`}><span>{es ? "Ver todo el trabajo" : "See all work"}</span><b>{all.length + primaryProjects.length}</b><i aria-hidden="true">→</i></Link></p>
        <p id="explorations" className={styles.footnote}>
          {pick(explorations, locale)}{" "}
          <a className="link" href={`${summer.href}?lang=${locale}`}>{t.summer.report} →</a>
        </p>
      </div>
    </section>
  );
}
