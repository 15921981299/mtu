/** Public revision log for accountability (E-E-A-T trust signal). */
export type BlogChangelogEntry = {
  updatedAt: string;
  note: string;
};

export const blogChangelog: Record<string, BlogChangelogEntry> = {
  'iso-2768-tolerances-explained': {
    updatedAt: '2026-06-12',
    note: 'Retained as an indexable technical reference that supports part-number and fitment checks.',
  },
};

export function getBlogChangelog(slug: string): BlogChangelogEntry | undefined {
  return blogChangelog[slug];
}

export function mergeBlogDates(
  slug: string,
  publishedAt: string,
  postUpdatedAt?: string,
): { updatedAt?: string; updateNote?: string } {
  const entry = getBlogChangelog(slug);
  const updatedAt = entry?.updatedAt ?? postUpdatedAt;
  if (!updatedAt || updatedAt <= publishedAt) return {};
  return { updatedAt, updateNote: entry?.note };
}
