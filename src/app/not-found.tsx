import Link from "next/link";
import { getCopy } from "@/data/site-copy";

export default function NotFound() {
  const t = getCopy("en");

  return (
    <main className="wrap notfound">
      <p className="label label-accent">{t.notFoundLabel}</p>
      <h1 className="display" style={{ marginTop: "var(--stack-4)" }}>
        {t.notFoundHeading}
      </h1>
      <p className="lede" style={{ marginTop: "var(--stack-4)" }}>
        {t.notFoundBody}
      </p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href="/en">
          {t.notFoundHome}
        </Link>
        <Link className="link" href="/en#work">
          {t.notFoundWork}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
