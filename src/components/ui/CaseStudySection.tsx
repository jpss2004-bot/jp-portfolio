import type { ReactNode } from "react";

type CaseStudySectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export default function CaseStudySection({ eyebrow, title, children }: CaseStudySectionProps) {
  return (
    <section className="panel rounded-[1.75rem] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
      <div className="mt-5 text-sm leading-7 text-zinc-300">{children}</div>
    </section>
  );
}
