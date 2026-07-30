import type { Locale } from "@/data/i18n";
import { getCopy } from "@/data/site-copy";

/**
 * Stand-in for projects that are documented systems-design work with no built
 * interface. It is deliberately typographic and labelled "Concept" so it can
 * never be mistaken for a product screenshot — the previous placeholders were
 * gradient-and-glow panels that implied a real UI existed.
 *
 * Rendered in the page's own type and tokens, so there is no image to ship and
 * nothing to keep in sync when the design changes.
 */
export function ConceptPlate({
  title,
  nodes,
  locale,
}: {
  title: string;
  nodes: string[];
  locale: Locale;
}) {
  const t = getCopy(locale);

  return (
    <div className="concept-plate" role="img" aria-label={`${title} — ${t.conceptNote}`}>
      <div className="concept-plate-head">
        <p className="concept-plate-title">{title}</p>
        <span className="label label-accent">{locale === "es" ? "Concepto" : "Concept"}</span>
      </div>
      <div>
        <div className="concept-plate-nodes" aria-hidden="true">
          {nodes.map((node) => (
            <span key={node}>{node}</span>
          ))}
        </div>
        <p className="concept-note">{t.conceptNote}</p>
      </div>
    </div>
  );
}
