import type { BlogIntent } from './blog';

/** Six-stage B2B inquiry funnel (article stages 1–6 mapped to site page types). */
export type FunnelStage =
  | 'awareness'
  | 'comparison'
  | 'selection'
  | 'quote'
  | 'signing'
  | 'service';

export type BlogPostLike = {
  slug: string;
  title: string;
  intent?: BlogIntent;
  tags?: readonly string[];
};

const comparisonSlugPattern = /-vs-|-versus-/;
const selectionSlugPattern =
  /^(how-to-choose|best-|top-|guide-to-)/;
const selectionTitlePattern = /\b(best|how to choose|top \d+|which .+ (?:for|to choose))\b/i;

export function getPostFunnelStage(post: BlogPostLike): FunnelStage {
  if (comparisonSlugPattern.test(post.slug) || /\bvs\.?\b/i.test(post.title)) {
    return 'comparison';
  }
  if (
    selectionSlugPattern.test(post.slug) ||
    selectionTitlePattern.test(post.title) ||
    post.intent === 'commercial'
  ) {
    return 'selection';
  }
  return 'awareness';
}

export type FunnelCtaConfig = {
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  primaryEvent: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryEvent?: string;
};

export const funnelCtaByStage: Record<FunnelStage, FunnelCtaConfig> = {
  awareness: {
    title: 'Have a Real Part to Source?',
    text: 'Send a drawing-ready RFQ for engineer-led parts verification within 24 hours - or use our checklist first if the specification is not ready.',
    primaryLabel: 'Request a Quote',
    primaryHref: '/contact/?source=blog',
    primaryEvent: 'rfq_cta_click',
    secondaryLabel: 'Inquiry Checklist',
    secondaryHref: '/resources/dfm-checklist/',
    secondaryEvent: 'resource_download',
  },
  comparison: {
    title: 'Need a Supplier Who Will Challenge the Drawing?',
    text: 'Send your part number - we recommend the right process, material, or finish, and we will push back when a requirement adds cost without function.',
    primaryLabel: 'Request Engineering Review',
    primaryHref: '/contact/?source=comparison',
    primaryEvent: 'consultation_request',
    secondaryLabel: 'View Comparison Hub',
    secondaryHref: '/compare/',
    secondaryEvent: 'comparison_hub_view',
  },
  selection: {
    title: 'Bring Us a Serious RFQ',
    text: 'Tell us your industry, material, tolerance, and quantity - we respond with an parts quote when the project is technically and commercially clear.',
    primaryLabel: 'Submit Qualified RFQ',
    primaryHref: '/contact/?source=selection',
    primaryEvent: 'selection_consult_request',
    secondaryLabel: 'Browse Case Studies',
    secondaryHref: '/case-studies/',
    secondaryEvent: 'case_study_hub_view',
  },
  quote: {
    title: 'Ready for a Professional Quote?',
    text: 'Send your engine details for parts verification and pricing. We prioritize clear specs, serious buyers, and projects where quality matters.',
    primaryLabel: 'Request a Quote',
    primaryHref: '/contact/',
    primaryEvent: 'rfq_cta_click',
  },
  signing: {
    title: 'Ready to Move Like a Professional Buyer?',
    text: 'Review our quality scope, payment terms, and shipping options - then request a sample or production quote with the documentation your team expects.',
    primaryLabel: 'Request Qualified Sample Quote',
    primaryHref: '/contact/?source=case-study',
    primaryEvent: 'sample_request',
    secondaryLabel: 'Payment & Shipping Terms',
    secondaryHref: '/terms/payment/',
    secondaryEvent: 'terms_view',
  },
  service: {
    title: 'Drawing Ready? Send a Qualified RFQ',
    text: 'Send your part number for engineer-led parts verification feedback - or review inspection report samples before deciding whether we are the right supplier.',
    primaryLabel: 'Request a Quote',
    primaryHref: '/contact/?source=resource',
    primaryEvent: 'rfq_cta_click',
    secondaryLabel: 'Inspection Report Samples',
    secondaryHref: '/resources/inspection-samples/',
    secondaryEvent: 'inspection_samples_view',
  },
};

/** GA4 event name per funnel stage (page-view tracking). */
export const funnelViewEventByStage: Record<FunnelStage, string> = {
  awareness: 'blog_view',
  comparison: 'comparison_page_view',
  selection: 'selection_guide_view',
  quote: 'rfq_form_view',
  signing: 'case_study_view',
  service: 'resource_view',
};
