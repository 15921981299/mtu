/**
 * Programmatic hub subpage index governance — index money pages with unique intent;
 * noindex thin or duplicate subpages (overlap with /compare/ or parent hub).
 */

export type SubpageKey = `${string}/${string}`;

function key(parentSlug: string, subpageSlug: string): SubpageKey {
  return `${parentSlug}/${subpageSlug}`;
}

/** Material subpages worth indexing (unique guides, major grades). */
const materialIndexed = new Set<SubpageKey>([
  key('aluminum', 'anodizing-guide'),
  key('aluminum', '6061-vs-7075-selection'),
  key('aluminum', 'cnc-aluminum-machining-guide'),
  key('aluminum', 'heat-treatment-aluminum'),
  key('stainless-steel', 'passivation-guide'),
  key('stainless-steel', '303-vs-304-vs-316'),
  key('stainless-steel', '17-4ph-machining-guide'),
  key('carbon-steel', '4140-steel-machining'),
  key('carbon-steel', 'heat-treatment-guide'),
  key('carbon-steel', '4140-vs-1045-vs-1018'),
  key('titanium', 'grade-2-vs-grade-5'),
  key('engineering-plastics', 'pom-delrin-guide'),
  key('engineering-plastics', 'peek-vs-ptfe'),
  key('engineering-plastics', 'ptfe-teflon-guide'),
  key('nickel-alloys', 'monel-machining'),
  key('nickel-alloys', 'hastelloy-machining'),
  key('tool-steels', 'd2-tool-steel-machining'),
]);

/** Product subpages — high-intent part types. */
const productIndexed = new Set<SubpageKey>([
  key('precision-shafts', 'spline-shaft-machining'),
  key('precision-shafts', 'motor-shaft-machining'),
  key('housings-enclosures', 'ip65-waterproof-enclosure'),
  key('housings-enclosures', 'custom-electronics-enclosure'),
  key('gears-sprockets', 'spur-gear-machining'),
  key('gears-sprockets', 'bevel-gear-machining'),
  key('gears-sprockets', 'ball-screw-lead-screw-machining'),
  key('flanges-fittings', 'hydraulic-fitting-guide'),
  key('manifolds-valve-bodies', 'cartridge-valve-cavity'),
  key('fixtures-tooling', 'welding-jig-machining'),
  key('valve-components', 'nozzle-machining'),
]);

/** Industry subpages — regulated / high-value verticals. */
const industryIndexed = new Set<SubpageKey>([
  key('automotive', 'ev-battery-housing-machining'),
  key('aerospace', 'aircraft-structural-brackets'),
  key('medical-devices', 'surgical-instrument-machining'),
  key('oil-gas', 'valve-body-machining'),
  key('oil-gas', 'downhole-tool-components'),
  key('robotics', 'robot-end-effector-machining'),
  key('robotics', 'gripper-finger-machining'),
]);

/** Capability subpages — process depth without duplicating /compare/. */
const capabilityIndexed = new Set<SubpageKey>([
  key('cnc-milling', 'high-speed-machining-aluminum'),
  key('cnc-turning', 'live-tooling-mill-turn'),
  key('5-axis-machining', 'impeller-machining'),
  key('5-axis-machining', '5-axis-setup-reduction'),
  key('grinding', 'cylindrical-grinding-guide'),
  key('edm', 'wire-edm-tolerances'),
  key('quality-control', 'first-article-inspection-guide'),
  key('quality-control', 'cmm-programming-basics'),
]);

const subpageIndexWhitelist = new Set<SubpageKey>([
  ...materialIndexed,
  ...productIndexed,
  ...industryIndexed,
  ...capabilityIndexed,
]);

export function isSubpageNoindex(parentSlug: string, subpageSlug: string): boolean {
  return !subpageIndexWhitelist.has(key(parentSlug, subpageSlug));
}

export function subpagePath(parentSlug: string, subpageSlug: string, cluster: 'materials' | 'products' | 'industries' | 'capabilities'): string {
  return `/${cluster}/${parentSlug}/${subpageSlug}/`;
}
