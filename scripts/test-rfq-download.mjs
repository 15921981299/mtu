import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../cloudflare-worker.js';

test('unsigned download requests are rejected', async () => {
  const response = await worker.fetch(
    new Request('https://dieselpartsource.com/api/rfq/download?key=rfq/example.pdf'),
    { RFQ_DOWNLOAD_SECRET: 'test-secret', R2_BUCKET: {} },
  );
  assert.equal(response.status, 403);
  assert.match(response.headers.get('X-Robots-Tag'), /noindex/);
});

test('uploaded drawing receives a working seven-day private link', async () => {
  const objects = new Map();
  const bucket = {
    async put(key, body, options) {
      const bytes = new Uint8Array(await new Response(body).arrayBuffer());
      objects.set(key, { bytes, options });
    },
    async get(key) {
      const item = objects.get(key);
      if (!item) return null;
      return {
        body: item.bytes,
        size: item.bytes.byteLength,
        httpMetadata: item.options.httpMetadata,
        customMetadata: item.options.customMetadata,
      };
    },
  };
  const form = new FormData();
  form.set('name', 'Test Buyer');
  form.set('email', 'buyer@example.com');
  form.append('drawing', new Blob(['drawing'], { type: 'application/pdf' }), 'engine drawing.pdf');
  const emails = [];
  const __sendEmail = async (_env, message) => {
    emails.push(message);
  };
  const response = await worker.fetch(
    new Request('https://dieselpartsource.com/api/rfq', { method: 'POST', body: form }),
    { __sendEmail, RFQ_DOWNLOAD_SECRET: 'download-test', R2_BUCKET: bucket },
  );
  assert.equal(response.status, 200);
  const match = emails[0].text.match(/https:\/\/dieselpartsource\.com\/api\/rfq\/download\?[^\s]+/);
  assert.ok(match, 'sales email should contain a private download URL');
  const download = await worker.fetch(new Request(match[0]), {
    RFQ_DOWNLOAD_SECRET: 'download-test',
    R2_BUCKET: bucket,
  });
  assert.equal(download.status, 200);
  assert.match(download.headers.get('Content-Disposition'), /engine%20drawing\.pdf/);
  assert.equal(await download.text(), 'drawing');
});
