"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import type { SystemLink, SystemMap, SystemPart } from "@/data/systems";
import { TechnologyIcon } from "../ProjectMark";
import s from "./System.module.css";

/*
 * A project's system, told three ways (Flow, Where it runs, Data). Wide
 * containers draw diagrams; narrow ones (phones, the case-page preview) turn
 * every view into a vertical list of numbered steps. Panels are server
 * rendered: without JavaScript all three stay visible.
 */

type Tab = "flow" | "where" | "data";
const copy = {
  en: { flow: "Flow", where: "Where it runs", data: "Data", ahead: "Built ahead of time", request: "Each request", review: "People", example: "Example", play: "Play the request", pause: "Pause", replay: "Play again", step: (i: number, n: number) => `Step ${i} of ${n}`, sends: "Sends", uses: "Uses", inputs: "Goes in", outputs: "Comes out", runs: "Runs in", numbers: "Numbers", crosses: "Crosses to", via: "via", by: "Made by", select: "Select a part to see what goes in, what comes out and its numbers.", map: "System map", parts: "Parts" },
  es: { flow: "Flujo", where: "Dónde corre", data: "Datos", ahead: "Preparado antes", request: "Cada solicitud", review: "Personas", example: "Ejemplo", play: "Reproducir la solicitud", pause: "Pausar", replay: "Reproducir de nuevo", step: (i: number, n: number) => `Paso ${i} de ${n}`, sends: "Envía", uses: "Usa", inputs: "Entra", outputs: "Sale", runs: "Corre en", numbers: "Cifras", crosses: "Pasa a", via: "por", by: "Lo produce", select: "Selecciona una parte para ver qué entra, qué sale y sus cifras.", map: "Mapa del sistema", parts: "Partes" },
};
/** Lane names start sentences in the lists; mid-sentence, a leading article or common word is lower-cased. */
const inSentence = (name: string) => name.replace(/^(The|Your|Team|Tu|La|El|Los|Las|Computadoras) /, (word) => word.toLowerCase());
const marker = (part: SystemPart, index: number) => (part.when === "ahead" ? String.fromCharCode(65 + index) : String(index + 1));

