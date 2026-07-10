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
    name: 'Engine Family',
    role: 'Diesel Engine Parts Support Team',
    jobTitle: 'Engine Parts Support Team',
    bio: 'Engine Family helps international buyers identify and source MTU, Detroit Diesel, Cummins, and DEUTZ engine parts. Our team checks part numbers, engine serial numbers, nameplate photos, replacement notes, and shipping requirements before quotation.',
    credentials: [
      'MTU full-series parts support for marine, generator, rail, and industrial applications',
      'Part-number, serial-number, and old-part photo verification before quotation',
      'Global express, air, and freight shipment coordination from Shanghai',
    ],
    yearsExperience: 15,
    type: 'organization',
    avatarUrl: '/images/authors/machining-supplier.svg',
    sameAs: mergeSameAs('machining-supplier', [site.url, `${site.url}/about/`]),
  },
  'wei-chen': {
    slug: 'wei-chen',
    name: 'Wei Chen',
    role: 'MTU Parts Identification Specialist',
    jobTitle: 'MTU Parts Identification Specialist',
    bio: 'Wei supports MTU part-number checks, engine-series matching, and replacement confirmation for marine, power generation, and industrial maintenance buyers.',
    credentials: [
      'MTU 183, 396, 595, 956, 1163, 2000, 4000, and 8000 series inquiry support',
      'Serial-number and nameplate review for spare-parts compatibility',
      'Supports urgent marine and generator downtime orders',
    ],
    yearsExperience: 12,
    type: 'person',
    avatarUrl: '/images/authors/wei-chen.svg',
    sameAs: mergeSameAs('wei-chen', [`${site.url}/blog/author/wei-chen/`, `${site.url}/about/`, site.url]),
  },
  'lisa-huang': {
    slug: 'lisa-huang',
    name: 'Lisa Huang',
    role: 'Engine Parts Sourcing Lead',
    jobTitle: 'Engine Parts Sourcing Lead',
    bio: 'Lisa coordinates engine-parts sourcing, supplier communication, packing documents, and shipment planning for global maintenance buyers.',
    credentials: [
      'Genuine and OEM manufacturer parts sourcing coordination',
      'Packing, documentation, and export shipment support',
      'Line-by-line checks for overhaul and maintenance parts lists',
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
