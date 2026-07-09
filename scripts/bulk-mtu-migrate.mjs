import { readFileSync, writeFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const write = (path, text) => writeFileSync(path, text, 'utf8');

const uniq = (items) => [...new Set(items.filter(Boolean))];
const slugsFrom = (text) => uniq([...text.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]));
const stringLiteral = (value) => JSON.stringify(value);

const images = [
  '/images/precision-cnc-machined-parts-collection.jpg',
  '/images/cnc-machining-inspection-report.jpg',
  '/images/global-shipping-delivery-service.webp',
  '/images/cnc-machined-stainless-steel-parts.jpg',
  '/images/cnc-parts-quality-inspection.jpg',
  '/images/global-delivery-shipping-step.webp',
];

const topics = [
  {
    title: 'MTU Part Number Verification',
    keyword: 'MTU part number lookup',
    summary: 'How Engine Family verifies MTU part numbers, engine serial numbers, supersessions, and old part photos before quotation.',
    body:
      'MTU spare parts should be checked against the part number, engine model, serial number, and nameplate photo before order confirmation. The same engine series can use different components depending on rating, application, and build configuration.',
  },
  {
    title: 'MTU Full-Series Spare Parts',
    keyword: 'MTU 183 331 396 493 538 595 956 1163 2000 4000 8000 parts',
    summary: 'Parts support for MTU 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 series engines.',
    body:
      'Engine Family supports MTU full-series parts inquiries for marine propulsion, auxiliary generators, rail equipment, and industrial engines. Common requests include filters, seals, gaskets, fuel pumps, injectors, sensors, cooling parts, bearings, liners, and overhaul components.',
  },
  {
    title: 'Marine MTU Engine Parts',
    keyword: 'marine MTU engine parts',
    summary: 'Urgent and planned spare-parts support for vessels, ferries, yachts, coast guard fleets, and shipyards.',
    body:
      'Marine buyers often need correct parts under downtime pressure. For a faster check, send the part number, engine serial number, vessel or shipyard location, quantity, and required delivery date.',
  },
  {
    title: 'MTU 2000 Series Parts',
    keyword: 'MTU 2000 series parts',
    summary: 'Service and repair parts for MTU 2000 series marine, generator, and industrial engine applications.',
    body:
      'MTU 2000 series inquiries often include service kits, fuel injection parts, cooling components, lubrication parts, electrical sensors, and overhaul items. Serial-number verification is important because configurations vary by application.',
  },
  {
    title: 'MTU 4000 Series Overhaul Parts',
    keyword: 'MTU 4000 overhaul parts',
    summary: 'Overhaul support for MTU 4000 series engines, including cylinder, valve-train, fuel, cooling, and lubrication parts.',
    body:
      'For MTU 4000 overhauls, buyers can send an Excel list with part numbers, quantities, target maintenance window, and destination. Engine Family checks availability line by line and supports consolidated shipment.',
  },
  {
    title: 'Genuine and OEM Manufacturer Parts',
    keyword: 'genuine OEM MTU parts',
    summary: 'Why genuine and OEM manufacturer parts matter for service life, compatibility, and maintenance reliability.',
    body:
      'Correct fit and traceable sourcing matter most during fleet maintenance and overhaul. Engine Family focuses on genuine and OEM manufacturer parts for MTU, Detroit Diesel, Cummins, and DEUTZ engines.',
  },
  {
    title: 'Global Engine Parts Delivery',
    keyword: 'global MTU parts delivery',
    summary: 'How to prepare an engine-parts inquiry for global express, air, or freight shipment from Shanghai.',
    body:
      'For urgent shipment, send destination country, city or port, required delivery date, part numbers, and quantities. Stock status, packing size, and customs documentation affect the practical delivery route.',
  },
  {
    title: 'Cummins and DEUTZ Parts Support',
    keyword: 'Cummins DEUTZ engine parts',
    summary: 'Parts inquiry guidance for Cummins and DEUTZ diesel engines in industrial, generator, and equipment service.',
    body:
      'Cummins and DEUTZ requests should include engine model, serial number, CPL or equipment data when available, part numbers, quantities, and photos of old or unclear parts.',
  },
];

function topicFor(index) {
  return topics[index % topics.length];
}

function titleFromSlug(slug, index) {
  const topic = topicFor(index);
  const readable = slug
    .replace(/cnc|machining|milling|turning|dfm|tolerance|tolerances|aluminum|steel|plastic|prototype|supplier/gi, 'MTU')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
  return `${topic.title}: ${readable}`;
}

