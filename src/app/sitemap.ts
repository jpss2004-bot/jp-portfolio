import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { locales } from "@/data/i18n";

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jp-portfolio-beta.vercel.app").replace(/\/$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified,
    })),
    ...locales.flatMap((locale) =>
      caseStudies.map((project) => ({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified,
      })),
    ),
  ];
}
