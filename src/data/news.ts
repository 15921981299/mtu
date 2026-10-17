export type NewsArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  h1: string;
  description: string;
  category: 'Engine Programs' | 'Emission Systems' | 'Sourcing Practice';
  datePublished: string;
  dateModified: string;
  image: string;
  /** Where the factual claims in this note come from. Every article must cite at least one. */
  sources: { label: string; url: string }[];
  keyFacts: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: 'mtu-series-4000-engine-generations',
    title: 'MTU Series 4000 Engine Generations',
    seoTitle: 'MTU Series 4000 Engine Generations: What Changed for Parts Buyers',
    h1: 'MTU Series 4000 Engine Generations: What Changed, and What It Means for Parts',
    description:
      'From the 1996 launch of the first high-speed common-rail Series 4000 to the current M05: which engine generation you run decides which parts references apply.',
    category: 'Engine Programs',
    datePublished: '2026-10-17',
    dateModified: '2026-10-17',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    sources: [
      {
        label: 'mtu Solutions — Series 4000 (official product page)',
        url: 'https://www.mtu-solutions.com/eecis/en/applications/yacht/system-solutions/engines/mtu-series-4000.html',
      },
      {
        label: 'The Maritime Executive — MTU advanced design Series 4000 for IMO III and EPA Tier 4',
        url: 'https://maritime-executive.com/corporate/mtus-advanced-design-diesel-marine-engines-from-rolls-royce',
      },
    ],
    keyFacts: [
      'The first mtu Series 4000 marine engine was presented at the SMM exhibition in Hamburg in 1996 — the first high-speed diesel engine with common-rail fuel injection.',
      'More than 58,000 Series 4000 engines have been sold worldwide, with over 345 million operating hours fed back into development.',
      'From 2018 the advanced-design Series 4000 was offered for IMO III and EPA Tier 4, in 12-, 16- and a new 20-cylinder version, from 1,380 to 3,220 kW.',
      'Compared with the predecessor: NOx reduced by about 75% versus IMO II, particulates by about 65% versus EPA Tier 3, and fuel consumption about 5% lower.',
      'The current commercial-marine member of the family is the Series 4000 M05, which meets IMO III and EPA Tier 4 with SCR only — no diesel particulate filter is required.',
    ],
    sections: [
      {
        heading: 'Why the Generation Matters More Than the Badge',
        paragraphs: [
          'An engine described simply as "MTU 4000" can be a 1990s common-rail unit, a 2010s build, or an advanced-design engine sold from 2018 onwards with an SCR exhaust aftertreatment system. Those engines do not share one parts list. The fuel system, turbocharging, engine control and exhaust hardware changed between generations, and the part numbers changed with them.',
          'This is the single most common reason a 4000-series enquiry comes back as "not for your serial number". The model badge identifies the family; the engine serial number identifies the build. We quote from the serial number.',
        ],
      },
      {
        heading: 'What the 2018 Advanced-Design Change Brought',
        paragraphs: [
          'The advanced-design Series 4000 combined changes to the turbocharging system, the combustion process and the injection system with a newly developed mtu SCR system. The published figures are a NOx reduction of roughly 75% against IMO II, a particulate reduction of roughly 65% against EPA Tier 3, and about 5% lower fuel consumption than the preceding model. No additional diesel particulate filter is needed.',
          'For parts buyers this means a set of components that simply did not exist on earlier engines: the SCR box and its catalyst elements, the DEF (diesel exhaust fluid) dosing units, and the associated sensors and control hardware. A 1996-generation engine and a 2018-generation engine of the same cylinder count can therefore need completely different exhaust-side parts.',
        ],
      },
      {
        heading: 'The Current M05 Generation',
        paragraphs: [
          'The Series 4000 M05 is the latest commercial-marine member of the family. Its published development focus was life-cycle cost, performance and ease of maintenance: the piston-ring alloy was changed to reduce wear, the fuel filters were relocated for better service access, and the air filters were integrated into the engine outline to make the package more compact. Advanced simulation of the combustion process reduced particulate matter inside the engine, so only SCR is needed to meet IMO III and EPA Tier 4.',
          'Service-access changes are not cosmetic. When a filter moves position, the hoses, brackets and service kit contents around it change too. Ordering service items by "the usual number" without checking the generation is how workshops end up with a filter that no longer fits the housing.',
        ],
      },
      {
        heading: 'How to Identify Which Generation You Have',
        paragraphs: [
          'Send the engine serial number and, where the exhaust aftertreatment is involved, a photo of the SCR box and its type plate. The presence or absence of an SCR system is the fastest visual split between pre-2018 and post-2018 builds. If you are unsure whether your engine is IMO II or IMO III compliant, the answer almost always decides the exhaust-side parts.',
          'For generator and industrial installations the same rule applies: the engine serial number first, then the application. A 4000-series genset and a 4000-series propulsion unit of the same generation still differ in cooling, mounting and control parts.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are Series 4000 parts interchangeable between engine generations?',
        answer:
          'Some basic items are, but fuel-system, turbocharging, control and exhaust parts generally are not. The 1996 introduction brought common-rail injection, and the 2018 advanced design changed the turbocharging, combustion, injection and added an SCR system. Always quote the engine serial number rather than the family name.',
      },
      {
        question: 'How do I know whether my Series 4000 needs SCR parts?',
        answer:
          'If the engine was built to IMO III or EPA Tier 4, it will have an mtu SCR exhaust aftertreatment system with DEF dosing. The SCR box type plate identifies the system. A photo of the installation plus the engine serial number is usually enough for us to confirm the correct references.',
      },
      {
        question: 'Does an IMO III Series 4000 need a diesel particulate filter?',
        answer:
          'According to mtu, no. The advanced-design Series 4000 and the current M05 meet IMO III and EPA Tier 4 with SCR only; the in-engine combustion changes reduced particulate matter enough that an additional DPF is not required.',
      },
      {
        question: 'I only have the model name, not the serial number. Can you still quote?',
        answer:
          'We can shortlist candidates, but we will not confirm a part number without the serial number. Two engines with the same model name can have different CPL-equivalent build states, and the parts that differ are exactly the expensive ones.',
      },
    ],
    related: [
      { label: 'MTU 4000 parts catalog', href: '/part-products/catalog/mtu-4000-series/' },
      { label: 'MTU spare parts overview', href: '/products/mtu-spare-parts/' },
      { label: 'Genuine, OEM-quality and aftermarket routes', href: '/genuine-oem-parts/' },
      { label: 'Regularly sourced MTU parts', href: '/products/mtu-spare-parts/regularly-sourced-parts/' },
    ],
  },
  {
    slug: 'imo-iii-epa-tier-4-scr-parts-list',
    title: 'IMO III and EPA Tier 4: What SCR Adds to the Parts List',
    seoTitle: 'IMO III / EPA Tier 4 SCR Systems: The Parts They Add to Your List',
    h1: 'IMO III and EPA Tier 4: What the SCR System Adds to Your Parts List',
    description:
      'SCR exhaust aftertreatment adds catalyst elements, DEF dosing units and sensor hardware to marine and industrial engines — and a maintenance pattern that most parts lists are not yet built for.',
    category: 'Emission Systems',
    datePublished: '2026-10-17',
    dateModified: '2026-10-17',
    image: '/images/engine-parts-sensors-catalog.webp',
    sources: [
      {
        label: 'mtu Solutions — Series 4000 with integrated SCR system (official product page)',
        url: 'https://www.mtu-solutions.com/eecis/en/applications/yacht/system-solutions/engines/mtu-series-4000.html',
      },
      {
        label: 'Rolls-Royce — EPA Tier 4 MTU Series 4000 with SCR on the ferry Pyxis',
        url: 'https://rolls-royce.production.investis.com/media/our-stories/discover/2019/ship-of-the-year-2020.aspx',
      },
    ],
    keyFacts: [
      'The mtu SCR system is built around a compact SCR box with maintenance doors that allow the catalyst elements to be replaced.',
      'Two DEF (diesel exhaust fluid) dosing units are built into the SCR box, working airlessly, with an integrated mixing pipe.',
      'Emissions are measured upstream and downstream of the SCR system and the reactant quantity is regulated in a closed loop, so ammonia slip is prevented under all operating conditions.',
      'The SCR system is adjustable rather than preset, so it can be switched on and off as a vessel moves between emission controlled areas.',
      'EPA Tier 4 came into force in the United States on 1 January 2016, demanding substantially lower NOx, particulate and hydrocarbon emissions than the previous requirements.',
    ],
    sections: [
      {
        heading: 'A New Maintenance Category on an Old Engine Family',
        paragraphs: [
          'Emission aftertreatment turned the exhaust side of a diesel engine into a consumable-bearing system. On an IMO II or EPA Tier 3 engine, the exhaust path was pipework and a silencer. On an IMO III or EPA Tier 4 engine with SCR, it is a catalyst box, dosing units, a mixing pipe and a sensor set — each with its own service life and its own part number.',
          'Operators who planned maintenance around filters, belts, injectors and overhaul kits often find that the aftertreatment is the first system to catch them out, because it was never on the original list.',
        ],
      },
      {
        heading: 'The Parts SCR Adds',
        paragraphs: [
          'The published mtu design puts two DEF dosing units inside the SCR box, working airlessly, with an integrated mixing pipe that saves installation space. The catalyst elements are reached through maintenance doors, which are there specifically so the elements can be exchanged. Emissions are measured on both sides of the system and the reactant dose is regulated in a closed loop.',
          'In practice, that gives you four groups of parts that did not exist before: catalyst elements, dosing-unit components, the sensor set that feeds the closed loop, and the seals, clamps and bellows that hold the box and pipework together. On a vessel that cycles in and out of emission controlled areas, the dosing hardware works harder than on one that runs permanently inside them.',
        ],
      },
      {
        heading: 'Why the System Is Adjustable, and What That Means for Spares',
        paragraphs: [
          'The mtu SCR system is not preset as is usually the case; it measures emissions upstream and downstream and regulates the amount of reactant introduced. It can also be switched on and off as required — for example when a vessel travels from one emission controlled area into another.',
          'For spares planning, this means duty cycle matters more than calendar time. Two identical engines on different routes will not consume dosing hardware at the same rate. Tell us the operating profile when you ask for an aftertreatment quote, not just the engine model.',
        ],
      },
      {
        heading: 'What to Send With an Aftertreatment Enquiry',
        paragraphs: [
          'Send the engine serial number, a photo of the SCR box type plate, and the vessel or installation duty profile. Where a catalyst element is involved, the box arrangement — vertical, horizontal or cube — affects the part. If you have fault codes from the engine control or monitoring system, include them: they usually identify which sensor or actuator failed.',
          'We quote aftertreatment items with the same supply-route labelling as mechanical parts: genuine, OEM-quality alternative, or remanufactured where a route exists. Where no alternative exists for a catalyst or dosing component, we say so rather than offering a substitute.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which SCR parts are consumable and which are long-life?',
        answer:
          'Catalyst elements and dosing-unit wear components are the consumable side; the box, mixing pipe and mounting hardware are long-life. Actual service intervals depend on duty cycle and on how often the system runs, so we quote against your operating profile rather than a fixed hours figure.',
      },
      {
        question: 'Can I run an IMO III engine without the SCR system?',
        answer:
          'The system can be switched on and off, which is useful when a vessel moves between emission controlled areas. Whether that is permitted for your installation is a regulatory question for your flag state and operating area, not a parts question — we supply the hardware and confirm references.',
      },
      {
        question: 'Are SCR parts available as aftermarket alternatives?',
        answer:
          'Catalyst and dosing components are far more system-specific than filters or gaskets, so the alternative market is thin. We label each line with its supply route and tell you plainly when only the genuine part exists.',
      },
      {
        question: 'Do I need the SCR serial number as well as the engine number?',
        answer:
          'Yes, where the box is involved. The engine serial number identifies the engine; the SCR box type plate identifies the aftertreatment build and arrangement. A photo of that plate is the quickest way to avoid an incorrect catalyst or dosing reference.',
      },
    ],
    related: [
      { label: 'MTU sensors and electrical parts', href: '/part-products/catalog/mtu-sensors/' },
      { label: 'Marine engine service', href: '/capabilities/marine-engine-service/' },
      { label: 'MTU Series 4000 engine generations', href: '/news/mtu-series-4000-engine-generations/' },
      { label: 'Search all part numbers', href: '/part-number-index/' },
    ],
  },
  {
    slug: 'fuel-sulfur-limits-and-emission-system-parts',
    title: 'Fuel Sulfur and Emission Systems',
    seoTitle: 'Fuel Sulfur Limits: Why 15 ppm Matters When You Order Engine Parts',
    h1: 'Fuel Sulfur and Emission Systems: Why 15 ppm Matters When You Order Parts',
    description:
      'EGR and SCR take opposite positions on fuel quality. Knowing which system your engine uses — and what sulfur level it sees — prevents a class of failures that are usually blamed on the wrong component.',
    category: 'Sourcing Practice',
    datePublished: '2026-10-17',
    dateModified: '2026-10-17',
    image: '/images/engine-parts-verification-desk.webp',
    sources: [
      {
        label: 'mtu Solutions — Series 4000: EGR fuel-quality requirement and SCR preference (official product page)',
        url: 'https://www.mtu-solutions.com/eecis/en/applications/yacht/system-solutions/engines/mtu-series-4000.html',
      },
    ],
    keyFacts: [
      'With EGR (exhaust gas recirculation) technology, fuel containing more than 15 ppm sulfur leads to the formation of sulfuric acid in the EGR cooling process.',
      'Sulfuric acid formed that way will cause substantial engine failures over time.',
      'Because many vessels operate worldwide — particularly in offshore service and supply — mtu evaluates SCR as the preferred solution to maintain engine reliability.',
      'SCR technology allows operation with lower fuel quality than EGR requires.',
      'mtu also points to power-to-X e-fuels (e-methane, e-methanol, e-diesel) produced from green electricity and captured CO2 as a route to cleaner internal combustion engines.',
    ],
    sections: [
      {
        heading: 'Two Routes to the Same Regulation, Opposite Fuel Requirements',
        paragraphs: [
          'IMO III and EPA Tier 4 can be met either by treating the exhaust — SCR — or by changing the combustion — EGR. The two routes make very different demands on fuel. Where EGR is used, fuel with more than 15 ppm sulfur forms sulfuric acid during EGR cooling, and that acid causes substantial engine failures over time.',
          'SCR avoids that dependency. Because many vessels trade worldwide and cannot guarantee a low-sulfur supply at every bunkering port, mtu evaluates SCR as the preferred solution for offshore service and supply operations, since it allows operation with lower fuel quality.',
        ],
      },
      {
        heading: 'Why This Shows Up as a Parts Problem',
        paragraphs: [
          'Fuel-driven damage rarely announces itself as a fuel problem. Acid formation in an EGR circuit attacks coolers, charge-air components and the parts downstream of them. The symptom is a failed component; the cause is the fuel. Replacing the failed part without addressing the fuel quality just restarts the clock.',
          'When you order an EGR-circuit cooler, seal or charge-air component, tell us the fuel sulfur level the engine actually sees. It changes the advice we can give, not just the part number.',
        ],
      },
      {
        heading: 'What to Record Before You Order',
        paragraphs: [
          'Record the emission route the engine uses — SCR, EGR, or neither — from the build data rather than assuming it from the model. Note the fuel specification in normal service and, for vessels that trade across regions, the worst-case supply rather than the best. Add the running hours since the last aftertreatment or EGR-circuit service.',
          'This takes a few minutes and prevents the most expensive category of parts mistake: fitting a correct part into an engine that will destroy it again.',
        ],
      },
      {
        heading: 'How We Handle It',
        paragraphs: [
          'We label each quotation line with its supply route and confirm references against the engine serial number. Where a requested part is known to be sensitive to fuel quality or duty cycle, we say so in the quotation rather than shipping silently. We do not present a catalog listing as a stock report: availability is confirmed per enquiry.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does my engine use SCR or EGR?',
        answer:
          'The build data and the engine serial number decide it, not the model name. Physically, an SCR engine has an exhaust aftertreatment box with DEF dosing; an EGR engine routes cooled exhaust gas back into the intake. If you are unsure, send a photo of the installation and the serial number.',
      },
      {
        question: 'What happens if an EGR engine runs on higher-sulfur fuel?',
        answer:
          'Per mtu, fuel above 15 ppm sulfur leads to sulfuric acid formation in the EGR cooling process, which causes substantial engine failures over time. The damage appears in coolers, charge-air components and downstream parts, so it is usually diagnosed as a component failure rather than a fuel issue.',
      },
      {
        question: 'Can I switch an EGR engine to SCR?',
        answer:
          'That is an engineering conversion question for the engine manufacturer or your class society, not a parts question. We supply parts for the configuration your engine already has and confirm references against the serial number.',
      },
      {
        question: 'Do you stock emission-system parts?',
        answer:
          'We do not present a catalog listing as a stock report. Availability, lead time and supplied condition are confirmed for each enquiry after the part number and engine serial number are checked, and each quotation line is labelled with its supply route.',
      },
    ],
    related: [
      { label: 'MTU Series 4000 engine generations', href: '/news/mtu-series-4000-engine-generations/' },
      { label: 'IMO III and EPA Tier 4 SCR parts', href: '/news/imo-iii-epa-tier-4-scr-parts-list/' },
      { label: 'Genuine, OEM-quality and aftermarket routes', href: '/genuine-oem-parts/' },
      { label: 'How to source MTU parts', href: '/how-to-source-mtu-parts/' },
    ],
  },
];

export const getNewsArticle = (slug: string) => newsArticles.find((article) => article.slug === slug);
