/**
 * 导出全站页面 URL、SEO 信息与中文关键词到 Excel。
 *
 * 用法:
 *   node scripts/export-page-keywords.mjs              # 仅导出，不查 KE
 *   node scripts/export-page-keywords.mjs --with-ke    # 调用 Keywords Everywhere 填充月搜索量
 *
 * 输出:
 *   docs/site-pages-keywords.xlsx   — 完整 SEO 表（含 KE 列）
 *   docs/site-pages-volume.csv      — 中文：URL、SEO关键词、Volume（全站）
 *   docs/site-pages-volume.md       — 中文汇总说明 + Top 50 有量页
 *
 * 环境变量（或项目根 .env）:
 *   KEYWORDS_EVERYWHERE_API_KEY   — KE API Key（必填，--with-ke 时）
 *   KEYWORDS_EVERYWHERE_COUNTRY   — 默认 us
 *   KEYWORDS_EVERYWHERE_CURRENCY  — 默认 USD
 */
import ExcelJS from 'exceljs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchKeywordVolumes, lookupVolume } from './lib/keywordseverywhere.mjs';
import { loadEnvFile } from './lib/load-env.mjs';

loadEnvFile();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'docs', 'site-pages-keywords.xlsx');
const OUT_CSV = path.join(ROOT, 'docs', 'site-pages-volume.csv');
const OUT_MD = path.join(ROOT, 'docs', 'site-pages-volume.md');
const SITE = 'https://machiningsupplier.com';

/** 无 SEO 目标关键词的页面（不参与主表与 KE 查询） */
const NON_SEO_PATHS = new Set(['/404/', '/401/', '/thank-you/']);

const NON_SEO_PAGE_TYPES = new Set(['404', '感谢页', '博客分页', '博客作者', '条款页']);

const NON_SEO_REASON = {
  404: '错误页，无搜索目标',
  感谢页: '表单确认页，无搜索目标',
  博客分页: '列表分页，关键词与 /blog/ 重复',
  博客作者: '作者归档页，非采购关键词',
  条款页: '法律条款页，无搜索目标',
};

const INVALID_KE_PATTERNS = [
  /^thank you$/i,
  /^404$/i,
  /^401$/i,
  /^page not found$/i,
  /^privacy policy$/i,
  /^terms of service$/i,
  /^terms and conditions$/i,
];

function isSeoKeywordPage(urlPath, pageType) {
  if (NON_SEO_PATHS.has(urlPath)) return false;
  if (NON_SEO_PAGE_TYPES.has(pageType)) return false;
  return true;
}

function isValidKeQuery(query) {
  if (!query?.trim()) return false;
  return !INVALID_KE_PATTERNS.some((re) => re.test(query.trim()));
}

