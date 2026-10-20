import { caseOrder, pick, profile, shipped, statusLabel, type Project } from "@/data/content";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/i18n";
import { siteUrl } from "@/lib/site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const ref = (id: string) => ({ "@id": id });
const projectId = (slug: string) => `${siteUrl}/#project-${slug}`;
const projectUrl = (slug: string, locale: Locale) => `${siteUrl}/${locale}/projects/${slug}`;

/** Shared identities keep the two translations connected without duplicating people. */
function identityGraph(locale: Locale) {
  return [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: [profile.plainName, profile.shortName, "JP Samano"],
      url: `${siteUrl}/${locale}`,
      image: `${siteUrl}${profile.portrait}`,
      description: ui[locale].identity,
      email: `mailto:${profile.email}`,
      jobTitle: locale === "es" ? "Desarrollador de software" : "Software Developer",
      worksFor: { "@type": "Organization", name: "LegalShelf" },
      affiliation: [
        { "@type": "CollegeOrUniversity", name: "Acadia University" },
        { "@type": "Organization", name: "Acadia AIoT Research Hub", url: "https://aarh.acadiau.ca/" },
      ],
      alumniOf: { "@type": "HighSchool", name: "Trinity College School" },
      knowsLanguage: ["en", "es"],
      sameAs: [profile.github, profile.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: profile.name,
      alternateName: profile.shortName,
      inLanguage: ["en", "es"],
      publisher: ref(personId),
    },
  ];
}

export function homeStructuredData(locale: Locale, metadata: { title: string; description: string }) {
  const url = `${siteUrl}/${locale}`;
  // This order follows the visible featured, supporting and other-work sections.
  const projects = caseOrder();
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(locale),
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: metadata.title,
        description: metadata.description,
        inLanguage: locale,
        isPartOf: ref(websiteId),
        mainEntity: ref(personId),
        author: ref(personId),
        mentions: projects.map((project) => ({
          "@type": "CreativeWork",
          "@id": projectId(project.slug),
          name: shipped.find((item) => item.slug === project.slug)?.name ?? pick(project.title, locale),
          description: pick(project.oneLiner, locale),
          url: projectUrl(project.slug, locale),
          contributor: ref(personId),
        })),
      },
    ],
  };
}

/** A case study describes engineering work, rather than an app-store offer or review. */
export function projectStructuredData(project: Project, locale: Locale) {
  const url = projectUrl(project.slug, locale);
  const pageId = `${url}#webpage`;
  const name = pick(project.title, locale);
  const description = pick(project.oneLiner, locale);
  const primary = project.visuals?.primary;
  const image = primary?.kind === "image" ? primary.src : project.media?.type === "image" ? project.media.src : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(locale),
      {
        "@type": "WebPage",
        "@id": pageId,
        url,
        name: `${name} · ${profile.shortName}`,
        description,
        inLanguage: locale,
        isPartOf: ref(websiteId),
        author: ref(personId),
        mainEntity: ref(projectId(project.slug)),
        about: ref(projectId(project.slug)),
        breadcrumb: ref(`${url}#breadcrumb`),
        ...(project.links.length ? { relatedLink: project.links.map((link) => link.href) } : {}),
      },
      {
        "@type": "CreativeWork",
        "@id": projectId(project.slug),
        name,
        description,
        url,
        mainEntityOfPage: ref(pageId),
        contributor: ref(personId),
        creditText: pick(project.role, locale),
        creativeWorkStatus: pick(statusLabel[project.status], locale),
        keywords: project.stack,
        ...(image ? { image: `${siteUrl}${image}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.shortName, item: `${siteUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };
}
