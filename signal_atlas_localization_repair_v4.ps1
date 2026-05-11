# signal_atlas_localization_repair_v4.ps1
# Purpose: fix Spanish mojibake, make project cards truly bilingual, remove fake console remnants,
# create clean placeholder project visuals, and verify the build.
# Run from: jp-portfolio-site project root

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Assert-ProjectRoot {
  if (!(Test-Path "package.json") -or !(Test-Path "src/app") -or !(Test-Path "src/data")) {
    throw "Run this from the jp-portfolio-site project root. package.json, src/app, or src/data was not found."
  }
}

function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $full = Join-Path (Get-Location) $Path
  $dir = Split-Path $full -Parent
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  [System.IO.File]::WriteAllText($full, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Read-Utf8NoBom([string]$Path) {
  $full = Join-Path (Get-Location) $Path
  return [System.IO.File]::ReadAllText($full, [System.Text.UTF8Encoding]::new($false))
}

function Backup-File([string]$Path, [string]$BackupRoot) {
  if (Test-Path $Path) {
    $target = Join-Path $BackupRoot $Path
    $targetDir = Split-Path $target -Parent
    if (!(Test-Path $targetDir)) {
      New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
    }
    Copy-Item $Path $target -Force
  }
}

function Remove-Bom([string]$Path) {
  if (!(Test-Path $Path)) { return }
  $full = (Resolve-Path $Path).Path
  $bytes = [System.IO.File]::ReadAllBytes($full)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    [System.IO.File]::WriteAllBytes($full, $bytes[3..($bytes.Length - 1)])
    Write-Host "Removed BOM: $Path" -ForegroundColor Yellow
  }
}

Assert-ProjectRoot

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = "_portfolio_backups/signal-atlas-localization-repair-v4-$stamp"

Write-Step "Creating backup at $backupRoot"

$files = @(
  "src/data/case-studies.ts",
  "src/app/[locale]/projects/[slug]/page.tsx",
  "src/components/layout/Header.tsx",
  "src/components/layout/SiteShell.tsx",
  "src/components/layout/DocumentLocaleSync.tsx",
  "src/components/home/SignalAtlasHomeClient.tsx",
  "src/app/projects/[slug]/page.tsx",
  "src/app/globals.css"
)

foreach ($file in $files) {
  Backup-File $file $backupRoot
}

Write-Step "Cleaning BOM from source files"

Get-ChildItem -Path "src" -Recurse -File |
  Where-Object { $_.Extension -in ".ts", ".tsx", ".css", ".md", ".json" } |
  ForEach-Object { Remove-Bom $_.FullName }

Write-Step "Writing clean DocumentLocaleSync"

$documentLocaleSync = @'
"use client";

import { useEffect } from "react";
import type { Locale } from "@/data/i18n";

export function DocumentLocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.scrollBehavior = "smooth";
  }, [locale]);

  return null;
}
'@
Write-Utf8NoBom "src/components/layout/DocumentLocaleSync.tsx" $documentLocaleSync

Write-Step "Writing shared SiteShell"

$siteShell = @'
import type { ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import { Header, type HeaderNavItem } from "@/components/layout/Header";
import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";

type SiteShellProps = {
  locale: Locale;
  navItems: HeaderNavItem[];
  projectSlug?: string;
  children: ReactNode;
};

export function SiteShell({ locale, navItems, projectSlug, children }: SiteShellProps) {
  return (
    <main id="main-content" className="portfolio-page">
      <DocumentLocaleSync locale={locale} />
      <Header locale={locale} navItems={navItems} projectSlug={projectSlug} />
      {children}
    </main>
  );
}
'@
Write-Utf8NoBom "src/components/layout/SiteShell.tsx" $siteShell

Write-Step "Writing clean localized Header"

$header = @'
import Link from "next/link";
import type { Locale } from "@/data/i18n";
import { profile } from "@/data/portfolio";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileSheetNav, type MobileNavItem } from "./MobileSheetNav";

export type HeaderNavItem = MobileNavItem;

type HeaderProps = {
  locale: Locale;
  navItems: HeaderNavItem[];
  projectSlug?: string;
};

const labels = {
  en: {
    home: "JP Samano home",
    nav: "Main navigation",
    resume: "Resume",
    github: "GitHub",
  },
  es: {
    home: "Inicio de JP Samano",
    nav: "Navegacion principal",
    resume: "CV",
    github: "GitHub",
  },
} as const;

