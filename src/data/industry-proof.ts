import { caseStudies } from './case-studies';

/** Maps regulated industry standards to verifiable on-site proof (case studies, audits). */
export const industryProof = [
  {
    standardSlug: 'food-grade-parts',
    standardTitle: 'Food-Grade Parts',
    caseStudySlugs: ['food-beverage-sanitary-clamp-fitting'],
    compareSlugs: [
      'stainless-304-vs-316',
      '303-vs-304-stainless',
      '303-vs-316-stainless',
      'passivation-vs-electropolishing',
      'bead-blast-vs-as-machined',
      'ra-vs-rz-surface-roughness',
      'manual-deburr-vs-tumble-deburr',
    ],
    auditBlogSlug: 'how-to-audit-cnc-supplier-quality-before-first-order',
  },
  {
    standardSlug: 'medical-grade-parts',
    standardTitle: 'Medical-Grade Parts',
    caseStudySlugs: ['medical-stainless-housing', 'medical-peek-surgical-guide'],
    compareSlugs: [
      'stainless-304-vs-316',
      '316-vs-17-4ph-stainless',
      'cmm-vs-manual-inspection',
      'cpk-vs-ppk-capability',
      'passivation-vs-electropolishing',
      'peek-vs-ptfe',
      'delrin-vs-peek',
      'true-position-vs-concentricity',
      'coordinate-tolerance-vs-gdt',
      'ra-vs-rz-surface-roughness',
    ],
    auditBlogSlug: 'medical-grade-cnc-machining-iso-13485-supplier-guide',
  },
  {
    standardSlug: 'aerospace-grade-parts',
    standardTitle: 'Aerospace-Grade Parts',
    caseStudySlugs: ['aerospace-aluminum-bracket', 'aerospace-inconel-engine-bracket'],
    compareSlugs: [
      '3-axis-vs-5-axis',
      '4-axis-vs-3-axis-milling',
      'simultaneous-vs-positional-5-axis',
      'titanium-vs-aluminum',
      'grade-2-vs-grade-5-titanium',
      'aluminum-6061-vs-7075',
      'wire-edm-vs-cnc-milling',
      'coordinate-tolerance-vs-gdt',
      'true-position-vs-concentricity',
      'flatness-vs-parallelism',
      'roughing-vs-finishing-cnc',
    ],
    auditBlogSlug: 'as9100-aerospace-machining-quality',
  },
  {
    standardSlug: 'automotive-ppap-parts',
    standardTitle: 'Automotive PPAP Parts',
    caseStudySlugs: ['automotive-steel-shaft', 'automotive-ev-battery-mount'],
    compareSlugs: [
      'cpk-vs-ppk-capability',
      'prototype-vs-production-machining',
      'cmm-vs-manual-inspection',
      'express-vs-standard-lead-time',
      '4140-vs-1045-steel',
      '4140-vs-1018-steel',
      '1045-vs-1018-steel',
      '4340-vs-4140-steel',
      'hot-rolled-vs-cold-rolled-steel',
      'turning-vs-milling-cost',
      'honing-vs-grinding',
      '6082-vs-6061-aluminum',
      'iso-2768-m-vs-f',
      'concentricity-vs-runout',
      'case-hardening-vs-through-hardening',
      'induction-hardening-vs-carburizing',
      'carburizing-vs-nitriding',
      'nickel-plating-vs-zinc-plating',
      'black-oxide-vs-zinc-plating',
    ],
    auditBlogSlug: 'automotive-ppap-cnc-machining-supplier-requirements',
  },
  {
    standardSlug: 'oil-gas-nace-parts',
    standardTitle: 'Oil & Gas NACE Parts',
    caseStudySlugs: ['oil-gas-inconel-valve-body'],
    compareSlugs: [
      'inconel-vs-stainless-steel',
      '316-vs-17-4ph-stainless',
      'grade-2-vs-grade-5-titanium',
      'sinker-edm-vs-wire-edm',
      'thread-milling-vs-tapping',
      'wire-edm-vs-cnc-milling',
    ],
    auditBlogSlug: 'how-to-verify-material-authenticity-china',
  },
] as const;

