"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/i18n";

type RouteNode = {
  id: string;
  label: string;
  short: string;
};

const labels = {
  en: [
    { id: "work", label: "Selected systems", short: "Work" },
    { id: "stack", label: "Technical map", short: "Stack" },
    { id: "resume", label: "Resume", short: "Resume" },
    { id: "process", label: "Operating method", short: "Method" },
    { id: "contact", label: "Contact", short: "Contact" },
  ],
  es: [
    { id: "work", label: "Sistemas seleccionados", short: "Proyectos" },
    { id: "stack", label: "Mapa tÃ©cnico", short: "Stack" },
    { id: "resume", label: "CV", short: "CV" },
    { id: "process", label: "MÃ©todo de trabajo", short: "MÃ©todo" },
    { id: "contact", label: "Contacto", short: "Contacto" },
  ],
} satisfies Record<Locale, RouteNode[]>;

export function SignalJourneyRail({ locale }: { locale: Locale }) {
  const nodes = useMemo(() => labels[locale], [locale]);
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "work");

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      const total = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / total, 0), 1);
      root.style.setProperty("--signal-progress", progress.toFixed(4));
    };

    updateProgress();

    if (!reduceMotion) {
      window.addEventListener("scroll", updateProgress, { passive: true });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
          root.dataset.signalSection = visible.target.id;
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -52% 0px",
        threshold: [0.1, 0.24, 0.48, 0.72],
      },
    );

    for (const node of nodes) {
      const target = document.getElementById(node.id);
      if (target) observer.observe(target);
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      observer.disconnect();
    };
  }, [nodes]);

  return (
    <nav
      className="signal-journey-rail"
      aria-label={locale === "es" ? "Ruta del portafolio" : "Portfolio route"}
    >
      <div className="signal-journey-track" aria-hidden="true">
        <span />
      </div>

      {nodes.map((node, index) => {
        const active = activeId === node.id;

        return (
          <a
            href={`#${node.id}`}
            className={active ? "signal-journey-node active" : "signal-journey-node"}
            aria-current={active ? "location" : undefined}
            key={node.id}
          >
            <span className="signal-journey-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="signal-journey-dot" aria-hidden="true" />
            <span className="signal-journey-label">{node.short}</span>
          </a>
        );
      })}
    </nav>
  );
}
