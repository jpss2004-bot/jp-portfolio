type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  copy,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy mt-4 max-w-2xl">{copy}</p> : null}
    </div>
  );
}
