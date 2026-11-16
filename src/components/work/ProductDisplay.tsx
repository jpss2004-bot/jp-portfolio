"use client";

import { useId, useState, type ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import type { SystemMap } from "@/data/systems";
import { SystemPreview } from "./system/SystemMap";
import styles from "./Work.module.css";

/** The case-page stage: the product, or a compact system preview that links to the full map. */
export function ProductDisplay({ children, locale, name, brand, initialView = "product", productLabel, system }: { children: ReactNode; locale: Locale; name: string; brand: ReactNode; initialView?: "product" | "system"; productLabel?: string; system?: { map: SystemMap; href: string } }) {
  const [view, setView] = useState<"product" | "system">(initialView);
  const id = useId();
  const es = locale === "es";
  return (
    <div className={styles.display}>
      <div className={styles.displayBar}>
        <span className={styles.displayBrand}>{brand}</span><span className={styles.displayName}>{name}</span>
        {system ? (
          <div className={styles.viewButtons} role="group" aria-label={es ? "Vista del proyecto" : "Project view"}>
            <button type="button" aria-pressed={view === "product"} aria-controls={id + "product"} onClick={() => setView("product")}>{productLabel ?? (es ? "Producto" : "Product")}</button>
            <button type="button" aria-pressed={view === "system"} aria-controls={id + "system"} onClick={() => setView("system")}>{es ? "Arquitectura" : "Architecture"}</button>
          </div>
        ) : null}
      </div>
      <div id={id + "product"} hidden={view !== "product"} className={styles.productSurface}>{children}</div>
      {system ? <div id={id + "system"} hidden={view !== "system"}><div className={styles.systemPreview}><SystemPreview map={system.map} locale={locale} href={system.href} /></div></div> : null}
    </div>
  );
}
