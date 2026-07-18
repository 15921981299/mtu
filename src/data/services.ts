type ServiceItem = {
  slug: string;
  title: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  image: string;
  mainImage: string;
  secondImage: string;
};

export const services: ServiceItem[] = [
  {
    slug: 'mtu-engine-parts',
    title: 'MTU Engine Parts',
    seoTitle: 'MTU Engine Parts Supplier | Diesel Part Source',
    h1Title: 'Verified MTU Engine Parts Supply',
    summary:
      'Full-range MTU spare parts for series 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 engines with verified sourcing routes and global delivery.',
    image: '/images/mtu-engine-parts-hero.webp',
    mainImage: '/images/mtu-2000-series-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'cummins-engine-parts',
    title: 'Cummins Engine Parts',
    seoTitle: 'Cummins Engine Parts Supplier | Diesel Part Source',
    h1Title: 'Cummins Diesel Engine Parts',
    summary:
      'Supply support for Cummins diesel engines and verified replacement routes for industrial, marine, generator, and equipment maintenance programs.',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/generator-engine-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'deutz-engine-parts',
    title: 'DEUTZ Engine Parts',
    seoTitle: 'DEUTZ Engine Parts Supplier | Diesel Part Source',
    h1Title: 'DEUTZ Diesel Engine Parts',
    summary:
      'DEUTZ replacement parts and engine support for construction machinery, power units, pumps, compressors, and industrial fleets.',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/mtu-part-number-verification.webp',
    secondImage: '/images/global-engine-parts-delivery.webp',
  },
  {
    slug: 'industrial-engine-service',
    title: 'Industrial Engine Service',
    seoTitle: 'Industrial Diesel Engine Service & Parts | Diesel Part Source',
    h1Title: 'Industrial Engine Service & Support',
    summary:
      'Parts sourcing and technical support for engines used in pumps, compressors, heavy equipment, oilfield units, and industrial power systems.',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/generator-engine-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'marine-engine-service',
    title: 'Marine Engine Service',
    seoTitle: 'Marine Diesel Engine Parts & Service | Diesel Part Source',
    h1Title: 'Marine Engine Parts & Service',
    summary:
      'Verified MTU spare-parts sourcing for naval, coast guard, ferry, yacht, shipyard, and offshore engine users with urgent global shipment support.',
    image: '/images/marine-diesel-engine-parts.webp',
    mainImage: '/images/mtu-engine-parts-hero.webp',
    secondImage: '/images/global-engine-parts-delivery.webp',
  },
  {
    slug: 'genuine-oem-parts',
    title: 'Verified OEM Sourcing',
    seoTitle: 'Verified OEM Diesel Engine Parts Sourcing | Diesel Part Source',
    h1Title: 'Verified OEM Parts Sourcing',
    summary:
      'OEM, OEM-alternative, reman, and replacement sourcing routes from O-rings to crankshafts, clearly labelled for maintenance, overhaul, and fleet operation.',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    mainImage: '/images/mtu-engine-parts-hero.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
];

export function getServiceDetailHtml(title: string) {
  const details: Record<string, { partOne: string; partTwo: string }> = {
    'MTU Engine Parts': {
      partOne: `
        <h2>MTU Full-Series Spare Parts</h2>
        <p>Diesel Part Source specializes in supplying MTU engine parts for classic and current engine families, including 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 series engines. We support maintenance teams that need clear identification, labelled sourcing routes, and fast shipment.</p>
        <h3>Typical MTU Parts</h3>
        <ul>
          <li>Filters, seals, O-rings, gaskets, and overhaul kits</li>
          <li>Fuel pumps, injectors, pressure sensors, and control components</li>
          <li>Valve guides, pistons, liners, bearings, crankshafts, and cylinder heads</li>
          <li>Cooling, turbocharging, exhaust, and electrical components</li>
        </ul>
      `,
      partTwo: `
        <h2>Identification Support</h2>
        <p>Send your engine model, serial number, part number, nameplate photo, or old part photo. Our team helps confirm the correct MTU part before shipment so you avoid downtime caused by mismatched spares.</p>
        <h3>Global Delivery</h3>
        <p>We arrange express and freight shipment worldwide from Shanghai. Urgent vessel, generator, and industrial shutdown requirements are prioritized.</p>
        <p><a href="/contact/">Send your MTU parts inquiry</a></p>
      `,
    },
    'Cummins Engine Parts': {
      partOne: `
        <h2>Cummins Diesel Engine Parts</h2>
        <p>We supply Cummins diesel engine parts for industrial machines, generator sets, marine equipment, and field maintenance teams that need reliable parts sourcing and responsive quotation support.</p>
        <h3>What We Source</h3>
        <ul>
          <li>Routine service parts and maintenance kits</li>
          <li>Fuel, air, cooling, and lubrication system components</li>
          <li>Electrical sensors, control units, and replacement assemblies</li>
        </ul>
      `,
      partTwo: `
        <h2>Quote Requirements</h2>
        <p>Share the Cummins engine model, CPL number, serial number, and required quantity. We will confirm availability, lead time, and shipping options.</p>
        <p><a href="/contact/">Request Cummins parts availability</a></p>
      `,
    },
    'DEUTZ Engine Parts': {
      partOne: `
        <h2>DEUTZ Engine Parts</h2>
        <p>Diesel Part Source supports DEUTZ diesel engines used in construction machinery, compressors, pumps, and industrial equipment. We help buyers identify parts and consolidate orders for scheduled maintenance or urgent repair.</p>
        <h3>Supply Scope</h3>
        <ul>
          <li>Filters, belts, seals, gaskets, and service kits</li>
          <li>Fuel injection, cooling, lubrication, and electrical parts</li>
          <li>Overhaul components for planned maintenance programs</li>
        </ul>
      `,
      partTwo: `
        <h2>Reliable Sourcing</h2>
        <p>Send your DEUTZ engine model and part numbers. We verify compatibility and provide practical shipment options for your destination.</p>
        <p><a href="/contact/">Request DEUTZ parts support</a></p>
      `,
    },
    'Industrial Engine Service': {
      partOne: `
        <h2>Industrial Engine Support</h2>
        <p>Industrial equipment cannot wait for unclear sourcing. We help maintenance teams find engine parts for pumps, compressors, drilling units, heavy machinery, and generator packages.</p>
        <h3>Support Areas</h3>
        <ul>
          <li>Parts identification from engine plates and old part markings</li>
          <li>Stock check, replacement recommendation, and order consolidation</li>
          <li>Export packing and international logistics coordination</li>
        </ul>
      `,
      partTwo: `
        <h2>Built Around Downtime</h2>
        <p>Tell us the engine model, failure part, and target delivery date. We will prioritize critical spares and help you choose the fastest practical logistics route.</p>
        <p><a href="/contact/">Ask for industrial engine support</a></p>
      `,
    },
    'Marine Engine Service': {
      partOne: `
        <h2>Marine Engine Parts & Service</h2>
        <p>We support verified MTU parts sourcing for naval vessels, coast guard fleets, ferries, yachts, shipyards, and offshore equipment. MTU 2000, 4000, 595, 956, 1163, and related series are common request areas.</p>
        <h3>Marine Buyers We Serve</h3>
        <ul>
          <li>Navy, coast guard, and law-enforcement vessel operators</li>
          <li>Ferry companies, yacht maintenance teams, and shipyards</li>
          <li>Offshore, harbor, and commercial marine service providers</li>
        </ul>
      `,
      partTwo: `
        <h2>Urgent Shipment Support</h2>
        <p>Marine breakdowns are time-sensitive. We help confirm correct parts quickly and coordinate export documentation, express delivery, or freight shipment to the vessel or repair yard.</p>
        <p><a href="/contact/">Send a marine parts inquiry</a></p>
      `,
    },
    'Verified OEM Sourcing': {
      partOne: `
        <h2>OEM and Replacement Route Review</h2>
        <p>From O-rings to crankshafts, Diesel Part Source helps buyers compare practical supply routes for MTU, Detroit Diesel, Cummins, and DEUTZ engines. Quotes identify OEM, OEM-alternative, reman, repaired, or replacement routes when they apply.</p>
        <h3>Why Route Clarity Matters</h3>
        <ul>
          <li>Correct fit and reliable service life</li>
          <li>Reduced risk during overhaul and fleet maintenance</li>
          <li>Clearer replacement decisions before payment or dispatch</li>
        </ul>
      `,
      partTwo: `
        <h2>How to Request Parts</h2>
        <p>Provide the part number, engine model, nameplate photo, old part photo, and quantity. We check stock, verify replacement options, and quote shipping with clear notes on the available route.</p>
        <p><a href="/contact/">Request verified parts sourcing</a></p>
      `,
    },
  };

  return details[title] || {
    partOne: `<h2>${title}</h2><p>Diesel Part Source supplies diesel engine parts and service support for global marine and industrial users.</p>`,
    partTwo: `<h3>Get Support</h3><p><a href="/contact/">Contact us with your engine model and part number</a>.</p>`,
  };
}
