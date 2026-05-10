type MetricCardProps = {
  value: string;
  label: string;
};

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <p className="text-2xl font-semibold tracking-[-0.03em] text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
    </div>
  );
}
