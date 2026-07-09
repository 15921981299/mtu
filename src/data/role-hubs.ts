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
    title: 'For Maintenance Engineers',
    headline: 'Model, serial number and fitment',
    description:
      'Technical references for engineers and service teams identifying MTU or diesel engine spare parts before a repair, overhaul, or urgent downtime order.',
    ctaLabel: 'Check technical fitment',
    ctaHref: '/contact/?source=engineer-hub',
    rfqPackageTitle: 'Technical parts inquiry package',
    rfqPackage: [
      { label: 'Engine model', detail: 'Full engine model, rating, application, and installed equipment when available.' },
      { label: 'Serial number', detail: 'Engine serial number and nameplate photo to verify build configuration.' },
      { label: 'Part reference', detail: 'Part number, old-part markings, manual page, or clear photos of the removed part.' },
      { label: 'Service context', detail: 'Routine service, breakdown repair, overhaul list, or planned dry-dock window.' },
    ],
    links: [
      {
        label: 'MTU Part Number Lookup',
        href: '/products/mtu-spare-parts/mtu-part-number-lookup/',
        summary: 'What to send so we can verify part numbers and reduce wrong-part risk.',
      },
      {
        label: 'MTU Engine Series Guide',
        href: '/products/mtu-spare-parts/mtu-engine-series-guide/',
        summary: 'Series coverage for MTU 183, 396, 595, 956, 1163, 2000, 4000, and 8000.',
      },
      {
        label: 'MTU Part Numbers',
        href: '/part-products/',
        summary: 'Browse concrete MTU part-number pages for sensors, gaskets, fuel, cooling, and overhaul parts.',
      },
      {
        label: 'MTU 4000 Overhaul Parts',
        href: '/products/mtu-4000-series-parts/overhaul-parts/',
        summary: 'Common categories for MTU 4000 overhaul and maintenance lists.',
      },
    ],
  },
  {
    slug: 'procurement',
    title: 'For Procurement & Sourcing',
    headline: 'Availability, replacement and delivery route',
    description:
      'Sourcing references for buyers comparing stock status, genuine/OEM options, replacement routes, packing, payment, and global delivery timing.',
    ctaLabel: 'Send parts list',
    ctaHref: '/contact/?source=procurement-hub',
    rfqPackageTitle: 'Procurement inquiry package',
    rfqPackage: [
      { label: 'Part list', detail: 'Excel list with part numbers, descriptions, quantities, and urgency by line item.' },
      { label: 'Destination', detail: 'Country, city or port, preferred shipping route, and required delivery date.' },
      { label: 'Commercial terms', detail: 'Preferred Incoterm, payment method, and whether partial shipment is acceptable.' },
      { label: 'Replacement policy', detail: 'State whether genuine only, OEM manufacturer, or verified compatible alternatives can be quoted.' },
    ],
    links: [
      {
        label: 'MTU Spare Parts',
        href: '/products/mtu-spare-parts/',
        summary: 'Core MTU spare-parts hub with series coverage and common request categories.',
      },
      {
        label: 'Genuine OEM Parts',
        href: '/capabilities/genuine-oem-parts/',
        summary: 'How we position genuine, OEM manufacturer, and compatible replacement options.',
      },
      {
        label: 'Shipping Terms',
        href: '/terms/shipping/',
        summary: 'Global express, air, and freight shipment notes for engine parts.',
      },
      {
        label: 'Contact Engine Family',
        href: '/contact/',
        summary: 'Send a part list, photos, and delivery requirements for availability confirmation.',
      },
    ],
  },
  {
    slug: 'quality',
    title: 'For Quality & Documentation',
    headline: 'Documents, photos and order confidence',
    description:
      'References for buyers who need supplier documents, packing photos, traceability notes, and clear communication before releasing a maintenance or overhaul PO.',
    ctaLabel: 'Ask about documents',
    ctaHref: '/contact/?source=quality-hub',
    rfqPackageTitle: 'Documentation inquiry package',
    rfqPackage: [
      { label: 'Required documents', detail: 'State supplier documents, CoC, packing list, invoice, photos, or shipment documents needed.' },
      { label: 'Photo requirements', detail: 'Request old-part comparison, label, packing, or dispatch photos before shipment if needed.' },
      { label: 'Criticality', detail: 'Tell us whether the part is for emergency downtime, planned overhaul, or non-critical stock replenishment.' },
      { label: 'Receiving checks', detail: 'List any internal receiving requirements so packing and labeling can be planned early.' },
    ],
    links: [
      {
        label: 'Quality Policy',
        href: '/certifications/',
        summary: 'Part-number verification, supplier document, packing, and shipment support policy.',
      },
      {
        label: 'MTU Part Number Lookup',
        href: '/products/mtu-spare-parts/mtu-part-number-lookup/',
        summary: 'Verification details that reduce wrong-part risk before purchase.',
      },
      {
        label: 'Material Certificates',
        href: '/resources/material-certificates/',
        summary: 'Legacy URL now used for available parts documentation and supplier paperwork notes.',
      },
      {
        label: 'Case Stories',
        href: '/case-studies/',
        summary: 'Anonymized examples of part checks, urgency, and global delivery coordination.',
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
