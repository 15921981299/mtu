import { caseStudies, type CaseStudyRecord } from './case-studies';

/** Verified case studies linked from pillar hub guides (E-E-A-T proof chain). */
export const blogPillarProofSlugs: Record<string, readonly string[]> = {
  'cnc-machining-tolerances-complete-guide': ['automotive-steel-shaft', 'industrial-automation-gantry-plate'],
  'how-to-choose-cnc-machining-supplier-china': ['medical-stainless-housing', 'aerospace-aluminum-bracket'],
  'cnc-machining-dfm-design-guide': ['consumer-electronics-aluminum-heatsink', 'industrial-automation-gantry-plate'],
  'aluminum-6061-vs-7075-cnc-machining': ['aerospace-aluminum-bracket', 'medical-peek-surgical-guide'],
  'cnc-milling-vs-turning-whats-the-difference': ['aerospace-inconel-engine-bracket', 'titanium-drone-motor-mount'],
  'how-to-reduce-cnc-machining-cost': ['consumer-electronics-aluminum-heatsink', 'automotive-ev-battery-mount'],
  'cnc-machining-surface-roughness-guide': ['medical-stainless-housing', 'automotive-steel-shaft'],
  'surface-finishes-for-cnc-machined-parts': ['consumer-electronics-aluminum-heatsink', 'marine-bronze-propeller-bushing'],
  'how-to-read-cnc-machining-drawing': ['aerospace-aluminum-bracket', 'automotive-steel-shaft'],
  'cnc-machining-for-beginners-guide': ['industrial-automation-gantry-plate', 'consumer-electronics-aluminum-heatsink'],
};

/** Indexable pillar spokes — verified production examples on high-traffic guides. */
export const blogSpokeProofSlugs: Record<string, readonly string[]> = {
  'iso-2768-tolerances-explained': ['automotive-steel-shaft', 'industrial-automation-gantry-plate'],
  'how-to-specify-tolerances-on-cnc-drawings': ['aerospace-aluminum-bracket', 'automotive-steel-shaft'],
  'how-to-prepare-a-drawing-for-cnc-rfq': ['medical-stainless-housing', 'aerospace-aluminum-bracket'],
  'cnc-machining-rfq-checklist-for-engineers': ['industrial-automation-gantry-plate', 'consumer-electronics-aluminum-heatsink'],
  'stainless-steel-304-vs-316-cnc-machining': ['medical-stainless-housing', 'marine-bronze-propeller-bushing'],
  'titanium-cnc-machining-guide': ['titanium-drone-motor-mount', 'aerospace-inconel-engine-bracket'],
  '3-axis-vs-5-axis-cnc-machining': ['aerospace-aluminum-bracket', 'consumer-electronics-aluminum-heatsink'],
  'wire-edm-vs-cnc-milling': ['robotics-wire-edm-drive-gear', 'aerospace-inconel-engine-bracket'],
  'cnc-machining-lead-time-guide': ['consumer-electronics-aluminum-heatsink', 'automotive-ev-battery-mount'],
  'how-to-calculate-cnc-machining-cost-per-part': ['automotive-ev-battery-mount', 'industrial-automation-gantry-plate'],
  'how-to-read-cnc-inspection-report': ['medical-stainless-housing', 'automotive-steel-shaft'],
  'anodizing-vs-powder-coating-cnc-parts': ['consumer-electronics-aluminum-heatsink', 'marine-bronze-propeller-bushing'],
  'understanding-gdt-symbols-cnc-parts': ['aerospace-aluminum-bracket', 'automotive-steel-shaft'],
  'outsource-cnc-machining-vs-in-house-when-to-choose': ['medical-stainless-housing', 'industrial-automation-gantry-plate'],
  'lessons-from-inconel-valve-body-nace-sour-service': ['oil-gas-inconel-valve-body', 'aerospace-inconel-engine-bracket'],
  'lessons-from-medical-stainless-housing-seal-diameter-cpk': ['medical-stainless-housing', 'medical-peek-surgical-guide'],
  'how-to-audit-cnc-supplier-quality-before-first-order': ['medical-stainless-housing', 'aerospace-aluminum-bracket'],
  'china-vs-local-cnc-machining-supplier': ['aerospace-aluminum-bracket', 'consumer-electronics-aluminum-heatsink'],
};

export function getPillarProofCaseStudies(pillarHubSlug: string): CaseStudyRecord[] {
  const slugs = blogPillarProofSlugs[pillarHubSlug] ?? blogSpokeProofSlugs[pillarHubSlug];
  if (!slugs) return [];
  return slugs
    .map((slug) => caseStudies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudyRecord => Boolean(study));
}

export function isPillarHubWithProof(slug: string): boolean {
  return slug in blogPillarProofSlugs;
}

export function hasBlogProofChain(slug: string): boolean {
  return slug in blogPillarProofSlugs || slug in blogSpokeProofSlugs;
}
