import { projects as legacyProjects, type Project } from "./portfolio";
import type { Locale, Localized } from "./i18n";

export type { Localized } from "./i18n";

export type ProjectLinkKind = "case-study" | "live" | "repo" | "video";
export type CaseStudyStatus = "live" | "prototype" | "research" | "coursework";

export type ProjectLink = {
  label: Localized<string>;
  href: string;
  kind: ProjectLinkKind;
};

export type ProofMetric = {
  label: Localized<string>;
  value: string;
  note?: Localized<string>;
};

export type Decision = {
  title: Localized<string>;
  tradeoff: Localized<string>;
  outcome: Localized<string>;
};

export type GalleryItem = {
  src: string;
  alt: Localized<string>;
  caption?: Localized<string>;
};

export type ProjectCaseStudy = {
  slug: string;
  featured: boolean;
  status: CaseStudyStatus;
  statusLabel: Localized<string>;
  year: string;
  title: Localized<string>;
  tagline: Localized<string>;
  role: Localized<string>;
  summary: Localized<string>;
  heroImage: string;
  tech: string[];
  proofs: ProofMetric[];
  links: ProjectLink[];
  challenge: Localized<string>;
  approach: Localized<string>;
  architecture: Localized<string[]>;
  decisions: Decision[];
  results: Localized<string[]>;
  nextSteps: Localized<string[]>;
  gallery: GalleryItem[];
  resumeBullet: Localized<string>;
};

function localized<T>(en: T, es?: T): Localized<T> {
  return { en, es: es ?? en };
}

function getStatus(status: Project["status"]): CaseStudyStatus {
  if (status === "Live") return "live";
  if (status === "Prototype") return "prototype";
  if (status === "Case Study") return "research";
  return "prototype";
}

function getStatusLabel(status: Project["status"]): Localized<string> {
  const labels: Record<Project["status"], Localized<string>> = {
    Live: localized("Live", "Activo"),
    Prototype: localized("Prototype", "Prototipo"),
    "Case Study": localized("Case Study", "Caso de estudio"),
    "In Progress": localized("In Progress", "En progreso"),
  };

  return labels[status];
}

function getLinkKind(link: Project["links"][number]): ProjectLinkKind {
  const value = `${link.label} ${link.href}`.toLowerCase();

  if (value.includes("github")) return "repo";
  if (value.includes("live") || value.includes("demo") || value.includes("vercel") || value.includes("render")) return "live";
  if (value.includes("video")) return "video";

  return "case-study";
}

function buildDecisions(project: Project): Decision[] {
  const source = project.challenges.length > 0 ? project.challenges : project.architecture;

  return source.slice(0, 3).map((item, index) => ({
    title: localized(`Decision ${index + 1}`, `DecisiÃ³n ${index + 1}`),
    tradeoff: localized(item),
    outcome: localized(project.next[index] ?? project.solution),
  }));
}

function toCaseStudy(project: Project, index: number): ProjectCaseStudy {
  return {
    slug: project.slug,
    featured: index < 3,
    status: getStatus(project.status),
    statusLabel: getStatusLabel(project.status),
    year: project.year,
    title: localized(project.name),
    tagline: localized(project.oneLiner),
    role: localized(project.role),
    summary: localized(project.summary),
    heroImage: `/projects/${project.slug}/hero.png`,
    tech: project.stack,
    proofs: project.metrics.map((metric) => ({
      label: localized(metric.label),
      value: metric.value,
      note: localized(project.type),
    })),
    links: project.links.map((link) => ({
      label: localized(link.label),
      href: link.href,
      kind: getLinkKind(link),
    })),
    challenge: localized(project.problem),
    approach: localized(project.solution),
    architecture: localized(project.architecture),
    decisions: buildDecisions(project),
    results: localized([project.impact, ...project.proof]),
    nextSteps: localized(project.next),
    gallery: [
      {
        src: `/projects/${project.slug}/hero.png`,
        alt: localized(`${project.shortName} project proof image`),
        caption: localized("Replace this placeholder path with a real project screenshot during Phase 4 or Phase 5."),
      },
    ],
    resumeBullet: localized(`${project.shortName}: ${project.oneLiner}`),
  };
}

export const caseStudies: ProjectCaseStudy[] = legacyProjects.map(toCaseStudy);

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getLocalizedValue<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}
