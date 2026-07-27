import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "E:/mtu/outputs/ke-keyword-research-20260726";
const raw = JSON.parse(await fs.readFile(`${outputDir}/ke-data.json`, "utf8"));

const sourceVolume = "https://keywordseverywhere.com/tools/search-volume-checker/";
const sourceGap = "https://keywordseverywhere.com/tools/keyword-gap-analysis/";
const sourceGoogle = "https://www.google.com/search?q=mtu+engine+parts&gl=us&hl=en";

function classifyKeyword(keyword) {
  if (/injector|pump|turbo|gasket|filter|piston|liner|connecting rod|crankshaft|camshaft|starter|alternator|sensor|thermostat|valve|bearing|seal|o rings/i.test(keyword)) {
    return "Component";
  }
  if (/\b(?:8v|10v|12v|16v|20v)\s?\d{3,4}\b/i.test(keyword)) return "Engine model";
  if (/\b(?:1800|183|396|538|595|956|1163|2000|4000|8000)\b/i.test(keyword)) return "Engine series";
  if (/supplier|distributor|dealer|online|price|catalog|lookup|genuine|parts/i.test(keyword)) return "Core commercial";
  if (/marine|yacht|boat/i.test(keyword)) return "Marine application";
  return "Brand / engine";
}

function classifyIntent(keyword) {
  if (/supplier|distributor|dealer|online|price|for sale|genuine/i.test(keyword)) return "Transactional";
  if (/parts|injector|pump|turbo|gasket|filter|piston|liner|rod|shaft|starter|alternator|sensor|thermostat|valve|bearing|seal/i.test(keyword)) return "Commercial";
  return "Informational";
}

function targetPage(keyword, category) {
  if (/diesel engine parts supplier/i.test(keyword)) return "Homepage";
  if (/4000/i.test(keyword)) return "MTU 4000 series page";
  if (/2000/i.test(keyword)) return "MTU 2000 series page";
  if (/396/i.test(keyword)) return "MTU 396 series page";
  if (/8000/i.test(keyword)) return "MTU 8000 series page";
  if (category === "Component") return "Component category / related product pages";
  if (/catalog|lookup/i.test(keyword)) return "Catalog page";
  if (/marine|yacht|boat/i.test(keyword)) return "Marine MTU parts landing page";
  if (/mtu.*parts/i.test(keyword)) return "MTU spare-parts hub";
  return "Relevant engine-series page";
}

function keywordPriority(volume, intent) {
  const commercial = intent === "Transactional" || intent === "Commercial";
  if (volume >= 30 && commercial) return "P1";
  if (volume >= 10) return "P2";
  return "P3";
}

function gapBrand(keyword) {
  if (/\bmtu\b/i.test(keyword)) return "MTU";
  if (/cummins|\bqsb\b|\bkta|\bism\b|\bm11\b|\bisf\b|\bqsk\b|\bqsl\b/i.test(keyword)) return "Cummins";
  if (/deutz/i.test(keyword)) return "Deutz";
  return "Generic";
}

function gapRelevance(keyword, brand, intent) {
  if (brand === "MTU") return "High";
  if (intent === "Commercial") return "High";
  if (/engine|diesel|marine|generator/i.test(keyword)) return "Medium";
  return "Low";
}

function gapAction(traffic, relevance, intent) {
  if (traffic > 0 && (intent === "Commercial" || relevance === "High")) return "Review now";
  if (relevance === "High") return "Review";
  return "Monitor / ignore";
}

const planRows = raw.volumeRows.map((row) => {
  const [keyword, volumeText, cpcText, competition, trendText] = row;
  const volume = Number(volumeText) || 0;
  const cpc = Number(String(cpcText).replace("$", "")) || 0;
  const trend = trendText && trendText !== "-" ? Number(trendText.replace("%", "").replace(",", "")) / 100 : null;
  const category = classifyKeyword(keyword);
  const intent = classifyIntent(keyword);
  return [
    keyword,
    volume,
    cpc,
    competition,
    trend,
    category,
    intent,
    keywordPriority(volume, intent),
    targetPage(keyword, category),
    sourceVolume,
    volume > 0 ? "Validated US demand" : "KE reports 0; retain only with GSC, customer, or part-number evidence",
    null,
  ];
});

