import type { AuthorSlug } from './blog-authors';

export type CaseStudyBeforeAfter = {
  metric: string;
  before: string;
  after: string;
};

export type CaseStudyCustomerQuote = {
  text: string;
  attribution: string;
  testimonialSlug?: string;
};

export type CaseStudyClientProfile = {
  description: string;
  region: string;
  scale: string;
  scenario: string;
};

export type CaseStudyNarrative = 'standard' | 'iteration' | 'turnaround';

export type CaseStudyEnrichment = {
  title: string;
  h1Title: string;
  clientProfile: CaseStudyClientProfile;
  decision: string;
  customerQuote: CaseStudyCustomerQuote;
  beforeAfter: CaseStudyBeforeAfter[];
  narrative: CaseStudyNarrative;
  documentedBy: AuthorSlug;
  datePublished: string;
  inspectionSampleHref?: string;
};

export const caseStudyDisclaimer =
  'Project narratives are anonymized composites based on real production work. Metrics reflect documented inspection and customer feedback; outcomes depend on drawing quality, material spec, and cooperation during DFM review. Customer quotes are paraphrased from RFQ and post-delivery feedback with identifying details removed.';

export const caseStudyExpectationNote =
  'Results shown assume customer-approved drawings, timely design freeze on production lots, and standard material availability. Your tolerances, finish, and volume may shift lead time and cost.';
