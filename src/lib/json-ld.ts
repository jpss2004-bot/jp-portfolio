/** JSON-LD is data, but HTML still recognizes closing script tags inside it. */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
