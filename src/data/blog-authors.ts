import { blogPillars, getPillarForPost } from './blog-quality';
import { indexableAuthorBySlug } from './blog-author-rules';
import { site } from './site';

export type AuthorSlug = 'machining-supplier' | 'wei-chen' | 'lisa-huang';

export type AuthorProfile = {
  slug: AuthorSlug;
  name: string;
  role: string;
  jobTitle: string;
  bio: string;
  credentials: readonly string[];
  yearsExperience: number;
  type: 'person' | 'organization';
  avatarUrl: string;
  /** External profile URLs for schema sameAs */
  sameAs?: readonly string[];
};

function mergeSameAs(slug: AuthorSlug, urls: readonly string[]): readonly string[] {
  const extra =
    slug === 'wei-chen'
      ? site.authorSocial.weiChenLinkedIn
      : slug === 'lisa-huang'
        ? site.authorSocial.lisaHuangLinkedIn
        : site.social.linkedin;
  return extra ? [...urls, extra] : urls;
}

export const authors = {
  'machining-supplier': {
    slug: 'machining-supplier',
    name: 'Machining Supplier',
    role: 'CNC Manufacturing & Engineering Team',
    jobTitle: 'Engineering Team',
    bio: 'We are a China-based CNC machining partner with 15+ years of combined shop-floor, mechanical design, and procurement experience. Our team operates and sources from ISO 9001 facilities — not a trading desk. Every RFQ gets engineer-led DFM review, CMM-backed inspection, and material traceability when your industry requires it.',
    credentials: [
      '15+ years CNC milling, turning, and multi-axis production',
      'ISO 9001 partner-facility quality processes with documented inspection reports',
      'Engineer-led DFM on every quote — not sales-only responses',
    ],
    yearsExperience: 15,
    type: 'organization',
    avatarUrl: '/images/authors/machining-supplier.svg',
    sameAs: mergeSameAs('machining-supplier', [site.url, `${site.url}/about/`]),
  },
  'wei-chen': {
    slug: 'wei-chen',
    name: 'Wei Chen',
    role: 'Lead CNC Manufacturing Engineer',
    jobTitle: 'Lead CNC Manufacturing Engineer',
    bio: 'Wei has spent 12 years on CNC shop floors in Shenzhen and Dongguan — programming 3-axis through 5-axis jobs, reviewing customer drawings for DFM, and quoting tolerances that match real machine capability. He writes our process, tolerance, and design guides from first-hand production experience.',
    credentials: [
      '12+ years CNC milling, turning, and 5-axis programming',
      'DFM review on 2,000+ customer RFQs across aerospace, robotics, and industrial parts',
      'Specializes in tolerance stack-up, setup minimization, and cost-vs-precision trade-offs',
    ],
    yearsExperience: 12,
    type: 'person',
    avatarUrl: '/images/authors/wei-chen.svg',
    sameAs: mergeSameAs('wei-chen', [`${site.url}/blog/author/wei-chen/`, `${site.url}/about/`, site.url]),
  },
  'lisa-huang': {
    slug: 'lisa-huang',
    name: 'Lisa Huang',
    role: 'Quality & Sourcing Lead',
    jobTitle: 'Quality & Sourcing Lead',
    bio: 'Lisa leads incoming QC workflows, supplier audits, and material traceability for regulated industries. She documents what buyers should verify before a production PO — CMM reports, EN 10204 certs, and communication red flags — based on audits across ISO 9001 partner facilities.',
    credentials: [
      '10+ years quality engineering and China supplier qualification',
      'CMM inspection planning and first-article sign-off',
      'Medical, aerospace, and industrial material traceability programs',
    ],
    yearsExperience: 10,
    type: 'person',
    avatarUrl: '/images/authors/lisa-huang.svg',
    sameAs: mergeSameAs('lisa-huang', [
      `${site.url}/blog/author/lisa-huang/`,
      `${site.url}/certifications/`,
      site.url,
    ]),
  },
} as const satisfies Record<AuthorSlug, AuthorProfile>;

const pillarAuthorById: Record<string, AuthorSlug> = {
  tolerances: 'wei-chen',
  sourcing: 'lisa-huang',
  dfm: 'wei-chen',
  materials: 'lisa-huang',
  process: 'wei-chen',
  'cost-leadtime': 'wei-chen',
  quality: 'lisa-huang',
  finishes: 'lisa-huang',
  drawings: 'wei-chen',
  'getting-started': 'wei-chen',
};

/** Explicit overrides for high-traffic posts outside pillar clusters. */
const postAuthorOverrides: Partial<Record<string, AuthorSlug>> = {
  'cnc-milling-vs-turning-whats-the-difference': 'wei-chen',
  'how-to-reduce-cnc-machining-cost': 'wei-chen',
  'aluminum-6061-vs-7075-cnc-machining': 'lisa-huang',
  'asme-y14-5-gdt-standard': 'wei-chen',
  'bearing-journal-tolerances-h6-h7': 'wei-chen',
  'iso-286-tolerances-fits-explained': 'wei-chen',
};

export function getResolvedAuthorKey(slug: string, fallback: AuthorSlug = 'machining-supplier'): AuthorSlug {
  if (postAuthorOverrides[slug]) return postAuthorOverrides[slug]!;
  if (indexableAuthorBySlug[slug]) return indexableAuthorBySlug[slug]!;
  const pillar = getPillarForPost(slug);
  if (pillar) {
    const hub = blogPillars.find((p) => p.slug === slug);
    const pillarId = hub?.id ?? blogPillars.find((p) => p.spokes.includes(slug))?.id;
    if (pillarId && pillarAuthorById[pillarId]) return pillarAuthorById[pillarId];
  }
  return fallback;
}

export function getPostAuthorKey(slug: string, storedAuthor: AuthorSlug): AuthorSlug {
  return getResolvedAuthorKey(slug, storedAuthor);
}

export function getAuthorProfile(slug: AuthorSlug): AuthorProfile {
  return authors[slug];
}

export function getAuthorPageUrl(authorSlug: AuthorSlug): string {
  return `${site.url}/blog/author/${authorSlug}/`;
}

export function getAllAuthorSlugs(): AuthorSlug[] {
  return Object.keys(authors) as AuthorSlug[];
}
