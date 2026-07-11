import ExcelJS from 'exceljs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const workbookPath = process.argv[2] ?? 'E:/claude/parts.xlsx';
const outputPath = 'src/data/engine-family-parts.ts';
const imageDir = 'public/images/engine-family-parts';

const titleCase = (value) =>
  value
    .replace(/\s+/g, ' ')
    .trim()
    .split(/([/\-\s]+)/)
    .map((part) => {
      if (/^[\s/-]+$/.test(part)) return part;
      const upper = part.toUpperCase();
      if (/^(MTU|HP|NATO|OEM|OD|ID|KG|MM|P|N|N\/A|STD)$/.test(upper)) return upper;
      if (/^[A-Z0-9]+$/.test(part) && part.length <= 4) return upper;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');

const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const cleanText = (value) =>
  String(value ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const cellText = (cell) => {
  const value = cell.value;
  if (value == null) return '';
  if (typeof value === 'object') {
    if ('hyperlink' in value && value.hyperlink) return String(value.hyperlink).trim();
    if ('text' in value && value.text) return String(value.text).trim();
    if ('richText' in value && Array.isArray(value.richText)) {
      return value.richText.map((item) => item.text ?? '').join('').trim();
    }
  }
  return String(value).trim();
};

const js = (value) => JSON.stringify(value ?? '').replace(/</g, '\\u003c');

const inferCategory = (name) => {
  const lower = name.toLowerCase();
  if (/(gasket|seal|o-ring|oring|sealing ring|diaphragm|grommet|packing)/.test(lower)) return 'Gaskets and seals';
  if (/(sensor|harness|solenoid|starter|actuator|monitor|electric|wiring|switch|sender)/.test(lower)) return 'Sensors and electrical';
  if (/(turbo|turbine|compressor wheel|charge air)/.test(lower)) return 'Turbocharging';
  if (/(filter|cartridge|strainer)/.test(lower)) return 'Filters';
  if (/(water pump|coolant|impeller|seawater|thermostat|cooler|heat exchanger)/.test(lower)) return 'Cooling system';
  if (/(oil|lubrication)/.test(lower)) return 'Lubrication';
  if (/(piston|liner|compression ring|oil control ring|conrod|connecting rod)/.test(lower)) return 'Pistons and liners';
  if (/(bearing|bushing|thrust washer)/.test(lower)) return 'Bearings';
  if (/(valve spring|inlet valve|exhaust valve|tappet|pushrod|valve guide|rocker)/.test(lower)) return 'Valve train';
  if (/(injector|fuel|hp pump|delivery pump|relief valve|fuel line|nozzle)/.test(lower)) return 'Fuel system';
  if (/(hose|intake|air)/.test(lower)) return 'Air and intake';
  if (/(repair kit|kit)/.test(lower)) return 'Repair kits';
  if (/(bolt|nut|washer|clamp|flange|coupling|shaft|pin|pulley|link|bracket|screw|retainer)/.test(lower)) return 'Drive components';
  return 'Engine components';
};

const parseMetaDescription = (html) => {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  return match ? cleanText(match[1]) : '';
};

const parseSpecTable = (html) => {
  const specs = {};
  for (const match of html.matchAll(/<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi)) {
    const key = cleanText(match[1]).toUpperCase();
    const value = cleanText(match[2]);
    if (!key || !value) continue;
    specs[key] = value;
  }
  return specs;
};

const parseSupersededNumbers = (html, partNumber) => {
  const values = new Set();
  const own = partNumber.toUpperCase();
  const supersededBlock = html.match(/SUPERSEDED PART[\s\S]*?<\/table>/i)?.[0] ?? '';
  for (const row of supersededBlock.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cleanText(cell[1]));
    for (const cell of cells) {
      const normalized = cell.toUpperCase();
      if (!normalized || normalized === own || normalized === 'N/A' || /^\d{4}\/\d{2}\/\d{2}$/.test(normalized)) continue;
      if (/^[A-Z0-9/.-]{5,}$/.test(normalized)) values.add(normalized);
    }
  }
  return [...values];
};

const parseApplicableEngines = (html) => {
  const specsBlock = html.match(/Diesel Engine Models[\s\S]*?<\/table>/i)?.[0] ?? '';
  const engines = [];
  for (const row of specsBlock.matchAll(/<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>/gi)) {
    const value = cleanText(row[1]);
    if (/^\d/.test(value) && /V|R|TB|TE|M/i.test(value)) engines.push(value);
  }
  return [...new Set(engines)].slice(0, 12).join('; ');
};

const fetchText = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 dieselpartsrfq import' } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response.text();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
    }
  }
  throw lastError;
};

const downloadImage = async (url, slug) => {
  if (!url) return '';
  const ext = path.extname(new URL(url).pathname) || '.webp';
  const filename = `${slug}${ext.toLowerCase()}`;
  const localPath = path.join(imageDir, filename);
  const publicPath = `/images/engine-family-parts/${filename}`;
  if (existsSync(localPath)) return publicPath;

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 dieselpartsrfq image import' } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(localPath, buffer);
      return publicPath;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
    }
  }
  throw lastError;
};

const readRows = async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  const sheet = workbook.worksheets[0];
  const headers = sheet.getRow(1).values.map((value) => String(value ?? '').trim());
  const rows = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const record = {};
    headers.forEach((header, index) => {
      if (!header) return;
      record[header] = cellText(row.getCell(index));
    });
    if (record['Part Number'] && record['Part Name']) rows.push(record);
  });
  return rows;
};

