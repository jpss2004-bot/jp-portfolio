import type { Locale } from "@/data/i18n";

type SignalAtmosphereProps = {
  locale: Locale;
  mode?: "home" | "project";
};

const labels = {
  en: {
    routeA: "Canada",
    routeB: "Mexico",
    routeC: "Proof",
    routeD: "Systems",
  },
  es: {
    routeA: "CanadÃ¡",
    routeB: "MÃ©xico",
    routeC: "Evidencia",
    routeD: "Sistemas",
  },
} as const;

export function SignalAtmosphere({ locale, mode = "home" }: SignalAtmosphereProps) {
  const t = labels[locale];

  return (
    <div className={`signal-atmosphere signal-atmosphere-${mode}`} aria-hidden="true">
      <div className="signal-mesh" />
      <div className="signal-depth-plane signal-depth-plane-one" />
      <div className="signal-depth-plane signal-depth-plane-two" />
      <div className="signal-orb signal-orb-blue" />
      <div className="signal-orb signal-orb-jade" />
      <div className="signal-orb signal-orb-gold" />

      <svg className="signal-route-canvas" viewBox="0 0 1440 980" preserveAspectRatio="none">
        <path className="signal-route signal-route-primary" d="M90 170 C260 80 420 210 560 150 C760 60 970 120 1350 82" />
        <path className="signal-route signal-route-secondary" d="M80 560 C260 390 430 610 650 460 C820 342 1030 395 1360 290" />
        <path className="signal-route signal-route-tertiary" d="M120 860 C350 700 560 780 750 650 C940 520 1120 625 1360 520" />
      </svg>

      <div className="signal-chip signal-chip-a">{t.routeA}</div>
      <div className="signal-chip signal-chip-b">{t.routeB}</div>
      <div className="signal-chip signal-chip-c">{t.routeC}</div>
      <div className="signal-chip signal-chip-d">{t.routeD}</div>
    </div>
  );
}
