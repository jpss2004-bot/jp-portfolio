import SectionHeader from "@/components/ui/SectionHeader";

const groups = {
  Languages: ["Python", "Java", "JavaScript", "C", "SQL"],
  Frameworks: ["React", "Next.js", "Tailwind CSS", "NiceGUI"],
  Backend: ["SQLite", "APIs", "Authentication", "Recommendation Logic"],
  Tools: ["Git", "GitHub", "Vercel", "Lucidchart", "Notion", "Canva"],
  Concepts: ["Backend Systems", "System Design", "AI Products", "UI/UX Thinking"],
};

export default function Skills() {
  return (
    <section id="skills" className="container-shell py-20 sm:py-24">
      <SectionHeader
        eyebrow="Skills"
        title="Technical stack"
        copy="Tools, languages, and areas of focus that shape how I approach software systems and product development."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(groups).map(([title, items]) => (
          <div key={title} className="panel rounded-[1.75rem] p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
