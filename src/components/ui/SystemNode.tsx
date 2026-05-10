export default function SystemNode() {
  return (
    <div className="panel-strong noise relative min-h-[420px] overflow-hidden rounded-[2.25rem] p-6">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">System node</p>
          <h3 className="mt-2 text-xl font-semibold text-white">JP Command Core</h3>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
          Online
        </div>
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
          <div className="absolute inset-5 rounded-full border border-dashed border-emerald-300/25" style={{ animation: "orbit 18s linear infinite" }} />
          <div className="absolute inset-12 rounded-full border border-sky-300/20" style={{ animation: "orbit 11s linear infinite reverse" }} />
          <div className="absolute h-4 w-4 translate-x-24 rounded-full bg-emerald-300 shadow-[0_0_25px_rgba(53,242,180,0.9)]" />
          <div className="absolute h-3 w-3 -translate-x-20 translate-y-16 rounded-full bg-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.8)]" />
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/15 bg-slate-950/80 shadow-2xl" style={{ animation: "pulseGlow 4s ease-in-out infinite" }}>
            <span className="text-4xl font-bold tracking-[-0.08em] text-gradient">JP</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Focus", "Full-stack"],
          ["Mode", "Builder"],
          ["Signal", "Case studies"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
