/**
 * Content quality governance (Panda / HCU / AI Mode).
 * - Pillars: hub pages that anchor topic clusters (Hub & Spoke).
 * - blogIndexWhitelist: ~40 curated URLs for index + sitemap; all other blog posts are noindex, follow.
 * - blogNoindexSlugs / blogLowIntentSupplierSlugs: legacy catalog (still useful for content audits).
 */

export type BlogPillar = {
  id: string;
  title: string;
  slug: string;
  description: string;
  spokes: string[];
};

export const blogPillars: BlogPillar[] = [
  {
    id: 'tolerances',
    title: 'CNC Tolerances & Specifications',
    slug: 'cnc-machining-tolerances-complete-guide',
    description: 'Standard vs precision tolerances, ISO 2768, cost trade-offs, and how to specify on drawings.',
    spokes: [
      'iso-2768-tolerances-explained',
      'how-to-specify-tolerances-on-cnc-drawings',
      'what-tolerances-can-cnc-machining-achieve',
      'how-to-maintain-tight-tolerances-across-batches',
      'how-to-handle-thermal-expansion-machining',
    ],
  },
  {
    id: 'sourcing',
    title: 'Choosing & Auditing CNC Suppliers',
    slug: 'how-to-choose-cnc-machining-supplier-china',
    description: 'Vet China CNC partners, spot trading companies, and run pre-award quality audits.',
    spokes: [
      'china-vs-local-cnc-machining-supplier',
      'how-to-audit-cnc-supplier-quality-before-first-order',
      'how-to-audit-cnc-supplier-for-automotive-ppap',
      'cnc-purchase-order-documentation-checklist',
      'how-to-verify-material-authenticity-china',
      'how-to-communicate-with-cnc-supplier',
      'china-cnc-machining-regions-comparison-guide',
      'cnc-sourcing-advice-from-manufacturing-experts',
    ],
  },
  {
    id: 'dfm',
    title: 'Design for Manufacturability (DFM)',
    slug: 'cnc-machining-dfm-design-guide',
    description: 'Design rules that cut cost and rework — cavities, walls, threads, and setup minimization.',
    spokes: [
      'how-to-prepare-a-drawing-for-cnc-rfq',
      'what-is-dfm-design-for-manufacturing',
      'cnc-machining-rfq-checklist-for-engineers',
      'cnc-machining-thin-wall-design-tips',
      'thread-design-cnc-machining-best-practices',
    ],
  },
  {
    id: 'materials',
    title: 'CNC Machining Materials',
    slug: 'aluminum-6061-vs-7075-cnc-machining',
    description: 'Alloy selection, machinability, and when to upgrade from 6061 to 7075, stainless, or titanium.',
    spokes: [
      'stainless-steel-304-vs-316-cnc-machining',
      'titanium-cnc-machining-guide',
      'titanium-vs-aluminum-machining',
      'guide-to-machining-6061-aluminum',
      'guide-to-machining-316-stainless-steel',
      'peek-machining-guide',
    ],
  },
  {
    id: 'process',
    title: 'CNC Processes & Machine Selection',
    slug: 'cnc-milling-vs-turning-whats-the-difference',
    description: 'Pick milling, turning, 5-axis, EDM, or grinding based on geometry and tolerance needs.',
    spokes: [
      'what-is-5-axis-cnc-machining',
      '3-axis-vs-5-axis-cnc-machining',
      'wire-edm-vs-cnc-milling',
      'swiss-machining-vs-conventional-turning',
      'cnc-machining-vs-3d-printing-metal',
      'how-to-design-parts-for-5-axis-machining',
    ],
  },
  {
    id: 'cost-leadtime',
    title: 'Cost, MOQ & Lead Time',
    slug: 'how-to-reduce-cnc-machining-cost',
    description: 'Tolerance-driven cost, MOQ reality, and how to shorten quote-to-ship cycles.',
    spokes: [
      'cnc-machining-lead-time-guide',
      'how-to-reduce-cnc-machining-lead-time',
      'how-to-calculate-cnc-machining-cost-per-part',
      'how-long-does-cnc-machining-take',
      'what-is-cnc-machining-moq',
    ],
  },
  {
    id: 'quality',
    title: 'Inspection & Quality Control',
    slug: 'cnc-machining-surface-roughness-guide',
    description: 'Ra/Rz specs, CMM reports, FAI, and what to verify before production release.',
    spokes: [
      'how-to-read-cnc-inspection-report',
      'what-is-iso-9001-cnc-machining',
      'what-quality-teams-verify-before-production-release',
      'cnc-purchase-order-documentation-checklist',
      'how-to-achieve-consistent-surface-finish',
      'how-to-prevent-work-hardening-stainless',
    ],
  },
  {
    id: 'finishes',
    title: 'Surface Finishes & Coatings',
    slug: 'surface-finishes-for-cnc-machined-parts',
    description: 'Anodize, powder coat, passivation, and how finish choice affects lead time.',
    spokes: [
      'anodizing-vs-powder-coating-cnc-parts',
      'how-to-select-cnc-surface-finish',
      'how-to-design-parts-for-anodizing',
    ],
  },
  {
    id: 'drawings',
    title: 'Drawings, GD&T & Standards',
    slug: 'how-to-read-cnc-machining-drawing',
    description: 'Read machining drawings, GD&T callouts, and ISO vs ANSI conventions.',
    spokes: [
      'iso-vs-ansi-drawing-standards-cnc',
      'understanding-gdt-symbols-cnc-parts',
      'what-file-formats-for-cnc-quote',
      'what-is-machining-drawing-checklist',
    ],
  },
  {
    id: 'getting-started',
    title: 'CNC Machining Basics',
    slug: 'cnc-machining-for-beginners-guide',
    description: 'Start here if you are new to RFQs, processes, and supplier communication.',
    spokes: [
      'cnc-machining-terminology-50-terms',
      'understanding-cnc-machine-types',
      'what-materials-can-be-cnc-machined',
      'outsource-cnc-machining-vs-in-house-when-to-choose',
    ],
  },
];

