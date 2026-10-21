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
      'Planning an MTU 2000 overhaul? What to confirm before quoting — serial number, superseded numbers, variant — plus the parts we supply.',
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
      'Sourcing MTU 4000 overhaul parts? What to confirm for 12V/16V/20V engines, including R03/R04 variants, plus the groups we supply.',
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
      'Identify your MTU 396 (8V/12V/16V, TE/TB/TC) and find the gaskets, pistons, liners, bearings, fuel, filter and sensor parts we supply.',
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
  {
    slug: 'mtu-16v-2000-parts',
    stage: 'selection',
    seoTitle: 'MTU 16V 2000 Engine Parts Guide — M84, M86, M96 Variant Identification',
    description:
      'Parts for an MTU 16V 2000: what the M84/M86/M94/M96L variant and build digits change, what to send, and the groups we supply.',
    h1: 'MTU 16V 2000 Engine Parts Guide',
    seriesFilter: ['MTU 2000', 'MTU 2000/4000', 'MTU 2000 MTU 396', 'MTU 2000 MTU 4000'],
    intro: [
      'The 16V 2000 is the sixteen-cylinder member of the MTU Series 2000 family, used in yacht and workboat propulsion, ferries, patrol craft, and generator sets. Within the family the model code carries three things that matter for parts: the application letter (M for marine, G for generator), the subgroup digit, and the build digit. An M84, an M86, and an M96L can share most of the rotating assembly while taking different injectors, sensors, turbocharger variants, or sealing groups depending on the build.',
      'Two engines with the same badge on the flywheel housing can therefore take different parts. The engine serial number — not the model code alone — decides which number fits. This guide covers what to confirm for a 16V 2000 before ordering, and lists the part groups we currently supply across the Series 2000 family. It is a sourcing guide, not a workshop manual; procedures and settings come from the official MTU documentation for your engine.',
    ],
    checklistHeading: 'Confirm these for a 16V 2000 parts order',
    checklist: [
      'Full model code from the data plate, including suffix (e.g. 16V 2000 M86, 16V 2000 M96L)',
      'Engine serial number — the decisive reference for injector, sensor, and turbocharger numbers',
      'Whether the engine is propulsion, genset, or auxiliary — some positions differ by application',
      'Part numbers from old components or invoices, including any superseded numbers',
      'Photos of the nameplate and old part when the marking is worn',
      'Quantity per position, destination, and the date the vessel or plant is back in service',
      'Whether genuine, OEM, or quality aftermarket supply is acceptable per position',
    ],
    specNote:
      'For 16V 2000 engines used in yachts and fast craft, fuel-system and turbocharger positions are the most serial-sensitive groups. If your engine is down, mark the inquiry as urgent with your required-by date and we report availability per line before you commit.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/engine-models/', label: 'Parts Lists by Engine Model' },
      { href: '/part-products/catalog/mtu-injectors/', label: 'MTU Injectors Catalog' },
      { href: '/guides/mtu-injector-part-numbers/', label: 'MTU Injector Part Number Identification Guide' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Part Numbers (X, XP, EX)' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'Is the M86 a marine-only variant?',
        answer:
          'The M application letter indicates marine use. Generator-set versions of the sixteen-cylinder 2000 carry a G letter instead. Send the full model code from the data plate — never the vessel or genset name — because auxiliary configurations can take different positions even within the same family.',
      },
      {
        question: 'Which parts are most often wrong on a 16V 2000 order?',
        answer:
          'Injectors, turbocharger cartridges, sensors, and some sealing groups. These positions carry build-dependent numbers, so the engine serial number is the only safe reference. We verify each number against your serial range before quoting rather than assuming the model badge is enough.',
      },
      {
        question: 'My engine plate reads 16V 2000 M96L. What does the L mean?',
        answer:
          'The L suffix indicates an increased-rating build. It usually changes the power rating rather than the basic architecture, but rating-dependent components — injectors, turbochargers, some cooling parts — can differ. Include the suffix in full when you inquire.',
      },
      {
        question: 'Can you quote a full 16V 2000 parts list from a maintenance schedule?',
        answer:
          'Yes. Send the list as Excel, CSV, or PDF with the engine serial number. We check each line against your serial range, flag superseded numbers, and return availability per line before you commit to an order.',
      },
    ],
  },
  {
    slug: 'mtu-injector-part-numbers',
    stage: 'selection',
    seoTitle: 'MTU Injector Part Number Identification Guide — Reading, Prefixes & Reman Options',
    description:
      'How to read an MTU injector number: X/XP/EX prefixes, reman versus new, core terms, and what to send so the right number is confirmed.',
    h1: 'MTU Injector Part Number Identification Guide',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 2000/4000', 'MTU 2000 MTU 4000'],
    intro: [
      'Injectors are the highest-value, most serial-sensitive parts on an MTU engine, and the part number alone does not tell the whole story. The same physical injector can appear under several numbers: a new-unit number, an exchange (remanufactured) number with an X, XP, or EX prefix, and a core number for the unit you send back. Two suppliers quoting "the same injector" can be quoting different things — one a new unit, one an exchange unit, one a third-party reman.',
      'This guide explains how to read what is on your injector, what the prefixes mean, and what information we need to confirm the correct number and supply condition for your engine. The parts table below shows catalogued injector and fuel-system records across the Series 2000 and 4000 families we supply; your specific number is confirmed against the engine serial number before quoting.',
    ],
    checklistHeading: 'What to collect before requesting an injector quote',
    checklist: [
      'The complete number stamped or labelled on the injector — including any X, XP, or EX prefix',
      'Engine model and serial number — injector numbers are serial-range dependent',
      'Whether the unit must be new, genuine exchange (reman), or whether aftermarket is acceptable',
      'Quantity per cylinder position, and whether all positions are being replaced together',
      'Application and duty (propulsion, genset, rail) — affects the required condition and test evidence',
      'Whether you can return the old units (core return) — this changes both price and lead time',
      'Destination and required-by date for downtime planning',
    ],
    specNote:
      'When a customer sends a number with an EX prefix, we quote the genuine exchange route and state the core terms explicitly. When the requirement is a new unit, we quote new. If your end user accepts aftermarket injectors, say so in the inquiry — it is a different tier and we will quote it separately rather than mixing it into the genuine line.',
    seriesCatalog: { href: '/part-products/catalog/mtu-injectors/', label: 'MTU Injectors Catalog' },
    relatedHubs: [
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Part Numbers (X, XP, EX)' },
      { href: '/guides/mtu-parts-grades/', label: 'Genuine, OEM, Reman or Aftermarket: Parts Grades Explained' },
      { href: '/guides/mtu-16v-2000-parts/', label: 'MTU 16V 2000 Engine Parts Guide' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'What does the EX prefix on an MTU part number mean?',
        answer:
          'EX marks a genuine exchange / remanufactured unit supplied through the manufacturer exchange program: you receive a factory-remanufactured unit and return your old unit as the core. X and XP prefixes are used for related exchange numbering. The exchange unit carries the same functional warranty as new in the manufacturer program, but it is a different supply condition — and a different price — from a new unit.',
      },
      {
        question: 'My injector number has no prefix. Is it new or reman?',
        answer:
          'A plain number with no X, XP, or EX prefix is normally quoted as new. Because markings are sometimes incomplete, we confirm the supply condition in writing on the quote rather than assuming from the number alone.',
      },
      {
        question: 'Are aftermarket MTU injectors available?',
        answer:
          'For many Series 2000 and 4000 positions, third-party and remanufactured injectors exist at significantly lower cost. We quote them as a separate, clearly labelled line — never mixed into a genuine quote — and only supply them when the buyer confirms in writing that non-genuine parts are acceptable for the application.',
      },
      {
        question: 'Do you need the old injector back?',
        answer:
          'For genuine exchange (EX) quotations, core return terms apply and the core deposit is credited when the old unit is returned in acceptable condition. For new-unit quotations there is no core. We state which terms apply on every quote so there is no ambiguity at order stage.',
      },
      {
        question: 'The number stamped on the injector is unreadable. Can you still identify it?',
        answer:
          'Send clear photos of the injector body, any remaining label, the solenoid or connector end, and the engine data plate. Combined with the engine serial number, that is usually enough to identify the position — we confirm the number before quoting rather than guessing.',
      },
    ],
  },
  {
    slug: 'mtu-exchange-reman-parts',
    stage: 'awareness',
    seoTitle: 'MTU Exchange & Reman Parts Explained — X, XP, EX Prefixes, Core Deposit & Lead Time',
    description:
      'MTU exchange and reman parts: how X/XP/EX prefixes work, core deposit and return terms, and why exchange units often ship faster.',
    h1: 'MTU Exchange & Reman Parts Explained',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 2000/4000', 'MTU 2000 MTU 4000'],
    intro: [
      'MTU part numbers with an X, XP, or EX prefix belong to the exchange (remanufactured) system rather than the new-parts system. An exchange unit is a factory-remanufactured component: you buy the exchange unit, pay a core deposit, and return your worn original unit. If the core passes inspection, the deposit is credited. The process exists because high-value components — injectors, turbochargers, fuel pumps, some valve and pump assemblies — are expensive to manufacture new and expensive to keep in stock everywhere at once.',
      'The exchange route matters commercially for two reasons. First, the exchange price is materially below the new price for the same functional part. Second — and this is the part buyers most often miss — exchange stock usually exists closer to the end user than new stock, because returned cores feed the regional pool. That is why an exchange quotation can carry a shorter lead time than the same part quoted new. The table below lists catalogued parts across the Series 2000 and 4000 families where exchange routes are most commonly requested.',
    ],
    checklistHeading: 'What to confirm when an exchange quote is on the table',
    checklist: [
      'Whether the number on your requirement carries an X, XP, or EX prefix — and whether you actually need that route',
      'Whether you can return the old unit, its condition, and where it ships from',
      'The core deposit amount and the credit terms if the core passes inspection',
      'Whether a swing or loaner unit is available if your engine cannot wait for the core turnaround',
      'Whether the end user or class authority accepts remanufactured units for this position',
      'The warranty attached to the exchange unit and who honours it in your region',
    ],
    specNote:
      'A new-unit quote and an exchange quote for the same position are not comparable line items: different price, different lead time, different core obligations. When a requirement reaches us with an EX prefix, we quote the exchange route and state the core terms; when it arrives as a plain number, we quote new — and mention the exchange option separately if one exists.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/guides/mtu-injector-part-numbers/', label: 'MTU Injector Part Number Identification Guide' },
      { href: '/guides/mtu-parts-grades/', label: 'Genuine, OEM, Reman or Aftermarket: Parts Grades Explained' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
      { href: '/part-products/catalog/mtu-4000-series/', label: 'MTU 4000 Series Parts Catalog' },
    ],
    faqs: [
      {
        question: 'Is an exchange (reman) unit the same quality as new?',
        answer:
          'A genuine exchange unit is remanufactured to the manufacturer standard and carries the program warranty for the position. It is not a second-hand part. Where an end user or class requirement specifies new-only, that must be stated at inquiry stage so the quote reflects it.',
      },
      {
        question: 'Why would an exchange unit arrive faster than a new one?',
        answer:
          'Exchange pools are replenished by returned cores, so remanufactured units are often already sitting in regional stock while a new unit still has to be manufactured or shipped from the factory. The lead time difference can be weeks, which is why downtime orders should always ask for both routes.',
      },
      {
        question: 'What happens if my old unit fails the core inspection?',
        answer:
          'The core deposit is not credited and the core may be returned at your cost or scrapped, depending on the program terms. We state the core-acceptance conditions on the quote before you order, so the exposure is known in advance.',
      },
      {
        question: 'Can I buy an exchange unit without returning a core?',
        answer:
          'Some programs allow the core obligation to be settled separately, but it is the exception rather than the rule. Ask for the exchange quote with core terms stated — we quote it that way by default so the total cost of the route is visible.',
      },
      {
        question: 'Do exchange routes exist for every MTU part?',
        answer:
          'No. Exchange programs concentrate on high-value assemblies such as injectors, turbochargers, pumps, and some electronic or valve assemblies. Seals, filters, gaskets, and fasteners are new-supply items. If a position has no exchange route, we say so rather than implying one exists.',
      },
    ],
  },
  {
    slug: 'mtu-parts-grades',
    stage: 'comparison',
    seoTitle: 'MTU Parts Grades Explained — Genuine, OEM, Reman vs Aftermarket: How to Compare Quotes',
    description:
      'Genuine new, genuine exchange, OEM-quality or aftermarket: what each MTU parts grade is, and how to compare quotes that are not alike.',
    h1: 'MTU Parts Grades Explained: Genuine, OEM, Reman vs Aftermarket',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 2000/4000', 'MTU 2000 MTU 4000'],
    intro: [
      'Most "my supplier is cheaper" conversations in the MTU parts trade are not really about price — they are about grade. A quote for a genuine new injector, a quote for a genuine exchange injector, and a quote for a third-party injector are three different products at three different price levels, and a buyer comparing only the totals is comparing nothing. The gap between the top and bottom tier for the same position can be several times over, which is exactly why the tier has to be named on every line.',
      'This guide sets out the four grades that appear on MTU parts quotations, what each one actually is, and what to ask before deciding. It applies across the Series 2000 and 4000 families shown in the parts table below, and to any MTU engine where a high-value position is being re-quoted.',
    ],
    checklistHeading: 'Ask these before comparing two quotes',
    checklist: [
      'Which grade is each line: genuine new, genuine exchange (reman), OEM-quality, or aftermarket?',
      'Is the part number identical on both quotes, or has one supplier substituted a different number?',
      'What warranty applies to each line, and who honours it in your region?',
      'What documentation comes with the shipment (test reports, material certs, packing list)?',
      'Are the Incoterms the same — ex-works versus delivered changes the comparison completely',
      'For exchange lines: what are the core deposit and core-return terms?',
      'For aftermarket lines: has the end user accepted non-genuine parts in writing?',
    ],
    specNote:
      'We quote each grade as a separate, labelled line and never present an unconfirmed substitution as a direct equivalent. When a position has no genuine stock inside the customer\'s deadline, we say which grades can meet it and let the buyer choose with the trade-off visible.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Part Numbers (X, XP, EX)' },
      { href: '/guides/mtu-injector-part-numbers/', label: 'MTU Injector Part Number Identification Guide' },
      { href: '/certifications/', label: 'Quality & Certifications' },
      { href: '/how-to-source-mtu-parts/', label: 'Dealer or Independent Supplier' },
    ],
    faqs: [
      {
        question: 'What is the difference between "genuine" and "OEM" on a parts quote?',
        answer:
          'Genuine means supplied through the engine manufacturer\'s own channel — new from the factory or a factory exchange unit. OEM-quality (also written OEM-replacement) means made to the manufacturer\'s specifications by a third party, without passing through the manufacturer\'s distribution. Function and fit are the design intent; the channel, documentation, and warranty path differ.',
      },
      {
        question: 'Is aftermarket ever the right choice?',
        answer:
          'For wear items and positions where the application tolerates it, aftermarket supply is a legitimate cost decision and the tier is mature. For precision fuel-system components on high-value marine engines, it is a risk decision as much as a cost decision — which is why we require written acceptance before quoting that tier for those positions.',
      },
      {
        question: 'Why is the exchange price so much lower than new?',
        answer:
          'The exchange unit reuses the core\'s main structure after factory remanufacture, so the material and machining content is far lower than a new unit. The buyer returns the old unit, which is what makes the lower price possible.',
      },
      {
        question: 'How should I compare an ex-works quote with a delivered quote?',
        answer:
          'Convert both to the same basis before comparing: add freight, insurance, duties, and any core-return shipping to get a delivered cost per line. An ex-works price that looks lower can be higher once the destination costs are added — we quote both terms so the comparison is on the same basis.',
      },
      {
        question: 'Can you quote two grades for the same position?',
        answer:
          'Yes, and for high-value positions we usually do: the quote shows each grade as its own line with its own price, lead time, and terms. That keeps the decision with the buyer instead of hiding it inside a single number.',
      },
    ],
  },

  // ── Diagnosis-stage guides ─────────────────────────────────────────────
  // These pages answer the question a fleet engineer or chief engineer asks
  // before any parts are ordered: what does this symptom usually point to,
  // what should be measured or recorded, and which positions are actually
  // involved. They deliberately do not publish intervals, settings, or
  // tightening values — see "What the Guides Do Not Replace" on /guides/.

  {
    slug: 'mtu-4000-high-fuel-consumption',
    stage: 'awareness',
    seoTitle: 'MTU 4000 Series High Fuel Consumption — Where an Investigation Starts',
    description:
      'Rising fuel consumption on a MTU 4000: the systems an investigation works through, the readings that separate them, and the parts involved.',
    h1: 'MTU 4000 Series High Fuel Consumption: Where an Investigation Starts',
    seriesFilter: ['MTU 4000', 'MTU 2000 MTU 4000', 'MTU 396 MTU 4000'],
    intro: [
      'Fuel consumption is a whole-engine measurement, and a drift of a few percent is often the first visible sign of something mechanical rather than a fuel problem at all. On a 4000-series engine the investigation usually works outward from the air side and the fuel side, because those are the two systems that directly change how much fuel is injected for a given load.',
      'This guide is written for the person deciding what to check before spending money. It sets out the systems that commonly sit behind a rising consumption figure, the readings that help separate them, and the part groups involved. It is not a diagnostic manual — settings, limits, and procedures belong in the official maintenance documentation for your specific engine, and a rising figure that changes quickly should be treated as a fault report, not a maintenance item.',
    ],
    checklistHeading: 'What to record before chasing a fuel figure',
    checklist: [
      'A consumption baseline taken under the same duty and load, not a single trip figure',
      'Air-filter restriction reading, and whether the filter has been changed on hours or on indicator',
      'Charge-air path condition: hoses, clamps, and any visible oil in the charge-air ducting',
      'Whether the figure moved gradually (wear) or suddenly (a specific failure)',
      'Fuel actually delivered quality: grade, temperature, water content, and any interval change',
      'Exhaust colour under load — black, blue, and clean load-up each point at a different system',
      'Any recent maintenance that touched the air, boost, or fuel path',
    ],
    specNote:
      'A fuel-consumption complaint usually ends with more than one part number: a restriction indicator that was ignored, a charge-air hose that had lost a clamp, and injectors that then drifted beyond specification. When you send us the findings, we match each position to a number and confirm fitment against your serial range.',
    seriesCatalog: { href: '/part-products/catalog/mtu-4000-series/', label: 'MTU 4000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-4000-fuel-system-parts/', label: 'MTU 4000 Fuel System Parts' },
      { href: '/part-products/catalog/mtu-injectors/', label: 'MTU Injectors Catalog' },
      { href: '/part-products/catalog/mtu-4000-turbocharging-parts/', label: 'MTU 4000 Turbocharger Parts' },
      { href: '/guides/mtu-2000-overhaul-parts/', label: 'MTU 2000 Overhaul Parts Guide' },
    ],
    faqs: [
      {
        question: 'Could high fuel consumption just be the air filter?',
        answer:
          'It is one of the first things to rule out, because it is cheap and measurable — but a saturated filter typically produces a broad power and smoke change as well, and correcting it may not restore the consumption figure on its own. Work the system list in the guide rather than assuming the first item is the cause.',
      },
      {
        question: 'Can you diagnose this from a photo of the engine?',
        answer:
          'No. We are a parts desk, not a service engineer on site. What we can do is take the findings your engineer produces — restriction readings, test reports, measured values — and turn them into the correct part numbers with availability and lead time per line.',
      },
      {
        question: 'Which parts are usually involved when the cause is the fuel side?',
        answer:
          'Injectors most often, then high-pressure fuel components, and sometimes sensors that report load and temperature into the control. Injector numbers are serial-range dependent, so the engine serial number is what closes the question — not the model badge.',
      },
      {
        question: 'Is a new injector set cheaper than fixing the cause?',
        answer:
          'Replacing injectors before the air or boost side has been cleared is one of the more expensive orders in this trade, because the new units inherit the same fault and the consumption figure stays. We quote injectors readily, but we will say so if the investigation summary suggests a cheaper position first.',
      },
    ],
  },
  {
    slug: 'mtu-2000-engine-overheating',
    stage: 'awareness',
    seoTitle: 'MTU 2000 Series Engine Overheating — Systems to Check and Parts Involved',
    description:
      'MTU 2000 running hot? Work the cooling circuit in order — coolant, thermostat, pump, heat exchanger — with the readings that separate them.',
    h1: 'MTU 2000 Series Engine Overheating: Systems to Check and Parts Involved',
    seriesFilter: ['MTU 2000', 'MTU 2000 MTU 4000', 'MTU 2000/4000'],
    intro: [
      'An engine that runs hot is telling you the heat is not leaving the block as fast as it is being produced. On a 2000-series engine the heat path is short enough that the cause is usually one of a small number of items: coolant that cannot carry heat because of level, condition, or trapped gas; a thermostat that is not opening as it should; a pump or impeller that has lost delivery; or a heat exchanger or raw-water circuit that has lost ability to reject it.',
      'The order in which these are checked matters, because two of them produce nearly identical symptoms and one of them is far cheaper to test than the other. This guide lists the circuit in the sequence an investigation usually follows, with the readings that separate the candidates, and the cooling parts we supply for the 2000 family. It does not replace the manufacturer\'s fault-finding documentation for your engine.',
    ],
    checklistHeading: 'Work through the cooling circuit in this order',
    checklist: [
      'Coolant level and condition at the expansion tank, then pressure-test for trapped gas or a slow leak',
      'Thermostat: opening behaviour and the temperature at which flow actually starts',
      'Coolant pump and impeller delivery, plus belt or drive condition where fitted',
      'Heat exchanger and oil cooler for fouling, scaling, or internal leakage between circuits',
      'Raw-water path: inlet, strainer, hose condition, and seawater pump impeller wear',
      'Temperature sensor and gauge accuracy — confirm the reading before condemning a component',
      'Whether the engine reached temperature quickly or has been running progressively hotter over months',
    ],
    specNote:
      'The cheapest test in this list is the last one, and skipping it is what makes cooling complaints expensive. A sensor reading high, an unbled circuit, and a seawater strainer half-blocked will each present as "the engine overheats" — and only one of them needs a new part.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-2000-cooling-system-parts/', label: 'MTU 2000 Cooling System Parts' },
      { href: '/part-products/catalog/mtu-cooling-system/', label: 'MTU Cooling System Parts Catalog' },
      { href: '/engine-models/', label: 'Parts Lists by Engine Model' },
      { href: '/guides/mtu-2000-overhaul-parts/', label: 'MTU 2000 Overhaul Parts Guide' },
    ],
    faqs: [
      {
        question: 'Is overheating always a cooling-system part?',
        answer:
          'No. Over-fuelling, an exhaust restriction, and a late injection all raise heat without changing the cooling circuit at all. A cooling system that is behaving correctly under test shifts the investigation to the combustion and exhaust side.',
      },
      {
        question: 'Can I fit any thermostat in the range?',
        answer:
          'No. The opening temperature is engine-specific and build-dependent, and fitting one from a different rating changes the whole operating temperature. Give us the engine model and serial number and we will confirm the correct number before quoting.',
      },
      {
        question: 'My engine has pressurized coolant in the expansion tank. What is the cheapest first check?',
        answer:
          'A pressure test of the closed circuit. It finds the trapped-gas and slow-leak cases without opening anything, and those are the causes most often confused with a failed thermostat.',
      },
      {
        question: 'Do you supply seawater pumps and impellers for the 2000 series?',
        answer:
          'Yes — seawater pumps, impellers, coolant pumps, thermostats, and the associated housing and flange parts are all in the 2000-series cooling group. Send the engine serial number with the positions you need and we confirm which variant applies.',
      },
    ],
  },
  {
    slug: 'mtu-396-marine-engine-blue-smoke',
    stage: 'awareness',
    seoTitle: 'MTU 396 Marine Engine Blue Smoke — Oil Combustion Causes and Parts',
    description:
      'Blue smoke from a MTU 396 means oil is burning. The three routes oil takes into the cylinder, what to record, and the parts involved.',
    h1: 'MTU 396 Marine Engine Blue Smoke: When Oil Is Burning',
    seriesFilter: ['MTU 396', 'MTU 956 MTU 1163 MTU 396'],
    intro: [
      'Blue smoke is oil. On a 396 that has been in service for years, the question is not usually whether oil is entering the combustion space, but which of three routes it is taking: past the piston rings and liners, down the valve guides and stem seals, or through the turbocharger centre housing after an internal seal or bearing failure. Each route produces a different smoke behaviour and a different oil-consumption pattern.',
      'Colour is a useful first discriminator — blue points at oil, black at fuel, white at coolant — but it is not a diagnosis. This guide sets out the three oil routes, what each one does to the smoke under load and to consumption, and the parts we supply for the 396 family when the investigation narrows to a position. It is a sourcing guide, not a workshop manual; disassembly, measurement, and acceptable limits come from your engine\'s documentation.',
    ],
    checklistHeading: 'What to record before the engine is opened',
    checklist: [
      'When the smoke appears: at start-up, at steady load, on load change, or continuously',
      'Oil consumption over a fixed number of hours, logged against similar duty',
      'Whether the charge-air path and intercooler show oil — this separates the turbocharger route from the internal routes',
      'Spark-plug or indicator evidence from each cylinder bank, where the engine has been instrumented',
      'Whether white smoke appears as well — coolant and oil burning together changes the urgency completely',
      'Engine hours and any previous top-end work, including liner honing or rebore history',
    ],
    specNote:
      'On an older 396 the most expensive mistake in this list is replacing a turbocharger to fix an internal oil route, or conversely blaming internal wear on a failed turbocharger. The charge-air oil check that separates them takes minutes; the components sit in completely different price groups.',
    seriesCatalog: { href: '/part-products/catalog/mtu-396-series/', label: 'MTU 396 Series Parts Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-396-pistons-and-liners-parts/', label: 'MTU 396 Pistons, Liners and Rings' },
      { href: '/part-products/catalog/mtu-396-turbocharging-parts/', label: 'MTU 396 Turbocharger Parts' },
      { href: '/engine-models/mtu-12v-396-tb94-to-te94-parts/', label: 'MTU 12V 396 TB94 to TE94 Parts List' },
      { href: '/guides/mtu-turbocharger-failure-symptoms/', label: 'MTU Turbocharger Failure Symptoms Guide' },
    ],
    faqs: [
      {
        question: 'Is blue smoke on an MTU 396 always an expensive repair?',
        answer:
          'No. If oil is found on the charge-air side of the turbocharger, the fault usually sits with the turbocharger and its oil lines rather than with the rotating assembly — a different order of magnitude from internal wear. The check that separates them is the one to do first.',
      },
      {
        question: 'Can liners and rings be replaced without a full overhaul?',
        answer:
          'Scope is a decision for the workshop holding the engine, not for a parts desk. What we do is quote the positions you list, itemized, with grade and availability per line — so a limited scope does not force you to buy a kit you will not use.',
      },
      {
        question: 'Do you supply valve stem seals and guides for the 396?',
        answer:
          'Valve-train components — seals, guides, seats, valves, springs, and retainers — are in the 396 valve-train group. Send the engine model and serial number and we confirm which variant applies to your build before quoting.',
      },
      {
        question: 'The smoke is worse after a long idle. What does that suggest?',
        answer:
          'A pattern that appears after idle and clears under load is often consistent with oil finding its way past valve seals rather than past rings under combustion pressure. It is an indication, not a diagnosis — record it with the rest of the pattern and pass it to whoever is doing the investigation.',
      },
    ],
  },
  {
    slug: 'mtu-turbocharger-failure-symptoms',
    stage: 'awareness',
    seoTitle: 'MTU Turbocharger Failure Symptoms — Boost, Smoke, Oil and What to Check',
    description:
      'Turbocharger symptoms on a MTU — lost boost, oil in charge air, whine, rising oil use — plus the causes to clear before ordering a unit.',
    h1: 'MTU Turbocharger Failure Symptoms: Power, Smoke, Oil and Noise',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 396', 'MTU 2000 MTU 4000'],
    intro: [
      'A turbocharger rarely fails without a cause, and in the majority of MTU cases the cause is one of four things: oil that did not arrive (blocked, incorrect, or wrong-grade oil supply), oil that arrived dirty, a foreign object that came through the intake, or debris released from the exhaust side after a valve or component broke elsewhere in the engine. The turbocharger is usually the component that reports the fault, not the one that created it.',
      'That matters commercially, because replacing the unit without clearing the cause produces the same failure on the new unit — and a repeat failure on a replacement is usually excluded from warranty. This guide lists the symptoms, the causes behind them, and the checks worth completing before the replacement unit is ordered.',
    ],
    checklistHeading: 'Check these before the replacement unit is ordered',
    checklist: [
      'Where the oil is going: is oil showing in the charge-air ducting or at the intercooler?',
      'The oil supply line and its strainer — a restricted supply line is a late failure waiting to happen on the new unit',
      'The air intake path upstream of the compressor: filter, hose debris, and anything that could have been ingested',
      'Boost behaviour against the engine documentation: does the engine reach rated boost, and does it hold it?',
      'Exhaust side: any sign of a failed valve, injector, or component that could have shed debris',
      'Shaft play and blade contact evidence on the old unit, recorded before it is shipped away',
    ],
    specNote:
      'A repeat failure is not covered where the cause was not cleared. Photograph the old unit, the oil line, and the intake path before anything is removed — that record is what settles a warranty discussion later, and it is also what lets us quote the right cartridge or assembly rather than the whole unit.',
    seriesCatalog: { href: '/part-products/catalog/mtu-turbocharger-parts/', label: 'MTU Turbocharger Parts Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-2000-turbocharging-parts/', label: 'MTU 2000 Turbocharger Parts' },
      { href: '/part-products/catalog/mtu-4000-turbocharging-parts/', label: 'MTU 4000 Turbocharger Parts' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Parts (Core Deposit Explained)' },
      { href: '/guides/mtu-396-marine-engine-blue-smoke/', label: 'MTU 396 Blue Smoke: When Oil Is Burning' },
    ],
    faqs: [
      {
        question: 'How do I know if the turbocharger or the sensor is at fault?',
        answer:
          'A boost-system fault and a sensor fault can both present as low power. The difference is measured, not judged: compare actual boost pressure against the value your engine documentation expects at the same load and fuel setting. If the measurement is good and the reported value is not, the fault is on the sensing side.',
      },
      {
        question: 'Should I buy the complete turbocharger or just the cartridge?',
        answer:
          'That depends on which assembly failed and what your workshop is willing to do. Photograph the old unit and send us the complete number; we will confirm whether a cartridge route exists for that position and quote both where the choice is open.',
      },
      {
        question: 'Will an exchange turbocharger ship faster than a new one?',
        answer:
          'Often yes — exchange units are replenished from returned cores and are frequently already in regional stock. Ask for both routes on a dated order; the quote will show price, lead time, and core terms separately so you are not comparing unlike items.',
      },
      {
        question: 'Is a whistling sound always a turbocharger failure?',
        answer:
          'No. A whistling or whooshing sound is usually a boost-side air leak, which can be a hose, a clamp, or an intercooler joint rather than the turbocharger itself. A grinding or high-pitched metallic sound is the one to treat as urgent, because it indicates contact inside the unit.',
      },
    ],
  },
  {
    slug: 'mtu-engine-high-oil-consumption',
    stage: 'awareness',
    seoTitle: 'MTU Engine High Oil Consumption — How to Measure It and What to Check',
    description:
      'How to measure oil consumption properly, which routes oil takes out of an MTU engine, and when it becomes a parts decision.',
    h1: 'MTU Engine High Oil Consumption: Measuring It Before Fixing It',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 396', 'MTU 1163', 'MTU 956', 'MTU 538'],
    intro: [
      'Oil consumption only becomes actionable once it has been measured against something. The commonest reason a consumption complaint escalates is that the figure being chased was never recorded consistently: a top-up added on a different day, under a different load, at a different ambient temperature, compared against an estimate from months earlier. A simple logged baseline settles most of these complaints without opening a single part.',
      'Once a real trend is established, the question becomes which route the oil is taking — past the rings and liners, down the valve guides, through the turbocharger, or leaving the engine externally. This guide sets out the measurement method, what each route does to the smoke pattern and to consumption, and the part groups involved. It is not a workshop manual: limits and procedures come from your engine\'s documentation.',
    ],
    checklistHeading: 'Establish the measurement before ordering parts',
    checklist: [
      'A logged baseline: oil added over a fixed number of hours under comparable load, recorded daily',
      'Where the oil is going: check for external leaks before assuming combustion',
      'Smoke pattern under load: at start-up, at steady load, and on load change',
      'Oil present in the charge-air ducting or intercooler — this points at the turbocharger route',
      'Exhaust colour alongside any coolant loss — oil and coolant together change the scope',
      'Crankcase pressure evidence, which separates internal blow-by from a restricted breather path',
      'Engine hours and overhaul history, including any liner, ring, or valve work already done',
    ],
    specNote:
      'A restricted breather path and an external leak both present as "high oil consumption" and both are cheaper than anything inside the engine. Clear those two before the internal investigation starts — it is the difference between a hose and a head.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/guides/mtu-396-marine-engine-blue-smoke/', label: 'MTU 396 Blue Smoke: When Oil Is Burning' },
      { href: '/guides/mtu-turbocharger-failure-symptoms/', label: 'MTU Turbocharger Failure Symptoms' },
      { href: '/part-products/catalog/mtu-gasket-kits/', label: 'MTU Gaskets and Seal Kits' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'How much oil consumption is normal?',
        answer:
          'The acceptable figure for your engine is a specification, and specifications come from the manufacturer\'s documentation for your specific model — not from a parts desk. We do not publish consumption limits, because quoting a figure from the wrong build is exactly how a complaint gets argued rather than resolved.',
      },
      {
        question: 'Can I send you my consumption log and get a diagnosis?',
        answer:
          'We can tell you which positions the pattern is consistent with, and we will be explicit that this is an indication rather than a diagnosis. What we do reliably is turn your confirmed findings into the correct part numbers, itemized, with availability per line.',
      },
      {
        question: 'Is replacing the valve stem seals a cheaper fix than a full internal overhaul?',
        answer:
          'It can be, and it is a workshop scope decision rather than a parts decision. What we do is quote each position you list separately, so a limited scope does not require buying a complete kit you will not fit.',
      },
      {
        question: 'Do you supply pistons, liners, and rings for all these series?',
        answer:
          'The catalogues cover piston, liner, and ring positions across the 2000, 4000, 396, 956, 1163, 538, and 183 families. Send the engine model and serial number with the positions and we confirm which variant applies to your build.',
      },
    ],
  },

  {
    slug: 'mtu-4000-injector-replacement',
    stage: 'service',
    seoTitle: 'MTU 4000 Injector Replacement — What to Prepare Before the Engine Is Opened',
    description:
      'Replacing MTU 4000 injectors: what to settle before the work starts — numbers, supply route, core terms, matched sets — and what to request.',
    h1: 'MTU 4000 Injector Replacement: Preparing the Order',
    seriesFilter: ['MTU 4000', 'MTU 396 MTU 4000', 'MTU 2000 MTU 4000'],
    intro: [
      'Injector replacement on a 4000-series engine is usually decided quickly and ordered badly. The engine is smoking, or a test shows a drifting delivery, and the order goes out for twelve positions on the strength of the model badge. On this family the injector number is serial-range dependent, and an order placed from the badge alone is the single most common reason a replacement set has to be exchanged before it is ever fitted.',
      'The second half of the problem is commercial rather than technical: new units and genuine exchange units are different products with different prices, lead times, and core obligations, and a workshop holding a dock date needs to know which route actually lands in time. This guide covers what to settle before the work starts. It deliberately does not describe the removal or fitting procedure — that belongs in the manufacturer\'s documentation for your engine, and a procedure copied from a different build is worse than none.',
    ],
    checklistHeading: 'Settle these before the injectors are ordered',
    checklist: [
      'Complete injector number from the units fitted, plus the engine model code and serial number',
      'Whether the requirement is a single position, a bank, or all cylinders — and whether your documentation requires a matched set',
      'Supply route: new, genuine exchange (EX), or aftermarket where the end user has accepted it in writing',
      'Core terms and the core deposit, if the exchange route is chosen',
      'Test or flow documentation the end user or class authority requires with the delivery',
      'Whether the fuel system is being cleaned or flushed at the same time, which changes the list',
      'Required-by date, and whether the engine is currently out of service',
    ],
    specNote:
      'Send the old units back in the packaging the new ones arrive in, and record the numbers from the units you removed rather than from the invoice. A mismatch between the number ordered and the number fitted is far easier to settle before the parts leave the workshop than after.',
    seriesCatalog: { href: '/part-products/catalog/mtu-4000-fuel-system-parts/', label: 'MTU 4000 Fuel System Parts' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-injectors/', label: 'MTU Injectors Catalog' },
      { href: '/guides/mtu-injector-part-numbers/', label: 'MTU Injector Part Number Identification Guide' },
      { href: '/guides/mtu-4000-high-fuel-consumption/', label: 'MTU 4000 High Fuel Consumption' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Parts (Core Deposit Explained)' },
    ],
    faqs: [
      {
        question: 'Can I order injectors from the engine model alone?',
        answer:
          'Not safely on the 4000 family. The model code narrows the family, but the injector number is serial-range dependent, and two engines with the same badge can take different numbers. Send the serial number with the order and the number is confirmed before the parts ship.',
      },
      {
        question: 'Should all cylinders be replaced together?',
        answer:
          'That is a workshop and owner decision, not a parts decision. If your engine documentation or the class requirement specifies a matched set, say so in the inquiry and we quote accordingly. If a single position is being replaced, we quote the single position with grade and availability shown.',
      },
      {
        question: 'Do you describe the fitting procedure?',
        answer:
          'No. Removal and fitting procedures, tightening values, and cleanliness requirements come from the manufacturer\'s documentation for your specific engine. We supply the parts and the supply-condition documentation; we do not publish procedures that a workshop might follow instead of its own manual.',
      },
      {
        question: 'What happens if the old units cannot be returned as cores?',
        answer:
          'On the exchange route the core deposit is not credited, and the core may be returned at your cost or scrapped under the program terms. We state the core-acceptance conditions on the quote before you order, so the exposure is known rather than discovered afterwards.',
      },
    ],
  },

  // ── Specification-query guides ────────────────────────────────────────
  // These target searches for intervals and torque values. The answer this
  // site gives is honest and still useful: those values are engine-specific
  // and belong in the manufacturer's documentation, but a buyer searching
  // for them is about to order parts, so the page covers what to confirm
  // and the positions involved.

  {
    slug: 'mtu-2000-valve-clearance',
    stage: 'service',
    seoTitle: 'MTU 2000 Series Valve Clearance — Why We Do Not Publish Values, and What to Order',
    description:
      'Why we do not publish MTU 2000 valve clearance values, where the correct figure comes from, and how to confirm parts by serial number.',
    h1: 'MTU 2000 Series Valve Clearance: Values, Sources, and What to Order',
    seriesFilter: ['MTU 2000', 'MTU 2000 MTU 4000', 'MTU 2000/4000'],
    intro: [
      'Valve clearance is one of the settings buyers most often ask us for, and one we deliberately do not publish. The clearance required on a 2000-series engine is specific to the model, the build, and in some cases the rating — a value quoted from a different build is not a conservative approximation, it is simply wrong. Fitting components to the wrong specification is a well-documented route to a repeat failure inside the first interval after the work.',
      'The correct values come from the operating and maintenance documentation for your specific engine, and the workshop holding the engine should set them against that source. What we do is make sure the components you then order are the right ones for that build: valve-train parts are among the most serial-dependent groups in the whole catalogue.',
    ],
    checklistHeading: 'Confirm these before ordering valve-train parts',
    checklist: [
      'Full engine model code and serial number — valve components vary by build, not just by series',
      'Which positions are being replaced: valves only, guides and seals only, or the full train',
      'Measured condition of the existing components, and any workshop repair history',
      'Intake versus exhaust position where the part number differs between them',
      'Whether a cylinder head is being reworked at the same time, which changes the list',
      'Application and duty — propulsion, genset, and auxiliary builds are not interchangeable here',
    ],
    specNote:
      'When the clearance or settings are the reason components are being replaced, send the workshop\'s findings as well. It is the difference between quoting a single valve and quoting the right group of parts, and it avoids a second order arriving after the first one has been fitted.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-valve-train-parts/', label: 'MTU 2000 Valve Train Parts' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-valve-train/', label: 'MTU Valve Train Parts Catalog' },
      { href: '/guides/mtu-2000-overhaul-parts/', label: 'MTU 2000 Overhaul Parts Guide' },
      { href: '/guides/mtu-cylinder-head-replacement/', label: 'MTU Cylinder Head: What to Confirm Before Ordering' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'Where do I find the correct valve clearance for my 2000 engine?',
        answer:
          'In the operating and maintenance documentation supplied for that specific engine. If the original documents are not available, the manufacturer\'s documentation for your model and serial range is the authoritative source. We will not publish a figure here, because a value quoted from the wrong build is worse than no value.',
      },
      {
        question: 'Can you identify a valve from a photo or a measurement?',
        answer:
          'Send the number stamped on the component first — that is usually enough. Where it is unreadable, clear photos of the valve head, stem end, and any collet groove, together with the engine serial number, normally let us identify the position.',
      },
      {
        question: 'Do you supply the complete valve-train set or individual positions?',
        answer:
          'Both. Send the workshop\'s list and we quote each position with grade and availability per line, so a limited scope does not require a complete set.',
      },
      {
        question: 'Are intake and exhaust valves interchangeable?',
        answer:
          'Not generally, and the difference is not always obvious from the outside. Always specify the position with the inquiry — intake and exhaust are quoted and supplied as separate positions.',
      },
    ],
  },
  {
    slug: 'mtu-cylinder-head-replacement',
    stage: 'service',
    seoTitle: 'MTU Cylinder Head Replacement — What to Confirm Before Ordering (No Torque Values)',
    description:
      'Ordering an MTU cylinder head: complete number, bare or assembled, exchange route, test documents — and why we publish no torque values.',
    h1: 'MTU Cylinder Head Replacement: What to Confirm Before Ordering',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 396', 'MTU 1163', 'MTU 956'],
    intro: [
      'A cylinder head order is where specification discipline matters most, because the component is expensive, the variants are close together, and the shipment is often needed against a hard downtime date. Three things are worth settling before the purchase order: exactly which head the engine takes, whether it is being supplied bare or assembled, and what documentation and testing the end user or class authority requires with it.',
      'We do not publish bolt torque or tightening-sequence values. Those are engine- and build-specific settings, and quoting them outside the manufacturer\'s documentation would be publishing a number that a workshop might follow instead of its own manual. What this guide does cover is the list of confirmations that make the head order correct on the first attempt.',
    ],
    checklistHeading: 'Confirm these before the head is ordered',
    checklist: [
      'Complete head part number from the old unit, and the engine model and serial number',
      'Whether the head is required bare or assembled, and if assembled, which valve-train positions are included',
      'Whether an exchange route exists for that position, and its core terms',
      'Pressure-test or leak-test documentation required by the end user or class authority',
      'Head gasket set, bolts, and any one-time-use items — quoted separately, not assumed included',
      'Cylinder position, because heads are not always interchangeable across a bank',
      'Destination and required-by date, and the downtime the engine is actually working to',
    ],
    specNote:
      'One-time-use items are the most common omission on a head order: bolts and gaskets that must not be reused are frequently assumed to be in the box. We quote them as separate lines so the workshop has a complete scope before the engine is opened.',
    seriesCatalog: { href: '/part-products/catalog/mtu-cylinder-heads/', label: 'MTU Cylinder Heads Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-gasket-kits/', label: 'MTU Gaskets and Seal Kits' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Parts (Core Deposit Explained)' },
      { href: '/certifications/', label: 'Quality & Certifications' },
      { href: '/how-to-source-mtu-parts/', label: 'Dealer or Independent Supplier' },
    ],
    faqs: [
      {
        question: 'Do you publish cylinder head bolt torque values?',
        answer:
          'No. Bolt torque and tightening sequence are engine- and build-specific and are set out in the manufacturer\'s documentation for your engine. Publishing them here would risk a workshop following a figure taken from a different build, so we keep them out and put the effort into getting the component and the consumables right.',
      },
      {
        question: 'How do I know if my head can be supplied on exchange?',
        answer:
          'Exchange routes exist for head positions on many MTU families, but not all. Send the complete number and the engine serial number and we will tell you whether an exchange route exists, what the core terms are, and what the lead time looks like against new supply.',
      },
      {
        question: 'Will a new head come with the valves fitted?',
        answer:
          'That depends on the head and the supplier. Some are supplied assembled and tested, others bare. State the requirement in the inquiry and we will confirm the supplied condition on the quote, so the workshop is not discovering it on arrival.',
      },
      {
        question: 'Can you supply just one head for a bank?',
        answer:
          'Yes, where the engine takes an individual head per cylinder. Give us the cylinder position with the number — positions are not always interchangeable across the bank, and the position is part of the identification.',
      },
    ],
  },
  {
    slug: 'mtu-4000-overhaul-interval',
    stage: 'awareness',
    seoTitle: 'MTU 4000 Series Overhaul Interval — What Actually Drives It, and How to Plan',
    description:
      'There is no single MTU 4000 overhaul interval. What actually drives it, and how to plan the long-lead positions before the engine is open.',
    h1: 'MTU 4000 Series Overhaul Interval: What Drives It and How to Plan',
    seriesFilter: ['MTU 4000', 'MTU 396 MTU 4000', 'MTU 2000 MTU 4000'],
    intro: [
      'There is no universal MTU 4000 overhaul interval, and any site that publishes one for the series is publishing a marketing number. What exists is a maintenance schedule in the engine\'s own documentation, expressed in hours and conditions, and then a set of real-world modifiers that move the actual date: the load factor the engine has been running at, the quality and interval discipline of the oil and fuel, the operating environment, and what the oil analysis and physical measurements show.',
      'That is why two 4000-series engines with the same hour count can be in completely different condition. For a buyer, the useful question is not "when is my overhaul due" but "which positions am I likely to need, and which of them have lead times long enough to plan around now". This guide covers the factors and the planning side.',
    ],
    checklistHeading: 'What to settle before the overhaul date is fixed',
    checklist: [
      'Oil analysis trend over the last several samples — the single most useful predictor available',
      'Load factor and duty history: continuous rated load versus intermittency and standby running',
      'Fuel and lubricant quality, filtration intervals, and whether they have been kept to schedule',
      'Operating environment: marine salt and humidity, dust, temperature, and idling time',
      'Measured condition data the workshop has already taken: compression, blow-by, clearances',
      'Which positions are long-lead (high-value assemblies) versus short-lead (seals, filters, fasteners)',
    ],
    specNote:
      'The planning mistake that costs the most is not ordering the wrong part — it is leaving the long-lead positions until the engine is open. Start the availability check on high-value assemblies first, then build the consumable list around whatever the workshop finds.',
    seriesCatalog: { href: '/part-products/catalog/mtu-4000-series/', label: 'MTU 4000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/guides/mtu-4000-overhaul-parts/', label: 'MTU 4000 Overhaul Parts Guide' },
      { href: '/guides/mtu-2000-overhaul-kit-parts-list/', label: 'Building a 2000 Series Overhaul Parts List' },
      { href: '/downloads/mtu-4000-overhaul-rfq.xlsx', label: 'MTU 4000 Overhaul RFQ Worksheet' },
      { href: '/products/mtu-4000-series-parts/', label: 'MTU 4000 Series Parts (by engine model)' },
    ],
    faqs: [
      {
        question: 'What is the overhaul interval for an MTU 4000 engine?',
        answer:
          'There is no single figure for the series, and we will not publish one. The schedule is defined in the documentation for your specific engine, expressed against operating conditions, and then modified by how the engine has actually been run. Oil analysis and measured condition are what settle the timing in practice.',
      },
      {
        question: 'Can you send me a complete overhaul kit list for my engine?',
        answer:
          'We can quote a list you provide, and we can build a reference worksheet that itemizes the groups an overhaul usually touches — but we will not send an unqualified "complete kit", because what your engine needs depends on its serial range, hours, and measured condition.',
      },
      {
        question: 'Which positions should I check availability on first?',
        answer:
          'High-value assemblies: turbochargers, injectors, pumps, and heads. These carry the longest lead times and the most variant sensitivity. Filters, gaskets, seals, and fasteners follow once the scope is confirmed.',
      },
      {
        question: 'Does a marine propulsion engine overhaul differently from a genset unit?',
        answer:
          'Yes. Duty cycle, load factor, and environment differ enough that the same hour count produces different wear patterns. Tell us the application with the inquiry, because some positions differ between propulsion, generator, and auxiliary configurations even within one variant.',
      },
    ],
  },

  // ── Selection-stage guides ────────────────────────────────────────────

  {
    slug: 'mtu-2000-overhaul-kit-parts-list',
    stage: 'service',
    seoTitle: 'MTU 2000 Series Overhaul Parts List — Groups, Scope and How to Build One',
    description:
      'How to build a MTU 2000 overhaul parts list: the core groups always replaced, the positions that depend on measurement, and what to send.',
    h1: 'MTU 2000 Series Overhaul Parts List: Building the Scope',
    seriesFilter: ['MTU 2000', 'MTU 2000 MTU 4000', 'MTU 2000 MTU 396', 'MTU 2000/4000'],
    intro: [
      'A 2000-series overhaul parts list is not one purchase — it is a core list that is always replaced plus a set of positions that only get added once the engine has been measured. The core list is predictable: gaskets and seal sets, pistons, liners and rings, bearings, and the wear items around them. The variable list covers whatever the measurements turn up: valve components, injectors, turbocharger condition, sensors that have been disturbed, and anything that has been superseded since the last overhaul.',
      'The value of separating the two is commercial. Order only the core list and you will almost certainly place a second order mid-job; order everything including the maybes and you will hold inventory you never fitted. This guide sets out the groups, marks which are scope-dependent, and lists the catalogued 2000-series positions we supply. The parts table is generated from live catalog records — no invented entries.',
    ],
    checklistHeading: 'Split the list into core and measured positions',
    checklist: [
      'Core: gaskets and seal sets, pistons, liners, rings, and main and big-end bearings',
      'Core: service items replaced during the job — filters, coolant hoses, belts, and fasteners disturbed',
      'Measured: valve-train components, quoted after the workshop reports condition',
      'Measured: injectors and fuel-system positions, quoted against serial range and test evidence',
      'Measured: turbocharger condition — cartridge, assembly, or leave in service, decided on inspection',
      'Consumables that must not be reused: one-time-use bolts, seals, and gaskets listed explicitly',
      'Sensors disturbed during disassembly, priced as a line rather than assumed reusable',
    ],
    specNote:
      'Send the engine serial number with the core list and we return it with variant confirmation, grade per line, and availability. The measured positions can then be added as findings come in, against the same serial range, without re-checking the whole order.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/guides/mtu-2000-overhaul-parts/', label: 'MTU 2000 Overhaul Parts Guide' },
      { href: '/downloads/mtu-2000-overhaul-rfq.xlsx', label: 'MTU 2000 Overhaul RFQ Worksheet' },
      { href: '/part-products/catalog/mtu-gasket-kits/', label: 'MTU Gaskets and Seal Kits' },
      { href: '/part-products/catalog/mtu-pistons-liners/', label: 'MTU Pistons, Liners and Rings Catalog' },
    ],
    faqs: [
      {
        question: 'Do you sell a complete MTU 2000 overhaul kit?',
        answer:
          'We can quote a complete set for a specific engine and scope, but we do not sell a generic "2000 overhaul kit" — the contents depend on the variant, the serial range, and what the workshop finds. That is also why our quotes arrive itemized rather than as one bundled number.',
      },
      {
        question: 'What is usually missing from a parts list that comes from a previous supplier?',
        answer:
          'Consumables that must not be reused — one-time bolts, seals, and disturbed sensors — and superseded numbers that were carried forward unchanged. Both are cheap to catch at quote stage and expensive to discover during reassembly.',
      },
      {
        question: 'Can I add positions to an existing quote?',
        answer:
          'Yes. Send the additional positions against the same engine serial number and we extend the same quotation, so the availability picture stays consistent across one order rather than splitting into two.',
      },
      {
        question: 'How far ahead should the long-lead positions be ordered?',
        answer:
          'Start the availability check on high-value assemblies before the engine is open. Seals, filters, and fasteners follow the scope and can be quoted quickly once the findings arrive.',
      },
    ],
  },
  {
    slug: 'mtu-2000-vs-4000',
    stage: 'comparison',
    seoTitle: 'MTU Series 2000 vs 4000 — How the Families Differ and Why Parts Are Not Interchangeable',
    description:
      'MTU Series 2000 vs 4000: how the families differ, which positions overlap, and why fitment still needs the engine serial number.',
    h1: 'MTU Series 2000 vs 4000: Differences, Overlaps, and Parts',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 2000/4000', 'MTU 2000 MTU 4000'],
    intro: [
      'Series 2000 and Series 4000 are two different engine families, not two ratings of the same design. The 2000 series is the compact high-speed family — smaller cylinder counts, widely used in propulsion, gensets, and lighter industrial and rail duty. The 4000 series sits above it in output and physical size, with configurations built for heavier commercial marine, locomotive, and continuous industrial duty.',
      'The parts question is more useful than the specification question, because it is where money gets lost: a surprising number of buyers assume that because two engines are both MTU, the same filter, sensor, or seal must fit. Occasionally a position does overlap — and that overlap is exactly why the number still has to be checked. What never works is inferring fitment from the series name.',
    ],
    checklistHeading: 'How to keep a 2000 and a 4000 order separate',
    checklist: [
      'Never quote one order across both families without the engine serial number on every line',
      'Check any apparently shared position at number level rather than assuming it is common',
      'Watch the supersession chains — a family-wide number change can look like an overlap',
      'Where an engine is described as "2000/4000" in your own records, treat that as a prompt, not a fitment',
      'Confirm application separately: propulsion, genset, and rail builds differ within a family too',
      'Keep the two families on separate quotation lines even when the parts look identical',
    ],
    specNote:
      'Catalogue entries that appear under both families in our own records are grouped at number level, not inferred from the family. If your documentation shows a position cited for both a 2000 and a 4000 engine, send both numbers and the serial ranges and we will confirm what actually applies to each.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-4000-series/', label: 'MTU 4000 Series Parts Catalog' },
      { href: '/guides/mtu-16v-2000-parts/', label: 'MTU 16V 2000 Engine Parts Guide' },
      { href: '/engine-models/', label: 'Parts Lists by Engine Model' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
    ],
    faqs: [
      {
        question: 'Do any parts fit both a 2000 and a 4000 engine?',
        answer:
          'A small number of positions do appear in both families, which is precisely why an assumption from the series name is unsafe in both directions. The number level is the only reliable reference, and the serial number is what confirms it for your engine.',
      },
      {
        question: 'Which series is more expensive to maintain per hour?',
        answer:
          'That depends on the engine, duty, and labour rates rather than the family. We do not publish running-cost comparisons, because any figure we gave would be an average across engines we have not seen.',
      },
      {
        question: 'My engine is badged 2000 but the parts list says 4000. Which is right?',
        answer:
          'Send the complete number from the engine data plate and the serial number. Badges on vessels, gensets, and switchboards are frequently wrong or carry a previous engine designation, and the data plate is the only reliable reference.',
      },
      {
        question: 'Can you quote a mixed order for engines from both families?',
        answer:
          'Yes, and it is common for fleets that run both. We simply keep the families on separate lines with the serial range shown per line, so availability and variant confirmation stay clear.',
      },
    ],
  },
  {
    slug: 'mtu-oil-filter-part-number-lookup',
    stage: 'selection',
    seoTitle: 'MTU Oil Filter Part Number Lookup — How to Find and Confirm the Right One',
    description:
      'Find the right MTU oil filter number: from the unit, by engine model, or through the filters catalog — and what confirms the variant.',
    h1: 'MTU Oil Filter Part Number Lookup',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 396', 'MTU 1163', 'MTU 956', 'MTU 538', 'MTU 595', 'MTU 183'],
    intro: [
      'An oil filter looks like the simplest part on the engine and is one of the most commonly mis-ordered. The same filter body shape can be supplied with different media, different sealing arrangements, and different valve configurations between builds, and a spin-on unit and its element equivalent are two different numbers for what looks like one job. The engine serial number closes the question.',
      'There are three practical ways to find the number, and they are worth using in this order: the number stamped or labelled on the filter you removed; the engine model code, worked through our parts list for that model; and the filters catalog group, browsed with your part number in hand to confirm the variant. All three paths are linked below.',
    ],
    checklistHeading: 'Confirm these before ordering a filter',
    checklist: [
      'The complete number on the filter or its label — copy the suffix as well as the digits',
      'Spin-on unit or replaceable element, because these are separate numbers',
      'Engine model code and serial number, even when you already have a number',
      'Whether the filter is oil, fuel, or air — the group changes the variant question',
      'Whether it is a standard service filter or a water-separating / fuel coalescer type',
      'Quantity per engine and whether the service kit is being ordered at the same time',
    ],
    specNote:
      'When a filter number arrives without an engine serial number, we confirm the variant before quoting rather than assuming. It adds a short exchange of messages and removes the most common wasted shipment in the whole catalogue.',
    seriesCatalog: { href: '/part-products/catalog/mtu-filters/', label: 'MTU Filters Catalog' },
    relatedHubs: [
      { href: '/part-products/', label: 'MTU Part Number Catalog (search)' },
      { href: '/engine-models/', label: 'Parts Lists by Engine Model' },
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
      { href: '/part-products/catalog/mtu-2000-filters-parts/', label: 'MTU 2000 Filters' },
    ],
    faqs: [
      {
        question: 'Can I look up an MTU oil filter by engine model alone?',
        answer:
          'You can narrow it that way, and our engine-model pages list every catalogued filter for each model code. Where the list shows more than one candidate, the serial number and the filter markings decide which one applies — that is why we ask for both.',
      },
      {
        question: 'Are spin-on and element filters interchangeable?',
        answer:
          'They are different part numbers and often different materials and sealing arrangements. Only the manufacturer\'s documentation for your engine establishes whether a substitute is permitted for that position, and we will not assert it from a catalogue comparison.',
      },
      {
        question: 'The number on my filter does not exist in your catalogue.',
        answer:
          'Send it as it appears. The number has probably been superseded, or it is an exchange (X, XP, EX) number rather than a new-supply number. Both are traceable, and the cross-reference index plus our manual check usually resolves it.',
      },
      {
        question: 'Do you supply service kits that include several filters?',
        answer:
          'We can quote a multi-line service list with each filter as its own position, which keeps the grade and availability visible per line. Send the engine serial number with the positions and we will confirm the variants that apply.',
      },
    ],
  },
  {
    slug: 'mtu-cross-reference-verification',
    stage: 'comparison',
    seoTitle: 'How to Verify an MTU Part Number Cross-Reference Before Ordering',
    description:
      'How to verify an MTU cross-reference before ordering: supersession or OEM equivalent, what documents to ask for, and when to walk away.',
    h1: 'How to Verify an MTU Part Number Cross-Reference Before Ordering',
    seriesFilter: ['MTU 2000', 'MTU 4000', 'MTU 396', 'MTU 1163', 'MTU 956', 'MTU 538'],
    intro: [
      'A cross-reference table answers one question — which number replaced or corresponded to which — and it is one of the most useful and most misused tools in the parts trade. The row that says one number equals another is only as good as the verification behind it: some rows are manufacturer supersessions, some are OEM equivalences quoted by a third party, and some are simply a supplier\'s assumption repeated often enough to look authoritative.',
      'This matters because the cost of a wrong cross-reference is not the part — it is the downtime while the wrong part is returned. This guide sets out what to confirm before ordering against a cross-reference row, and what to ask for when the pair you need is not listed anywhere.',
    ],
    checklistHeading: 'Confirm these before ordering against a cross-reference row',
    checklist: [
      'What kind of relationship the row represents: supersession, OEM equivalence, exchange number, or third-party',
      'Whether the row has been verified against catalog history rather than inferred from a similar number',
      'Whether any related positions change with the substitution — mating parts often move together',
      'What documentation comes with the shipment: packing list, part number on the label, origin',
      'Whether the end user or class authority accepts a substituted number for that position',
      'What the return position is if the substitute does not fit the engine as expected',
    ],
    specNote:
      'Our own cross-reference index is a starting point, not an authority. It is built from catalog history and we check each requested pair against your engine serial number before quoting. Where a pair is not listed, we say so rather than offering the nearest-looking number.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-series/', label: 'MTU 2000 Series Parts Catalog' },
    relatedHubs: [
      { href: '/cross-reference/', label: 'Part Number Cross Reference' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Parts (X, XP, EX)' },
      { href: '/guides/mtu-parts-grades/', label: 'MTU Parts Grades Explained' },
      { href: '/guides/mtu-injector-part-numbers/', label: 'MTU Injector Part Number Identification' },
    ],
    faqs: [
      {
        question: 'What is the difference between a supersession and an OEM equivalent?',
        answer:
          'A supersession means the manufacturer replaced the number itself — the old number is withdrawn and the new one is the correct supply for that position. An OEM equivalent means a different manufacturer\'s part is offered as a functional match for the original, without passing through the original channel. They are different claims and carry different warranty positions.',
      },
      {
        question: 'My cross-reference list says two MTU numbers are the same part. Are they?',
        answer:
          'Sometimes yes and sometimes the rows have been aggregated from a supplier\'s assumption. Send both numbers with the engine serial number and we will check the relationship before quoting rather than presenting a substitution as confirmed.',
      },
      {
        question: 'What if my number is not in your cross-reference at all?',
        answer:
          'Send it as it appears, with photos if the marking is worn, plus the engine model and serial number. We check manually and tell you what we find — including when we cannot establish a relationship, which is a more useful answer than a guess.',
      },
      {
        question: 'If a substitute fails, is the original supplier responsible?',
        answer:
          'That depends on the documentation supplied and the warranty terms on the quote, which is exactly why the grade and the nature of the substitution should be stated on the line before you order. We state supply condition and the basis of any substitution on every quote.',
      },
    ],
  },
  {
    slug: 'mtu-12v-4000-m93-injector-parts',
    stage: 'selection',
    seoTitle: 'MTU 12V 4000 M93 Injector Parts — Identification, Variants and Supply Routes',
    description:
      'MTU 12V 4000 M93 injectors: what the badge tells you, why numbers are serial-range dependent, and new versus genuine exchange routes.',
    h1: 'MTU 12V 4000 M93 Injector Parts: Identification and Supply Routes',
    seriesFilter: ['MTU 4000', 'MTU 2000 MTU 4000'],
    intro: [
      'The designation 12V 4000 M93 tells you two useful things before any part number is confirmed: it is a V12 engine from the Series 4000 family, and the M letter marks a marine application designation. What it does not tell you is which injector fits, because injector numbers in the 4000 family vary by build and serial range as well as by variant. Two engines carrying the same M93 badge can take different injector numbers.',
      'This is also the position where the supply route matters most commercially. A new unit and a genuine exchange unit for the same position are different products at different prices with different lead times and core obligations, and a quotation that does not name the route is not comparable with one that does. The list below is the catalogued fuel-system group for the Series 4000 family we supply.',
    ],
    checklistHeading: 'What to send for an injector number confirmation',
    checklist: [
      'Engine model code exactly as it appears on the data plate, including any suffix',
      'Engine serial number — the decisive reference for the injector number',
      'The complete number stamped or labelled on the injector already fitted, if readable',
      'Required supply route: new, genuine exchange (EX), or whether aftermarket is acceptable',
      'Whether all twelve positions are being replaced together or a single position',
      'Whether the old units can be returned as cores, and from where',
      'Any test or flow documentation the end user requires with the shipment',
    ],
    specNote:
      'For downtime orders we quote the new route and the exchange route side by side, with lead time and core terms on each, so the decision is made on the actual constraint rather than on the cheaper headline number.',
    seriesCatalog: { href: '/part-products/catalog/mtu-injectors/', label: 'MTU Injectors Catalog' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-4000-fuel-system-parts/', label: 'MTU 4000 Fuel System Parts' },
      { href: '/guides/mtu-injector-part-numbers/', label: 'MTU Injector Part Number Identification Guide' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Parts (Core Deposit Explained)' },
      { href: '/engine-models/', label: 'Parts Lists by Engine Model' },
    ],
    faqs: [
      {
        question: 'Does the M93 designation tell me the injector number?',
        answer:
          'It narrows the family and application, but not the injector. Injector numbers vary by build and serial range within the 4000 family, so the engine serial number is what closes the question. Sending the badge alone is the most common reason an injector inquiry needs another round.',
      },
      {
        question: 'Is an exchange injector as good as a new one?',
        answer:
          'A genuine exchange unit is factory-remanufactured to the program standard and carries the program warranty for that position. It is a different supply condition from a new unit, with its own core terms — not a lower grade. Which one is right depends on the end user\'s acceptance and your deadline.',
      },
      {
        question: 'Can you supply a single injector, or must it be a full set?',
        answer:
          'We quote single positions and full sets. If your engine documentation requires matched sets, say so in the inquiry and we will quote accordingly rather than splitting a set across orders.',
      },
      {
        question: 'What documentation comes with the injectors?',
        answer:
          'For new and genuine-exchange supply, the packing list and the shipment documentation come as standard; test or flow reports are quoted when the end user or class authority requires them. Ask for it in the inquiry so it is priced into the line rather than added later.',
      },
    ],
  },
  {
    slug: 'mtu-16v-2000-m96-turbocharger-parts',
    stage: 'selection',
    seoTitle: 'MTU 16V 2000 M96 Turbocharger Parts — Identification, Cartridges and Pricing',
    description:
      'MTU 16V 2000 M96 turbocharger parts: variant identification, cartridge versus complete assembly, core terms, and why we quote per line.',
    h1: 'MTU 16V 2000 M96 Turbocharger Parts: Identification and Routes',
    seriesFilter: ['MTU 2000', 'MTU 2000 MTU 4000', 'MTU 2000/4000'],
    intro: [
      'The L suffix on an M96L marks an increased-rating build, and rating is one of the things that changes which turbocharger variant is fitted. As with injectors, the model badge narrows the family but the engine serial number establishes the number — and on the 2000 series the turbocharger position is among the most serial-sensitive on the engine.',
      'The second decision is how much of the unit you need. A turbocharger order can be a complete assembly, a cartridge, or an individual component such as an actuator or a hose connection, and those are three different scopes with three different prices. Sending the complete number from the failed unit, plus the engine serial number, is what lets us quote the right one.',
    ],
    checklistHeading: 'What to send for a turbocharger quotation',
    checklist: [
      'Engine model code from the data plate, including the suffix (M96L is not M96 for parts purposes)',
      'Engine serial number — decisive for the turbocharger variant',
      'Complete part number from the failed unit, and whether it carries an X, XP, or EX prefix',
      'Whether the scope is complete assembly, cartridge, or a component such as an actuator',
      'Whether the old unit can be returned as a core, and from where',
      'The root-cause findings, if available — a repeat failure is generally not covered',
      'Destination, required-by date, and whether the engine is currently out of service',
    ],
    specNote:
      'We quote turbocharger positions per line rather than from a published price list. Turbocharger pricing moves with the unit, the route, the core position, and the destination, and a list price that a supplier cannot honour at order stage costs more time than it saves.',
    seriesCatalog: { href: '/part-products/catalog/mtu-2000-turbocharging-parts/', label: 'MTU 2000 Turbocharger Parts' },
    relatedHubs: [
      { href: '/part-products/catalog/mtu-turbocharger-parts/', label: 'MTU Turbocharger Parts Catalog' },
      { href: '/guides/mtu-turbocharger-failure-symptoms/', label: 'MTU Turbocharger Failure Symptoms' },
      { href: '/guides/mtu-16v-2000-parts/', label: 'MTU 16V 2000 Engine Parts Guide' },
      { href: '/guides/mtu-exchange-reman-parts/', label: 'MTU Exchange & Reman Parts (Core Deposit Explained)' },
    ],
    faqs: [
      {
        question: 'Why do you not publish turbocharger prices?',
        answer:
          'Because the price for the same position changes with the supply route (new or exchange), the core position, the quantity, and the destination terms. A published figure would either be wrong for your engine or wrong for your order. A per-line quotation against your serial range is the only reliable number.',
      },
      {
        question: 'Should I replace the whole turbocharger or just the cartridge?',
        answer:
          'That depends on which assembly failed and what the workshop can do. Photograph the old unit and send the complete number; where a cartridge route exists for the position we quote both, with the difference in scope and lead time shown.',
      },
      {
        question: 'Will a new turbocharger be covered if the old one failed again?',
        answer:
          'A repeat failure is generally not covered where the cause was not cleared — for example a restricted oil supply line or debris from upstream. Clear the cause, photograph the evidence, and the warranty position on the replacement is much clearer.',
      },
      {
        question: 'Does the M96L turbocharger differ from the M96?',
        answer:
          'The L suffix marks an increased rating, and rating-dependent components can differ. Send the full designation with the suffix and the engine serial number — the badge alone will not establish which variant is fitted.',
      },
    ],
  },
];

export function getPartsGuide(slug: string) {
  return partsGuides.find((guide) => guide.slug === slug);
}