const PAGE_TYPE_RULES = [
  { test: (p) => p === '/', type: '首页', tier: 'T1' },
  { test: (p) => p === '/contact/', type: '询价页', tier: 'T1' },
  { test: (p) => p === '/about/', type: '关于我们', tier: 'T3' },
  { test: (p) => p === '/certifications/', type: '认证资质', tier: 'T3' },
  { test: (p) => p === '/404/', type: '404', tier: '—' },
  { test: (p) => p === '/thank-you/', type: '感谢页', tier: '—' },
  { test: (p) => p.startsWith('/products/') && p.split('/').filter(Boolean).length === 2, type: '产品详情', tier: 'T1' },
  { test: (p) => p.startsWith('/products/') && p.split('/').filter(Boolean).length === 3, type: '产品子页', tier: 'T1' },
  { test: (p) => p === '/products/', type: '产品 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/materials/') && p.split('/').filter(Boolean).length === 2, type: '材料详情', tier: 'T1' },
  { test: (p) => p.startsWith('/materials/') && p.split('/').filter(Boolean).length === 3, type: '材料子页', tier: 'T1' },
  { test: (p) => p === '/materials/', type: '材料 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/capabilities/') && p.split('/').filter(Boolean).length === 2, type: '能力详情', tier: 'T1' },
  { test: (p) => p.startsWith('/capabilities/') && p.split('/').filter(Boolean).length === 3, type: '能力子页', tier: 'T1' },
  { test: (p) => p === '/capabilities/', type: '能力 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/industries/') && p.split('/').filter(Boolean).length === 2, type: '行业详情', tier: 'T1' },
  { test: (p) => p.startsWith('/industries/') && p.split('/').filter(Boolean).length === 3, type: '行业子页', tier: 'T1' },
  { test: (p) => p === '/industries/', type: '行业 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/applications/') && p !== '/applications/', type: '应用详情', tier: 'T1' },
  { test: (p) => p === '/applications/', type: '应用 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/features/') && p !== '/features/', type: '特征详情', tier: 'T4' },
  { test: (p) => p === '/features/', type: '特征 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/standards/') && p !== '/standards/', type: '标准合规详情', tier: 'T4' },
  { test: (p) => p === '/standards/', type: '标准 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/compare/') && p !== '/compare/', type: '对比详情', tier: 'T2' },
  { test: (p) => p === '/compare/', type: '对比 Hub', tier: 'T2' },
  { test: (p) => p.startsWith('/case-studies/') && p !== '/case-studies/', type: '案例详情', tier: 'T3' },
  { test: (p) => p === '/case-studies/', type: '案例 Hub', tier: 'T3' },
  { test: (p) => p.startsWith('/glossary/') && p !== '/glossary/', type: '术语详情', tier: 'T4' },
  { test: (p) => p === '/glossary/', type: '术语 Hub', tier: 'T4' },
  { test: (p) => p === '/blog/guides/', type: '博客指南 Hub', tier: 'T4' },
  { test: (p) => p === '/blog/', type: '博客列表', tier: 'T4' },
  { test: (p) => p.startsWith('/blog/page/'), type: '博客分页', tier: 'T4' },
  { test: (p) => p.startsWith('/blog/tag/'), type: '博客标签', tier: 'T4' },
  { test: (p) => p.startsWith('/blog/author/'), type: '博客作者', tier: 'T4' },
  { test: (p) => p.startsWith('/blog/'), type: '博客文章', tier: 'T4' },
  { test: (p) => p.startsWith('/resources/by-role/') && p !== '/resources/by-role/', type: '角色 Hub 详情', tier: 'T3' },
  { test: (p) => p === '/resources/by-role/', type: '角色 Hub 列表', tier: 'T3' },
  { test: (p) => p.startsWith('/resources/'), type: '资源页', tier: 'T3' },
  { test: (p) => p === '/resources/', type: '资源 Hub', tier: 'T3' },
  { test: (p) => p.startsWith('/terms/'), type: '条款页', tier: 'T3' },
];

const SLUG_CN = {
  aluminum: '铝合金',
  'stainless-steel': '不锈钢',
  titanium: '钛合金',
  'carbon-steel': '碳钢',
  'engineering-plastics': '工程塑料',
  'brass-copper': '黄铜/铜',
  'nickel-alloys': '镍基合金',
  'tool-steels': '工具钢',
  'bronze-alloys': '青铜',
  magnesium: '镁合金',
  'cnc-milling': 'CNC铣削',
  'cnc-turning': 'CNC车削',
  '5-axis-machining': '五轴加工',
  grinding: '精密磨削',
  edm: '电火花EDM',
  'quality-control': '质量控制',
  automotive: '汽车',
  aerospace: '航空航天',
  'medical-devices': '医疗器械',
  robotics: '机器人',
  'oil-gas': '油气',
  'precision-shafts': '精密轴',
  'custom-brackets': '定制支架',
  'housings-enclosures': '外壳/机壳',
  'sensor-housings': '传感器外壳',
  'gears-sprockets': '齿轮/链轮',
  'bushings-bearings': '衬套/轴承',
  'flanges-fittings': '法兰/接头',
  'manifolds-valve-bodies': '歧管/阀体',
  'fixtures-tooling': '夹具/工装',
  'custom-fasteners': '定制紧固件',
  'valve-components': '阀件',
  'heat-sinks': '散热器',
  'pins-dowels': '销钉/定位销',
  'spacers-standoffs': '垫片/支撑柱',
  'mounting-plates': '安装板',
  couplings: '联轴器',
  'roller-components': '滚轮零件',
  'pump-components': '泵类零件',
  'connector-bodies': '连接器壳体',
  'actuator-components': '执行器零件',
  'enclosure-housing-components': '外壳/机壳零件',
  'aerospace-structural-components': '航空航天结构件',
  'ev-battery-components': 'EV电池零件',
  'fluid-handling-components': '流体控制零件',
  'medical-device-components': '医疗器械零件',
  'robotics-automation-components': '机器人自动化零件',
  'semiconductor-equipment-components': '半导体设备零件',
  'oil-gas-downhole-components': '油气井下零件',
  sourcing: '供应商选型',
  tolerances: '公差规格',
  materials: '材料选型',
  process: '加工工艺',
  quality: '质量控制',
  dfm: '可制造性设计',
  'cost-leadtime': '成本与交期',
  finishes: '表面处理',
  drawings: '图纸与GD&T',
  'getting-started': '入门指南',
};

