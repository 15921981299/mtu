import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const workerDir = resolve('dist/_worker.js');
const workerEntry = resolve(workerDir, 'index.js');

await mkdir(workerDir, { recursive: true });
await copyFile(resolve('cloudflare-worker.js'), workerEntry);

console.log(`Created ${workerEntry}`);
