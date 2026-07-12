import { readFile, writeFile } from 'node:fs/promises';

const sitemapPath = 'dieselpartsource-sitemap.xml';
const mtuPartsPath = 'src/data/mtu-parts.ts';
const productsPath = 'src/data/products.ts';
const importedPagesPath = 'src/data/imported-dieselpartsrfq-pages.ts';

const titleCase = (value) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (/^(MTU|OEM|HP|CPL|ISB|ISD|ISDE|ISF|ISL|ISLE|ISM|ISME|QSZ|QSL|QSB|KTA|NTA|BF|DEUTZ)$/.test(upper)) {
        return upper;
      }
      if (/^\d+[a-z]?$/i.test(word)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const parseUrls = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());

const unique = (items) => [...new Set(items)];

const readSitemap = async () => {
  try {
    return await readFile(sitemapPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const response = await fetch('https://dieselpartsource.com/sitemap.xml');
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
  }
  return response.text();
};

const inferPart = (sourceSlug) => {
  const segments = sourceSlug.split('-').filter(Boolean);
  const extraPartSuffixes = new Set(['00', '42', '87']);
  const includeSecond = segments[1] && extraPartSuffixes.has(segments[1].toLowerCase());
  const partSegments = includeSecond ? segments.slice(0, 2) : segments.slice(0, 1);
  const nameSegments = segments.slice(partSegments.length);
  const partNumber = partSegments.join('-').toUpperCase();
  const name = titleCase(nameSegments.join('-') || 'Engine Part');
  return { slug: `${slugify(partNumber)}-${slugify(name)}`, partNumber, name };
};

const inferCategory = (name) => {
  const lower = name.toLowerCase();
  if (/(gasket|seal|o-ring|oring|cone|diaphragm|grommet)/.test(lower)) return 'Gaskets and seals';
  if (/(sensor|harness|solenoid|starter|actuator|monitor|electric|wiring)/.test(lower)) return 'Sensors and electrical';
  if (/(turbo|turbine|compressor wheel|charge air)/.test(lower)) return 'Turbocharging';
  if (/(filter|cartridge)/.test(lower)) return 'Filters';
  if (/(water pump|coolant|impeller|seawater|thermostat)/.test(lower)) return 'Cooling system';
  if (/(oil|lubrication)/.test(lower)) return 'Lubrication';
  if (/(piston|liner|compression ring|oil control ring|conrod)/.test(lower)) return 'Pistons and liners';
  if (/(bearing|bushing)/.test(lower)) return 'Bearings';
  if (/(valve spring|inlet valve|exhaust valve|tappet|pushrod|valve guide)/.test(lower)) return 'Valve train';
  if (/(injector|fuel|hp pump|delivery pump|relief valve)/.test(lower)) return 'Fuel system';
  if (/(bolt|nut|washer|clamp|flange|coupling|shaft|pin|pulley|link|bracket)/.test(lower)) return 'Drive components';
  if (/(hose|intake|air)/.test(lower)) return 'Air and intake';
  return 'Engine components';
};

const inferSeries = (partNumber) => {
  const value = partNumber.toUpperCase();
  if (/^(584|X584)/.test(value)) return ['MTU 595'];
  if (/^(524|X524|EX524|526|X526)/.test(value)) return ['MTU 4000'];
  if (/^(541|532|537|509|511|457)/.test(value)) return ['MTU 396'];
  if (/^(555|556|559|560|849|869)/.test(value)) return ['MTU 956', 'MTU 1163'];
  if (/^(000|003|X000|X00E|XP)/.test(value)) return ['MTU 2000', 'MTU 4000'];
  return ['MTU 2000', 'MTU 4000'];
};

const formatStringArray = (items) => `[${items.map((item) => `'${item}'`).join(', ')}]`;

const formatPartEntry = ({ partNumber, name }) =>
  `  { partNumber: '${partNumber}', name: '${name.replace(/'/g, "\\'")}', series: ${formatStringArray(
    inferSeries(partNumber),
  )}, category: '${inferCategory(name)}' },`;

const createProductEntry = (sourceSlug) => {
  const slug = slugify(sourceSlug);
  const title = titleCase(sourceSlug);
  const brand =
    /deutz|bf-/i.test(sourceSlug) ? 'DEUTZ' : /cummins|isb|isde|isf|isle|isme|qsz|qsl|qsb|kta|nta|b-series|k-series/i.test(sourceSlug) ? 'Cummins' : 'MTU';
  const capability =
    brand === 'DEUTZ' ? 'deutz-engine-parts' : brand === 'Cummins' ? 'cummins-engine-parts' : 'mtu-engine-parts';
  const productGroup =
    brand === 'DEUTZ' ? 'DEUTZ Parts' : brand === 'Cummins' ? 'Cummins Parts' : 'MTU Spare Parts';

  return `  {
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    image: '/images/engine-parts-sensors-catalog.png',
    mainImage: '/images/engine-parts-hero.png',
    secondImage: '/images/engine-parts-verification-desk.png',
    seoTitle: '${title.replace(/'/g, "\\'")} Parts | Diesel Part Source',
    h1Title: '${title.replace(/'/g, "\\'")} Engine Parts',
    summary: '${brand} ${title.replace(/'/g, "\\'")} engine parts inquiry support for service, overhaul, and replacement planning.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['${capability}', 'industrial-engine-service'],
    tolerance: 'Verified by engine model, serial number, and part reference',
    leadTime: 'Availability and shipping route confirmed after inquiry',
    content: {
      partOne: \`
        <h2>${title} Parts Support</h2>
        <p>Diesel Part Source supports ${brand} ${title} engine parts inquiries for maintenance teams, distributors, service companies, and fleet operators.</p>
        <h3>Typical Requests</h3>
        <ul>
          <li>Filters, gaskets, seals, belts, sensors, and service items</li>
          <li>Fuel, cooling, lubrication, turbocharging, and control components</li>
          <li>Overhaul parts and replacement assemblies checked by engine reference</li>
        </ul>
      \`,
      partTwo: \`
        <h2>What to Send</h2>
        <p>Send the engine model, serial number, part numbers, quantity, destination, and required delivery date. Photos of the nameplate or old part help us confirm the right option.</p>
        <p><a href="/contact/">Request ${title} parts</a></p>
        <p><a href="/products/${slug}/">${title}</a> is listed under ${productGroup} inquiry support.</p>
      \`,
    },
  },`;
};

const createImportedPageEntry = (path) => {
  const normalizedPath = path.replace(/^\/|\/$/g, '');
  const [section = 'engine-parts'] = normalizedPath.split('/');
  const title = titleCase(normalizedPath.split('/').at(-1) || section);
  const sectionTitle = titleCase(section);
  const summary =
    section === 'categories'
      ? `${title} engine and parts category page for buyers comparing models, service parts, and replacement options.`
      : section === 'news'
        ? `${title} reference page for engine parts buyers tracking service, marine, power generation, and industrial engine updates.`
        : `${title} information page for engine parts sourcing, service planning, and quotation support.`;

  return `  {
    slug: '${normalizedPath}',
    title: '${title.replace(/'/g, "\\'")}',
    seoTitle: '${title.replace(/'/g, "\\'")} | Diesel Part Source',
    section: '${sectionTitle.replace(/'/g, "\\'")}',
    summary: '${summary.replace(/'/g, "\\'")}',
  },`;
};

const removeBlock = (source, name) => {
  const start = `// BEGIN ${name}`;
  const end = `// END ${name}`;
  const pattern = new RegExp(`\\n?${start}[\\s\\S]*?${end}\\n?`, 'g');
  return source.replace(pattern, '\n');
};

const main = async () => {
  const xml = await readSitemap();
  const urls = parseUrls(xml);
  const partSourceSlugs = unique(
    urls
      .map((url) => new URL(url).pathname)
      .filter((path) => path.startsWith('/part-product/'))
      .map((path) => decodeURIComponent(path.replace('/part-product/', '')).replace(/\/$/, '')),
  );
  const productSourceSlugs = unique(
    urls
      .map((url) => new URL(url).pathname)
      .filter((path) => path.startsWith('/product/'))
      .map((path) => decodeURIComponent(path.replace('/product/', '')).replace(/\/$/, '')),
  );

  let mtuPartsSource = await readFile(mtuPartsPath, 'utf8');
  mtuPartsSource = removeBlock(mtuPartsSource, 'ENGINE FAMILY SITEMAP PARTS');
  const existingPartSlugs = new Set([...mtuPartsSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]));
  const importedParts = partSourceSlugs
    .map(inferPart)
    .filter((part) => !existingPartSlugs.has(part.slug))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const partBlock = `// BEGIN ENGINE FAMILY SITEMAP PARTS
const sitemapMtuParts = [
${importedParts.map(formatPartEntry).join('\n')}
].map(createCatalogPart);
// END ENGINE FAMILY SITEMAP PARTS
`;

  mtuPartsSource = mtuPartsSource.replace(
    /(\nconst expandedMtuParts = \[[\s\S]*?\]\.map\(createCatalogPart\);\n)/,
    `$1\n${partBlock}`,
  );
  if (!mtuPartsSource.includes('...sitemapMtuParts,')) {
    mtuPartsSource = mtuPartsSource.replace('  ...expandedMtuParts,', '  ...expandedMtuParts,\n  ...sitemapMtuParts,');
  }
  await writeFile(mtuPartsPath, mtuPartsSource, 'utf8');

  let productsSource = await readFile(productsPath, 'utf8');
  productsSource = removeBlock(productsSource, 'ENGINE FAMILY SITEMAP PRODUCTS');
  const existingProductSlugs = new Set([...productsSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]));
  const importedProducts = productSourceSlugs
    .map((slug) => slugify(slug))
    .filter((slug, index, all) => all.indexOf(slug) === index)
    .filter((slug) => !existingProductSlugs.has(slug))
    .sort((a, b) => a.localeCompare(b));

  const productBlock = `// BEGIN ENGINE FAMILY SITEMAP PRODUCTS
const importedEngineFamilyProducts: ProductItem[] = [
${importedProducts.map(createProductEntry).join('\n')}
];
// END ENGINE FAMILY SITEMAP PRODUCTS
`;

  productsSource = productsSource.replace(/\nexport const products/, `\n${productBlock}\nexport const products`);
  if (!productsSource.includes('...importedEngineFamilyProducts,')) {
    productsSource = productsSource.replace(/\n\];\n\nexport function getProductCards/, '\n  ...importedEngineFamilyProducts,\n];\n\nexport function getProductCards');
  }
  await writeFile(productsPath, productsSource, 'utf8');

  const importedPagePaths = unique(
    urls
      .map((url) => new URL(url).pathname.replace(/\/$/, ''))
      .filter((path) => path && path !== '/')
      .filter((path) => !path.startsWith('/product/'))
      .filter((path) => !path.startsWith('/part-product/'))
      .filter((path) => !['/contact', '/privacy-policy'].includes(path))
      .sort((a, b) => a.localeCompare(b)),
  );

  const importedPagesSource = `export type ImportedEngineFamilyPage = {
  slug: string;
  title: string;
  seoTitle: string;
  section: string;
  summary: string;
};

export const importedEngineFamilyPages: ImportedEngineFamilyPage[] = [
${importedPagePaths.map(createImportedPageEntry).join('\n')}
];
`;

  await writeFile(importedPagesPath, importedPagesSource, 'utf8');

  console.log(`Imported ${importedParts.length} part pages from sitemap.`);
  console.log(`Imported ${importedProducts.length} product pages from sitemap.`);
  console.log(`Imported ${importedPagePaths.length} supporting pages from sitemap.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
