/**
 * Comparison index governance — keep high-intent decision pages indexed;
 * noindex long-tail material/finish/quality pairs that overlap hubs or /compare/ winners.
 */

/** High search volume + RFQ intent — always index. */
export const comparisonIndexCore = new Set([
  // Process & make-vs-buy
  'cnc-milling-vs-turning',
  '3-axis-vs-5-axis',
  'wire-edm-vs-cnc-milling',
  'swiss-vs-conventional-turning',
  'sample-vs-production-machining',
  'turning-vs-milling-cost',
  'laser-cutting-vs-cnc-milling',
  'investment-casting-vs-cnc',
  'cnc-machining-vs-die-casting',
  'cnc-machining-vs-injection-molding',
  'cnc-machining-vs-sheet-metal-fabrication',
  'cnc-machining-vs-metal-stamping',
  'cnc-machining-vs-extrusion',
  'cnc-machining-vs-vacuum-casting',
  'cnc-machining-vs-forging',
  'cnc-vs-metal-3d-printing',
  'cnc-vs-plastic-3d-printing',
  'aluminum-vs-steel-machining',
  // Top material decisions
  'aluminum-6061-vs-7075',
  '6061-vs-2024-aluminum',
  'stainless-304-vs-316',
  'titanium-vs-aluminum',
  '4140-vs-1045-steel',
  'grade-2-vs-grade-5-titanium',
  'hot-rolled-vs-cold-rolled-steel',
  'inconel-vs-stainless-steel',
  'brass-vs-copper',
  'pom-vs-nylon',
  'peek-vs-ptfe',
  'mic6-vs-extruded-aluminum',
  'magnesium-vs-aluminum',
  // Finishes buyers specify on RFQs
  'anodizing-vs-powder-coating',
  'anodizing-type-ii-vs-iii',
  'passivation-vs-electropolishing',
  // Sourcing
  'china-vs-local-cnc-supplier',
  'outsource-vs-in-house-machining',
  'step-file-vs-iges',
  'express-vs-standard-lead-time',
  'carbide-vs-hss-tooling',
  // Engineering reference linked from resources
  'ra-vs-rz-surface-roughness',
  'concentricity-vs-runout',
  'sinker-edm-vs-wire-edm',
  'iso-2768-m-vs-f',
  'cpk-vs-ppk-capability',
]);

/** Long-tail non-CNC / niche process — crawlable via process-selection, not sitemap. */
export const comparisonIndexProcessLongTail = new Set([
  'cnc-machining-vs-sand-casting',
  'cnc-machining-vs-gravity-die-casting',
  'cnc-machining-vs-metal-injection-molding',
  'cnc-machining-vs-thermoforming',
  'cnc-machining-vs-powder-metallurgy',
  'cnc-machining-vs-waterjet-cutting',
  'cnc-machining-vs-welding-fabrication',
  'cnc-machining-vs-compression-molding',
]);

export const comparisonIndexWhitelist = comparisonIndexCore;

export function isComparisonNoindex(slug: string): boolean {
  return !comparisonIndexWhitelist.has(slug);
}

export function getComparisonNoindexSlugs(allSlugs: string[]): string[] {
  return allSlugs.filter(isComparisonNoindex);
}
