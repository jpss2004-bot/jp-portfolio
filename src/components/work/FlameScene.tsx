"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Flame.module.css";

type Copy = {
  kicker: string; earth: string; space: string; earthBody: string; spaceBody: string;
  gravity: string; shape: string; oxygen: string; colour: string;
  teardrop: string; sphere: string; buoyant: string; diffusion: string; yellow: string; blue: string;
  note: string; source: string; scroll: string;
};

type Particle = { x: number; y: number; vx: number; vy: number; age: number; life: number; size: number };

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A flame drawn in code. `g` runs from 1 (Earth) to 0 (microgravity): buoyancy
 * stretches the flame into a teardrop on Earth, and without it the flame
 * settles into a slow blue sphere fed by diffusion.
 */
function useFlame(canvasRef: React.RefObject<HTMLCanvasElement | null>, gravity: React.RefObject<number>, running: React.RefObject<boolean>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = [];
    let width = 0, height = 0, frame = 0, last = 0, visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const spawn = (g: number, unit: number) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * unit * mix(0.16, 0.07, g);
      const speed = unit * mix(0.11, 0.05, g) * (0.4 + Math.random());
      particles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * mix(1, 0.5, g),
        vx: Math.cos(angle) * speed * mix(1, 0.5, g),
        vy: Math.sin(angle) * speed * mix(1, 0.2, g) - unit * g * (0.42 + Math.random() * 0.5),
        age: 0,
        life: mix(2.6, 1.25, g) * (0.6 + Math.random() * 0.6),
        size: unit * mix(0.2, 0.17, g) * (0.7 + Math.random() * 0.6),
      });
    };

    const step = (dt: number, g: number, unit: number) => {
      const rate = mix(70, 250, g);
      for (let n = rate * dt + Math.random(); n >= 1; n--) spawn(g, unit);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= p.life) { particles.splice(i, 1); continue; }
        p.vx += (-p.x * 7 * g + (Math.random() - 0.5) * unit * 0.5 * g) * dt;
        p.vx *= 1 - mix(0.9, 0.4, g) * dt;
        p.vy *= 1 - mix(0.9, 0.15, g) * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
      if (particles.length > 640) particles.splice(0, particles.length - 640);
    };

    const draw = (g: number, unit: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * mix(0.52, 0.74, g);
      ctx.globalCompositeOperation = "lighter";
      const halo = ctx.createRadialGradient(cx, cy - unit * 0.4 * g, 0, cx, cy - unit * 0.4 * g, unit * 1.5);
      halo.addColorStop(0, `rgba(${mix(70, 255, g)}, ${mix(120, 150, g)}, ${mix(255, 60, g)}, 0.16)`);
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);
      for (const p of particles) {
        const t = p.age / p.life;
        const fade = Math.sin(Math.min(1, t * 1.15) * Math.PI);
        const size = p.size * mix(mix(0.75, 1.15, t), mix(1.05, 0.22, t), g);
        /* Earth: white-yellow core cooling to orange. Space: pale core inside deep blue. */
        const r = mix(mix(150, 55, t), mix(255, 255, t), g);
        const gr = mix(mix(190, 110, t), mix(235, 95, t), g);
        const b = mix(mix(255, 255, t), mix(170, 20, t), g);
        const alpha = fade * mix(0.11, 0.3, g);
        const x = cx + p.x, y = cy + p.y;
        const blob = ctx.createRadialGradient(x, y, 0, x, y, size);
        blob.addColorStop(0, `rgba(${r | 0}, ${gr | 0}, ${b | 0}, ${alpha})`);
        blob.addColorStop(1, `rgba(${r | 0}, ${gr | 0}, ${b | 0}, 0)`);
        ctx.fillStyle = blob;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      /* The fuel: a wick on Earth, a small droplet in microgravity. */
      ctx.fillStyle = "rgba(20, 16, 14, 0.9)";
      ctx.beginPath();
      ctx.ellipse(cx, cy + unit * 0.02, unit * mix(0.05, 0.022, g), unit * mix(0.05, 0.12, g), 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const g = Math.max(0, Math.min(1, gravity.current ?? 1));
      const unit = Math.min(width, height * 0.9) * 0.42;
      step(dt, g, unit);
      draw(g, unit);
      if (visible && running.current && !reduced.matches && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const kick = () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(loop); } };
    /* With reduced motion, settle a still frame for the current state. */
    const still = () => {
      const g = Math.max(0, Math.min(1, gravity.current ?? 1));
      const unit = Math.min(width, height * 0.9) * 0.42;
      particles.length = 0;
      for (let i = 0; i < 90; i++) step(0.033, g, unit);
      draw(g, unit);
    };

    resize();
    const sizeObserver = new ResizeObserver(() => { resize(); if (reduced.matches) still(); else kick(); });
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !reduced.matches) kick(); }, { rootMargin: "120px" });
    viewObserver.observe(canvas);
    const onVisibility = () => { if (!document.hidden && !reduced.matches) kick(); };
    const onRedraw = () => { if (reduced.matches) still(); else kick(); };
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("flame:redraw", onRedraw);
    if (reduced.matches) still(); else kick();
    return () => { cancelAnimationFrame(frame); sizeObserver.disconnect(); viewObserver.disconnect(); document.removeEventListener("visibilitychange", onVisibility); canvas.removeEventListener("flame:redraw", onRedraw); };
  }, [canvasRef, gravity, running]);
}

