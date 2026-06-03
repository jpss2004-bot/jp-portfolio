import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <section className="shell notfound-inner">
        <div className="notfound-orb" aria-hidden="true">
          <div className="notfound-orb-ring" />
          <span>JP</span>
        </div>
        <p className="notfound-code">404 / signal lost</p>
        <h1 className="notfound-title">This route isn&apos;t on the atlas.</h1>
        <p className="notfound-copy">
          The page you are looking for drifted off the Signal Atlas. Let&apos;s route you
          back to a known node.
        </p>
        <div className="notfound-actions">
          <Link href="/" className="button button-primary">Return to the atlas</Link>
          <Link href="/en#work" className="button button-soft">View selected work</Link>
        </div>
      </section>
    </main>
  );
}
