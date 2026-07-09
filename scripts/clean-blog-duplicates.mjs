import fs from 'node:fs';
import path from 'node:path';

const blogPath = path.join(process.cwd(), 'src/data/blog.ts');
let content = fs.readFileSync(blogPath, 'utf8');

const procurementStory =
  /<h2>A Real Story From Our Shop<\/h2><p>A procurement manager once told me:[\s\S]*?cheapest money that procurement manager ever spent\.<\/p>/g;

const titaniumStory =
  /<h2>A Real Story From Our Shop<\/h2><p>I remember a medical device startup that came to us with a titanium housing\.[\s\S]*?That is what DFM does\.<\/p>/g;

const procurementMatches = content.match(procurementStory)?.length ?? 0;
const titaniumMatches = content.match(titaniumStory)?.length ?? 0;

content = content.replace(procurementStory, '');
content = content.replace(titaniumStory, '');

const procurementCanonical = `<h2>A Real Story From Our Shop</h2><p>A procurement manager once told me: "Your quote is 20% higher than the other shop, but I am going with you because you asked three questions about my drawing that no one else asked." Those questions were about thread depth, surface finish on a non-critical surface, and whether a tight positional tolerance was functionally necessary. The other shops had just priced the drawing as-is. We had actually read it. The procurement manager later told me that the cheaper shop delivered parts where the threads galled on assembly because they had not questioned the thread specification. Our parts fit perfectly. The 20% premium was the cheapest money that procurement manager ever spent.</p>`;

const titaniumCanonical = `<h2>A Real Story From Our Shop</h2><p>I remember a medical device startup that came to us with a titanium housing. Beautiful design — organic curves, thin walls, tight tolerances. The quote came back at $890 per part at 20 pieces. They were shocked. We walked through the drawing together: the thin walls required specialized tooling and conservative feeds, the organic curves needed 5-axis simultaneous machining, and the tight tolerances meant 100% CMM inspection on every feature. Together, we identified which features actually needed those specs and which could be relaxed. We thickened the walls from 0.8mm to 1.5mm, relaxed six non-functional tolerances, and simplified one curved surface that did not affect function. Second quote: $340 per part. Same function, same material, same application. That is what DFM does.</p>`;

if (!content.includes('cheapest money that procurement manager ever spent')) {
  content = content.replace(
    '<p>Ready to test a supplier? Review our <a href="/certifications/">certifications</a>',
    `${procurementCanonical}\n<p>Ready to test a supplier? Review our <a href="/certifications/">certifications</a>`,
  );
}

if (!content.includes('$890 per part at 20 pieces')) {
  content = content.replace(
    '<a href="/contact/">Send your drawing for free DFM feedback →</a></p>',
    `<a href="/contact/">Send your drawing for free DFM feedback →</a></p>\n\n${titaniumCanonical}`,
  );
}

content = content.replace(/\n{3,}/g, '\n\n');
content = content.replace(/  \},  \{/g, '  },\n  {');

fs.writeFileSync(blogPath, content);
console.log(`Removed ${procurementMatches} procurement story blocks and ${titaniumMatches} titanium DFM story blocks.`);
console.log('Canonical stories kept on supplier-selection and DFM pillar posts.');
