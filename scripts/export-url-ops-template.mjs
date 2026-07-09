import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function parseSitemapUrls() {
  const sitemapPath = join(root, 'dist/sitemap-0.xml');
  if (!existsSync(sitemapPath)) {
    console.warn('dist/sitemap-0.xml not found — run `npm run build` first for exact URL list.');
    return null;
  }
  const xml = readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>https:\/\/machiningsupplier\.com([^<]*)<\/loc>/g)]
    .map((m) => m[1])
    .map((path) => (path.endsWith('/') ? path : `${path}/`))
    .sort((a, b) => a.localeCompare(b));
}

function parseKeywordPlan() {
  const plan = read('docs/seo-keyword-plan.md');
  const map = new Map();
  for (const line of plan.split('\n')) {
    const m = line.match(/^\|\s*`?(\/[^`|]+)`?\s*\|\s*([^|]+)\s*\|/);
    if (!m) continue;
    const url = m[1].replace(/\*$/, '').trim();
    let keyword = m[2].trim();
    if (keyword.startsWith('主打关键词') || keyword === '---') continue;
    // 去掉次要关键词列（能力/材料表第三列起）
    if (keyword.includes(',') && !keyword.includes('（')) {
      keyword = keyword.split(',')[0].trim();
    }
    if (keyword) {
      map.set(url.endsWith('/') ? url : `${url}/`, keyword);
    }
  }
  return map;
}

/** 从 seo-keyword-plan.md 提取 英文→中文 对照表 */
function buildEnZhMap() {
  const map = new Map();
  const plan = read('docs/seo-keyword-plan.md');
  for (const m of plan.matchAll(/([a-z0-9][^（|`,\n]*?)（([^）]+)）/gi)) {
    const en = m[1].trim().toLowerCase().replace(/\s+/g, ' ');
    const zh = m[2].trim();
    if (en.length > 2 && zh) map.set(en, zh);
  }
  return map;
}

const PHRASE_ZH = [
  ['cnc machining supplier china', '中国 CNC 机加工供应商'],
  ['cnc machining quote', 'CNC 机加工报价'],
  ['cnc machining company', 'CNC 机加工公司'],
  ['iso 9001 cnc machining', 'ISO 9001 CNC 机加工'],
  ['cnc machining blog', 'CNC 机加工博客'],
  ['cnc machining applications', 'CNC 机加工应用'],
  ['cnc machining capabilities', 'CNC 机加工能力'],
  ['cnc machining materials', 'CNC 机加工材料'],
  ['custom cnc machined parts', '定制 CNC 机加工零件'],
  ['cnc machining industries', 'CNC 机加工行业'],
  ['cnc machining features', 'CNC 机加工特性'],
  ['cnc machining standards', 'CNC 机加工标准'],
  ['cnc machining resources', 'CNC 机加工资源'],
  ['cnc machining case studies', 'CNC 机加工案例'],
  ['cnc tolerance chart', 'CNC 公差表'],
  ['cnc dfm checklist', 'CNC 可制造性设计清单'],
  ['cnc quality control inspection', 'CNC 质量控制与检测'],
  ['cnc machining processes', 'CNC 加工工艺'],
  ['cnc design dfm', 'CNC 设计与 DFM'],
  ['cnc quality finishing', 'CNC 质量与表面处理'],
  ['cnc supplier sourcing', 'CNC 供应商采购'],
  ['cnc tolerances specs', 'CNC 公差与规格'],
  ['cnc prototyping', 'CNC 原型加工'],
  ['cnc machining cost', 'CNC 机加工成本'],
];

