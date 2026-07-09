import { blogPillars } from './blog-quality';
import type { BlogTag } from './blog';

export type BlogTagMeta = {
  intro: string;
  description: string;
  /** Matching pillar hub slug, if any */
  pillarSlug?: string;
};

export const blogTagMeta: Record<BlogTag, BlogTagMeta> = {
  process: {
    intro:
      'Guides on CNC milling, turning, 5-axis, EDM, grinding, and when to pick each process for your part geometry and tolerance needs. Start with the process pillar hub, then drill into focused articles below.',
    description:
      'CNC process selection guides — milling vs turning, 3-axis vs 5-axis, wire EDM, Swiss turning, and grinding. Written for engineers choosing the right machining method.',
    pillarSlug: 'cnc-milling-vs-turning-whats-the-difference',
  },
  materials: {
    intro:
      'Alloy selection, machinability trade-offs, and material-specific tolerances for aluminum, stainless, titanium, plastics, and more. Use the materials hub as your starting point.',
    description:
      'CNC machining material guides — 6061 vs 7075 aluminum, 304 vs 316 stainless, titanium, PEEK, and alloy selection for RFQs.',
    pillarSlug: 'aluminum-6061-vs-7075-cnc-machining',
  },
  design: {
    intro:
      'Design for manufacturability (DFM), drawing preparation, wall thickness, threads, and RFQ-ready CAD packages. Reduce rework before you quote.',
    description:
      'CNC DFM and design guides — drawing prep, tolerancing on prints, thin walls, threads, and cost-saving design changes before machining.',
    pillarSlug: 'cnc-machining-dfm-design-guide',
  },
  quality: {
    intro:
      'Inspection reports, surface finish specs, ISO 9001 expectations, and what quality teams should verify before production release.',
    description:
      'CNC quality and inspection guides — CMM reports, Ra/Rz surface finish, ISO 9001, FAI, and incoming QA checklists for machined parts.',
    pillarSlug: 'cnc-machining-surface-roughness-guide',
  },
  industries: {
    intro:
      'Application-specific machining notes for aerospace, medical, automotive, oil & gas, robotics, and other regulated or high-reliability industries.',
    description:
      'Industry CNC machining articles — aerospace, medical devices, automotive, oil & gas, semiconductor, and robotics part requirements.',
  },
  sourcing: {
    intro:
      'How to vet CNC suppliers, audit quality before first PO, compare China vs local partners, and communicate specs that prevent costly misunderstandings.',
    description:
      'CNC supplier sourcing guides — vet China partners, pre-award audits, MOQ reality, communication checklists, and RFQ best practices.',
    pillarSlug: 'how-to-choose-cnc-machining-supplier-china',
  },
  tolerances: {
    intro:
      'ISO 2768, achievable CNC limits, cost impact of tight tolerances, and how to specify dimensions on drawings without overpaying.',
    description:
      'CNC tolerance guides — ISO 2768, linear and geometric tolerances, achievable limits, and how tolerance choice affects machining cost.',
    pillarSlug: 'cnc-machining-tolerances-complete-guide',
  },
  prototyping: {
    intro:
      'Rapid prototypes, revision cycles, low-volume runs, and when to move from prototype to production with the same supplier.',
    description:
      'CNC prototyping guides — quick-turn aluminum parts, iteration after trade shows, and scaling from prototype to production batches.',
    pillarSlug: 'cnc-machining-for-beginners-guide',
  },
  cost: {
    intro:
      'Unit price drivers, MOQ and setup costs, lead time trade-offs, and practical ways to reduce per-piece cost without sacrificing critical specs.',
    description:
      'CNC machining cost and lead time guides — MOQ, setup charges, tolerance-driven pricing, and how to shorten quote-to-ship cycles.',
    pillarSlug: 'how-to-reduce-cnc-machining-cost',
  },
};

export function getPillarForTag(tag: BlogTag) {
  const slug = blogTagMeta[tag].pillarSlug;
  if (!slug) return undefined;
  return blogPillars.find((p) => p.slug === slug);
}
