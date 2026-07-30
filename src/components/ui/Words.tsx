import { Fragment } from "react";
import type { CSSProperties } from "react";

/**
 * Per-word mask reveal. Each word masks its own overflow and carries its index,
 * so the stagger is driven by scroll range rather than by a timer — headings
 * assemble as you reach them instead of playing whether or not you're looking.
 *
 * The separating space is rendered between the masked spans, not inside them:
 * a trailing space within an `overflow: hidden` inline-block gets clipped, and
 * the words run together.
 */
export function Words({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="word">
            <span className="word-in" style={{ "--i": index } as CSSProperties}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
