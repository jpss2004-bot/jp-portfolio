import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import ButtonLink from "@/components/ui/ButtonLink";

export default function Resume() {
  return (
    <section id="resume" className="container-shell py-20 sm:py-24">
      <div className="panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeader
          eyebrow="Resume"
          title="A concise view of my background"
          copy="Download my resume for a fuller overview of academic experience, technical projects, and the tools I work with."
        />

        <div className="flex flex-wrap gap-4">
          <ButtonLink href={siteConfig.links.resume} variant="primary">
            Download Resume
          </ButtonLink>
          <ButtonLink href={siteConfig.links.linkedin}>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={siteConfig.links.github}>
            GitHub
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Focus</p>
            <p className="mt-2 text-sm leading-7 text-zinc-200">Software engineering and backend-oriented systems.</p>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Strength</p>
            <p className="mt-2 text-sm leading-7 text-zinc-200">Structured projects with strong presentation and memorable product thinking.</p>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Resume file</p>
            <p className="mt-2 text-sm leading-7 text-zinc-200">Place your final PDF at public/resume.pdf to activate the download link.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
