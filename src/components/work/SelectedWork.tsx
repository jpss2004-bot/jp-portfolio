import Link from "next/link";
import { pick, primaryProjects, supportingProjects, statusLabel } from "@/data/content";
import { workStories } from "@/data/work";
import type { Locale } from "@/data/i18n";
import { ProjectStage } from "./ProjectStage";
import { ProjectMark } from "./ProjectMark";
import { WorkMotion } from "./WorkMotion";
import styles from "./Work.module.css";

export function SelectedWork({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section id="work" className={styles.work} aria-labelledby="work-h">
      <nav className={styles.workNav} aria-label={es ? "Proyectos y contacto" : "Projects and contact"}>
        <span>{es ? "Explorar" : "Explore"}</span>
        {primaryProjects.map((project) => <a key={project.slug} href={`#${project.slug}`}>{pick(project.title, locale)}</a>)}
        <details className={styles.mobileSections}><summary>{es ? "Secciones" : "Sections"}</summary><div><a href="#experience">{es ? "Experiencia" : "Experience"}</a><a href="#build">{es ? "Cómo construyo" : "How I build"}</a><a href="#about">{es ? "Sobre mí" : "About"}</a></div></details>
        <a className={styles.navContact} href="#contact">{es ? "Contacto" : "Contact"} <span aria-hidden="true">↗</span></a>
      </nav>
      <div className={styles.introduction}>
        <h2 id="work-h">{es ? "Trabajo seleccionado." : "Selected work."}</h2>
        <div className={styles.introAside}><p>{es ? "De la interfaz al modelo de datos. Tres productos que muestran cómo diseño, construyo y opero software." : "From the interface to the data model. Three products that show how I design, build and operate software."}</p></div>
      </div>
      <WorkMotion locale={locale}>
        {primaryProjects.map((project) => {
          const story = workStories[project.slug];
          return (
            <article key={project.slug} id={project.slug} className={`${styles.project} ${styles[project.slug] ?? ""}`}>
              <header className={styles.projectHead}>
                <div><h3><Link href={`/${locale}/projects/${project.slug}`}><ProjectMark slug={project.slug} /><span>{pick(project.title, locale)}</span></Link></h3></div>
                <div className={styles.projectMeta}><span className={styles.projectStatus}>{pick(statusLabel[project.status], locale)}</span><span>{pick(project.period, locale)}</span></div>
              </header>
              <ProjectStage project={project} locale={locale} />
              <div className={styles.projectBottom}>
                <div className={styles.projectDescription}><h4>{pick(story.headline, locale)}</h4><p>{pick(project.oneLiner, locale)}</p><div className={styles.projectLinks}><Link href={`/${locale}/projects/${project.slug}`}>{es ? "Explorar el caso" : "Explore the case study"} <span aria-hidden="true">↗</span></Link>{project.links.slice(0, 1).map((link) => <a key={link.href} href={project.slug === "neyvu" ? link.href.replace("lang=en", `lang=${locale}`) : link.href} target="_blank" rel="noreferrer">{pick(link.label, locale)} <span aria-hidden="true">↗</span></a>)}</div></div>
                <dl className={styles.ownership}><div><dt>{es ? "Mi responsabilidad" : "My responsibility"}</dt><dd>{pick(story.ownership, locale)}</dd></div><div><dt>{es ? "Una decisión clave" : "A key decision"}</dt><dd>{pick(story.decision, locale)}</dd></div></dl>
              </div>
              <div className={styles.projectProof}><dl>{project.facts.slice(0, 3).map((fact) => <div key={fact.label.en}><dd>{fact.value}</dd><dt>{pick(fact.label, locale)}</dt></div>)}</dl><p>{project.metricNote ? pick(project.metricNote, locale) : ""}</p></div>
            </article>
          );
        })}
      </WorkMotion>
      <div className={styles.supporting}>
        <h3>{es ? "Más sistemas entregados" : "More systems delivered"}</h3>
        {supportingProjects.map((project) => <Link key={project.slug} href={`/${locale}/projects/${project.slug}`}><div><span>{pick(project.title, locale)}</span><p>{pick(project.oneLiner, locale)}</p></div><span aria-hidden="true">↗</span></Link>)}
      </div>
    </section>
  );
}
