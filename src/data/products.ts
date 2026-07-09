type ProductItem = {
  slug: string;
  title: string;
  image: string;
  mainImage: string;
  secondImage: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  materialSlugs: string[];
  capabilitySlugs: string[];
  tolerance: string;
  leadTime: string;
  content: {
    partOne: string;
    partTwo: string;
  };
};

export const products: ProductItem[] = [
  {
    slug: 'mtu-spare-parts',
    title: 'MTU Spare Parts',
    image: '/images/cnc-machined-stainless-steel-parts.jpg',
    mainImage: '/images/precision-cnc-machined-parts-collection.jpg',
    secondImage: '/images/cnc-machining-inspection-report.jpg',
    seoTitle: 'MTU Spare Parts Supplier | Engine Family',
    h1Title: 'MTU Spare Parts',
    summary:
      'Genuine MTU parts for 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 series engines.',
    materialSlugs: ['stainless-steel', 'carbon-steel', 'brass-copper'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service', 'genuine-oem-parts'],
    tolerance: 'Verified by part number, engine model, and serial number',
    leadTime: 'Stock items ship quickly; special items quoted by availability',
    content: {
      partOne: `
        <h2>MTU Spare Parts Supply</h2>
        <p>Engine Family specializes in MTU engine spare parts for marine, industrial, rail, and power generation users. We support both routine service orders and urgent downtime requests.</p>
        <h3>Common Requests</h3>
        <ul>
          <li>Filters, seals, gaskets, O-rings, and maintenance kits</li>
          <li>Injectors, fuel pumps, sensors, valves, guides, and cooling parts</li>
          <li>Pistons, liners, bearings, crankshafts, and overhaul components</li>
        </ul>
      `,
      partTwo: `
        <h2>How We Verify MTU Parts</h2>
        <p>Send the part number, engine series, engine serial number, and photos when available. We confirm the correct item before quotation and shipment.</p>
        <p><a href="/contact/">Request MTU spare parts</a></p>
      `,
    },
  },
  {
    slug: 'mtu-2000-series-parts',
    title: 'MTU 2000 Series Parts',
    image: '/images/cnc-turning-cylindrical-parts.jpg',
    mainImage: '/images/cnc-machined-stainless-steel-parts.jpg',
    secondImage: '/images/precision-micrometer-measurement.jpg',
    seoTitle: 'MTU 2000 Series Parts | Engine Family',
    h1Title: 'MTU 2000 Series Engine Parts',
    summary:
      'Parts support for MTU 2000 series engines used in marine propulsion, generator sets, and industrial power units.',
    materialSlugs: ['stainless-steel', 'carbon-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service'],
    tolerance: 'Model and serial-number verification',
    leadTime: 'Stock and urgent delivery options available',
    content: {
      partOne: `
        <h2>MTU 2000 Series Parts</h2>
        <p>The MTU 2000 series is widely used in marine, power generation, and industrial applications. We help maintenance teams source genuine and OEM manufacturer parts for planned service and breakdown repair.</p>
        <h3>Part Categories</h3>
        <ul>
          <li>Fuel injection and engine control components</li>
          <li>Cooling, lubrication, sealing, and filtration parts</li>
          <li>Overhaul components and wear parts</li>
        </ul>
      `,
      partTwo: `
        <h2>Fast Identification</h2>
        <p>Share the engine model, serial number, and required part numbers. If you only have the old part, send clear photos and markings.</p>
        <p><a href="/contact/">Check MTU 2000 series availability</a></p>
      `,
    },
  },
  {
    slug: 'mtu-4000-series-parts',
    title: 'MTU 4000 Series Parts',
    image: '/images/5-axis-cnc-complex-parts.jpg',
    mainImage: '/images/cnc-machining-quality-inspection.webp',
    secondImage: '/images/cmm-coordinate-measuring-inspection.jpg',
    seoTitle: 'MTU 4000 Series Parts | Engine Family',
    h1Title: 'MTU 4000 Series Engine Parts',
    summary:
      'Genuine MTU 4000 series parts for marine, generator, rail, and industrial engines, with worldwide shipment from Shanghai.',
    materialSlugs: ['stainless-steel', 'carbon-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],
    tolerance: 'Part-number and application verification',
    leadTime: 'Quoted by stock, urgency, and shipping destination',
    content: {
      partOne: `
        <h2>MTU 4000 Series Parts</h2>
        <p>We supply MTU 4000 series spare parts for demanding fleets and engine rooms where downtime is expensive. Our team helps confirm correct replacements and coordinate export logistics.</p>
        <h3>Common Parts</h3>
        <ul>
          <li>Fuel system components, pumps, sensors, and control parts</li>
          <li>Cylinder-head, valve-train, piston, liner, and bearing parts</li>
          <li>Turbocharging, cooling, lubrication, and filtration components</li>
        </ul>
      `,
      partTwo: `
        <h2>For Fleet Maintenance</h2>
        <p>We support repeat orders and consolidated spare-parts lists for vessel, power plant, and industrial maintenance programs.</p>
        <p><a href="/contact/">Request MTU 4000 parts</a></p>
      `,
    },
  },
  {
    slug: 'detroit-diesel-parts',
    title: 'Detroit Diesel Parts',
    image: '/images/cnc-machined-aluminum-parts.jpg',
    mainImage: '/images/cnc-machined-brass-copper-parts.jpg',
    secondImage: '/images/material-sourcing-service.webp',
    seoTitle: 'Detroit Diesel Parts Supplier | Engine Family',
    h1Title: 'Detroit Diesel Engine Parts',
    summary:
      'Detroit Diesel engine parts support for legacy and related MTU engine applications, maintenance, and overhaul programs.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: 'Verified by engine and part reference',
    leadTime: 'Availability confirmed after inquiry',
    content: {
      partOne: `
        <h2>Detroit Diesel Parts</h2>
        <p>Engine Family supports Detroit Diesel parts requests for maintenance teams handling older engine platforms and MTU-related applications.</p>
        <h3>Inquiry Details</h3>
        <ul>
          <li>Engine model and serial number</li>
          <li>Part number or old part photos</li>
          <li>Quantity, destination, and target delivery date</li>
        </ul>
      `,
      partTwo: `
        <h2>Replacement Confirmation</h2>
        <p>Where superseded or replacement part numbers exist, we help confirm practical options before order placement.</p>
        <p><a href="/contact/">Request Detroit Diesel parts</a></p>
      `,
    },
  },
  {
    slug: 'cummins-parts',
    title: 'Cummins Parts',
    image: '/images/precision-cnc-machined-parts-collection.jpg',
    mainImage: '/images/cnc-turning-cylindrical-parts.jpg',
    secondImage: '/images/cnc-machining-quality-vision.webp',
    seoTitle: 'Cummins Parts Supplier | Engine Family',
    h1Title: 'Cummins Diesel Engine Parts',
    summary:
      'Cummins service parts, overhaul components, and replacement assemblies for generator, marine, and industrial engines.',
    materialSlugs: ['carbon-steel', 'stainless-steel', 'brass-copper'],
    capabilitySlugs: ['cummins-engine-parts', 'industrial-engine-service'],
    tolerance: 'CPL, model, and serial number verification',
    leadTime: 'Stock and sourcing options quoted per item',
    content: {
      partOne: `
        <h2>Cummins Parts</h2>
        <p>We source Cummins engine parts for service companies, fleet owners, generator operators, and industrial maintenance teams.</p>
        <h3>Typical Categories</h3>
        <ul>
          <li>Filters, belts, gaskets, seals, and maintenance kits</li>
          <li>Fuel injection, turbocharging, cooling, and lubrication parts</li>
          <li>Electrical sensors, control components, and overhaul items</li>
        </ul>
      `,
      partTwo: `
        <h2>What to Send</h2>
        <p>For faster quotation, include engine model, CPL, serial number, part number, quantity, and delivery country.</p>
        <p><a href="/contact/">Check Cummins parts</a></p>
      `,
    },
  },
  {
    slug: 'deutz-parts',
    title: 'DEUTZ Parts',
    image: '/images/cnc-machined-brass-copper-parts.jpg',
    mainImage: '/images/precision-grinding-service-capability.webp',
    secondImage: '/images/cnc-parts-quality-inspection.jpg',
    seoTitle: 'DEUTZ Parts Supplier | Engine Family',
    h1Title: 'DEUTZ Diesel Engine Parts',
    summary:
      'DEUTZ replacement parts and maintenance support for construction equipment, industrial units, pumps, and compressors.',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['deutz-engine-parts', 'industrial-engine-service'],
    tolerance: 'Verified by model and part number',
    leadTime: 'Quoted by availability and destination',
    content: {
      partOne: `
        <h2>DEUTZ Parts</h2>
        <p>We help buyers source DEUTZ parts for scheduled maintenance, emergency repair, and overhaul planning across industrial equipment fleets.</p>
        <h3>Part Categories</h3>
        <ul>
          <li>Maintenance kits, filters, belts, seals, and gaskets</li>
          <li>Fuel, cooling, lubrication, and electrical system components</li>
          <li>Engine overhaul components and replacement assemblies</li>
        </ul>
      `,
      partTwo: `
        <h2>Support from Shanghai</h2>
        <p>Send your DEUTZ engine model, serial number, and required part list. We will check availability and shipping options.</p>
        <p><a href="/contact/">Request DEUTZ parts</a></p>
      `,
    },
  },
];

export function getProductCards() {
  return products.map((p) => ({ slug: p.slug, title: p.title, image: p.image, summary: p.summary }));
}
