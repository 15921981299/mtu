import { caseStudies, type CaseStudyRecord } from './case-studies';

/** Verified case studies linked from pillar hub guides (E-E-A-T proof chain). */
export const blogPillarProofSlugs: Record<string, readonly string[]> = {
};

/** Indexable pillar spokes — verified production examples on high-traffic guides. */
export const blogSpokeProofSlugs: Record<string, readonly string[]> = {
  'iso-2768-tolerances-explained': ['automotive-steel-shaft', 'industrial-automation-gantry-plate'],
  'lessons-from-inconel-valve-body-nace-sour-service': ['oil-gas-inconel-valve-body', 'aerospace-inconel-engine-bracket'],
  'lessons-from-medical-stainless-housing-seal-diameter-cpk': ['medical-stainless-housing', 'medical-peek-surgical-guide'],
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
