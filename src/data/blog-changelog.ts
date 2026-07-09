/** Public revision log for accountability (E-E-A-T trust signal). */
export type BlogChangelogEntry = {
  updatedAt: string;
  note: string;
};

export const blogChangelog: Record<string, BlogChangelogEntry> = {
  'cnc-machining-tolerances-complete-guide': {
    updatedAt: '2026-06-12',
    note: 'Added shop-floor tolerance cost table with measured cycle-time impacts; cross-linked ISO 2768 spokes.',
  },
  'how-to-choose-cnc-machining-supplier-china': {
    updatedAt: '2026-06-12',
    note: 'Consolidated unique procurement case study here; removed duplicate story blocks from other articles.',
  },
  'cnc-machining-dfm-design-guide': {
    updatedAt: '2026-06-12',
    note: 'Added titanium housing inquiry prep case ($890→$340/part); removed duplicate story blocks site-wide.',
  },
  'how-to-prepare-a-drawing-for-cnc-rfq': {
    updatedAt: '2026-06-12',
    note: 'Aligned checklist with inquiry prep hub and /resources/dfm-checklist/; clarified ISO 2768-m default tolerance.',
  },
  'aluminum-6061-vs-7075-cnc-machining': {
    updatedAt: '2026-06-12',
    note: 'Added machinability and anodizing finish notes from production runs on both alloys.',
  },
  'cnc-milling-vs-turning-whats-the-difference': {
    updatedAt: '2026-06-12',
    note: 'Expanded shop-floor accuracy comparison; linked to /compare/cnc-milling-vs-turning/.',
  },
  'how-to-reduce-cnc-machining-cost': {
    updatedAt: '2026-06-12',
    note: 'Added tolerance-driven cost examples; linked cost hub spokes.',
  },
  'cnc-machining-surface-roughness-guide': {
    updatedAt: '2026-06-12',
    note: 'Clarified Ra vs Rz for sealing surfaces; linked glossary Ra entry.',
  },
  'surface-finishes-for-cnc-machined-parts': {
    updatedAt: '2026-06-12',
    note: 'Updated lead-time ranges for anodize and powder coat from current partner finishing lines.',
  },
  'cnc-machining-for-beginners-guide': {
    updatedAt: '2026-06-12',
    note: 'Reorganized as getting-started hub; added links to 10 pillar guides.',
  },
  'cnc-machining-rfq-checklist-for-engineers': {
    updatedAt: '2026-06-11',
    note: 'Added thread class and datum scheme checklist items; linked drawing preparation guide.',
  },
  'how-to-audit-cnc-supplier-quality-before-first-order': {
    updatedAt: '2026-06-12',
    note: 'Added three-step pre-award audit aligned with certifications page and FAI workflow.',
  },
  'china-cnc-machining-regions-comparison-guide': {
    updatedAt: '2026-06-12',
    note: 'Refreshed region strengths table; emphasized capability over city name alone.',
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
