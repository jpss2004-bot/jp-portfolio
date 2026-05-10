"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type EyeState = {
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function MouseEyesMascot() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [leftEye, setLeftEye] = useState<EyeState>({ x: 0, y: 0 });
  const [rightEye, setRightEye] = useState<EyeState>({ x: 0, y: 0 });

  const eyeCenters = useMemo(
    () => [
      { x: 84, y: 82 },
      { x: 156, y: 82 },
    ],
    []
  );

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      const nextPositions = eyeCenters.map((center) => {
        const dx = localX - center.x;
        const dy = localY - center.y;
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const radius = 8;

        return {
          x: clamp((dx / distance) * radius, -8, 8),
          y: clamp((dy / distance) * radius, -8, 8),
        };
      });

      setLeftEye(nextPositions[0]);
      setRightEye(nextPositions[1]);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [eyeCenters]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-[230px] w-full max-w-[260px] items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.22)]"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(67,230,165,0.18),transparent_48%)]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative h-32 w-32 rounded-[2rem] border border-white/10 bg-[#0d131a] shadow-inner">
          <div className="absolute left-5 top-8 h-10 w-10 rounded-full bg-white">
            <div
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-transform duration-75"
              style={{ transform: `translate(calc(-50% + ${leftEye.x}px), calc(-50% + ${leftEye.y}px))` }}
            />
          </div>

          <div className="absolute right-5 top-8 h-10 w-10 rounded-full bg-white">
            <div
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-transform duration-75"
              style={{ transform: `translate(calc(-50% + ${rightEye.x}px), calc(-50% + ${rightEye.y}px))` }}
            />
          </div>

          <div className="absolute bottom-5 left-1/2 h-3 w-12 -translate-x-1/2 rounded-full bg-emerald-300/80" />
          <div className="absolute left-1/2 top-3 h-2 w-10 -translate-x-1/2 rounded-full bg-white/10" />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-white">JP Bot</p>
          <p className="mt-1 text-xs leading-5 text-zinc-400">
            A small signature element that watches the work section with you.
          </p>
        </div>
      </div>
    </div>
  );
}
