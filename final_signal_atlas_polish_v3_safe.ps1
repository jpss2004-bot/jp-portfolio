# final_signal_atlas_polish_v3_safe.ps1
# JP Samano Portfolio - Signal Atlas Final Polish Safe Repair Patch
# Purpose:
#   Finish the audit-guided polish patch after v1/v2 failed.
#   This version avoids PowerShell reserved variables and avoids the -replace operator entirely.
# Run from:
#   C:\Users\JP Samano\OneDrive - Acadia University\Desktop\CodingProjects\jp-portfolio\jp-portfolio-site

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Get-FullPathSafe([string]$Path) {
  return [System.IO.Path]::GetFullPath((Join-Path (Get-Location).Path $Path))
}

function Read-Utf8NoBom([string]$Path) {
  $full = Get-FullPathSafe $Path
  if (!(Test-Path -LiteralPath $full)) {
    throw "Required file not found: $Path"
  }
  return [System.IO.File]::ReadAllText($full, [System.Text.UTF8Encoding]::new($false))
}

function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $full = Get-FullPathSafe $Path
  $dir = Split-Path $full -Parent
  if (!(Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  [System.IO.File]::WriteAllText($full, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Backup-File([string]$Path, [string]$BackupRoot) {
  $source = Get-FullPathSafe $Path
  if (Test-Path -LiteralPath $source) {
    $target = Get-FullPathSafe (Join-Path $BackupRoot $Path)
    $targetDir = Split-Path $target -Parent
    if (!(Test-Path -LiteralPath $targetDir)) {
      New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
    }
    Copy-Item -LiteralPath $source -Destination $target -Force
  }
}

function Remove-BomFromFile([string]$FullPath) {
  if (!(Test-Path -LiteralPath $FullPath)) { return }

  $bytes = [System.IO.File]::ReadAllBytes($FullPath)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $newBytes = New-Object byte[] ($bytes.Length - 3)
    [Array]::Copy($bytes, 3, $newBytes, 0, $newBytes.Length)
    [System.IO.File]::WriteAllBytes($FullPath, $newBytes)
    Write-Host "Removed BOM: $FullPath" -ForegroundColor Yellow
  }
}

function Run-Checked([string]$Label, [scriptblock]$Command) {
  Write-Step $Label
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Label failed with exit code $LASTEXITCODE"
  }
}

function Assert-ProjectRoot {
  if (!(Test-Path -LiteralPath "package.json") -or !(Test-Path -LiteralPath "src/app")) {
    throw "Run this script from the jp-portfolio-site project root. package.json and src/app were not found."
  }
}

Assert-ProjectRoot

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = "_portfolio_backups/final-signal-atlas-polish-v3-safe-$timestamp"

Write-Step "Creating backup at $backupRoot"

$filesToBackup = @(
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/projects/[slug]/page.tsx",
  "src/app/projects/[slug]/page.tsx",
  "src/components/home/SignalAtlasHomeClient.tsx",
  "src/components/layout/Header.tsx",
  "src/components/layout/LocaleSwitch.tsx",
  "src/components/layout/MobileSheetNav.tsx",
  "src/components/layout/DesktopFloatingDock.tsx",
  "src/components/layout/DocumentLocaleSync.tsx",
  "src/components/layout/SiteShell.tsx",
  "src/data/case-studies.ts",
  "src/data/i18n.ts",
  "src/data/portfolio.ts",
  "src/app/globals.css",
  ".gitignore",
  "README.md"
)

foreach ($file in $filesToBackup) {
  Backup-File $file $backupRoot
}

Write-Step "Removing UTF-8 BOM from source/docs files"

$extensions = @(".ts", ".tsx", ".css", ".md", ".mjs", ".json")
Get-ChildItem -LiteralPath "." -Recurse -File |
  Where-Object {
    $extensions -contains $_.Extension -and
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.FullName -notmatch "\\.git\\" -and
    $_.FullName -notmatch "\\_portfolio_backups\\"
  } |
  ForEach-Object { Remove-BomFromFile $_.FullName }

Write-Step "Writing locale document sync component"

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

Write-Step "Writing shared SiteShell component"

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

Write-Step "Writing localized Header"

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
    resume: "Resume",
    github: "GitHub",
    nav: "Main navigation",
  },
  es: {
    home: "Inicio de JP Samano",
    resume: "CV",
    github: "GitHub",
    nav: "Navegación principal",
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

Write-Step "Repairing homepage imports/copy safely"

$homePath = "src/components/home/SignalAtlasHomeClient.tsx"
$homeContent = Read-Utf8NoBom $homePath

if ($homeContent -notlike '*DocumentLocaleSync*') {
  $homeContent = $homeContent.Replace(
    'import { Header } from "@/components/layout/Header";',
    'import { Header } from "@/components/layout/Header";' + "`r`n" + 'import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";'
  )
}

$homeContent = $homeContent.Replace(
  '      "Each card shows the project route, role, stack, proof signals, and next case-study action. Generated visuals are temporary placeholders until real screenshots are captured.",',
  '      "Each card highlights the project route, role, stack, and proof signals that lead into the case study.",'
)

$homeContent = $homeContent.Replace(
  '      "Las tarjetas ahora usan visuales generados, alturas estables, m\\u00e9tricas, stack y llamadas a la acci\\u00f3n m\\u00e1s claras. Despu\\u00e9s podemos reemplazar los visuales con capturas reales sin romper el layout.",',
  '      "Cada tarjeta resume la ruta del proyecto, el rol, el stack y las señales de evidencia que llevan al caso de estudio.",'
)

$homeContent = $homeContent.Replace(
  '    contactCopy: profile.availability,' + "`r`n" + '    emailMe: "Escribir a JP",',
  '    contactCopy: "Abierto a internships, roles junior de ingeniería de producto y colaboraciones técnicas prácticas.",' + "`r`n" + '    emailMe: "Escribir a JP",'
)

if ($homeContent -notlike '*<DocumentLocaleSync locale={language} />*') {
  $homeContent = $homeContent.Replace(
    '    <main id="main-content" className="portfolio-page">' + "`r`n",
    '    <main id="main-content" className="portfolio-page">' + "`r`n" + '      <DocumentLocaleSync locale={language} />' + "`r`n"
  )
}

Write-Utf8NoBom $homePath $homeContent

Write-Step "Repairing profile links and resume path"

$portfolioPath = "src/data/portfolio.ts"
$portfolioContent = Read-Utf8NoBom $portfolioPath
$portfolioContent = $portfolioContent.Replace('github: "https://github.com/jpsamanosuarez"', 'github: "https://github.com/jpss2004-bot"')
$portfolioContent = $portfolioContent.Replace('resume: "/resume.pdf"', 'resume: "/resume/jp-samano-resume-en.pdf"')
Write-Utf8NoBom $portfolioPath $portfolioContent

Write-Step "Repairing case-study data paths and Spanish mojibake"

$casePath = "src/data/case-studies.ts"
$caseContent = Read-Utf8NoBom $casePath
$caseContent = $caseContent.Replace('DecisiÃ³n', 'Decisión')
$caseContent = $caseContent.Replace('/hero.png', '/hero.svg')
$caseContent = $caseContent.Replace('Replace this placeholder path with a real project screenshot during Phase 4 or Phase 5.', 'Project visual fallback until real screenshots are added.')
Write-Utf8NoBom $casePath $caseContent

Write-Step "Writing localized case-study route with shared shell and proof panel"

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
    problemTitle: "Qué resuelve este proyecto",
    solutionEyebrow: "Solución",
    solutionTitle: "Cómo lo abordé",
    architectureEyebrow: "Arquitectura",
    architectureTitle: "Cómo está estructurado el sistema",
    decisionsEyebrow: "Decisiones",
    decisionsTitle: "Tradeoffs y resultados",
    resultsEyebrow: "Resultados",
    resultsTitle: "Evidencia e impacto",
    nextEyebrow: "Siguiente iteración",
    nextTitle: "Qué mejoraría después",
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
        <Link href={`/${locale}`} className="button button-soft">
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
              {project.decisions.map((decision) => {
                const decisionTitle = getLocalizedValue(decision.title, locale);
                return (
                  <article key={decisionTitle}>
                    <span>{decisionTitle.replace("Decision ", "").replace("Decisión ", "")}</span>
                    <div>
                      <h3>{getLocalizedValue(decision.tradeoff, locale)}</h3>
                      <p>{getLocalizedValue(decision.outcome, locale)}</p>
                    </div>
                  </article>
                );
              })}
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

Write-Step "Rewriting legacy /projects/[slug] redirect cleanly"

$legacyPage = @'
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
Write-Utf8NoBom "src/app/projects/[slug]/page.tsx" $legacyPage

Write-Step "Ensuring fallback project SVG media exists"

function New-ProjectSvg([string]$Title, [string]$Kind) {
  $safeTitle = [System.Security.SecurityElement]::Escape($Title)
  return @"
<svg viewBox="0 0 1200 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="$safeTitle $Kind visual">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08111A"/>
      <stop offset="55%" stop-color="#102033"/>
      <stop offset="100%" stop-color="#0F1925"/>
    </linearGradient>
    <radialGradient id="glowA" cx="28%" cy="22%" r="60%">
      <stop offset="0%" stop-color="#78AFFF" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#78AFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="80%" cy="20%" r="52%">
      <stop offset="0%" stop-color="#2FD3A3" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#2FD3A3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="720" fill="url(#bg)"/>
  <rect width="1200" height="720" fill="url(#glowA)"/>
  <rect width="1200" height="720" fill="url(#glowB)"/>
  <g opacity="0.18" stroke="#F3F7FB" stroke-width="2" fill="none">
    <path d="M120 160 C320 80 470 250 650 190 S930 110 1080 230"/>
    <path d="M150 520 C320 410 460 470 630 390 S900 360 1040 470"/>
    <path d="M260 260 C410 350 590 270 760 350 S950 470 1030 330"/>
  </g>
  <g font-family="Inter, Arial, sans-serif">
    <rect x="92" y="82" width="1016" height="556" rx="44" fill="rgba(243,247,251,0.08)" stroke="rgba(243,247,251,0.18)"/>
    <circle cx="930" cy="248" r="94" fill="#F3F7FB" opacity="0.13"/>
    <circle cx="930" cy="248" r="58" fill="#F3F7FB"/>
    <text x="930" y="265" text-anchor="middle" font-size="38" font-weight="900" fill="#122033">JP</text>
    <text x="150" y="190" font-size="22" font-weight="800" fill="#78AFFF" letter-spacing="4">SIGNAL ATLAS / $Kind</text>
    <text x="150" y="285" font-size="74" font-weight="900" fill="#F3F7FB" letter-spacing="-4">$safeTitle</text>
    <text x="150" y="350" font-size="28" font-weight="600" fill="#B3C0D0">routes + nodes / proof + decisions</text>
  </g>
</svg>
"@
}

$projectTitles = @{
  "savr" = "SAVR"
  "er-triage-queue-manager" = "ER Triage"
  "family-phrase-game" = "Family Phrase"
  "adaptive-traffic-ai" = "Traffic AI"
  "cyber-reporting-assistant" = "Cyber Reporting"
}

foreach ($slug in $projectTitles.Keys) {
  $dir = Get-FullPathSafe "public/projects/$slug"
  if (!(Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }

  $heroPath = Join-Path $dir "hero.svg"
  $previewPath = Join-Path $dir "preview.svg"

  if (!(Test-Path -LiteralPath $heroPath)) {
    [System.IO.File]::WriteAllText($heroPath, (New-ProjectSvg $projectTitles[$slug] "case study"), [System.Text.UTF8Encoding]::new($false))
  }

  if (!(Test-Path -LiteralPath $previewPath)) {
    [System.IO.File]::WriteAllText($previewPath, (New-ProjectSvg $projectTitles[$slug] "preview"), [System.Text.UTF8Encoding]::new($false))
  }
}

Write-Step "Appending final CSS overrides"

$cssPath = "src/app/globals.css"
$cssContent = Read-Utf8NoBom $cssPath

$finalCss = @'

/* === Signal Atlas final polish patch v3 === */

.site-header {
  padding: 0.75rem 0;
  backdrop-filter: blur(12px);
}

.header-inner {
  background: rgba(8, 17, 26, 0.64);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
}

.hero {
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
  gap: 2rem;
  min-height: min(92vh, 860px);
  padding: 5.5rem 0 4.5rem;
}

.hero-copy h1 {
  max-width: 10ch;
  margin-top: 0.5rem;
  font-size: clamp(3rem, 6.4vw, 5.4rem);
  line-height: 0.94;
  letter-spacing: -0.065em;
}

.project-summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.section-heading-row .section-title h2 {
  color: var(--paper-0);
}

.project-hero-detail {
  padding: 6.25rem 0 3.5rem;
}

.project-hero-detail > .button {
  width: fit-content;
  margin-bottom: 2rem;
}

.project-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.78fr);
  align-items: start;
  gap: 1.5rem;
}