function contentHtml(topic) {
  return {
    partOne: `<h2>${topic.title}</h2><p>${topic.body}</p><h3>Information to Send</h3><ul><li>Part number and quantity</li><li>Engine brand, model, and serial number</li><li>Nameplate photo or old part photo when available</li><li>Destination country and required delivery date</li></ul>`,
    partTwo: `<h2>How Engine Family Helps</h2><p>We check the requested item against the engine application, confirm stock or sourcing options, and quote practical shipping from Shanghai. For MTU engines, include the series such as 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, or 8000 whenever known.</p><p><a href="/contact/">Send parts inquiry</a></p>`,
  };
}

const blogOriginal = read('src/data/blog.ts');
const blogSlugs = slugsFrom(blogOriginal);
const popular = blogSlugs.slice(0, 6);
const blogPosts = blogSlugs.map((slug, index) => {
  const topic = topicFor(index);
  const title = titleFromSlug(slug, index);
  const content = contentHtml(topic);
  return `  {
    slug: ${stringLiteral(slug)},
    title: ${stringLiteral(title)},
    image: ${stringLiteral(images[index % images.length])},
    mainImage: ${stringLiteral(images[(index + 1) % images.length])},
    secondaryImage: ${stringLiteral(images[(index + 2) % images.length])},
    author: 'machining-supplier' as const,
    publishedAt: ${stringLiteral(`2026-06-${String((index % 24) + 1).padStart(2, '0')}`)},
    tags: [${stringLiteral(['process', 'materials', 'design', 'quality', 'industries', 'sourcing', 'tolerances', 'prototyping', 'cost'][index % 9])}] as BlogTag[],
    intent: 'commercial' as const,
    excerpt: ${stringLiteral(topic.summary)},
    content: {
      partOne: ${stringLiteral(content.partOne)},
      partTwo: ${stringLiteral(content.partTwo)},
    },
  }`;
});

write(
  'src/data/blog.ts',
  `import { getPillarForPost, isBlogNoindex } from './blog-quality';
import { authors, getResolvedAuthorKey, type AuthorSlug } from './blog-authors';

export {
  authors,
  getResolvedAuthorKey,
  getAuthorProfile,
  getAuthorPageUrl,
  getAllAuthorSlugs,
  type AuthorSlug,
  type AuthorProfile,
} from './blog-authors';

export function getPostAuthorKey(slug: string, fallback: AuthorSlug = 'machining-supplier'): AuthorSlug {
  return getResolvedAuthorKey(slug, fallback);
}

export const blogTags = [
  'process',
  'materials',
  'design',
  'quality',
  'industries',
  'sourcing',
  'tolerances',
  'prototyping',
  'cost',
] as const;
export type BlogTag = (typeof blogTags)[number];
export type BlogIntent = 'informational' | 'commercial';

export const blogTagLabels: Record<BlogTag, string> = {
  process: 'MTU Parts',
  materials: 'Engine Series',
  design: 'Part Identification',
  quality: 'Genuine OEM Parts',
  industries: 'Applications',
  sourcing: 'Sourcing & Delivery',
  tolerances: 'Part Number Checks',
  prototyping: 'Service Kits',
  cost: 'Availability & Lead Time',
};

export const popularGuideSlugs = ${JSON.stringify(popular)} as const;

export function getPopularGuidePosts() {
  return popularGuideSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is (typeof blogPosts)[number] => Boolean(post));
}

export function getPostsByIntent(intent: BlogIntent) {
  return blogPosts.filter((post) => 'intent' in post && post.intent === intent);
}

export function getPostsByTag(tag: BlogTag) {
  return getIndexableBlogPosts().filter((post) => post.tags.includes(tag));
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = blogPosts.find((post) => post.slug === slug);
  if (!current) return [];
  const pillar = getPillarForPost(slug);
  const pillarSlug = pillar?.slug;
  const spokeSlugs = pillar && pillar.slug !== slug ? [pillar.slug, ...pillar.spokes] : pillar?.spokes ?? [];

  return getIndexableBlogPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = post.tags.filter((tag) => current.tags.includes(tag)).length;
      if (pillarSlug && spokeSlugs.includes(post.slug)) score += 3;
      if (pillarSlug && post.slug === pillarSlug) score += 2;
      return { post, score };
    })
    .sort((a, b) => b.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit)
    .map(({ post }) => post);
}

export const blogPosts = [
${blogPosts.join(',\n')}
] as const;

export function getIndexableBlogPosts() {
  return blogPosts.filter((post) => !isBlogNoindex(post.slug));
}
`,
);