const TERM_ZH = [
  ['stainless steel', '不锈钢'],
  ['engineering plastics', '工程塑料'],
  ['sheet metal', '钣金'],
  ['nickel alloys', '镍合金'],
  ['bronze alloys', '青铜合金'],
  ['tool steels', '工具钢'],
  ['carbon steel', '碳钢'],
  ['medical device', '医疗器械'],
  ['medical grade', '医疗级'],
  ['food grade', '食品级'],
  ['aerospace grade', '航空级'],
  ['oil gas', '油气'],
  ['heat sink', '散热器'],
  ['valve body', '阀体'],
  ['pump component', '泵类零件'],
  ['shaft coupling', '联轴器'],
  ['sensor housing', '传感器外壳'],
  ['mounting plate', '安装板'],
  ['connector body', '连接器壳体'],
  ['actuator component', '执行器零件'],
  ['precision bushing', '精密轴套'],
  ['dowel pin', '定位销'],
  ['wire edm', '线切割 EDM'],
  ['laser cutting', '激光切割'],
  ['5 axis', '五轴'],
  ['5-axis', '五轴'],
  ['3-axis', '三轴'],
  ['cnc milling', 'CNC 铣削'],
  ['cnc turning', 'CNC 车削'],
  ['cnc grinding', 'CNC 磨削'],
  ['cnc machining', 'CNC 机加工'],
  ['cnc inspection', 'CNC 检测'],
  ['surface finish', '表面粗糙度'],
  ['surface roughness', '表面粗糙度'],
  ['powder coating', '粉末涂装'],
  ['how to', '如何'],
  ['what is', '什么是'],
  ['best practices', '最佳实践'],
  ['design guide', '设计指南'],
  ['complete guide', '完整指南'],
  [' vs ', ' 对比 '],
  ['prototype', '原型样机'],
  ['tolerance', '公差'],
  ['machining', '加工'],
  ['suppliers', '供应商'],
  ['supplier', '供应商'],
  ['precision', '精密'],
  ['custom', '定制'],
  ['aluminum', '铝合金'],
  ['titanium', '钛合金'],
  ['inconel', 'Inconel'],
  ['peek', 'PEEK'],
  ['aerospace', '航空航天'],
  ['automotive', '汽车'],
  ['robotics', '机器人'],
  ['semiconductor', '半导体'],
  ['hydraulic', '液压'],
  ['manifold', '集成块'],
  ['fixture', '夹具'],
  ['enclosure', '外壳'],
  ['bracket', '支架'],
  ['flange', '法兰'],
  ['gear', '齿轮'],
  ['shaft', '轴'],
  ['bushing', '轴套'],
  ['anodizing', '阳极氧化'],
  ['passivation', '钝化'],
  ['grinding', '磨削'],
  ['turning', '车削'],
  ['milling', '铣削'],
  ['chatter', '振刀'],
  ['drawing', '图纸'],
  ['threads', '螺纹'],
  ['thread', '螺纹'],
  ['quality', '质量'],
  ['cost', '成本'],
  ['lead time', '交期'],
  ['inspection', '检测'],
  ['finishing', '表面处理'],
  ['materials', '材料'],
  ['steel', '钢'],
  ['parts', '零件'],
  ['components', '零件'],
  ['guide', '指南'],
  ['checklist', '清单'],
  ['comparison', '对比'],
  ['china', '中国'],
  ['no moq', '无起订量'],
  ['low volume', '小批量'],
];

