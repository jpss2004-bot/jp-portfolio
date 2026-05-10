import { stackGroups } from "@/data/experience";

export default function StackMap() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {stackGroups.map((group, index) => (
        <div key={group.title} className="panel relative overflow-hidden rounded-[1.75rem] p-5">
          <div className="absolute right-4 top-4 text-5xl font-bold text-white/[0.035]">0{index + 1}</div>
          <p className="text-sm font-semibold text-white">{group.title}</p>
          <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{group.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {group.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-zinc-300">
                {tool}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
