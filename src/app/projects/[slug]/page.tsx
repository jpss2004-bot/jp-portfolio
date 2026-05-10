import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import CaseStudySection from "@/components/ui/CaseStudySection";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <section className="container-shell py-10 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:border-white/25 hover:bg-white/8"
        >
          ← Back to home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">{project.category}</Badge>
              <Badge>{project.status}</Badge>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              {project.summary}
            </p>
          </div>

          <aside className="panel rounded-[1.75rem] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
              Project Snapshot
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Role</p>
                <p className="mt-2 text-sm leading-7 text-zinc-200">{project.role}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <CaseStudySection eyebrow="Problem" title="What needed to be solved">
            <p>{project.problem}</p>
          </CaseStudySection>

          <div className="lg:col-span-2">
            <CaseStudySection eyebrow="Outcome" title="What this project is aiming to achieve">
              <p>{project.outcome}</p>
            </CaseStudySection>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CaseStudySection eyebrow="Implementation Notes" title="What to add next">
            <ul className="list-disc space-y-2 pl-5">
              <li>Architecture diagrams or system flow visuals</li>
              <li>Screenshots of the interface or workflow</li>
              <li>Technical decisions and tradeoffs</li>
              <li>Challenges, lessons learned, and next iteration goals</li>
            </ul>
          </CaseStudySection>

          <CaseStudySection eyebrow="Case Study Direction" title="How this page should evolve">
            <p>
              This route is now ready to become a full case study page. As you gather
              screenshots, diagrams, code snippets, and clearer outcomes, this can turn
              into a professional project narrative for recruiters and employers.
            </p>
          </CaseStudySection>
        </div>
      </section>
    </main>
  );
}
