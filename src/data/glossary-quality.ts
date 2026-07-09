/**
 * Glossary index governance — keep thin definition pages out of Google index
 * when capability/material/compare/blog hubs already cover the topic.
 */

/** High-value procurement / QC terms linked from resources and pillar hubs. */
export const glossaryKeepIndexed = new Set([
  'dfm',
  'iso-2768',
  'cmm',
  'rfq',
  'gd-t',
  'en-10204-3-1',
  'fai',
  'incoterms',
]);

export function isGlossaryNoindex(slug: string): boolean {
  return !glossaryKeepIndexed.has(slug);
}

export function getGlossaryNoindexSlugs(allSlugs: string[]): string[] {
  return allSlugs.filter(isGlossaryNoindex);
}
