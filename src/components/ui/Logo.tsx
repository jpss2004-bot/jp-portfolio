/**
 * JP monogram — a J and a P sharing one stem, with a vermillion node on the
 * baseline. Drawn as strokes on a 57x60 grid so it stays crisp at favicon size
 * and inherits the surrounding text colour (the node keeps the brand accent).
 */
export function Logo({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={(size * 57) / 60}
      height={size}
      viewBox="0 0 57 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="7" strokeLinecap="butt">
        <path d="M28 8 V42" />
        <path d="M28 42 a10 10 0 0 1 -20 0" />
        <path d="M24.5 8 H38 a11 11 0 0 1 0 22 H28" />
      </g>
      <rect x="37.5" y="48.5" width="7" height="7" fill="var(--accent)" />
    </svg>
  );
}
