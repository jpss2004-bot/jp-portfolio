type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  copy?: string;
};

export default function SectionHeader({ eyebrow, title, description, copy }: SectionHeaderProps) {
  const body = description ?? copy ?? "";

  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{body}</p> : null}
    </div>
  );
}