const STATIC_PAGE_KW = {
  '/about/': { primary: 'CNC机加工供应商介绍', secondary: '中国工厂、质检能力、采购对接' },
  '/certifications/': { primary: 'ISO9001等质量认证', secondary: '质量体系、检验能力、合规文档' },
  '/products/': { primary: 'CNC定制零件目录', secondary: '轴、支架、外壳、阀体、紧固件' },
  '/materials/': { primary: 'CNC可加工材料', secondary: '铝、不锈钢、钛、塑料、镍基合金' },
  '/capabilities/': { primary: 'CNC加工能力', secondary: '铣削、车削、五轴、磨削、EDM' },
  '/industries/': { primary: '行业CNC加工方案', secondary: '汽车、航空、医疗、机器人、油气' },
  '/applications/': { primary: 'CNC应用零件类型', secondary: '结构件、外壳、流体件、电池件' },
  '/features/': { primary: '零件特征加工能力', secondary: '深腔、薄壁、螺纹、密封槽' },
  '/standards/': { primary: '行业标准与合规', secondary: 'ISO、AS9100、FDA、NACE' },
  '/compare/': { primary: '材料/工艺对比指南', secondary: '选型决策表、RFQ准备' },
  '/case-studies/': { primary: 'CNC加工成功案例', secondary: '公差达成、交期、检验报告' },
  '/glossary/': { primary: 'CNC机加工术语词典', secondary: '公差、GD&T、表面处理' },
  '/blog/': { primary: 'CNC技术博客', secondary: '选型、DFM、供应商评估' },
  '/blog/guides/': { primary: 'CNC采购与工程指南', secondary: 'Hub专题、深度教程' },
  '/resources/': { primary: '工程师资源中心', secondary: 'DFM清单、检验样本、外链资产' },
  '/resources/by-role/': { primary: '按角色浏览资源', secondary: '采购、工程师、质量' },
};

const BLOG_TAG_KW = {
  sourcing: { primary: 'CNC供应商选型', secondary: '中国工厂、审计、RFQ' },
  tolerances: { primary: 'CNC公差与规格', secondary: 'ISO2768、图纸标注' },
  materials: { primary: 'CNC材料选型', secondary: '铝、不锈钢、钛、塑料' },
  process: { primary: 'CNC加工工艺', secondary: '铣削、车削、五轴、EDM' },
  quality: { primary: 'CNC质量控制', secondary: 'CMM、FAI、检验报告' },
  dfm: { primary: 'DFM可制造性设计', secondary: '降本、图纸准备' },
  'cost-leadtime': { primary: 'CNC成本与交期', secondary: 'MOQ、报价周期' },
  finishes: { primary: 'CNC表面处理', secondary: '阳极氧化、粉末喷涂' },
  drawings: { primary: '图纸与GD&T', secondary: 'ISO/ANSI、符号解读' },
  'getting-started': { primary: 'CNC入门知识', secondary: '术语、流程、RFQ' },
};

function decodeHtml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function seoTitleCore(title) {
  return decodeHtml(title).split('|')[0].split('—')[0].split('–')[0].trim();
}

