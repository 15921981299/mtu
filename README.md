# Machining Supplier

Precision CNC machining supplier website built with [Astro](https://astro.build). Live site: [machiningsupplier.com](https://machiningsupplier.com).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run check
npm run build
npm run preview
```

## Site structure

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/capabilities/` | CNC machining capabilities |
| `/materials/` | Machinable materials |
| `/industries/` | Industry applications |
| `/case-studies/` | Project case studies |
| `/blog/` | Technical articles |
| `/about/` | About us |
| `/contact/` | RFQ form (Cloudflare Worker `/api/rfq`) |
| `/thank-you/` | Post-submission confirmation |

## Configuration

Edit `src/data/site.ts`:

- `gaMeasurementId` — Google Analytics 4 (leave empty to disable)
- `googleSiteVerification` — GSC HTML verification content value (leave empty to skip)
- `social.linkedin` / `social.youtube` — footer social links (leave empty to hide)

## Stack

- Astro 5 (static site generation)
- TypeScript client scripts
- `@astrojs/sitemap` for SEO
- Cloudflare Worker (`cloudflare-worker.js`) for RFQ form submissions via Resend + R2

### Worker secrets

RFQ API is implemented in `functions/api/rfq/index.js` (Cloudflare Pages Function). `cloudflare-worker.js` is a standalone equivalent for separate Worker deploys.

Set these secrets/bindings on Cloudflare Pages:

- `RESEND_API_KEY` — Resend API bearer token
- `R2_BUCKET` — R2 bucket binding for drawing uploads