.project-hero-grid h1 {
  max-width: 11ch;
  margin: 1.2rem 0 1rem;
  color: var(--paper-0);
  font-size: clamp(3rem, 7vw, 6.4rem);
  line-height: 0.9;
  letter-spacing: -0.075em;
}

.project-hero-grid > div > p {
  max-width: 46rem;
  color: var(--text-1);
  font-size: 1.04rem;
  line-height: 1.75;
}

.project-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
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
  background: rgba(255,255,255,0.88);
}

.project-detail-block h2 {
  color: var(--text-dark);
}

.project-sidebar {
  position: sticky;
  top: 7rem;
  border: 1px solid rgba(18,32,51,0.10);
  border-radius: var(--radius-xl);
  background: rgba(255,255,255,0.84);
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
  .hero {
    min-height: auto;
    padding-top: 3rem;
  }

  .hero-copy h1 {
    max-width: 100%;
    font-size: clamp(2.7rem, 14vw, 4.2rem);
  }

  .project-hero-detail {
    padding-top: 3.75rem;
  }

  .project-hero-grid h1 {
    font-size: clamp(2.65rem, 14vw, 4.5rem);
  }
}
'@

if ($cssContent -notlike "*Signal Atlas final polish patch v3*") {
  $cssContent = $cssContent.TrimEnd() + "`r`n" + $finalCss
}

