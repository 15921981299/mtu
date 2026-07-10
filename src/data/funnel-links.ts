import { comparisons, getComparison } from './comparisons';
import { isComparisonNoindex } from './comparison-quality';
import { getCompareSlugsForCaseStudy } from './industry-proof';

export type FunnelNextStep = {
  label: string;
  href: string;
  hint?: string;
};

/** Stage-based “next step” links for blog and hub pages. */
export const funnelNextStepsByStage: Record<
  import('./funnel').FunnelStage,
  FunnelNextStep[]
> = {
  awareness: [
    {
      label: 'Request a quote',
      href: '/contact/?source=blog',
      hint: 'Free parts verification in 24 hours',
    },
    {
      label: 'Compare materials & processes',
      href: '/compare/',
      hint: 'Side-by-side decision tables',
    },
    {
      label: 'Inquiry Checklist',
      href: '/resources/dfm-checklist/',
      hint: 'Free engineering reference',
    },
    {
      label: 'Engine Parts Glossary',
      href: '/glossary/',
      hint: 'Terms for parts inquiries',
    },
  ],
  comparison: [
    {
      label: 'How to choose a China engine parts supplier',
      href: '/blog/how-to-choose-cnc-machining-supplier-china/',
      hint: 'Evaluation checklist',
    },
    {
      label: 'Inspection report samples',
      href: '/resources/inspection-samples/',
      hint: 'Redacted supplier documents & cert layouts',
    },
    {
      label: 'Customer case studies',
      href: '/case-studies/',
      hint: 'Real tolerances achieved',
    },
    {
      label: 'Parts pricing guide',
      href: '/resources/process-selection/',
      hint: 'Quote cost drivers',
    },
  ],
  selection: [
    {
      label: 'Compare similar options',
      href: '/compare/',
      hint: 'Structured comparison hub',
    },
    {
      label: 'Relevant case studies',
      href: '/case-studies/',
      hint: 'Proof by industry',
    },
    {
      label: 'Prepare your RFQ drawing',
      href: '/blog/how-to-prepare-a-drawing-for-cnc-rfq/',
      hint: 'What suppliers need',
    },
  ],
  quote: [
    {
      label: 'Payment & shipping terms',
      href: '/terms/payment/',
      hint: 'Before you place PO',
    },
    {
      label: 'Sample policy',
      href: '/terms/samples/',
      hint: 'First-article workflow',
    },
    {
      label: 'Quality certifications',
      href: '/certifications/',
      hint: 'ISO 9001 & inspection',
    },
  ],
  signing: [
    {
      label: 'Payment terms',
      href: '/terms/payment/',
      hint: 'T/T, milestones, Incoterms',
    },
    {
      label: 'Shipping terms',
      href: '/terms/shipping/',
      hint: 'Lead time & logistics',
    },
    {
      label: 'More case studies',
      href: '/case-studies/',
      hint: 'Similar projects',
    },
  ],
  service: [
    {
      label: 'Request a quote',
      href: '/contact/?source=resource',
      hint: 'Send your part number',
    },
    {
      label: 'Parts verification guide',
      href: '/resources/inspection-samples/',
      hint: 'ISO 2768 & GD&T basics',
    },
    {
      label: 'Compare hub',
      href: '/compare/',
      hint: 'Decision-stage tables',
    },
    {
      label: 'Inspection report samples',
      href: '/resources/inspection-samples/',
      hint: 'Redacted supplier documents & cert layouts',
    },
  ],
};

export const materialCompareMap: Record<string, string[]> = {
  aluminum: ['aluminum-6061-vs-7075', '6061-vs-5052-aluminum', 'titanium-vs-aluminum'],
  'stainless-steel': ['stainless-304-vs-316', '303-vs-304-stainless', '316-vs-17-4ph-stainless'],
  titanium: ['grade-2-vs-grade-5-titanium', 'titanium-vs-aluminum'],
  'carbon-steel': ['4140-vs-1045-steel', '4140-vs-1018-steel', 'hot-rolled-vs-cold-rolled-steel'],
  'brass-copper': ['brass-vs-copper', 'bronze-vs-brass'],
  'engineering-plastics': ['pom-vs-nylon', 'delrin-vs-peek', 'peek-vs-ptfe'],
  'nickel-alloys': ['inconel-vs-stainless-steel'],
  magnesium: ['magnesium-vs-aluminum'],
  'bronze-alloys': ['bronze-vs-brass'],
  'tool-steels': ['carbide-vs-hss-tooling', 'case-hardening-vs-through-hardening'],
};

