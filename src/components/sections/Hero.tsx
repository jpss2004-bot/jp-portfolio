import { siteConfig } from "@/data/site";
import Badge from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import CommandBar from "@/components/ui/CommandBar";
import MetricCard from "@/components/ui/MetricCard";
import SystemNode from "@/components/ui/SystemNode";

export default function Hero() {
  return (
    <section className="container-shell pb-16 pt-16 sm:pb-24 sm:pt-24">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Badge tone="accent">{siteConfig.hero.eyebrow}</Badge>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.07em] text-gradient sm:text-7xl lg:text-8xl">
            {siteConfig.hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            {siteConfig.hero.supporting}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projects" variant="primary">View project systems</ButtonLink>
            <ButtonLink href={siteConfig.links.linkedin} external>Connect on LinkedIn</ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <MetricCard value="5" label="Portfolio projects" />
            <MetricCard value="3" label="Primary stacks" />
            <MetricCard value="100%" label="Build verified" />
          </div>

          <div className="mt-8">
            <CommandBar />
          </div>
        </div>

        <SystemNode />
      </div>
    </section>
  );
}
