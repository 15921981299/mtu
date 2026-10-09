import { products, isProductPageNoindex } from './products';
import { importedEngineFamilyPages } from './imported-engine-family-pages';
import { isPartPageIndexable, mtuParts } from './mtu-parts';
import { publishedCaseStudies } from './case-studies';

/** Pathnames excluded from sitemap-index (must match trailingSlash: 'always'). */
const STATIC_EXCLUDES = new Set(['/401/', '/404/', '/thank-you/']);

/**
 * /case-studies/ is noindex while there are no published (customer-authorized)
 * cases; keep it out of the sitemap in that state. Individual case pages only
 * exist for published entries, so they need no exclusion here.
 */
const CASE_STUDIES_EXCLUDES = new Set(
  publishedCaseStudies.length === 0 ? ['/case-studies/'] : [],
);

function isImportedPageNoindex(page: (typeof importedEngineFamilyPages)[number]): boolean {
  return !/^(part\/mtu-(183-parts|538-parts|1800-parts|specialized-tools)$|stock$|support-services$|genuine-oem-parts$|mtu-oils$|mtu-coolants$|series-4000|rail-drive-solutions$)/i.test(page.slug);
}

const NOINDEX_PRODUCT_PATHS = new Set(
  products.filter(isProductPageNoindex).map((product) => `/products/${product.slug}/`)
);

const NOINDEX_IMPORTED_PATHS = new Set(
  importedEngineFamilyPages.filter(isImportedPageNoindex).map((page) => `/${page.slug}/`)
);

const NOINDEX_PART_PATHS = new Set(
  mtuParts
    .filter((part) => !isPartPageIndexable(part))
    .map((part) => `/part-products/${part.slug}/`)
);

export function isSitemapExcluded(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return (
    STATIC_EXCLUDES.has(normalized) ||
    CASE_STUDIES_EXCLUDES.has(normalized) ||
    NOINDEX_PRODUCT_PATHS.has(normalized) ||
    NOINDEX_IMPORTED_PATHS.has(normalized) ||
    NOINDEX_PART_PATHS.has(normalized)
  );
}

/** For build-time logging. */
export const sitemapExcludeStats = {
  static: STATIC_EXCLUDES.size,
  noindexProducts: NOINDEX_PRODUCT_PATHS.size,
  noindexImported: NOINDEX_IMPORTED_PATHS.size,
  noindexParts: NOINDEX_PART_PATHS.size,
  total:
    STATIC_EXCLUDES.size +
    NOINDEX_PRODUCT_PATHS.size +
    NOINDEX_IMPORTED_PATHS.size +
    NOINDEX_PART_PATHS.size,
};