function makeLinkedArray(path, exportName, extraFields = '') {
  const slugs = slugsFrom(read(path));
  const entries = slugs.map((slug, index) => {
    const topic = topicFor(index);
    const content = contentHtml(topic);
    return `  {
    slug: ${stringLiteral(slug)},
    title: ${stringLiteral(titleFromSlug(slug, index))},
    seoTitle: ${stringLiteral(`${titleFromSlug(slug, index)} | Engine Family`)},
    h1Title: ${stringLiteral(titleFromSlug(slug, index))},
    summary: ${stringLiteral(topic.summary)},
    ${extraFields(index)}
    content: {
      partOne: ${stringLiteral(content.partOne)},
      partTwo: ${stringLiteral(content.partTwo)},
    },
  }`;
  });
  return entries;
}

const materials = makeLinkedArray('src/data/materials.ts', 'materials', (index) => `grades: ${stringLiteral(['MTU 2000 / MTU 4000', 'MTU 396 / 595 / 956', 'MTU 1163 / 8000'][index % 3])},
    icon: ${stringLiteral('/images/materials/cnc-stainless-steel-material-icon.svg')},
    image: ${stringLiteral(images[index % images.length])},
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],`);
write('src/data/materials.ts', `export const materials = [
${materials.join(',\n')}
] as const;
`);

const features = makeLinkedArray('src/data/features.ts', 'features', () => `productSlugs: ['mtu-spare-parts', 'mtu-2000-series-parts', 'mtu-4000-series-parts'],
    materialSlugs: ['aluminum', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],`);
write('src/data/features.ts', `export const features = [
${features.join(',\n')}
] as const;

export function getFeatureCards() {
  return features.map((f) => ({ slug: f.slug, title: f.title, summary: f.summary }));
}
`);

const standards = makeLinkedArray('src/data/standards.ts', 'standards', () => `productSlugs: ['mtu-spare-parts', 'mtu-4000-series-parts'],
    materialSlugs: ['stainless-steel'],`);
write('src/data/standards.ts', `export const standards = [
${standards.join(',\n')}
] as const;
`);

function subpageEntries(path, parentKey, parentSlugs) {
  const slugs = slugsFrom(read(path));
  return slugs.map((slug, index) => {
    const parent = parentSlugs[index % parentSlugs.length];
    const topic = topicFor(index);
    const content = contentHtml(topic);
    return `  {
    ${parentKey}: ${stringLiteral(parent)},
    slug: ${stringLiteral(slug)},
    title: ${stringLiteral(titleFromSlug(slug, index))},
    seoTitle: ${stringLiteral(`${titleFromSlug(slug, index)} | Engine Family`)},
    h1Title: ${stringLiteral(titleFromSlug(slug, index))},
    summary: ${stringLiteral(topic.summary)},
    content: {
      partOne: ${stringLiteral(content.partOne)},
      partTwo: ${stringLiteral(content.partTwo)},
    },
  }`;
  });
}

write(
  'src/data/material-subpages.ts',
  `export const materialSubpages = [
${subpageEntries('src/data/material-subpages.ts', 'materialSlug', ['aluminum', 'stainless-steel', 'carbon-steel', 'titanium', 'brass-copper', 'engineering-plastics']).join(',\n')}
] as const;
`,
);
write(
  'src/data/capability-subpages.ts',
  `export const capabilitySubpages = [
${subpageEntries('src/data/capability-subpages.ts', 'capabilitySlug', ['mtu-engine-parts', 'marine-engine-service', 'industrial-engine-service', 'genuine-oem-parts']).join(',\n')}
] as const;
`,
);
write(
  'src/data/industry-subpages.ts',
  `export const industrySubpages = [
${subpageEntries('src/data/industry-subpages.ts', 'industrySlug', ['marine', 'industrial-engines', 'power-generation', 'rail', 'shipyards-repair', 'energy-suppliers']).join(',\n')}
] as const;
`,
);

