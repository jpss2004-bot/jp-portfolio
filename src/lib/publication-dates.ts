/** Google Article fields require a time and zone. Never manufacture these from a day. */
export function hasZonedTime(value: string | undefined): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value.slice(0, 10)).toISOString().slice(0, 10) === value.slice(0, 10);
}

export function articleDates(entry: { publishedAt?: string; updatedAt?: string }) {
  return {
    ...(hasZonedTime(entry.publishedAt) ? { datePublished: entry.publishedAt } : {}),
    ...(hasZonedTime(entry.updatedAt) ? { dateModified: entry.updatedAt } : {}),
  };
}

/** Day-only dates are honest; a time, when supplied, must include its time zone. */
export function isPublicationDate(value: string | undefined): value is string {
  if (!value) return false;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  }
  return hasZonedTime(value);
}
