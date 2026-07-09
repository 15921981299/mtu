/**
 * 竞品（HMaking + FS Fab + Runsom）关键词 vs 本站覆盖缺口分析
 * 输出: docs/competitor-keyword-gap.csv
 */
import ExcelJS from 'exceljs';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from './lib/load-env.mjs';
import { fetchKeywordVolumes } from './lib/keywordseverywhere.mjs';

loadEnvFile();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs', 'competitor-keyword-gap.csv');

/** 竞品重点词 + 来源 + 建议动作 */
const COMPETITOR_GAPS = [
  // —— HMaking 侧重 ——
  {
    keyword: 'die casting china',
    volumeHint: '中',
    competitor: 'HMaking',
    category: '工艺',
    siteMatch: ['compare/cnc-machining-vs-die-casting'],
    suggestedUrl: '/compare/cnc-machining-vs-die-casting/',
    status: '部分覆盖',
    action: '对比页已有；若要做业务需新增 /capabilities/die-casting/ 或明确不做并在对比页强化 RFQ',
  },
  {
    keyword: 'cnc drilling services',
    volumeHint: '低-中',
    competitor: 'HMaking',
    category: '工艺',
    siteMatch: [],
    suggestedUrl: '/capabilities/cnc-milling/',
    status: '缺口',
    action: '无独立 Drilling 页；可在 milling 页加 H2「Drilling & tapped holes」或子页',
  },
  {
    keyword: 'aluminum die casting',
    volumeHint: '中',
    competitor: 'HMaking',
    category: '工艺+材料',
    siteMatch: ['materials/aluminum'],
    suggestedUrl: '/materials/aluminum/',
    status: '缺口',
    action: '材料页未覆盖 die casting；仅对比文提及',
  },
  {
    keyword: 'zamak die casting',
    volumeHint: '低',
    competitor: 'HMaking',
    category: '材料',
    siteMatch: [],
    suggestedUrl: '—',
    status: '缺口',
    action: '非核心可跳过；或 blog 1 篇「CNC vs zinc die casting 选型」',
  },
  {
    keyword: 'aluminum billet cnc',
    volumeHint: '低',
    competitor: 'HMaking',
    category: '产品',
    siteMatch: ['materials/aluminum'],
    suggestedUrl: '/materials/aluminum/',
    status: '部分覆盖',
    action: '铝材页补 billet/plate stock 段落 + 案例内链',
  },
  {
    keyword: 'cnc hardware parts',
    volumeHint: '低',
    competitor: 'HMaking',
    category: '行业',
    siteMatch: [],
    suggestedUrl: '/industries/',
    status: '缺口',
    action: '无 Hardware 行业；可映射到 industrial-automation 或 products/custom-fasteners',
  },
  {
    keyword: 'factory tour cnc china',
    volumeHint: '低',
    competitor: 'HMaking',
    category: '信任',
    siteMatch: ['about', 'certifications'],
    suggestedUrl: '/about/',
    status: '部分覆盖',
    action: '补 Factory tour 视频/图库区块（site.social.youtube 已有可嵌入）',
  },

  // —— FS Fab 侧重 ——
  {
    keyword: 'sheet metal fabrication china',
    volumeHint: '中-高',
    competitor: 'FS Fab',
    category: '工艺',
    siteMatch: ['compare/laser-cutting-vs-cnc-milling'],
    suggestedUrl: '—',
    status: '缺口',
    action: '无钣金业务则不做；对比文可链到「何时用钣金 vs CNC」',
  },
  {
    keyword: 'swiss type turning',
    volumeHint: '中',
    competitor: 'FS Fab',
    category: '工艺',
    siteMatch: ['compare/swiss-machining-vs-conventional-turning', 'capabilities/cnc-turning'],
    suggestedUrl: '/compare/swiss-machining-vs-conventional-turning/',
    status: '部分覆盖',
    action: '对比文已有；turning 能力页补 Swiss/live tooling 段落',
  },
  {
    keyword: 'cnc drilling services',
    volumeHint: '低-中',
    competitor: 'FS Fab',
    category: '工艺',
    siteMatch: [],
    suggestedUrl: '/capabilities/cnc-milling/',
    status: '缺口',
    action: '同 HMaking',
  },
  {
    keyword: 'electroplating cnc parts',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '表面处理',
    siteMatch: ['blog/anodizing', 'compare/anodizing'],
    suggestedUrl: '/compare/anodizing-vs-powder-coating-cnc-parts/',
    status: '部分覆盖',
    action: '无 electroplating 专页；finishes 博客簇可补 1 篇',
  },
  {
    keyword: 'ptfe cnc machining',
    volumeHint: '低-中',
    competitor: 'FS Fab',
    category: '材料',
    siteMatch: ['blog/peek', 'materials/engineering-plastics'],
    suggestedUrl: '/materials/engineering-plastics/',
    status: '缺口',
    action: '工程塑料页补 PTFE/Teflon 段落或子页',
  },
  {
    keyword: 'delrin cnc machining',
    volumeHint: '低-中',
    competitor: 'FS Fab',
    category: '材料',
    siteMatch: ['materials/engineering-plastics'],
    suggestedUrl: '/materials/engineering-plastics/',
    status: '部分覆盖',
    action: '塑料页显式写 Delrin/POM 牌号',
  },
  {
    keyword: 'ceramic cnc machining',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '材料',
    siteMatch: [],
    suggestedUrl: '—',
    status: '缺口',
    action: '非能力可跳过；半导体页可提「陶瓷绝缘件转供应链」',
  },
  {
    keyword: 'brass cnc machining',
    volumeHint: '中',
    competitor: 'FS Fab',
    category: '材料',
    siteMatch: ['materials/brass-copper'],
    suggestedUrl: '/materials/brass-copper/',
    status: '已覆盖',
    action: '保持；Title 可含 brass cnc machining',
  },
  {
    keyword: 'bronze cnc machining',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '材料',
    siteMatch: ['materials/bronze-alloys'],
    suggestedUrl: '/materials/bronze-alloys/',
    status: '已覆盖',
    action: '保持',
  },
  {
    keyword: 'aircraft engine components cnc',
    volumeHint: '低-中',
    competitor: 'FS Fab',
    category: '行业 spoke',
    siteMatch: ['industries/aerospace', 'applications/aerospace-structural'],
    suggestedUrl: '/applications/aerospace-structural-components/',
    status: '部分覆盖',
    action: '新增 spoke「aerospace engine components」或航空页加 engine 段落',
  },
  {
    keyword: 'telecom cnc parts',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '行业',
    siteMatch: [],
    suggestedUrl: '/industries/consumer-electronics/',
    status: '缺口',
    action: '可并入 consumer-electronics 或 applications/enclosure',
  },
  {
    keyword: 'marine offshore cnc parts',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '行业',
    siteMatch: ['industries/marine-shipbuilding'],
    suggestedUrl: '/industries/marine-shipbuilding/',
    status: '已覆盖',
    action: '保持；补 offshore/NACE 内链',
  },
  {
    keyword: 'impeller cnc machining',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '产品',
    siteMatch: ['products/pump-components'],
    suggestedUrl: '/products/pump-components/',
    status: '部分覆盖',
    action: '泵件页补 impeller 案例关键词',
  },
  {
    keyword: 'cnc flange machining',
    volumeHint: '低-中',
    competitor: 'FS Fab',
    category: '产品',
    siteMatch: ['products/flanges-fittings'],
    suggestedUrl: '/products/flanges-fittings/',
    status: '已覆盖',
    action: '可增 blog「flange machining guide」（FS 已有）',
  },
  {
    keyword: 'precision bearing machining',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '产品',
    siteMatch: ['products/bushings-bearings'],
    suggestedUrl: '/products/bushings-bearings/',
    status: '部分覆盖',
    action: '产品页 Title 含 bearing machining',
  },
  {
    keyword: 'helical gear cnc machining',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '产品',
    siteMatch: ['products/gears-sprockets'],
    suggestedUrl: '/products/gears-sprockets/',
    status: '已覆盖',
    action: '保持',
  },
  {
    keyword: 'small batch cnc machining',
    volumeHint: '中',
    competitor: 'FS Fab',
    category: '商业意图',
    siteMatch: ['blog/low-volume', 'blog/moq'],
    suggestedUrl: '/blog/what-is-cnc-machining-moq/',
    status: '部分覆盖',
    action: '新增 hub 文「Small batch CNC guide」链 MOQ + contact',
  },
  {
    keyword: 'instant quote cnc',
    volumeHint: '中',
    competitor: 'FS Fab',
    category: '转化',
    siteMatch: ['contact'],
    suggestedUrl: '/contact/',
    status: '已覆盖',
    action: 'CTA 文案可 A/B「Instant Quote」vs「Quote in 24h」',
  },
  {
    keyword: 'iatf 16949 cnc machining',
    volumeHint: '低',
    competitor: 'FS Fab',
    category: '认证',
    siteMatch: ['industries/automotive', 'standards'],
    suggestedUrl: '/standards/',
    status: '部分覆盖',
    action: 'automotive 标准页显式 IATF；certifications 页补充',
  },
  {
    keyword: 'iso 13485 cnc machining',
    volumeHint: '低-中',
    competitor: 'FS Fab',
    category: '认证',
    siteMatch: ['industries/medical-devices', 'blog/medical-grade'],
    suggestedUrl: '/industries/medical-devices/',
    status: '部分覆盖',
    action: '医疗行业页 + 已索引 supplier 文强化',
  },

  // —— KE 高量 + 两竞品共有 ——
  {
    keyword: 'rapid prototyping cnc',
    volumeHint: '高(301k related)',
    competitor: 'KE+竞品',
    category: '商业意图',
    siteMatch: ['blog/prototype', 'capabilities'],
    suggestedUrl: '/capabilities/cnc-milling/',
    status: '部分覆盖',
    action: '首页/能力 Hub 显式「rapid prototyping」；独立 landing 可选',
  },
  {
    keyword: 'machine shop near me',
    volumeHint: '高(90k)',
    competitor: 'KE',
    category: '本地意图',
    siteMatch: [],
    suggestedUrl: '—',
    status: '不适用',
    action: 'B2B 中国供应商不做 local；用 Google Ads 排除 near me',
  },
  {
    keyword: 'online cnc quote',
    volumeHint: '中(related)',
    competitor: 'KE+竞品',
    category: '转化',
    siteMatch: ['contact'],
    suggestedUrl: '/contact/?source=online-quote',
    status: '已覆盖',
    action: 'contact 页 Title 含 online quote / upload CAD',
  },
  {
    keyword: 'cnc machining cost',
    volumeHint: '中',
    competitor: 'KE+竞品',
    category: '信息+商业',
    siteMatch: ['blog/how-to-calculate-cnc-machining-cost', 'blog/how-to-reduce-cnc-machining-cost'],
    suggestedUrl: '/blog/how-to-calculate-cnc-machining-cost-per-part/',
    status: '已覆盖',
    action: '内链到 contact；Ads 可投 cost/quote 组合',
  },
  {
    keyword: '5 axis cnc machining',
    volumeHint: '中',
    competitor: 'KE+竞品',
    category: '工艺',
    siteMatch: ['capabilities/5-axis-machining'],
    suggestedUrl: '/capabilities/5-axis-machining/',
    status: '已覆盖',
    action: '守城页；加强外链与案例',
  },
  {
    keyword: 'cnc aluminum parts',
    volumeHint: '中',
    competitor: 'KE+竞品',
    category: '材料',
    siteMatch: ['materials/aluminum'],
    suggestedUrl: '/materials/aluminum/',
    status: '已覆盖',
    action: '守城页（KE 1000 vol 级）',
  },
  {
    keyword: 'custom cnc parts china',
    volumeHint: '中',
    competitor: 'KE+竞品',
    category: '核心',
    siteMatch: ['/'],
    suggestedUrl: '/',
    status: '已覆盖',
    action: '首页 H1/Title 已对齐；持续收录与外链',
  },
];

