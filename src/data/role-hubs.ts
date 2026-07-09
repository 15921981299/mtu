export type BuyerRoleSlug = 'engineers' | 'procurement' | 'quality';

export type RoleHubLink = {
  label: string;
  href: string;
  summary: string;
};

export type RfqPackageItem = {
  label: string;
  detail: string;
};

export type RoleHub = {
  slug: BuyerRoleSlug;
  title: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  rfqPackageTitle: string;
  rfqPackage: RfqPackageItem[];
  links: RoleHubLink[];
};

export const roleHubs: RoleHub[] = [
  {
    slug: 'engineers',
    title: 'For Engineers & Designers',
    headline: 'Specs, DFM & tolerances',
    description:
      'Technical references for drawing prep, tolerance selection, material trade-offs, and process fit — before you release an RFQ.',
    ctaLabel: 'Upload drawing for DFM review',
    ctaHref: '/contact/?source=engineer-hub',
    rfqPackageTitle: 'Engineering RFQ package',
    rfqPackage: [
      { label: 'STEP + PDF drawing', detail: '3D model plus dimensioned print with general tolerance block.' },
      { label: 'Critical callouts', detail: 'Highlight datums, fits, and surfaces that drive function — not every dimension.' },
      { label: 'Material & finish', detail: 'Alloy grade, temper, Ra/Rz, and coating spec if applicable.' },
      { label: 'Quantity & revision', detail: 'Proto qty vs production ramp, and drawing revision letter.' },
    ],
    links: [
      {
        label: 'DFM Design Guide',
        href: '/blog/cnc-machining-dfm-design-guide/',
        summary: 'Wall thickness, radii, threads, and setup minimization rules.',
      },
      {
        label: 'Tolerance Complete Guide',
        href: '/blog/cnc-machining-tolerances-complete-guide/',
        summary: 'ISO 2768, achievable CNC limits, and cost trade-offs.',
      },
      {
        label: 'Drawing Prep for RFQ',
        href: '/blog/how-to-prepare-a-drawing-for-cnc-rfq/',
        summary: 'STEP + PDF package, general tolerance block, critical callouts.',
      },
      {
        label: 'DFM Checklist',
        href: '/resources/dfm-checklist/',
        summary: 'Pre-flight checklist before sending to any shop.',
      },
      {
        label: 'Tolerance Reference',
        href: '/resources/cnc-tolerance-guide/',
        summary: 'Quick Ra/Rz and linear tolerance cheat sheet.',
      },
      {
        label: 'Process Comparisons',
        href: '/compare/',
        summary: 'Milling vs turning, 3-axis vs 5-axis, EDM vs milling.',
      },
    ],
  },
  {
    slug: 'procurement',
    title: 'For Procurement & Sourcing',
    headline: 'Audit, MOQ & supplier vetting',
    description:
      'Evaluate China CNC partners, verify certificates, compare lead times and MOQ reality, and shortlist with a scorecard — not a single unit price.',
    ctaLabel: 'Request supplier shortlist advice',
    ctaHref: '/contact/?source=procurement-hub',
    rfqPackageTitle: 'Procurement RFQ package',
    rfqPackage: [
      { label: 'Commercial terms', detail: 'Target Incoterm, payment milestone preference, and lead time window.' },
      { label: 'Audit evidence', detail: 'Request sample CMM report, material cert, and communication SLA on first quote.' },
      { label: 'Scope & alternates', detail: 'Approved material substitutes, finish options, and inspection level (standard vs CMM full layout).' },
      { label: 'Compliance path', detail: 'Link industry standard if regulated — medical, automotive PPAP, aerospace FAI, NACE, etc.' },
    ],
    links: [
      {
        label: 'Choose a China CNC Supplier',
        href: '/blog/how-to-choose-cnc-machining-supplier-china/',
        summary: '15-point vetting checklist from shop-floor experience.',
      },
      {
        label: 'Pre-Award Quality Audit',
        href: '/blog/how-to-audit-cnc-supplier-quality-before-first-order/',
        summary: 'Sample CMM report, material cert, and communication stress test.',
      },
      {
        label: 'China vs Local Supplier',
        href: '/blog/china-vs-local-cnc-machining-supplier/',
        summary: 'When offshore makes sense and how to de-risk first articles.',
      },
      {
        label: 'MOQ & Low-Volume Guide',
        href: '/blog/low-volume-cnc-machining-suppliers-no-moq/',
        summary: 'Setup costs, qty-1 pricing, and when outsourcing beats in-house.',
      },
      {
        label: 'Payment & Shipping Terms',
        href: '/terms/payment/',
        summary: 'Incoterms, payment milestones, and lead time expectations.',
      },
      {
        label: 'Case Studies',
        href: '/case-studies/',
        summary: 'Real projects with tolerances, materials, and delivery proof.',
      },
    ],
  },
  {
    slug: 'quality',
    title: 'For Quality & Compliance',
    headline: 'Inspection, certs & traceability',
    description:
      'What to verify before production release: CMM reports, EN 10204 material certs, surface finish specs, and industry-specific compliance.',
    ctaLabel: 'Ask about inspection scope',
    ctaHref: '/contact/?source=quality-hub',
    rfqPackageTitle: 'Quality RFQ package',
    rfqPackage: [
      { label: 'Inspection plan', detail: '100% critical features vs sampling — reference drawing balloons or characteristic list.' },
      { label: 'Material traceability', detail: 'EN 10204 3.1, heat-lot on PO, and PMI if sour service or aerospace.' },
      { label: 'GD&T verification', detail: 'True position, profile, or FAI forms required before production release.' },
      { label: 'Industry standard', detail: 'ISO 13485 workflow, AS9102 FAI, PPAP Level, or NACE MR0175 hardness — link to /standards/ page.' },
    ],
    links: [
      {
        label: 'PPAP Supplier Audit',
        href: '/blog/how-to-audit-cnc-supplier-for-automotive-ppap/',
        summary: '10-point pre-award checklist before automotive production PO.',
      },
      {
        label: 'PO Documentation Checklist',
        href: '/blog/cnc-purchase-order-documentation-checklist/',
        summary: 'Copy-paste PO language for CMM, material certs, and CoC.',
      },
      {
        label: 'Inspection Report Samples',
        href: '/resources/inspection-samples/',
        summary: 'Redacted CMM, material cert, FAI, and CoC layouts — structural reference before production PO.',
      },
      {
        label: 'Read Inspection Reports',
        href: '/blog/how-to-read-cnc-inspection-report/',
        summary: 'CMM layouts, instrument IDs, and what to challenge.',
      },
      {
        label: 'ISO 9001 in CNC Shops',
        href: '/blog/what-is-iso-9001-cnc-machining/',
        summary: 'What the certificate actually covers on the shop floor.',
      },
      {
        label: 'Material Certificates Guide',
        href: '/resources/material-certificates/',
        summary: 'EN 10204 3.1, heat-lot traceability, and what to request per PO.',
      },
      {
        label: 'Surface Roughness Guide',
        href: '/blog/cnc-machining-surface-roughness-guide/',
        summary: 'Ra/Rz specs, measurement method, and finish cost drivers.',
      },
      {
        label: 'Certifications Hub',
        href: '/certifications/',
        summary: 'ISO 9001 partner facilities, inspection workflow, and FAI.',
      },
      {
        label: 'Medical ISO 13485 Guide',
        href: '/blog/medical-grade-cnc-machining-iso-13485-supplier-guide/',
        summary: 'Biocompatibility, passivation, and documentation for med devices.',
      },
    ],
  },
];

export function getRoleHub(slug: string): RoleHub | undefined {
  return roleHubs.find((hub) => hub.slug === slug);
}

export function getAllRoleHubSlugs(): BuyerRoleSlug[] {
  return roleHubs.map((hub) => hub.slug);
}
