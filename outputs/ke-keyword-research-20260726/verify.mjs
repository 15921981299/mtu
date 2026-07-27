import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputDir = "E:/mtu/outputs/ke-keyword-research-20260726";
const filePath = `${outputDir}/Diesel-Part-Source-KE-Keyword-Research.xlsx`;
const input = await FileBlob.load(filePath);
const workbook = await SpreadsheetFile.importXlsx(input);

const sheets = await workbook.inspect({
  kind: "sheet",
  include: "id,name",
});
await fs.writeFile(`${outputDir}/verify-sheets.ndjson`, sheets.ndjson, "utf8");

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "imported workbook formula error scan",
});
await fs.writeFile(`${outputDir}/verify-errors.ndjson`, errors.ndjson, "utf8");

const preview = await workbook.render({
  sheetName: "Summary",
  range: "A1:K28",
  scale: 1,
  format: "png",
});
await fs.writeFile(`${outputDir}/verify-summary.png`, new Uint8Array(await preview.arrayBuffer()));