/** Runsom (runsom.com) 导航种子词 + KE 实测 (US) — 可用 API 刷新 */
const RUNSOM_KE_KEYWORDS = [
  {
    keyword: '3d printing services',
    volume: 49500,
    cpc: '$1.19',
    runsomNav: 'Services → 3D Printing',
    category: '工艺(非CNC)',
    siteMatch: ['compare/cnc-machining-vs-3d-printing-metal'],
    suggestedUrl: '/compare/cnc-machining-vs-3d-printing-metal/',
    status: '不适用',
    action: '不做3D打印；对比文导流CNC RFQ，Ads排除3d printing',
  },
  {
    keyword: 'cnc milling',
    volume: 18100,
    cpc: '$1.32',
    runsomNav: 'Services → CNC Milling',
    category: '工艺',
    siteMatch: ['capabilities/cnc-milling'],
    suggestedUrl: '/capabilities/cnc-milling/',
    status: '已覆盖',
    action: '守城页；KE量大，优先GSC索引+外链',
  },
  {
    keyword: 'sheet metal fabrication',
    volume: 12100,
    cpc: '$3.07',
    runsomNav: 'Services → Sheet Metal Fabrication',
    category: '工艺',
    siteMatch: ['compare/laser-cutting-vs-cnc-milling'],
    suggestedUrl: '—',
    status: '缺口',
    action: '无钣金业务不做页；compare文说明何时用钣金vs CNC',
  },
  {
    keyword: 'cnc turning',
    volume: 9900,
    cpc: '$3.15',
    runsomNav: 'Services → CNC Turning',
    category: '工艺',
    siteMatch: ['capabilities/cnc-turning'],
    suggestedUrl: '/capabilities/cnc-turning/',
    status: '已覆盖',
    action: '守城页；补Swiss/live tooling段落(P2)',
  },
  {
    keyword: 'cnc machining services',
    volume: 8100,
    cpc: '$4.37',
    runsomNav: '首页 H1 / CNC Machining',
    category: '核心',
    siteMatch: ['capabilities', '/'],
    suggestedUrl: '/capabilities/',
    status: '已覆盖',
    action: 'capabilities Hub + 首页对齐 services 词',
  },
  {
    keyword: '5 axis cnc machining',
    volume: 4400,
    cpc: '$1.33',
    runsomNav: 'Services → 5-Axis CNC Machining',
    category: '工艺',
    siteMatch: ['capabilities/5-axis-machining'],
    suggestedUrl: '/capabilities/5-axis-machining/',
    status: '已覆盖',
    action: '守城页；加强案例与内链',
  },
  {
    keyword: 'swiss cnc machining',
    volume: 1000,
    cpc: '$1.64',
    runsomNav: 'Services → Swiss CNC Machining',
    category: '工艺',
    siteMatch: ['compare/swiss-machining-vs-conventional-turning', 'capabilities/cnc-turning'],
    suggestedUrl: '/compare/swiss-machining-vs-conventional-turning/',
    status: '部分覆盖',
    action: 'turning页+对比文；Runsom同级竞争词',
  },
  {
    keyword: 'ceramic cnc machining',
    volume: 1000,
    cpc: '$7.46',
    runsomNav: 'Materials → Ceramic CNC',
    category: '材料',
    siteMatch: [],
    suggestedUrl: '—',
    status: '缺口',
    action: '非核心可跳过；半导体页可提及陶瓷件外包',
  },
  {
    keyword: 'precision cnc machining',
    volume: 590,
    cpc: '$2.45',
    runsomNav: 'Title: Precision CNC Machining Services in China',
    category: '核心',
    siteMatch: ['/', 'capabilities'],
    suggestedUrl: '/',
    status: '部分覆盖',
    action: 'Title可选 precision；主量靠 milling/turning 子页',
  },
  {
    keyword: 'cnc machining china',
    volume: 480,
    cpc: '$2.53',
    runsomNav: 'Title 地域词',
    category: '地域',
    siteMatch: ['/'],
    suggestedUrl: '/',
    status: '部分覆盖',
    action: '首页Title含 from China / supplier China',
  },
  {
    keyword: 'cnc prototyping',
    volume: 480,
    cpc: '$4.04',
    runsomNav: 'Services → Rapid Prototyping',
    category: '商业意图',
    siteMatch: ['capabilities/cnc-milling'],
    suggestedUrl: '/capabilities/cnc-milling/',
    status: '部分覆盖',
    action: '能力页+首页写 prototyping；链contact',
  },
  {
    keyword: 'cnc aluminum',
    volume: 390,
    cpc: '$2.68',
    runsomNav: 'Materials → CNC Aluminum',
    category: '材料',
    siteMatch: ['materials/aluminum'],
    suggestedUrl: '/materials/aluminum/',
    status: '已覆盖',
    action: '铝材守城页(KE ~1000 on aluminum cnc machining)',
  },
  {
    keyword: 'rapid prototyping cnc',
    volume: 320,
    cpc: '$4.05',
    runsomNav: 'Services → Rapid Prototyping',
    category: '商业意图',
    siteMatch: ['capabilities'],
    suggestedUrl: '/capabilities/',
    status: '部分覆盖',
    action: 'Hub/首页显式 rapid prototyping(P2)',
  },
  {
    keyword: 'custom cnc parts',
    volume: 320,
    cpc: '$2.94',
    runsomNav: '首页 custom manufacturing',
    category: '核心',
    siteMatch: ['products', '/'],
    suggestedUrl: '/products/',
    status: '部分覆盖',
    action: 'products Hub + 首页 custom parts 文案',
  },
  {
    keyword: 'cnc titanium',
    volume: 210,
    cpc: '$1.58',
    runsomNav: 'Materials → CNC Titanium',
    category: '材料',
    siteMatch: ['materials/titanium'],
    suggestedUrl: '/materials/titanium/',
    status: '已覆盖',
    action: '保持；航空/医疗内链',
  },
  {
    keyword: 'micromachining',
    volume: 140,
    cpc: '$7.00',
    runsomNav: 'Services → Micromachining',
    category: '工艺',
    siteMatch: [],
    suggestedUrl: '/features/',
    status: '缺口',
    action: '可选 features 页或 blog；Runsom差异化词',
  },
  {
    keyword: 'die casting service',
    volume: 110,
    cpc: '$10.56',
    runsomNav: '页脚 Services → Die casting',
    category: '工艺',
    siteMatch: ['compare/cnc-machining-vs-die-casting'],
    suggestedUrl: '/compare/cnc-machining-vs-die-casting/',
    status: '部分覆盖',
    action: '不做压铸；对比页强化RFQ',
  },
  {
    keyword: 'cnc stainless steel',
    volume: 90,
    cpc: '$2.28',
    runsomNav: 'Materials → CNC Stainless Steel',
    category: '材料',
    siteMatch: ['materials/stainless-steel'],
    suggestedUrl: '/materials/stainless-steel/',
    status: '已覆盖',
    action: '保持',
  },
  {
    keyword: 'cnc brass',
    volume: 70,
    cpc: '$1.43',
    runsomNav: 'Materials → CNC Brass',
    category: '材料',
    siteMatch: ['materials/brass-copper'],
    suggestedUrl: '/materials/brass-copper/',
    status: '已覆盖',
    action: '保持',
  },
  {
    keyword: 'cnc medical parts',
    volume: 30,
    cpc: '$0.00',
    runsomNav: 'Industries → Medical',
    category: '行业',
    siteMatch: ['industries/medical-devices'],
    suggestedUrl: '/industries/medical-devices/',
    status: '已覆盖',
    action: 'KE量低但必守；ISO13485文案(P2)',
  },
  {
    keyword: 'oil and gas cnc machining',
    volume: 20,
    cpc: '$0.00',
    runsomNav: 'Industries → Oil & Gas',
    category: '行业',
    siteMatch: ['industries/oil-gas'],
    suggestedUrl: '/industries/oil-gas/',
    status: '已覆盖',
    action: '保持；NACE案例内链',
  },
  {
    keyword: 'ptfe cnc machining',
    volume: 10,
    cpc: '$13.54',
    runsomNav: 'Materials → CNC PTFE/Teflon',
    category: '材料',
    siteMatch: ['materials/engineering-plastics'],
    suggestedUrl: '/materials/engineering-plastics/',
    status: '缺口',
    action: '工程塑料页补PTFE段(P1)',
  },
  {
    keyword: 'cnc peek machining',
    volume: 0,
    cpc: '$0.00',
    runsomNav: 'Materials → CNC PEEK',
    category: '材料',
    siteMatch: ['blog/peek-machining-guide'],
    suggestedUrl: '/blog/peek-machining-guide/',
    status: '部分覆盖',
    action: '塑料页+已有blog；Runsom有独立PEEK页可不必复制',
  },
  {
    keyword: 'cnc optical components',
    volume: 0,
    cpc: '$0.00',
    runsomNav: 'Industries → Optical Components',
    category: '行业',
    siteMatch: [],
    suggestedUrl: '/industries/semiconductor-electronics/',
    status: '缺口',
    action: 'KE=0；可映射半导体/消费电子页',
  },
  {
    keyword: 'manifold block machining',
    volume: 0,
    cpc: '$0.00',
    runsomNav: 'Industries → Manifold block',
    category: '产品/行业',
    siteMatch: ['products/manifolds-valve-bodies'],
    suggestedUrl: '/products/manifolds-valve-bodies/',
    status: '部分覆盖',
    action: '歧管产品页Title含 manifold',
  },
  {
    keyword: 'communication industry cnc',
    volume: 0,
    cpc: '$0.00',
    runsomNav: 'Industries → Communication Industry',
    category: '行业',
    siteMatch: [],
    suggestedUrl: '/industries/consumer-electronics/',
    status: '缺口',
    action: '并入consumer-electronics或enclosure应用页',
  },
  {
    keyword: 'injection mould services',
    volume: 0,
    cpc: '$0.00',
    runsomNav: '页脚 → Injection mould Services',
    category: '工艺(非CNC)',
    siteMatch: [],
    suggestedUrl: '—',
    status: '不适用',
    action: '不做注塑；跳过',
  },
];

