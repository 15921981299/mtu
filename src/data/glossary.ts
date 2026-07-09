export type GlossaryTerm = {
  slug: string;
  term: string;
  shortDefinition: string;
  body: string;
  relatedSlugs?: string[];
  relatedLinks?: { label: string; href: string }[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'dfm',
    term: 'inquiry prep (Design for Manufacturability)',
    shortDefinition: 'Design practices that make a part easier, cheaper, and more reliable to machine.',
    body: '<p>parts verifications catch wall thickness, radii, thread depth, and tolerance issues before cutting metal. We include a free parts verification with every RFQ.</p>',
    relatedLinks: [
      { label: 'Inquiry Checklist', href: '/resources/dfm-checklist/' },
      { label: 'inquiry prep design guide', href: '/blog/cnc-machining-dfm-design-guide/' },
    ],
  },
  {
    slug: 'iso-2768',
    term: 'ISO 2768 General Tolerances',
    shortDefinition: 'Standard default tolerances for linear dimensions when not explicitly specified on a drawing.',
    body: '<p>ISO 2768-m is the most common default for engine parts. Stating it on your drawing prevents ambiguity and surprise quotes.</p>',
    relatedLinks: [
      { label: 'Tolerance guide', href: '/resources/cnc-tolerance-guide/' },
      { label: 'ISO 2768 explained', href: '/blog/iso-2768-tolerances-explained/' },
    ],
  },
  {
    slug: 'cmm',
    term: 'supplier documents (Coordinate Measuring Machine)',
    shortDefinition: 'Precision instrument that measures part dimensions to verify conformance to the drawing.',
    body: '<p>documentation check reports document actual measured values vs. drawing requirements. We provide dimensional reports on every order.</p>',
    relatedLinks: [{ label: 'Quality & certifications', href: '/certifications/' }],
  },
  {
    slug: 'ra-surface-roughness',
    term: 'Ra (Surface Roughness)',
    shortDefinition: 'Arithmetic average roughness — the most common way to specify machined surface texture.',
    body: '<p>Ra 3.2 µm is a typical as-milled finish; Ra 0.8 µm or better may need finishing passes or grinding. Specify only what function requires.</p>',
    relatedLinks: [{ label: 'Surface roughness guide', href: '/blog/cnc-machining-surface-roughness-guide/' }],
  },
  {
    slug: '5-axis-machining',
    term: '5-Axis Engine Parts',
    shortDefinition: 'CNC where the tool or workpiece moves on five axes to reach compound angles in fewer setups.',
    body: '<p>5-axis reduces setup count and alignment error on aerospace brackets, impellers, and complex housings.</p>',
    relatedSlugs: ['3-axis-machining'],
    relatedLinks: [
      { label: 'MTU 4000 overhaul parts', href: '/products/mtu-4000-series-parts/overhaul-parts/' },
      { label: '3-axis vs 5-axis comparison', href: '/compare/3-axis-vs-5-axis/' },
    ],
  },
  {
    slug: '3-axis-machining',
    term: '3-Axis Engine Parts',
    shortDefinition: 'Standard milling where the spindle moves in X, Y, and Z on prismatic parts.',
    body: '<p>Ideal for brackets, plates, and housings with features on one or two primary faces. Additional setups needed for more faces.</p>',
    relatedLinks: [{ label: 'MTU spare parts', href: '/products/mtu-spare-parts/' }],
  },
  {
    slug: 'cnc-turning',
    term: 'CNC Turning',
    shortDefinition: 'Lathe process where the workpiece rotates and a stationary tool removes material.',
    body: '<p>Best for shafts, bushings, fittings, and cylindrical bodies. Typically achieves tighter roundness than interpolated milling.</p>',
    relatedLinks: [
      { label: 'MTU part numbers', href: '/part-products/' },
      { label: 'Milling vs turning', href: '/compare/cnc-milling-vs-turning/' },
    ],
  },
  {
    slug: 'wire-edm',
    term: 'Wire EDM',
    shortDefinition: 'Electrical discharge process that cuts conductive metals with a thin wire — no cutting force.',
    body: '<p>Used for hardened tooling, sharp internal corners, and thin walls where conventional milling would deflect the part.</p>',
    relatedLinks: [{ label: 'Parts identification support', href: '/capabilities/industrial-engine-service/' }],
  },
  {
    slug: 'en-10204-3-1',
    term: 'EN 10204 3.1 Material Certificate',
    shortDefinition: 'Mill test certificate verified by the manufacturer\'s authorized inspection representative.',
    body: '<p>Required for medical, aerospace, and regulated industries where material traceability must be documented lot-to-lot.</p>',
    relatedLinks: [{ label: 'Certifications page', href: '/certifications/' }],
  },
  {
    slug: 'fai',
    term: 'FAI (First Article Inspection)',
    shortDefinition: 'Full dimensional verification of the first production piece before running the batch.',
    body: '<p>FAI catches tooling, programming, or drawing interpretation errors before hundreds of non-conforming parts are made.</p>',
    relatedLinks: [{ label: 'Inspection report guide', href: '/blog/how-to-read-cnc-inspection-report/' }],
  },
  {
    slug: 'gd-t',
    term: 'GD&T (Geometric Dimensioning & Tolerancing)',
    shortDefinition: 'Symbol system that defines form, orientation, location, and runout relative to datums.',
    body: '<p>GD&T communicates functional intent — often allowing more manufacturing tolerance while guaranteeing assembly fit.</p>',
    relatedLinks: [{ label: 'GD&T symbols guide', href: '/blog/understanding-gdt-symbols-cnc-parts/' }],
  },
  {
    slug: 'cpk',
    term: 'Cpk (Process Capability Index)',
    shortDefinition: 'Statistical measure of how consistently a process holds tolerance relative to spec limits.',
    body: '<p>Cpk ≥ 1.33 is a common requirement for production batches. We report Cpk on critical features when requested.</p>',
    relatedLinks: [{ label: 'Cpk explained', href: '/blog/what-is-cpk-process-capability-index/' }],
  },
  {
    slug: 'anodizing-type-ii',
    term: 'Type II Anodizing',
    shortDefinition: 'Decorative sulfuric acid anodize on aluminum — thin, cosmetic, corrosion-resistant layer.',
    body: '<p>Available in clear, black, and colors. 6061 aluminum anodizes most evenly; specify sealing for outdoor use.</p>',
    relatedSlugs: ['anodizing-type-iii'],
    relatedLinks: [{ label: 'Anodizing guide', href: '/materials/aluminum/anodizing-guide/' }],
  },
  {
    slug: 'anodizing-type-iii',
    term: 'Type III Hard Anodizing',
    shortDefinition: 'Thick, wear-resistant anodize layer for aluminum parts in abrasive service.',
    body: '<p>Hard anodize adds 25–75 µm and increases surface hardness. Dimension mating features accordingly.</p>',
    relatedLinks: [{ label: 'Anodizing vs powder coating', href: '/compare/anodizing-vs-powder-coating/' }],
  },
  {
    slug: 'passivation',
    term: 'Passivation (Stainless Steel)',
    shortDefinition: 'Chemical treatment that removes free iron and restores corrosion-resistant oxide on stainless.',
    body: '<p>Common for 304/316 medical and food hardware after machining. Citric or nitric acid per ASTM A967.</p>',
    relatedLinks: [{ label: 'Genuine OEM parts', href: '/capabilities/genuine-oem-parts/' }],
  },
  {
    slug: '6061-aluminum',
    term: '6061-T6 Aluminum',
    shortDefinition: 'General-purpose structural aluminum alloy — excellent machinability and anodizing response.',
    body: '<p>The default choice for brackets, housings, and fixtures unless higher strength (7075) or casting plate (MIC-6) is required.</p>',
    relatedSlugs: ['7075-aluminum'],
    relatedLinks: [{ label: '6061 vs 7075', href: '/compare/aluminum-6061-vs-7075/' }],
  },
  {
    slug: '7075-aluminum',
    term: '7075-T6 Aluminum',
    shortDefinition: 'High-strength aluminum alloy for aerospace and structural parts where 6061 is insufficient.',
    body: '<p>Stronger but more expensive and harder to anodize cosmetically. Specify when load requirements demand it.</p>',
    relatedLinks: [{ label: 'Aluminum materials', href: '/materials/aluminum/' }],
  },
  {
    slug: '304-stainless',
    term: '304 Stainless Steel',
    shortDefinition: 'Austenitic stainless for general corrosion resistance — food, industrial, and hardware applications.',
    body: '<p>Lower cost than 316. Avoid in chloride or marine splash without additional protection.</p>',
    relatedSlugs: ['316-stainless'],
    relatedLinks: [{ label: '304 vs 316', href: '/compare/stainless-304-vs-316/' }],
  },
  {
    slug: '316-stainless',
    term: '316 Stainless Steel',
    shortDefinition: 'Molybdenum-bearing stainless with superior pitting resistance in marine and chemical environments.',
    body: '<p>Standard for medical housings, offshore hardware, and pharma equipment exposed to chlorides.</p>',
    relatedLinks: [{ label: '316 machining guide', href: '/blog/guide-to-machining-316-stainless-steel/' }],
  },
  {
    slug: 'step-file',
    term: 'STEP File (.stp / .step)',
    shortDefinition: 'Neutral 3D CAD format preferred for CNC quoting and CAM programming.',
    body: '<p>Include STEP plus a 2D PDF/DWG with tolerances, threads, and finishes for a complete RFQ package.</p>',
    relatedLinks: [{ label: 'Drawing preparation guide', href: '/blog/how-to-prepare-a-drawing-for-cnc-rfq/' }],
  },
  {
    slug: 'rfq',
    term: 'RFQ (Request for Quote)',
    shortDefinition: 'Formal request sent to a supplier with drawings, quantity, and requirements for pricing.',
    body: '<p>A complete RFQ includes 3D model, 2D drawing, material, quantity, finish, and target lead time.</p>',
    relatedLinks: [{ label: 'Request a quote', href: '/contact/' }],
  },
  {
    slug: 'moq',
    term: 'MOQ (Minimum Order Quantity)',
    shortDefinition: 'Smallest batch a supplier will run economically — setup cost drives MOQ on CNC parts.',
    body: '<p>We accept sample quantities (1 pc) through production runs. Unit cost drops as quantity increases.</p>',
    relatedLinks: [{ label: 'Pricing guide', href: '/resources/cnc-pricing-guide/' }],
  },
  {
    slug: 'live-tooling',
    term: 'Live Tooling (Mill-Turn)',
    shortDefinition: 'Rotating tools on a CNC lathe that mill flats, drill cross-holes, and slot features without a second setup.',
    body: '<p>Ideal for fittings and cylindrical parts with secondary milled features — one chucking, better concentricity.</p>',
    relatedLinks: [{ label: 'Milling vs turning', href: '/compare/cnc-milling-vs-turning/' }],
  },
  {
    slug: 'incoterms',
    term: 'Incoterms (EXW / FOB / DDP)',
    shortDefinition: 'International trade terms defining who pays freight, insurance, and customs clearance.',
    body: '<p>We commonly quote EXW (factory) or arrange DHL/FedEx express. FOB and DDP available on request for larger orders.</p>',
    relatedLinks: [{ label: 'Shipping terms', href: '/terms/shipping/' }],
  },
  {
    slug: 'tir',
    term: 'TIR (Total Indicator Reading)',
    shortDefinition: 'Runout measurement — peak-to-valley deviation of a surface as it rotates.',
    body: '<p>Critical for shafts, bearing journals, and rotating assemblies. Specify TIR on drawings where runout affects function.</p>',
    relatedLinks: [{ label: 'Runout and TIR', href: '/blog/what-is-runout-and-tir/' }],
  },
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((item) => item.slug === slug);
}

export function getRelatedGlossaryTerms(term: GlossaryTerm, limit = 4) {
  const related = new Set<string>();
  for (const slug of term.relatedSlugs ?? []) related.add(slug);
  for (const item of glossaryTerms) {
    if (item.relatedSlugs?.includes(term.slug)) related.add(item.slug);
  }
  return [...related]
    .filter((slug) => slug !== term.slug)
    .map((slug) => glossaryTerms.find((t) => t.slug === slug))
    .filter((t): t is GlossaryTerm => Boolean(t))
    .slice(0, limit);
}
