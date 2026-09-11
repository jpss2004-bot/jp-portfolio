import Link from "next/link";
import { ui } from "@/data/ui";

export default function NotFound() {
  const t = ui.en;
  return (
    <main className="col notfound">
      <h1 className="h1">{t.notFound.heading}</h1>
      <p className="muted">{t.notFound.body}</p>
      <p><Link className="link" href="/en">{t.notFound.home}</Link></p>
    </main>
  );
}