const SLUG_WORD_ZH = {
  fix: '解决', reduce: '降低', choose: '选择', prepare: '准备', read: '阅读', select: '选择',
  design: '设计', calculate: '计算', specify: '标注', achieve: '实现', maintain: '保持',
  prevent: '防止', control: '控制', handle: '处理', avoid: '避免', understand: '理解',
  laser: '激光', cutting: '切割', sheet: '钣金', metal: '金属', chatter: '振刀',
  anodizing: '阳极氧化', coating: '涂装', powder: '粉末', tolerance: '公差', tolerances: '公差',
  roughness: '粗糙度', surface: '表面', finish: '表面处理', threads: '螺纹', drawing: '图纸',
  beginners: '入门', terminology: '术语', shipping: '运输', audit: '审核', outsource: '外包',
  inhouse: '厂内', manual: '手工', printing: '打印', casting: '铸造', broaching: '拉削',
  knurling: '滚花', honing: '珩磨', lapping: '研磨', deburring: '去毛刺', passivation: '钝化',
  electropolishing: '电解抛光', bead: '喷砂', blasting: '喷砂', oxide: '氧化', black: '发黑',
  hardened: '淬火', annealing: '退火', case: '表面', concentricity: '同心度', runout: '跳动',
  flatness: '平面度', position: '位置度', gdt: '几何公差', gcode: 'G代码', carbide: '硬质合金',
  tooling: '刀具', software: '软件', moq: '起订量', cycle: '周期', time: '时间', cost: '成本',
  per: '每', part: '零件', hour: '小时', setup: '装夹', fixture: '夹具', undercuts: '底切',
  thin: '薄壁', walls: '壁', warping: '变形', burr: '毛刺', formation: '形成', work: '加工',
  hardening: '硬化', batches: '批次', across: '跨', batches: '批次', prototype: '原型',
  production: '量产', inspection: '检测', report: '报告', certificate: '证书', authenticity: '真伪',
  verify: '验证', communicate: '沟通', supplier: '供应商', rfq: '询价', checklist: '清单',
  advice: '建议', experts: '专家', roundup: '圆桌', top: '十大', list: '清单', regions: '区域',
  comparison: '对比', guide: '指南', practices: '实践', mistakes: '误区', tips: '技巧',
  explained: '详解', standard: '标准', standards: '标准', compliance: '合规', military: '军工',
  mil: '军用', spec: '规范', ppap: 'PPAP', fai: '首件', dfars: 'DFARS', itar: 'ITAR',
  rohs: 'RoHS', reach: 'REACH', traceability: '追溯', lot: '批次', gage: '量具', analysis: '分析',
  cpk: 'Cpk', capability: '能力', index: '指数', true: '真实', tir: 'TIR', rz: 'Rz', ra: 'Ra',
  cnc: 'CNC', milling: '铣削', machining: '加工', turning: '车削', grinding: '磨削', edm: '电火花', how: '如何',
  highspeed: '高速', high: '高速', speed: '', slot: '槽', axis: '轴', aluminum: '铝', steel: '钢',
  actuator: '执行器', components: '组件', supports: '支撑', pistons: '活塞', caps: '端盖',
  stainless: '不锈钢', titanium: '钛', plastic: '塑料', bronze: '青铜', magnesium: '镁',
  nickel: '镍', alloy: '合金', inconel: 'Inconel', peek: 'PEEK', pom: 'POM', nylon: '尼龙',
  brass: '黄铜', copper: '铜', delrin: 'Delrin', grade: '牌号', vs: '对比', what: '什么是',
  is: '', the: '', a: '', an: '', for: '用于', with: '带', without: '无', from: '从',
  machined: '机加工', features: '特征', snap: '卡扣', fit: '配合', thermal: '热', expansion: '膨胀',
  thin: '薄壁', wall: '壁', deflection: '变形', anodizing: '阳极氧化', undercuts: '底切',
  rfq: '询价', drawing: '图纸', prepare: '准备', maintain: '保持', tight: '精密', across: '跨',
  batches: '批次', handle: '处理', machine: '加工', parts: '零件', metal: '金属', sheet: '钣金',
  laser: '激光', cutting: '切割', wire: '线', swiss: '瑞士', screw: '走心', helical: '斜齿',
  spur: '直齿', gear: '齿轮', hydraulic: '液压', flange: '法兰', fitting: '接头', fastener: '紧固件',
  bracket: '支架', custom: '定制', precision: '精密', shaft: '轴', spline: '花键', threaded: '螺纹',
  motor: '电机', mount: '安装', sensor: '传感器', housing: '外壳', enclosure: '壳体', ip65: 'IP65',
  waterproof: '防水', outdoor: '户外', electrical: '电气', electronics: '电子', emi: 'EMI',
  shielded: '屏蔽', spur: '直齿', timing: '同步', pulley: '带轮', sleeve: '套筒', bearing: '轴承',
  cartridge: '插装', valve: '阀', pneumatic: '气动', welding: '焊接', jig: '工装', assembly: '装配',
  inspection: '检测', hardened: '淬火', grinding: '磨削', spline: '花键',
  '4axis': '四轴', '3axis': '三轴', '5axis': '五轴',
};

function stripAnnotation(text) {
  return text.replace(/（[^）]*）/g, '').trim();
}

function hasAnnotation(text) {
  return /（[^）]+）/.test(text);
}