/** A quiet microgravity flame behind the Flaregrain stage. */
export function FlameBackdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const gravity = useRef(0);
  const running = useRef(true);
  useFlame(canvas, gravity, running);
  return <canvas ref={canvas} className={styles.backdrop} aria-hidden="true" />;
}

/**
 * Pinned scroll sequence: scrolling through the section takes the flame from
 * Earth to microgravity. The two buttons do the same without scrolling.
 */
export function FlameScene({ copy }: { copy: Copy }) {
  const track = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const gravity = useRef(1);
  const running = useRef(true);
  const [g, setG] = useState(1);
  useFlame(canvas, gravity, running);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const read = () => {
      frame = 0;
      if (reduced.matches) return;
      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      /* Hold each state briefly at both ends of the scroll. */
      const eased = Math.max(0, Math.min(1, (progress - 0.12) / 0.7));
      const next = 1 - eased * eased * (3 - 2 * eased);
      gravity.current = next;
      setG((current) => (Math.abs(current - next) > 0.004 ? next : current));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  const jump = (target: 0 | 1) => {
    const node = track.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gravity.current = target; setG(target);
      canvas.current?.dispatchEvent(new Event("flame:redraw"));
      return;
    }
    const top = node.getBoundingClientRect().top + window.scrollY;
    const span = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * (target === 1 ? 0.02 : 0.9), behavior: "smooth" });
  };

  const space = 1 - g;
  const inSpace = space > 0.5;
  return (
    <div ref={track} className={styles.track}>
      <div className={styles.pin}>
        <div className={styles.scene} style={{ "--space": space } as React.CSSProperties}>
          <canvas ref={canvas} className={styles.canvas} role="img" aria-label={inSpace ? copy.spaceBody : copy.earthBody} />
          <div className={styles.copy}>
            <p className={styles.kicker}>{copy.kicker}</p>
            <div className={styles.states}>
              <div className={styles.state} data-on={!inSpace || undefined} aria-hidden={inSpace ? true : undefined}><h4>{copy.earth}</h4><p>{copy.earthBody}</p></div>
              <div className={styles.state} data-on={inSpace || undefined} aria-hidden={inSpace ? undefined : true}><h4>{copy.space}</h4><p>{copy.spaceBody}</p></div>
            </div>
            <div className={styles.switch} role="group" aria-label={copy.kicker}>
              <button type="button" aria-pressed={!inSpace} onClick={() => jump(1)}>{copy.earth}</button>
              <button type="button" aria-pressed={inSpace} onClick={() => jump(0)}>{copy.space}</button>
            </div>
          </div>
          <dl className={styles.readout}>
            <div><dt>{copy.gravity}</dt><dd>{g.toFixed(2)} g</dd></div>
            <div><dt>{copy.shape}</dt><dd>{inSpace ? copy.sphere : copy.teardrop}</dd></div>
            <div><dt>{copy.oxygen}</dt><dd>{inSpace ? copy.diffusion : copy.buoyant}</dd></div>
            <div><dt>{copy.colour}</dt><dd>{inSpace ? copy.blue : copy.yellow}</dd></div>
          </dl>
          <div className={styles.meter} aria-hidden="true"><i style={{ transform: `scaleX(${space})` }} /></div>
          <p className={styles.note}>{copy.note} <a href="https://science.nasa.gov/biological-physical/resources/explainers-infographics/why-nasa-is-studying-flames-in-space/" target="_blank" rel="noreferrer">{copy.source} ↗</a></p>
          <p className={styles.hint} aria-hidden="true">{copy.scroll} ↓</p>
        </div>
      </div>
    </div>
  );
}
