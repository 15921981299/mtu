/** Curated blog slugs for capability and material hub/subpages. */
import { isBlogNoindex } from './blog-quality';

const HUB_ARTICLE_FALLBACKS = [
  'how-to-choose-cnc-machining-supplier-china',
  'cnc-machining-dfm-design-guide',
  'how-to-prepare-a-drawing-for-cnc-rfq',
  'cnc-machining-tolerances-complete-guide',
] as const;

/** Return indexable blog slugs only — avoids linking hub pages to noindex posts (crawl + cannibalization). */
export function resolveHubArticles(slugs: string[], max = 3): string[] {
  const picked: string[] = [];
  for (const slug of slugs) {
    if (!isBlogNoindex(slug) && !picked.includes(slug)) picked.push(slug);
    if (picked.length >= max) return picked;
  }
  for (const slug of HUB_ARTICLE_FALLBACKS) {
    if (picked.length >= max) break;
    if (!picked.includes(slug)) picked.push(slug);
  }
  return picked.slice(0, max);
}

export const capabilityArticleMap: Record<string, string[]> = {
  'cnc-milling': [
    'cnc-milling-vs-turning-whats-the-difference',
    '3-axis-vs-5-axis-cnc-machining',
    'how-to-prepare-a-drawing-for-cnc-rfq',
  ],
  'cnc-turning': [
    'cnc-milling-vs-turning-whats-the-difference',
    'wire-edm-vs-cnc-milling',
    'cnc-machining-lead-time-guide',
  ],
  '5-axis-machining': [
    '3-axis-vs-5-axis-cnc-machining',
    'cnc-milling-vs-turning-whats-the-difference',
    'wire-edm-vs-cnc-milling',
  ],
  grinding: [
    'cnc-machining-surface-roughness-guide',
    'how-to-read-cnc-inspection-report',
    'anodizing-vs-powder-coating-cnc-parts',
  ],
  'quality-control': [
    'how-to-read-cnc-inspection-report',
    'cnc-purchase-order-documentation-checklist',
    'what-quality-teams-verify-before-production-release',
  ],
  edm: [
    'wire-edm-vs-cnc-milling',
    'cnc-machining-dfm-design-guide',
    'how-to-prepare-a-drawing-for-cnc-rfq',
  ],
};