const limit = async (items, concurrency, worker) => {
  let index = 0;
  const results = [];
  const runners = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current], current);
    }
  });
  await Promise.all(runners);
  return results;
};

const main = async () => {
  await mkdir(imageDir, { recursive: true });
  const rows = await readRows();
  const previousSource = existsSync(outputPath) ? await readFile(outputPath, 'utf8') : '';
  const previousCount = (previousSource.match(/partNumber:/g) ?? []).length;

  let detailFailures = 0;
  let imageFailures = 0;

  const parts = await limit(rows, 3, async (row, index) => {
    const partNumber = row['Part Number'].toUpperCase();
    const name = titleCase(row['Part Name']);
    const slug = `${slugify(partNumber)}-${slugify(name)}`;
    const series = row['Engine Series']
      ? row['Engine Series'].split(/[;,]/).map((item) => item.trim()).filter(Boolean)
      : [];
    const category = inferCategory(name);

    let html = '';
    try {
      html = row.Href ? await fetchText(row.Href) : '';
    } catch (error) {
      detailFailures += 1;
      console.warn(`Detail failed ${partNumber}: ${error.message}`);
    }

    const specs = html ? parseSpecTable(html) : {};
    const replacementFor = html ? parseSupersededNumbers(html, partNumber) : [];
    const applicableEngines = html ? parseApplicableEngines(html) : '';
    const sourceDescription = html ? parseMetaDescription(html) : '';
    const fallbackDescription = `${partNumber} ${name} for ${series.join('/') || row['Engine Series'] || 'MTU diesel engine'} parts inquiries. Confirm engine model, serial number, quantity, and destination before quotation.`;
    let image = '';
    try {
      image = await downloadImage(row['Img Src'], slug);
    } catch (error) {
      imageFailures += 1;
      console.warn(`Image failed ${partNumber}: ${error.message}`);
    }

    if ((index + 1) % 50 === 0) console.log(`Imported ${index + 1}/${rows.length}`);

    return {
      partNumber,
      name,
      slug,
      series,
      category,
      sourceUrl: row.Href,
      image,
      imageAlt: row['Img Alt'] || `MTU ${partNumber} ${name} spare part`,
      sourceDescription: sourceDescription || fallbackDescription,
      engineType: specs['ENGINE TYPE'] || series.join('/') || '',
      dimensions: specs.DIMENSIONS || 'N/A',
      weightKg: specs['UNIT WEIGHT'] || '',
      hsCode: specs['HS CODE'] || '',
      natoNumber: specs['NATO-VERS.-NR.'] || 'N/A',
      applicableEngines: applicableEngines || series.join('/'),
      replacementFor,
    };
  });

  const uniqueParts = [...new Map(parts.map((part) => [`${part.partNumber}-${part.slug}`, part])).values()];
  const file = `export type EngineFamilyPartImport = {
  partNumber: string;
  name: string;
  slug: string;
  series: readonly string[];
  category: string;
  sourceUrl: string;
  image: string;
  imageAlt: string;
  sourceDescription: string;
  engineType: string;
  dimensions: string;
  weightKg: string;
  hsCode: string;
  natoNumber: string;
  applicableEngines: string;
  replacementFor: readonly string[];
};

export const engineFamilyParts = [
${uniqueParts
  .map(
    (part) => `  {
    partNumber: ${js(part.partNumber)},
    name: ${js(part.name)},
    slug: ${js(part.slug)},
    series: ${JSON.stringify(part.series)},
    category: ${js(part.category)},
    sourceUrl: ${js(part.sourceUrl)},
    image: ${js(part.image)},
    imageAlt: ${js(part.imageAlt)},
    sourceDescription: ${js(part.sourceDescription)},
    engineType: ${js(part.engineType)},
    dimensions: ${js(part.dimensions)},
    weightKg: ${js(part.weightKg)},
    hsCode: ${js(part.hsCode)},
    natoNumber: ${js(part.natoNumber)},
    applicableEngines: ${js(part.applicableEngines)},
    replacementFor: ${JSON.stringify(part.replacementFor)},
  },`,
  )
  .join('\n')}
] as const satisfies readonly EngineFamilyPartImport[];

export const engineFamilyPartSeeds = engineFamilyParts.map((part) => ({
  partNumber: part.partNumber,
  name: part.name,
  series: part.series,
  category: part.category,
  engineType: part.engineType,
  dimensions: part.dimensions,
  weightKg: part.weightKg,
  hsCode: part.hsCode,
  natoNumber: part.natoNumber,
  applicableEngines: part.applicableEngines,
  replacementFor: part.replacementFor,
  image: part.image,
  imageAlt: part.imageAlt,
  description: part.sourceDescription,
}));

export const engineFamilyPartDetailsByPartNumber = Object.fromEntries(
  engineFamilyParts.map((part) => [part.partNumber.toUpperCase(), part]),
) as Record<string, EngineFamilyPartImport>;
`;

  await writeFile(outputPath, file, 'utf8');
  console.log(`Generated ${outputPath}`);
  console.log(`Rows: ${rows.length}, unique imports: ${uniqueParts.length}, previous generated count: ${previousCount}`);
  console.log(`Detail failures: ${detailFailures}, image failures: ${imageFailures}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