const gapRows = raw.gapRows.map(([keyword, trafficText, positionText]) => {
  const traffic = Number(trafficText) || 0;
  const brand = gapBrand(keyword);
  const intent = classifyIntent(keyword);
  const relevance = gapRelevance(keyword, brand, intent);
  return [
    keyword,
    traffic,
    Number(positionText) || 0,
    brand,
    intent,
    relevance,
    gapAction(traffic, relevance, intent),
    sourceGap,
  ];
});

const extensionMap = new Map();
for (const group of raw.extensionIdeas) {
  for (const row of group.rows) {
    const keyword = row[1];
    const volume = Number(row[2]) || 0;
    const existing = extensionMap.get(keyword);
    if (!existing || volume > existing.volume) {
      extensionMap.set(keyword, { keyword, volume, type: group.section });
    } else if (!existing.type.includes(group.section)) {
      existing.type = `${existing.type}; ${group.section}`;
    }
  }
}
const extensionRows = [...extensionMap.values()].map((item) => [
  item.type,
  item.keyword,
  item.volume,
  sourceGoogle,
  "Volume uses the KE extension account-default market; US batch volume is authoritative in Keyword Plan.",
]);

const workbook = Workbook.create();
const summary = workbook.worksheets.add("Summary");
const plan = workbook.worksheets.add("Keyword Plan");
const gap = workbook.worksheets.add("Competitor Gap");
const ideas = workbook.worksheets.add("Extension Ideas");

for (const sheet of [summary, plan, gap, ideas]) {
  sheet.showGridLines = false;
}

const titleFill = "#071B33";
const primaryBlue = "#0878F9";
const accentRed = "#F10D12";
const lightBlue = "#EAF3FF";
const lightGray = "#F3F5F7";
const border = "#D7DEE7";
const green = "#DDF4E7";
const amber = "#FFF1CC";
const muted = "#5B6573";

summary.mergeCells("A1:H2");
summary.getRange("A1").values = [["Diesel Part Source - KE Keyword Research"]];
summary.getRange("A1:H2").format = {
  fill: titleFill,
  font: { bold: true, color: "#FFFFFF", size: 20 },
  verticalAlignment: "center",
  horizontalAlignment: "left",
};
summary.mergeCells("A3:H3");
summary.getRange("A3").values = [[
  "Market: United States | Generated: 2026-07-26 | Sources: Keywords Everywhere Search Volume Checker, Chrome extension, and Keyword Gap Analysis",
]];
summary.getRange("A3:H3").format = {
  fill: lightBlue,
  font: { color: titleFill, size: 10 },
  wrapText: true,
  verticalAlignment: "center",
};

const kpiLabels = [
  ["A5:B5", "Validated keywords"],
  ["C5:D5", "Keywords with volume"],
  ["E5:F5", "P1 opportunities"],
  ["G5:H5", "Competitor gaps"],
];
for (const [range, label] of kpiLabels) {
  summary.mergeCells(range);
  summary.getRange(range.split(":")[0]).values = [[label]];
  summary.getRange(range).format = {
    fill: lightGray,
    font: { bold: true, color: muted, size: 10 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: border },
  };
}
for (const range of ["A6:B7", "C6:D7", "E6:F7", "G6:H7"]) summary.mergeCells(range);
summary.getRange("A6").formulas = [["=COUNTA('Keyword Plan'!$A$5:$A$93)"]];
summary.getRange("C6").formulas = [["=COUNTIF('Keyword Plan'!$B$5:$B$93,\">0\")"]];
summary.getRange("E6").formulas = [["=COUNTIF('Keyword Plan'!$H$5:$H$93,\"P1\")"]];
summary.getRange("G6").formulas = [["=COUNTA('Competitor Gap'!$A$5:$A$188)"]];
for (const range of ["A6:B7", "C6:D7", "E6:F7", "G6:H7"]) {
  summary.getRange(range).format = {
    fill: "#FFFFFF",
    font: { bold: true, color: primaryBlue, size: 22 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: border },
    numberFormat: "#,##0",
  };
}