/** 从 SEO 标题或中文关键词括号中提取 KE 可用的英文查询词 */
function extractKeQuery(title, primaryKw, urlPath, pageType) {
  if (!isSeoKeywordPage(urlPath, pageType)) return '';

  const core = seoTitleCore(title);
  if (core && core.length > 2 && !/^machining supplier$/i.test(core)) {
    return isValidKeQuery(core) ? core : '';
  }

  const paren = primaryKw.match(/[（(]([^）)]+)[）)]/);
  if (paren && /[a-z]/i.test(paren[1])) {
    const candidate = paren[1].trim();
    return isValidKeQuery(candidate) ? candidate : '';
  }

  const parts = urlPath.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  let fallback = '';
  if (pageType.startsWith('产品') && parts[1]) fallback = `${parts[1].replace(/-/g, ' ')} machining`;
  else if (pageType.startsWith('材料') && parts[1]) fallback = `${parts[1].replace(/-/g, ' ')} cnc machining`;
  else if (pageType.startsWith('能力') && parts[1]) fallback = `${parts[1].replace(/-/g, ' ')} cnc`;
  else if (pageType.startsWith('行业') && parts[1]) fallback = `${parts[1].replace(/-/g, ' ')} cnc machining`;
  else if (pageType.startsWith('应用') && slug) fallback = `${slug.replace(/-/g, ' ')} cnc machining`;
  else if (slug && slug !== 'blog' && slug !== 'page') fallback = slug.replace(/-/g, ' ');

  return isValidKeQuery(fallback) ? fallback : '';
}

/** 次要关键词英文查询（能提取则查，否则留空以节省 KE 额度） */
function extractKeSecondaryQuery(secondaryKw, urlPath, pageType) {
  if (!isSeoKeywordPage(urlPath, pageType)) return '';
  if (/[a-z]{4,}/i.test(secondaryKw) && !/[\u4e00-\u9fff]/.test(secondaryKw)) {
    return secondaryKw.split(/[,，、]/)[0].trim();
  }

  const parts = urlPath.split('/').filter(Boolean);
  if (pageType.startsWith('行业') && parts[1]) return `${parts[1].replace(/-/g, ' ')} cnc parts`;
  if (pageType.startsWith('产品') && parts[1]) return `custom ${parts[1].replace(/-/g, ' ')}`;
  return '';
}

function blankKeywordFields() {
  return {
    primaryKw: '—',
    secondaryKw: '—',
    kePrimary: '',
    keSecondary: '',
    primaryVolume: '',
    primaryCpc: '',
    primaryCompetition: '',
    secondaryVolume: '',
  };
}

function styleWorksheetHeader(ws) {
  ws.getRow(1).font = { bold: true };
  ws.getRow(1).alignment = { vertical: 'middle', wrapText: true };
  ws.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    row.alignment = { vertical: 'top', wrapText: true };
  });
}

const SEO_COLUMNS = [
  { header: '序号', key: 'idx', width: 6 },
  { header: '页面URL', key: 'url', width: 52 },
  { header: '路径', key: 'urlPath', width: 42 },
  { header: '页面类型', key: 'type', width: 14 },
  { header: '优先级', key: 'tier', width: 8 },
  { header: '是否索引', key: 'indexed', width: 10 },
  { header: 'SEO标题', key: 'title', width: 48 },
  { header: 'Meta描述', key: 'description', width: 60 },
  { header: '主打关键词（中文）', key: 'primaryKw', width: 42 },
  { header: '次要关键词（中文）', key: 'secondaryKw', width: 48 },
  { header: 'KE主词（英文）', key: 'kePrimary', width: 38 },
  { header: '主词月搜索量（KE）', key: 'primaryVolume', width: 16 },
  { header: '主词CPC（KE）', key: 'primaryCpc', width: 12 },
  { header: '主词竞争度（KE）', key: 'primaryCompetition', width: 14 },
  { header: 'KE次词（英文）', key: 'keSecondary', width: 32 },
  { header: '次词月搜索量（KE）', key: 'secondaryVolume', width: 16 },
];

function formatVolume(vol) {
  if (vol == null || vol === '') return '';
  return vol;
}

function formatCompetition(value) {
  if (value == null || value === '') return '';
  return typeof value === 'number' ? Math.round(value * 100) / 100 : value;
}

function formatSeoKeywords(row) {
  if (!row.seoTarget) return '—';
  const parts = [row.primaryKw, row.secondaryKw].filter((p) => p && p !== '—');
  return parts.join('；') || '—';
}

