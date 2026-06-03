"use client";

import { useEffect, useRef } from "react";

/**
 * A single thin oscilloscope-style signal line — the "instrument" motif.
 * Minimal, accent-colored, drifts slowly. Pauses off-screen and renders one
 * static frame under prefers-reduced-motion.
 */
export function SignalWave({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const STROKE = "rgba(182, 244, 72, 0.95)"; // canvas-safe form of --accent

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

      // faint baseline
      ctx!.strokeStyle = "rgba(255,255,255,0.06)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, mid);
      ctx!.lineTo(w, mid);
      ctx!.stroke();

      // signal line
      ctx!.strokeStyle = STROKE;
      ctx!.lineWidth = 1.6;
      ctx!.shadowBlur = 10;
      ctx!.shadowColor = STROKE;
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const k = x / w;
        const envelope = Math.sin(k * Math.PI); // taper at both ends
        const amp = h * 0.3 * envelope;
        const y =
          mid +
          Math.sin(x * 0.05 + t * 0.06) * amp * 0.5 +
          Math.sin(x * 0.013 - t * 0.04) * amp * 0.5;
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();
      ctx!.shadowBlur = 0;
    }

    function loop() {
      if (running) {
        if (!reduced) t += 1;
        draw();
      }
      raf = requestAnimationFrame(loop);
    }

    size();
    draw();
    if (!reduced) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0 });
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
