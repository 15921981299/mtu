import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const workerDir = resolve('dist/_worker.js');
const workerEntry = resolve(workerDir, 'index.js');
const assetsIgnore = resolve('dist/.assetsignore');

await mkdir(workerDir, { recursive: true });
await copyFile(resolve('cloudflare-worker.js'), workerEntry);
await writeFile(assetsIgnore, '', 'utf8');

console.log(`Created ${workerEntry}`);
console.log(`Created ${assetsIgnore}`);
