import { experience } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

export default function Experience() {
  return (
    <section id="experience" className="container-shell py-20 sm:py-24">
      <SectionHeader
        eyebrow="Highlights"
        title="Experience, presentation, and initiative"
        copy="A few experiences that reflect communication ability, discipline, and the range behind my technical work."
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="panel rounded-[1.75rem] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
            What stands out
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="accent">Communication</Badge>
            <Badge>Presentations</Badge>
            <Badge>Academic Projects</Badge>
            <Badge>Discipline</Badge>
            <Badge>Initiative</Badge>
          </div>
          <p className="mt-6 text-sm leading-7 text-zinc-300">
            This section is here to show that your portfolio is not only code. It also
            reflects how you present ideas, work through structured projects, and build
            credibility beyond a skill list.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {experience.map((item) => (
            <article key={item.title} className="panel rounded-[1.75rem] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-emerald-300">{item.subtitle}</p>
                </div>
                <Badge>{item.period}</Badge>
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
