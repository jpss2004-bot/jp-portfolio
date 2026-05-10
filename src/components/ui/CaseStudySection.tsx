type CaseStudySectionProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export default function CaseStudySection({
  eyebrow,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="panel rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">{eyebrow}</p>
      <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-zinc-300">{children}</div>
    </section>
  );
}
