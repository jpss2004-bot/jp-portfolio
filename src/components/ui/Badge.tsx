type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
};

export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  const styles =
    tone === "accent"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : "border-white/10 bg-white/[0.03] text-zinc-300";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
}
