/**
 * Customer supply cases. RED LINE: only real, customer-authorized cases go here.
 * Never invent a case, a customer name, a quote, or a result figure.
 *
 * Workflow:
 * 1. Get written authorization at order/contract time (article-backed: retroactive
 *    permission succeeds far less often; named cases convert 60-80% better than anonymous).
 * 2. Add an entry below with status: 'draft' and collect the real details.
 * 3. Switch to status: 'published' only after the customer confirms the final text.
 * 4. Pages, sitemap inclusion, and index listing appear automatically on next build.
 *
 * Empty published list = /case-studies/ stays noindex and out of the sitemap.
 *
 * ---------------------------------------------------------------------------
 * 2026-10-21: the first five entries are published. They are derived one-to-one
 * from src/data/quotation-examples.ts — the customer-authorized, delivered,
 * anonymized orders that already appear on the filters and gasket catalog
 * pages. Every number, quantity, date, model and option statement below comes
 * from that record. Nothing about these cases is composed:
 *   - no customer names, no customer quotations (the `quote` field stays empty
 *     until a customer hands us words we may print),
 *   - no result figures, no downtime or savings percentages,
 *   - where the RFQ did not state something (region, engine model, industry),
 *     the entry says so instead of guessing.
 * The prose is our own shop voice: what arrived, what we did with it, and what
 * the request teaches a buyer. `suppliedParts[].slug` is set only where the
 * number also has a part page in the catalog; RFQ numbers we do not list are
 * shown as plain text, exactly as on the catalog pages.
 */
export type CaseStudy = {
  slug: string;
  status: 'draft' | 'published';
  title: string;
  summary: string;
  industry: string;
  /** Country or region, only as precise as the customer allows. */
  region: string;
  engineModel: string;
  /** The operational problem, in the customer's terms. */
  challenge: string[];
  /** What we supplied and how it was verified. */
  solution: string[];
  /** Measurable outcome — only figures the customer confirmed. */
  outcome: string[];
  /** Customer's own words, with written permission. Optional. */
  quote?: { text: string; person: string; role: string; company: string };
  /** Part numbers actually supplied (links to part pages when one exists). */
  suppliedParts: { partNumber: string; slug?: string; name: string }[];
  datePublished: string; // ISO date
  /** Real reviewer on our side (E-E-A-T). */
  reviewerName: string;
  reviewerJobTitle: string;
};

const REVIEWER = { reviewerName: 'Leo Zhang', reviewerJobTitle: 'Founder, Parts Verification' };

