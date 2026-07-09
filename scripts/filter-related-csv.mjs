import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isUsefulKeyword } from './lib/keywordseverywhere.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  return lines.map((line) => {
    const out = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (c === '"') inQ = false;
        else cur += c;
      } else if (c === '"') inQ = true;
      else if (c === ',') {
        out.push(cur);
        cur = '';
      } else cur += c;
    }
    out.push(cur);
    return out;
  });
}

function csvEscape(v) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

for (const name of ['ke-related-keywords.csv', 'ke-related-keywords-deduped.csv']) {
  const file = path.join(root, 'docs', name);
  const rows = parseCsv(readFileSync(file, 'utf8'));
  const header = rows[0];
  const kwIdx = header.indexOf('related_keyword');
  let body = rows.slice(1).filter((r) => isUsefulKeyword(r[kwIdx]));
  if (name.includes('deduped')) {
    const volIdx = header.indexOf('volume');
    body = body.sort((a, b) => (Number(b[volIdx]) || 0) - (Number(a[volIdx]) || 0));
  }
  writeFileSync(file, `\uFEFF${[header, ...body].map((r) => r.map(csvEscape).join(',')).join('\n')}`, 'utf8');
  console.log(`${name}: ${body.length} rows`);
}
