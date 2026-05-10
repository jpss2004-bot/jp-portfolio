import { siteConfig } from "@/data/site";

export default function CommandBar() {
  return (
    <div className="panel scan-line rounded-[1.75rem] p-3">
      <div className="relative z-10 flex flex-col gap-3 rounded-[1.35rem] border border-white/10 bg-black/25 p-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-zinc-300">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(53,242,180,0.75)]" />
          <span className="text-zinc-500">/scan</span>
          <span className="font-medium text-white">{siteConfig.hero.command}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {siteConfig.hero.highlights.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs text-zinc-300">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
