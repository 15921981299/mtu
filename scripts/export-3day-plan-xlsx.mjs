import ExcelJS from 'exceljs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'docs/machiningsupplier-3day-optimization-plan.xlsx');

const COLORS = {
  primary: 'FF146EF5',
  primaryDark: 'FF0F172A',
  headerText: 'FFFFFFFF',
  weekendFri: 'FFFEF3C7',
  weekendSat: 'FFDBEAFE',
  weekendSun: 'FFD1FAE5',
  rowAlt: 'FFF8FAFC',
  border: 'FFE2E8F0',
  text: 'FF1E293B',
  muted: 'FF64748B',
  high: 'FFFEE2E2',
  highText: 'FFB91C1C',
  med: 'FFFFF7ED',
  medText: 'FFC2410C',
  low: 'FFF0FDF4',
  lowText: 'FF15803D',
  done: 'FFDCFCE7',
};

const overviewRows = [
  ['站点', 'https://machiningsupplier.com'],
  ['计划周期', '周五晚 + 周六 + 周日（休息三天）'],
  ['总目标', '接通漏斗 → 强化赚钱页 → 验证能收到询盘'],
  ['总工时', '约 11–14 小时'],
  ['核心原则', '不铺新博客，只维护与转化优化'],
  ['里程碑', '累计 10 个真实询盘（在职阶段）'],
];

const acceptance = [
  ['GSC 已验证，sitemap 已提交', 'P0', '周五', ''],
  ['RFQ 表单自测通过，能收到邮件', 'P0', '周五', ''],
  ['GA4 generate_lead / form_start 标为关键事件', 'P0', '周五', ''],
  ['8 个 T1 页面 Title/Meta/CTA 优化完成', 'P1', '周六', ''],
  ['产品页 RelatedArticles 接线并部署', 'P1', '周六', ''],
  ['提交 3 个 B2B 目录 + LinkedIn 公司页', 'P1', '周日', ''],
  ['npm run build 通过且已上线', 'P0', '周六', ''],
  ['商业文内耗对照表已记录', 'P2', '周日', ''],
];

const fridayTasks = [
  ['1', 'Google Search Console 验证', 'search.google.com 添加资源 → HTML 标签 → 填入 site.ts googleSiteVerification → 部署', 'P0', '45 min', 'GSC 显示「已验证」', ''],
  ['2', '提交 Sitemap', 'GSC → 站点地图 → 提交 sitemap-index.xml', 'P0', '10 min', 'Sitemap 状态「成功」', ''],
  ['3', '测试 RFQ 表单', '提交测试询盘 → 查 Resend 收件 → 确认 thank-you 跳转；检查 RESEND_API_KEY', 'P0', '30 min', '收到测试邮件', ''],
  ['4', 'GA4 关键事件', '管理 → 事件 → generate_lead、form_start 标为关键事件', 'P0', '20 min', '关键事件列表可见', ''],
  ['5', '转化路径走查', '首页→能力页→侧边栏表单→contact；检查移动端', 'P1', '30 min', '全路径无阻断', ''],
];

const saturdayAm = [
  ['1', '/contact/', 'Title 含 CNC Machining Quote；首屏信任点；表单显眼', 'P0', '30 min', ''],
  ['2', '/capabilities/cnc-milling/', 'Title/Meta 对齐 cnc milling services；文末 CTA', 'P0', '30 min', ''],
  ['3', '/capabilities/cnc-turning/', '同上，车削服务词', 'P0', '30 min', ''],
  ['4', '/materials/aluminum/', '商业意图；Upload drawing 按钮', 'P1', '30 min', ''],
  ['5', '/products/precision-shafts/', '补案例/公差/材料；CTA', 'P1', '30 min', ''],
  ['6', '/products/custom-brackets/', '同上', 'P1', '30 min', ''],
  ['7', '/blog/how-to-prepare-a-drawing-for-cnc-rfq/', '2 条 Hub 内链 + RFQ CTA', 'P1', '30 min', ''],
  ['8', '/blog/how-to-choose-cnc-machining-supplier-china/', '2 条 Hub 内链 + RFQ CTA', 'P1', '30 min', ''],
];

const saturdayPm = [
  ['A', '产品页 RelatedArticles', 'productArticleMap 已有数据，接线到产品页模板', 'P0', '60 min', ''],
  ['B', '首页 Popular Guides', '确认 6 篇高意图链接正确', 'P2', '20 min', ''],
  ['C', 'GSC 请求索引', 'contact、3 能力页、china-cnc-machining-regions-comparison-guide', 'P0', '30 min', ''],
  ['D', '验证城市页 301', 'GSC URL 检查 8 条旧城市 URL 重定向', 'P2', '20 min', ''],
  ['E', 'build + 部署', 'npm run build → 推送 Cloudflare Pages', 'P0', '30 min', ''],
];