function formatVolumeCell(value) {
  if (value === '' || value == null) return '—';
  return String(value);
}

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** 全站中文 Volume 报表（CSV + Markdown） */
async function writeChineseVolumeDocs(allRows, { withKe, keCountry, keCurrency }) {
  const header = [
    '序号',
    '页面URL',
    '页面类型',
    '优先级',
    'SEO关键词',
    'KE查询词（主词）',
    '主词月搜索量（Volume）',
    'KE查询词（次词）',
    '次词月搜索量（Volume）',
  ];

  const sorted = [...allRows].sort((a, b) => a.urlPath.localeCompare(b.urlPath));
  const lines = [header.join(',')];

  for (let i = 0; i < sorted.length; i++) {
    const row = sorted[i];
    lines.push(
      [
        i + 1,
        row.url,
        row.type,
        row.tier,
        formatSeoKeywords(row),
        row.kePrimary || '—',
        formatVolumeCell(row.primaryVolume),
        row.keSecondary || '—',
        formatVolumeCell(row.secondaryVolume),
      ]
        .map(csvEscape)
        .join(',')
    );
  }

  await writeFile(OUT_CSV, `\uFEFF${lines.join('\n')}\n`, 'utf8');

  const seoRows = sorted.filter((r) => r.seoTarget);
  const withPrimaryVol = seoRows.filter((r) => r.primaryVolume !== '' && r.primaryVolume != null);
  const volumePositive = withPrimaryVol.filter((r) => Number(r.primaryVolume) > 0);
  const primaryVolSum = volumePositive.reduce((sum, r) => sum + Number(r.primaryVolume), 0);

  const md = [
    '# 全站页面 KE 月搜索量统计',
    '',
    `> 生成时间：${new Date().toISOString().slice(0, 19).replace('T', ' ')}（UTC）`,
    `> 数据来源：Keywords Everywhere · 国家/地区 \`${keCountry}\` · 货币 \`${keCurrency}\``,
    withKe ? '' : '> ⚠️ 未调用 KE API；Volume 列为空。请运行 `npm run export:keywords:ke` 重新生成。',
    '',
    '## 说明',
    '',
    '- **SEO关键词**：页面主打 + 次要关键词（中文释义，便于运营对照）',
    '- **Volume**：KE 返回的 Google **月搜索量**（非本站实际点击；0 表示无数据或极低）',
    '- **KE查询词**：实际向 API 查询的英文关键词（由 SEO 标题 / URL 推断）',
    '- 完整表格见 [`site-pages-volume.csv`](./site-pages-volume.csv)（Excel 可直接打开）',
    '',
    '## 汇总',
    '',
    '| 统计项 | 数值 |',
    '|--------|-----:|',
    `| 全站页面总数 | ${sorted.length} |`,
    `| SEO 目标页 | ${seoRows.length} |`,
    `| 非 SEO 页 | ${sorted.length - seoRows.length} |`,
  ];

  if (withKe) {
    md.push(
      `| 已查主词 Volume 的页面 | ${withPrimaryVol.length} |`,
      `| 主词 Volume > 0 的页面 | ${volumePositive.length} |`,
      `| 主词 Volume 合计（有量页简单相加） | ${primaryVolSum.toLocaleString('en-US')} |`,
      '',
      '> 注意：不同页面可能共用同一 KE 查询词，合计 Volume **不能**当作全站可获得流量上限。',
    );
  }

  md.push(
    '',
    '## 主词 Volume > 0 的页面（按 Volume 降序）',
    '',
    '| 页面URL | SEO关键词 | 主词 Volume | KE查询词 |',
    '|---------|-----------|------------:|----------|',
  );

  const topRows = [...volumePositive].sort(
    (a, b) => Number(b.primaryVolume) - Number(a.primaryVolume)
  );
  for (const row of topRows.slice(0, 50)) {
    const kw = formatSeoKeywords(row).replace(/\|/g, '\\|');
    md.push(
      `| ${row.url} | ${kw} | ${row.primaryVolume} | ${row.kePrimary || '—'} |`
    );
  }
  if (topRows.length > 50) {
    md.push('', `*另有 ${topRows.length - 50} 个有量页面，见 CSV。*`);
  }

  md.push(
    '',
    '## 全部页面（前 30 行预览）',
    '',
    '| 页面URL | SEO关键词 | 主词 Volume |',
    '|---------|-----------|------------:|',
  );
  for (const row of sorted.slice(0, 30)) {
    const kw = formatSeoKeywords(row).replace(/\|/g, '\\|');
    md.push(
      `| ${row.url} | ${kw} | ${formatVolumeCell(row.primaryVolume)} |`
    );
  }
  if (sorted.length > 30) {
    md.push('', `*共 ${sorted.length} 页，完整列表见 CSV。*`);
  }

  await writeFile(OUT_MD, `${md.join('\n')}\n`, 'utf8');
}

