type IndustryItem = {
  slug: string;
  title: string;
  icon: string;
  image: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  materialSlugs: string[];
  capabilitySlugs: string[];
  content: {
    partOne: string;
    partTwo: string;
  };
};

export const industries: IndustryItem[] = [
  {
    slug: 'marine',
    title: 'Marine',
    icon: '/images/industries/cnc-machining-oil-gas-industry.jpg',
    image: '/images/engine-parts-sensors-catalog.png',
    seoTitle: 'Marine Engine Parts & Service | Engine Family',
    h1Title: 'Marine Engine Parts & Service',
    summary:
      'Genuine MTU and diesel engine parts for navy, coast guard, ferries, yachts, shipyards, and offshore vessels.',
    materialSlugs: ['stainless-steel', 'brass-copper'],
    capabilitySlugs: ['marine-engine-service', 'mtu-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Marine Engine Parts</h2>
        <p>Engine Family supplies engine parts for vessel operators and marine service companies that need correct parts, fast communication, and reliable delivery.</p>
        <h3>Marine Users</h3>
        <ul>
          <li>Navy and coast guard fleets</li>
          <li>Ferries, yachts, shipyards, and repair companies</li>
          <li>Offshore and harbor service vessels</li>
        </ul>
      `,
      partTwo: `
        <h2>Fast Global Delivery</h2>
        <p>We help confirm part numbers and arrange export shipment to the repair yard, vessel operator, or maintenance warehouse.</p>
        <p><a href="/contact/">Send a marine parts inquiry</a></p>
      `,
    },
  },
  {
    slug: 'industrial-engines',
    title: 'Industrial Engines',
    icon: '/images/industries/cnc-machining-industrial-automation.jpg',
    image: '/images/engine-parts-hero.png',
    seoTitle: 'Industrial Engine Parts | Engine Family',
    h1Title: 'Industrial Engine Parts',
    summary:
      'Parts sourcing for diesel engines used in pumps, compressors, heavy machinery, oilfield units, and industrial power systems.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['industrial-engine-service', 'cummins-engine-parts', 'deutz-engine-parts'],
    content: {
      partOne: `
        <h2>Industrial Engine Support</h2>
        <p>Industrial downtime is expensive. We support maintenance teams with engine parts identification, stock checks, and practical shipping options.</p>
        <h3>Applications</h3>
        <ul>
          <li>Pumps, compressors, and drilling units</li>
          <li>Construction and heavy equipment</li>
          <li>Industrial generator and power packages</li>
        </ul>
      `,
      partTwo: `
        <h2>What We Need</h2>
        <p>Send engine model, serial number, part number, photos, quantity, and required delivery date for a fast response.</p>
        <p><a href="/contact/">Request industrial engine parts</a></p>
      `,
    },
  },
  {
    slug: 'power-generation',
    title: 'Power Generation',
    icon: '/images/industries/cnc-machining-renewable-energy.jpg',
    image: '/images/engine-parts-verification-desk.png',
    seoTitle: 'Generator Engine Parts | Engine Family',
    h1Title: 'Power Generation Engine Parts',
    summary:
      'Diesel engine spare parts for generator sets, standby power, prime power, and power plant maintenance programs.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'cummins-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Generator Engine Parts</h2>
        <p>We support generator operators with service parts and overhaul components for MTU, Cummins, DEUTZ, and related diesel engines.</p>
        <h3>Typical Requirements</h3>
        <ul>
          <li>Routine maintenance kits and filters</li>
          <li>Fuel, cooling, lubrication, and control parts</li>
          <li>Critical spares for standby and prime-power engines</li>
        </ul>
      `,
      partTwo: `
        <h2>Planned Maintenance or Breakdown</h2>
        <p>Whether you are stocking a maintenance warehouse or responding to an outage, we help quote the correct parts and shipping route.</p>
        <p><a href="/contact/">Ask for generator engine support</a></p>
      `,
    },
  },
  {
    slug: 'rail',
    title: 'Rail',
    icon: '/images/industries/cnc-machining-automotive-industry.jpg',
    image: '/images/cnc-turning-service-capability.webp',
    seoTitle: 'Rail Diesel Engine Parts | Engine Family',
    h1Title: 'Rail Diesel Engine Parts',
    summary:
      'Engine parts support for rail traction, locomotive auxiliary systems, and fleet maintenance programs.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Rail Engine Parts</h2>
        <p>Engine Family supports rail-related engine parts inquiries for operators and maintenance contractors handling scheduled fleet service and urgent repairs.</p>
        <h3>Support Scope</h3>
        <ul>
          <li>MTU and Detroit Diesel related rail engine parts</li>
          <li>Maintenance and overhaul components</li>
          <li>Part-number confirmation for older engine platforms</li>
        </ul>
      `,
      partTwo: `
        <h2>Order Support</h2>
        <p>Share engine data and part lists so we can check availability and quote delivery options.</p>
        <p><a href="/contact/">Request rail engine parts</a></p>
      `,
    },
  },
  {
    slug: 'shipyards-repair',
    title: 'Shipyards & Repair',
    icon: '/images/industries/cnc-machining-medical-device-industry.jpg',
    image: '/images/engine-parts-verification-desk.png',
    seoTitle: 'Shipyard Diesel Engine Parts | Engine Family',
    h1Title: 'Shipyard & Repair Engine Parts',
    summary:
      'Consolidated spare-parts sourcing for shipyards, engine repair companies, and overhaul contractors.',
    materialSlugs: ['stainless-steel', 'brass-copper'],
    capabilitySlugs: ['marine-engine-service', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>Shipyard Parts Support</h2>
        <p>Repair schedules move quickly. We help shipyards and engine service companies consolidate urgent spare-parts lists and confirm correct replacements.</p>
        <h3>Useful for</h3>
        <ul>
          <li>Engine overhaul and repair projects</li>
          <li>Docking maintenance parts lists</li>
          <li>Multi-engine spare-parts consolidation</li>
        </ul>
      `,
      partTwo: `
        <h2>One Inquiry, Many Parts</h2>
        <p>Send your complete parts list and quantities. We will quote availability, alternatives where relevant, and shipment timing.</p>
        <p><a href="/contact/">Send a shipyard parts list</a></p>
      `,
    },
  },
  {
    slug: 'energy-suppliers',
    title: 'Energy Suppliers',
    icon: '/images/industries/cnc-machining-robotics-industry.jpg',
    image: '/images/material-sourcing-service.webp',
    seoTitle: 'Engine Parts for Energy Suppliers | Engine Family',
    h1Title: 'Engine Parts for Energy Suppliers',
    summary:
      'Spare-parts sourcing for energy companies operating diesel engines in remote, standby, offshore, and industrial power environments.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['industrial-engine-service', 'mtu-engine-parts', 'cummins-engine-parts'],
    content: {
      partOne: `
        <h2>Engine Parts for Energy Operations</h2>
        <p>Energy suppliers need dependable spare-parts channels for remote sites, standby systems, and industrial power units. We help source and ship the correct components worldwide.</p>
        <h3>Common Requests</h3>
        <ul>
          <li>Critical spares for MTU, Cummins, and DEUTZ engines</li>
          <li>Generator maintenance and overhaul components</li>
          <li>Export packing for remote project destinations</li>
        </ul>
      `,
      partTwo: `
        <h2>Global Shipment Coordination</h2>
        <p>Tell us your site location, urgency, and required documentation. We will quote parts and logistics together.</p>
        <p><a href="/contact/">Request energy engine parts</a></p>
      `,
    },
  },
];
