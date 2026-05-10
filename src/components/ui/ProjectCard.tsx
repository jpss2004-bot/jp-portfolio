import Link from "next/link";
import type { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export default function ProjectCard({
  project,
  compact = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
    >
      <article className="panel grid-glow h-full rounded-[1.75rem] p-6 hover:-translate-y-1">
        <div className="flex items-start justify-between gap-4">
          <Badge tone="accent">{project.category}</Badge>
          <Badge>{project.status}</Badge>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-4 text-sm leading-7 text-zinc-300">{project.summary}</p>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Role</p>
          <p className="mt-2 text-sm text-zinc-200">{project.role}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>

        {!compact ? (
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Impact</p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{project.outcome}</p>
          </div>
        ) : null}

        <div className="mt-8 text-sm font-medium text-emerald-300">
          View project details
        </div>
      </article>
    </Link>
  );
}
