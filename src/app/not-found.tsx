import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#0b0f14] text-white">
      <section className="container-shell py-20">
        <div className="panel max-w-2xl rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">
            The page you tried to open does not exist yet, or the route may have changed
            while the portfolio is still being built out.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black hover:translate-y-[-1px] hover:opacity-95"
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
