type BadgeProps = {
  children: React.ReactNode;
  tone?: "default" | "accent" | "blue" | "purple";
};

const tones = {
  default: "border-white/12 bg-white/[0.06] text-zinc-300",
  accent: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  blue: "border-sky-300/25 bg-sky-300/10 text-sky-200",
  purple: "border-purple-300/25 bg-purple-300/10 text-purple-200",
};

export default function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
