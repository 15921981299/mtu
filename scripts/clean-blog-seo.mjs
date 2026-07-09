/**
 * One-off SEO cleanup: remove duplicate boilerplate, cap future publish dates.
 * Run: node scripts/clean-blog-seo.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const blogPath = join(root, 'src/data/blog.ts');
const MAX_PUBLISH_DATE = '2026-06-11';

let content = readFileSync(blogPath, 'utf8');

const boilerplatePatterns = [
  /<h2>Quality Assurance: The Difference Between Checking and Inspecting<\/h2><p>There is a difference between checking a part and inspecting it\. Checking means glancing at it and saying "looks good\." Inspecting means measuring every dimension on the drawing against calibrated instruments and recording the results\. We inspect\. Every time\. Because the one dimension you skip is always the one that matters — and the one that will cause a problem downstream\. Our inspection process is documented, our instruments are calibrated, and our reports are filed\. When you receive parts from us, you receive the proof that they were made right\.<\/p>/g,
  /<h2>Real Cost Impact of Design Choices<\/h2><p>Let me give you concrete numbers from real projects\. Switching from 3 setups to 1 saves \$80-120 per batch\. Increasing internal corner radii from R0\.5mm to R3mm reduces cycle time 25-35%\. Relaxing non-functional tolerances from ±0\.01mm to ±0\.05mm saves 15-25% on machining time\. Adding two parallel fixturing pads \(machined off later\) eliminates custom fixture costs of \$50-100 per batch\.<\/p><p>On a 50-piece order, good DFM saves \$500-1,500\. On a 500-piece production run, it saves \$5,000-15,000\. That is real money from decisions made at the design stage, before a single chip is cut\. <a href="\/contact\/">Send your design for free DFM review →<\/a><\/p>/g,
  /<h2>Quality Note: Surface Finish Verification<\/h2><p>Surface finish is one of the most commonly overlooked quality checks in CNC machining\. A profilometer measurement takes 30 seconds and provides an objective Ra or Rz value\. Without it, surface finish is judged by eye — which is subjective and inconsistent\. We measure surface finish on every critical surface and record the value in the inspection report\. For sealing surfaces, bearing journals, and cosmetic surfaces, this data is essential\. For internal non-contact surfaces, as-machined is usually fine — and we will tell you if a finish callout seems unnecessary for the surface's function\.<\/p>/g,
  /<h2>The Quality Inspector's Perspective: What Gets Checked and Why<\/h2><p>As a quality inspector, my job is to be the last line of defense between the machine shop and your assembly line\. Every part that leaves our shop passes through inspection — and the standard is not "looks okay\." The standard is: every dimension on the drawing, verified against calibrated instruments, documented in a report that you can audit\.<\/p><p>Here is what happens during a typical inspection: \(1\) Visual check — surface finish, burrs, obvious defects, cosmetic quality\. This catches about 40% of issues\. \(2\) Dimensional check — critical dimensions measured first \(bearing bores, mating surfaces, thread gauges\), then non-critical dimensions spot-checked\. \(3\) Documentation — every measured value recorded, compared to tolerance, marked pass\/fail\. \(4\) Final review — the inspector signs off, the report is filed, and the parts are cleared for packaging\.<\/p><p>Inspection is not a barrier to delivery — it is what makes delivery meaningful\. Parts that arrive without inspection data are parts you have to inspect yourself\. And if you find a problem at your facility, you have already paid for shipping, customs, and the downtime of discovering the issue\. Inspection at the source is always cheaper than inspection at the destination\.<\/p>/g,
  /<h2>A Real Story From Our Shop<\/h2><p>A customer once sent us an aluminum housing with a deep pocket — 80mm deep with a 15mm corner radius\. The drawing called for ±0\.02mm on the pocket floor flatness\. We quoted it, but we also suggested: split the housing into a base \+ lid, bolt them together with an O-ring seal\. The redesigned version was two simpler parts instead of one complex one\. Machining cost dropped 45%\. Assembly was straightforward\. And the flatness on the sealing surface was actually better because each half was easier to fixture\. The customer was initially skeptical — "I designed it as one piece for a reason\." But after testing the two-piece version, they adopted it for production\. Sometimes the best DFM feedback challenges your assumptions\. That is exactly when it is most valuable\.<\/p>/g,
  /<h2>Building Quality Into the Process<\/h2><p>Quality is not achieved by inspecting defects out at the end\. It is achieved by building consistency into every step: \(1\) Incoming material verification — checking certificates against physical heat numbers\. \(2\) In-process checks — measuring during the run, not after\. \(3\) Tool life management — changing tools based on predicted wear\. \(4\) Environmental control — temperature-stabilized for tight tolerances\. \(5\) Documentation — recording what was done so it can be repeated\.<\/p><p>A shop that does all five consistently is a shop you can trust\. One that skips steps and relies on final inspection to catch problems will eventually ship bad parts\. <a href="\/contact\/">Experience quality-first machining →<\/a><\/p>/g,
  /<h2>Why This Matters in Practice<\/h2><p>I have seen countless drawings where well-intentioned design features made parts unnecessarily expensive\. A classic mistake: threaded holes on the side of a bracket designed to be machined from the top face only\. Those side holes require a second setup — adding \$50-100 in fixturing and setup labor, plus alignment error between setups\. A through-hole from the top with a nut on the back achieves the same function in one setup at significantly lower cost\.<\/p><p>Before finalizing any part design, imagine standing next to the CNC machine watching it being made\. Can every feature be reached from one or two directions\? Are there internal corners that require a tiny, fragile tool\? Are there features that serve no functional purpose\? This mental exercise catches 80% of DFM issues before the first quote\. I do it on every drawing I review\.<\/p>/g,
  /<h2>Quality Assurance: The Difference Between Checking and Inspecting<\/h2><p>There is a difference between checking a part and inspecting it\. Checking means glancing at it and saying "looks good\." Inspecting means measuring every dimension on the drawing against calibrated instruments and recording the results\. We inspect\. Every time\. Because the one dimension you skip is always the one that matters — and the one that will cause a problem downstream\. Our inspection process is documented, our instruments are calibrated, and our reports are filed\. When you receive parts from us, you receive the proof that they were made right\.<\/p>/g,
];

for (const pattern of boilerplatePatterns) {
  const before = content.length;
  content = content.replace(pattern, '');
  const removed = before - content.length;
  if (removed > 0) {
    console.log(`Removed ${removed} chars via pattern`);
  }
}

// Cap future publish dates
content = content.replace(/publishedAt: '(\d{4}-\d{2}-\d{2})'/g, (match, date) => {
  if (date > MAX_PUBLISH_DATE) {
    return `publishedAt: '${MAX_PUBLISH_DATE}'`;
  }
  return match;
});

// Trim trailing whitespace inside template literals before closing backtick in partOne/partTwo
content = content.replace(
  /(part(?:One|Two): `[\s\S]*?)(\n{3,})`/g,
  (m, body) => `${body.trimEnd()}\n\``,
);

writeFileSync(blogPath, content, 'utf8');
console.log('blog.ts cleaned.');
