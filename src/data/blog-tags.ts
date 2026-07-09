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
      'Guides on MTU part-number checks, engine-series identification, replacement notes, and how to prepare a usable parts inquiry.',
    description:
      'MTU parts identification guides for buyers checking part numbers, serial numbers, photos, and replacement options.',
    pillarSlug: 'cnc-milling-vs-turning-whats-the-difference',
  },
  materials: {
    intro:
      'Reference notes for engine series, spare-parts categories, and the information needed to verify fit before quotation.',
    description:
      'Engine-series and parts-category guides for MTU, Detroit Diesel, Cummins, and DEUTZ inquiries.',
    pillarSlug: 'aluminum-6061-vs-7075-cnc-machining',
  },
  design: {
    intro:
      'Inquiry-preparation guides for engine model, serial number, nameplate, old-part photos, quantities, and delivery deadlines.',
    description:
      'Parts inquiry checklists for procurement teams preparing MTU and diesel engine spare-parts requests.',
    pillarSlug: 'cnc-machining-dfm-design-guide',
  },
  quality: {
    intro:
      'Genuine, OEM manufacturer, compatible replacement, packing, and documentation notes for engine-parts buyers.',
    description:
      'Engine-parts sourcing and documentation guides for buyers who need reliable replacement components.',
    pillarSlug: 'cnc-machining-surface-roughness-guide',
  },
  industries: {
    intro:
      'Application-specific notes for marine, generator, rail, shipyard, industrial, power plant, and energy users.',
    description:
      'Engine-parts articles for marine, power generation, industrial, rail, and shipyard maintenance buyers.',
  },
  sourcing: {
    intro:
      'How to source MTU, Detroit Diesel, Cummins, and DEUTZ parts with fewer wrong-part risks and clearer delivery expectations.',
    description:
      'Engine-parts sourcing guides covering part-number verification, stock checks, replacements, and global delivery.',
    pillarSlug: 'how-to-choose-cnc-machining-supplier-china',
  },
  tolerances: {
    intro:
      'Part-number and fitment verification notes for MTU spare parts, supersessions, old parts, and engine serial numbers.',
    description:
      'MTU part-number verification guides for reducing wrong-part risk before quotation and shipment.',
    pillarSlug: 'cnc-machining-tolerances-complete-guide',
  },
  prototyping: {
    intro:
      'Service-kit, overhaul, and urgent maintenance guides for buyers who need a practical parts response quickly.',
    description:
      'MTU service-kit and urgent spare-parts guides for planned and emergency maintenance.',
    pillarSlug: 'cnc-machining-for-beginners-guide',
  },
  cost: {
    intro:
      'Availability, lead time, stock status, shipping, and replacement-route notes for engine-parts quotations.',
    description:
      'Engine-parts availability and lead-time guides for global MTU, Cummins, DEUTZ, and Detroit Diesel buyers.',
    pillarSlug: 'how-to-reduce-cnc-machining-cost',
  },
};

export function getPillarForTag(tag: BlogTag) {
  const slug = blogTagMeta[tag].pillarSlug;
  if (!slug) return undefined;
  return blogPillars.find((p) => p.slug === slug);
}
