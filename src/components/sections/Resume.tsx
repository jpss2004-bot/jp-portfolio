import { siteConfig } from "@/data/site";
import ButtonLink from "@/components/ui/ButtonLink";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Resume() {
  return (
    <section id="resume" className="container-shell py-16 sm:py-24">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <SectionHeader
          eyebrow="Resume"
          title="The website shows the work. The resume gives the fast scan."
          description="Use the resume as the quick overview, then use the project case studies to inspect the deeper technical evidence."
        />

        <div className="panel rounded-[2rem] p-6">
          <p className="text-sm leading-7 text-zinc-400">
            Place the final resume PDF at <span className="font-mono text-emerald-300">public/resume.pdf</span>. The button below is already wired to that path.
          </p>
          <div className="mt-6">
            <ButtonLink href={siteConfig.links.resume} variant="primary">
              Download resume
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
