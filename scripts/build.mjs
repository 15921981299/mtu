#!/usr/bin/env node
/**
 * Build entry point.
 *
 * `astro build` and the Worker/redirects hand-off must BOTH run: dist/_redirects
 * is what retires 442 old URLs, so a build that generates pages but skips the
 * merge ships a site whose old paths all answer 404 — the exact accident that
 * took eagle-engine.com to zero.
 *
 * Chaining them with `&&` made that failure silent: any non-zero exit from
 * astro build skipped the merge, and the deployment looked fine. So run both,
 * always, and exit with astro's status so a real failure still fails loudly.
 *
 * BUILD_STARTED_AT_MS is handed to the hand-off step so it can prove the
 * sitemap it sees was written by THIS build rather than left over from an
 * earlier one (see the freshness assertion in scripts/create-worker-entry.mjs).
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const BUILD_STARTED_AT_MS = Date.now();

const run = (command, env) => spawnSync(command, { stdio: 'inherit', shell: true, env });

/**
 * Sandbox accommodation (local dev only).
 *
 * Astro's `cleanServerOutput()` deletes its own SSR chunks with an unguarded
 * `fs.promises.rm`; if that rejects, `astro:build:done` never runs and the
 * sitemap is silently left stale. WorkBuddy's sandbox can make those deletes
 * reject, so when its shim is present we append a second `--require` that
 * tolerates only that one refusal. On a normal machine NODE_OPTIONS is passed
 * through untouched.
 */
const existingNodeOptions = process.env.NODE_OPTIONS || '';
const SANDBOX_SHIM = 'node-language-shim.cjs';
const toleranceShim = resolve('scripts/astro-clean-tolerance.cjs');
let nodeOptions = existingNodeOptions;
if (existingNodeOptions.includes(SANDBOX_SHIM) && existsSync(toleranceShim)) {
  const shimPath = toleranceShim.replace(/\\/g, '/');
  nodeOptions = `${existingNodeOptions} --require="${shimPath}"`;
}

const env = {
  ...process.env,
  NODE_OPTIONS: nodeOptions,
  BUILD_STARTED_AT_MS: String(BUILD_STARTED_AT_MS),
};

const pages = run('astro build', env);
const handoff = run('node scripts/create-worker-entry.mjs', env);

if (pages.status !== 0) {
  console.error('\n! `astro build` exited non-zero — page output may be stale or incomplete.');
}
if (handoff.status !== 0) {
  console.error('\n! the Worker/redirects hand-off failed — dist/_redirects, dist/_worker.js and dist/sitemap-0.xml may be out of date.');
}

process.exit(pages.status || handoff.status || 0);
