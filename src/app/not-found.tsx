import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen flex-col items-start justify-center">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--green)]">404</p>
      <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] text-white">Route not found.</h1>
      <p className="mt-5 max-w-xl text-zinc-400">
        The page you are looking for does not exist in this Signal Atlas portfolio.
      </p>
      <Link href="/" className="os-button os-button-primary mt-8">Return home</Link>
    </main>
  );
}