/** Case-study proof for compare pages without a regulated-industry standard mapping. */
export const comparisonDirectProof = {
  'cnc-milling-vs-turning': {
    label: 'Mill vs turn on production parts',
    caseStudySlugs: ['medical-stainless-housing', 'automotive-steel-shaft'],
  },
  'china-vs-local-cnc-supplier': {
    label: 'China sourcing validation',
    caseStudySlugs: ['robotics-aluminum-end-effector'],
    auditBlogSlug: 'how-to-choose-cnc-machining-supplier-china',
    auditBlogLabel: 'How to choose a China CNC supplier →',
  },
  'outsource-vs-in-house-machining': {
    label: 'Outsource decision context',
    caseStudySlugs: ['robotics-aluminum-end-effector'],
    auditBlogSlug: 'outsource-cnc-machining-vs-in-house-when-to-choose',
    auditBlogLabel: 'Outsource vs in-house machining guide →',
  },
  'swiss-vs-conventional-turning': {
    label: 'High-precision turning projects',
    caseStudySlugs: ['automotive-steel-shaft', 'marine-bronze-propeller-bushing'],
  },
  'brass-vs-copper': {
    label: 'Copper alloy machining',
    caseStudySlugs: ['marine-bronze-propeller-bushing'],
  },
  'bronze-vs-brass': {
    label: 'Bronze bearing applications',
    caseStudySlugs: ['marine-bronze-propeller-bushing'],
  },
  'pom-vs-nylon': {
    label: 'Machined plastic bushings',
    caseStudySlugs: ['industrial-pom-bushing'],
  },
  'nylon-vs-ptfe': {
    label: 'Wear plastic selection',
    caseStudySlugs: ['industrial-pom-bushing'],
  },
  'laser-cutting-vs-cnc-milling': {
    label: 'Plate vs prismatic machining',
    caseStudySlugs: ['industrial-automation-gantry-plate'],
  },
  'cnc-machining-vs-die-casting': {
    label: 'Machined production parts',
    caseStudySlugs: ['automotive-ev-battery-mount', 'consumer-electronics-aluminum-heatsink'],
  },
  'cnc-vs-metal-3d-printing': {
    label: 'Subtractive vs additive outcomes',
    caseStudySlugs: ['titanium-drone-motor-mount', 'medical-peek-surgical-guide'],
  },
  'investment-casting-vs-cnc': {
    label: 'Machined hubs and couplings',
    caseStudySlugs: ['renewable-energy-wind-coupling-hub'],
  },
  'mic6-vs-extruded-aluminum': {
    label: 'Flat plate vacuum & fixture work',
    caseStudySlugs: ['semiconductor-vacuum-chamber-adapter', 'industrial-automation-gantry-plate'],
  },
  'anodizing-type-ii-vs-iii': {
    label: 'Anodized aluminum assemblies',
    caseStudySlugs: ['semiconductor-vacuum-chamber-adapter', 'consumer-electronics-aluminum-heatsink'],
  },
  'anodizing-vs-powder-coating': {
    label: 'Aluminum finish outcomes',
    caseStudySlugs: ['consumer-electronics-aluminum-heatsink'],
  },
  'step-file-vs-iges': {
    label: 'RFQ file preparation',
    caseStudySlugs: [],
    auditBlogSlug: 'how-to-prepare-a-drawing-for-cnc-rfq',
    auditBlogLabel: 'Drawing & CAD prep for RFQ →',
  },
  'iso-vs-ansi-drawing-standards': {
    label: 'Drawing standards on RFQ',
    caseStudySlugs: [],
    auditBlogSlug: 'how-to-prepare-a-drawing-for-cnc-rfq',
    auditBlogLabel: 'Drawing standards checklist →',
  },
  'carbide-vs-hss-tooling': {
    label: 'Hard-material production runs',
    caseStudySlugs: ['oil-gas-inconel-valve-body'],
  },
  'cnc-vs-manual-machining': {
    label: 'Production vs manual prototypes',
    caseStudySlugs: ['marine-bronze-propeller-bushing'],
  },
  'magnesium-vs-aluminum': {
    label: 'Lightweight structural parts',
    caseStudySlugs: ['titanium-drone-motor-mount', 'defense-aluminum-optics-mount'],
  },
  'polycarbonate-vs-acrylic': {
    label: 'Machined engineering plastics',
    caseStudySlugs: ['industrial-pom-bushing', 'medical-peek-surgical-guide'],
  },
  '6061-vs-5052-aluminum': {
    label: 'Sheet and structural aluminum',
    caseStudySlugs: ['robotics-aluminum-end-effector', 'semiconductor-vacuum-chamber-adapter'],
  },
  'ip65-vs-ip68-enclosures': {
    label: 'Sealed aluminum housings',
    caseStudySlugs: ['consumer-electronics-aluminum-heatsink', 'semiconductor-vacuum-chamber-adapter'],
  },
  'sinker-edm-vs-wire-edm': {
    label: 'EDM on hardened and exotic alloys',
    caseStudySlugs: ['robotics-wire-edm-drive-gear', 'oil-gas-inconel-valve-body'],
  },
} as const satisfies Record<
  string,
  {
    label: string;
    caseStudySlugs: readonly string[];
    auditBlogSlug?: string;
    auditBlogLabel?: string;
  }
