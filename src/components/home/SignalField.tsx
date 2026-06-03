"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Locale } from "@/data/i18n";
import { SignalParticles } from "./SignalParticles";

type FieldNode = {
  id: string;
  label: { en: string; es: string };
  sub?: string;
  x: number; // % of stage
  y: number;
  z: number; // depth (px)
  accent: string;
  size: "lg" | "md" | "sm";
};

const NODES: FieldNode[] = [
  { id: "savr", label: { en: "SAVR", es: "SAVR" }, sub: "platform", x: 38, y: 24, z: 90, accent: "var(--jade)", size: "md" },
  { id: "er", label: { en: "ER Triage", es: "ER Triage" }, sub: "system", x: 72, y: 18, z: 50, accent: "var(--terracotta)", size: "md" },
  { id: "proof", label: { en: "Proof", es: "Evidencia" }, x: 90, y: 40, z: -110, accent: "var(--blue)", size: "sm" },
  { id: "ai", label: { en: "Adaptive AI", es: "IA Adaptiva" }, sub: "concept", x: 84, y: 70, z: 120, accent: "var(--violet)", size: "sm" },
  { id: "mexico", label: { en: "Mexico", es: "México" }, x: 58, y: 86, z: -10, accent: "var(--gold)", size: "sm" },
  { id: "canada", label: { en: "Canada", es: "Canadá" }, x: 33, y: 64, z: -40, accent: "var(--blue)", size: "sm" },
];

// One route per node, radiating outward from the central core (~350,250 in viewBox)
const ROUTES = [
  "M 350 250 C 300 200, 270 150, 258 125", // savr
  "M 350 250 C 410 180, 470 120, 490 94", // er
  "M 350 250 C 470 230, 560 215, 612 208", // proof
  "M 350 250 C 450 300, 540 345, 571 364", // ai
  "M 350 250 C 380 340, 392 410, 394 447", // mexico
  "M 350 250 C 300 290, 250 320, 224 333", // canada
];

export function SignalField({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // Pointer parallax (normalized -0.5..0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-11, 11]);

  // Scroll dolly: fly into the field as the hero leaves
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  const camZ = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const camScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const camOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.65, 0]);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  const cameraStyle = reduce
    ? undefined
    : { rotateX, rotateY, z: camZ, scale: camScale, opacity: camOpacity };

  return (
    <div
      className="signal-field"
      ref={stageRef}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      aria-label="Signal Field: an interactive depth map of the work"
    >
      <SignalParticles className="sf-particles" />

      <motion.div className="sf-camera" style={cameraStyle}>
        <div className="sf-3d">
          {/* Depth grid planes */}
          <div className="sf-plane sf-plane-far" />
          <div className="sf-plane sf-plane-mid" />
          <div className="sf-core-glow" aria-hidden="true" />

          {/* Signal routes */}
          <svg className="sf-routes" viewBox="0 0 680 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <linearGradient id="sf-route" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.745 0.15 262)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="oklch(0.785 0.135 168)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="oklch(0.825 0.13 85)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {ROUTES.map((d, i) => (
              <g key={i}>
                <path className="sf-route" d={d} />
                {!reduce && (
                  <circle className="sf-pulse" r="3.5" style={{ animationDelay: `${i * 1.4}s` }}>
                    <animateMotion dur="5.5s" repeatCount="indefinite" begin={`${i * 1.4}s`} path={d} rotate="auto" />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* Central signal core */}
          <motion.div
            className="sf-core"
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sf-core-ring" />
            <div className="sf-core-ring sf-core-ring-2" />
            <div className="sf-core-orb">
              <span>JP</span>
              <small>Signal Atlas</small>
            </div>
          </motion.div>

          {/* Depth nodes */}
          {NODES.map((n, i) => (
            <motion.div
              key={n.id}
              className={`sf-node sf-node-${n.size}`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, z: n.z, x: "-50%", y: "-50%", ["--accent" as string]: n.accent }}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="sf-node-dot" />
              <span className="sf-node-label">
                {n.label[locale]}
                {n.sub ? <em>{n.sub}</em> : null}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="sf-vignette" aria-hidden="true" />
      <div className="sf-caption" aria-hidden="true">
        <span className="sf-caption-dot" />
        {locale === "es" ? "Campo de señales / rutas + nodos" : "Signal field / routes + nodes"}
      </div>
    </div>
  );
}