export const caseStudies: CaseStudy[] = [
  {
    slug: 'generator-service-filters',
    status: 'published',
    title: 'Generator Service: Filters and Alternator Belt',
    summary:
      'A generating-set RFQ covering two different engines, split and quoted by engine: filter lines by supply grade, the alternator belt genuine only.',
    industry: 'Power generation',
    region: 'Not stated in the RFQ',
    engineModel: 'MTU 10V1600G20F and MTU 16V4000G14F',
    challenge: [
      'The inquiry arrived as a single parts list: fuel and oil filter cartridges, a centrifugal oil-filter element, an EasyChange fuel filter, and an alternator belt. No engine model came with the numbers themselves.',
      'Reading the line details closely, the list did not belong to one engine. Two model designations showed up — 10V1600G20F against the cartridge quantities and 16V4000G14F against the rest. That split matters more than it looks: a filter element quoted against the wrong engine is worse than no quote at all, because it reads as authoritative and gets ordered.',
      'One line also carried history. The buyer asked for the EasyChange filter by an earlier number, X57508300091, which had to be traced rather than assumed.',
    ],
    solution: [
      'We answered with the lines regrouped by engine, so every quantity could be checked against the right unit before anything was ordered. Each line kept the quantity from the original request.',
      'The filter lines were quoted as separate labelled options where both a genuine-specification supply and a genuine MTU supply existed for the position. The belt was offered in the genuine version only.',
      'The earlier number on the EasyChange line was traced to the current reference instead of being silently swapped.',
    ],
    outcome: [
      'The order was completed and delivered, and the customer authorized publication in this anonymized form. Delivery date and the supply option actually selected are not published.',
      'What this RFQ teaches, and what we would pass to any buyer: one list can sit on two engines. Ask for the split before you accept a quote — and ask which grade each line is, because the same position priced three ways tells you nothing until the tier is named.',
    ],
    suppliedParts: [
      { partNumber: 'X57508300028', name: 'Fuel filter cartridge' },
      { partNumber: 'X57518300024', name: 'Oil filter element' },
      { partNumber: 'XP52718300060', slug: 'xp52718300060-paper-insert', name: 'Centrifugal oil-filter paper element' },
      { partNumber: 'X59408300151', name: 'EasyChange fuel filter (earlier number X57508300091 traced)' },
      { partNumber: 'X00042954', name: 'Poly-vee belt 8PK, alternator drive' },
    ],
    datePublished: '2026-10-08',
    ...REVIEWER,
  },
  {
    slug: 'mixed-parts-list',
    status: 'published',
    title: 'Mixed Parts List: Kit, Filters and Cylinder-Head Components',
    summary:
      'A 13-line mixed RFQ with no engine model: quantities and supply versions kept per line, and two same-number lines kept separate.',
    industry: 'Not stated in the RFQ',
    region: 'Not stated in the RFQ',
    engineModel: 'Not stated in the RFQ',
    challenge: [
      'A 13-line request came in covering a spare-parts kit, filters, a belt, sealing components, cylinder-head bolts and thrust washers, and pushrods. It named no complete engine model and did not define a kit.',
      'Mixed lists are the normal shape of real purchasing: somebody consolidates several jobs onto one sheet, often from a photo of a handwritten note. The risk is that a single tidy-looking answer hides the fact that the lines belong to different situations.',
      'Two of the lines used the same thrust-washer number with different quantities. Nothing in the request established that they went to the same installation position.',
    ],
    solution: [
      'We quoted the list line by line, keeping each quantity and each offered supply version exactly as the request had them, and flagged the model question back to the buyer rather than filling it in ourselves.',
      'The two same-number thrust-washer lines were kept as two lines. Collapsing them into one would have invented a fitment conclusion the request never supported.',
      'The kit line was quoted as the kit number the buyer gave, without itemizing contents we had not verified. A kit number is not a bill of materials.',
    ],
    outcome: [
      'The order was completed and delivered, and the customer authorized publication in this anonymized form.',
      'What this RFQ teaches: a mixed list does not prove interchangeability between its numbers, and one number appearing twice is a question, not a simplification. When your own list looks like this one, send the engine model and serial number with it — that is what turns thirteen lines into one verified quote.',
    ],
    suppliedParts: [
      { partNumber: 'XP56900600002', name: 'Spare parts kit' },
      { partNumber: 'X57508300028', name: 'Fuel filter cartridge' },
      { partNumber: 'X57518300024', name: 'Oil filter element' },
      { partNumber: 'XP52718300060', slug: 'xp52718300060-paper-insert', name: 'Centrifugal oil-filter paper element' },
      { partNumber: 'X59408300151', name: 'Fuel filter (earlier reference X57508300091)' },
      { partNumber: 'X00042954', name: 'Alternator-drive poly-vee belt 8PK' },
      { partNumber: 'X52404200052', slug: 'x52404200052-seal-ring', name: 'Seal ring' },
      { partNumber: 'X52404200043', slug: 'x52404200043-gasket-for-cylinder-head', name: 'Cylinder-head gasket' },
      { partNumber: '5249900701', name: 'Cylinder-head bolt' },
      { partNumber: '5240110062', name: 'Thrust washer (two RFQ lines: quantity 12 and quantity 2)' },
      { partNumber: '5240160069', slug: '5240160069-cylinder-head-bolt', name: 'Cylinder-head hexagon bolt' },
      { partNumber: 'X52405400013', slug: 'x52405400013-pushrod', name: 'Pushrod' },
    ],
    datePublished: '2026-10-08',
    ...REVIEWER,
  },
  {
    slug: 'cylinder-head-components',
    status: 'published',
    title: 'Cylinder-Head Components: Separate Supply Options',
    summary:
      'Seven cylinder-head sealing and fastening lines, quoted with a separate OEM-specification option only where one existed in the original offer.',
    industry: 'Not stated in the RFQ',
    region: 'Not stated in the RFQ',
    engineModel: 'Not stated in the RFQ',
    challenge: [
      'Seven quoted lines covered sealing and cylinder-head components: a seal ring, a cylinder-head gasket, two different bolt numbers, thrust washers, and pushrods.',
      'The request did not identify the full engine designation, and it did not come with a customer performance result or a fault description. What it needed was a clean per-line answer, not a story.',
    ],
    solution: [
      'Every line was quoted with its own weight and HS reference, so the buyer could plan shipment and customs paperwork from the same document.',
      'A separate OEM-specification option was offered where one existed in the quotation. The remaining lines were offered in the genuine MTU version, and the quote said so line by line instead of blurring the two.',
    ],
    outcome: [
      'The order was completed and delivered, and the customer authorized publication in this anonymized form.',
      'What this RFQ teaches: a historical offer is not blanket proof of origin for future supplies. Ask for the offered version on every line, every time — grades are decided per position, not per supplier.',
    ],
    suppliedParts: [
      { partNumber: 'X52404200052', slug: 'x52404200052-seal-ring', name: 'Seal ring' },
      { partNumber: 'X52404200043', slug: 'x52404200043-gasket-for-cylinder-head', name: 'Cylinder-head gasket' },
      { partNumber: '5249900701', name: 'Cylinder-head bolt' },
      { partNumber: '5240110062', name: 'Thrust washer' },
      { partNumber: '5240160069', slug: '5240160069-cylinder-head-bolt', name: 'Cylinder-head hexagon bolt' },
      { partNumber: 'X52405400013', slug: 'x52405400013-pushrod', name: 'Pushrod' },
    ],
    datePublished: '2026-10-08',
    ...REVIEWER,
  },
  {
    slug: 'spare-parts-kit',
    status: 'published',
    title: 'XP56900600002: Exact Kit Reference',
    summary:
      'A three-kit request for XP56900600002 quoted as new genuine supply, EXW Shanghai, on a conditional sourcing schedule.',
    industry: 'Not stated in the RFQ',
    region: 'Not stated in the RFQ',
    engineModel: 'Not confirmed in the RFQ',
    challenge: [
      'A buyer sent one number and a quantity of three: XP56900600002, a spare-parts kit. The request did not itemize the kit contents and did not confirm which engine model it was going onto.',
      'Kit requests arrive this way often. The number is precise, so it feels complete — but a kit number without its contents list is exactly where an overhaul job quietly goes wrong.',
    ],
    solution: [
      'We quoted the kit as new genuine supply for the number given, on EXW Shanghai terms, with the sourcing schedule stated as conditional.',
      'We did not expand the kit into a contents list we had not verified, and we did not describe it as a complete engine overhaul set. Kit-content verification was put back to the buyer as the next step.',
    ],
    outcome: [
      'The order was completed and delivered, and the customer authorized publication in this anonymized form.',
      'What this RFQ teaches: price a kit precisely, and it still is not an overhaul plan until the bill of materials is on the table. If you are planning a top-end or major job, send the engine model and serial number and we will confirm what the kit actually covers before you commit.',
    ],
    suppliedParts: [{ partNumber: 'XP56900600002', name: 'Spare parts kit' }],
    datePublished: '2026-10-08',
    ...REVIEWER,
  },
  {
    slug: 'molded-tubing',
    status: 'published',
    title: '5062030282: Molded Tubing Bulk Request',
    summary:
      'Fifty pieces of molded tubing for a buyer in Bulgaria: sourcing and transit time quoted separately, original packaging required.',
    industry: 'Not stated in the RFQ',
    region: 'Bulgaria',
    engineModel: 'Not stated in the RFQ',
    challenge: [
      'A buyer in Bulgaria needed 50 pieces of molded tubing, part number 5062030282. The quantity made shipping weight the deciding number, not the unit price.',
      'At the quoted unit weight the order came to 37.2 kg net. Carton dimensions and gross weight were not confirmed at quotation time, which is normal for a bulk molded-rubber line and matters for both freight class and customs.',
    ],
    solution: [
      'We quoted sourcing time and transit time as separate figures, so the buyer could see where the lead time actually sits instead of reading one blended number.',
      'The quotation required original packaging with part-number labels. For bulk rubber components arriving in a market full of lookalike hose, the label is the identification.',
      'Weight and HS code were given as quotation references — not as verified current-stock measurements and not as a customs classification ruling.',
    ],
    outcome: [
      'The order was completed and delivered, and the customer authorized publication in this anonymized form.',
      'What this RFQ teaches: for bulk orders, ask for net weight, carton dimensions and gross weight before you commit to a freight quote, and keep sourcing time and transit time on separate lines. They fail independently.',
    ],
    suppliedParts: [{ partNumber: '5062030282', name: 'Molded tubing' }],
    datePublished: '2026-10-10',
    ...REVIEWER,
  },
];

export const publishedCaseStudies = caseStudies.filter((study) => study.status === 'published');