>;

/** Audit / sourcing guides for case studies outside the five regulated industry standards. */
export const caseStudyAuditLinks = {
  'robotics-aluminum-end-effector': {
    auditBlogSlug: 'robotics-startup-cnc-parts-sourcing-guide',
    auditBlogLabel: 'Robotics CNC sourcing guide →',
  },
  'robotics-wire-edm-drive-gear': {
    auditBlogSlug: 'wire-edm-edm-machining-services-supplier-guide',
    auditBlogLabel: 'Wire EDM supplier guide →',
  },
  'industrial-pom-bushing': {
    auditBlogSlug: 'industrial-automation-cnc-parts-sourcing-guide',
    auditBlogLabel: 'Industrial automation sourcing →',
  },
  'semiconductor-vacuum-chamber-adapter': {
    auditBlogSlug: 'semiconductor-equipment-cnc-machining-suppliers',
    auditBlogLabel: 'Semiconductor supplier selection →',
  },
  'marine-bronze-propeller-bushing': {
    auditBlogSlug: 'marine-offshore-cnc-machining-corrosion-resistant-parts',
    auditBlogLabel: 'Marine corrosion-resistant machining →',
  },
  'renewable-energy-wind-coupling-hub': {
    auditBlogSlug: 'renewable-energy-cnc-machining-wind-solar-parts',
    auditBlogLabel: 'Renewable energy CNC sourcing →',
  },
  'defense-aluminum-optics-mount': {
    auditBlogSlug: 'defense-military-cnc-machining-supplier-selection',
    auditBlogLabel: 'Defense supplier selection →',
  },
  'consumer-electronics-aluminum-heatsink': {
    auditBlogSlug: 'consumer-electronics-aluminum-enclosure-cnc-suppliers',
    auditBlogLabel: 'Consumer electronics CNC sourcing →',
  },
  'industrial-automation-gantry-plate': {
    auditBlogSlug: 'industrial-automation-cnc-parts-sourcing-guide',
    auditBlogLabel: 'Industrial automation sourcing →',
  },
  'titanium-drone-motor-mount': {
    auditBlogSlug: 'titanium-machining-suppliers-how-to-compare',
    auditBlogLabel: 'Titanium machining supplier guide →',
  },
} as const satisfies Record<string, { auditBlogSlug: string; auditBlogLabel: string }>;

export const verificationDocuments = [
  {
    label: 'CMM dimensional report',
    detail: 'Ballooned drawing with instrument ID, measured values, and pass/fail per characteristic.',
    sampleId: 'cmm-report',
  },
  {
    label: 'EN 10204 3.1 material certificate',
    detail: 'Mill heat-lot traceability with chemical and mechanical test results.',
    sampleId: 'material-cert',
  },
  {
    label: 'First article inspection (FAI)',
    detail: 'AS9102-style layout when required — forms 1–3 or customer template.',
    sampleId: 'fai-package',
  },
  {
    label: 'Process capability study (Cpk)',
    detail: 'Critical dimension SPC summary for production release or PPAP.',
    sampleId: null,
  },
  {
    label: 'Certificate of conformance (CoC)',
    detail: 'Lot-level statement tying PO, drawing revision, and inspection scope.',
    sampleId: 'coc',
  },
] as const;

export function getIndustryProof(standardSlug: string) {
  return industryProof.find((item) => item.standardSlug === standardSlug);
}

export function getCaseStudiesForStandard(standardSlug: string) {
  const proof = getIndustryProof(standardSlug);
  if (!proof) return [];
  const slugs = proof.caseStudySlugs as readonly string[];
  return caseStudies.filter((study) => slugs.includes(study.slug));
}

export function getFeaturedCaseStudies() {
  const slugs = new Set<string>(industryProof.flatMap((item) => [...item.caseStudySlugs]));
  return caseStudies.filter((study) => slugs.has(study.slug));
}

