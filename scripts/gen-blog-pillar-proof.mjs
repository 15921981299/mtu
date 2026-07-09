/**
 * Print suggested case-study proof links for pillar hub posts.
 */
import fs from 'node:fs';
import path from 'node:path';

const blogQuality = fs.readFileSync(path.join(process.cwd(), 'src/data/blog-quality.ts'), 'utf8');
const hubs = [...blogQuality.matchAll(/id: '([^']+)'[\s\S]*?slug: '([^']+)'/g)].map((m) => ({
  id: m[1],
  slug: m[2],
}));

const proofByPillar = {
  tolerances: ['automotive-steel-shaft', 'robotics-aluminum-gantry-plate'],
  sourcing: ['medical-stainless-housing', 'aerospace-aluminum-bracket'],
  dfm: ['consumer-electronics-aluminum-heatsink', 'industrial-automation-gantry-plate'],
  materials: ['aerospace-aluminum-bracket', 'medical-peek-surgical-guide'],
  process: ['aerospace-inconel-engine-bracket', 'robotics-titanium-motor-mount'],
  'cost-leadtime': ['consumer-electronics-aluminum-heatsink', 'automotive-ev-battery-mount'],
  quality: ['medical-stainless-housing', 'automotive-steel-shaft'],
  finishes: ['consumer-electronics-aluminum-heatsink', 'marine-bronze-propeller-bushing'],
  drawings: ['aerospace-aluminum-bracket', 'automotive-steel-shaft'],
  'getting-started': ['industrial-automation-gantry-plate', 'consumer-electronics-aluminum-heatsink'],
};

for (const hub of hubs) {
  console.log(hub.slug, '->', proofByPillar[hub.id]?.join(', '));
}
