export const testimonials = [
  {
    slug: 'michael-r-automotive',
    caseStudySlug: 'automotive-steel-shaft',
    name: 'Michael R.',
    role: 'Mechanical Engineer — Automotive Tier 2, Germany',
    title: 'Consistent quality across 40+ batches',
    quote:
      'We have been ordering CNC aluminum brackets from this team since 2023. Over 40 batches, zero rejected lots. The dimensional reports that ship with every order save our incoming QC team hours. When we had an urgent design change mid-production, they turned the revised parts in 6 days.',
    avatar: '/images/client-testimonial-avatar-1.webp',
    brand: '/images/client-testimonial-logo-1.svg',
    country: 'Germany',
  },
  {
    slug: 'sarah-l-medical',
    caseStudySlug: 'medical-stainless-housing',
    name: 'Sarah L.',
    role: 'Product Designer — Medical Device Startup, USA',
    title: 'Engineer-led DFM review saved us $3,400 on the first order',
    quote:
      "Their DFM feedback on our initial design identified three changes that reduced machining cost by 34% without affecting function. As a startup, that mattered. The engineer who reviewed our drawing clearly understood what we were building, not just what we were ordering. We've been working with them ever since.",
    avatar: '/images/client-testimonial-avatar-2.webp',
    brand: '/images/client-testimonial-logo-2.svg',
    country: 'USA',
  },
  {
    slug: 'david-k-oil-gas',
    caseStudySlug: 'oil-gas-inconel-valve-body',
    name: 'David K.',
    role: 'Procurement Manager — Oil & Gas Equipment, UK',
    title: 'Material traceability you can actually trust',
    quote:
      'We require EN 10204 3.1 certificates on every order for our pressure-containing components. Every batch from Machining Supplier has arrived with complete, verifiable mill certificates. No substitutions, no excuses. The 316 stainless we ordered is the 316 stainless we got — confirmed by our own PMI testing.',
    avatar: '/images/client-testimonial-avatar-3.webp',
    brand: '/images/client-testimonial-logo-3.svg',
    country: 'UK',
  },
  {
    slug: 'james-t-robotics',
    caseStudySlug: 'robotics-aluminum-end-effector',
    name: 'James T.',
    role: 'Founder — Robotics Startup, Canada',
    title: 'From prototype to 500 units with zero delays',
    quote:
      'We iterated through 12 design revisions on our robot end-effector. Every revision was quoted within 24 hours and delivered within 10 days. When we finalized the design and ordered 500 units, the production quality matched the prototypes perfectly. Having a single supplier from prototype through production is invaluable.',
    avatar: '/images/client-testimonial-avatar-4.webp',
    brand: '/images/client-testimonial-logo-3.svg',
    country: 'Canada',
  },
] as const;

export type Testimonial = (typeof testimonials)[number];

export function getTestimonialForCaseStudy(caseStudySlug: string): Testimonial | undefined {
  return testimonials.find((item) => item.caseStudySlug === caseStudySlug);
}

export function getTestimonialBySlug(slug: string): Testimonial | undefined {
  return testimonials.find((item) => item.slug === slug);
}
