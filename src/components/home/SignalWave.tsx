"use client";

import { useEffect, useRef } from "react";

export type WaveMode = "wave" | "peaks" | "scan" | "pulse" | "route";

const STROKE = "rgba(182, 244, 72, 0.95)";
const PEAKS = [
  { p: 0.12, h: 0.92 },
  { p: 0.32, h: 0.52 },
  { p: 0.52, h: 0.78 },
  { p: 0.72, h: 0.46 },
  { p: 0.9, h: 0.66 },
];

function gauss(k: number, p: number, s2: number) {
  const d = k - p;
  return Math.exp(-(d * d) / (2 * s2));
}

// Returns the vertical offset from the midline (positive = down) for a mode.
function shape(mode: WaveMode, k: number, t: number, A: number): number {
  switch (mode) {
    case "peaks": {
      let y = 0;
      for (let i = 0; i < PEAKS.length; i++) {
        const pulse = 0.82 + 0.18 * Math.sin(t * 0.05 + i * 1.7);
        y -= A * 1.25 * PEAKS[i].h * pulse * gauss(k, PEAKS[i].p, 0.0016);
      }
      return y;
    }
    case "route": {
      // two stationary "country" nodes + a signal travelling between them
      let y = -A * 0.85 * (gauss(k, 0.12, 0.004) + gauss(k, 0.88, 0.004));
      const trav = 0.12 + 0.76 * ((t * 0.005) % 1);
      y -= A * 0.55 * gauss(k, trav, 0.0009);
      return y;
    }
    case "pulse": {
      const phase = (t * 0.006) % 1.25;
      return -A * 1.15 * gauss(k, phase, 0.0009);
    }
    case "scan": {
      const level = Math.round(Math.sin(k * 13 + t * 0.03) * 1.4) / 1.4;
      return -A * 0.42 * level;
    }
    case "wave":
    default: {
      const env = Math.sin(k * Math.PI);
      return env * A * 0.5 * (Math.sin(k * 38 + t * 0.05) + Math.sin(k * 9 - t * 0.03));
    }
  }
}

/**
 * Oscilloscope-style signal line that morphs between modes — the narrative
 * through-line. Each chapter has its own signal: peaks for Systems, a CA↔MX
 * route for Origin, a pulse for Method/Transmission, etc.
 */
export function SignalWave({ className, mode = "wave" }: { className?: string; mode?: WaveMode }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef<WaveMode>(mode);
  const prev = useRef<WaveMode>(mode);
  const morph = useRef(1);

  useEffect(() => {
    if (target.current !== mode) {
      prev.current = target.current;
      target.current = mode;
      morph.current = 0;
    }
  }, [mode]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let t = 0;

    function size() {
      const r = canvas!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const mid = h / 2;
      const A = h * 0.34;

      ctx!.strokeStyle = "rgba(255,255,255,0.06)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, mid);
      ctx!.lineTo(w, mid);
      ctx!.stroke();

      if (reduced) morph.current = 1;
      const m = morph.current;
      const e = 1 - Math.pow(1 - m, 3); // ease-out

      ctx!.strokeStyle = STROKE;
      ctx!.lineWidth = 1.6;
      ctx!.shadowBlur = 9;
      ctx!.shadowColor = STROKE;
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const k = x / w;
        const yPrev = shape(prev.current, k, t, A);
        const yCur = shape(target.current, k, t, A);
        const y = mid + yPrev * (1 - e) + yCur * e;
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();
      ctx!.shadowBlur = 0;
    }

    function loop() {
      if (running) {
        if (!reduced) t += 1;
        if (morph.current < 1) morph.current = Math.min(1, morph.current + 0.045);
        draw();
      }
      raf = requestAnimationFrame(loop);
    }

    size();
    draw();
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => { running = entry.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const onResize = () => { size(); draw(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

export function modeForChapter(id: string): WaveMode {
  switch (id) {
    case "work": return "peaks";
    case "stack": return "scan";
    case "process": return "pulse";
    case "about": return "route";
    case "contact": return "pulse";
    default: return "wave";
  }
}