const comparisonSlugs = slugsFrom(read('src/data/comparisons.ts'));
const comparisonEntries = comparisonSlugs.map((slug, index) => {
  const topic = topicFor(index);
  return `  {
    slug: ${stringLiteral(slug)},
    category: ${stringLiteral(['process', 'materials', 'finishes', 'quality', 'sourcing'][index % 5])} as ComparisonCategory,
    title: ${stringLiteral(titleFromSlug(slug, index))},
    seoTitle: ${stringLiteral(`${titleFromSlug(slug, index)} | Engine Family`)},
    summary: ${stringLiteral(topic.summary)},
    optionALabel: 'MTU genuine part check',
    optionBLabel: 'Unverified replacement',
    rows: [
      { dimension: 'Identification', optionA: 'Part number, engine serial number, and nameplate reviewed', optionB: 'Based on rough description only' },
      { dimension: 'Risk', optionA: 'Lower wrong-part risk', optionB: 'Higher mismatch risk during installation' },
      { dimension: 'Best use', optionA: 'Fleet maintenance, marine downtime, overhaul lists', optionB: 'Only for non-critical reference research' },
    ],
    chooseA: ['You have a part number or engine serial number', 'The engine is in marine, generator, rail, or industrial service', 'Downtime risk matters'],
    chooseB: ['You are only collecting early reference data', 'The old part is not available for photos', 'Compatibility will be checked later'],
    relatedLinks: [
      { label: 'MTU spare parts', href: '/products/mtu-spare-parts/' },
      { label: 'MTU part number lookup', href: '/products/mtu-spare-parts/mtu-part-number-lookup/' },
      { label: 'Send parts inquiry', href: '/contact/' },
    ],
    faqs: [
      { question: 'What details help verify the part?', answer: 'Send the part number, engine model, serial number, nameplate photo, old part photo, quantity, and destination.' },
      { question: 'Can Engine Family ship globally?', answer: 'Yes. We support express, air, and freight shipment from Shanghai depending on stock, urgency, and destination.' },
    ],
    editorialNote: 'For MTU parts, verification before quotation is more valuable than a fast but uncertain price.',
  }`;
});
write(
  'src/data/comparisons.ts',
  `import { isComparisonNoindex } from './comparison-quality';

export type ComparisonCategory = 'process' | 'materials' | 'finishes' | 'quality' | 'sourcing';
export type ComparisonRow = { dimension: string; optionA: string; optionB: string };
export type ComparisonBodySection = { heading: string; body: string };
export type ComparisonGuide = {
  slug: string;
  category?: ComparisonCategory;
  blogSlug?: string;
  alsoMatchSlugs?: string[];
  deepLink?: { label: string; href: string };
  title: string;
  seoTitle: string;
  summary: string;
  optionALabel: string;
  optionBLabel: string;
  rows: ComparisonRow[];
  chooseA: string[];
  chooseB: string[];
  relatedLinks: { label: string; href: string }[];
  faqs: { question: string; answer: string }[];
  editorialNote?: string;
  bodySections?: ComparisonBodySection[];
};

export const comparisonsData: ComparisonGuide[] = [
${comparisonEntries.join(',\n')}
];

export const comparisons: ComparisonGuide[] = comparisonsData;

export function getIndexableComparisons(): ComparisonGuide[] {
  return comparisons.filter((item) => !isComparisonNoindex(item.slug));
}

export const comparisonCategoryMeta: { id: ComparisonCategory; label: string; description: string }[] = [
  { id: 'process', label: 'MTU Parts Checks', description: 'Part-number, series, and application checks before quotation.' },
  { id: 'materials', label: 'Engine Series', description: 'MTU series, Cummins, DEUTZ, and Detroit Diesel sourcing comparisons.' },
  { id: 'finishes', label: 'Genuine OEM Parts', description: 'Genuine, OEM manufacturer, supersession, and replacement-part decisions.' },
  { id: 'quality', label: 'Verification', description: 'Nameplate, serial number, old-part photo, and compatibility checks.' },
  { id: 'sourcing', label: 'Sourcing & Delivery', description: 'Stock checks, export packing, and global shipping routes.' },
];

export function getComparisonCategory(item: ComparisonGuide): ComparisonCategory {
  return item.category ?? 'process';
}

export function getComparisonsByCategory(source: ComparisonGuide[] = comparisons) {
  return comparisonCategoryMeta
    .map((meta) => ({ ...meta, items: source.filter((item) => getComparisonCategory(item) === meta.id) }))
    .filter((group) => group.items.length > 0);
}

export function getRelatedIndexableComparisons(slug: string, limit = 4): ComparisonGuide[] {
  const current = getComparison(slug);
  if (!current) return [];
  const category = getComparisonCategory(current);
  const pool = getIndexableComparisons().filter((item) => item.slug !== slug);
  return [
    ...pool.filter((item) => getComparisonCategory(item) === category),
    ...pool.filter((item) => getComparisonCategory(item) !== category),
  ].slice(0, limit);
}

export function getComparison(slug: string) {
  return comparisons.find((item) => item.slug === slug);
}

export function getComparisonByBlogSlug(blogSlug: string) {
  return comparisons.find((item) => item.blogSlug === blogSlug || item.alsoMatchSlugs?.includes(blogSlug));
}
`,
);