export type ComparisonProofContext = {
  standardSlug?: string;
  standardTitle: string;
  caseStudies: (typeof caseStudies)[number][];
  auditBlogSlug?: string;
  auditBlogLabel?: string;
};

function caseStudiesBySlugs(slugs: readonly string[]) {
  return caseStudies.filter((study) => slugs.includes(study.slug));
}

/** Industry standards and case studies tied to a comparison page slug. */
export function getProofForComparison(compareSlug: string): ComparisonProofContext[] {
  const fromIndustry: ComparisonProofContext[] = industryProof
    .filter((item) => (item.compareSlugs as readonly string[]).includes(compareSlug))
    .map((item) => ({
      standardSlug: item.standardSlug,
      standardTitle: item.standardTitle,
      caseStudies: getCaseStudiesForStandard(item.standardSlug),
      auditBlogSlug: item.auditBlogSlug,
      auditBlogLabel: 'Supplier audit guide for this industry →',
    }))
    .filter((ctx) => ctx.caseStudies.length > 0 || ctx.auditBlogSlug);

  const direct = comparisonDirectProof[compareSlug as keyof typeof comparisonDirectProof];
  const hasIndustry = fromIndustry.length > 0;
  if (direct && (!hasIndustry || direct.caseStudySlugs.length > 0)) {
    const studies = caseStudiesBySlugs(direct.caseStudySlugs);
    const addsUniqueStudies =
      studies.some((s) => !fromIndustry.some((ctx) => ctx.caseStudies.some((c) => c.slug === s.slug)));
    const auditBlogSlug = 'auditBlogSlug' in direct ? direct.auditBlogSlug : undefined;
    const auditBlogLabel =
      'auditBlogLabel' in direct ? direct.auditBlogLabel : 'Related procurement guide →';
    if ((!hasIndustry || addsUniqueStudies) && (studies.length > 0 || auditBlogSlug)) {
      fromIndustry.push({
        standardTitle: direct.label,
        caseStudies: studies,
        auditBlogSlug,
        auditBlogLabel,
      });
    }
  }

  return fromIndustry;
}

/** Compare slugs that cite this case study (industry + direct proof reverse lookup). */
export function getCompareSlugsForCaseStudy(caseStudySlug: string, limit = 6): string[] {
  const slugs: string[] = [];

  for (const entry of industryProof) {
    if (!(entry.caseStudySlugs as readonly string[]).includes(caseStudySlug)) continue;
    for (const compareSlug of entry.compareSlugs) {
      if (!slugs.includes(compareSlug)) slugs.push(compareSlug);
    }
  }

  for (const [compareSlug, direct] of Object.entries(comparisonDirectProof)) {
    if ((direct.caseStudySlugs as readonly string[]).includes(caseStudySlug) && !slugs.includes(compareSlug)) {
      slugs.push(compareSlug);
    }
  }

  return slugs.slice(0, limit);
}

export type CaseStudyIndustryContext = {
  standardSlug?: string;
  standardTitle?: string;
  auditBlogSlug?: string;
  auditBlogLabel?: string;
  compareSlugs: readonly string[];
};

/** Full proof context for case study detail — industry standard + all linked comparisons. */
export function getCaseStudyProofContext(caseStudySlug: string): CaseStudyIndustryContext {
  const entry = industryProof.find((item) =>
    (item.caseStudySlugs as readonly string[]).includes(caseStudySlug),
  );
  const compareSlugs = getCompareSlugsForCaseStudy(caseStudySlug, 8);
  const standaloneAudit =
    caseStudyAuditLinks[caseStudySlug as keyof typeof caseStudyAuditLinks];

  if (entry) {
    return {
      standardSlug: entry.standardSlug,
      standardTitle: entry.standardTitle,
      auditBlogSlug: entry.auditBlogSlug,
      auditBlogLabel: 'Supplier audit guide for this industry →',
      compareSlugs,
    };
  }

  if (standaloneAudit) {
    return {
      compareSlugs,
      auditBlogSlug: standaloneAudit.auditBlogSlug,
      auditBlogLabel: standaloneAudit.auditBlogLabel,
    };
  }

  return { compareSlugs };
}

/** Standards / audit context when case study maps to a regulated industry program. */
export function getIndustryContextForCaseStudy(caseStudySlug: string): CaseStudyIndustryContext | undefined {
  const ctx = getCaseStudyProofContext(caseStudySlug);
  if (!ctx.standardSlug) return undefined;
  return ctx;
}
