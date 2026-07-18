const cta = (label: string) =>
  `<p style="margin-top:20px;"><a href="/contact/" style="display:inline-block;background:#146ef5;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;">${label}</a></p>`;

export const productSubpages = [
  {
    productSlug: 'mtu-spare-parts',
    slug: 'mtu-part-number-lookup',
    title: 'MTU Part Number Lookup & Identification Support',
    seoTitle: 'MTU Part Number Lookup | Diesel Part Source',
    h1Title: 'MTU Part Number Lookup',
    summary:
      'Send your MTU part number, engine model, serial number, or nameplate photo. Diesel Part Source helps verify the correct genuine or OEM manufacturer replacement before quotation.',
    content: {
      partOne: `<h2>How to Identify MTU Parts</h2><p>The fastest way to quote MTU parts is with the exact part number and engine serial number. If the part number is missing or superseded, send photos of the old part, nameplate, installation position, and any casting or label markings.</p><h3>Helpful Inquiry Details</h3><ul><li>Part number and quantity</li><li>Engine series, model, and serial number</li><li>Nameplate photo and old part photo</li><li>Vessel, generator, rail, or industrial application</li><li>Destination country and required delivery date</li></ul>`,
      partTwo: `<h2>Replacement and Supersession Checks</h2><p>Many engine parts have updated or replacement references. We check the inquiry against the engine application before quotation so buyers avoid receiving an incorrect spare during urgent maintenance.</p>${cta('Check an MTU part number')}`,
    },
  },
  {
    productSlug: 'mtu-spare-parts',
    slug: 'mtu-engine-series-guide',
    title: 'MTU Engine Series Parts Guide',
    seoTitle: 'MTU Engine Series Parts Guide | 183, 396, 595, 956, 1163, 2000, 4000, 8000',
    h1Title: 'MTU Engine Series Parts Guide',
    summary:
      'Parts support for MTU 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 series engines used in marine, power, rail, and industrial applications.',
    content: {
      partOne: `<h2>MTU Series We Support</h2><p>Diesel Part Source handles inquiries for classic and current MTU engine families, including 183, 331, 396, 493, 538, 595, 956, 1163, 2000, 4000, and 8000 series engines. These engines are commonly used in vessels, generator sets, rail equipment, and heavy industrial systems.</p><h3>Common Parts by Series</h3><ul><li>Maintenance kits, filters, seals, and gaskets</li><li>Fuel pumps, injectors, pressure sensors, and control parts</li><li>Valve-train, cylinder-head, piston, liner, and bearing components</li><li>Cooling, turbocharging, lubrication, and electrical components</li></ul>`,
      partTwo: `<h2>Why Serial Numbers Matter</h2><p>Two engines in the same series can use different component versions depending on application, rating, and build configuration. Send the serial number or nameplate photo whenever possible for correct verification.</p>${cta('Request MTU series parts')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: 'marine-generator-service-parts',
    title: 'MTU 2000 Series Marine & Generator Service Parts',
    seoTitle: 'MTU 2000 Series Marine Generator Parts | Diesel Part Source',
    h1Title: 'MTU 2000 Marine & Generator Parts',
    summary:
      'Service and overhaul parts for MTU 2000 series marine propulsion, auxiliary generator, and industrial power applications.',
    content: {
      partOne: `<h2>MTU 2000 Series Applications</h2><p>The MTU 2000 series is widely used in marine propulsion, auxiliary power, generator sets, and industrial power units. Planned maintenance normally includes filters, belts, seals, cooling components, fuel-system parts, and electrical sensors.</p><h3>Typical Request Lists</h3><ul><li>Routine service kits for fleet maintenance</li><li>Fuel injection, turbocharging, cooling, and lubrication parts</li><li>Sensors, wiring, control components, and replacement assemblies</li><li>Overhaul parts for scheduled engine-room work</li></ul>`,
      partTwo: `<h2>Urgent Downtime Support</h2><p>For vessel or generator downtime, include the target delivery date and destination port or city. We will check stock and practical shipping routes before confirming the order.</p>${cta('Check MTU 2000 parts')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: 'overhaul-parts',
    title: 'MTU 4000 Series Overhaul Parts',
    seoTitle: 'MTU 4000 Series Overhaul Parts | Diesel Part Source',
    h1Title: 'MTU 4000 Series Overhaul Parts',
    summary:
      'Verified OEM, OEM-alternative, reman, and replacement overhaul routes for MTU 4000 series engines in marine, generator, rail, and industrial service.',
    content: {
      partOne: `<h2>Overhaul Parts for MTU 4000</h2><p>MTU 4000 series engines are used where reliability and uptime matter. Diesel Part Source supports maintenance teams with parts for cylinder-head work, piston and liner replacement, valve-train service, bearings, gaskets, seals, cooling, and fuel systems.</p><h3>Common Overhaul Categories</h3><ul><li>Pistons, liners, rings, bearings, and gaskets</li><li>Valves, guides, seats, and cylinder-head parts</li><li>Fuel pumps, injectors, sensors, and control items</li><li>Cooling, lubrication, turbocharging, and filtration components</li></ul>`,
      partTwo: `<h2>Build a Consolidated Parts List</h2><p>Send your planned overhaul list in Excel or email format. We can check part-number availability line by line and help consolidate export packing for international shipment.</p>${cta('Request MTU 4000 overhaul parts')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'service-kits-and-overhaul-parts',
    title: 'Cummins Service Kits & Overhaul Parts',
    seoTitle: 'Cummins Service Kits and Overhaul Parts | Diesel Part Source',
    h1Title: 'Cummins Service Kits & Overhaul Parts',
    summary:
      'Cummins service parts, maintenance kits, and overhaul components for generator, marine, and industrial diesel engines.',
    content: {
      partOne: `<h2>Cummins Parts Inquiry Checklist</h2><p>For Cummins parts, the model, CPL, and engine serial number help confirm the correct option. Include the part number, quantity, and whether the order is for routine maintenance, urgent repair, or overhaul planning.</p><h3>Parts We Commonly Quote</h3><ul><li>Filters, belts, seals, gaskets, and maintenance kits</li><li>Fuel injection, cooling, lubrication, and turbocharger parts</li><li>Sensors, control components, and replacement assemblies</li><li>Overhaul components for engines in generator and industrial service</li></ul>`,
      partTwo: `<h2>Send CPL and Serial Number</h2><p>Cummins CPL and serial data reduce the risk of wrong replacements, especially when several versions exist for the same engine family.</p>${cta('Check Cummins parts')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'industrial-equipment-parts',
    title: 'DEUTZ Industrial Equipment Parts',
    seoTitle: 'DEUTZ Industrial Equipment Parts | Diesel Part Source',
    h1Title: 'DEUTZ Industrial Equipment Parts',
    summary:
      'DEUTZ engine parts for construction machinery, pumps, compressors, power units, and industrial equipment maintenance.',
    content: {
      partOne: `<h2>DEUTZ Parts for Equipment Fleets</h2><p>DEUTZ engines are common in industrial equipment, construction machines, compressors, pumps, and power units. Diesel Part Source helps buyers source maintenance and repair parts with compatibility checks before shipment.</p><h3>Typical Categories</h3><ul><li>Filters, belts, seals, gaskets, and service kits</li><li>Fuel, cooling, lubrication, and electrical components</li><li>Overhaul parts and replacement assemblies</li><li>Parts for scheduled maintenance lists and urgent breakdown repair</li></ul>`,
      partTwo: `<h2>What to Include</h2><p>Send the DEUTZ engine model, serial number, old part number, quantity, and destination. Photos are useful for worn or unmarked parts.</p>${cta('Request DEUTZ parts')}`,
    },
  },
] as const;