Write-Utf8NoBom $cssPath $cssContent

Write-Step "Updating .gitignore hygiene rules"

$gitignorePath = ".gitignore"
if (Test-Path -LiteralPath $gitignorePath) {
  $gitignoreContent = Read-Utf8NoBom $gitignorePath
} else {
  $gitignoreContent = ""
}

$ignoreBlock = @'

# Portfolio patch/audit artifacts
_portfolio_backups/
_portfolio_audits/
repair-log.txt
*.tmp
*.bak
'@

if ($gitignoreContent -notlike "*_portfolio_backups/*") {
  Write-Utf8NoBom $gitignorePath ($gitignoreContent.TrimEnd() + "`r`n" + $ignoreBlock)
}

Write-Step "Final BOM cleanup after patch writes"

Get-ChildItem -LiteralPath "." -Recurse -File |
  Where-Object {
    $extensions -contains $_.Extension -and
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.FullName -notmatch "\\.git\\" -and
    $_.FullName -notmatch "\\_portfolio_backups\\"
  } |
  ForEach-Object { Remove-BomFromFile $_.FullName }

Run-Checked "Running ESLint" { npm run lint }
Run-Checked "Running TypeScript check" { npx tsc --noEmit }
Run-Checked "Running production build" { npm run build }

Write-Host ""
Write-Host "SUCCESS: Signal Atlas final polish v3 completed." -ForegroundColor Green
Write-Host ""
Write-Host "Next manual checks:" -ForegroundColor Cyan
Write-Host "  npm run dev"
Write-Host "  http://localhost:3000/en"
Write-Host "  http://localhost:3000/es"
Write-Host "  http://localhost:3000/en/projects/savr"
Write-Host "  http://localhost:3000/es/projects/savr"
Write-Host "  http://localhost:3000/projects/savr"
Write-Host "  http://localhost:3000/sitemap.xml"
Write-Host ""
Write-Host "Expected:" -ForegroundColor Cyan
Write-Host "  - Spanish text renders correctly"
Write-Host "  - Case-study pages use the shared header and proof panel"
Write-Host "  - Old /projects/savr redirects to /en/projects/savr"
Write-Host "  - Resume and GitHub CTAs work"
Write-Host "  - Build passes before commit/push"
