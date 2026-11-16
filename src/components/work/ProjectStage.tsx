import type { Project } from "@/data/content";
import { pick } from "@/data/content";
import type { Locale } from "@/data/i18n";
import { architectures } from "@/data/architecture";
import { VisualFrame } from "@/components/parts";
import { ProductDisplay } from "./SystemExplorer";
import { ProjectMark, TechnologyRow } from "./ProjectMark";
import { StageAtmosphere } from "./StageAtmosphere";
import { AnnotatedShot } from "./AnnotatedShot";
import { FlameBackdrop } from "./FlameScene";
import { workStories } from "@/data/work";
import { visuals } from "@/data/visuals";
import { MockScreen, mockAlt, mockLabels } from "./mocks/MockScreen";
import styles from "./Work.module.css";

export function ProjectStage({ project, locale, priority = false }: { project: Project; locale: Locale; priority?: boolean }) {
  const es = locale === "es";
  const notes = workStories[project.slug]?.annotations;
  const image = project.media?.type === "image" ? project.media : null;
  const primary = project.visuals?.primary;
  const shot = notes && image ? (
    <AnnotatedShot
      src={image.src} width={image.width} height={image.height} alt={pick(image.alt, locale)} priority={priority}
      notes={notes.map((note) => ({ x: note.x, y: note.y, text: pick(note.text, locale) }))}
      caption={primary && primary.kind !== "system" && primary.caption && primary.kind === "image" ? pick(primary.caption, locale) : undefined}
      openLabel={es ? "Abrir imagen completa" : "Open full-size image"}
      video={primary?.kind === "video" ? { src: primary.src, poster: primary.poster, label: pick(primary.alt, locale), watch: es ? "Ver el demo de 29 segundos" : "Watch the 29-second demo", back: es ? "Volver a la captura" : "Back to the capture" } : undefined}
    />
  ) : null;
  const mockKind = !shot ? visuals[project.slug]?.mock : undefined;
  const mock = mockKind ? (
    <figure className={`shot media-frame media-interface ${styles.mockFigure}`}>
      <div className="media-canvas"><MockScreen kind={mockKind} label={pick(mockAlt[mockKind][0], locale)} /></div>
      <figcaption><span>{mockLabels[mockKind][0]}</span></figcaption>
    </figure>
  ) : null;
  return <><div className={styles.plate} data-work-plate data-motion-scene>{project.slug === "flaregrain" ? <FlameBackdrop /> : <StageAtmosphere />}<div className={styles.plateDepth} aria-hidden="true" /><ProductDisplay architecture={architectures[project.slug]} locale={locale} name={pick(project.title, locale)} brand={<ProjectMark slug={project.slug} />} initialView="product">{shot ? shot : mock ? mock : project.visuals ? <VisualFrame visual={project.visuals.primary} locale={locale} sizes="(max-width: 760px) 94vw, 1120px" priority={priority} /> : null}</ProductDisplay></div><TechnologyRow slug={project.slug} locale={locale} /></>;
}