function slugToZh(text) {
  const normalized = text
    .toLowerCase()
    .replace(/high-speed/g, 'highspeed')
    .replace(/5-axis/g, '5axis')
    .replace(/3-axis/g, '3axis')
    .replace(/4-axis/g, '4axis');
  const words = normalized.replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/).filter((w) => w && w.length > 0);
  const translated = words
    .map((w) => SLUG_WORD_ZH[w])
    .filter((zh) => zh && zh.length > 0);
  if (translated.length >= 2) return translated.join('');
  return null;
}

function heuristicTranslate(en) {
  const text = en.toLowerCase().trim().replace(/\s+/g, ' ');
  for (const [phrase, zh] of PHRASE_ZH) {
    if (text === phrase) return zh;
  }
  let result = ` ${text} `;
  const terms = [...TERM_ZH].sort((a, b) => b[0].length - a[0].length);
  for (const [term, zh] of terms) {
    result = result.split(term).join(zh);
  }
  result = result
    .replace(/\bvs\b/gi, '对比')
    .replace(/\bfor\b/gi, '用于')
    .replace(/\bin\b/gi, '在')
    .replace(/\band\b/gi, '与')
    .replace(/\bthe\b/gi, '')
    .replace(/\ba\b/gi, '')
    .replace(/\bto\b/gi, '')
    .replace(/\bof\b/gi, '')
    .replace(/\byour\b/gi, '')
    .replace(/[&]/g, '与')
    .replace(/[,]/g, '、')
    .replace(/\s+/g, ' ')
    .trim();
  if (/[a-z]{3,}/i.test(result)) {
    const fromSlug = slugToZh(text);
    if (fromSlug) return fromSlug;
    return `${text}相关`;
  }
  return result || `${text}相关`;
}

function annotateKeyword(raw, enZhMap, url, meta) {
  if (!raw) return '';
  if (hasAnnotation(raw)) return raw;
  const en = stripAnnotation(raw).trim();
  const key = en.toLowerCase().replace(/\s+/g, ' ');
  if (enZhMap.has(key)) return `${en}（${enZhMap.get(key)}）`;
  for (const [phrase, zh] of PHRASE_ZH) {
    if (key === phrase) return `${en}（${zh}）`;
  }
  if (url?.startsWith('/blog/')) {
    const post = meta.blogPosts?.get(url);
    if (post) {
      const slugZh = slugToZh(post.slug);
      if (slugZh) return `${en}（${slugZh}）`;
    }
  }
  const urlParts = url?.split('/').filter(Boolean) ?? [];
  const lastSlug = urlParts[urlParts.length - 1];
  if (lastSlug && !/^\d+$/.test(lastSlug) && lastSlug !== 'blog') {
    const pathZh = slugToZh(lastSlug);
    if (pathZh) return `${en}（${pathZh}）`;
  }
  const fromSlug = slugToZh(en.replace(/\s+/g, '-'));
  if (fromSlug) return `${en}（${fromSlug}）`;
  const zh = heuristicTranslate(en);
  return `${en}（${zh}）`;
}

function parseSlugTitleRecords(source, arrayName, fields = ['slug', 'title', 'seoTitle', 'h1Title']) {
  const text = read(source);
  const start = text.indexOf(`export const ${arrayName}`);
  if (start === -1) return new Map();
  const slice = text.slice(start);
  const map = new Map();
  const slugRe = /slug:\s*'([^']+)'/g;
  let match;
  while ((match = slugRe.exec(slice)) !== null) {
    const slug = match[1];
    const blockStart = match.index;
    const next = slice.indexOf('\n  },', blockStart);
    const block = slice.slice(blockStart, next === -1 ? blockStart + 1200 : next);
    const record = { slug };
    for (const field of fields) {
      const fm = block.match(new RegExp(`${field}:\\s*'([^']*)'`));
      const fm2 = block.match(new RegExp(`${field}:\\s*"([^"]*)"`));
      if (fm) record[field] = fm[1];
      else if (fm2) record[field] = fm2[1];
    }
    map.set(slug, record);
  }
  return map;
}

