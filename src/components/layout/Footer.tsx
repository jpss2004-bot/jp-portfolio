import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-zinc-200">{siteConfig.name}</p>
          <p className="mt-1 text-zinc-400">
            Built with precision, curiosity, and a memorable signature.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex items-center gap-5">
            <a href={siteConfig.links.github} className="hover:text-white">GitHub</a>
            <a href={siteConfig.links.linkedin} className="hover:text-white">LinkedIn</a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">Email</a>
          </div>
          <p className="text-xs text-zinc-500">© {year} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
