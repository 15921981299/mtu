import { blogPosts, blogTags } from './blog';
import { isBlogNoindex } from './blog-quality';
import { comparisons } from './comparisons';
import { isComparisonNoindex } from './comparison-quality';
import { glossaryTerms } from './glossary';
import { isGlossaryNoindex } from './glossary-quality';
import { capabilitySubpages } from './capability-subpages';
import { industrySubpages } from './industry-subpages';
import { materialSubpages } from './material-subpages';
import { productSubpages } from './product-subpages';
import { products } from './products';
import { importedEngineFamilyPages } from './imported-engine-family-pages';
import { isSubpageNoindex, subpagePath } from './subpage-quality';

/** Pathnames excluded from sitemap-index (must match trailingSlash: 'always'). */
const STATIC_EXCLUDES = new Set(['/401/', '/404/', '/thank-you/']);

const LEGACY_CNC_PREFIX_EXCLUDES = [
  '/materials/',
  '/compare/',
  '/features/',
  '/standards/',
  '/glossary/',
  '/resources/dfm-checklist/',
  '/blog/',
  '/case-studies/',
];

const NOINDEX_BLOG_PATHS = new Set(
  blogPosts.filter((post) => isBlogNoindex(post.slug)).map((post) => `/blog/${post.slug}/`)
);

const NOINDEX_GLOSSARY_PATHS = new Set(
  glossaryTerms
    .filter((term) => isGlossaryNoindex(term.slug))
    .map((term) => `/glossary/${term.slug}/`)
);

const NOINDEX_COMPARISON_PATHS = new Set(
  comparisons.filter((c) => isComparisonNoindex(c.slug)).map((c) => `/compare/${c.slug}/`)
);

const NOINDEX_SUBPAGE_PATHS = new Set<string>([
  ...materialSubpages
    .filter((sp) => isSubpageNoindex(sp.materialSlug, sp.slug))
    .map((sp) => subpagePath(sp.materialSlug, sp.slug, 'materials')),
  ...productSubpages
    .filter((sp) => isSubpageNoindex(sp.productSlug, sp.slug))
    .map((sp) => subpagePath(sp.productSlug, sp.slug, 'products')),
  ...industrySubpages
    .filter((sp) => isSubpageNoindex(sp.industrySlug, sp.slug))
    .map((sp) => subpagePath(sp.industrySlug, sp.slug, 'industries')),
  ...capabilitySubpages
    .filter((sp) => isSubpageNoindex(sp.capabilitySlug, sp.slug))
    .map((sp) => subpagePath(sp.capabilitySlug, sp.slug, 'capabilities')),
]);

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

/** Blog tag archives — noindex thin listing pages. */
const NOINDEX_BLOG_TAG_PATHS = new Set(blogTags.map((tag) => `/blog/tag/${tag}/`));

/** Blog archive pagination beyond page 1 — thin listing pages. */
const NOINDEX_BLOG_PAGINATION = new Set(
  Array.from({ length: 20 }, (_, i) => `/blog/page/${i + 2}/`)
);

export function isSitemapExcluded(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return (
    STATIC_EXCLUDES.has(normalized) ||
    LEGACY_CNC_PREFIX_EXCLUDES.some((prefix) => normalized.startsWith(prefix)) ||
    NOINDEX_BLOG_PATHS.has(normalized) ||
    NOINDEX_GLOSSARY_PATHS.has(normalized) ||
    NOINDEX_COMPARISON_PATHS.has(normalized) ||
    NOINDEX_SUBPAGE_PATHS.has(normalized) ||
    NOINDEX_PRODUCT_PATHS.has(normalized) ||
    NOINDEX_IMPORTED_PATHS.has(normalized) ||
    NOINDEX_BLOG_TAG_PATHS.has(normalized) ||
    NOINDEX_BLOG_PAGINATION.has(normalized)
  );
}

export function isBlogPaginationNoindex(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return NOINDEX_BLOG_PAGINATION.has(normalized);
}

/** For build-time logging. */
export const sitemapExcludeStats = {
  static: STATIC_EXCLUDES.size,
  noindexBlog: NOINDEX_BLOG_PATHS.size,
  noindexGlossary: NOINDEX_GLOSSARY_PATHS.size,
  noindexComparisons: NOINDEX_COMPARISON_PATHS.size,
  noindexSubpages: NOINDEX_SUBPAGE_PATHS.size,
  noindexProducts: NOINDEX_PRODUCT_PATHS.size,
  noindexImported: NOINDEX_IMPORTED_PATHS.size,
  noindexBlogTags: NOINDEX_BLOG_TAG_PATHS.size,
  noindexBlogPagination: NOINDEX_BLOG_PAGINATION.size,
  total:
    STATIC_EXCLUDES.size +
    LEGACY_CNC_PREFIX_EXCLUDES.length +
    NOINDEX_BLOG_PATHS.size +
    NOINDEX_GLOSSARY_PATHS.size +
    NOINDEX_COMPARISON_PATHS.size +
    NOINDEX_SUBPAGE_PATHS.size +
    NOINDEX_PRODUCT_PATHS.size +
    NOINDEX_IMPORTED_PATHS.size +
    NOINDEX_BLOG_TAG_PATHS.size +
    NOINDEX_BLOG_PAGINATION.size,
};
