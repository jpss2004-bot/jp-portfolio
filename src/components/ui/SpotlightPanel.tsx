"use client";

import { useRef, useState } from "react";

type SpotlightPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SpotlightPanel({
  children,
  className = "",
}: SpotlightPanelProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative overflow-hidden rounded-[2rem] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: active ? 1 : 0.45,
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(67,230,165,0.16), transparent 26%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