export const capabilityCompareMap: Record<string, string[]> = {
  'cnc-milling': ['cnc-milling-vs-turning', '3-axis-vs-5-axis', 'roughing-vs-finishing-cnc'],
  'cnc-turning': ['cnc-milling-vs-turning', 'swiss-vs-conventional-turning', 'turning-vs-milling-cost'],
  '5-axis-machining': ['3-axis-vs-5-axis', 'simultaneous-vs-positional-5-axis', '4-axis-vs-3-axis-milling'],
  edm: ['wire-edm-vs-cnc-milling', 'sinker-edm-vs-wire-edm'],
  grinding: ['honing-vs-grinding', 'bead-blast-vs-as-machined'],
  'quality-control': ['cmm-vs-manual-inspection', 'ra-vs-rz-surface-roughness', 'coordinate-tolerance-vs-gdt'],
};

export const caseStudyCompareMap: Record<string, string[]> = {
  'aerospace-aluminum-bracket': ['aluminum-6061-vs-7075', '3-axis-vs-5-axis', 'simultaneous-vs-positional-5-axis'],
  'medical-stainless-housing': ['stainless-304-vs-316', 'passivation-vs-electropolishing', 'cmm-vs-manual-inspection'],
  'robotics-aluminum-end-effector': ['aluminum-6061-vs-7075', 'sample-vs-production-machining', '6061-vs-5052-aluminum'],
  'automotive-steel-shaft': ['4140-vs-1045-steel', 'case-hardening-vs-through-hardening', 'honing-vs-grinding'],
  'titanium-drone-motor-mount': ['grade-2-vs-grade-5-titanium', 'titanium-vs-aluminum', '3-axis-vs-5-axis'],
  'industrial-pom-bushing': ['pom-vs-nylon', 'delrin-vs-peek', 'sample-vs-production-machining'],
  'oil-gas-inconel-valve-body': ['inconel-vs-stainless-steel', '316-vs-17-4ph-stainless', 'cnc-machining-vs-die-casting'],
  'semiconductor-vacuum-chamber-adapter': ['mic6-vs-extruded-aluminum', 'ra-vs-rz-surface-roughness', 'cmm-vs-manual-inspection'],
  'marine-bronze-propeller-bushing': ['bronze-vs-brass', 'brass-vs-copper', 'stainless-304-vs-316'],
  'renewable-energy-wind-coupling-hub': ['4140-vs-1018-steel', 'case-hardening-vs-through-hardening', 'hot-rolled-vs-cold-rolled-steel'],
  'food-beverage-sanitary-clamp-fitting': ['stainless-304-vs-316', 'passivation-vs-electropolishing', '303-vs-316-stainless'],
  'defense-aluminum-optics-mount': ['aluminum-6061-vs-7075', 'true-position-vs-concentricity', 'cmm-vs-manual-inspection'],
  'consumer-electronics-aluminum-heatsink': ['aluminum-6061-vs-7075', 'anodizing-type-ii-vs-iii', 'sample-vs-production-machining'],
  'medical-peek-surgical-guide': ['delrin-vs-peek', 'peek-vs-ptfe', 'cmm-vs-manual-inspection'],
  'aerospace-inconel-engine-bracket': ['inconel-vs-stainless-steel', 'grade-2-vs-grade-5-titanium', '3-axis-vs-5-axis'],
  'automotive-ev-battery-mount': ['aluminum-6061-vs-7075', 'magnesium-vs-aluminum', 'sample-vs-production-machining'],
  'industrial-automation-gantry-plate': ['hot-rolled-vs-cold-rolled-steel', '1045-vs-1018-steel', 'cnc-milling-vs-turning'],
  'robotics-wire-edm-drive-gear': ['wire-edm-vs-cnc-milling', 'sinker-edm-vs-wire-edm', 'carbide-vs-hss-tooling'],
};

