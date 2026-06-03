"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas star/signal field. No WebGL dependency: a tuned 2D canvas
 * that paints a parallax particle drift with occasional signal pulses.
 * Pauses when off-screen and honors prefers-reduced-motion (renders one static frame).
 */
export function SignalParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accents = [
      [120, 170, 255], // blue
      [70, 215, 175], // jade
      [244, 196, 110], // gold
      [167, 139, 250], // violet
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    type P = { x: number; y: number; z: number; r: number; c: number[]; tw: number };
    let particles: P[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = Math.min(240, Math.floor((width * height) / 6200));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: rand(0.2, 1), // depth -> size + speed + brightness
        r: rand(0.4, 1.7),
        c: accents[Math.floor(Math.random() * accents.length)],
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.y -= p.z * 0.18; // gentle upward drift, deeper = faster
          if (p.y < -4) {
            p.y = height + 4;
            p.x = Math.random() * width;
          }
        }
        const twinkle = reduced ? 0.7 : 0.55 + 0.45 * Math.sin(t * 0.001 + p.tw);
        const alpha = (0.18 + p.z * 0.5) * twinkle;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * (0.6 + p.z), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, ${alpha})`;
        ctx!.shadowBlur = 6 * p.z;
        ctx!.shadowColor = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, ${alpha})`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
    }

    let raf = 0;
    let running = true;
    function loop(t: number) {
      if (running) frame(t);
      raf = requestAnimationFrame(loop);
    }

    build();
    if (reduced) {
      frame(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(build);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
