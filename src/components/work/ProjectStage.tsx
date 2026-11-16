import type { Project } from "@/data/content";
import { pick } from "@/data/content";
import type { Locale } from "@/data/i18n";
import { architectures } from "@/data/architecture";
import { VisualFrame } from "@/components/parts";
import { ProductDisplay } from "./SystemExplorer";
import { ProjectMark, TechnologyRow } from "./ProjectMark";
import { StageAtmosphere } from "./StageAtmosphere";
import styles from "./Work.module.css";

export function ProjectStage({ project, locale, priority = false }: { project: Project; locale: Locale; priority?: boolean }) {
  return <><div className={styles.plate} data-work-plate data-motion-scene><StageAtmosphere /><div className={styles.plateDepth} aria-hidden="true" /><ProductDisplay architecture={architectures[project.slug]} locale={locale} name={pick(project.title, locale)} brand={<ProjectMark slug={project.slug} />} initialView={project.slug === "verifaid" ? "system" : "product"} productLabel={project.slug === "verifaid" ? (locale === "es" ? "Flujo" : "Workflow") : undefined}>{project.visuals ? <VisualFrame visual={project.visuals.primary} locale={locale} sizes="(max-width: 760px) 94vw, 1120px" priority={priority} /> : null}</ProductDisplay></div><TechnologyRow slug={project.slug} locale={locale} /></>;
}