const sundayAm = [
  ['1', 'LinkedIn 公司页', '创建公司页 → 填 NAP/简介/网站 → 写入 site.ts social.linkedin → 部署', 'P0', '60 min', ''],
  ['2', '目录提交 ×3', 'Google Business Profile、Thomasnet、IndustryNet 或 Europages', 'P1', '90 min', ''],
  ['3', 'NAP 统一', '全平台：Machining Supplier / machiningsupplier.com / info@machiningsupplier.com', 'P1', '15 min', ''],
];

const sundayPm = [
  ['4', '填运营表', 'docs/url-operations-template.csv — T1 页标「待观察」', 'P2', '30 min', ''],
  ['5', '商业文内耗快查', '记录 5 组博客 vs Hub 抢词问题', 'P2', '45 min', ''],
  ['6', '写下周计划', '按「每周维护节奏」执行', 'P2', '15 min', ''],
];

const cannibalization = [
  ['cnc-milling-services-china-comparison-guide', '/capabilities/cnc-milling/', '博客改 comparison/checklist，Hub 占 supplier 词'],
  ['stainless-steel-cnc-machining-suppliers-guide', '/materials/stainless-steel/', '博客避 duplicate supplier guide'],
  ['custom-bracket-cnc-machining-suppliers-guide', '/products/custom-brackets/', '产品 Hub 为主，博客做选型文'],
  ['actuator-component-cnc-machining-suppliers-guide', '/products/actuator-components/', '同上'],
  ['valve-body-cnc-machining-suppliers-selection-guide', '/products/manifolds-valve-bodies/', '同上'],
];

const weekly = [
  ['每周', 'GSC 看展示/点击；领英触达 5–10 人；回复询盘', '2 h'],
  ['每两周', '按 GSC 队列 A/C 优化 1–2 个页面', '2 h'],
  ['每月', '外链 +2；更新运营表；最多维护 4 篇旧文（不铺新 slug）', '3 h'],
];

const pageChecklist = [
  ['Title ≤ 58 字符，主打词靠前', ''],
  ['Meta description ≤ 155 字符，含 CTA', ''],
  ['H1 与 Title 不重复堆砌', ''],
  ['至少 1 个指向 /contact/ 的 CTA', ''],
  ['至少 2 条内链到 Hub（能力/材料/产品）', ''],
  ['移动端表单可点、可填', ''],
];

const minimal = [
  ['1', 'GSC 验证 + sitemap', 'P0', ''],
  ['2', 'RFQ 表单测通', 'P0', ''],
  ['3', 'GA4 关键事件', 'P0', ''],
  ['4', '优化 contact + 2 个能力页', 'P1', ''],
  ['5', '建 LinkedIn 公司页', 'P1', ''],
];

function priorityFill(priority) {
  if (priority === 'P0') return { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.high } };
  if (priority === 'P1') return { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.med } };
  if (priority === 'P2') return { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.low } };
  return null;
}

function priorityFont(priority) {
  if (priority === 'P0') return { color: { argb: COLORS.highText }, bold: true };
  if (priority === 'P1') return { color: { argb: COLORS.medText }, bold: true };
  if (priority === 'P2') return { color: { argb: COLORS.lowText }, bold: true };
  return {};
}

function applyBorder(cell) {
  const thin = { style: 'thin', color: { argb: COLORS.border } };
  cell.border = { top: thin, left: thin, bottom: thin, right: thin };
}

function styleHeaderRow(row, fillArgb = COLORS.primary) {
  row.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fillArgb } };
    cell.font = { bold: true, color: { argb: COLORS.headerText }, size: 11 };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    applyBorder(cell);
  });
  row.height = 28;
}

function addTitle(ws, title, subtitle, mergeCols = 6) {
  ws.mergeCells(1, 1, 1, mergeCols);
  const t = ws.getCell(1, 1);
  t.value = title;
  t.font = { bold: true, size: 16, color: { argb: COLORS.headerText } };
  t.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.primaryDark } };
  t.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(1).height = 36;

  ws.mergeCells(2, 1, 2, mergeCols);
  const s = ws.getCell(2, 1);
  s.value = subtitle;
  s.font = { size: 10, color: { argb: COLORS.muted } };
  s.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  ws.getRow(2).height = 22;
}

