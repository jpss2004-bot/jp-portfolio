import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "border-emerald-300/40 bg-emerald-300 text-slate-950 shadow-[0_0_32px_rgba(53,242,180,0.24)] hover:bg-white",
  secondary:
    "border-white/15 bg-white/[0.075] text-white hover:border-white/30 hover:bg-white/[0.11]",
  ghost:
    "border-transparent bg-transparent text-zinc-300 hover:text-white",
};

export default function ButtonLink({
  href,
  children,
  variant = "secondary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
