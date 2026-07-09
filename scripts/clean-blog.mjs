import fs from 'node:fs';
import path from 'node:path';

const blogPath = path.join(process.cwd(), 'src/data/blog.ts');
let content = fs.readFileSync(blogPath, 'utf8');

// Future dates → past dates (site audited June 2026)
content = content.replace(/publishedAt: '2027-/g, "publishedAt: '2025-");

const patterns = [
  // Boilerplate H2 sections injected into many posts
  /<h2>What Experience Teaches That Textbooks Do Not<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>Practical Shop Floor Checks<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>The Shop Owner's Perspective: What This Means for Your Bottom Line<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>The Procurement Perspective: What to Look for When Sourcing These Parts<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>Inspection & Documentation Reference<\/h2><table[\s\S]*?<\/table>/g,
  // Repeated CTA / insight blocks (BlogCta already covers conversion)
  /<div class="expert-insight"[\s\S]*?<\/div>/g,
  /<div class="key-takeaways"[\s\S]*?<\/div>/g,
  /<p style="margin-top:24px;text-align:center;"><a href="\/contact\/"[\s\S]*?<\/a><\/p>/g,
  // Generic process comparison table appended to many posts
  /<table style="width:100%;border-collapse:collapse;margin:20px 0;">\s*<tr style="background:#0a1628;color:#fff;"><th style="padding:10px;text-align:left;">Process<\/th>[\s\S]*?<\/table>/g,
  // Second-pass template blocks with variant headings
  /<h2>Practical Experience Makes the Difference<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>The Shop Owner's View: What I Wish Every Customer Knew<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>What Sets Great Shops Apart<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>Quality Control Reality: What Gets Measured Gets Made<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<div class="data-point"[\s\S]*?<\/div>/g,
  /<div style="background:#f0f5ff;border-left:4px solid #146ef5;[\s\S]*?<\/div>/g,
  /<div style="background:#f0f9ff;border:1px solid #bae6fd;[\s\S]*?<\/div>/g,
  /<h2>The Shop Owner's View:[^<]*<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
  /<h2>The Procurement Perspective:[^<]*<\/h2>(?:<p>[\s\S]*?<\/p>)+/g,
];

let totalRemoved = 0;
for (const pattern of patterns) {
  const matches = content.match(pattern);
  if (matches) totalRemoved += matches.length;
  content = content.replace(pattern, '');
}

// Collapse excessive blank lines left inside template strings
content = content.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(blogPath, content);
console.log(`Blog cleanup done. Removed ${totalRemoved} boilerplate blocks.`);
