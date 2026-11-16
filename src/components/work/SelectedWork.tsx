import Image from "next/image";
import type { CSSProperties } from "react";
import { CountUp } from "@/components/CountUp";
import Link from "next/link";
import { explorations, pick, primaryProjects, statusLabel, summer } from "@/data/content";
import { workRows } from "@/data/work-index";
import { workStories } from "@/data/work";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/i18n";
import { FlameScene } from "./FlameScene";
import { ProjectMark } from "./ProjectMark";
import { ProjectStage } from "./ProjectStage";
import { ScrollSpyNav } from "./ScrollSpyNav";
import { WorkIndex } from "./WorkIndex";
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

export function SelectedWork({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const t = ui[locale];
  const total = String(primaryProjects.length).padStart(2, "0");

  const all = workRows(locale);
  const rows = all.slice(0, 5);

  return (
    <section id="work" className={styles.work} aria-labelledby="work-h">
      <ScrollSpyNav
        className={styles.spy}
        label={es ? "Proyectos" : "Projects"}
        lead={<span className={styles.spyLead}>{es ? "Trabajo" : "Work"}</span>}
        items={[
          ...primaryProjects.map((project, i) => ({ id: project.slug, label: pick(project.title, locale), index: String(i + 1).padStart(2, "0") })),
          { id: "more-work", label: es ? "Más trabajo" : "More work", index: "+" + all.length },
        ]}
        trail={<a className={styles.spyContact} href="#contact">{es ? "Contacto" : "Contact"} <span aria-hidden="true">↗</span></a>}
      />

      <header className={styles.intro}>
        <p className={styles.introNum}>01</p>
        <h2 id="work-h" data-reveal="">{es ? "Trabajo seleccionado." : "Selected work."}</h2>
        <div className={styles.introAside} data-reveal="" style={{ "--d": "140ms" } as CSSProperties}>
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
              <header className={styles.spreadHead} data-reveal="">
                <p className={styles.count}><b>{String(i + 1).padStart(2, "0")}</b><span>/ {total}</span></p>
                <h3><Link href={href}><ProjectMark slug={project.slug} /><span>{pick(project.title, locale)}</span></Link></h3>
                <p className={styles.spreadMeta}><span className={styles.status}><i aria-hidden="true" />{pick(statusLabel[project.status], locale)}</span><span>{pick(project.period, locale)}</span></p>
              </header>

              {project.slug === "flaregrain" ? (
                <FlameScene copy={es ? {
                  kicker: "Por qué el fuego es distinto en el espacio", earth: "En la Tierra", space: "En microgravedad",
                  earthBody: "Los gases calientes suben y atraen aire fresco. Esa corriente da a la flama su forma de gota.",
                  spaceBody: "Sin esa corriente, el oxígeno llega por difusión. La flama se vuelve una esfera lenta y azul, y el humo no sube para avisar.",
                  gravity: "Gravedad", shape: "Forma", oxygen: "Oxígeno por", colour: "Color",
                  teardrop: "gota", sphere: "esfera", buoyant: "corriente ascendente", diffusion: "difusión", yellow: "amarillo", blue: "azul",
                  note: "Ilustración dibujada con código, no es video de la NASA.", source: "Explicación de la NASA", scroll: "Desplaza para quitar la gravedad",
                } : {
                  kicker: "Why fire is different in space", earth: "On Earth", space: "In microgravity",
                  earthBody: "Hot gases rise and pull in fresh air. That draught gives a flame its teardrop shape.",
                  spaceBody: "Without that draught, oxygen arrives by diffusion. The flame becomes a slow blue sphere, and smoke does not rise to warn you.",
                  gravity: "Gravity", shape: "Shape", oxygen: "Oxygen by", colour: "Colour",
                  teardrop: "teardrop", sphere: "sphere", buoyant: "rising draught", diffusion: "diffusion", yellow: "yellow", blue: "blue",
                  note: "Illustration drawn in code, not NASA footage.", source: "NASA's explanation", scroll: "Scroll to remove gravity",
                }} />
              ) : null}

              <div className={styles.spreadGrid}>
                <div className={styles.stageCol} data-reveal="rise"><ProjectStage project={project} locale={locale} priority={i === 0} /></div>
                <div className={styles.story} data-reveal="" style={{ "--d": "160ms" } as CSSProperties}>
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
                    <figure className={styles.inset} data-reveal={i % 2 ? "right" : "left"} style={{ "--d": "380ms" } as CSSProperties}>
                      <Link href={href} tabIndex={-1} aria-hidden="true"><Image src={inset.src} alt="" width={inset.width} height={inset.height} sizes="(max-width: 900px) 70vw, 420px" quality={85} /></Link>
                      <figcaption><span>{String(i + 1).padStart(2, "0")}.2</span>{inset.label[locale]}</figcaption>
                    </figure>
                  ) : null}
                </div>
              </div>

              {story.timeline ? (
                <ol className={styles.timeline} aria-label={es ? "Cronología" : "Timeline"}>
                  {story.timeline.map((step, n) => (
                    <li key={step.when.en} data-reveal="" style={{ "--d": `${n * 110}ms` } as CSSProperties}><i aria-hidden="true" /><b>{pick(step.when, locale)}</b><span>{pick(step.what, locale)}</span></li>
                  ))}
                </ol>
              ) : null}

              <div className={styles.proof}>
                <dl>{project.facts.slice(0, 4).map((fact, n) => <div key={fact.label.en} data-reveal="" style={{ "--d": `${n * 90}ms` } as CSSProperties}><dd><CountUp value={fact.value} /></dd><dt>{pick(fact.label, locale)}</dt></div>)}</dl>
                {project.metricNote ? <p>{pick(project.metricNote, locale)}</p> : null}
              </div>
            </article>
          );
        })}
      </WorkMotion>

      <div id="more-work" className={styles.more}>
        <header className={styles.moreHead} data-reveal="">
          <h3>{es ? "Más trabajo" : "More work"}</h3>
          <p>{es ? `${all.length} proyectos más: productos, herramientas de escritorio, sitios y trabajo académico. Aquí, los cinco primeros.` : `${all.length} more projects: products, desktop tools, websites and coursework. The first five are here.`}</p>
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
