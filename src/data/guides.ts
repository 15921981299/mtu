import type { FunnelStage } from './funnel';

/**
 * Service/selection-stage parts guides. All part lists are generated at build
 * time from the real mtu-parts records for the matching series — the copy
 * below is sourcing guidance only (no workshop procedures, no invented specs).
 */
export type PartsGuide = {
  slug: string;
  stage: FunnelStage;
  seoTitle: string;
  description: string;
  h1: string;
  /** Series names matched against part.series (exact match). */
  seriesFilter: string[];
  intro: string[];
  checklistHeading: string;
  checklist: string[];
  specNote?: string;
  seriesCatalog: { href: string; label: string };
  relatedHubs: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

export const partsGuides: PartsGuide[] = [
  {
    slug: 'mtu-2000-overhaul-parts',
    stage: 'service',
    seoTitle: 'MTU 2000 Series Overhaul Parts Guide — What to Confirm Before Ordering',
    description:
      'Planning an MTU 2000 series overhaul? Checklist of what to confirm (serial number, superseded numbers, variant) plus the gasket, piston, bearing, filter, and turbo parts we supply for 12V/16V 2000 engines.',
    h1: 'MTU 2000 Series Overhaul Parts Guide',
    seriesFilter: ['MTU 2000', 'MTU 2000/4000', 'MTU 2000 MTU 396', 'MTU 2000 MTU 4000'],
    intro: [
      'The MTU 2000 series covers 12V, 16V, and 18V variants used in marine propulsion, generator sets, rail traction, and industrial drives. Over its long production run the series has seen running changes — two engines carrying the same model badge can take different pistons, liners, gasket sets, or sensors depending on the serial number range.',
      'That is why an overhaul parts order works best when it is planned around the engine serial number rather than the model name alone. This guide lists the details worth confirming before you request prices, followed by the part groups we currently supply for the 2000 series. It is a sourcing guide, not a workshop manual — for disassembly procedures and torque values, use the official MTU documentation for your engine.',
    ],
    checklistHeading: 'Confirm these before requesting an overhaul quote',
    checklist: [
      'Full engine model as shown on the nameplate (e.g. 16V 2000 M96L, 12V 2000 P12)',
      'Engine serial number — the single most important detail for correct part selection',
      'Part numbers from the old components or previous invoices, including any superseded numbers',
      'Photos of the old part and the engine nameplate when the number is uncertain',
      'Quantity per position, destination country, and the date the vessel or plant is back in service',
      'Whether genuine, OEM, or quality aftermarket supply is acceptable for each position',
    ],
    specNote:
      'Overhaul scope varies by engine hours and application. Send your parts list or the positions you plan to replace — we verify each number against your serial range before quoting, including cases where MTU has superseded the original number.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/products/mtu-2000-series-parts/', label: 'MTU 2000 Series Parts (by engine model)' },
      { href: '/products/mtu-2000-series-parts/16v-2000-engine-parts/', label: 'MTU 16V 2000 Engine Parts' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'Where do I find the serial number on an MTU 2000 engine?',
        answer:
          'On the engine nameplate — its location is shown in the engine documentation that shipped with the unit. A clear photo of the nameplate is enough for us to work from; do not rely on the vessel or genset name.',
      },
      {
        question: 'My old part number returns nothing in your catalog. Is the part unavailable?',
        answer:
          'Not necessarily. MTU supersedes part numbers over time, and the old number may have been replaced by a current one. Send the number as printed on the part or invoice — we trace supersessions and confirm the current number before quoting.',
      },
      {
        question: 'Can you supply a full overhaul kit instead of individual positions?',
        answer:
          'Yes. Send the engine model and serial number with the scope you plan (e.g. cylinder kits, gasket set, bearings, filters) and we will quote the positions as one consolidated list with availability per line.',
      },
    ],
  },
  {
    slug: 'mtu-4000-overhaul-parts',
    stage: 'service',
    seoTitle: 'MTU 4000 Series Overhaul Parts Guide — Serial Ranges, Variants & Supplied Parts',
    description:
      'Sourcing MTU 4000 series overhaul parts? What to confirm for 12V/16V/20V 4000 engines (including R03/R04 variants) plus the gaskets, bearings, fuel system, filter, and sensor parts we supply by serial number.',
    h1: 'MTU 4000 Series Overhaul Parts Guide',
    seriesFilter: ['MTU 4000', 'MTU 2000/4000', 'MTU 2000 MTU 4000', 'MTU 396 MTU 4000', 'MTU 4000 MTU 8000'],
    intro: [
      'The MTU 4000 series — 12V, 16V, and 20V variants — is the current workhorse for marine propulsion, locomotives, generator sets, and oil-and-gas service. Within the series there are important sub-variants (including the R03 and R04 generations) and serial-number-dependent component changes, particularly in the fuel system, sensors, and sealing components.',
      'This guide covers what to confirm before ordering overhaul parts for a 4000-series engine and lists the part groups we supply. It is a sourcing guide, not a workshop manual — for procedures and tightening values, use the official MTU documentation for your specific engine variant.',
    ],
    checklistHeading: 'Confirm these before requesting an overhaul quote',
    checklist: [
      'Full engine model and variant (e.g. 16V 4000 M53R, 12V 4000 R04) from the nameplate',
      'Engine serial number — fuel system and sensor parts especially are serial-dependent',
      'Part numbers from old components or service invoices, including superseded numbers',
      'Photos of the old part and nameplate when markings are worn',
      'Quantity, destination, and required-by date for downtime planning',
      'Genuine, OEM, or quality aftermarket preference per position',
    ],
    specNote:
      'For gas-engine variants (e.g. L64) and marine-classed units, tell us the application as well — some positions differ between propulsion, genset, and gas configurations even within the same variant.',
    seriesCatalog: { href: '/part-products/catalog/mtu-4000-series/', label: 'MTU 4000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/products/mtu-4000-series-parts/', label: 'MTU 4000 Series Parts (by engine model)' },
      { href: '/products/mtu-4000-series-parts/12v-4000-engine-parts/', label: 'MTU 12V 4000 Engine Parts' },
      { href: '/products/mtu-4000-series-parts/16v-4000-engine-parts/', label: 'MTU 16V 4000 Engine Parts' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'Do R03 and R04 engines use the same overhaul parts?',
        answer:
          'Many positions interchange, but not all — fuel system, sensor, and some sealing parts differ between generations. Send the full model designation and serial number and we will flag any position where the variant changes the part number.',
      },
      {
        question: 'Can you match a parts list from our maintenance software or previous supplier?',
        answer:
          'Yes. Send the list as Excel, CSV, or PDF through the inquiry form. We verify each line against your engine details, mark superseded numbers, and return availability per line.',
      },
      {
        question: 'How fast can overhaul parts ship for a vessel in dry dock?',
        answer:
          'Mark the inquiry as a downtime order with your required-by date. We prioritize availability checks for dated orders and will tell you per line what can meet the date before you commit.',
      },
    ],
  },
  {
    slug: 'mtu-396-series-parts',
    stage: 'selection',
    seoTitle: 'MTU 396 Series Parts Guide — Variants, Identification & Parts We Supply',
    description:
      'Identify your MTU 396 engine (8V/12V/16V, TE/TB/TC designations) and find the parts we supply: gaskets, pistons and liners, bearings, fuel system, filters, and sensors — verified by serial number.',
    h1: 'MTU 396 Series Parts Guide',
    seriesFilter: ['MTU 396', 'MTU 956 MTU 1163 MTU 396', 'MTU 396 MTU 4000', 'MTU 396 MTU 595', 'MTU 2000 MTU 396', 'MTU 396 MTU 493', 'MTU 396 MTU 538'],
    intro: [
      'The MTU 396 family spans 8V, 12V, and 16V variants with TE, TB, and TC designations, serving marine propulsion, commercial craft, generator sets, and rail applications. Many of these engines have been in service for decades, which makes correct identification essential: components changed across production runs, and the variant suffix and serial range determine which part number fits.',
      'We do not publish workshop specifications — for dimensions, torque values, and procedures, the official MTU documentation for your engine is the authoritative source. What this guide provides is identification guidance and the part groups we supply for the 396 series, verified against your engine details before quoting.',
    ],
    checklistHeading: 'Identify your engine before ordering',
    checklist: [
      'Variant designation on the nameplate (e.g. 12V 396 TE94, 16V 396 TB94, 16V 396 TC13)',
      'Engine serial number — decisive for gasket sets, liners, and fuel system parts',
      'Application (propulsion, genset, rail, auxiliary) — some positions differ by application',
      'Old part numbers from components or invoices, including superseded numbers',
      'Photos of the old part and nameplate when markings are unclear',
    ],
    specNote:
      'The 396 shares supplier ecosystems with the 956/1163 families in some positions. If your number cross-references another MTU series, our cross-reference index may already map it — otherwise send it and we trace it manually.',
    seriesCatalog: { href: '/part-products/catalog/mtu-396-series/', label: 'MTU 396 Series Parts Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-956-series/', label: 'MTU 956 Series Parts Catalog' },
      { href: '/part-products/catalog/mtu-1163-series/', label: 'MTU 1163 Series Parts Catalog' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'What do the TE, TB, and TC suffixes mean for parts ordering?',
        answer:
          'They identify the engine variant within the 396 family, and variant affects which components fit — especially in the fuel, cooling, and turbocharging groups. Always include the full designation with the suffix when inquiring.',
      },
      {
        question: 'Our 396 came out of a long-serving fleet and the numbers are worn. Can you still identify parts?',
        answer:
          'Yes. These engines often carry operator-specific stock markings alongside the MTU number. Send whatever numbers you have — the MTU part number, the operator stock number, or a photo of the part — and we work from there.',
      },
      {
        question: 'Do you publish MTU 396 technical specifications?',
        answer:
          'No. Specifications belong to the official MTU documentation for your engine. We focus on identifying and supplying the correct parts against your variant and serial number.',
      },
    ],
  },
];

export function getPartsGuide(slug: string) {
  return partsGuides.find((guide) => guide.slug === slug);
}
