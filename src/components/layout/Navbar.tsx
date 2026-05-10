import MobileMenu from "@/components/layout/MobileMenu";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl">
      <div className="container-shell flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-sm font-bold text-emerald-200 shadow-[0_0_24px_rgba(53,242,180,0.12)]">
            JP
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">JP Samano</p>
            <p className="text-xs text-zinc-500">Systems portfolio</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-emerald-300/35 hover:text-white md:inline-flex"
        >
          GitHub -&gt;
        </a>

        <MobileMenu />
      </div>
    </header>
  );
}
