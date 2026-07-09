/** Non-CNC manufacturing processes — scope boundaries and comparison links for buyers. */
export type NonCncProcess = {
  /** Display name */
  name: string;
  /** One-line category for grouping */
  group: 'Casting' | 'Forming' | 'Fabrication' | 'Molding' | 'Additive';
  /** Why we do not run this in-house */
  why: string;
  /** Honest alternative / when to use CNC instead */
  instead: string;
  /** Comparison guide path (must exist under /compare/) */
  compareHref: string;
};

export const nonCncProcesses: NonCncProcess[] = [
  {
    name: 'High-pressure die casting',
    group: 'Casting',
    why: 'Dedicated molds, furnaces, and casting lines — different capital and QC model than subtractive CNC.',
    instead: 'CNC from billet for samples and low volume; die casting when annual volume justifies tooling.',
    compareHref: '/compare/cnc-machining-vs-die-casting/',
  },
  {
    name: 'Sand casting',
    group: 'Casting',
    why: 'Foundry floor, sand cores, and porosity control — outside our CNC-first workflow.',
    instead: 'CNC from plate/bar for tight tolerance; sand cast when the part is large, low volume, and near-net shape wins.',
    compareHref: '/compare/cnc-machining-vs-sand-casting/',
  },
  {
    name: 'Investment (lost-wax) casting',
    group: 'Casting',
    why: 'Wax tooling, shell building, and cast-to-machine datum planning require foundry partners.',
    instead: 'CNC from solid for samples; investment cast + CNC finish on critical faces at higher volume.',
    compareHref: '/compare/investment-casting-vs-cnc/',
  },
  {
    name: 'Gravity die casting (permanent mold)',
    group: 'Casting',
    why: 'Tilt-pour metal molds and slower cycle than high-pressure die cast — separate foundry line.',
    instead: 'CNC for samples and tight features; gravity die when wall thickness is moderate and volume is mid-range aluminum/brass.',
    compareHref: '/compare/cnc-machining-vs-gravity-die-casting/',
  },
  {
    name: 'Open / closed-die forging',
    group: 'Forming',
    why: 'Forging presses, dies, and grain-flow control — separate equipment and NRE from machining.',
    instead: 'CNC from bar or plate for low volume and tight GD&T; forging when strength-to-weight and volume justify die cost.',
    compareHref: '/compare/cnc-machining-vs-forging/',
  },
  {
    name: 'Aluminum extrusion',
    group: 'Forming',
    why: 'Profile dies and extrusion presses — we machine extrusions but do not extrude in-house.',
    instead: 'Extrude constant profiles at volume, then CNC machine holes and faces; machine from block when profile tooling does not pay back.',
    compareHref: '/compare/cnc-machining-vs-extrusion/',
  },
  {
    name: 'Powder metallurgy (sintering)',
    group: 'Forming',
    why: 'Compacting presses, sintering furnaces, and density control — distinct from CNC and from MIM feedstock molding.',
    instead: 'CNC from bar for low volume and tight tolerance; sintered P/M when annual qty is high and geometry suits net-shape sinter.',
    compareHref: '/compare/cnc-machining-vs-powder-metallurgy/',
  },
  {
    name: 'Sheet metal fabrication (laser, brake, weld)',
    group: 'Fabrication',
    why: 'Flat-pattern nesting, bending, and weld fixtures — we focus on machined prismatic and turned parts.',
    instead: 'CNC milled enclosures when thickness and tolerance need machining; sheet metal when the part is essentially a folded panel.',
    compareHref: '/compare/cnc-machining-vs-sheet-metal-fabrication/',
  },
  {
    name: 'Laser cutting (sheet)',
    group: 'Fabrication',
    why: '2D laser and nesting software — complementary to fab, not our core subtractive cell.',
    instead: 'Laser for flat 2D profiles; CNC milling when pockets, threads, or ±0.05 mm tolerance are required.',
    compareHref: '/compare/laser-cutting-vs-cnc-milling/',
  },
  {
    name: 'Metal stamping',
    group: 'Fabrication',
    why: 'Progressive dies and high-speed presses — economical only at very high volume.',
    instead: 'CNC for low-to-mid volume 3D parts; stamping for flat/high-volume sheet features.',
    compareHref: '/compare/cnc-machining-vs-metal-stamping/',
  },
  {
    name: 'Waterjet cutting',
    group: 'Fabrication',
    why: 'Abrasive waterjet cells for thick plate — no thermal HAZ but 2D profile process only.',
    instead: 'Waterjet for thick plate blanks and soft alloys; CNC when pockets, threads, or tight 3D tolerance are required.',
    compareHref: '/compare/cnc-machining-vs-waterjet-cutting/',
  },
  {
    name: 'Welding fabrication (MIG/TIG assemblies)',
    group: 'Fabrication',
    why: 'Welding fixtures, distortion control, and weld inspection — assembly fab, not precision machining cells.',
    instead: 'CNC from solid for tight monolithic parts; welded fabrication when the structure is large and plate/tube based.',
    compareHref: '/compare/cnc-machining-vs-welding-fabrication/',
  },
  {
    name: 'Injection molding',
    group: 'Molding',
    why: 'Steel mold tooling and polymer process control — outside our CNC workflow.',
    instead: 'engine parts plastic for samples and bridge runs; molding when design is frozen and volume is thousands+.',
    compareHref: '/compare/cnc-machining-vs-injection-molding/',
  },
  {
    name: 'Vacuum / urethane casting',
    group: 'Molding',
    why: 'Silicone molds and PU resin shrinkage — sample casting, not production machining.',
    instead: 'Vacuum cast 5–30 cosmetic plastic shells; CNC when tolerance, threads, or production-grade plastic is needed.',
    compareHref: '/compare/cnc-machining-vs-vacuum-casting/',
  },
  {
    name: 'Thermoforming & blow molding',
    group: 'Molding',
    why: 'Thermoform tooling and hollow-part blow molds — suited to thin-wall plastic enclosures at volume.',
    instead: 'engine parts housings for tight sealing faces; thermoform/blow mold when the shell is large, thin, and cosmetic.',
    compareHref: '/compare/cnc-machining-vs-thermoforming/',
  },
  {
    name: 'Metal injection molding (MIM)',
    group: 'Molding',
    why: 'Feedstock, sintering furnaces, and shrink compensation — high-volume micro metal parts process.',
    instead: 'CNC for complex metal at low volume; MIM when annual qty is high and features are small/complex.',
    compareHref: '/compare/cnc-machining-vs-metal-injection-molding/',
  },
  {
    name: 'Compression molding (rubber & composite)',
    group: 'Molding',
    why: 'Heated molds, preforms, and cure cycles for elastomers and thermoset composites — not subtractive CNC.',
    instead: 'CNC metal or plastic for rigid parts; compression mold when the part is rubber, silicone, or composite laminate.',
    compareHref: '/compare/cnc-machining-vs-compression-molding/',
  },
  {
    name: 'Metal 3D printing (DMLS / SLM)',
    group: 'Additive',
    why: 'Powder bed fusion and post-processing — we CNC-finish additive parts but do not print metal in-house.',
    instead: 'CNC from wrought stock for tight tolerance and mill certs; metal print for unreachable internal geometry, then machine datums.',
    compareHref: '/compare/cnc-vs-metal-3d-printing/',
  },
  {
    name: 'Plastic 3D printing (FDM / SLA / SLS)',
    group: 'Additive',
    why: 'Layered polymer builds with anisotropy and resin shrink — rapid concept models, not production metal substitute.',
    instead: 'FDM/SLA for look-and-fit; CNC in POM, PC, or aluminum when function, tolerance, or strength matters.',
    compareHref: '/compare/cnc-vs-plastic-3d-printing/',
  },
];

export const nonCncProcessGroups = ['Casting', 'Forming', 'Fabrication', 'Molding', 'Additive'] as const;
