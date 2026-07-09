/**
 * Audit indexable blog posts for E-E-A-T / Panda governance.
 * Run: node scripts/audit-indexable-blog.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function extractSet(src, exportName) {
  const match = src.match(new RegExp(`export const ${exportName} = new Set\\(\\[([\\s\\S]*?)\\]\\);`));
  if (!match) return new Set();
  return new Set([...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));
}

function extractWhitelistSlugs(blogQualitySrc) {
  const supplier = extractSet(blogQualitySrc, 'blogSupplierKeepIndexed');
  const spokes = extractSet(blogQualitySrc, 'blogIndexSpokeWhitelist');
  const hubs = extractPillarHubs(blogQualitySrc);
  return new Set([...hubs, ...supplier, ...spokes]);
}

function extractPillarHubs(src) {
  const hubs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
  return new Set(hubs.slice(0, 10));
}

function extractPillarSpokes(src) {
  const spokes = [];
  for (const block of src.matchAll(/spokes: \[([\s\S]*?)\]/g)) {
    for (const m of block[1].matchAll(/'([^']+)'/g)) spokes.push(m[1]);
  }
  return new Set(spokes);
}

function extractPillarAuthorById(src) {
  const match = src.match(/const pillarAuthorById: Record<string, AuthorSlug> = \{([\s\S]*?)\};/);
  const map = {};
  if (match) {
    for (const m of match[1].matchAll(/(\w[\w-]*): '([^']+)'/g)) {
      map[m[1]] = m[2];
    }
  }
  return map;
}

function extractPostAuthorOverrides(src) {
  const match = src.match(/const postAuthorOverrides: Partial<Record<string, AuthorSlug>> = \{([\s\S]*?)\};/);
  const map = {};
  if (match) {
    for (const m of match[1].matchAll(/'([^']+)': '([^']+)'/g)) {
      map[m[1]] = m[2];
    }
  }
  return map;
}

function extractIndexableAuthorBySlug(src) {
  const match = src.match(/export const indexableAuthorBySlug: Partial<Record<string, AuthorSlug>> = \{([\s\S]*?)\};/);
  const map = {};
  if (match) {
    for (const m of match[1].matchAll(/'([^']+)': '([^']+)'/g)) {
      map[m[1]] = m[2];
    }
  }
  return map;
}

function extractPillarIds(src) {
  const ids = [];
  for (const block of src.matchAll(/\{\s*\n\s*id: '([^']+)'[\s\S]*?slug: '([^']+)'[\s\S]*?spokes: \[([\s\S]*?)\]/g)) {
    const spokeSlugs = [...block[3].matchAll(/'([^']+)'/g)].map((m) => m[1]);
    ids.push({ id: block[1], hubSlug: block[2], spokes: spokeSlugs });
  }
  return ids;
}

const blogQualitySrc = read('src/data/blog-quality.ts');
const blogAuthorsSrc = read('src/data/blog-authors.ts');
const blogAuthorRulesSrc = read('src/data/blog-author-rules.ts');
const blogSrc = read('src/data/blog.ts');

const blogIndexWhitelist = extractWhitelistSlugs(blogQualitySrc);
const pillarHubs = extractPillarHubs(blogQualitySrc);
const pillarSpokes = extractPillarSpokes(blogQualitySrc);
const pillarDefs = extractPillarIds(blogQualitySrc);
const pillarAuthorById = extractPillarAuthorById(blogAuthorsSrc);
const postAuthorOverrides = extractPostAuthorOverrides(blogAuthorsSrc);
const indexableAuthorBySlug = extractIndexableAuthorBySlug(blogAuthorRulesSrc);

const spokeToPillarId = new Map();
for (const p of pillarDefs) {
  for (const spoke of p.spokes) spokeToPillarId.set(spoke, p.id);
  spokeToPillarId.set(p.hubSlug, p.id);
}

function isBlogNoindex(slug) {
  return !blogIndexWhitelist.has(slug);
}

function getResolvedAuthorKey(slug) {
  if (postAuthorOverrides[slug]) return postAuthorOverrides[slug];
  if (indexableAuthorBySlug[slug]) return indexableAuthorBySlug[slug];
  const pillarId = spokeToPillarId.get(slug);
  if (pillarId && pillarAuthorById[pillarId]) return pillarAuthorById[pillarId];
  return 'machining-supplier';
}

function getPillarForPost(slug) {
  return pillarDefs.find((p) => p.hubSlug === slug || p.spokes.includes(slug));
}

const raw = blogSrc.slice(blogSrc.indexOf('export const blogPosts = ['));
const inner = raw.slice(raw.indexOf('[') + 1, raw.lastIndexOf('];'));
const blocks = inner.split(/\r?\n  \},\r?\n  \{/);

const posts = blocks.map((block, i) => {
  const chunk = i === 0 ? block.replace(/^\s*\{/, '') : block;
  const slug = chunk.match(/slug: '([^']+)'/)?.[1] ?? '';
  const title = chunk.match(/title: '([^']+)'/)?.[1] ?? '';
  const authorField = chunk.match(/author: '([^']+)'/)?.[1] ?? 'machining-supplier';
  const partOne = block.match(/partOne: `([\s\S]*?)`,/)?.[1] ?? '';
  const partTwo = block.match(/partTwo: `([\s\S]*?)`/)?.[1] ?? '';
  const html = partOne + partTwo;
  const caseStudyLinks = [...html.matchAll(/href="\/case-studies\/([^"/]+)\/?"/g)].map((m) => m[1]);
  const lessonsFrom = slug.startsWith('lessons-from-');
  const pillar = getPillarForPost(slug);
  const resolvedAuthor = getResolvedAuthorKey(slug);
  const noindex = isBlogNoindex(slug);
  const indexable = !noindex;
  const isPillarHub = pillarHubs.has(slug);
  const isPillarSpoke = pillarSpokes.has(slug);
  const personAuthor = resolvedAuthor === 'wei-chen' || resolvedAuthor === 'lisa-huang';

  return {
    slug,
    title,
    authorField,
    resolvedAuthor,
    personAuthor,
    indexable,
    noindex,
    isPillarHub,
    isPillarSpoke,
    pillarId: pillar?.id ?? null,
    lessonsFrom,
    caseStudyLinks: [...new Set(caseStudyLinks)],
    hasCaseStudyLink: caseStudyLinks.length > 0,
  };
});

const indexable = posts.filter((p) => p.indexable);
const noindex = posts.filter((p) => p.noindex);
const teamAuthorIndexable = indexable.filter((p) => !p.personAuthor);
const noCaseStudyIndexable = indexable.filter((p) => !p.hasCaseStudyLink && !p.lessonsFrom);

const lines = [
  '# Indexable blog audit',
  '',
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  '',
  '## Summary',
  '',
  `| Metric | Count |`,
  `| --- | ---: |`,
  `| Total posts | ${posts.length} |`,
  `| **Indexable** | **${indexable.length}** |`,
  `| noindex | ${noindex.length} |`,
  `| Indexable with person author (wei-chen / lisa-huang) | ${indexable.length - teamAuthorIndexable.length} |`,
  `| Indexable still on team author | ${teamAuthorIndexable.length} |`,
  `| Indexable without case-study link | ${noCaseStudyIndexable.length} |`,
  `| Whitelist configured | ${blogIndexWhitelist.size} |`,
  '',
  '## Indexable posts (whitelist only)',
  '',
  '| Slug | Author | Pillar | Case studies |',
  '| --- | --- | --- | --- |',
];

for (const p of indexable.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const pillarLabel = p.isPillarHub ? `hub:${p.pillarId}` : p.isPillarSpoke ? `spoke:${p.pillarId}` : '—';
  const cs = p.lessonsFrom ? 'lessons post' : p.caseStudyLinks.length ? p.caseStudyLinks.join(', ') : '—';
  lines.push(`| ${p.slug} | ${p.resolvedAuthor} | ${pillarLabel} | ${cs} |`);
}

lines.push('', '## Indexable on team author (review for person byline)', '');
for (const p of teamAuthorIndexable.sort((a, b) => a.slug.localeCompare(b.slug))) {
  lines.push(`- \`${p.slug}\``);
}

lines.push('', '## Indexable without case-study proof link', '');
for (const p of noCaseStudyIndexable.sort((a, b) => a.slug.localeCompare(b.slug))) {
  lines.push(`- \`${p.slug}\``);
}

lines.push('', '## Pillar hubs (should stay indexed)', '');
for (const p of indexable.filter((x) => x.isPillarHub).sort((a, b) => a.slug.localeCompare(b.slug))) {
  lines.push(`- \`${p.slug}\` → ${p.resolvedAuthor}`);
}

const mdPath = path.join(root, 'docs/indexable-blog-audit.md');
const jsonPath = path.join(root, 'docs/indexable-blog-audit.json');
fs.mkdirSync(path.dirname(mdPath), { recursive: true });
fs.writeFileSync(mdPath, lines.join('\n'));
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      summary: {
        total: posts.length,
        indexable: indexable.length,
        noindex: noindex.length,
        whitelistSize: blogIndexWhitelist.size,
        teamAuthorIndexable: teamAuthorIndexable.length,
        noCaseStudyIndexable: noCaseStudyIndexable.length,
      },
      indexable,
      teamAuthorIndexable: teamAuthorIndexable.map((p) => p.slug),
      noCaseStudyIndexable: noCaseStudyIndexable.map((p) => p.slug),
    },
    null,
    2,
  ),
);

console.log(`Indexable: ${indexable.length} / ${posts.length}`);
console.log(`Team-author indexable: ${teamAuthorIndexable.length}`);
console.log(`Wrote ${mdPath}`);
console.log(`Wrote ${jsonPath}`);
