import type { CaseStudyEnrichment } from './case-study-shared';

/** Outcome-oriented titles, client context, quotes, and before/after metrics keyed by slug. */
export const caseStudyEnrichment: Record<string, CaseStudyEnrichment> = {
  'aerospace-aluminum-bracket': {
    title: '50 Aerospace Brackets in 12 Days — Bores Held ±0.008mm',
    h1Title: '50 Aerospace Brackets in 12 Days — Bores Held ±0.008mm',
    clientProfile: {
      description: 'UAV structural supplier, 40-person engineering team',
      region: 'North America',
      scale: '50-piece flight-hardware lot',
      scenario: 'First production run on a new 7075 bracket with four-sided features',
    },
    decision:
      'The team had quotes from two domestic 3-axis shops that required three setups. They chose us after a DFM call showed single-setup 5-axis could hold datum alignment and shave one setup risk from the traveler.',
    customerQuote: {
      text: 'We were nervous about four-sided features on 7075. The CMM report on every bore position is what let our quality lead sign the lot without a second source audit.',
      attribution: 'Mechanical Engineer — UAV Structures, North America',
    },
    beforeAfter: [
      { metric: 'Critical bore position', before: '±0.01mm spec (3 setups quoted elsewhere)', after: '±0.008mm measured, single 5-axis setup' },
      { metric: 'Lead time', before: '18 days quoted (multi-setup)', after: '12 business days delivered' },
      { metric: 'Unit cost', before: 'Baseline drawing', after: '18% lower after DFM tolerance relaxation' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2025-09-12',
    inspectionSampleHref: '/resources/inspection-samples/',
  },
  'medical-stainless-housing': {
    title: 'Medical Housing Passed FDA Review — Cpk > 1.33 on Seals',
    h1Title: 'Medical Housing Passed FDA Review — Cpk > 1.33 on Seals',
    clientProfile: {
      description: 'Medical device startup, design-history-file stage',
      region: 'USA',
      scale: '200 pcs across 3 batches',
      scenario: 'Instrument housing for a regulated device entering design review',
    },
    decision:
      'They had been burned by a low-cost shop that substituted 304 for 316 on a prototype. Our EN 10204 3.1 workflow and seal-surface Ra tracking matched their supplier questionnaire — and the engineer-led DFM call identified a collar wall that was unnecessarily tight.',
    customerQuote: {
      text: 'Their DFM feedback on our initial design identified three changes that reduced machining cost by 34% without affecting function. The engineer who reviewed our drawing clearly understood what we were building.',
      attribution: 'Sarah L., Product Designer — Medical Device Startup, USA',
      testimonialSlug: 'sarah-l-medical',
    },
    beforeAfter: [
      { metric: 'Seal diameter Cpk', before: 'Unstable on first offshore prototype', after: '> 1.33 across 200 pcs' },
      { metric: 'Seal surface Ra', before: '0.8µm required', after: '0.6µm achieved' },
      { metric: 'Design review', before: 'Open DHF gaps on material traceability', after: 'FDA design review passed with our inspection data' },
    ],
    narrative: 'iteration',
    documentedBy: 'lisa-huang',
    datePublished: '2025-08-20',
    inspectionSampleHref: '/resources/inspection-samples/',
  },
  'robotics-aluminum-end-effector': {
    title: 'Trade-Show Prototypes in 8 Days → 500-Piece PO at 34% Lower Cost',
    h1Title: 'Trade-Show Prototypes in 8 Days → 500-Piece PO at 34% Lower Cost',
    clientProfile: {
      description: 'Robotics startup, pre-Series A, 12-person team',
      region: 'Canada',
      scale: '10 prototypes → 500 production units',
      scenario: 'Gripper plate needed for trade-show demo with expected design revision',
    },
    decision:
      'Local job shops quoted 3 weeks for prototypes. We committed to 8-day prototype delivery with an explicit revision path — that flexibility mattered more than the lowest unit price on the first 10 pcs.',
    customerQuote: {
      text: 'We iterated through 12 design revisions on our robot end-effector. Every revision was quoted within 24 hours. When we finalized and ordered 500 units, production quality matched the prototypes perfectly.',
      attribution: 'James T., Founder — Robotics Startup, Canada',
      testimonialSlug: 'james-t-robotics',
    },
    beforeAfter: [
      { metric: 'Prototype lead time', before: '3 weeks (local quotes)', after: '8 business days' },
      { metric: 'Revision turnaround', before: 'Unknown / not quoted', after: '6 days after show revision' },
      { metric: 'Production unit cost', before: 'Local job shop baseline', after: '34% lower at 500 pcs' },
    ],
    narrative: 'iteration',
    documentedBy: 'wei-chen',
    datePublished: '2025-07-08',
  },
  'automotive-steel-shaft': {
    title: '100 Hardened Shafts — Zero Bearing-Fit Rejections',
    h1Title: '100 Hardened Shafts — Zero Bearing-Fit Rejections',
    clientProfile: {
      description: 'EV drivetrain startup, first production shaft lot',
      region: 'Germany',
      scale: '100-piece production batch',
      scenario: 'Hardened journal shaft for bearing-fit assembly',
    },
    decision:
      'Their Tier-2 supplier quoted 6 weeks and could not guarantee post-heat-treat journal roundness. We showed a similar 4140 shaft lot with per-part grinder logs — Michael\'s team had already run 40+ batches with us on aluminum; this was their first steel journal job.',
    customerQuote: {
      text: 'We have been ordering CNC parts from this team since 2023. Over 40 batches, zero rejected lots. The dimensional reports that ship with every order save our incoming QC team hours.',
      attribution: 'Michael R., Mechanical Engineer — Automotive Tier 2, Germany',
      testimonialSlug: 'michael-r-automotive',
    },
    beforeAfter: [
      { metric: 'Bearing-fit rejections', before: 'Prior supplier: 4% journal rework', after: '0 rejections on 100 pcs' },
      { metric: 'Journal tolerance', before: '±0.005mm after HRC 45–50', after: '100% logged roundness + cylindricity' },
      { metric: 'Surface finish', before: 'Ra 0.4µm target', after: 'Ra 0.2µm on bearing journal' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2025-06-15',
  },
  'titanium-drone-motor-mount': {
    title: 'Titanium Mounts 30% Lighter — 2× Bolt Pull-Out vs Aluminum',
    h1Title: 'Titanium Mounts 30% Lighter — 2× Bolt Pull-Out vs Aluminum',
    clientProfile: {
      description: 'Heavy-lift drone OEM, first titanium hardware run',
      region: 'USA',
      scale: '25-piece pilot lot',
      scenario: 'Motor mount weight reduction without sacrificing bolt pattern strength',
    },
    decision:
      'The customer had only machined aluminum in-house and feared titanium cost. We ran a material trade study on the RFQ call — Grade 5 vs Grade 2 — and quoted cycle time with high-pressure coolant so they could compare total landed cost, not just $/kg.',
    customerQuote: {
      text: 'We had never sourced titanium before. The quote broke out cycle time and material so we could defend the switch internally — 42g per mount vs our 60g aluminum prototype sold the program lead.',
      attribution: 'Lead Structures Engineer — UAV OEM, USA',
    },
    beforeAfter: [
      { metric: 'Part mass', before: '60g aluminum prototype', after: '42g Ti-6Al-4V (-30%)' },
      { metric: 'Bolt pull-out', before: 'Aluminum baseline', after: '2× pull-out strength' },
      { metric: 'Lead time', before: 'Unknown (first Ti run)', after: '14 business days' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2025-05-22',
  },
  'industrial-pom-bushing': {
    title: 'Bushing ID Rejection Cut from 8% to 0.4%',
    h1Title: 'Bushing ID Rejection Cut from 8% to 0.4%',
    clientProfile: {
      description: 'Conveyor system OEM, monthly production release',
      region: 'Netherlands',
      scale: '500 pcs/month',
      scenario: 'High-volume POM bushing with press-fit bearing OD',
    },
    decision:
      'They stayed with a domestic turner for two years despite 8% ID rejects stopping the assembly line. We offered 100% pin-gauge data on every lot and a first-article sign-off within 7 days — procurement could trial us without canceling the incumbent immediately.',
    customerQuote: {
      text: 'First article landed on the first submission. We stopped fighting bearing press-fit failures on the line — that was worth more than the modest piece-price delta.',
      attribution: 'Production Manager — Conveyor OEM, Netherlands',
    },
    beforeAfter: [
      { metric: 'ID rejection rate', before: '8% (prior supplier)', after: '0.4% ongoing' },
      { metric: 'First article', before: '2 submission cycles typical', after: 'Approved first submission' },
      { metric: 'Line stoppages', before: 'Weekly press-fit failures', after: 'Eliminated after lot 3' },
    ],
    narrative: 'standard',
    documentedBy: 'lisa-huang',
    datePublished: '2025-04-18',
  },
  'oil-gas-inconel-valve-body': {
    title: 'Inconel Valve Bodies Passed NACE Audit on First Review',
    h1Title: 'Inconel Valve Bodies Passed NACE Audit on First Review',
    clientProfile: {
      description: 'Oilfield equipment supplier, sour-service valve program',
      region: 'UK',
      scale: '30-piece Inconel 625 lot',
      scenario: 'H₂S-rated valve body with internal EDM passages',
    },
    decision:
      'European casting lead times blew their field trial window. They shortlisted three CNC suppliers; we were the only one that included PMI records, heat-lot traceability, and sinker EDM on 1.2mm internal radii in the same quote package.',
    customerQuote: {
      text: 'We require EN 10204 3.1 certificates on every order for pressure-containing components. Every batch has arrived with complete, verifiable mill certificates — confirmed by our own PMI testing.',
      attribution: 'David K., Procurement Manager — Oil & Gas Equipment, UK',
      testimonialSlug: 'david-k-oil-gas',
    },
    beforeAfter: [
      { metric: 'PMI failures', before: '1 lot failed at prior vendor (2024)', after: '0 PMI failures on 30 pcs' },
      { metric: 'NACE audit', before: 'Open findings on traceability', after: 'Passed first third-party review' },
      { metric: 'Lead time', before: '10+ weeks (casting route)', after: '18 business days CNC from billet' },
    ],
    narrative: 'standard',
    documentedBy: 'lisa-huang',
    datePublished: '2025-03-10',
    inspectionSampleHref: '/resources/inspection-samples/',
  },
  'semiconductor-vacuum-chamber-adapter': {
    title: 'Vacuum Leak Pass Rate Raised from 82% to 100%',
    h1Title: 'Vacuum Leak Pass Rate Raised from 82% to 100%',
    clientProfile: {
      description: 'Wafer-handling equipment startup, 25 engineers',
      region: 'USA',
      scale: '40-piece adapter plate lot',
      scenario: 'Large sealing face with post-anodize flatness risk',
    },
    decision:
      'Their previous supplier anodized before final skim — O-ring grooves leaked on 18% of plates. We proposed stress-relief, post-anodize fly-cut, and flatness verification on every plate; they paid a sample run before switching the production PO.',
    customerQuote: {
      text: 'We lost two weeks reworking bowed plates from another shop. The post-anodize skim and flatness log on every adapter let us green-light vacuum test on the first build.',
      attribution: 'Mechanical Engineer — Semiconductor Equipment, USA',
    },
    beforeAfter: [
      { metric: 'Leak test pass rate', before: '82%', after: '100%' },
      { metric: 'Sealing face flatness', before: 'Bowed after anodize (prior lot)', after: '0.006–0.009mm' },
      { metric: 'Rework time', before: '~2 weeks manual skim', after: '0 rework on 40 pcs' },
    ],
    narrative: 'turnaround',
    documentedBy: 'wei-chen',
    datePublished: '2025-02-14',
  },
  'marine-bronze-propeller-bushing': {
    title: '150 Marine Bushings in 10 Days — Refit Finished 4 Days Early',
    h1Title: '150 Marine Bushings in 10 Days — Refit Finished 4 Days Early',
    clientProfile: {
      description: 'Marine maintenance contractor, dry-dock refit',
      region: 'Mediterranean EU',
      scale: '150 replacement bushings',
      scenario: 'Emergency bronze bushing lot inside a 3-week docking window',
    },
    decision:
      'European foundry lead time exceeded the docking schedule. The contractor RFQ\'d four CNC suppliers with explicit "must fit first time" language — we showed a similar C932 bronze turning lot with honed ID Ra logs.',
    customerQuote: {
      text: 'Dry dock does not wait. Every bushing fit first time — we finished the prop shaft work four days early and avoided penalty days on the berth.',
      attribution: 'Project Superintendent — Marine Refit Contractor, EU',
    },
    beforeAfter: [
      { metric: 'Lead time', before: '>3 weeks (foundry)', after: '10 business days' },
      { metric: 'First-time fit', before: 'Historical 6% rework on spares', after: '100% first-time fit' },
      { metric: 'Dock schedule', before: 'At risk of penalty days', after: 'Completed 4 days early' },
    ],
    narrative: 'turnaround',
    documentedBy: 'wei-chen',
    datePublished: '2025-01-28',
  },
  'renewable-energy-wind-coupling-hub': {
    title: 'Zero Field Failures Over 14 Months on Coupling Hubs',
    h1Title: 'Zero Field Failures Over 14 Months on Coupling Hubs',
    clientProfile: {
      description: 'Wind drivetrain supplier, field-replacement parts program',
      region: 'Northern Europe',
      scale: '60 hubs across 2 lots',
      scenario: 'Keyway-root cracking had caused two field returns with prior vendor',
    },
    decision:
      'They needed MPI photos archived per heat lot for their customer audit. Our quote attached sample MPI reports and hardness charts from a similar 4140 hub — not just a per-piece price.',
    customerQuote: {
      text: 'Keyway root cracks stopped after we switched. Fourteen months in the field with zero returns on this component — that is the metric our customer cares about.',
      attribution: 'Quality Engineer — Wind Drivetrain Supplier, Europe',
    },
    beforeAfter: [
      { metric: 'Field failures', before: '2 returns in 9 months (prior vendor)', after: '0 failures in 14 months' },
      { metric: 'MPI results', before: 'Inconsistent photo archive', after: 'Clean MPI every lot with photos' },
      { metric: 'Hardness', before: 'HRC 42–44 (variable)', after: 'HRC 45–48 controlled' },
    ],
    narrative: 'standard',
    documentedBy: 'lisa-huang',
    datePublished: '2024-12-05',
  },
  'food-beverage-sanitary-clamp-fitting': {
    title: '300 Sanitary Ferrules — CIP Passed, FDA Audit Cleared',
    h1Title: '300 Sanitary Ferrules — CIP Passed, FDA Audit Cleared',
    clientProfile: {
      description: 'Craft brewery scaling to canning line',
      region: 'USA',
      scale: '300 custom-length ferrules',
      scenario: 'Non-catalog tri-clamp lengths for skid layout + FDA audit documentation',
    },
    decision:
      'Catalog ferrules did not fit their skid. They chose us after we sent a redacted EN 10204 3.1 sample and Ra measurement report from a similar 316L sanitary job — documentation mattered more than saving $0.40 per ferrule.',
    customerQuote: {
      text: 'CIP validation passed with no retention flags. We cited their documentation pack in our FDA audit — that saved us weeks of back-and-forth.',
      attribution: 'Operations Manager — Craft Brewery, USA',
    },
    beforeAfter: [
      { metric: 'Wetted ID Ra', before: 'Ra 0.8µm typical catalog', after: 'Ra 0.4µm electropolished' },
      { metric: 'CIP validation', before: 'Failed on prior custom shop trial', after: 'Passed' },
      { metric: 'Lead time', before: '6 weeks (custom US shop)', after: '12 business days' },
    ],
    narrative: 'standard',
    documentedBy: 'lisa-huang',
    datePublished: '2024-11-18',
    inspectionSampleHref: '/resources/inspection-samples/',
  },
  'defense-aluminum-optics-mount': {
    title: 'Optics Alignment Time Cut 40% — Single-Setup 5-Axis',
    h1Title: 'Optics Alignment Time Cut 40% — Single-Setup 5-Axis',
    clientProfile: {
      description: 'Defense subcontractor, optical bench assembly',
      region: 'USA',
      scale: '20 serialized mounts',
      scenario: 'Orthogonal bore pattern with field alignment drift on prior lots',
    },
    decision:
      'Multi-setup suppliers produced alignment drift that failed field calibration. We quoted tombstone 5-axis with per-unit CMM serialization — their QA lead could map every bore to bench time.',
    customerQuote: {
      text: 'Serialized CMM per mount cut our bench alignment time by 40%. We stopped shimming bores in the field — that was the win.',
      attribution: 'Optical Systems Engineer — Defense Subcontractor, USA',
    },
    beforeAfter: [
      { metric: 'Bench alignment time', before: 'Baseline multi-setup supplier', after: '40% reduction' },
      { metric: 'Bore alignment', before: 'Stack-up drift across setups', after: '±0.01mm in single setup' },
      { metric: 'Traceability', before: 'Lot-level inspection only', after: 'Serialized CMM per unit' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2024-10-30',
  },
  'consumer-electronics-aluminum-heatsink': {
    title: '1,000 Heatsinks in 4 Weeks — Zero Thermal Returns in 90 Days',
    h1Title: '1,000 Heatsinks in 4 Weeks — Zero Thermal Returns in 90 Days',
    clientProfile: {
      description: 'Portable power brand, consumer launch timeline',
      region: 'USA',
      scale: '1,000 launch-quantity housings',
      scenario: 'Thin-fin heatsink with post-anodize warp causing thermal pad misalignment',
    },
    decision:
      'Previous supplier warped 1.2mm fins during anodize — reliability tests failed. We quoted trochoidal roughing, balanced wall stock, and post-anodize skim on the pad seat with sample thermal images from a similar enclosure.',
    customerQuote: {
      text: 'Thermal imaging was uniform across test units for the first time. We launched on schedule — zero thermal returns in the first 90 days.',
      attribution: 'Hardware Lead — Consumer Electronics Brand, USA',
    },
    beforeAfter: [
      { metric: 'Launch timeline', before: '5 weeks required', after: 'Delivered in 4 weeks' },
      { metric: 'Thermal hot spots', before: 'Failed reliability on prior lot', after: 'Uniform heat spread' },
      { metric: 'Returns (90 days)', before: '3% thermal returns (prior gen)', after: '0%' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2024-09-22',
  },
  'medical-peek-surgical-guide': {
    title: '14 of 15 Surgeons Rated PEEK Guide Fit as Exact',
    h1Title: '14 of 15 Surgeons Rated PEEK Guide Fit as Exact',
    clientProfile: {
      description: 'Orthopedic instrument company, clinical trial stage',
      region: 'EU',
      scale: '15 patient-specific prototypes',
      scenario: 'Implant-grade PEEK guides with sterile packaging for trial',
    },
    decision:
      'They needed a non-metallic cell and lot-marked sterile packs — most job shops treated it as standard plastic. Lisa\'s team mapped their DHF checklist to our traveler before they issued the PO.',
    customerQuote: {
      text: 'Surgeons called the fit exact on 14 of 15 cases. We approved a 200-unit pilot based on that trial feedback — not based on a sales deck.',
      attribution: 'Regulatory Affairs Lead — Orthopedic Instruments, EU',
    },
    beforeAfter: [
      { metric: 'Surgeon fit rating', before: 'N/A (new trial)', after: '14/15 "exact fit"' },
      { metric: 'Lead time', before: '4 weeks quoted domestically', after: '9 business days' },
      { metric: 'Next step', before: 'Prototype only', after: '200-unit pilot PO approved' },
    ],
    narrative: 'iteration',
    documentedBy: 'lisa-huang',
    datePublished: '2024-08-14',
    inspectionSampleHref: '/resources/inspection-samples/',
  },
  'aerospace-inconel-engine-bracket': {
    title: 'Inconel Brackets Survived 100 Cycles at 600°C — <0.02mm Creep',
    h1Title: 'Inconel Brackets Survived 100 Cycles at 600°C — <0.02mm Creep',
    clientProfile: {
      description: 'UAV propulsion program, flight-hardware supplier',
      region: 'USA',
      scale: '12 Inconel 718 brackets',
      scenario: 'Billet bracket for high-temp exhaust zone with AMS 5663 aging',
    },
    decision:
      'Casting could not meet grain-structure requirements. They selected us after reviewing a redacted AMS heat-treat chart and 100% bore CMM package from a similar Inconel job.',
    customerQuote: {
      text: 'Less than 0.02mm displacement after 100 thermal cycles — that is what our propulsion lead needed to freeze the bracket design for serial production.',
      attribution: 'Propulsion Engineer — UAV Manufacturer, USA',
    },
    beforeAfter: [
      { metric: 'Thermal displacement', before: 'Casting prototype failed at 40 cycles', after: '<0.02mm after 100 cycles' },
      { metric: 'Bore reporting', before: 'Sample inspection only', after: '100% CMM bore position' },
      { metric: 'Lead time', before: '12+ weeks (casting + rework)', after: '20 business days from billet' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2024-07-02',
  },
  'automotive-ev-battery-mount': {
    title: 'EV Battery Install Cut from 3 Hours to 45 Minutes',
    h1Title: 'EV Battery Install Cut from 3 Hours to 45 Minutes',
    clientProfile: {
      description: 'EV conversion specialist, low-volume vehicle builds',
      region: 'UK',
      scale: '80 mounting plates',
      scenario: 'Module-to-chassis alignment within 0.05mm for busbar routing',
    },
    decision:
      'First prototype build took 3 hours per vehicle due to busbar binding. They RFQ\'d plates with gauge fit-check — we included gauge correlation photos on the first article.',
    customerQuote: {
      text: 'Module installation dropped from three hours to 45 minutes. Zero alignment rework across 80 plates — that is what let us scale builds.',
      attribution: 'Build Lead — EV Conversion Shop, UK',
    },
    beforeAfter: [
      { metric: 'Install time per vehicle', before: '3 hours (prototype build)', after: '45 minutes' },
      { metric: 'Alignment rework', before: '2 vehicles reworked', after: '0 across batch' },
      { metric: 'Hardpoint alignment', before: '±0.1mm measured on prototype', after: 'Within 0.05mm spec' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2024-06-20',
  },
  'industrial-automation-gantry-plate': {
    title: 'Gantry Passed Squareness on First Build — Repeat Work Awarded',
    h1Title: 'Gantry Passed Squareness on First Build — Repeat Work Awarded',
    clientProfile: {
      description: 'Pick-and-place machine builder, 80 employees',
      region: 'Germany',
      scale: '24 large-format plates',
      scenario: '800×400mm plates with 60+ tapped holes and powder coat',
    },
    decision:
      'In-house manual machining could not hold diagonal perpendicularity. They trialed us on one machine model\'s plates before moving all structural sheet metal work.',
    customerQuote: {
      text: 'Squareness check passed on the first gantry build. We moved every structural plate on the next two machine models to them.',
      attribution: 'Mechanical Design Lead — Machine Builder, Germany',
    },
    beforeAfter: [
      { metric: 'Squareness check', before: 'Failed on 2 of 3 in-house builds', after: 'Passed first build' },
      { metric: 'Hole perpendicularity', before: 'Manual drill drift on diagonals', after: 'Held on CNC mill with dowel registration' },
      { metric: 'Supplier relationship', before: 'In-house + spot vendor', after: 'Preferred plate supplier (2 models)' },
    ],
    narrative: 'standard',
    documentedBy: 'wei-chen',
    datePublished: '2024-05-08',
  },
  'robotics-wire-edm-drive-gear': {
    title: '0.03mm Backlash on Hardened Gear — Design Frozen for Production',
    h1Title: '0.03mm Backlash on Hardened Gear — Design Frozen for Production',
    clientProfile: {
      description: 'Collaborative robot startup, joint drivetrain R&D',
      region: 'USA',
      scale: '8 prototype gears',
      scenario: 'Custom tooth profile after heat treat — no hob tooling at prototype qty',
    },
    decision:
      'Hob shops wanted $12k tooling for 8 pcs. Wire EDM after heat treat was the only economical path — we quoted DXF-driven erosion with backlash verification on the first article.',
    customerQuote: {
      text: 'Backlash came in at 0.03mm against our 0.05mm limit. We froze the tooth profile for production tooling without another prototype loop.',
      attribution: 'Drivetrain Engineer — Cobot Startup, USA',
    },
    beforeAfter: [
      { metric: 'Backlash', before: '0.05mm spec', after: '0.03mm measured' },
      { metric: 'Tooling cost', before: '$12k hob quote (8 pcs)', after: '$0 hob — wire EDM from DXF' },
      { metric: 'Design status', before: 'Open prototype loop', after: 'Frozen for production tooling' },
    ],
    narrative: 'iteration',
    documentedBy: 'wei-chen',
    datePublished: '2024-04-15',
  },
};

export function getCaseStudyEnrichment(slug: string): CaseStudyEnrichment | undefined {
  return caseStudyEnrichment[slug];
}
