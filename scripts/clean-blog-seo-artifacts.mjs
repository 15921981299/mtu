/**
 * Remove duplicate "Real Cost of Precision" blocks (keep canonical on iso-2768)
 * and orphan surface-finish table on Cpk article.
 */
import fs from 'node:fs';
import path from 'node:path';

const blogPath = path.join(process.cwd(), 'src/data/blog.ts');
let src = fs.readFileSync(blogPath, 'utf8');

const CANONICAL_SLUG = 'iso-2768-tolerances-explained';

function stripRealCostBlock(html) {
  const marker = '<h2>The Real Cost of Precision</h2>';
  if (!html.includes(marker)) return html;
  const start = html.indexOf(marker);
  let end = html.indexOf('<h2>', start + marker.length);
  if (end === -1) end = html.length;
  return (html.slice(0, start) + html.slice(end)).replace(/\n{3,}/g, '\n\n');
}

// Strip duplicate blocks outside canonical post
const slugRegex = /slug: '([^']+)'[\s\S]*?content: \{[\s\S]*?partOne: `([\s\S]*?)`,[\s\S]*?partTwo: `([\s\S]*?)`,/g;
let match;
const replacements = [];
while ((match = slugRegex.exec(src)) !== null) {
  const [, slug, partOne, partTwo] = match;
  if (slug === CANONICAL_SLUG) continue;
  const newOne = stripRealCostBlock(partOne);
  const newTwo = stripRealCostBlock(partTwo);
  if (newOne !== partOne || newTwo !== partTwo) {
    replacements.push({ slug, partOne, partTwo, newOne, newTwo });
  }
}

for (const r of replacements) {
  src = src.replace(`partOne: \`${r.partOne}\``, `partOne: \`${r.newOne}\``);
  src = src.replace(`partTwo: \`${r.partTwo}\``, `partTwo: \`${r.newTwo}\``);
}

// Remove orphan surface-finish table from Cpk article
src = src.replace(
  /<table style="width:100%;border-collapse:collapse;margin:20px 0;">[\s\S]*?<\/table>\s*\n\s*`/,
  '`'
);

fs.writeFileSync(blogPath, src);
console.log(`Stripped "Real Cost of Precision" from ${replacements.length} posts`);
console.log('Removed orphan table from Cpk article (if present)');
