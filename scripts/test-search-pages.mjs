import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = (slug) => readFileSync(new URL(`../dist/part-products/${slug}/index.html`, import.meta.url), 'utf8');
const targets = [
  '0031845201-oil-filter-spin-on', 'x57508300091-fuel-filter-spin-on',
  'ex52407500064-injector', 'x00e50203659-level-monitor', '5244920181-sealing-ring',
  '0020922801-fuel-filter-spin-on', '0035352231-pressure-sensor', '0000925105-filter-element',
  '0005356430-temperature-sensor', '0005357633-speed-sensor', 'x00e50214075-pressure-sensor',
];

test('existing search landing pages remain indexable with self canonicals and RFQ context', () => {
  for (const slug of targets) {
    const html = page(slug);
    assert.ok(html.includes(`rel="canonical" href="https://dieselpartsource.com/part-products/${slug}/"`), slug);
    assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*noindex/, slug);
    assert.ok(html.includes(`data-rfq-source="part-${slug}"`), slug);
    assert.match(html, /Fitment &amp; Measurements/, slug);
    assert.doesNotMatch(html, /Frequently Purchased Together|Procurement Snapshot|Order Release Standard/, slug);
  }
});

test('missing dimensions are not published as product measurements', () => {
  assert.match(page('0031845201-oil-filter-spin-on'), /What is the thread size of 0031845201/);
  assert.match(page('ex52407500064-injector'), /dimensions of EX52407500064 in inches/);
  assert.doesNotMatch(page('0020922801-fuel-filter-spin-on'), /EM 1 PAL = 160STK/);
  assert.doesNotMatch(page('0005356430-temperature-sensor'), /WIRING HARNESS/);
});

test('replacement directions and links are retained without claiming unknown stock', () => {
  const filter = page('x57508300091-fuel-filter-spin-on');
  assert.match(filter, /X59408300151<\/th>\s*<td[^>]*>Listed later number/);
  const pressure = page('0035352231-pressure-sensor');
  assert.match(pressure, /href="\/part-products\/x00e50214075-pressure-sensor\/"/);
  assert.doesNotMatch(filter, /schema.org\/LimitedAvailability|Listing reviewed: 2026-07-21/);
});

test('catalogs promote the relevant priority pages', () => {
  const filters = page('catalog/mtu-filters');
  const rows = [...filters.matchAll(/<a class="catalog-spec-row"[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(rows[0], '/part-products/0031845201-oil-filter-spin-on/');
  assert.ok(rows.includes('/part-products/0000925105-filter-element/'));
  assert.ok(page('catalog/mtu-injectors').includes('ex52407500064-injector'));
  assert.ok(page('catalog/mtu-sensors').includes('x00e50203659-level-monitor'));
});