export function Header({ locale, navItems, projectSlug }: HeaderProps) {
  const t = labels[locale];
  const resumeFile = locale === "es" ? "/resume/jp-samano-resume-es.pdf" : "/resume/jp-samano-resume-en.pdf";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}`} className="brand-mark" aria-label={t.home}>
          <span className="brand-orb">JP</span>
          <span>
            <strong>JP Samano</strong>
            <small>Signal Atlas</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label={t.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LocaleSwitch currentLocale={locale} slug={projectSlug} />
          <a href={resumeFile} target="_blank" rel="noreferrer" className="header-resume-link">
            {t.resume}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="header-icon-link">
            {t.github}
          </a>
          <MobileSheetNav locale={locale} navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
'@
Write-Utf8NoBom "src/components/layout/Header.tsx" $header

Write-Step "Writing fully bilingual case-study data"

$caseStudies = @'
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

type SpanishProjectCopy = {
  title: string;
  tagline: string;
  role: string;
  summary: string;
  challenge: string;
  approach: string;
  architecture: string[];
  results: string[];
  nextSteps: string[];
  resumeBullet: string;
};

function localized<T>(en: T, es: T): Localized<T> {
  return { en, es };
}

const spanishBySlug: Record<string, SpanishProjectCopy> = {
  savr: {
    title: "SAVR - Plataforma de Recomendaciones Contextuales",
    tagline: "Un sistema de recomendaciones que entiende el contexto, no solo la cocina.",
    role: "Direccion de producto, API backend, flujos frontend, modelo de datos y logica de recomendacion",
    summary:
      "SAVR ayuda a elegir restaurantes y experiencias segun gusto, presupuesto, ambiente, grupo, restricciones y el tipo de noche que busca el usuario.",
    challenge:
      "La busqueda de restaurantes suele ser generica. Normalmente filtra por ubicacion o cocina, pero ignora con quien vas, que ambiente quieres y que restricciones importan.",
    approach:
      "SAVR trata la decision como un problema de recomendacion contextual. El usuario puede describir su noche, construirla con opciones guiadas o usar un modo sorpresa con resultados explicables.",
    architecture: [
      "La interfaz maneja onboarding, entradas de recomendacion y presentacion de resultados.",
      "La API separa autenticacion, restaurantes, experiencias y rutas de recomendacion.",
      "El modelo de datos soporta preferencias, metadatos de restaurantes, ambiente y futuras senales de eventos.",
      "La capa de recomendacion conecta contexto del usuario con atributos del lugar y explica por que encaja.",
    ],
    results: [
      "Proyecto flagship porque combina producto, full-stack, logica de recomendacion, onboarding y experiencia de usuario.",
      "Estructura backend con FastAPI.",
      "Arquitectura frontend con React y TypeScript.",
      "Direccion de autenticacion, onboarding y flujos de recomendacion.",
      "Modos Describe, Build y Surprise como rutas de decision.",
    ],
    nextSteps: [
      "Agregar capturas reales de la app actual.",
      "Agregar demo desplegada cuando sea estable.",
      "Agregar explicaciones por platillo y ranking por eventos.",
    ],
    resumeBullet: "SAVR: recomendaciones contextuales para restaurantes con flujos explicables.",
  },
  "er-triage-queue-manager": {
    title: "ER Triage & Queue Manager",
    tagline: "Prototipo de flujo clinico para intake, triage, colas y estado de tratamiento.",
    role: "Diseno de sistema, implementacion en Python, modelo de datos y logica de flujo",
    summary:
      "Prototipo de sala de emergencias para registro de pacientes, signos vitales, prioridad automatizada, visibilidad de cola y progreso de tratamiento.",
    challenge:
      "Los flujos de emergencias dependen de visibilidad compartida. Intake, signos vitales, prioridad, cuarto y tratamiento se fragmentan si no viven en un solo sistema.",
    approach:
      "El prototipo centraliza registro, signos vitales, scoring de prioridad, monitoreo de cola, paginas de paciente e historial de estado.",
    architecture: [
      "NiceGUI organiza vistas para intake, triage de enfermeria, cola y administracion.",
      "SQLite guarda pacientes, signos vitales, prioridad, cuarto e historial.",
      "La logica de prioridad conecta sintomas y signos vitales con posicion en la cola.",
      "Los dashboards muestran el estado del paciente para una demo clara.",
    ],
    results: [
      "Muestra modelado de flujos, estructura de interfaz, persistencia y conversion de un problema operativo en software.",
      "Estructura de aplicacion Python.",
      "Modelo de base de datos SQLite.",
      "Estado de paciente e historial.",
      "Dashboard de cola y pantallas por rol.",
    ],
    nextSteps: [
      "Agregar capturas de cada flujo principal.",
      "Documentar claramente el algoritmo de scoring.",
      "Crear un video corto de demo.",
    ],
    resumeBullet: "ER Triage: prototipo de cola y estado de pacientes para flujos clinicos.",
  },
  "family-phrase-game": {
    title: "Family Phrase Game",
    tagline: "Juego tipo Catchphrase personalizado con frases reales de familia.",
    role: "Implementacion full-stack, diseno del flujo de juego y despliegue",
    summary:
      "Aplicacion Flask desplegada para jugar con frases personalizadas recolectadas desde un flujo de Google Forms.",
    challenge:
      "Los juegos genericos son divertidos, pero se vuelven mas significativos cuando el contenido es personal y especifico del grupo.",
    approach:
      "El juego usa frases enviadas por familiares y las presenta en una interfaz simple para que otros jugadores las describan y adivinen.",
    architecture: [
      "Flask sirve la aplicacion y sus rutas.",
      "El frontend estatico muestra la superficie de juego.",
      "Las frases pueden prepararse desde respuestas de Google Forms.",
      "El despliegue permite jugar desde el navegador.",
    ],
    results: [
      "Muestra velocidad de ejecucion, despliegue y enfoque practico hacia usuarios reales.",
      "Despliegue activo en Render.",
      "Backend con Python Flask.",
      "Flujo de frases personalizadas.",
      "Loop de juego simple en web.",
    ],
    nextSteps: [
      "Agregar herramientas de importacion de frases.",
      "Agregar control de equipos, rondas y puntuacion.",
      "Mejorar la experiencia movil.",
    ],
    resumeBullet: "Family Phrase Game: app web desplegada para un juego familiar personalizado.",
  },
  "adaptive-traffic-ai": {
    title: "Adaptive Traffic AI System",
    tagline: "Concepto con simulacion para coordinacion adaptativa de semaforos.",
    role: "Direccion de investigacion, plan de simulacion y arquitectura de sistema",
    summary:
      "Concepto de sistema para entrenar y probar coordinacion de semaforos con IA en una ciudad simulada antes de explorar uso real.",
    challenge:
      "El trafico urbano suele gestionarse por interseccion, pero la congestion se forma en redes completas. El sistema necesita razonar sobre la ciudad conectada.",
    approach:
      "El proyecto inicia con una simulacion digital que genera datos sinteticos, prueba estrategias y evalua comportamiento adaptativo de forma segura.",
    architecture: [
      "La simulacion genera estados de trafico y flujo de vehiculos.",
      "La capa de datos captura intersecciones, espera, densidad y congestion.",
      "La capa de IA propone ajustes segun el estado de la red.",
      "El dashboard visualiza intersecciones, intervenciones y resultados.",
    ],
    results: [
      "Muestra pensamiento de sistemas, planeacion de IA, desarrollo con simulacion y limites responsables.",
      "Modelo mental de recoleccion y preparacion de datos.",
      "Estrategia de desarrollo basada en simulacion.",
      "Concepto de sistema de razonamiento.",
      "Direccion de evaluacion y dashboard.",
    ],
    nextSteps: [
      "Construir la primera simulacion minima de una cuadricula.",
      "Definir algoritmos base para comparar.",
      "Crear un dashboard de evaluacion.",
    ],
    resumeBullet: "Traffic AI: concepto de IA con simulacion para coordinacion urbana.",
  },
  "cyber-reporting-assistant": {
    title: "Cyber Harassment Reporting Assistant",
    tagline: "Asistente de seguridad para documentar llamadas sospechosas y reportes.",
    role: "Concepto de producto, UX de seguridad y diseno de flujo de reporte",
    summary:
      "Concepto para organizar detalles de incidentes, clasificar senales de riesgo y generar material estructurado de reporte.",
    challenge:
      "Personas que enfrentan llamadas sospechosas o acoso digital muchas veces no saben que documentar ni que informacion importa.",
    approach:
      "El asistente guia la captura del incidente, la clasificacion de riesgo y la generacion de reportes con limites claros de privacidad y seguridad.",
    architecture: [
      "La interfaz recopila detalles del incidente de forma estructurada.",
      "La capa de clasificacion identifica urgencia y senales de riesgo.",
      "El generador convierte la informacion en documentacion organizada.",
      "Las reglas de almacenamiento definen privacidad, borrado y acceso.",
    ],
    results: [
      "Muestra pensamiento de producto en ciberseguridad, UX segura y diseno de flujos de reporte.",
      "Concepto de flujo de recoleccion de incidentes.",
      "Direccion de modelo de clasificacion de riesgo.",
      "Idea de generacion de reporte estructurado.",
      "Limites de privacidad y consentimiento.",
    ],
    nextSteps: [
      "Prototipar el flujo de reporte.",
      "Definir limites eticos y legales.",
      "Crear diagramas de arquitectura y salidas de ejemplo.",
    ],
    resumeBullet: "Cyber Reporting: concepto de producto para reportes de ciberacoso y llamadas sospechosas.",
  },
};

const metricLabelsEs: Record<string, string> = {
  "Core modes": "Modos",
  Architecture: "Arquitectura",
  Focus: "Enfoque",
  "Workflow stages": "Etapas",
  Database: "Base de datos",
  Interface: "Interfaz",
  Status: "Estado",
  Deploy: "Despliegue",
  Build: "Build",
  Mode: "Modo",
  Domain: "Dominio",
  Scope: "Alcance",
  Output: "Salida",
};

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

function getLinkLabel(link: Project["links"][number]): Localized<string> {
  const kind = getLinkKind(link);

  if (kind === "live") return localized(link.label, "App activa");
  if (kind === "repo") return localized(link.label, "GitHub");
  if (kind === "video") return localized(link.label, "Video");

  return localized(link.label, "Caso de estudio");
}

function buildDecisions(project: Project, es: SpanishProjectCopy): Decision[] {
  const englishSource = project.challenges.length > 0 ? project.challenges : project.architecture;
  const spanishSource = es.architecture.length > 0 ? es.architecture : [es.challenge, es.approach];

  return englishSource.slice(0, 3).map((item, index) => ({
    title: localized(`Decision ${index + 1}`, `Decision ${index + 1}`),
    tradeoff: localized(item, spanishSource[index] ?? es.challenge),
    outcome: localized(project.next[index] ?? project.solution, es.nextSteps[index] ?? es.approach),
  }));
}

function toCaseStudy(project: Project, index: number): ProjectCaseStudy {
  const es = spanishBySlug[project.slug];

  if (!es) {
    throw new Error(`Missing Spanish project copy for ${project.slug}`);
  }

  return {
    slug: project.slug,
    featured: index < 3,
    status: getStatus(project.status),
    statusLabel: getStatusLabel(project.status),
    year: project.year,
    title: localized(project.name, es.title),
    tagline: localized(project.oneLiner, es.tagline),
    role: localized(project.role, es.role),
    summary: localized(project.summary, es.summary),
    heroImage: `/projects/${project.slug}/hero.svg`,
    tech: project.stack,
    proofs: project.metrics.map((metric) => ({
      label: localized(metric.label, metricLabelsEs[metric.label] ?? metric.label),
      value: metric.value,
      note: localized(project.type, es.tagline),
    })),
    links: project.links.map((link) => ({
      label: getLinkLabel(link),
      href: link.href,
      kind: getLinkKind(link),
    })),
    challenge: localized(project.problem, es.challenge),
    approach: localized(project.solution, es.approach),
    architecture: localized(project.architecture, es.architecture),
    decisions: buildDecisions(project, es),
    results: localized([project.impact, ...project.proof], es.results),
    nextSteps: localized(project.next, es.nextSteps),
    gallery: [
      {
        src: `/projects/${project.slug}/hero.svg`,
        alt: localized(`${project.shortName} project proof visual`, `${es.title} visual de evidencia`),
        caption: localized(
          "Placeholder proof visual until real project screenshots are added.",
          "Visual temporal de evidencia hasta agregar capturas reales del proyecto.",
        ),
      },
    ],
    resumeBullet: localized(`${project.shortName}: ${project.oneLiner}`, es.resumeBullet),
  };
}

export const caseStudies: ProjectCaseStudy[] = legacyProjects.map(toCaseStudy);

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getLocalizedValue<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}
'@
Write-Utf8NoBom "src/data/case-studies.ts" $caseStudies

Write-Step "Writing clean case-study route with real proof panel and no console chrome"

$projectPage = @'
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { caseStudies, getCaseStudy, getLocalizedValue } from "@/data/case-studies";
import { isLocale, locales, type Locale } from "@/data/i18n";

const navLabels = {
  en: {
    work: "Work",
    stack: "Stack",
    resume: "Resume",
    contact: "Contact",
  },
  es: {
    work: "Proyectos",
    stack: "Stack",
    resume: "CV",
    contact: "Contacto",
  },
} as const;

const labels = {
  en: {
    back: "Back to portfolio",
    requestWalkthrough: "Request walkthrough",
    role: "Role",
    featured: "Featured",
    problemEyebrow: "Problem",
    problemTitle: "What this project solves",
    solutionEyebrow: "Solution",
    solutionTitle: "How I approached it",
    architectureEyebrow: "Architecture",
    architectureTitle: "How the system is structured",
    decisionsEyebrow: "Decisions",
    decisionsTitle: "Tradeoffs and outcomes",
    resultsEyebrow: "Results",
    resultsTitle: "Evidence and impact",
    nextEyebrow: "Next iteration",
    nextTitle: "What I would improve next",
    snapshot: "Proof panel",
    impact: "Impact",
    proof: "Proof",
    stack: "Stack",
  },
  es: {
    back: "Volver al portafolio",
    requestWalkthrough: "Pedir walkthrough",
    role: "Rol",
    featured: "Destacado",
    problemEyebrow: "Problema",
    problemTitle: "Que resuelve este proyecto",
    solutionEyebrow: "Solucion",
    solutionTitle: "Como lo aborde",
    architectureEyebrow: "Arquitectura",
    architectureTitle: "Como esta estructurado el sistema",
    decisionsEyebrow: "Decisiones",
    decisionsTitle: "Tradeoffs y resultados",
    resultsEyebrow: "Resultados",
    resultsTitle: "Evidencia e impacto",
    nextEyebrow: "Siguiente iteracion",
    nextTitle: "Que mejoraria despues",
    snapshot: "Panel de evidencia",
    impact: "Impacto",
    proof: "Evidencia",
    stack: "Stack",
  },
} as const;

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

function CaseBlock({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="project-detail-block">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const project = getCaseStudy(slug);

  if (!project) {
    return {};
  }

  const title = getLocalizedValue(project.title, locale);
  const description = getLocalizedValue(project.summary, locale);

  return {
    title: `${title} | JP Samano`,
    description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        es: `/es/projects/${project.slug}`,
      },
    },
  };
}

export default async function LocaleProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const t = labels[locale];
  const nav = navLabels[locale];
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  const title = getLocalizedValue(project.title, locale);
  const summary = getLocalizedValue(project.summary, locale);
  const tagline = getLocalizedValue(project.tagline, locale);
  const role = getLocalizedValue(project.role, locale);
  const challenge = getLocalizedValue(project.challenge, locale);
  const approach = getLocalizedValue(project.approach, locale);
  const architecture = getLocalizedValue(project.architecture, locale);
  const results = getLocalizedValue(project.results, locale);
  const nextSteps = getLocalizedValue(project.nextSteps, locale);
  const visualAlt = getLocalizedValue(project.gallery[0]?.alt ?? project.title, locale);

  const navItems = [
    { href: `/${locale}#work`, label: nav.work },
    { href: `/${locale}#stack`, label: nav.stack },
    { href: `/${locale}#resume`, label: nav.resume },
    { href: `/${locale}#contact`, label: nav.contact },
  ];

  return (
    <SiteShell locale={locale} navItems={navItems} projectSlug={project.slug}>
      <div className="animated-background" aria-hidden="true">
        <div className="bg-orb bg-orb-one" />
        <div className="bg-orb bg-orb-two" />
      </div>

      <section className="shell project-hero-detail">
        <Link href={`/${locale}`} className="button button-soft project-back-link">
          {t.back}
        </Link>

        <div className="project-hero-grid">
          <div>
            <div className="project-badges">
              <Badge>{getLocalizedValue(project.statusLabel, locale)}</Badge>
              <Badge>{project.year}</Badge>
              {project.featured ? <Badge>{t.featured}</Badge> : null}
            </div>
            <h1>{title}</h1>
            <p>{summary}</p>
            <p className="project-one-liner">{tagline}</p>

            <div className="hero-actions">
              {project.links.length > 0 ? (
                project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={link.kind === "live" ? "button button-primary" : "button button-soft"}
                  >
                    {getLocalizedValue(link.label, locale)}
                  </a>
                ))
              ) : (
                <Link href={`/${locale}#contact`} className="button button-primary">
                  {t.requestWalkthrough}
                </Link>
              )}
            </div>
          </div>

          <aside className="project-proof-panel" aria-label={t.snapshot}>
            <div className="project-proof-media">
              <Image
                src={project.heroImage}
                alt={visualAlt}
                width={1200}
                height={720}
                priority
                unoptimized
              />
            </div>

            <div className="project-proof-facts">
              <p className="eyebrow">{t.snapshot}</p>

              <h3>{t.role}</h3>
              <p>{role}</p>

              <h3>{t.impact}</h3>
              <p>{results[0] ?? summary}</p>

              <h3>{t.stack}</h3>
              <div className="stack-row">
                {project.tech.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="shell project-detail-layout">
        <div className="project-detail-main">
          <CaseBlock eyebrow={t.problemEyebrow} title={t.problemTitle}>
            <p>{challenge}</p>
          </CaseBlock>

          <CaseBlock eyebrow={t.solutionEyebrow} title={t.solutionTitle}>
            <p>{approach}</p>
          </CaseBlock>

          <CaseBlock eyebrow={t.architectureEyebrow} title={t.architectureTitle}>
            <ul>
              {architecture.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>

          <CaseBlock eyebrow={t.decisionsEyebrow} title={t.decisionsTitle}>
            <div className="principle-list">
              {project.decisions.map((decision, index) => (
                <article key={`${project.slug}-decision-${index}`}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{getLocalizedValue(decision.tradeoff, locale)}</h3>
                    <p>{getLocalizedValue(decision.outcome, locale)}</p>
                  </div>
                </article>
              ))}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow={t.resultsEyebrow} title={t.resultsTitle}>
            <ul>
              {results.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>

          <CaseBlock eyebrow={t.nextEyebrow} title={t.nextTitle}>
            <ul>
              {nextSteps.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseBlock>
        </div>

        <aside className="project-sidebar">
          <p className="eyebrow">{t.proof}</p>
          <h3>{title}</h3>
          <p>{tagline}</p>
          <ul>
            {results.slice(1).map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="stack-row">
            {project.tech.slice(0, 6).map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
'@
Write-Utf8NoBom "src/app/[locale]/projects/[slug]/page.tsx" $projectPage

Write-Step "Writing clean legacy project redirect"

$legacyRedirect = @'
import { redirect } from "next/navigation";
import { caseStudies } from "@/data/case-studies";

type LegacyProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export default async function LegacyProjectRedirect({ params }: LegacyProjectPageProps) {
  const { slug } = await params;
  redirect(`/en/projects/${slug}`);
}
'@
Write-Utf8NoBom "src/app/projects/[slug]/page.tsx" $legacyRedirect

Write-Step "Patching home client for locale sync and cleaner copy"

$homePath = "src/components/home/SignalAtlasHomeClient.tsx"
if (Test-Path $homePath) {
  $homeContent = Read-Utf8NoBom $homePath

  if (!$homeContent.Contains("DocumentLocaleSync")) {
    $homeContent = $homeContent.Replace(
      'import { Header } from "@/components/layout/Header";',
      'import { Header } from "@/components/layout/Header";' + [Environment]::NewLine + 'import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";'
    )
  }

  $homeContent = $homeContent.Replace(
    'Each card shows the project route, role, stack, proof signals, and next case-study action. Generated visuals are temporary placeholders until real screenshots are captured.',
    'Each card highlights the project route, role, stack, and proof signals that lead into the case study.'
  )

  $homeContent = $homeContent.Replace(
    'Las tarjetas ahora usan visuales generados, alturas estables, m\\u00e9tricas, stack y llamadas a la acci\\u00f3n m\\u00e1s claras. Despu\\u00e9s podemos reemplazar los visuales con capturas reales sin romper el layout.',
    'Cada tarjeta resume la ruta del proyecto, el rol, el stack y las senales de evidencia que llevan al caso de estudio.'
  )

  $homeContent = $homeContent.Replace(
    'contactCopy: profile.availability,',
    'contactCopy: "Abierto a internships, roles junior de ingenieria de producto y colaboraciones tecnicas practicas.",'
  )

  if (!$homeContent.Contains("<DocumentLocaleSync locale={language} />")) {
    $homeContent = $homeContent.Replace(
      '<main id="main-content" className="portfolio-page">',
      '<main id="main-content" className="portfolio-page">' + [Environment]::NewLine + '      <DocumentLocaleSync locale={language} />'
    )
  }

  Write-Utf8NoBom $homePath $homeContent
}

Write-Step "Creating polished placeholder visuals for every project"

function New-ProjectSvg([string]$Title, [string]$Subtitle, [string]$Accent) {
  $safeTitle = [System.Security.SecurityElement]::Escape($Title)
  $safeSubtitle = [System.Security.SecurityElement]::Escape($Subtitle)

  return @"
<svg viewBox="0 0 1200 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="$safeTitle proof visual">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08111A"/>
      <stop offset="55%" stop-color="#102033"/>
      <stop offset="100%" stop-color="#0F1925"/>
    </linearGradient>
    <radialGradient id="glowA" cx="22%" cy="20%" r="65%">
      <stop offset="0%" stop-color="$Accent" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="$Accent" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="82%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#2FD3A3" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#2FD3A3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="720" fill="url(#bg)"/>
  <rect width="1200" height="720" fill="url(#glowA)"/>
  <rect width="1200" height="720" fill="url(#glowB)"/>
  <g opacity="0.18" stroke="#F3F7FB" stroke-width="2" fill="none">
    <path d="M105 175 C265 75 430 230 610 168 S905 105 1092 246"/>
    <path d="M118 530 C298 394 448 462 624 385 S904 345 1082 468"/>
    <path d="M248 260 C418 354 584 270 760 354 S958 480 1042 326"/>
  </g>
  <g font-family="Inter, Arial, sans-serif">
    <rect x="78" y="70" width="1044" height="580" rx="46" fill="rgba(243,247,251,0.08)" stroke="rgba(243,247,251,0.18)"/>
    <rect x="130" y="132" width="344" height="420" rx="28" fill="#0A1020" stroke="rgba(243,247,251,0.18)"/>
    <rect x="516" y="132" width="554" height="420" rx="28" fill="rgba(243,247,251,0.86)"/>
    <text x="166" y="218" font-size="58" font-weight="900" fill="#F3F7FB" letter-spacing="-3">$safeTitle</text>
    <text x="166" y="265" font-size="22" font-weight="700" fill="#B3C0D0">$safeSubtitle</text>
    <path d="M166 466 C248 342 342 410 414 265" fill="none" stroke="$Accent" stroke-width="8" stroke-linecap="round"/>
    <circle cx="166" cy="466" r="12" fill="#F4C15D"/>
    <circle cx="414" cy="265" r="12" fill="#F4C15D"/>
    <text x="582" y="208" font-size="30" font-weight="900" fill="#122033">routes + nodes</text>
    <text x="582" y="323" font-size="24" font-weight="900" fill="#122033">proof</text>
    <text x="807" y="323" font-size="24" font-weight="900" fill="#122033">decisions</text>
    <path d="M592 452 C652 330 762 390 862 254" fill="none" stroke="#78AFFF" stroke-width="6" stroke-linecap="round"/>
    <path d="M846 455 C900 350 1010 395 1040 278" fill="none" stroke="$Accent" stroke-width="6" stroke-linecap="round"/>
    <circle cx="862" cy="254" r="10" fill="#F4C15D"/>
    <circle cx="1040" cy="278" r="10" fill="#F4C15D"/>
  </g>
</svg>
"@
}

$visuals = @(
  @{ Slug = "savr"; Title = "SAVR"; Subtitle = "context-aware dining system"; Accent = "#2FD3A3" },
  @{ Slug = "er-triage-queue-manager"; Title = "ER Triage"; Subtitle = "queue and patient-state workflow"; Accent = "#78AFFF" },
  @{ Slug = "family-phrase-game"; Title = "Phrase Game"; Subtitle = "deployed family web app"; Accent = "#F4C15D" },
  @{ Slug = "adaptive-traffic-ai"; Title = "Traffic AI"; Subtitle = "city-scale reasoning concept"; Accent = "#E76A4C" },
  @{ Slug = "cyber-reporting-assistant"; Title = "Cyber Assistant"; Subtitle = "safety reporting workflow"; Accent = "#A78BFA" }
)

foreach ($visual in $visuals) {
  $dir = "public/projects/$($visual.Slug)"
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }

  $svg = New-ProjectSvg $visual.Title $visual.Subtitle $visual.Accent
  Write-Utf8NoBom "$dir/hero.svg" $svg
  Write-Utf8NoBom "$dir/preview.svg" $svg
}

Write-Step "Adding final CSS repair overrides"

$cssPath = "src/app/globals.css"
$cssContent = Read-Utf8NoBom $cssPath

$cssRepair = @'

/* === Signal Atlas v4 localization + proof repair === */

.project-detail-console,
.terminal-card,
.mockup-lines,
.console-topline {
  display: none !important;
}

.project-hero-detail {
  padding: 5.75rem 0 3.5rem;
}

.project-back-link {
  width: fit-content;
  margin-bottom: 2rem;
}

.project-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.98fr) minmax(360px, 0.78fr);
  align-items: start;
  gap: 1.5rem;
}

.project-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.project-hero-grid h1 {
  max-width: 12ch;
  margin: 1.2rem 0 1rem;
  color: var(--paper-0);
  font-size: clamp(3rem, 7vw, 6.25rem);
  line-height: 0.9;
  letter-spacing: -0.075em;
}

.project-hero-grid > div > p {
  max-width: 48rem;
  color: var(--text-1);
  font-size: 1.04rem;
  line-height: 1.75;
}

.project-proof-panel {
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: var(--radius-2xl);
  background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  color: var(--text-0);
  box-shadow: var(--shadow-xl);
}

.project-proof-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-1);
}

.project-proof-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-proof-facts {
  display: grid;
  gap: 0.8rem;
  padding: 1.15rem;
}

.project-proof-facts h3 {
  margin: 0.35rem 0 0;
  color: white;
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-proof-facts p {
  margin: 0;
  color: var(--text-1);
  line-height: 1.6;
}

.project-proof-facts .stack-row {
  padding: 0;
}

.project-proof-facts .stack-row span {
  border-color: rgba(255,255,255,0.13);
  color: var(--text-1);
}

.project-detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20rem;
  gap: 1rem;
  align-items: start;
  padding: 2rem 0 6rem;
}

.project-detail-main {
  display: grid;
  gap: 1rem;
}

.project-detail-block {
  width: auto;
  margin: 0;
  background: rgba(255,255,255,0.90);
}

.project-detail-block h2 {
  color: var(--text-dark);
  font-size: clamp(2rem, 4vw, 3.65rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.project-detail-block p,
.project-detail-block li {
  color: #536174;
  line-height: 1.75;
}

.project-sidebar {
  position: sticky;
  top: 7rem;
  border: 1px solid rgba(18,32,51,0.10);
  border-radius: var(--radius-xl);
  background: rgba(255,255,255,0.86);
  color: var(--text-dark);
  box-shadow: var(--shadow-soft);
  padding: 1.15rem;
}

.project-sidebar h3 {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: -0.035em;
}

.project-sidebar p,
.project-sidebar li {
  color: #536174;
  line-height: 1.65;
}

.project-sidebar ul {
  margin: 1rem 0;
  padding-left: 1.1rem;
}

.project-sidebar .stack-row {
  padding: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

@media (max-width: 980px) {
  .project-hero-grid,
  .project-detail-layout {
    grid-template-columns: 1fr;
  }

  .project-sidebar {
    position: static;
  }

  .project-hero-grid h1 {
    max-width: 100%;
  }
}

@media (max-width: 720px) {
  .project-hero-detail {
    padding-top: 3.5rem;
  }

  .project-hero-grid h1 {
    font-size: clamp(2.65rem, 14vw, 4.4rem);
  }

  .project-detail-block h2 {
    font-size: clamp(2rem, 11vw, 3rem);
  }
}
'@

if (!$cssContent.Contains("Signal Atlas v4 localization + proof repair")) {
  $cssContent = $cssContent.TrimEnd() + [Environment]::NewLine + $cssRepair
  Write-Utf8NoBom $cssPath $cssContent
}

Write-Step "Final BOM cleanup"

Get-ChildItem -Path "src" -Recurse -File |
  Where-Object { $_.Extension -in ".ts", ".tsx", ".css", ".md", ".json" } |
  ForEach-Object { Remove-Bom $_.FullName }

Write-Step "Running verification gates"

npm run lint
npx tsc --noEmit
npm run build

Write-Host ""
Write-Host "SUCCESS: Signal Atlas v4 localization/proof repair completed." -ForegroundColor Green
Write-Host ""
Write-Host "Manual checks:" -ForegroundColor Cyan
Write-Host "  npm run dev"
Write-Host "  http://localhost:3000/es#work"
Write-Host "  http://localhost:3000/es/projects/savr"
Write-Host "  http://localhost:3000/en/projects/savr"
Write-Host "  http://localhost:3000/projects/savr"
Write-Host ""
Write-Host "Expected:" -ForegroundColor Cyan
Write-Host "  - No mojibake like QuÃ©, CÃ³mo, SoluciÃ³n, or DecisiÃ³n"
Write-Host "  - Spanish project cards use Spanish title/summary/tagline/metrics"
Write-Host "  - Project pages use proof panels, not console panels"
Write-Host "  - Placeholder SVG visuals load for every project"
Write-Host "  - Build passes before commit/push"