export const materialArticleMap: Record<string, string[]> = {
  aluminum: [
    'aluminum-6061-vs-7075-cnc-machining',
    'stainless-steel-304-vs-316-cnc-machining',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
  'stainless-steel': [
    'stainless-steel-304-vs-316-cnc-machining',
    'lessons-from-medical-stainless-housing-seal-diameter-cpk',
    'how-to-read-cnc-inspection-report',
  ],
  'carbon-steel': [
    'how-to-reduce-cnc-machining-cost',
    'how-to-calculate-cnc-machining-cost-per-part',
    'cnc-machining-dfm-design-guide',
  ],
  titanium: [
    'titanium-cnc-machining-guide',
    'titanium-machining-suppliers-how-to-compare',
    '3-axis-vs-5-axis-cnc-machining',
  ],
  'brass-copper': [
    'how-to-calculate-cnc-machining-cost-per-part',
    'aluminum-6061-vs-7075-cnc-machining',
    'how-to-prepare-a-drawing-for-cnc-rfq',
  ],
  'engineering-plastics': [
    'peek-machining-guide',
    'guide-to-machining-pom-delrin',
    'cnc-machining-dfm-design-guide',
  ],
  'nickel-alloys': [
    'lessons-from-inconel-valve-body-nace-sour-service',
    'titanium-cnc-machining-guide',
    'how-to-verify-material-authenticity-china',
  ],
  'tool-steels': [
    'how-to-reduce-cnc-machining-cost',
    'how-to-calculate-cnc-machining-cost-per-part',
    'cnc-machining-dfm-design-guide',
  ],
  'bronze-alloys': [
    'how-to-calculate-cnc-machining-cost-per-part',
    'how-to-choose-cnc-machining-supplier-china',
    'how-to-prepare-a-drawing-for-cnc-rfq',
  ],
  magnesium: [
    'aluminum-6061-vs-7075-cnc-machining',
    'how-to-calculate-cnc-machining-cost-per-part',
    'cnc-machining-dfm-design-guide',
  ],
};

export const productArticleMap: Record<string, string[]> = {
  'valve-components': [
    'lessons-from-inconel-valve-body-nace-sour-service',
    'how-to-choose-cnc-machining-supplier-china',
    'cnc-machining-dfm-design-guide',
  ],
  'pump-components': [
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'cnc-machining-lead-time-guide',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
  couplings: [
    'cnc-milling-vs-turning-whats-the-difference',
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'cnc-machining-tolerances-complete-guide',
  ],
  'sensor-housings': [
    'anodizing-vs-powder-coating-cnc-parts',
    'cnc-machining-dfm-design-guide',
    'aluminum-6061-vs-7075-cnc-machining',
  ],
  'fixtures-tooling': [
    'cnc-milling-vs-turning-whats-the-difference',
    'cnc-machining-dfm-design-guide',
    'how-to-prepare-a-drawing-for-cnc-rfq',
  ],
  'pins-dowels': [
    'how-to-specify-tolerances-on-cnc-drawings',
    'cnc-machining-tolerances-complete-guide',
    'how-to-read-cnc-inspection-report',
  ],
  'spacers-standoffs': [
    'thread-design-cnc-machining-best-practices',
    'how-to-calculate-cnc-machining-cost-per-part',
    'cnc-machining-dfm-design-guide',
  ],
  'mounting-plates': [
    'how-to-specify-tolerances-on-cnc-drawings',
    'cnc-machining-dfm-design-guide',
    'how-to-choose-cnc-machining-supplier-china',
  ],
  'connector-bodies': [
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'cnc-machining-tolerances-complete-guide',
    'how-to-read-cnc-inspection-report',
  ],
  'actuator-components': [
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'cnc-machining-lead-time-guide',
    'how-to-choose-cnc-machining-supplier-china',
  ],
  'bushings-bearings': [
    'how-to-specify-tolerances-on-cnc-drawings',
    'how-to-calculate-cnc-machining-cost-per-part',
    'how-to-choose-cnc-machining-supplier-china',
  ],
  'roller-components': [
    'cnc-milling-vs-turning-whats-the-difference',
    'how-to-calculate-cnc-machining-cost-per-part',
    'cnc-machining-dfm-design-guide',
  ],
  'precision-shafts': [
    'cnc-milling-vs-turning-whats-the-difference',
    'how-to-specify-tolerances-on-cnc-drawings',
    'wire-edm-vs-cnc-milling',
  ],
  'custom-brackets': [
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'aluminum-6061-vs-7075-cnc-machining',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
  'housings-enclosures': [
    'anodizing-vs-powder-coating-cnc-parts',
    'aluminum-6061-vs-7075-cnc-machining',
    'cnc-machining-dfm-design-guide',
  ],
  'gears-sprockets': [
    'how-to-specify-tolerances-on-cnc-drawings',
    'cnc-machining-tolerances-complete-guide',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
  'flanges-fittings': [
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'lessons-from-inconel-valve-body-nace-sour-service',
    'how-to-verify-material-authenticity-china',
  ],
  'manifolds-valve-bodies': [
    'lessons-from-inconel-valve-body-nace-sour-service',
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'how-to-read-cnc-inspection-report',
  ],
  'custom-fasteners': [
    'thread-design-cnc-machining-best-practices',
    'how-to-specify-tolerances-on-cnc-drawings',
    'cnc-machining-rfq-checklist-for-engineers',
  ],
  'heat-sinks': [
    'aluminum-6061-vs-7075-cnc-machining',
    'anodizing-vs-powder-coating-cnc-parts',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
};

export const industryArticleMap: Record<string, string[]> = {
  automotive: [
    'automotive-ppap-cnc-machining-supplier-requirements',
    'how-to-audit-cnc-supplier-for-automotive-ppap',
    'cnc-purchase-order-documentation-checklist',
  ],
  aerospace: [
    'lessons-from-inconel-valve-body-nace-sour-service',
    'titanium-cnc-machining-guide',
    '3-axis-vs-5-axis-cnc-machining',
  ],
  'medical-devices': [
    'medical-grade-cnc-machining-iso-13485-supplier-guide',
    'what-quality-teams-verify-before-production-release',
    'how-to-read-cnc-inspection-report',
  ],
  'industrial-automation': [
    'how-to-choose-cnc-machining-supplier-china',
    'how-to-prepare-a-drawing-for-cnc-rfq',
    'cnc-machining-lead-time-guide',
  ],
  robotics: [
    'aluminum-6061-vs-7075-cnc-machining',
    '3-axis-vs-5-axis-cnc-machining',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
  'oil-gas': [
    'lessons-from-inconel-valve-body-nace-sour-service',
    'how-to-verify-material-authenticity-china',
    'how-to-audit-cnc-supplier-quality-before-first-order',
  ],
  'semiconductor-electronics': [
    'what-quality-teams-verify-before-production-release',
    'cnc-machining-surface-roughness-guide',
    'how-to-read-cnc-inspection-report',
  ],
  'marine-shipbuilding': [
    'stainless-steel-304-vs-316-cnc-machining',
    'lessons-from-inconel-valve-body-nace-sour-service',
    'how-to-audit-cnc-supplier-quality-before-first-order',
  ],
  'renewable-energy': [
    'how-to-reduce-cnc-machining-cost',
    'how-to-calculate-cnc-machining-cost-per-part',
    'how-to-choose-cnc-machining-supplier-china',
  ],
  'food-beverage': [
    'how-to-audit-cnc-supplier-quality-before-first-order',
    'stainless-steel-304-vs-316-cnc-machining',
    'lessons-from-medical-stainless-housing-seal-diameter-cpk',
  ],
  'defense-military': [
    'defense-military-cnc-machining-supplier-selection',
    'how-to-audit-cnc-supplier-quality-before-first-order',
    'cnc-purchase-order-documentation-checklist',
  ],
  'consumer-electronics': [
    'anodizing-vs-powder-coating-cnc-parts',
    'aluminum-6061-vs-7075-cnc-machining',
    'how-to-calculate-cnc-machining-cost-per-part',
  ],
};