function classifyPage(urlPath) {
  for (const rule of PAGE_TYPE_RULES) {
    if (rule.test(urlPath)) return { type: rule.type, tier: rule.tier };
  }
  return { type: '其他', tier: 'T4' };
}

function htmlToUrlPath(filePath) {
  const rel = path.relative(DIST, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  const dir = path.dirname(rel).replace(/\\/g, '/');
  return dir === '.' ? '/' : `/${dir}/`;
}

function parseMeta(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
  return {
    title: titleMatch?.[1]?.trim() ?? '',
    description: descMatch?.[1]?.trim() ?? '',
    noindex,
  };
}

function slugToChinese(slug) {
  if (SLUG_CN[slug]) return SLUG_CN[slug];
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function deriveBlogKeywords(slug, title, description) {
  const core = seoTitleCore(title);
  if (/-suppliers(-|$)/.test(slug) || /-supplier-/.test(slug)) {
    return {
      primary: `中国CNC供应商选型（${core}）`,
      secondary: '供应商对比、审计清单、RFQ准备',
    };
  }
  if (slug.startsWith('what-is-') || slug.startsWith('understanding-')) {
    return {
      primary: `CNC概念解释（${core}）`,
      secondary: '工程师词典、RFQ术语',
    };
  }
  if (slug.startsWith('how-to-')) {
    return {
      primary: `CNC操作指南（${core}）`,
      secondary: '图纸、公差、供应商沟通',
    };
  }
  if (/vs-|-comparison|compare/.test(slug)) {
    return {
      primary: `加工/材料对比（${core}）`,
      secondary: '选型决策、成本与交期',
    };
  }
  return {
    primary: `CNC技术文章（${core}）`,
    secondary: description.slice(0, 60) || '工程师选型、采购评估',
  };
}

function deriveKeywords(urlPath, title, description, pageType) {
  const parts = urlPath.split('/').filter(Boolean);
  const slug = parts[parts.length - 1] ?? 'home';
  const staticKw = STATIC_PAGE_KW[urlPath];
  if (staticKw) return staticKw;

  if (urlPath === '/') {
    return {
      primary: 'CNC机加工供应商（custom CNC machining supplier China）',
      secondary: '精密零件加工、24小时报价、DFM评审',
    };
  }
  if (urlPath === '/contact/') {
    return {
      primary: 'CNC加工询价（CNC machining quote RFQ）',
      secondary: '上传图纸、免费DFM、24小时报价',
    };
  }
  if (pageType.startsWith('产品')) {
    const cn = slugToChinese(parts[1] ?? slug);
    return {
      primary: `${cn} CNC加工（${parts[1] ?? slug} machining）`,
      secondary: '定制机加工、公差、交期、中国供应商',
    };
  }
  if (pageType.startsWith('材料')) {
    const cn = slugToChinese(parts[1] ?? slug);
    return {
      primary: `${cn} CNC加工（${parts[1] ?? slug} cnc machining）`,
      secondary: '材料选型、可加工性、检验报告',
    };
  }
  if (pageType.startsWith('能力')) {
    const cn = slugToChinese(parts[1] ?? slug);
    return {
      primary: `${cn}服务（${parts[1] ?? slug} services China）`,
      secondary: '定制加工、公差、批量生产',
    };
  }
  if (pageType.startsWith('行业')) {
    const cn = slugToChinese(parts[1] ?? slug);
    return {
      primary: `${cn}行业CNC加工（${parts[1] ?? slug} cnc parts）`,
      secondary: '行业合规、案例、质量文档',
    };
  }
  if (pageType.startsWith('应用')) {
    const cn = slugToChinese(slug);
    return {
      primary: `${cn} CNC加工（${slug}）`,
      secondary: '定制零件、公差、行业合规',
    };
  }
  if (pageType.startsWith('特征')) {
    const cn = slugToChinese(slug);
    return {
      primary: `${cn}特征加工（${slug}）`,
      secondary: 'DFM建议、工艺能力、报价',
    };
  }
  if (pageType.startsWith('标准')) {
    const cn = slugToChinese(slug);
    return {
      primary: `${cn}合规加工（${slug}）`,
      secondary: '质量体系、文档、行业要求',
    };
  }
  if (pageType.startsWith('对比')) {
    const core = seoTitleCore(title);
    return {
      primary: `加工选型对比（${core}）`,
      secondary: '决策表、材料/工艺对比、RFQ准备',
    };
  }
  if (pageType === '博客标签' && BLOG_TAG_KW[slug]) return BLOG_TAG_KW[slug];
  if (pageType.startsWith('博客')) {
    if (pageType === '博客文章') return deriveBlogKeywords(slug, title, description);
    const core = seoTitleCore(title);
    return {
      primary: `CNC博客栏目（${core || slug}）`,
      secondary: '技术文章、采购指南',
    };
  }
  if (pageType.includes('案例')) {
    return {
      primary: `CNC加工案例（${slugToChinese(slug)} case study）`,
      secondary: '公差达成、检验、行业证明',
    };
  }
  if (pageType.includes('资源')) {
    return {
      primary: `工程资源（${slug.replace(/-/g, ' ')} guide）`,
      secondary: 'DFM、公差、检验样本、外链资产',
    };
  }
  if (pageType.includes('术语')) {
    return {
      primary: `CNC术语（${slug} glossary）`,
      secondary: '工程师词典、RFQ准备',
    };
  }

  const core = seoTitleCore(title);
  return {
    primary: core ? `${slugToChinese(slug)}（${core}）` : slugToChinese(slug),
    secondary: '定制CNC加工、24小时报价',
  };
}

async function walkHtml(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(full, acc);
    else if (entry.name === 'index.html') acc.push(full);
  }
  return acc;
}

async function main() {
  const withKe = process.argv.includes('--with-ke');
  const apiKey = process.env.KEYWORDS_EVERYWHERE_API_KEY?.trim();
  const keCountry = process.env.KEYWORDS_EVERYWHERE_COUNTRY?.trim() || 'us';
  const keCurrency = process.env.KEYWORDS_EVERYWHERE_CURRENCY?.trim() || 'USD';

  if (withKe && !apiKey) {
    console.error(
      '缺少 KEYWORDS_EVERYWHERE_API_KEY。请在 .env 中设置，或：\n' +
        '  KEYWORDS_EVERYWHERE_API_KEY=your_key node scripts/export-page-keywords.mjs --with-ke'
    );
    process.exit(1);
  }

  const htmlFiles = await walkHtml(DIST);
  const rows = [];

  for (const file of htmlFiles.sort()) {
    const urlPath = htmlToUrlPath(file);
    const html = await readFile(file, 'utf8');
    const meta = parseMeta(html);
    const { type, tier } = classifyPage(urlPath);
    const indexed =
      !meta.noindex && urlPath !== '/404/' && urlPath !== '/thank-you/' && urlPath !== '/401/';
    const title = decodeHtml(meta.title);
    const description = decodeHtml(meta.description);
    const kw = deriveKeywords(urlPath, meta.title, meta.description, type);
    const seoTarget = isSeoKeywordPage(urlPath, type);
    const kePrimary = seoTarget ? extractKeQuery(title, kw.primary, urlPath, type) : '';
    const keSecondary = seoTarget ? extractKeSecondaryQuery(kw.secondary, urlPath, type) : '';

    rows.push({
      url: `${SITE}${urlPath === '/' ? '' : urlPath}`,
      urlPath,
      type,
      tier,
      title,
      description,
      seoTarget,
      excludeReason: seoTarget ? '' : NON_SEO_REASON[type] ?? '非 SEO 目标页',
      ...(seoTarget
        ? {
            primaryKw: kw.primary,
            secondaryKw: kw.secondary,
            kePrimary,
            keSecondary,
            primaryVolume: '',
            primaryCpc: '',
            primaryCompetition: '',
            secondaryVolume: '',
          }
        : blankKeywordFields()),
      indexed: indexed ? '是' : '否',
    });
  }

  const seoRows = rows.filter((r) => r.seoTarget);
  const excludedRows = rows.filter((r) => !r.seoTarget);

  if (withKe) {
    const queries = seoRows.flatMap((r) => [r.kePrimary, r.keSecondary].filter(Boolean));
    const uniqueCount = new Set(queries.map((q) => q.trim().toLowerCase())).size;
    console.log(
      `Keywords Everywhere: 查询 ${uniqueCount} 个唯一关键词（country=${keCountry}，约消耗 ${uniqueCount} credits）…`
    );

    const volumeMap = await fetchKeywordVolumes(queries, {
      apiKey,
      country: keCountry,
      currency: keCurrency,
      onProgress: (done, total) => {
        process.stdout.write(`\rKE 进度: ${done}/${total}`);
      },
    });
    console.log('\nKE 查询完成。');

    for (const row of seoRows) {
      const primary = lookupVolume(volumeMap, row.kePrimary);
      const secondary = lookupVolume(volumeMap, row.keSecondary);
      row.primaryVolume = formatVolume(primary?.vol);
      row.primaryCpc = primary?.cpc ?? '';
      row.primaryCompetition = formatCompetition(primary?.competition);
      row.secondaryVolume = formatVolume(secondary?.vol);
    }
  }

  const wb = new ExcelJS.Workbook();
  wb.creator = 'machining-supplier-site';
  wb.created = new Date();

  const ws = wb.addWorksheet('SEO页面关键词', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });
  ws.columns = SEO_COLUMNS;
  seoRows.forEach((row, i) => {
    ws.addRow({ idx: i + 1, ...row });
  });
  styleWorksheetHeader(ws);

  const excludedWs = wb.addWorksheet('非SEO页面', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });
  excludedWs.columns = [
    { header: '序号', key: 'idx', width: 6 },
    { header: '页面URL', key: 'url', width: 52 },
    { header: '路径', key: 'urlPath', width: 42 },
    { header: '页面类型', key: 'type', width: 14 },
    { header: '是否索引', key: 'indexed', width: 10 },
    { header: 'SEO标题', key: 'title', width: 48 },
    { header: '排除原因', key: 'excludeReason', width: 36 },
  ];
  excludedRows.forEach((row, i) => {
    excludedWs.addRow({
      idx: i + 1,
      url: row.url,
      urlPath: row.urlPath,
      type: row.type,
      indexed: row.indexed,
      title: row.title,
      excludeReason: row.excludeReason,
    });
  });
  styleWorksheetHeader(excludedWs);

  const summary = wb.addWorksheet('汇总');
  const typeCounts = seoRows.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
    return acc;
  }, {});
  summary.addRow(['统计项', '数值']);
  summary.addRow(['全站页面总数', rows.length]);
  summary.addRow(['SEO 目标页（主表）', seoRows.length]);
  summary.addRow(['非 SEO 页（已排除）', excludedRows.length]);
  summary.addRow(['可索引 SEO 页', seoRows.filter((r) => r.indexed === '是').length]);
  summary.addRow(['noindex/排除页', rows.filter((r) => r.indexed === '否').length]);
  if (withKe) {
    const withVol = seoRows.filter((r) => r.primaryVolume !== '' && r.primaryVolume != null);
    const zeroVol = withVol.filter((r) => Number(r.primaryVolume) === 0);
    const withTraffic = withVol.filter((r) => Number(r.primaryVolume) > 0);
    summary.addRow(['KE 已查主词数', withVol.length]);
    summary.addRow(['KE 主词 Volume>0', withTraffic.length]);
    summary.addRow(['KE 主词 Volume=0', zeroVol.length]);
    summary.addRow(['KE 国家/货币', `${keCountry} / ${keCurrency}`]);
  } else {
    summary.addRow(['KE 搜索量', '未查询（加 --with-ke 并设置 API Key）']);
  }
  summary.addRow([]);
  summary.addRow(['页面类型', '数量']);
  Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([t, c]) => summary.addRow([t, c]));

  await wb.xlsx.writeFile(OUT);
  await writeChineseVolumeDocs(rows, { withKe, keCountry, keCurrency });
  console.log(
    `Exported ${seoRows.length} SEO pages (+ ${excludedRows.length} excluded) to ${OUT}${withKe ? ' (含 KE 搜索量)' : ''}`
  );
  console.log(`中文 Volume 报表: ${OUT_CSV}`);
  console.log(`中文 Volume 说明: ${OUT_MD}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