function addTable(ws, startRow, headers, rows, options = {}) {
  const { priorityCol, doneCols = [], weekendColor, colWidths = [] } = options;
  const headerRow = ws.getRow(startRow);
  headers.forEach((h, i) => {
    headerRow.getCell(i + 1).value = h;
  });
  styleHeaderRow(headerRow, options.headerColor || COLORS.primary);

  rows.forEach((rowData, idx) => {
    const r = ws.getRow(startRow + 1 + idx);
    rowData.forEach((val, colIdx) => {
      const cell = r.getCell(colIdx + 1);
      cell.value = val;
      cell.font = { size: 10, color: { argb: COLORS.text } };
      cell.alignment = { vertical: 'top', wrapText: true };
      applyBorder(cell);
      if (priorityCol === colIdx + 1 && val) {
        const fill = priorityFill(val);
        if (fill) cell.fill = fill;
        cell.font = { ...cell.font, ...priorityFont(val) };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      }
      if (doneCols.includes(colIdx + 1)) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: ['"☐,☑"'],
        };
      }
    });
    if (idx % 2 === 1) {
      r.eachCell((cell) => {
        if (!cell.fill || !cell.fill.fgColor) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: weekendColor || COLORS.rowAlt } };
        }
        applyBorder(cell);
      });
    }
    r.height = 42;
  });

  colWidths.forEach((w, i) => {
    ws.getColumn(i + 1).width = w;
  });

  ws.views = [{ state: 'frozen', ySplit: startRow }];
  return startRow + rows.length;
}

const workbook = new ExcelJS.Workbook();
workbook.creator = 'Machining Supplier';
workbook.created = new Date();

// Sheet 1: 总览
{
  const ws = workbook.addWorksheet('总览', { properties: { tabColor: { argb: COLORS.primary } } });
  addTitle(ws, 'machiningsupplier.com 三天优化计划', '在职孵化 · 目标：接通漏斗 + 跑出真实询盘', 4);
  let row = 4;
  ws.getCell(row, 1).value = '项目信息';
  ws.getCell(row, 1).font = { bold: true, size: 12, color: { argb: COLORS.primary } };
  row += 1;
  overviewRows.forEach(([k, v], i) => {
    const r = ws.getRow(row + i);
    r.getCell(1).value = k;
    r.getCell(2).value = v;
    r.getCell(1).font = { bold: true, size: 10 };
    r.getCell(2).font = { size: 10 };
    r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.rowAlt } };
    applyBorder(r.getCell(1));
    applyBorder(r.getCell(2));
    r.height = 24;
  });
  row += overviewRows.length + 2;
  ws.getCell(row, 1).value = '时间分布';
  ws.getCell(row, 1).font = { bold: true, size: 12, color: { argb: COLORS.primary } };
  row += 1;
  addTable(
    ws,
    row,
    ['日期', '重点', '工时', '完成度'],
    [
      ['周五晚', '漏斗接通（GSC + 表单 + GA4）', '2–3 h', ''],
      ['周六', '8 个 T1 页 + 代码优化 + 部署', '5–6 h', ''],
      ['周日', '外链 + LinkedIn + 运营复盘', '4–5 h', ''],
      ['合计', '约 11–14 小时', '—', ''],
    ],
    { weekendColor: COLORS.rowAlt, colWidths: [12, 42, 12, 12], doneCols: [4] },
  );
  ws.getColumn(1).width = 14;
  ws.getColumn(2).width = 48;
}

// Sheet 2: 验收清单
{
  const ws = workbook.addWorksheet('验收清单', { properties: { tabColor: { argb: 'FF22C55E' } } });
  addTitle(ws, '三天结束验收标准', '全部勾选 = 计划执行成功', 5);
  addTable(
    ws,
    4,
    ['验收项', '优先级', '计划日', '完成'],
    acceptance,
    { priorityCol: 2, doneCols: [4], colWidths: [52, 10, 10, 10] },
  );
}

// Sheet 3: 周五
{
  const ws = workbook.addWorksheet('周五晚', { properties: { tabColor: { argb: 'FFF59E0B' } } });
  addTitle(ws, '周五晚 · 接通漏斗', '预计 2–3 小时 | 不做这些，后面优化都看不见效果', 7);
  addTable(
    ws,
    4,
    ['#', '任务', '具体操作', '优先级', '耗时', '完成标志', '完成'],
    fridayTasks,
    { priorityCol: 4, doneCols: [7], weekendColor: COLORS.weekendFri, colWidths: [5, 22, 48, 8, 10, 22, 8] },
  );
}

