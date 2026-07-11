import { products } from './products';
import { importedEngineFamilyPages } from './imported-engine-family-pages';

/** Pathnames excluded from sitemap-index (must match trailingSlash: 'always'). */
const STATIC_EXCLUDES = new Set(['/401/', '/404/', '/thank-you/']);

function isGeneratedProductNoindex(product: (typeof products)[number]): boolean {
  const productIdentityText = `${product.slug} ${product.title} ${product.h1Title}`.toLowerCase();
  const isGeneratedModelPage = /is listed under .* inquiry support/i.test(product.content.partTwo);
  const isCoreIndexProduct = new Set([
    'mtu-spare-parts',
    'mtu-2000-series-parts',
    'mtu-4000-series-parts',
    'detroit-diesel-parts',
    'cummins-parts',
    'deutz-parts',
  ]).has(product.slug);
  const isMtuLongTail = /\bmtu\b|mtu-|2000|4000|1163|8000|396|183|538|595|956/.test(productIdentityText);

  return isGeneratedModelPage && !isCoreIndexProduct && !isMtuLongTail;
}

function isImportedPageNoindex(page: (typeof importedEngineFamilyPages)[number]): boolean {
  return !/^(part\/mtu|marine$|industrial-engines$|power-generation$|stock$|support-services$|genuine-oem-parts$|mtu-filters$|mtu-oils$|mtu-coolants$|series-4000|rail-drive-solutions$)/i.test(page.slug);
}

const NOINDEX_PRODUCT_PATHS = new Set(
  products.filter(isGeneratedProductNoindex).map((product) => `/products/${product.slug}/`)
);

const NOINDEX_IMPORTED_PATHS = new Set(
  importedEngineFamilyPages.filter(isImportedPageNoindex).map((page) => `/${page.slug}/`)
);

export function isSitemapExcluded(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return (
    STATIC_EXCLUDES.has(normalized) ||
    NOINDEX_PRODUCT_PATHS.has(normalized) ||
    NOINDEX_IMPORTED_PATHS.has(normalized)
  );
}

/** For build-time logging. */
export const sitemapExcludeStats = {
  static: STATIC_EXCLUDES.size,
  noindexProducts: NOINDEX_PRODUCT_PATHS.size,
  noindexImported: NOINDEX_IMPORTED_PATHS.size,
  total: STATIC_EXCLUDES.size + NOINDEX_PRODUCT_PATHS.size + NOINDEX_IMPORTED_PATHS.size,
};
