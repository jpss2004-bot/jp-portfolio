import Link from "next/link";
import type { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import ProjectInterfaceMock from "@/components/ui/ProjectInterfaceMock";

type ProjectBentoCardProps = {
  project: Project;
  large?: boolean;
};

export default function ProjectBentoCard({ project, large = false }: ProjectBentoCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`panel group noise relative flex min-h-[360px] flex-col overflow-hidden rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/28 hover:bg-white/[0.075] ${large ? "lg:col-span-2 lg:min-h-[460px]" : ""}`}
    >
      <div className="absolute right-0 top-0 h-44 w-44 translate-x-16 -translate-y-16 rounded-full bg-emerald-300/10 blur-3xl transition group-hover:bg-emerald-300/18" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">{project.category}</Badge>
          <Badge>{project.status}</Badge>
        </div>
        <span className="text-xs text-zinc-500">{project.year}</span>
      </div>

      <div className={`relative z-10 mt-6 grid flex-1 gap-6 ${large ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-center" : ""}`}>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{project.shortTitle}</h3>
          <p className="mt-4 text-sm leading-7 text-zinc-400">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, large ? 6 : 4).map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-zinc-300">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className={large ? "block" : "mt-auto"}>
          <ProjectInterfaceMock project={project} />
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
        <span className="text-zinc-500">Role: {project.role.split(",")[0]}</span>
        <span className="font-semibold text-emerald-300 transition group-hover:text-white">Open case study →</span>
      </div>
    </Link>
  );
}