function parseSubpagesByPattern(source, arrayName, parentField, urlPrefix) {
  const text = read(source);
  const start = text.indexOf(`export const ${arrayName}`);
  if (start === -1) return new Map();
  const slice = text.slice(start);
  const map = new Map();
  const re = new RegExp(
    `\\{\\s*\\n\\s*${parentField}:\\s*'([^']+)',\\s*\\n\\s*slug:\\s*'([^']+)',([\\s\\S]*?)\\n\\s*content:\\s*\\{`,
    'g',
  );
  let m;
  while ((m = re.exec(slice)) !== null) {
    const parent = m[1];
    const slug = m[2];
    const header = m[3];
    const seoTitle = header.match(/seoTitle:\s*'([^']*)'/)?.[1];
    const h1Title = header.match(/h1Title:\s*'([^']*)'/)?.[1];
    const title = header.match(/^\s+title:\s*'([^']*)'/m)?.[1];
    map.set(`${urlPrefix}${parent}/${slug}/`, { title: seoTitle || h1Title || title || '' });
  }
  return map;
}

function parseBlogPosts() {
  const text = read('src/data/blog.ts');
  const start = text.indexOf('export const blogPosts = [');
  const end = text.indexOf('\nexport function getFeaturedBlogPost');
  const slice = text.slice(start, end);
  const map = new Map();
  const slugPositions = [...slice.matchAll(/\{\s*\n\s*slug:\s*'([^']+)'/g)].map((m) => ({
    slug: m[1],
    start: m.index,
  }));

  for (let i = 0; i < slugPositions.length; i += 1) {
    const { slug, start: blockStart } = slugPositions[i];
    const blockEnd = slugPositions[i + 1]?.start ?? slice.length;
    const block = slice.slice(blockStart, blockEnd);
    const title =
      block.match(/title:\s*'([^']*)'/)?.[1] ||
      block.match(/title:\s*"([^"]*)"/)?.[1] ||
      '';
    const intent = block.match(/intent:\s*'(commercial|informational)'/)?.[1] || 'informational';
    map.set(`/blog/${slug}/`, { slug, title, intent });
  }
  return map;
}

function keywordFromSeoTitle(seoTitle) {
  if (!seoTitle) return '';
  return seoTitle
    .replace(/\s*[|—–-]\s*Machining Supplier.*$/i, '')
    .replace(/\s+from China$/i, '')
    .replace(/^Custom\s+/i, '')
    .trim()
    .toLowerCase();
}

function keywordFromTitle(title) {
  if (!title) return '';
  let keyword = title.split(/\s+\|\s+/)[0];
  keyword = keyword.split(/\s+—\s+/)[0];
  keyword = keyword.split(/\s+–\s+/)[0];
  if (keyword.includes(':')) keyword = keyword.split(':')[0];
  return keyword
    .replace(/\?$/, '')
    .replace(/^What Is\s+/i, '')
    .replace(/^How to\s+/i, 'how to ')
    .trim()
    .toLowerCase()
    .slice(0, 80);
}

function keywordFromSlug(slug) {
  if (!slug) return '';
  return slug.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
}

const SERVICE_KEYWORDS = {
  'cnc-milling': 'cnc milling services',
  'cnc-turning': 'cnc turning services',
  '5-axis-machining': '5 axis cnc machining',
  grinding: 'cnc grinding services',
  edm: 'wire edm machining',
  'quality-control': 'cnc quality control inspection',
};

const MATERIAL_KEYWORDS = {
  aluminum: 'aluminum cnc machining',
  'stainless-steel': 'stainless steel cnc machining',
  titanium: 'titanium cnc machining',
  'carbon-steel': 'steel cnc machining',
  'engineering-plastics': 'plastic cnc machining',
  'brass-copper': 'brass cnc machining',
  'nickel-alloys': 'inconel cnc machining',
  magnesium: 'magnesium cnc machining',
  'bronze-alloys': 'bronze cnc machining',
  'tool-steels': 'tool steel cnc machining',
};

const INDUSTRY_KEYWORDS = {
  aerospace: 'aerospace cnc machining',
  'medical-devices': 'medical device cnc machining',
  automotive: 'automotive cnc parts',
  robotics: 'robotics cnc parts',
  'oil-gas': 'oil gas cnc machining',
  'renewable-energy': 'renewable energy cnc parts',
  'defense-military': 'defense cnc machining',
  'marine-shipbuilding': 'marine cnc machining',
  'food-beverage': 'food grade cnc machining',
  'consumer-electronics': 'electronics enclosure cnc',
  'industrial-automation': 'industrial automation cnc',
  'semiconductor-electronics': 'semiconductor cnc machining',
};

