export const testimonials = [
  {
    slug: 'michael-r-automotive',
    caseStudySlug: 'automotive-steel-shaft',
    name: 'Michael R.',
    role: 'Maintenance Engineer — Generator Fleet, Germany',
    title: 'Correct MTU service parts across repeat orders',
    quote:
      'We send part numbers, engine serials, and photos, and their team comes back with clear availability and shipping options. The biggest value is avoiding wrong MTU parts during planned generator service.',
    avatar: '/images/client-testimonial-avatar-1.webp',
    brand: '/images/client-testimonial-logo-1.svg',
    country: 'Germany',
  },
  {
    slug: 'sarah-l-medical',
    caseStudySlug: 'medical-stainless-housing',
    name: 'Sarah L.',
    role: 'Procurement Lead — Marine Service Company, USA',
    title: 'Fast verification for urgent marine spares',
    quote:
      "For vessel downtime, the response speed matters. Engine Family checked the MTU part numbers, asked for the nameplate photo, and separated available items from longer-lead parts so we could make a practical purchase decision.",
    avatar: '/images/client-testimonial-avatar-2.webp',
    brand: '/images/client-testimonial-logo-2.svg',
    country: 'USA',
  },
  {
    slug: 'david-k-oil-gas',
    caseStudySlug: 'oil-gas-inconel-valve-body',
    name: 'David K.',
    role: 'Procurement Manager — Offshore Power Equipment, UK',
    title: 'Clear documents and packing notes',
    quote:
      'We needed sensors, gaskets, and cooling-system parts shipped together with documentation and packing confirmation. The team kept the item list traceable and confirmed each replacement option before shipment.',
    avatar: '/images/client-testimonial-avatar-3.webp',
    brand: '/images/client-testimonial-logo-3.svg',
    country: 'UK',
  },
  {
    slug: 'james-t-robotics',
    caseStudySlug: 'robotics-aluminum-end-effector',
    name: 'James T.',
    role: 'Operations Manager — Repair Workshop, Canada',
    title: 'Useful support for mixed engine part lists',
    quote:
      'Our inquiries often include MTU, Cummins, and DEUTZ items in the same list. They help us clean up part numbers, flag missing engine details, and consolidate shipment where possible.',
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