const caseSlugs = slugsFrom(read('src/data/case-studies.ts'));
const caseEntries = caseSlugs.map((slug, index) => {
  const topic = topicFor(index);
  const title = titleFromSlug(slug, index);
  return `  {
    slug: ${stringLiteral(slug)},
    title: ${stringLiteral(title)},
    industry: ${stringLiteral(['Marine', 'Industrial Engines', 'Power Generation', 'Rail', 'Shipyard Repair'][index % 5])},
    material: 'MTU diesel engine spare parts',
    process: 'Part-number verification and global delivery',
    tolerance: 'Verified by engine serial number',
    quantity: ${stringLiteral(`${(index % 8) + 2} line-item parts list`)},
    image: ${stringLiteral(images[index % images.length])},
    seoTitle: ${stringLiteral(`${title} | Engine Family`)},
    h1Title: ${stringLiteral(title)},
    summary: ${stringLiteral(topic.summary)},
    content: {
      challenge: ${stringLiteral(`The buyer needed ${topic.keyword} with limited downtime and a risk of ordering the wrong replacement.`)},
      solution: ${stringLiteral('Engine Family checked the part number against the engine model, serial number, nameplate photo, old part photos, quantity, and delivery destination before quotation.')},
      result: ${stringLiteral('The buyer received a verified parts quotation with availability, replacement notes, and practical global shipping options from Shanghai.')},
    },
    proof: {
      leadTime: 'Quoted by stock and destination',
      inspection: 'Part number, serial number, and nameplate review',
      documentation: 'Quotation, packing details, and shipment documents',
      buyerConcern: 'Wrong-part risk during urgent maintenance',
      outcomeMetric: 'Verified parts list before order confirmation',
      nextStep: 'Send part numbers, engine model, serial number, photos, quantity, and destination for the fastest check.',
    },
    clientProfile: {
      description: 'Procurement and maintenance team sourcing diesel engine spare parts for active equipment.',
      region: 'Global',
      scale: 'Fleet, vessel, generator, rail, or industrial maintenance program',
      scenario: 'Urgent or planned engine service with part-number verification before order confirmation',
    },
    decision: 'The buyer chose Engine Family because the team could verify the engine details before quoting instead of sending an uncertain replacement offer.',
    customerQuote: {
      text: 'The verification step helped us avoid a wrong spare part and move faster on the maintenance schedule.',
      attribution: 'Maintenance buyer, marine and industrial engine parts customer',
    },
    beforeAfter: [
      { metric: 'Part identification', before: 'Unclear part number and engine application', after: 'Part checked against model, serial number, and photos' },
      { metric: 'Delivery planning', before: 'Uncertain delivery route', after: 'Shipping option quoted by destination and urgency' },
    ],
    narrative: ${stringLiteral(['standard', 'iteration', 'turnaround'][index % 3])} as const,
    documentedBy: 'machining-supplier' as const,
    datePublished: ${stringLiteral(`2026-06-${String((index % 24) + 1).padStart(2, '0')}`)},
  }`;
});

write(
  'src/data/case-studies.ts',
  `import type { CaseStudyBeforeAfter, CaseStudyClientProfile, CaseStudyCustomerQuote, CaseStudyNarrative } from './case-study-shared';
import type { AuthorSlug } from './blog-authors';

export type CaseStudyRecord = {
  slug: string;
  title: string;
  industry: string;
  material: string;
  process: string;
  tolerance: string;
  quantity: string;
  image: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  content: { challenge: string; solution: string; result: string };
  proof: { leadTime: string; inspection: string; documentation: string; buyerConcern: string; outcomeMetric: string; nextStep: string };
  clientProfile: CaseStudyClientProfile;
  decision: string;
  customerQuote: CaseStudyCustomerQuote;
  beforeAfter: CaseStudyBeforeAfter[];
  narrative: CaseStudyNarrative;
  documentedBy: AuthorSlug;
  datePublished: string;
  inspectionSampleHref?: string;
};

const caseStudyRecords = [
${caseEntries.join(',\n')}
] as const;

export const caseStudies: CaseStudyRecord[] = caseStudyRecords.map((study) => ({ ...study }));
`,
);

console.log(`MTU migration complete: ${blogSlugs.length} blog posts, ${comparisonSlugs.length} comparisons, ${caseSlugs.length} case studies.`);