const HUB_KEYWORDS = {
  '/capabilities/': 'cnc machining capabilities',
  '/materials/': 'cnc machining materials',
  '/products/': 'custom cnc machined parts',
  '/industries/': 'cnc machining industries',
  '/applications/': 'cnc machining applications',
  '/features/': 'cnc machining features',
  '/standards/': 'cnc machining standards',
  '/resources/': 'cnc machining resources',
  '/case-studies/': 'cnc machining case studies',
  '/blog/': 'cnc machining blog',
};

const RESOURCE_KEYWORDS = {
  '/resources/cnc-tolerance-guide/': 'cnc tolerance chart',
  '/resources/dfm-checklist/': 'cnc dfm checklist',
};

const TAG_KEYWORDS = {
  process: 'cnc machining processes',
  materials: 'cnc machining materials',
  design: 'cnc design dfm',
  quality: 'cnc quality finishing',
  industries: 'cnc machining industries',
  sourcing: 'cnc supplier sourcing',
  tolerances: 'cnc tolerances specs',
  prototyping: 'cnc prototyping',
  cost: 'cnc machining cost',
};

function inferPageType(url) {
  if (url === '/') return 'home';
  if (url === '/contact/') return 'money_page';
  if (url === '/about/') return 'trust_page';
  if (url === '/certifications/') return 'trust_page';
  if (url === '/thank-you/') return 'conversion_page';

  if (url === '/capabilities/') return 'hub';
  if (url === '/materials/') return 'hub';
  if (url === '/products/') return 'hub';
  if (url === '/industries/') return 'hub';
  if (url === '/applications/') return 'hub';
  if (url === '/features/') return 'hub';
  if (url === '/standards/') return 'hub';
  if (url === '/resources/') return 'hub';
  if (url === '/case-studies/') return 'hub';
  if (url === '/blog/') return 'hub';

  if (url.startsWith('/blog/page/')) return 'blog_pagination';
  if (url.startsWith('/blog/tag/')) return 'blog_tag';
  if (url === '/blog/author/machining-supplier/') return 'blog_author';

  if (url.startsWith('/blog/')) return 'blog';

  if (url.startsWith('/capabilities/') && url.split('/').filter(Boolean).length === 3) return 'capability_subpage';
  if (url.startsWith('/capabilities/')) return 'capability';

  if (url.startsWith('/materials/') && url.split('/').filter(Boolean).length === 3) return 'material_subpage';
  if (url.startsWith('/materials/')) return 'material';

  if (url.startsWith('/products/') && url.split('/').filter(Boolean).length === 3) return 'product_subpage';
  if (url.startsWith('/products/')) return 'product';

  if (url.startsWith('/industries/') && url.split('/').filter(Boolean).length === 3) return 'industry_subpage';
  if (url.startsWith('/industries/')) return 'industry';

  if (url.startsWith('/applications/')) return 'application';
  if (url.startsWith('/features/')) return 'feature';
  if (url.startsWith('/standards/')) return 'standard';
  if (url.startsWith('/case-studies/')) return 'case_study';
  if (url.startsWith('/resources/')) return 'resource';

  return 'page';
}

function inferTier(pageType) {
  if (['money_page', 'capability', 'material', 'product', 'industry', 'application', 'blog_commercial'].includes(pageType))
    return 'T1';
  if (['home', 'hub', 'trust_page'].includes(pageType)) return 'T2';
  if (['case_study', 'resource', 'standard', 'conversion_page'].includes(pageType)) return 'T3';
  if (
    ['blog_informational', 'feature', 'capability_subpage', 'material_subpage', 'product_subpage', 'industry_subpage'].includes(
      pageType,
    )
  )
    return 'T4';
  if (['blog_pagination', 'blog_tag', 'blog_author'].includes(pageType)) return 'meta';
  return 'T4';
}

