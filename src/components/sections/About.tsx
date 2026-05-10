import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  return (
    <section id="about" className="container-shell py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="About"
            title="A builder who cares about systems, clarity, and user experience."
          />
        </div>

        <div className="space-y-6">
          <p className="section-copy">
            I’m a Computer Science student at Acadia University with a strong interest
            in software engineering, backend systems, AI-driven tools, and thoughtful
            digital experiences.
          </p>
          <p className="section-copy">
            My work often combines technical structure, product thinking, and clear
            presentation — whether I’m designing recommendation systems, healthcare
            workflow tools, or data-driven concepts with real-world impact.
          </p>

          <div className="panel rounded-[1.5rem] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                  Location
                </p>
                <p className="mt-2 text-sm text-zinc-200">{siteConfig.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                  Status
                </p>
                <p className="mt-2 text-sm text-zinc-200">{siteConfig.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
