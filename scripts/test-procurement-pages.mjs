import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const html = path => readFileSync(new URL(`../dist/${path}/index.html`, import.meta.url), 'utf8');
const loadData = async path => {
  const code = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
};

test('undirected and duplicate catalog references cannot become interchanges', async () => {
  const { getPartReferences } = await loadData('../src/data/part-references.ts');
  const refs = getPartReferences({ partNumber: 'B002', replacementFor: ['A001', 'C003', 'B002'], crossReferences: [{ partNumber: 'A001', relationship: 'replaces' }, { partNumber: 'C003', relationship: 'reference' }] });
  assert.equal(refs.length, 2);
  assert.equal(refs[0].label, 'Listed earlier number');
  assert.equal(refs[1].relationship, 'reference');
  const conflict = getPartReferences({ partNumber: 'B002', crossReferences: [{ partNumber: 'A001', relationship: 'replaces' }, { partNumber: 'A001', relationship: 'replaced-by' }] });
  assert.equal(conflict[0].relationship, 'reference');
  assert.match(conflict[0].label, /Conflicting/);
});

test('all thirty priority parts have distinct quotation scope, evidence and RFQ context', async () => {
  const { priorityPartScopes, catalogProcurement } = await loadData('../src/data/procurement-content.ts');
  const index = JSON.parse(readFileSync(new URL('../dist/search-index.json', import.meta.url), 'utf8'));
  assert.equal(Object.keys(priorityPartScopes).length, 30);
  assert.equal(new Set(Object.values(priorityPartScopes).map(item => item.scope)).size, 30);
  for (const [number, content] of Object.entries(priorityPartScopes)) {
    const part = index.find(item => item.pn === number);
    assert.ok(part, number);
    const page = html(`part-products/${part.slug}`);
    assert.ok(page.includes(`data-procurement-part="${number}"`), number);
    assert.ok(page.includes(content.evidence), number);
    assert.doesNotMatch(page, /<meta[^>]*name="robots"[^>]*noindex/, number);
    assert.ok(page.includes(`data-rfq-source="part-${part.slug}"`), number);
  }
  for (const [slug, brief] of Object.entries(catalogProcurement)) {
    const page = html(`part-products/catalog/${slug}`);
    assert.ok(page.includes(brief.heading), slug);
    assert.ok(page.includes(`data-rfq-source="catalog-${slug}-scope"`), slug);
  }
});

test('customer examples are anonymized and distinguish quote details from confirmed delivery', async () => {
  const { quotationExamples } = await loadData('../src/data/quotation-examples.ts');
  assert.equal(quotationExamples.length, 5);
  const pages = [html('products/mtu-spare-parts'), html('part-products/catalog/mtu-filters'), html('applications/marine-propulsion-engines'), html('guides/mtu-4000-overhaul-parts'), html('part-products/catalog/mtu-gasket-kits')];
  const joined = pages.join('');
  for (const example of quotationExamples) assert.ok(joined.includes(`data-quotation-example="${example.id}"`), example.id);
  assert.match(joined, /completed delivery confirmed by Diesel Part Source/);
  assert.doesNotMatch(joined, /sales14@|Silas Mukarati|Omar Jabouri|RQ2610-65138|34,365\.50|RFQ-194155|RFQ 605272/);
  assert.match(html('part-products/x57508300091-fuel-filter-spin-on'), /16V4000G14F/);
  const cases = html('case-studies');
  assert.doesNotMatch(cases, /<meta[^>]*name="robots"[^>]*noindex/);
  assert.match(cases, /data-quotation-example="molded-tubing"/);
});

test('overhaul worksheets exist and guides no longer fabricate publication dates at each build', () => {
  for (const series of ['2000', '4000']) {
    const page = html(`guides/mtu-${series}-overhaul-parts`);
    assert.match(page, /not a completed customer order or a universal overhaul kit/);
    assert.ok(page.includes(`/downloads/mtu-${series}-overhaul-rfq.xlsx`));
    assert.ok(existsSync(new URL(`../dist/downloads/mtu-${series}-overhaul-rfq.xlsx`, import.meta.url)));
    assert.doesNotMatch(page, /"datePublished"/);
    assert.match(page, /"dateModified":"2026-10-10"/);
  }
  assert.doesNotMatch(html('cross-reference'), /Interchanges With \(We Supply\)|no scraped interchange tables/);
  assert.match(html('cross-reference'), /Reference Relationship/);
});
