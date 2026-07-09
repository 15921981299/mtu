import fs from 'node:fs';

const p = 'src/data/blog.ts';
let s = fs.readFileSync(p, 'utf8');

const tableRe =
  /<table style="width:100%;border-collapse:collapse;margin:20px 0;">[\s\S]*?<\/table>\s*/g;
const tableCount = (s.match(tableRe) ?? []).length;
s = s.replace(tableRe, '');
console.log('Removed orphan tables:', tableCount);

const leadOld =
  'partTwo: `<h2>How to Get Your Parts Faster</h2><ul><li>Submit a complete 3D model (STEP) plus 2D drawing with tolerances</li><li>Call out only critical dimensions</li><li>Specify material grade clearly</li><li>Approve DFM feedback quickly</li></ul><p>Need parts urgently? Mention your deadline. <a href="/contact/">Request a quote with your target date →</a></p>';
const leadNew =
  'partTwo: `<h2>How to Get Your Parts Faster</h2><ul><li>Submit a complete 3D model (STEP) plus 2D drawing with tolerances</li><li>Call out only critical dimensions</li><li>Specify material grade clearly</li><li>Approve DFM feedback quickly</li></ul><h2>Express vs Standard — What We Can Actually Promise</h2><p>Express slots (7–10 business days) apply to frozen drawings on common alloys — 6061, 304, 1018 — without first-time 5-axis programs or hard-coat anodize lots. A recent 5-piece 7075 bracket stayed on standard lead because the customer changed Rev B mid-CAM; paying rush on an unreleased drawing does not compress DFM iteration.</p><p>Need parts urgently? Mention your deadline on the RFQ. See our <a href="/compare/express-vs-standard-lead-time/">express vs standard lead time comparison</a> or <a href="/contact/">request a quote with your target date →</a></p>';

if (s.includes(leadOld)) {
  s = s.replace(leadOld, leadNew);
  console.log('Updated lead time guide');
} else {
  console.log('Lead time block not found');
}

const cpkOld = 'Learn about our quality →</a></p>';
const cpkNew =
  'Compare <a href="/compare/cpk-vs-ppk-capability/">Cpk vs Ppk on production POs</a> or <a href="/certifications/">learn about our quality program →</a></p>';
if (s.includes(cpkOld)) {
  s = s.split(cpkOld).join(cpkNew);
  console.log('Updated Cpk article links');
}

fs.writeFileSync(p, s);