// Sheet 4: 周六
{
  const ws = workbook.addWorksheet('周六', { properties: { tabColor: { argb: 'FF3B82F6' } } });
  addTitle(ws, '周六 · 赚钱页 + 技术优化', '预计 5–6 小时', 7);
  ws.getCell(4, 1).value = '▎上午：8 个 T1 页面（每页约 30 min）';
  ws.getCell(4, 1).font = { bold: true, size: 11, color: { argb: COLORS.primary } };
  const endAm = addTable(
    ws,
    5,
    ['#', 'URL', '优化重点', '优先级', '耗时', '完成'],
    saturdayAm,
    { priorityCol: 4, doneCols: [6], weekendColor: COLORS.weekendSat, colWidths: [5, 38, 40, 8, 10, 8] },
  );
  const pmStart = endAm + 3;
  ws.getCell(pmStart, 1).value = '▎下午：代码与部署';
  ws.getCell(pmStart, 1).font = { bold: true, size: 11, color: { argb: COLORS.primary } };
  addTable(
    ws,
    pmStart + 1,
    ['#', '任务', '说明', '优先级', '耗时', '完成'],
    saturdayPm,
    { priorityCol: 4, doneCols: [6], weekendColor: COLORS.weekendSat, colWidths: [5, 22, 44, 8, 10, 8] },
  );
}

// Sheet 5: 周日
{
  const ws = workbook.addWorksheet('周日', { properties: { tabColor: { argb: 'FF10B981' } } });
  addTitle(ws, '周日 · 外链与运营', '预计 4–5 小时', 6);
  ws.getCell(4, 1).value = '▎上午：外链与品牌';
  ws.getCell(4, 1).font = { bold: true, size: 11, color: { argb: COLORS.primary } };
  const endAm = addTable(
    ws,
    5,
    ['#', '任务', '操作', '优先级', '耗时', '完成'],
    sundayAm,
    { priorityCol: 4, doneCols: [6], weekendColor: COLORS.weekendSun, colWidths: [5, 20, 46, 8, 10, 8] },
  );
  const pmStart = endAm + 3;
  ws.getCell(pmStart, 1).value = '▎下午：运营基建';
  ws.getCell(pmStart, 1).font = { bold: true, size: 11, color: { argb: COLORS.primary } };
  addTable(
    ws,
    pmStart + 1,
    ['#', '任务', '操作', '优先级', '耗时', '完成'],
    sundayPm,
    { priorityCol: 4, doneCols: [6], weekendColor: COLORS.weekendSun, colWidths: [5, 20, 46, 8, 10, 8] },
  );
}

// Sheet 6: 页面检查清单
{
  const ws = workbook.addWorksheet('页面检查清单', { properties: { tabColor: { argb: 'FF8B5CF6' } } });
  addTitle(ws, 'T1 页面优化检查清单', '每个页面改完后逐项勾选', 3);
  addTable(ws, 4, ['检查项', '完成'], pageChecklist, { doneCols: [2], colWidths: [55, 10] });
}

// Sheet 7: 内耗对照
{
  const ws = workbook.addWorksheet('内耗对照', { properties: { tabColor: { argb: 'FFEF4444' } } });
  addTitle(ws, '商业文 vs Hub 内耗对照', '周日记录问题，暂不批量改文', 4);
  addTable(
    ws,
    4,
    ['博客 slug', '对应 Hub', '处理原则', '已记录'],
    cannibalization.map((r) => [...r, '']),
    { doneCols: [4], colWidths: [42, 32, 36, 10] },
  );
}

// Sheet 8: 每周节奏
{
  const ws = workbook.addWorksheet('每周节奏', { properties: { tabColor: { argb: 'FF64748B' } } });
  addTitle(ws, '三天后 · 每周维护节奏', '在职可持续，指向 10 个真实询盘', 4);
  addTable(ws, 4, ['频率', '任务', '时间'], weekly, { colWidths: [12, 50, 10] });
}

// Sheet 9: 最小版
{
  const ws = workbook.addWorksheet('最小版6小时', { properties: { tabColor: { argb: 'FF94A3B8' } } });
  addTitle(ws, '时间不够？只做这 5 件', '合计约 6 小时', 4);
  addTable(
    ws,
    4,
    ['#', '任务', '优先级', '完成'],
    minimal,
    { priorityCol: 3, doneCols: [4], colWidths: [5, 36, 10, 10] },
  );
}

await workbook.xlsx.writeFile(outPath);
console.log(`Written: ${outPath}`);