export function SystemMapView({ map, locale, name }: { map: SystemMap; locale: Locale; name: string }) {
  const t = copy[locale];
  const id = useId();
  const tech = (p: SystemPart) => (typeof p.technology === "string" ? p.technology : p.technology[locale]);
  const ahead = useMemo(() => map.parts.filter((p) => p.when === "ahead"), [map]);
  const request = useMemo(() => map.parts.filter((p) => p.when === "request"), [map]);
  const review = useMemo(() => map.parts.filter((p) => p.when === "review"), [map]);
  const lane = (laneId: string) => map.lanes.find((x) => x.id === laneId)!;
  const next = (p: SystemPart): SystemLink | undefined => {
    const seq = p.when === "ahead" ? ahead : request;
    const after = seq[seq.indexOf(p) + 1];
    return after ? map.links.find((k) => k.from === p.id && k.to === after.id) : map.links.find((k) => k.from === p.id && !k.uses && map.parts.find((q) => q.id === k.to)?.when !== p.when);
  };
  const uses = (p: SystemPart) => map.links.filter((k) => k.to === p.id && k.uses).map((k) => map.parts.find((q) => q.id === k.from)!);
  const label = (p: SystemPart) => {
    const seq = p.when === "ahead" ? ahead : p.when === "request" ? request : review;
    return p.when === "review" ? "" : marker(p, seq.indexOf(p));
  };

  const [tab, setTab] = useState<Tab>("flow");
  const [selected, setSelected] = useState(request[0]?.id ?? map.parts[0].id);
  const [playing, setPlaying] = useState(false);
  const part = map.parts.find((p) => p.id === selected)!;

  /* Play walks the request one step at a time; any choice by the visitor stops it. */
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      const i = request.findIndex((p) => p.id === selected);
      if (i < 0 || i >= request.length - 1) setPlaying(false);
      else setSelected(request[i + 1].id);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [playing, selected, request]);
  const choose = (partId: string) => { setPlaying(false); setSelected(partId); };
  const play = () => {
    const i = request.findIndex((p) => p.id === selected);
    if (i < 0 || i === request.length - 1) setSelected(request[0].id);
    setPlaying(true);
  };

  const tabs: Tab[] = ["flow", "where", "data"];
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const i = tabs.indexOf(tab);
    const to = event.key === "ArrowRight" ? tabs[(i + 1) % 3] : event.key === "ArrowLeft" ? tabs[(i + 2) % 3] : event.key === "Home" ? tabs[0] : event.key === "End" ? tabs[2] : null;
    if (!to) return;
    event.preventDefault();
    setTab(to);
    document.getElementById(`${id}-tab-${to}`)?.focus();
  };

  const card = (p: SystemPart, extra?: { compact?: boolean }) => (
    <button type="button" className={`${s.card} ${s[p.tone]}`} aria-pressed={selected === p.id} onClick={() => choose(p.id)} data-part={p.id} data-compact={extra?.compact || undefined}>
      {label(p) ? <b className={s.marker} aria-hidden="true">{label(p)}</b> : null}
      <TechnologyIcon name={p.icon} />
      <span className={s.cardName}>{p.name[locale]}</span>
      <span className={s.cardTech}>{tech(p)}</span>
      <span className={s.cardLane}>{lane(p.lane).name[locale]}</span>
    </button>
  );

  const detail = (p: SystemPart) => (
    <div className={s.detail}>
      <div className={s.detailHead}>
        <span className={`${s.dot} ${s[p.tone]}`} aria-hidden="true" />
        <p className={s.detailTitle}>{label(p) ? <b>{label(p)}</b> : null}{p.name[locale]} <span>{tech(p)}</span></p>
      </div>
      <p className={s.detailSummary}>{p.summary[locale]}</p>
      <dl className={s.io}>
        <div><dt>{t.runs}</dt><dd>{lane(p.lane).name[locale]} <span>· {lane(p.lane).host[locale]}</span></dd></div>
        <div><dt>{t.inputs}</dt><dd><ul>{p.inputs.map((x) => <li key={x.en}>{x[locale]}</li>)}</ul></dd></div>
        <div><dt>{t.outputs}</dt><dd><ul>{p.outputs.map((x) => <li key={x.en}>{x[locale]}</li>)}</ul></dd></div>
      </dl>
      {p.numbers?.length ? <dl className={s.numbers} aria-label={t.numbers}>{p.numbers.map((n) => <div key={n.label.en}><dd>{n.value}</dd><dt>{n.label[locale]}</dt></div>)}</dl> : null}
    </div>
  );

  const track = (parts: SystemPart[], title: string) => (
    <div className={s.trackBlock}>
      <h3 className={s.trackTitle}>{title}</h3>
      <ol className={s.track} style={{ "--n": Math.max(ahead.length, request.length, review.length) } as CSSProperties}>
        {parts.map((p) => {
          const link = next(p);
          const used = uses(p);
          return (
            <li key={p.id} data-selected={selected === p.id || undefined} data-last={!link || undefined}>
              {card(p)}
              {selected === p.id ? <div className={s.inline}>{detail(p)}</div> : null}
              {used.length ? <p className={s.uses}>{t.uses}: {used.map((u) => <button key={u.id} type="button" onClick={() => choose(u.id)}>{label(u)} · {u.name[locale]}</button>)}</p> : null}
              {link ? <p className={s.sends}><span>{t.sends}</span>{link.carries[locale]}{link.via ? <em> · {link.via[locale]}</em> : null}</p> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );

  const stepIndex = request.findIndex((p) => p.id === selected);

  return (
    <div className={s.system} role="group" aria-label={`${name}: ${t.map}`}>
      <div className={s.tabs} role="tablist" aria-label={t.map}>
        {tabs.map((x) => (
          <button key={x} id={`${id}-tab-${x}`} type="button" role="tab" aria-selected={tab === x} aria-controls={`${id}-panel-${x}`} tabIndex={tab === x ? 0 : -1} onClick={() => setTab(x)} onKeyDown={onTabKey}>{t[x]}</button>
        ))}
      </div>

      <div id={`${id}-panel-flow`} role="tabpanel" aria-labelledby={`${id}-tab-flow`} className={s.panel} data-active={tab === "flow" || undefined}>
        {map.example ? <p className={s.example}><span>{t.example}</span>“{map.example[locale]}”</p> : null}
        {ahead.length ? track(ahead, t.ahead) : null}
        {track(request, t.request)}
        {review.length ? track(review, t.review) : null}
        <div className={s.player}>
          <button type="button" onClick={() => (playing ? setPlaying(false) : play())} aria-pressed={playing}>
            <i aria-hidden="true">{playing ? "❚❚" : "▶"}</i>{playing ? t.pause : stepIndex === request.length - 1 ? t.replay : t.play}
          </button>
          {stepIndex >= 0 ? <span className={s.progress}>{t.step(stepIndex + 1, request.length)}<i style={{ "--p": (stepIndex + 1) / request.length } as CSSProperties} /></span> : null}
        </div>
        <div className={s.panelDetail} aria-live={playing ? "off" : "polite"}>{detail(part)}</div>
      </div>

      <div id={`${id}-panel-where`} role="tabpanel" aria-labelledby={`${id}-tab-where`} className={s.panel} data-active={tab === "where" || undefined}>
        <Swimlanes map={map} locale={locale} selected={selected} choose={choose} card={card} label={label} />
        <div className={s.panelDetail} aria-live="polite">{detail(part)}</div>
      </div>

      <div id={`${id}-panel-data`} role="tabpanel" aria-labelledby={`${id}-tab-data`} className={s.panel} data-active={tab === "data" || undefined}>
        {[{ title: t.ahead, stages: map.data.filter((d) => map.parts.find((p) => p.id === d.part)?.when === "ahead") }, { title: t.request, stages: map.data.filter((d) => map.parts.find((p) => p.id === d.part)?.when !== "ahead") }].filter((g) => g.stages.length).map((group) => (
          <div key={group.title} className={s.trackBlock}>
            <h3 className={s.trackTitle}>{group.title}</h3>
            <ol className={s.lineage} style={{ "--n": Math.max(...[map.data.filter((d) => map.parts.find((p) => p.id === d.part)?.when === "ahead").length, map.data.filter((d) => map.parts.find((p) => p.id === d.part)?.when !== "ahead").length]) } as CSSProperties}>
              {group.stages.map((d, i) => {
                const by = map.parts.find((p) => p.id === d.part)!;
                return (
                  <li key={d.id} data-last={i === group.stages.length - 1 || undefined} data-join={group.stages[i + 1]?.alongside ? "plus" : undefined}>
                    <div className={`${s.stage} ${s[by.tone]}`}>
                      <p className={s.stageCount}>{d.count ?? "—"}{d.unit ? <span>{d.unit[locale]}</span> : null}</p>
                      <p className={s.stageName}>{d.name[locale]}</p>
                      <p className={s.stageForm}>{d.form[locale]}</p>
                      <p className={s.stageDetail}>{d.detail[locale]}</p>
                      <p className={s.stageBy}>{t.by}: <button type="button" onClick={() => { choose(by.id); setTab("flow"); }}>{label(by) ? `${label(by)} · ` : ""}{by.name[locale]}</button></p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Rows are places, columns are the order things happen. Connectors are drawn from the measured cards. */
function Swimlanes({ map, locale, selected, choose, card, label }: { map: SystemMap; locale: Locale; selected: string; choose: (id: string) => void; card: (p: SystemPart, extra?: { compact?: boolean }) => ReactNode; label: (p: SystemPart) => string }) {
  const t = copy[locale];
  const ref = useRef<HTMLDivElement>(null);
  const arrow = useId();
  const order = useMemo(() => [...map.parts.filter((p) => p.when === "ahead"), ...map.parts.filter((p) => p.when === "request"), ...map.parts.filter((p) => p.when === "review")], [map]);
  /* Column = position in its own sequence. Work built ahead shares columns with the request when it lives in its own lanes. */
  const columns = useMemo(() => {
    const ahead = map.parts.filter((p) => p.when === "ahead"), request = map.parts.filter((p) => p.when === "request"), review = map.parts.filter((p) => p.when === "review");
    const shared = !ahead.some((a) => request.some((r) => r.lane === a.lane));
    const col: Record<string, number> = {};
    ahead.forEach((p, i) => (col[p.id] = p.col ?? i));
    const offset = shared ? 0 : ahead.length;
    request.forEach((p, i) => (col[p.id] = p.col ?? offset + i));
    review.forEach((p, i) => (col[p.id] = p.col ?? offset + request.length + i));
    return { col, count: Math.max(0, ...Object.values(col)) + 1 };
  }, [map]);
  const [paths, setPaths] = useState<{ key: string; d: string; uses?: boolean; on: boolean; lx: number; ly: number; text: string; end?: boolean }[]>([]);

  const measure = useCallback(() => {
    const root = ref.current;
    if (!root || !root.offsetWidth || getComputedStyle(root).display === "none") return;
    const box = root.getBoundingClientRect();
    const rect = (pid: string) => root.querySelector(`[data-part="${pid}"]`)?.getBoundingClientRect();
    const out: typeof paths = [];
    for (const k of map.links) {
      const a = rect(k.from), b = rect(k.to);
      if (!a || !b) continue;
      const crosses = map.parts.find((p) => p.id === k.from)!.lane !== map.parts.find((p) => p.id === k.to)!.lane;
      const text = crosses && k.via ? k.via[locale] : "";
      const on = selected === k.from || selected === k.to;
      if (b.left - a.right > 8) {
        /* Target to the right: run along the source row, turn in the gap just before the target, then along the target row. */
        const x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top;
        const mid = Math.max(x1 + 10, x2 - 16);
        const dir = Math.sign(y2 - y1), r = Math.min(8, Math.abs(y2 - y1) / 2);
        const d = Math.abs(y2 - y1) < 2 ? `M${x1},${y1} H${x2 - 2}` : `M${x1},${y1} H${mid - r} Q${mid},${y1} ${mid},${y1 + dir * r} V${y2 - dir * r} Q${mid},${y2} ${mid + r},${y2} H${x2 - 2}`;
        out.push({ key: `${k.from}-${k.to}`, d, uses: k.uses, on, lx: mid + 6, ly: (y1 + y2) / 2, text });
      } else {
        /* Same column: go straight up or down between the cards. */
        const up = b.top < a.top;
        const sx = a.left + a.width / 2 - box.left, sy = (up ? a.top : a.bottom) - box.top;
        const tx = b.left + b.width / 2 - box.left, ty = (up ? b.bottom : b.top) - box.top;
        const my = (sy + ty) / 2;
        const d = Math.abs(tx - sx) < 2 ? `M${sx},${sy} V${ty + (up ? 2 : -2)}` : `M${sx},${sy} V${my} H${tx} V${ty + (up ? 2 : -2)}`;
        out.push({ key: `${k.from}-${k.to}`, d, uses: k.uses, on, lx: sx - 8, ly: my, text, end: true });
      }
    }
    setPaths(out);
  }, [map, selected, locale]);

  useLayoutEffect(() => {
    measure();
    const root = ref.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure]);

  const crossings = (laneId: string) => map.links.filter((k) => !k.uses && map.parts.find((p) => p.id === k.from)!.lane === laneId && map.parts.find((p) => p.id === k.to)!.lane !== laneId);

  return (
    <div className={s.where}>
      <div className={s.lanes} ref={ref} style={{ "--cols": columns.count, "--rows": map.lanes.length } as CSSProperties}>
        {map.lanes.map((ln, r) => (
          <div key={ln.id} className={s.laneHead} style={{ gridRow: r + 1 }}><b>{ln.name[locale]}</b><span>{ln.host[locale]}</span></div>
        ))}
        {map.lanes.map((ln, r) => <div key={`${ln.id}-band`} className={s.band} style={{ gridRow: r + 1 }} aria-hidden="true" />)}
        {order.map((p) => (
          <div key={p.id} className={s.cell} style={{ gridRow: map.lanes.findIndex((ln) => ln.id === p.lane) + 1, gridColumn: columns.col[p.id] + 2 }}>{card(p, { compact: true })}</div>
        ))}
        <svg className={s.wires} aria-hidden="true">
          <defs><marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker></defs>
          {paths.map((p) => <path key={p.key} d={p.d} className={p.uses ? s.wireUses : s.wire} data-on={p.on || undefined} markerEnd={`url(#${arrow})`} />)}
          {paths.filter((p) => p.text).map((p) => <text key={`${p.key}-t`} x={p.end ? p.lx : p.lx + 6} y={p.ly} textAnchor={p.end ? "end" : "start"} className={s.wireLabel} data-on={p.on || undefined}>{p.text}</text>)}
        </svg>
      </div>
      {/* Narrow containers: each place as a section with its parts and what leaves it. */}
      <ol className={s.laneList}>
        {map.lanes.map((ln) => (
          <li key={ln.id}>
            <p className={s.laneListHead}><b>{ln.name[locale]}</b><span>{ln.host[locale]}</span></p>
            <ul>{order.filter((p) => p.lane === ln.id).map((p) => <li key={p.id}><button type="button" className={`${s.chip} ${s[p.tone]}`} aria-pressed={selected === p.id} onClick={() => choose(p.id)}>{label(p) ? <b>{label(p)}</b> : null}{p.name[locale]}</button></li>)}</ul>
            {crossings(ln.id).length ? <ul className={s.crossList}>{crossings(ln.id).map((k) => {
              const to = map.parts.find((p) => p.id === k.to)!;
              return <li key={`${k.from}-${k.to}`}>{t.crosses} {inSentence(map.lanes.find((x) => x.id === to.lane)!.name[locale])}: <b>{k.carries[locale]}</b>{k.via ? <em> {t.via} {k.via[locale]}</em> : null}</li>;
            })}</ul> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Case-page preview: the request as a compact strip, linking to the full map. */
export function SystemPreview({ map, locale, href }: { map: SystemMap; locale: Locale; href: string }) {
  const request = map.parts.filter((p) => p.when === "request");
  const es = locale === "es";
  return (
    <div className={s.preview}>
      <ol className={s.previewStrip}>
        {request.map((p, i) => {
          const link = map.links.find((k) => k.from === p.id && k.to === request[i + 1]?.id);
          return (
            <li key={p.id}>
              <span className={`${s.previewCard} ${s[p.tone]}`}><b aria-hidden="true">{i + 1}</b><TechnologyIcon name={p.icon} /><span>{p.name[locale]}</span><small>{map.lanes.find((x) => x.id === p.lane)!.name[locale]}</small></span>
              {link ? <span className={s.previewSends}>{link.carries[locale]}</span> : null}
            </li>
          );
        })}
      </ol>
      <p className={s.previewFoot}><a className="link" href={href}>{es ? "Abrir el mapa completo: flujo, dónde corre y datos" : "Open the full map: flow, where it runs and data"} <span aria-hidden="true">→</span></a></p>
    </div>
  );
}
