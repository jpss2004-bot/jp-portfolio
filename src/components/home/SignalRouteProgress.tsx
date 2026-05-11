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
    { id: "resume", label: "Resume", short: "CV" },
    { id: "process", label: "Method", short: "Method" },
    { id: "contact", label: "Contact", short: "Contact" },
  ],
  es: [
    { id: "work", label: "Sistemas seleccionados", short: "Proyectos" },
    { id: "stack", label: "Mapa técnico", short: "Stack" },
    { id: "resume", label: "CV", short: "CV" },
    { id: "process", label: "Método", short: "Método" },
    { id: "contact", label: "Contacto", short: "Contacto" },
  ],
} satisfies Record<Locale, RouteNode[]>;

export function SignalRouteProgress({ locale }: { locale: Locale }) {
  const nodes = useMemo(() => labels[locale], [locale]);
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "work");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      document.documentElement.style.setProperty("--signal-scroll-progress", String(progress));
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
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.12, 0.35, 0.6],
      },
    );

    for (const node of nodes) {
      const section = document.getElementById(node.id);
      if (section) observer.observe(section);
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      observer.disconnect();
    };
  }, [nodes]);

  return (
    <nav
      className="signal-route-progress"
      aria-label={locale === "es" ? "Progreso de secciones" : "Section progress"}
    >
      <div className="signal-route-line" aria-hidden="true">
        <span />
      </div>

      {nodes.map((node) => {
        const active = activeId === node.id;

        return (
          <a
            href={`#${node.id}`}
            className={active ? "signal-route-node active" : "signal-route-node"}
            aria-current={active ? "location" : undefined}
            key={node.id}
          >
            <span className="signal-route-dot" aria-hidden="true" />
            <span className="signal-route-label">{node.short}</span>
            <span className="sr-only">{node.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