/** Subpage slug → compare slugs when the subpage title matches a comparison topic. */
export const materialSubpageCompareMap: Record<string, string[]> = {
  '6061-vs-7075-selection': ['aluminum-6061-vs-7075', 'titanium-vs-aluminum'],
  'mic6-cast-tooling-plate': ['mic6-vs-extruded-aluminum', 'aluminum-6061-vs-7075'],
  '303-vs-304-vs-316': ['303-vs-304-stainless', '303-vs-316-stainless', 'stainless-304-vs-316'],
  '17-4ph-machining-guide': ['316-vs-17-4ph-stainless', 'stainless-304-vs-316'],
  '4140-vs-1045-vs-1018': ['4140-vs-1045-steel', '4140-vs-1018-steel', '1045-vs-1018-steel'],
  'case-hardening-explained': ['case-hardening-vs-through-hardening', 'carburizing-vs-nitriding', 'induction-hardening-vs-carburizing'],
  'grade-2-vs-grade-5': ['grade-2-vs-grade-5-titanium', 'titanium-vs-aluminum'],
  'peek-vs-ptfe': ['peek-vs-ptfe', 'delrin-vs-peek'],
  'polycarbonate-acrylic-machining': ['polycarbonate-vs-acrylic'],
  'copper-vs-brass-machining': ['brass-vs-copper', 'bronze-vs-brass'],
};

export function getComparisonsForSlugs(slugs: string[], indexableOnly = true) {
  return slugs
    .map((slug) => getComparison(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter((item) => !indexableOnly || !isComparisonNoindex(item.slug));
}

export function getComparisonsForMaterial(materialSlug: string) {
  return getComparisonsForSlugs(materialCompareMap[materialSlug] ?? []);
}

export function getComparisonsForCapability(capabilitySlug: string) {
  return getComparisonsForSlugs(capabilityCompareMap[capabilitySlug] ?? []);
}

export function getComparisonsForCaseStudy(caseStudySlug: string, limit = 6) {
  const slugs = [
    ...new Set([
      ...getCompareSlugsForCaseStudy(caseStudySlug, limit),
      ...(caseStudyCompareMap[caseStudySlug] ?? []),
    ]),
  ].slice(0, limit);
  return getComparisonsForSlugs(
    slugs.filter((slug) => comparisons.some((item) => item.slug === slug)),
  );
}

export function getComparisonsForMaterialSubpage(subpageSlug: string) {
  return getComparisonsForSlugs(materialSubpageCompareMap[subpageSlug] ?? []);
}

export function getComparisonsForProduct(
  materialSlugs: readonly string[] = [],
  capabilitySlugs: readonly string[] = [],
  limit = 3,
) {
  const slugs = new Set<string>();
  for (const materialSlug of materialSlugs) {
    for (const slug of materialCompareMap[materialSlug] ?? []) slugs.add(slug);
  }
  for (const capabilitySlug of capabilitySlugs) {
    for (const slug of capabilityCompareMap[capabilitySlug] ?? []) slugs.add(slug);
  }
  return getComparisonsForSlugs([...slugs].slice(0, limit));
}

export const industryCompareMap: Record<string, string[]> = {
  automotive: ['cpk-vs-ppk-capability', 'sample-vs-production-machining', '4140-vs-1045-steel'],
  aerospace: ['3-axis-vs-5-axis', 'titanium-vs-aluminum', 'aluminum-6061-vs-7075'],
  'medical-devices': ['stainless-304-vs-316', 'cmm-vs-manual-inspection', 'passivation-vs-electropolishing'],
  'industrial-automation': ['cnc-milling-vs-turning', 'hot-rolled-vs-cold-rolled-steel', 'sample-vs-production-machining'],
  robotics: ['aluminum-6061-vs-7075', '6061-vs-5052-aluminum', 'sample-vs-production-machining'],
  'oil-gas': ['inconel-vs-stainless-steel', '316-vs-17-4ph-stainless', 'cnc-machining-vs-die-casting'],
  'semiconductor-electronics': ['mic6-vs-extruded-aluminum', 'ra-vs-rz-surface-roughness', 'cmm-vs-manual-inspection'],
  'marine-shipbuilding': ['bronze-vs-brass', 'stainless-304-vs-316', 'brass-vs-copper'],
  'renewable-energy': ['4140-vs-1018-steel', 'case-hardening-vs-through-hardening', 'hot-rolled-vs-cold-rolled-steel'],
  'food-beverage': ['stainless-304-vs-316', 'passivation-vs-electropolishing', '303-vs-316-stainless'],
  'defense-military': ['aluminum-6061-vs-7075', 'true-position-vs-concentricity', 'cmm-vs-manual-inspection'],
  'consumer-electronics': ['aluminum-6061-vs-7075', 'anodizing-type-ii-vs-iii', 'sample-vs-production-machining'],
};

export function getComparisonsForIndustry(industrySlug: string) {
  return getComparisonsForSlugs(industryCompareMap[industrySlug] ?? []);
}