function suggestNotes(pageType, blogIntent, url) {
  if (pageType === 'blog_commercial') {
    return '商业意图 — 重写前检查与产品/能力 Hub 的关键词内耗';
  }
  if (pageType === 'blog_pagination' || pageType === 'blog_tag' || pageType === 'blog_author') {
    return '元页面 — 仅监控收录状态';
  }
  if (pageType.endsWith('_subpage')) {
    return '主题子页 — 内链至父级 Hub + 赚钱页';
  }
  if (url === '/contact/') {
    return '主 RFQ 转化页 — GSC 队列 C 优先';
  }
  return '';
}

function buildMetadata() {
  const keywordPlan = parseKeywordPlan();
  const services = parseSlugTitleRecords('src/data/services.ts', 'services');
  const materials = parseSlugTitleRecords('src/data/materials.ts', 'materials');
  const products = parseSlugTitleRecords('src/data/products.ts', 'products');
  const industries = parseSlugTitleRecords('src/data/industries.ts', 'industries');
  const applications = parseSlugTitleRecords('src/data/applications.ts', 'applications');
  const features = parseSlugTitleRecords('src/data/features.ts', 'features');
  const standards = parseSlugTitleRecords('src/data/standards.ts', 'standards');
  const caseStudies = parseSlugTitleRecords('src/data/case-studies.ts', 'caseStudies');
  const blogPosts = parseBlogPosts();

  const capabilitySubpages = parseSubpagesByPattern(
    'src/data/capability-subpages.ts',
    'capabilitySubpages',
    'capabilitySlug',
    '/capabilities/',
  );
  const materialSubpages = parseSubpagesByPattern(
    'src/data/material-subpages.ts',
    'materialSubpages',
    'materialSlug',
    '/materials/',
  );
  const productSubpages = parseSubpagesByPattern(
    'src/data/product-subpages.ts',
    'productSubpages',
    'productSlug',
    '/products/',
  );
  const industrySubpages = parseSubpagesByPattern(
    'src/data/industry-subpages.ts',
    'industrySubpages',
    'industrySlug',
    '/industries/',
  );

  return {
    keywordPlan,
    services,
    materials,
    products,
    industries,
    applications,
    features,
    standards,
    caseStudies,
    blogPosts,
    capabilitySubpages,
    materialSubpages,
    productSubpages,
    industrySubpages,
  };
}

