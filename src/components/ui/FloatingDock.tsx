import { siteConfig } from "@/data/site";

export default function FloatingDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 hidden justify-center md:flex">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-slate-950/72 p-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        {siteConfig.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