/**
 * High-intent supplier content — keep indexed (cert/MOQ/audit/selection, not generic listicles).
 */
export const blogSupplierKeepIndexed = new Set([
  'how-to-choose-cnc-machining-supplier-china',
  'how-to-audit-cnc-supplier-quality-before-first-order',
  'titanium-machining-suppliers-how-to-compare',
  'low-volume-cnc-machining-suppliers-no-moq',
  'medical-grade-cnc-machining-iso-13485-supplier-guide',
  'automotive-ppap-cnc-machining-supplier-requirements',
  'defense-military-cnc-machining-supplier-selection',
  'china-vs-local-cnc-machining-supplier',
  'how-to-verify-material-authenticity-china',
  'how-to-communicate-with-cnc-supplier',
  'china-cnc-machining-regions-comparison-guide',
  'cnc-sourcing-advice-from-manufacturing-experts',
  'how-to-audit-cnc-supplier-for-automotive-ppap',
  'cnc-purchase-order-documentation-checklist',
  'what-quality-teams-verify-before-production-release',
  'lessons-from-inconel-valve-body-nace-sour-service',
  'lessons-from-medical-stainless-housing-seal-diameter-cpk',
]);

/**
 * Best pillar spokes to index (~14) — rest stay noindex, follow for Panda site-average protection.
 * Target total indexable blog URLs: ~40 (10 hubs + 17 supplier + 14 spokes, minus hub overlap).
 */
export const blogIndexSpokeWhitelist = new Set([
  'iso-2768-tolerances-explained',
  'how-to-specify-tolerances-on-cnc-drawings',
  'how-to-prepare-a-drawing-for-cnc-rfq',
  'cnc-machining-rfq-checklist-for-engineers',
  'stainless-steel-304-vs-316-cnc-machining',
  'titanium-cnc-machining-guide',
  '3-axis-vs-5-axis-cnc-machining',
  'wire-edm-vs-cnc-milling',
  'cnc-machining-lead-time-guide',
  'how-to-calculate-cnc-machining-cost-per-part',
  'how-to-read-cnc-inspection-report',
  'anodizing-vs-powder-coating-cnc-parts',
  'understanding-gdt-symbols-cnc-parts',
  'outsource-cnc-machining-vs-in-house-when-to-choose',
]);

/** Curated index whitelist — only these blog posts get index,follow + sitemap inclusion. */
export const blogIndexWhitelist = new Set([
  ...blogPillars.map((pillar) => pillar.slug),
  ...blogSupplierKeepIndexed,
  ...blogIndexSpokeWhitelist,
]);

export function isBlogIndexWhitelisted(slug: string): boolean {
  return blogIndexWhitelist.has(slug);
}

