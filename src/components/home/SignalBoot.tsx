"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/i18n";

const LINES = {
  en: [
    "signal atlas // cold boot",
    "initializing instrument ............ ok",
    "acquiring frequency [ CA ⇄ MX ] ... locked",
    "loading systems [ 5 ] .............. ok",
    "link established",
  ],
  es: [
    "signal atlas // arranque en frío",
    "inicializando instrumento ......... ok",
    "adquiriendo frecuencia [ CA ⇄ MX ] ... fijada",
    "cargando sistemas [ 5 ] ........... ok",
    "enlace establecido",
  ],
} as const;

type Phase = "boot" | "fade" | "gone";

/**
 * Cinematic boot sequence — the narrative's "power on". Streams a short
 * instrument boot log, then fades to reveal the page. Plays once per session;
 * skipped under prefers-reduced-motion. Uses a plain CSS fade + timeout unmount
 * (no animation library) so it can't get stuck.
 */
export function SignalBoot({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let booted = false;
    try {
      booted = sessionStorage.getItem("jp-booted") === "1";
    } catch {
      booted = false;
    }
    if (reduce || booted) {
      const skip = window.setTimeout(() => setPhase("gone"), 0);
      return () => window.clearTimeout(skip);
    }

    document.documentElement.classList.add("is-booting");
    const lines = LINES[locale];
    let i = 0;
    const timers: number[] = [];
    const tick = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) {
        window.clearInterval(tick);
        timers.push(
          window.setTimeout(() => {
            document.documentElement.classList.remove("is-booting");
            try {
              sessionStorage.setItem("jp-booted", "1");
            } catch {
              /* ignore */
            }
            setPhase("fade");
            timers.push(window.setTimeout(() => setPhase("gone"), 600));
          }, 520),
        );
      }
    }, 260);

    return () => {
      window.clearInterval(tick);
      timers.forEach((t) => window.clearTimeout(t));
      document.documentElement.classList.remove("is-booting");
    };
  }, [locale]);

  if (phase === "gone") return null;

  const lines = LINES[locale];

  return (
    <div className={phase === "fade" ? "signal-boot signal-boot--out" : "signal-boot"}>
      <div className="boot-scan" aria-hidden="true" />
      <div className="boot-inner">
        <div className="boot-brand">
          <span className="boot-dot" />
          JP // SIGNAL OS
        </div>
        <ul className="boot-log">
          {lines.slice(0, shown).map((line, idx) => (
            <li className="boot-line" key={idx}>
              <span className="boot-arrow">{"›"}</span> {line}
            </li>
          ))}
        </ul>
        <div className="boot-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${shown / lines.length})` }} />
        </div>
      </div>
    </div>
  );
}
