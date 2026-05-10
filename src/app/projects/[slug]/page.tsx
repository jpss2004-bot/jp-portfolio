import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import CaseStudySection from "@/components/ui/CaseStudySection";
import ProjectInterfaceMock from "@/components/ui/ProjectInterfaceMock";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      <section className="container-shell py-10 sm:py-14">
        <Link href="/" className="inline-flex rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm text-zinc-200 hover:border-white/25 hover:bg-white/[0.08]">
          Back to command center
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">{project.category}</Badge>
              <Badge>{project.status}</Badge>
              <Badge tone="blue">{project.year}</Badge>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-gradient sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.length > 0 ? (
                project.links.map((link) => (
                  <ButtonLink key={link.href} href={link.href} external variant={link.label.toLowerCase().includes("live") ? "primary" : "secondary"}>
                    {link.label} -&gt;
                  </ButtonLink>
                ))
              ) : (
                <ButtonLink href="/#contact" variant="secondary">Request walkthrough</ButtonLink>
              )}
            </div>
          </div>
          <ProjectInterfaceMock project={project} />
        </div>
      </section>

      <section className="container-shell grid gap-5 pb-24 lg:grid-cols-[1fr_20rem]">
        <div className="grid gap-5">
          <CaseStudySection eyebrow="Problem" title="What this project is solving">
            <p>{project.problem}</p>
          </CaseStudySection>

          <CaseStudySection eyebrow="Solution" title="How the system approaches it">
            <p>{project.solution}</p>
          </CaseStudySection>

          <CaseStudySection eyebrow="Architecture" title="How the project is structured">
            <ul className="grid gap-3">
              {project.architecture.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="Challenges" title="What made it technically interesting">
            <ul className="grid gap-3">
              {project.challenges.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="Next iteration" title="What will make this stronger">
            <ul className="grid gap-3">
              {project.nextSteps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">Project snapshot</p>
          <div className="mt-5 grid gap-4 text-sm">
            <div>
              <p className="text-zinc-500">Role</p>
              <p className="mt-1 text-zinc-200">{project.role}</p>
            </div>
            <div>
              <p className="text-zinc-500">Outcome</p>
              <p className="mt-1 text-zinc-200">{project.outcome}</p>
            </div>
            <div>
              <p className="text-zinc-500">Stack</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-zinc-500">Features</p>
              <ul className="mt-2 grid gap-2 text-zinc-300">
                {project.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