/** DTC-style best/top listicles and thin industry supplier templates — noindex, follow. */
export const blogLowIntentSupplierSlugs = new Set([
  'top-cnc-machining-companies-for-aerospace-parts',
  'best-cnc-shops-for-aluminum-prototypes',
  'best-cnc-machining-companies-china-comparison-guide',
  'top-10-materials-for-cnc-machined-parts',
  'cnc-turning-suppliers-for-precision-shafts',
  'stainless-steel-cnc-machining-suppliers-guide',
  'ev-battery-component-cnc-machining-suppliers',
  'wire-edm-edm-machining-services-supplier-guide',
  'oil-gas-cnc-machining-suppliers-valve-downhole',
  'semiconductor-equipment-cnc-machining-suppliers',
  'cnc-grinding-services-supplier-selection-guide',
  'peek-cnc-machining-suppliers-comparison-guide',
  'hydraulic-manifold-cnc-machining-suppliers',
  'consumer-electronics-aluminum-enclosure-cnc-suppliers',
  'food-grade-cnc-machining-suppliers-fda-requirements',
  'uav-drone-cnc-machining-suppliers-structural-parts',
  'aluminum-heat-sink-cnc-machining-suppliers',
  'aerospace-grade-cnc-machining-supplier-selection-guide',
  'inconel-nickel-alloy-cnc-machining-suppliers',
  'custom-bracket-cnc-machining-suppliers-guide',
  'spur-helical-gear-cnc-machining-suppliers',
  'sae-hydraulic-flange-fitting-cnc-machining-suppliers',
  'custom-fastener-cnc-machining-suppliers',
  'swiss-screw-machining-suppliers-precision-parts',
  'valve-body-cnc-machining-suppliers-selection-guide',
  'pump-component-cnc-machining-suppliers-guide',
  'shaft-coupling-cnc-machining-suppliers-precision-hubs',
  'sensor-housing-cnc-machining-suppliers-ip-ratings',
  'machining-fixture-jig-cnc-suppliers-custom-tooling',
  'precision-pin-dowel-cnc-machining-suppliers-tolerances',
  'magnesium-alloy-cnc-machining-suppliers-lightweight-parts',
  'cnc-spacer-standoff-machining-suppliers-guide',
  'mounting-plate-cnc-machining-suppliers-flatness-guide',
  'connector-body-cnc-machining-suppliers-precision-housings',
  'actuator-component-cnc-machining-suppliers-guide',
  'precision-bushing-bearing-cnc-machining-suppliers',
  'bronze-alloy-cnc-machining-suppliers-bearing-grade',
  'tool-steel-cnc-machining-suppliers-hardened-components',
  'roller-component-cnc-machining-suppliers-conveyor-parts',
]);

/** Thin definition posts that overlap /glossary/ — noindex, follow (Panda site-average protection). */
export const blogNoindexSlugs = new Set([
  'what-is-cpk-process-capability-index',
  'what-is-runout-and-tir',
  'what-is-flatness-tolerance',
  'what-is-true-position-gdt',
  'what-is-concentricity-vs-runout',
  'what-is-gdt-geometric-dimensioning-tolerancing',
  'what-is-surface-roughness-ra-rz',
  'what-is-roughing-vs-finishing-cnc',
  'what-is-cnc-deburring',
  'what-is-knurling-machining',
  'what-is-broaching-machining',
  'what-is-honing-vs-grinding',
  'what-is-lapping-polishing-machining',
  'what-is-heat-treatment-annealing',
  'what-is-case-hardening',
  'what-is-passivation-stainless-steel',
  'what-is-electropolishing',
  'what-is-black-oxide-coating',
  'what-is-anodizing-type-ii-vs-iii',
  'what-is-powder-coating-process',
  'what-is-bead-blasting-finish',
  'what-is-cnc-fixture-design',
  'what-is-cnc-machine-setup-cost',
  'what-is-cnc-machining-cost-per-hour',
  'what-is-the-best-cnc-software',
  'what-is-best-aluminum-for-cnc',
  'understanding-g-code-basics-designers',
  'what-is-cmm-machine-guide',
  'cnc-machining-complete-guide',
]);

const spokeToPillar = new Map<string, BlogPillar>();
for (const pillar of blogPillars) {
  for (const spoke of pillar.spokes) {
    spokeToPillar.set(spoke, pillar);
  }
}

export function isLowIntentSupplierPost(slug: string): boolean {
  if (blogSupplierKeepIndexed.has(slug)) return false;
  if (blogLowIntentSupplierSlugs.has(slug)) return true;
  if (/^(best-|top-\d|top-cnc-machining-companies)/.test(slug)) return true;
  if (/-suppliers(-|$)/.test(slug) || /-supplier-(selection|requirements|guide)/.test(slug)) {
    return true;
  }
  return false;
}

export function isBlogNoindex(slug: string): boolean {
  return !isBlogIndexWhitelisted(slug);
}

export function getPillarForPost(slug: string): BlogPillar | undefined {
  if (blogPillars.some((p) => p.slug === slug)) {
    return blogPillars.find((p) => p.slug === slug);
  }
  return spokeToPillar.get(slug);
}

export function getPillarBySlug(pillarSlug: string): BlogPillar | undefined {
  return blogPillars.find((p) => p.slug === pillarSlug);
}

export function getPillarSpokeSlugs(pillarSlug: string): string[] {
  return getPillarBySlug(pillarSlug)?.spokes ?? [];
}
