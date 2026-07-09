/**
 * 批量拉取 Keywords Everywhere Related Keywords 并导出 CSV。
 *
 * 用法:
 *   node scripts/export-related-keywords.mjs
 *   node scripts/export-related-keywords.mjs --num 50
 *
 * 环境变量: KEYWORDS_EVERYWHERE_API_KEY（.env）
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchKeywordVolumes, fetchRelatedKeywords, isUsefulKeyword } from './lib/keywordseverywhere.mjs';
import { loadEnvFile } from './lib/load-env.mjs';

loadEnvFile();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'ke-related-keywords.csv');
const OUT_DEDUP = path.join(ROOT, 'docs', 'ke-related-keywords-deduped.csv');

const SEED_KEYWORDS = [
  'cnc machining services',
  'cnc milling services',
  'cnc turning services',
  'custom cnc parts',
  'cnc machining china',
  'precision machining',
  'cnc machine shop',
  'cnc aluminum parts',
  'cnc steel parts',
  'cnc prototyping',
  '5 axis cnc machining',
  'cnc machining cost',
  'cnc manufacturing',
  'machined components',
  'cnc precision parts',
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseNumArg() {
  const idx = process.argv.indexOf('--num');
  if (idx === -1) return 100;
  const n = Number(process.argv[idx + 1]);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 100) : 100;
}

function csvEscape(value) {
  const s = value == null ? '' : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

function writeCsv(filePath, header, rows) {
  const lines = [header.map(csvEscape).join(',')];
  for (const row of rows) {
    lines.push(row.map(csvEscape).join(','));
  }
  writeFileSync(filePath, `\uFEFF${lines.join('\n')}`, 'utf8');
}

async function main() {
  const apiKey = process.env.KEYWORDS_EVERYWHERE_API_KEY?.trim();
  if (!apiKey) {
    console.error('缺少 KEYWORDS_EVERYWHERE_API_KEY（请在 .env 中设置）');
    process.exit(1);
  }

  const num = parseNumArg();
  const country = process.env.KEYWORDS_EVERYWHERE_COUNTRY?.trim() || 'us';
  const currency = process.env.KEYWORDS_EVERYWHERE_CURRENCY?.trim() || 'USD';

  console.log(`种子词 ${SEED_KEYWORDS.length} 个，每个拉取 ${num} 条 Related Keywords…`);
  console.log(`预计 Related 消耗约 ${SEED_KEYWORDS.length * num * 2} credits（2 credits/条）\n`);

  /** @type {{ seed: string, keyword: string }[]} */
  const pairs = [];
  let relatedCredits = 0;

  for (let i = 0; i < SEED_KEYWORDS.length; i++) {
    const seed = SEED_KEYWORDS[i];
    process.stdout.write(`[${i + 1}/${SEED_KEYWORDS.length}] ${seed} … `);
    const result = await fetchRelatedKeywords(seed, { apiKey, num, country, currency });
    relatedCredits += result.creditsConsumed;
    for (const keyword of result.keywords) {
      if (!isUsefulKeyword(keyword)) continue;
      pairs.push({ seed, keyword });
    }
    console.log(`${result.keywords.length} 条 (${result.creditsConsumed} credits)`);
    if (i < SEED_KEYWORDS.length - 1) await sleep(400);
  }

  const allKeywords = [...new Set([...SEED_KEYWORDS, ...pairs.map((p) => p.keyword)])];
  console.log(`\n去重后 ${allKeywords.length} 个词，正在拉取 Volume/CPC/Competition…`);

  const volumeMap = await fetchKeywordVolumes(allKeywords, {
    apiKey,
    country,
    currency,
    onProgress: (done, total) => process.stdout.write(`\rVolume 进度: ${done}/${total}`),
  });
  console.log('\n');

  const header = [
    'seed_keyword',
    'related_keyword',
    'volume',
    'cpc',
    'competition',
    'country',
    'currency',
  ];

  const rows = pairs.map(({ seed, keyword }) => {
    const m = volumeMap.get(keyword.trim().toLowerCase().replace(/\s+/g, ' '));
    return [
      seed,
      keyword,
      m?.vol ?? '',
      m?.cpc ?? '',
      m?.competition ?? '',
      country,
      currency,
    ];
  });

  writeCsv(OUT, header, rows);

  // 去重：同一 related 词保留 volume 最高 seed 关联或首次出现
  const dedupMap = new Map();
  for (const row of rows) {
    const key = row[1].trim().toLowerCase();
    const vol = Number(row[2]) || 0;
    const existing = dedupMap.get(key);
    if (!existing || vol > (Number(existing[2]) || 0)) {
      dedupMap.set(key, row);
    }
  }
  const dedupRows = [...dedupMap.values()].sort(
    (a, b) => (Number(b[2]) || 0) - (Number(a[2]) || 0)
  );

  writeCsv(OUT_DEDUP, header, dedupRows);

  const withVol = dedupRows.filter((r) => Number(r[2]) > 0);
  console.log(`已导出:`);
  console.log(`  ${OUT}`);
  console.log(`  ${OUT_DEDUP}（去重 ${dedupRows.length} 条，Volume>0: ${withVol.length}）`);
  console.log(`Related credits ≈ ${relatedCredits}，Volume credits ≈ ${allKeywords.length}`);
  console.log(`\nTop 15 去重词（按 Volume）:`);
  withVol.slice(0, 15).forEach((r) => console.log(`  ${r[2]}\t${r[1]}\t← ${r[0]}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
