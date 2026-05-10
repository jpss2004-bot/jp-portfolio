import { siteConfig } from "@/data/site";
import ButtonLink from "@/components/ui/ButtonLink";
import Badge from "@/components/ui/Badge";
import MouseEyesMascot from "@/components/ui/MouseEyesMascot";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-shell py-24 sm:py-28 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
              {siteConfig.hero.eyebrow}
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              {siteConfig.hero.headline}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              {siteConfig.hero.supporting}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="#projects" variant="primary">
                Explore Projects
              </ButtonLink>
              <ButtonLink href="#resume">
                Resume
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {siteConfig.hero.highlights.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                Brand direction
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
                Technical systems, thoughtful design, and a memorable signature. This
                portfolio is meant to feel structured enough for employers and unique
                enough to actually be remembered.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <MouseEyesMascot />
          </div>
        </div>
      </div>
    </section>
  );
}
