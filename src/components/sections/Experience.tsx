import { experienceItems } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Experience() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Trajectory"
          title="A builder profile shaped by projects, communication, and systems thinking."
          description="A few experiences that reflect technical direction, communication ability, and the range behind my software work."
        />

        <div className="grid gap-4">
          {experienceItems.map((item, index) => (
            <article key={item.title} className="panel relative overflow-hidden rounded-[1.75rem] p-5">
              <div className="absolute right-5 top-4 text-5xl font-bold text-white/[0.035]">
                0{index + 1}
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                {item.label}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