function parseKeCsv() {
  const text = readFileSync(path.join(ROOT, 'docs', 'ke-related-keywords-deduped.csv'), 'utf8');
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].match(/("([^"]|"")*"|[^,]+)/g)?.map((c) =>
      c.replace(/^"|"$/g, '').replace(/""/g, '"')
    ) ?? [];
    if (cols.length >= 3) {
      rows.push({
        seed: cols[0],
        keyword: cols[1],
        volume: Number(cols[2]) || 0,
      });
    }
  }
  return rows;
}

function csvEscape(v) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

async function loadSiteKePrimary() {
  const file = path.join(ROOT, 'docs', 'site-pages-keywords.xlsx');
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(file);
  const ws = wb.getWorksheet('SEO页面关键词');
  const primaries = new Set();
  ws.eachRow((r, i) => {
    if (i === 1) return;
    const ke = r.getCell(11).value;
    const p = r.getCell(3).value;
    if (ke) primaries.add(String(ke).toLowerCase());
    if (p) primaries.add(String(p).toLowerCase());
  });
  return primaries;
}

function matchKeHighIntent(keRows, pattern) {
  return keRows
    .filter((r) => r.volume > 0 && pattern.test(r.keyword))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)
    .map((r) => `${r.keyword} (${r.volume})`)
    .join('; ');
}

