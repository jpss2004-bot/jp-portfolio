"use client";

import { useId, useState } from "react";
import type { Locale } from "@/data/i18n";
import styles from "./Journal.module.css";

const announcement = "https://everwindfuels.com/2026/10/everwind-announces-10-billion-investment-in-point-tupper-data-centre-campus-and-renewable-energy-portfolio-across-nova-scotia/";
export function CapacityFigure({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const [phase, setPhase] = useState<"initial" | "full">("full");
  const es = locale === "es";
  const id = useId();
  return <figure className={`${styles.capacity} ${compact ? styles.compact : ""}`} aria-labelledby={id}>
    <figcaption id={id}>{es ? "Capacidad propuesta del campus" : "Proposed campus capacity"}</figcaption>
    <div className={styles.capacityValue} aria-live="polite"><strong>{phase === "full" ? "420" : "95"}</strong><span>MW</span></div>
    <div className={styles.capacityBar} aria-hidden="true"><span className={styles.initialBar} /><span className={styles.expansionBar} data-active={phase === "full"} /></div>
    <div className={styles.phaseLabels}><span>95 MW<br />{es ? "Fase inicial" : "Initial phase"}</span><span>+325 MW<br />{es ? "Ampliación" : "Expansion"}</span></div>
    <div className={styles.phaseControls} aria-label={es ? "Comparar fases propuestas" : "Compare proposed phases"}>
      <button type="button" aria-pressed={phase === "initial"} onClick={() => setPhase("initial")}>{es ? "Finales de 2027" : "Late 2027"}</button>
      <button type="button" aria-pressed={phase === "full"} onClick={() => setPhase("full")}>{es ? "Objetivo 2028" : "2028 target"}</button>
    </div>
    <p className={styles.figureNote}>{es ? "Objetivos de la empresa, sujetos a condiciones comerciales, técnicas y regulatorias. MW expresa potencia, no consumo anual de energía." : "Company targets, subject to commercial, technical and regulatory conditions. MW is power, not annual energy use."} <a href={announcement}>{es ? "Fuente" : "Source"}</a></p>
  </figure>;
}

export function CoolingFigure({ locale }: { locale: Locale }) {
  const id = useId();
  const es = locale === "es";
  return <figure className={styles.cooling} aria-labelledby={id}>
    <figcaption id={id}>{es ? "Cómo se elimina el calor" : "How the proposed cooling system removes heat"}</figcaption>
    <div className={styles.coolingFlow}>
      <div><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="5" width="30" height="38" rx="3"/><path d="M15 14h18M15 24h18M15 34h18"/></svg><strong>{es ? "Calor de servidores" : "Server heat"}</strong></div>
      <span className={styles.loopLabel}>{es ? "Circuito sellado de agua y glicol" : "Sealed water-glycol loop"}<svg viewBox="0 0 160 52" aria-hidden="true"><path d="M0 15h150l-8-6m8 6-8 6M160 37H10l8-6m-8 6 8 6"/></svg></span>
      <div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 39V9h30v30ZM16 10v28M24 10v28M32 10v28"/></svg><strong>{es ? "Rechazo de calor" : "Heat rejection"}</strong></div>
      <span className={styles.heatArrow} aria-hidden="true">→</span>
      <div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 17h25c12 0 12-12 4-12M5 25h36M5 33h25c12 0 12 10 4 10"/></svg><strong>{es ? "Calor al aire" : "Heat to air"}</strong><span>{es ? "Asistencia con agua durante calor intenso" : "Water assistance in hot weather"}</span></div>
    </div>
    <p className={styles.figureNote}>{es ? "Esquema conceptual, no un plano de ingeniería. El circuito sellado no elimina el agua usada para el enfriamiento durante calor intenso." : "Conceptual explanation, not an engineering drawing. The sealed loop does not eliminate water used for hot-weather cooling."} <a href="#source-3">[3]</a></p>
  </figure>;
}
