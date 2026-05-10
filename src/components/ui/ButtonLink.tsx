import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function ButtonLink({
  href,
  children,
  variant = "secondary",
}: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-emerald-400 text-black hover:translate-y-[-1px] hover:opacity-95"
      : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5";

  const className = `inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`;

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
