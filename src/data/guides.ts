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
  {
    slug: 'mtu-16v-2000-parts',
    stage: 'selection',
    seoTitle: 'MTU 16V 2000 Engine Parts Guide — M84, M86, M96 Variant Identification',
    description:
      'Sourcing parts for an MTU 16V 2000 engine (M84, M86, M91, M93, M94, M96L)? What the variant and build digits change, which details to send, and the 2000-series parts we supply for marine and generator 16V engines.',
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
      'How to read an MTU injector part number: prefix meanings (X, XP, EX), reman vs new, stamped vs label numbers, core exchange terms, and what to send so the correct injector number is confirmed before quoting.',
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
      'What MTU exchange and remanufactured parts are: how to read X, XP and EX prefixes, how the core deposit and core-return process works, why exchange units often ship faster than new, and when each route saves money.',
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
      'A practical comparison of MTU parts supply grades: genuine new, genuine exchange/reman, OEM-quality alternative, and aftermarket — what each one is, what it costs relative to the others, and how to compare quotes that are not like-for-like.',
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
];

export function getPartsGuide(slug: string) {
  return partsGuides.find((guide) => guide.slug === slug);
}
