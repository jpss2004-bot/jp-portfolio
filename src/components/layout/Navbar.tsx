import MobileMenu from "@/components/layout/MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0b0f14]/72 backdrop-blur-xl">
      <div className="container-shell relative flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-sm font-semibold text-emerald-300">
            JP
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">JP Samano</p>
            <p className="text-xs text-zinc-400">Creative Software Portfolio</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#skills" className="hover:text-white">Skills</a>
          <a href="#experience" className="hover:text-white">Highlights</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>

        <div className="hidden md:block">
          <a
            href="#resume"
            className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 hover:border-emerald-300/50 hover:bg-emerald-400/15 hover:text-white"
          >
            Resume
          </a>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