summary.getRange("A9:C9").values = [["Top US keywords", "Monthly volume", "Priority"]];
summary.getRange("A9:C9").format = {
  fill: primaryBlue,
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
summary.getRange("A10").formulas = [["=INDEX('Keyword Plan'!$A$5:$A$93,MATCH(ROW()-9,'Keyword Plan'!$L$5:$L$93,0))"]];
summary.getRange("A10:A21").fillDown();
summary.getRange("B10").formulas = [["=INDEX('Keyword Plan'!$B$5:$B$93,MATCH(ROW()-9,'Keyword Plan'!$L$5:$L$93,0))"]];
summary.getRange("B10:B21").fillDown();
summary.getRange("C10").formulas = [["=INDEX('Keyword Plan'!$H$5:$H$93,MATCH(ROW()-9,'Keyword Plan'!$L$5:$L$93,0))"]];
summary.getRange("C10:C21").fillDown();
summary.getRange("A10:C21").format = {
  borders: { insideHorizontal: { style: "thin", color: border } },
};
summary.getRange("B10:B21").format.numberFormat = "#,##0";
summary.getRange("C10:C21").format.horizontalAlignment = "center";

const chart = summary.charts.add("bar", summary.getRange("A9:B21"));
chart.title = "Highest validated US monthly search demand";
chart.hasLegend = false;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
chart.yAxis = { numberFormatCode: "#,##0" };
chart.setPosition("E9", "K24");

summary.mergeCells("A24:H24");
summary.getRange("A24").values = [["Recommended execution order"]];
summary.getRange("A24:H24").format = {
  fill: accentRed,
  font: { bold: true, color: "#FFFFFF" },
};
const recommendations = [
  ["1", "Protect the MTU commercial hub", "Target mtu engine parts, mtu spare parts, supplier, distributor, online and catalog variants on the MTU hub and Catalog page."],
  ["2", "Strengthen model/series landing pages", "Prioritize 16V2000, 16V4000, 12V4000, Series 2000, Series 4000 and Series 396 with real fitment and internal links."],
  ["3", "Build component clusters", "Create or strengthen injector, fuel pump, turbocharger, filter, piston, starter, alternator and seal category paths."],
  ["4", "Do not delete zero-volume part numbers", "Use GSC impressions, customer RFQs, superseded numbers and fitment data to decide exact part-number pages."],
];
for (let index = 0; index < recommendations.length; index += 1) {
  const row = 25 + index;
  summary.mergeCells(`B${row}:C${row}`);
  summary.mergeCells(`D${row}:H${row}`);
  summary.getRange(`A${row}`).values = [[recommendations[index][0]]];
  summary.getRange(`B${row}`).values = [[recommendations[index][1]]];
  summary.getRange(`D${row}`).values = [[recommendations[index][2]]];
}
summary.getRange("A25:A28").format = {
  font: { bold: true, color: primaryBlue },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
summary.getRange("B25:C28").format = {
  font: { bold: true, color: titleFill },
  wrapText: true,
  verticalAlignment: "center",
};
summary.getRange("D25:H28").format = {
  wrapText: true,
  font: { color: muted },
  verticalAlignment: "center",
};
summary.getRange("A25:H28").format.borders = { insideHorizontal: { style: "thin", color: border } };

plan.mergeCells("A1:L2");
plan.getRange("A1").values = [["Validated Keyword Plan - United States"]];
plan.getRange("A1:L2").format = {
  fill: titleFill,
  font: { bold: true, color: "#FFFFFF", size: 18 },
  verticalAlignment: "center",
};
plan.mergeCells("A3:L3");
plan.getRange("A3").values = [[
  "Volume = trailing 12-month US average. A zero can still represent sporadic niche demand; keep exact part-number pages when supported by GSC, customer RFQs, or fitment evidence.",
]];
plan.getRange("A3:L3").format = {
  fill: lightBlue,
  font: { color: titleFill, size: 10 },
  wrapText: true,
};
const planHeaders = [["Keyword", "US Volume", "CPC (USD)", "Paid Competition", "Trend %", "Category", "Intent", "Priority", "Recommended Target", "Source URL", "Notes", "Volume Rank"]];
plan.getRange("A4:L4").values = planHeaders;
plan.getRange("A4:L4").format = {
  fill: primaryBlue,
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
  horizontalAlignment: "center",
};
plan.getRange(`A5:L${4 + planRows.length}`).values = planRows;
plan.getRange("L5").formulas = [["=RANK(B5,$B$5:$B$93,0)+COUNTIF($B$5:B5,B5)-1"]];
plan.getRange(`L5:L${4 + planRows.length}`).fillDown();
plan.getRange(`B5:B${4 + planRows.length}`).format.numberFormat = "#,##0";
plan.getRange(`C5:C${4 + planRows.length}`).format.numberFormat = '"$"#,##0.00';
plan.getRange(`E5:E${4 + planRows.length}`).format.numberFormat = "0%";
plan.getRange(`A5:L${4 + planRows.length}`).format.borders = {
  insideHorizontal: { style: "thin", color: border },
};
plan.getRange(`A5:A${4 + planRows.length}`).format.font = { bold: true, color: titleFill };
plan.getRange(`H5:H${4 + planRows.length}`).format.horizontalAlignment = "center";
plan.getRange(`H5:H${4 + planRows.length}`).conditionalFormats.add("containsText", {
  text: "P1",
  format: { fill: green, font: { bold: true, color: "#12643A" } },
});
plan.getRange(`H5:H${4 + planRows.length}`).conditionalFormats.add("containsText", {
  text: "P2",
  format: { fill: lightBlue, font: { bold: true, color: primaryBlue } },
});
plan.getRange(`H5:H${4 + planRows.length}`).conditionalFormats.add("containsText", {
  text: "P3",
  format: { fill: lightGray, font: { color: muted } },
});
plan.getRange(`B5:B${4 + planRows.length}`).conditionalFormats.add("dataBar", {
  color: primaryBlue,
  gradient: true,
});
plan.getRange(`E5:E${4 + planRows.length}`).conditionalFormats.add("cellIs", {
  operator: "greaterThan",
  formula: 0,
  format: { fill: green, font: { color: "#12643A" } },
});
plan.getRange(`E5:E${4 + planRows.length}`).conditionalFormats.add("cellIs", {
  operator: "lessThan",
  formula: 0,
  format: { fill: "#FDE2E2", font: { color: "#A61B1B" } },
});
const planTable = plan.tables.add(`A4:L${4 + planRows.length}`, true, "ValidatedKeywordTable");
planTable.style = "TableStyleMedium2";
plan.freezePanes.freezeRows(4);

gap.mergeCells("A1:H2");
gap.getRange("A1").values = [["Competitor Keyword Gap - engine-family.com"]];
gap.getRange("A1:H2").format = {
  fill: titleFill,
  font: { bold: true, color: "#FFFFFF", size: 18 },
  verticalAlignment: "center",
};
gap.mergeCells("A3:H3");
gap.getRange("A3").values = [[
  "KE found 184 US gap keywords. dieselpartsource.com is too new for KE to verify, so these are competitor opportunities rather than a definitive proof that your site has no rankings.",
]];
gap.getRange("A3:H3").format = {
  fill: lightBlue,
  font: { color: titleFill, size: 10 },
  wrapText: true,
};
gap.getRange("A4:H4").values = [[
  "Keyword", "Competitor Traffic/mo", "Competitor Position", "Brand", "Intent", "Relevance", "Recommended Action", "Source URL",
]];
gap.getRange("A4:H4").format = {
  fill: primaryBlue,
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
  horizontalAlignment: "center",
};
gap.getRange(`A5:H${4 + gapRows.length}`).values = gapRows;
gap.getRange(`B5:C${4 + gapRows.length}`).format.numberFormat = "#,##0";
gap.getRange(`A5:H${4 + gapRows.length}`).format.borders = {
  insideHorizontal: { style: "thin", color: border },
};
gap.getRange(`F5:F${4 + gapRows.length}`).conditionalFormats.add("containsText", {
  text: "High",
  format: { fill: green, font: { bold: true, color: "#12643A" } },
});
gap.getRange(`F5:F${4 + gapRows.length}`).conditionalFormats.add("containsText", {
  text: "Medium",
  format: { fill: amber, font: { color: "#7A5200" } },
});
const gapTable = gap.tables.add(`A4:H${4 + gapRows.length}`, true, "CompetitorGapTable");
gapTable.style = "TableStyleMedium2";
gap.freezePanes.freezeRows(4);

ideas.mergeCells("A1:E2");
ideas.getRange("A1").values = [["KE Extension Keyword Ideas"]];
ideas.getRange("A1:E2").format = {
  fill: titleFill,
  font: { bold: true, color: "#FFFFFF", size: 18 },
  verticalAlignment: "center",
};
ideas.mergeCells("A3:E3");
ideas.getRange("A3").values = [[
  "These ideas came from Google Related and Long-Tail widgets. Their volume uses the KE extension account-default market and may differ from the US-only batch values.",
]];
ideas.getRange("A3:E3").format = {
  fill: lightBlue,
  font: { color: titleFill, size: 10 },
  wrapText: true,
};
ideas.getRange("A4:E4").values = [["Idea Type", "Keyword", "KE Volume", "Source URL", "Notes"]];
ideas.getRange("A4:E4").format = {
  fill: primaryBlue,
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
ideas.getRange(`A5:E${4 + extensionRows.length}`).values = extensionRows;
ideas.getRange(`C5:C${4 + extensionRows.length}`).format.numberFormat = "#,##0";
ideas.getRange(`A5:E${4 + extensionRows.length}`).format.borders = {
  insideHorizontal: { style: "thin", color: border },
};
const ideasTable = ideas.tables.add(`A4:E${4 + extensionRows.length}`, true, "ExtensionIdeasTable");
ideasTable.style = "TableStyleMedium2";
ideas.freezePanes.freezeRows(4);

summary.getRange("A1:H28").format.font.name = "Aptos";
plan.getRange(`A1:L${4 + planRows.length}`).format.font.name = "Aptos";
gap.getRange(`A1:H${4 + gapRows.length}`).format.font.name = "Aptos";
ideas.getRange(`A1:E${4 + extensionRows.length}`).format.font.name = "Aptos";

summary.getRange("A1:K28").format.rowHeight = 20;
summary.getRange("A1:H2").format.rowHeight = 30;
summary.getRange("A3:H3").format.rowHeight = 32;
summary.getRange("A25:H28").format.rowHeight = 44;
summary.getRange("A:A").format.columnWidth = 25;
summary.getRange("B:B").format.columnWidth = 17;
summary.getRange("C:C").format.columnWidth = 56;
summary.getRange("D:H").format.columnWidth = 15;

plan.getRange("A:A").format.columnWidth = 31;
plan.getRange("B:C").format.columnWidth = 13;
plan.getRange("D:D").format.columnWidth = 17;
plan.getRange("E:E").format.columnWidth = 12;
plan.getRange("F:G").format.columnWidth = 18;
plan.getRange("H:H").format.columnWidth = 11;
plan.getRange("I:I").format.columnWidth = 34;
plan.getRange("J:J").format.columnWidth = 46;
plan.getRange("K:K").format.columnWidth = 49;
plan.getRange("L:L").format.columnWidth = 12;

gap.getRange("A:A").format.columnWidth = 38;
gap.getRange("B:C").format.columnWidth = 18;
gap.getRange("D:F").format.columnWidth = 15;
gap.getRange("G:G").format.columnWidth = 19;
gap.getRange("H:H").format.columnWidth = 48;

ideas.getRange("A:A").format.columnWidth = 28;
ideas.getRange("B:B").format.columnWidth = 38;
ideas.getRange("C:C").format.columnWidth = 14;
ideas.getRange("D:D").format.columnWidth = 48;
ideas.getRange("E:E").format.columnWidth = 58;

await fs.mkdir(outputDir, { recursive: true });
const previews = [
  ["Summary", "A1:K28", "preview-summary.png"],
  ["Keyword Plan", "A1:L25", "preview-plan.png"],
  ["Competitor Gap", "A1:H25", "preview-gap.png"],
  ["Extension Ideas", `A1:E${Math.min(4 + extensionRows.length, 25)}`, "preview-ideas.png"],
];
for (const [sheetName, range, fileName] of previews) {
  const preview = await workbook.render({ sheetName, range, scale: 1.25, format: "png" });
  await fs.writeFile(`${outputDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}

const inspect = await workbook.inspect({
  kind: "table",
  range: "Summary!A1:H28",
  include: "values,formulas",
  tableMaxRows: 28,
  tableMaxCols: 8,
});
await fs.writeFile(`${outputDir}/inspect-summary.ndjson`, inspect.ndjson, "utf8");

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
await fs.writeFile(`${outputDir}/formula-errors.ndjson`, errors.ndjson, "utf8");

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/Diesel-Part-Source-KE-Keyword-Research.xlsx`);
