import type { Project } from "@/data/projects";

export default function ProjectInterfaceMock({ project }: { project: Project }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{project.shortTitle}</span>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.07] p-4">
          <p className="text-xs text-emerald-200">Problem signal</p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white">{project.problem}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
              <p className="text-sm font-semibold text-white">{metric.value}</p>
              <p className="mt-1 text-[10px] text-zinc-500">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {project.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
