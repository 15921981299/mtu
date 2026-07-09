/**
 * Audit low-intent supplier listicle posts (B2B vs DTC keyword strategy).
 * Run: node scripts/audit-supplier-posts.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogTs = readFileSync(path.join(root, 'src/data/blog.ts'), 'utf8');

const slugMatches = [...blogTs.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);

const keepPatterns = [
  /^how-to-choose-cnc-machining-supplier-china$/,
  /^how-to-audit-cnc-supplier-quality/,
  /^titanium-machining-suppliers-how-to-compare$/,
  /^low-volume-cnc-machining-suppliers-no-moq$/,
  /^medical-grade-cnc-machining-iso-13485/,
  /^automotive-ppap-cnc-machining-supplier/,
  /^defense-military-cnc-machining-supplier/,
  /^china-vs-local-cnc-machining-supplier$/,
  /^how-to-verify-material-authenticity/,
  /^how-to-communicate-with-cnc-supplier$/,
  /^china-cnc-machining-regions-comparison/,
  /^cnc-sourcing-advice-from-manufacturing-experts$/,
];

function isLowIntent(slug) {
  if (keepPatterns.some((re) => re.test(slug))) return false;
  if (/^(best-|top-\d|top-cnc-machining-companies)/.test(slug)) return true;
  if (/-suppliers(-|$)/.test(slug)) return true;
  if (/-supplier-(selection|requirements|guide)/.test(slug)) return true;
  return false;
}

const lowIntent = slugMatches.filter(isLowIntent);
const report = {
  generatedAt: new Date().toISOString(),
  totalPosts: slugMatches.length,
  lowIntentCount: lowIntent.length,
  lowIntentSlugs: lowIntent,
};

const outPath = path.join(root, 'docs/supplier-posts-audit.json');
writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`Supplier audit: ${lowIntent.length} low-intent slugs → ${outPath}`);
