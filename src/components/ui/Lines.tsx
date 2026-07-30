import type { CSSProperties } from "react";

/**
 * Per-line mask reveal for display type.
 *
 * Lines are authored explicitly rather than measured at runtime: no layout
 * thrash, no flash of unstyled text, and the line breaks are a typographic
 * decision instead of whatever the browser happens to do. Each line masks its
 * own overflow, so if a line wraps on a narrow screen it still reveals cleanly.
 */
export function Lines({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  return (
    <>
      {lines.map((line, index) => (
        <span className="line" key={line}>
          <span
            className="line-in"
            style={{ "--i": index, "--delay": `${delay}ms` } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}
