import fs from 'node:fs';
import path from 'node:path';

const blogPath = path.join(process.cwd(), 'src/data/blog.ts');
const src = fs.readFileSync(blogPath, 'utf8');

const raw = src.slice(src.indexOf('export const blogPosts = ['));
const inner = raw.slice(raw.indexOf('[') + 1, raw.lastIndexOf('];'));
const blocks = inner.split(/\r?\n  \},\r?\n  \{/);
const data = blocks.map((block, i) => {
  const chunk = i === 0 ? block.replace(/^\s*\{/, '') : block;
  const slug = chunk.match(/slug: '([^']+)'/)?.[1] ?? '';
  const partOne = block.match(/partOne: `([\s\S]*?)`,/)?.[1] ?? '';
  const partTwo = block.match(/partTwo: `([\s\S]*?)`/)?.[1] ?? '';
  const html = partOne + partTwo;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  const firstPerson = /\b(I |I'|we |our shop|shop floor|I once|I remember|I've|we've)\b/i.test(text);
  const hasProcStory = /procurement manager once told me/.test(html);
  const hasTitaniumStory = /medical device startup that came to us with a titanium housing/.test(html);
  const hasAnyStory = /Real Story From Our Shop/.test(html);
  const isDefinition = /^(what-is-|understanding-|what-tolerances-|what-materials-|what-file-|can-cnc-)/.test(slug);
  const hasTable = /<table/.test(html);
  const hasNumbers = /\d+%|\$\d|±\d|\d+mm|\d+ hours?/i.test(text);

  let score = 0;
  if (words >= 800) score += 12;
  else if (words >= 500) score += 8;
  else if (words >= 350) score += 5;
  else score += 2;
  if (firstPerson) score += 10;
  if (hasNumbers) score += 8;
  if (hasTable) score += 4;
  if (!hasAnyStory) score += 6;
  else if (hasProcStory || hasTitaniumStory) score -= 8;
  if (isDefinition && words < 450) score -= 6;

  return {
    slug,
    words,
    firstPerson,
    hasProcStory,
    hasTitaniumStory,
    hasAnyStory,
    isDefinition,
    score,
  };
});

const dupProc = data.filter((d) => d.hasProcStory).map((d) => d.slug);
const dupTi = data.filter((d) => d.hasTitaniumStory).map((d) => d.slug);
const noindexCandidates = data.filter((d) => d.score < 30).map((d) => d.slug);
const spokes = data.filter((d) => d.score >= 30 && d.score < 45 && d.isDefinition).map((d) => d.slug);

console.log('Total posts:', data.length);
console.log('\nProcurement story duplicates (' + dupProc.length + '):');
console.log(dupProc.join('\n'));
console.log('\nTitanium DFM story duplicates (' + dupTi.length + '):');
console.log(dupTi.join('\n'));
console.log('\nScore < 30 (noindex candidates): ' + noindexCandidates.length);
console.log(noindexCandidates.join('\n'));
console.log('\nDefinition spokes (30-44 score): ' + spokes.length);

const outPath = path.join(process.cwd(), 'docs/blog-quality-audit.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), posts: data, noindexCandidates, dupProc, dupTi }, null, 2),
);
console.log('\nWrote', outPath);
