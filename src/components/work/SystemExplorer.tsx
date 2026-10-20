"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import type { L } from "@/data/content";
import type { SystemStep } from "@/data/work";
import styles from "./Work.module.css";

const pick = <T,>(value: L<T>, locale: Locale): T => value[locale];

export function SystemExplorer({ steps, locale, name, headingLevel = "h4" }: { steps: SystemStep[]; locale: Locale; name: string; headingLevel?: "h3" | "h4" }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const step = steps[active];
  const Heading = headingLevel;
  return (
    <div className={styles.system} role="group" aria-label={`${name}: ${locale === "es" ? "arquitectura" : "architecture"}`}>
      <ol className={styles.systemNodes} style={{ "--trace-progress": active / (steps.length - 1) } as CSSProperties} aria-label={locale === "es" ? "Explorar la arquitectura" : "Explore the architecture"}>
        {steps.map((item, i) => (
          <li key={item.technology}>
            <button type="button" aria-pressed={active === i} aria-controls={id} onClick={() => setActive(i)}>
              <span className={styles.nodeDot} aria-hidden="true">{active === i ? "●" : "○"}</span>
              <strong>{pick(item.name, locale)}</strong>
              <small>{item.technology}</small>
            </button>
          </li>
        ))}
      </ol>
      <div id={id} className={styles.systemDetail} aria-live="polite" aria-atomic="true">
        <span className={styles.stepNumber} aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
        <div key={active} className={styles.detailText}>
          <Heading>{pick(step.name, locale)} <span>{step.technology}</span></Heading>
          <p>{pick(step.detail, locale)}</p>
        </div>
      </div>
      <p className={styles.diagramLabel}>{locale === "es" ? "Diagrama de arquitectura. Selecciona una etapa para conocer la decisión." : "Architecture diagram. Select a stage to explore the decision."}</p>
      <noscript><ol>{steps.map((item) => <li key={item.technology}>{pick(item.name, locale)}: {pick(item.detail, locale)}</li>)}</ol></noscript>
    </div>
  );
}

export function ProductDisplay({ children, steps, locale, name }: { children: ReactNode; steps: SystemStep[]; locale: Locale; name: string }) {
  const [view, setView] = useState<"product" | "system">("product");
  const id = useId();
  return (
    <div className={styles.display}>
      <div className={styles.displayBar}>
        <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.displayName}>{name}</span>
        <div className={styles.viewButtons} role="group" aria-label={locale === "es" ? "Vista del proyecto" : "Project view"}>
          <button type="button" aria-pressed={view === "product"} aria-controls={id + "product"} onClick={() => setView("product")}>{locale === "es" ? "Producto" : "Product"}</button>
          <button type="button" aria-pressed={view === "system"} aria-controls={id + "system"} onClick={() => setView("system")}>{locale === "es" ? "Arquitectura" : "Architecture"}</button>
        </div>
      </div>
      <div id={id + "product"} hidden={view !== "product"} className={styles.productSurface}>{children}</div>
      <div id={id + "system"} hidden={view !== "system"}><SystemExplorer steps={steps} locale={locale} name={name} /></div>
    </div>
  );
}