async function refreshRunsomVolumes(entries) {
  const apiKey = process.env.KEYWORDS_EVERYWHERE_API_KEY?.trim();
  if (!apiKey) return entries;

  const keywords = entries.map((e) => e.keyword);
  try {
    const map = await fetchKeywordVolumes(keywords, {
      apiKey,
      country: process.env.KEYWORDS_EVERYWHERE_COUNTRY?.trim() || 'us',
      currency: process.env.KEYWORDS_EVERYWHERE_CURRENCY?.trim() || 'USD',
    });
    return entries.map((e) => {
      const m = map.get(e.keyword.trim().toLowerCase().replace(/\s+/g, ' '));
      if (!m) return e;
      return {
        ...e,
        volume: m.vol ?? e.volume,
        cpc: m.cpc ?? e.cpc,
        competition: m.competition ?? '',
      };
    });
  } catch (err) {
    console.warn('KE refresh skipped:', err.message);
    return entries;
  }
}

async function main() {
  const keRows = parseKeCsv();
  const runsomEntries = await refreshRunsomVolumes(RUNSOM_KE_KEYWORDS);

  const header = [
    '优先级',
    '关键词',
    'KE月搜索量(US)',
    'KE CPC',
    '竞品来源',
    '竞品栏目',
    '类别',
    '覆盖状态',
    '本站最接近URL',
    '建议动作',
  ];

  const priorityOrder = { 缺口: 'P1', 部分覆盖: 'P2', 已覆盖: 'P3', 不适用: '—' };

  const rows = COMPETITOR_GAPS.map((g) => {
    const re = new RegExp(g.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').split(' ')[0], 'i');
    const keExamples = matchKeHighIntent(keRows, re);
    return [
      priorityOrder[g.status] ?? 'P2',
      g.keyword,
      keExamples || g.volumeHint,
      '',
      g.competitor,
      '',
      g.category,
      g.status,
      g.suggestedUrl,
      g.action,
    ];
  });

  const runsomRows = runsomEntries.map((r) => [
    priorityOrder[r.status] ?? 'P2',
    r.keyword,
    r.volume,
    r.cpc,
    'Runsom',
    r.runsomNav,
    r.category,
    r.status,
    r.suggestedUrl,
    r.action,
  ]);

  const all = [header, ...rows, ...runsomRows];
  writeFileSync(OUT, `\uFEFF${all.map((r) => r.map(csvEscape).join(',')).join('\n')}`, 'utf8');

  const runsomVolSum = runsomEntries.filter((r) => r.volume > 0).reduce((s, r) => s + r.volume, 0);
  const gaps = [...rows, ...runsomRows].filter((r) => r[7] === '缺口').length;
  const partial = [...rows, ...runsomRows].filter((r) => r[7] === '部分覆盖').length;
  const covered = [...rows, ...runsomRows].filter((r) => r[7] === '已覆盖').length;

  console.log(`Exported ${all.length - 1} rows to ${OUT}`);
  console.log(`HMaking/FS Fab/KE: ${rows.length} 行 | Runsom KE: ${runsomRows.length} 行`);
  console.log(`Runsom Volume>0 合计: ${runsomVolSum}/月 | 全表 缺口${gaps} 部分${partial} 已覆盖${covered}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
