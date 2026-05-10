import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  return (
    <section id="about" className="container-shell py-16 sm:py-24">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeader
          eyebrow="About JP"
          title="A CS student with product instincts and systems taste."
          description="My strongest work sits where technical architecture, user experience, and practical problem-solving meet."
        />

        <div className="panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-5 text-sm leading-8 text-zinc-300 sm:text-base">
            <p>
              I am a Computer Science student focused on building software that feels practical, understandable, and polished. My projects usually start from a real workflow problem: choosing where to eat, managing an emergency queue, coordinating city traffic, or making a family game feel personal.
            </p>
            <p>
              I care about the full path from idea to implementation: data modeling, backend routes, frontend structure, user flows, deployment, and how the project is explained afterward. This portfolio is designed to show that complete process.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {["Software systems", "AI products", "Workflow tools"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm font-semibold text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
