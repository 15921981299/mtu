import fs from 'node:fs';
import path from 'node:path';

const blogPath = path.join(process.cwd(), 'src/data/blog.ts');
let content = fs.readFileSync(blogPath, 'utf8');

const thumbs = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/cnc-machining-blog-thumbnail-${n}.webp`);
const mains = [
  '/images/cnc-milling-precision-metal-parts.jpg',
  '/images/cnc-turning-cylindrical-parts.jpg',
  '/images/5-axis-cnc-complex-parts.jpg',
  '/images/cnc-machined-aluminum-parts.jpg',
  '/images/cnc-machined-stainless-steel-parts.jpg',
  '/images/cnc-machined-titanium-parts.jpg',
  '/images/cnc-machined-brass-copper-parts.jpg',
  '/images/wire-edm-machining-parts.jpg',
  '/images/precision-surface-grinding-parts.jpg',
  '/images/cmm-coordinate-measuring-inspection.jpg',
  '/images/cnc-engineer-cad-cam-design.jpg',
  '/images/cnc-machining-inspection-report.jpg',
];
const secondaries = [
  '/images/cnc-milling-cutting-process-closeup.jpg',
  '/images/cnc-turning-lathe-process-closeup.jpg',
  '/images/cnc-machining-technical-drawing-review.jpg',
  '/images/precision-micrometer-measurement.jpg',
  '/images/cnc-machine-operator-at-work.jpg',
  '/images/anodized-aluminum-surface-finish.jpg',
  '/images/powder-coated-parts-surface-finish.jpg',
  '/images/cnc-machining-production-line.jpg',
  '/images/cnc-machining-blog-detail-image.webp',
  '/images/cnc-machining-service-detail-secondary.webp',
];

let index = 0;
content = content.replace(
  /slug: '([^']+)',[\s\S]*?image: '[^']*',[\s\S]*?mainImage: '[^']*',[\s\S]*?secondaryImage: '[^']*',/g,
  (block, slug) => {
    const thumb = thumbs[index % thumbs.length];
    const main = mains[index % mains.length];
    const secondary = secondaries[index % secondaries.length];
    index += 1;
    return block
      .replace(/image: '[^']*',/, `image: '${thumb}',`)
      .replace(/mainImage: '[^']*',/, `mainImage: '${main}',`)
      .replace(/secondaryImage: '[^']*',/, `secondaryImage: '${secondary}',`);
  }
);

fs.writeFileSync(blogPath, content);
console.log(`Assigned unique image sets to ${index} blog posts.`);
