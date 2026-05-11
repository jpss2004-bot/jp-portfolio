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
