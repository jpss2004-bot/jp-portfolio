"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import type { Architecture } from "@/data/architecture";
import { TechnologyIcon } from "./ProjectMark";
import type { SystemMap } from "@/data/systems";
import { SystemPreview } from "./system/SystemMap";
import styles from "./Work.module.css";

const desktop = [[110,120],[360,120],[360,360],[710,120],[890,360],[590,360],[110,360],[890,120]];
const mobile = [[160,95],[500,95],[500,270],[840,270],[840,445],[160,445],[160,270],[840,95]];

function connection(a: number[], b: number[], compact: boolean) {
  let [x1,y1] = a, [x2,y2] = b;
  if (Math.abs(x2-x1) > Math.abs(y2-y1)) {
    const sign = Math.sign(x2-x1); x1 += sign*(compact ? 142 : 84); x2 -= sign*(compact ? 142 : 84);
    const center = (x1+x2)/2;
    return `M${x1},${y1} C${center},${y1} ${center},${y2} ${x2},${y2}`;
  }
  const sign = Math.sign(y2-y1); y1 += sign*45; y2 -= sign*45;
  const center = (y1+y2)/2;
  return `M${x1},${y1} C${x1},${center} ${x2},${center} ${x2},${y2}`;
}

function Wires({ architecture, active, locale, compact = false }: { architecture: Architecture; active: number; locale: Locale; compact?: boolean }) {
  const positions = compact ? mobile : desktop;
  const arrow = useId();
  return <svg className={compact ? styles.wiresMobile : styles.wiresDesktop} viewBox={`0 0 1000 ${compact ? 540 : 500}`} preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="var(--project-accent)" /></marker></defs>{architecture.edges.map((edge,i) => {
    const from = architecture.nodes.findIndex(n=>n.id===edge.from), to = architecture.nodes.findIndex(n=>n.id===edge.to);
    const path = connection(positions[from],positions[to],compact);
    const selected = from === active || to === active;
    return <g key={`${edge.from}-${edge.to}`} className={selected ? styles.wireSelected : undefined}><path className={edge.secondary ? styles.wireSecondary : styles.wire} d={path} vectorEffect="non-scaling-stroke" markerEnd={`url(#${arrow})`} /><path className={styles.packet} d={path} vectorEffect="non-scaling-stroke" style={{animationDelay:`${-i*.73}s`,animationDuration:`${5+i*.31}s`}} />{selected ? <text className={styles.wireLabel} x={(positions[from][0]+positions[to][0])/2} y={(positions[from][1]+positions[to][1])/2-12} textAnchor="middle">{edge.label[locale]}</text> : null}</g>;
  })}</svg>;
}

export function SystemExplorer({ architecture, locale, name, headingLevel = "h4" }: { architecture: Architecture; locale: Locale; name: string; headingLevel?: "h3" | "h4" }) {
  const [active, setActive] = useState(1);
  const id = useId();
  const node = architecture.nodes[active];
  const Heading = headingLevel;
  const es = locale === "es";
  const technology = (value: Architecture["nodes"][number]["technology"]) => typeof value === "string" ? value : value[locale];
  return <div className={styles.system} role="group" aria-label={`${name}: ${es ? "arquitectura" : "architecture"}`}>
    <div className={styles.networkCanvas} data-motion-scene>
      <div className={styles.networkPlane} aria-hidden="true" />
      <Wires architecture={architecture} active={active} locale={locale} />
      <Wires architecture={architecture} active={active} locale={locale} compact />
      <ul className={styles.networkNodes} aria-label={es ? "Componentes del sistema" : "System components"}>{architecture.nodes.map((item,i)=><li key={item.id}>
        <button type="button" className={`${styles.networkNode} ${styles[item.tone]}`} aria-pressed={active===i} aria-controls={id} onClick={()=>setActive(i)} style={{"--x":`${desktop[i][0]/10}%`,"--y":`${desktop[i][1]/5}%`,"--mx":`${mobile[i][0]/10}%`,"--my":`${mobile[i][1]/5.4}%`} as CSSProperties}>
          <TechnologyIcon name={item.icon} /><strong>{item.name[locale]}</strong><small>{technology(item.technology)}</small>
        </button>
      </li>)}</ul>
    </div>
    <ul className={styles.networkLegend} aria-label={es ? "Tipos de componente" : "Component types"}>{[["interface",es?"Interfaz":"Interface"],["service",es?"Servicios":"Services"],["data",es?"Datos y evidencia":"Data and evidence"],["human",es?"Revisión humana":"Human review"]].filter(([tone])=>architecture.nodes.some(n=>n.tone===tone)).map(([tone,label])=><li key={tone} className={styles[tone]}><i aria-hidden="true" />{label}</li>)}</ul>
    <div id={id} className={styles.networkDetail} aria-live="polite" aria-atomic="true"><div key={active} className={styles.detailText}><Heading>{node.name[locale]} <span>{technology(node.technology)}</span></Heading><p>{node.detail[locale]}</p></div></div>
    <nav className={styles.connections} aria-label={es ? "Conexiones del componente seleccionado" : "Selected component connections"}>
      {architecture.edges.filter(edge => edge.from === node.id || edge.to === node.id).map(edge => {
        const outgoing = edge.from === node.id;
        const target = architecture.nodes.findIndex(item => item.id === (outgoing ? edge.to : edge.from));
        return <button key={`${edge.from}-${edge.to}`} type="button" aria-controls={id} onClick={() => setActive(target)}><span>{edge.label[locale]}</span><strong>{outgoing ? (es ? "Hacia: " : "To: ") : (es ? "Desde: " : "From: ")}{architecture.nodes[target].name[locale]}</strong></button>;
      })}
    </nav>
    <p className={styles.diagramLabel}>{es ? "Arquitectura lógica ilustrada. Selecciona un componente; las rutas animadas representan conexiones, no tráfico en vivo." : "Illustrated logical architecture. Select a component; animated paths show connections, not live traffic."}</p>
  </div>;
}

export function ProductDisplay({ children, architecture, locale, name, brand, initialView = "product", productLabel, system }: { children: ReactNode; architecture: Architecture; locale: Locale; name: string; brand: ReactNode; initialView?: "product" | "system"; productLabel?: string; system?: { map: SystemMap; href: string } }) {
  const [view, setView] = useState<"product" | "system">(initialView);
  const id = useId();
  return <div className={styles.display}>
    <div className={styles.displayBar}>
      <span className={styles.displayBrand}>{brand}</span><span className={styles.displayName}>{name}</span>
      <div className={styles.viewButtons} role="group" aria-label={locale === "es" ? "Vista del proyecto" : "Project view"}>
        <button type="button" aria-pressed={view === "product"} aria-controls={id + "product"} onClick={() => setView("product")}>{productLabel ?? (locale === "es" ? "Producto" : "Product")}</button>
        <button type="button" aria-pressed={view === "system"} aria-controls={id + "system"} onClick={() => setView("system")}>{locale === "es" ? "Arquitectura" : "Architecture"}</button>
      </div>
    </div>
    <div id={id + "product"} hidden={view !== "product"} className={styles.productSurface}>{children}</div>
    <div id={id + "system"} hidden={view !== "system"}>{system ? <div className={styles.systemPreview}><SystemPreview map={system.map} locale={locale} href={system.href} /></div> : <SystemExplorer architecture={architecture} locale={locale} name={name} />}</div>
  </div>;
}
