/**
 * Glyphs for the four capability layers.
 *
 * Drawn here rather than generated: at 28px a hand-built stroke is sharper
 * than any raster, it inherits the page colour, and it costs no request. They
 * use the same 1.4px hairline as the rest of the interface.
 */
const paths: Record<string, React.ReactNode> = {
  interface: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <path d="M2.5 9h19" />
      <path d="M5.5 6.75h1.5" />
    </>
  ),
  application: (
    <>
      <path d="M9 7.5 4.5 12 9 16.5" />
      <path d="M15 7.5 19.5 12 15 16.5" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V6" />
      <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
  delivery: (
    <>
      <path d="M12 3.5v11" />
      <path d="M7.5 8 12 3.5 16.5 8" />
      <path d="M4.5 16.5v4h15v-4" />
    </>
  ),
};

export function Glyph({ name }: { name: string }) {
  const path = paths[name];
  if (!path) return null;

  return (
    <svg
      className="glyph"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