function resolveKeyword(url, meta) {
  if (meta.keywordPlan.has(url)) return meta.keywordPlan.get(url);

  const parts = url.split('/').filter(Boolean);

  if (url === '/') return 'cnc machining supplier china';
  if (url === '/contact/') return 'cnc machining quote';
  if (url === '/about/') return 'cnc machining company';
  if (url === '/certifications/') return 'iso 9001 cnc machining';

  if (url.startsWith('/blog/tag/')) {
    const tag = parts[2];
    return TAG_KEYWORDS[tag] || `${tag} cnc blog`;
  }
  if (url.startsWith('/blog/page/')) return 'cnc machining blog';

  const blog = meta.blogPosts.get(url);
  if (blog) return keywordFromTitle(blog.title) || keywordFromSlug(blog.slug);

  if (url.startsWith('/capabilities/')) {
    const sub = meta.capabilitySubpages.get(url);
    if (sub) return keywordFromSeoTitle(sub.title) || keywordFromSlug(parts[2]);
    const slug = parts[1];
    const svc = meta.services.get(slug);
    return SERVICE_KEYWORDS[slug] || keywordFromSeoTitle(svc?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/materials/')) {
    const sub = meta.materialSubpages.get(url);
    if (sub) return keywordFromSeoTitle(sub.title) || keywordFromSlug(parts[2]);
    const slug = parts[1];
    const mat = meta.materials.get(slug);
    return MATERIAL_KEYWORDS[slug] || keywordFromSeoTitle(mat?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/products/')) {
    const sub = meta.productSubpages.get(url);
    if (sub) return keywordFromSeoTitle(sub.title) || keywordFromSlug(parts[2]);
    const slug = parts[1];
    const prod = meta.products.get(slug);
    return keywordFromSeoTitle(prod?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/industries/')) {
    const sub = meta.industrySubpages.get(url);
    if (sub) return keywordFromSeoTitle(sub.title) || keywordFromSlug(parts[2]);
    const slug = parts[1];
    return INDUSTRY_KEYWORDS[slug] || keywordFromSeoTitle(meta.industries.get(slug)?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/applications/')) {
    const slug = parts[1];
    if (!slug) return 'cnc machining applications';
    const app = meta.applications.get(slug);
    return keywordFromSeoTitle(app?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/features/')) {
    const slug = parts[1];
    const feat = meta.features.get(slug);
    return keywordFromSeoTitle(feat?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/standards/')) {
    const slug = parts[1];
    const std = meta.standards.get(slug);
    return keywordFromSeoTitle(std?.seoTitle) || keywordFromSlug(slug);
  }

  if (url.startsWith('/case-studies/')) {
    const slug = parts[1];
    const cs = meta.caseStudies.get(slug);
    return keywordFromSeoTitle(cs?.seoTitle) || keywordFromSlug(slug);
  }

  if (RESOURCE_KEYWORDS[url]) return RESOURCE_KEYWORDS[url];
  if (HUB_KEYWORDS[url]) return HUB_KEYWORDS[url];

  const lastSlug = parts[parts.length - 1];
  return keywordFromSlug(lastSlug);
}

function refinePageType(url, baseType, blog) {
  if (baseType === 'blog' && blog) {
    return blog.intent === 'commercial' ? 'blog_commercial' : 'blog_informational';
  }
  return baseType;
}

const header = [
  'url',
  'tier',
  'page_type',
  'primary_keyword',
  'monthly_searches',
  'indexed',
  'keywords_ranking',
  'traffic_trend',
  'duplicate_risk',
  'action',
  'notes',
];

const meta = buildMetadata();
const enZhMap = buildEnZhMap();
let urls = parseSitemapUrls();

if (!urls) {
  urls = [
    '/',
    '/about/',
    '/certifications/',
    '/contact/',
    ...Array.from(meta.services.keys()).map((s) => `/capabilities/${s}/`),
    ...Array.from(meta.capabilitySubpages.keys()),
    '/capabilities/',
    ...Array.from(meta.materials.keys()).map((s) => `/materials/${s}/`),
    ...Array.from(meta.materialSubpages.keys()),
    '/materials/',
    ...Array.from(meta.products.keys()).map((s) => `/products/${s}/`),
    ...Array.from(meta.productSubpages.keys()),
    '/products/',
    ...Array.from(meta.industries.keys()).map((s) => `/industries/${s}/`),
    ...Array.from(meta.industrySubpages.keys()),
    '/industries/',
    ...Array.from(meta.applications.keys()).map((s) => `/applications/${s}/`),
    '/applications/',
    ...Array.from(meta.features.keys()).map((s) => `/features/${s}/`),
    '/features/',
    ...Array.from(meta.standards.keys()).map((s) => `/standards/${s}/`),
    '/standards/',
    ...Array.from(meta.caseStudies.keys()).map((s) => `/case-studies/${s}/`),
    '/case-studies/',
    '/resources/',
    '/resources/cnc-tolerance-guide/',
    '/resources/dfm-checklist/',
    '/blog/',
    ...Array.from(meta.blogPosts.keys()),
    '/blog/author/machining-supplier/',
  ].sort((a, b) => a.localeCompare(b));
}

const rows = [header];

for (const url of urls) {
  const blog = meta.blogPosts.get(url);
  const baseType = inferPageType(url);
  const pageType = refinePageType(url, baseType, blog);
  const tier = inferTier(pageType);
  const keyword = annotateKeyword(resolveKeyword(url, meta), enZhMap, url, meta);
  const notes = suggestNotes(pageType, blog?.intent, url);

  rows.push([url, tier, pageType, keyword, '', '', '', '', '', '', notes]);
}

const csv = rows
  .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  .join('\n');

writeFileSync(join(root, 'docs/url-operations-template.csv'), csv, 'utf8');

const typeCounts = {};
for (const row of rows.slice(1)) {
  typeCounts[row[2]] = (typeCounts[row[2]] || 0) + 1;
}

console.log(`Exported ${rows.length - 1} URLs to docs/url-operations-template.csv`);
console.log('Page types:', typeCounts);
