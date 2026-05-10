import { siteConfig } from "@/data/site";
import ButtonLink from "@/components/ui/ButtonLink";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  return (
    <section id="contact" className="container-shell py-16 pb-28 sm:py-24 sm:pb-32">
      <div className="panel-strong rounded-[2rem] p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s build something useful."
            description="I’m open to internships, collaborations, and conversations about software systems, product ideas, and real-world workflow tools."
          />

          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-zinc-500">Primary contact</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-lg font-semibold text-white hover:text-emerald-300">
              {siteConfig.email}
            </a>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href={siteConfig.links.github} external>
                GitHub
              </ButtonLink>
              <ButtonLink href={siteConfig.links.linkedin} external>
                LinkedIn
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
