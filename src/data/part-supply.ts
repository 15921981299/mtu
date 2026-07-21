/**
 * Real supply capability data for MTU part pages.
 *
 * Keyed by partNumber — must match the `partNumber` field in
 * `engine-family-parts.ts` exactly (case-sensitive).
 *
 * The part-product template (`src/pages/part-products/[slug].astro`) renders
 * the "Supply & Availability" module only when an entry exists here for the
 * page's partNumber. Parts without an entry are unaffected.
 *
 * How to maintain:
 * - stockStatus: "in-stock" (physically in warehouse), "fast-order" (sourced
 *   and shipped quickly after order), "check" (confirm after inquiry).
 * - stockNote: short factual note, e.g. "2 pcs available in Shanghai warehouse".
 * - leadTime: e.g. "Ships in 1-3 days".
 * - lastVerified: ISO date (YYYY-MM-DD) of the last stock verification.
 * - realPhotos: array of real photo paths under /public, e.g.
 *   ["/images/supply/0031845201-1.webp"]. Leave empty until photos exist.
 */

export type PartSupplyInfo = {
  stockStatus: 'in-stock' | 'fast-order' | 'check';
  stockNote: string;
  leadTime: string;
  lastVerified: string;
  realPhotos?: readonly string[];
};

const placeholder = (partNumber: string): PartSupplyInfo => ({
  stockStatus: 'check',
  stockNote: 'Availability confirmed within 24 hours',
  leadTime: 'Stock or sourcing route confirmed after inquiry',
  lastVerified: '2026-07-21',
  realPhotos: [],
});

export const partSupply: Record<string, PartSupplyInfo> = {
  '700429108000': placeholder('700429108000'),
  X53608200005: placeholder('X53608200005'),
  '0031845201': placeholder('0031845201'),
  '5410501336': placeholder('5410501336'),
  '5360900250': placeholder('5360900250'),
  '5410180233': placeholder('5410180233'),
  '5840780024': placeholder('5840780024'),
  X53507500012: placeholder('X53507500012'),
  '0000925105': placeholder('0000925105'),
  '8695860572': placeholder('8695860572'),
  '0035352231': placeholder('0035352231'),
  '5319970245': placeholder('5319970245'),
  X52420300037: placeholder('X52420300037'),
  // GSC opportunity parts covered via supersession references
  '0035352531': placeholder('0035352531'), // GSC query: X00E50214099 (superseded ref)
  X57508300091: placeholder('X57508300091'), // GSC query: X59408300151 (superseded ref)
  XP59501800123: placeholder('XP59501800123'), // GSC query: XP59501800187 (superseded ref)
  'X59403800071/42': placeholder('X59403800071/42'), // GSC query: EX59403800071/42
  X52408300025: placeholder('X52408300025'), // GSC query: X52408100020 (superseded ref)
};

/** Maps internal stock status to schema.org Offer availability values. */
export const supplyAvailabilitySchema: Record<PartSupplyInfo['stockStatus'], string> = {
  'in-stock': 'https://schema.org/InStock',
  'fast-order': 'https://schema.org/LimitedAvailability',
  check: 'https://schema.org/InStock',
};
