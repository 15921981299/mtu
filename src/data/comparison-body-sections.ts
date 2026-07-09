export type ComparisonBodySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/** Long-form body copy for high-intent indexed comparison pages. */
export const comparisonBodySections: Partial<Record<string, ComparisonBodySection[]>> = {
  'ra-vs-rz-surface-roughness': [
    {
      heading: 'Why Ra and Rz get confused on CNC drawings',
      paragraphs: [
        'Ra (arithmetical mean roughness) is the default on most US and ISO machined-part prints. It averages all profile deviations from the mean line and is what most shops measure with a portable profilometer after turning or milling.',
        'Rz (mean roughness depth) looks at the five largest peak-to-valley spans in a sampling length. Automotive and German OEM prints often specify Rz because peak height affects coating adhesion, seal lip contact, and wear — not just the average valley depth.',
        'The critical mistake is assuming a fixed conversion factor. A turned journal at Ra 0.8 µm might measure Rz 4–6 µm, but a milled face with periodic tool marks can show a different ratio. Treat conversion charts as negotiation starters, not inspection limits.',
      ],
    },
    {
      heading: 'How we measure and quote surface finish',
      paragraphs: [
        'When your drawing states only "Ra 1.6" without units, we confirm µm vs µin before quote release — mixing units is a common source of rejection at incoming inspection.',
        'If the print mandates Rz, we quote to that parameter and state whether additional finish passes, grinding, or honing are required. Sealing faces sometimes need both Ra control and peak-count limits that neither parameter alone captures.',
      ],
      bullets: [
        'State Ra or Rz, units (µm / µin), and whether the limit applies as-machined or after coating.',
        'Identify which surfaces are functional (seal, bearing, gasket) vs cosmetic only.',
        'Note inspection method if your QA plan requires profilometer trace direction or filter (ISO 4287 / ASME B46.1).',
      ],
    },
  ],
  'cnc-milling-vs-turning': [
    {
      heading: 'Geometry drives the process — not habit',
      paragraphs: [
        'Buyers often default to milling because CAD models are prismatic. On the shop floor, a part that is 80% cylindrical — shaft, bushing, fitting, pin — belongs on a lathe or mill-turn cell. Running it on a vertical machining center means interpolating diameters with a ball end mill: slower, harder on tolerances, and more expensive at any quantity.',
        'Mill-turn makes sense when a round body needs cross-holes, flats, or milled pockets in one clamping. Pure milling wins when the primary datum faces are planar, when pocket depth or 3D surfacing dominates cycle time, or when the part simply is not rotationally symmetric.',
      ],
    },
    {
      heading: 'Tolerance and finish differences buyers miss',
      paragraphs: [
        'Turning routinely holds h6–h7 on diameters in one setup because the tool cuts at the support point. Milling a bore or OD across multiple setups stacks fixture error. For OD concentricity and surface finish on cylindrical features, turning typically delivers Ra 0.4–1.6 µm with less tooling cost than equivalent milled surfaces.',
        'When your drawing mixes tight diameters with milled features, send a STEP file. We flag whether mill-turn, turn-then-mill, or mill-only is the lowest total cost — not just the lowest programming quote.',
      ],
    },
  ],
  'sinker-edm-vs-wire-edm': [
    {
      heading: 'Ram EDM vs wire EDM — different physics',
      paragraphs: [
        'Sinker (ram) EDM erodes blind cavities using a shaped electrode. There is no through-path for wire, so internal pockets, mold details, and sharp-corner slots in hardened steel are the natural fit. Electrode fabrication adds NRE, but for complex blind geometry in HRC 50+ material, sinker is often the only viable option.',
        'Wire EDM cuts with a continuously fed wire through a start hole. It excels at through-profiles — punches, dies, gear blanks, and 2D contours in hardened stock. No custom electrode is needed beyond programming, which makes wire cheaper for simpler through-features.',
      ],
    },
    {
      heading: 'When buyers over-specify EDM',
      paragraphs: [
        'Soft aluminum brackets with open pockets do not need EDM — milling is faster and cheaper. EDM pays off when material hardness, zero cutting force, thin walls, or internal corner radii smaller than available end mills make conventional cutting unreliable.',
        'Search queries like "ram EDM" and "economical edm sinker" usually come from tooling engineers comparing electrode cost vs wire path access. We quote both paths when the drawing is ambiguous and state assumptions in the RFQ response.',
      ],
      bullets: [
        'Note material hardness and heat treat condition on the drawing.',
        'Indicate blind vs through features and required internal corner radius.',
        'State whether electrode design is customer-supplied or shop-built.',
      ],
    },
  ],
  'wire-edm-vs-cnc-milling': [
    {
      heading: 'Complementary processes, not substitutes',
      paragraphs: [
        'Wire EDM removes material with no mechanical cutting force. Thin walls, fragile webs, and fully hardened parts stay stable where an end mill would chatter or deflect. Milling removes stock faster on aluminum, brass, and annealed steel when geometry is prismatic and corners are larger than tool radius.',
        'Production workflows often combine both: mill soft stock to near-net, heat treat, then wire-cut hardened profiles or mill non-hardened features in separate setups. The comparison question is really "which features belong on which machine" — not which process replaces the other entirely.',
      ],
    },
    {
      heading: 'Cost and lead-time trade-offs',
      paragraphs: [
        'Wire EDM is priced per machine hour and is inherently slower than aggressive milling on soft alloys. For a simple aluminum plate with pockets, milling wins on every metric. For a 60 HRC tool steel punch with 0.15 mm internal radius, wire EDM may be the only quoted process.',
        'Include start-hole requirements for wire EDM (who drills, where located) and whether secondary deburr or surface finish limits apply after cut.',
      ],
    },
  ],
  'anodizing-vs-powder-coating': [
    {
      heading: 'Material compatibility comes first',
      paragraphs: [
        'Anodizing is an electrochemical conversion coating — it grows from the aluminum substrate and is the default finish for machined aluminum housings, brackets, and plates. It adds minimal thickness (typically 5–25 µm for Type II), which preserves thread class and bearing fits when masking is planned.',
        'Powder coating applies a polymer film 50–100 µm thick over a prepared surface. It works on steel and aluminum but builds on threads, bores, and mating faces unless masked or post-machined. Outdoor steel hardware often uses zinc pretreatment plus powder for UV and impact protection that anodize cannot offer on ferrous metals.',
      ],
    },
    {
      heading: 'Dimensional and cosmetic considerations',
      paragraphs: [
        'Precision assemblies with slip fits or seal grooves on aluminum usually specify anodize — Type II clear or black for cosmetics, Type III when wear matters. Powder coat is better when bold color, texture, or thick outdoor protection on steel is the priority and dimensional growth can be absorbed or masked.',
        'Mixed-material assemblies (aluminum plate + steel bracket) may need different finishes on each component. State finish per item on the BOM to avoid a single blanket note that forces rework.',
      ],
      bullets: [
        'Specify anodize type (II vs III), color, and whether threads or bores are masked.',
        'For powder coat: color code, texture, salt spray hours if required, and mask callouts.',
        'Note if finish is cosmetic only or on a functional sealing surface.',
      ],
    },
  ],
  'magnesium-vs-aluminum': [
    {
      heading: 'Weight savings vs supply-chain reality',
      paragraphs: [
        'AZ31 and AZ91 magnesium alloys are roughly 35% lighter than aluminum at similar part volume. That matters for drones, portable devices, racing components, and aerospace brackets where mass directly affects performance.',
        'The trade-off is supplier availability, fire-safe machining requirements, and higher raw material cost. Not every shop accepts magnesium jobs — chips are flammable and require dedicated handling, Class D extinguishing, and segregated storage. Verify your supplier documents Mg SOP before placing production POs.',
      ],
    },
    {
      heading: 'When aluminum is still the right call',
      paragraphs: [
        '6061-T6 and 7075-T6 remain the default for structural brackets, housings, and fixtures unless a mass study proves magnesium is required. Aluminum offers wider anodize cosmetics, more stock sizes, lower unit cost, and simpler logistics.',
        'Magnesium wins when every gram counts and the buyer accepts premium pricing plus fire-safety audit questions. We quote both when drawings say "lightweight metal" without alloy — and ask for the actual load case.',
      ],
    },
  ],
  'concentricity-vs-runout': [
    {
      heading: 'GD&T that shops can actually inspect',
      paragraphs: [
        'Total indicator runout (TIR / runout) measures surface variation as the part rotates relative to datums — what matters for bearings, seals, and rotating assemblies. It is checked on the shop floor with V-blocks, centers, and dial indicators in minutes.',
        'Concentricity controls median points of features relative to a datum axis — a theoretical construct that requires CMM analysis and is difficult to hold on long shafts with form error. Many drawings over-spec concentricity where runout would control function at lower cost.',
      ],
    },
    {
      heading: 'RFQ impact on shafts and rotating parts',
      paragraphs: [
        'Tight runout on bearing journals may require one-setup turning, between-centers grinding, or controlled datum surfaces — all quotable when the TIR value and datums are clear. Vague concentricity callouts without datum scheme often trigger RFQ holds until engineering clarifies inspection method.',
        'If you can change the drawing before release, ask whether runout to a machined shoulder satisfies the assembly requirement. Most rotating hardware does not need median-point concentricity unless a regulated spec mandates it.',
      ],
      bullets: [
        'Provide 2D drawing + STEP, datum references, and TIR or runout limit.',
        'State bearing or seal journal tolerances (h6, k6, etc.) separately from GD&T.',
        'Note quantity and whether CMM report is required on every lot or FAI only.',
      ],
    },
  ],
  'aluminum-6061-vs-7075': [
    {
      heading: 'Strength vs machinability vs finish',
      paragraphs: [
        '6061-T6 is the workhorse alloy for CNC brackets, plates, and housings. It machines cleanly, anodizes evenly, and resists corrosion well. Yield strength around 240 MPa is sufficient for most industrial and consumer structural parts.',
        '7075-T6 nearly doubles yield strength (~500 MPa) and is the choice for aerospace fittings, high-load brackets, and defense hardware where 6061 would be over-stressed. The cost premium is 30–50% on material alone, plus higher tool wear and less predictable anodize cosmetics on cosmetic faces.',
      ],
    },
    {
      heading: 'Default to 6061 unless the drawing proves otherwise',
      paragraphs: [
        'Over-specifying 7075 adds cost without benefit when FEA margins are wide or when the part is a non-structural cover. Under-specifying 6061 on a loaded lug is a field failure risk — the alloy callout should follow stress analysis, not procurement habit.',
        'On RFQs we confirm temper (T6 vs T651), whether plate or bar stock applies, and anodize requirements before locking alloy in the quote.',
      ],
    },
  ],
  'stainless-304-vs-316': [
    {
      heading: 'Molybdenum is the decision — not machinability',
      paragraphs: [
        '304 and 316 austenitic stainless steels machine similarly on CNC lathes and mills — both work-harden, both need sharp tooling and consistent feeds. The meaningful difference is corrosion: 316L adds molybdenum for chloride, marine, and aggressive chemical resistance that 304 cannot match long-term.',
        'For indoor automation brackets, food equipment away from chlorides, and general hardware, 304L saves 15–30% material cost with adequate service life. For salt spray, pharma wash-down, or offshore exposure, 316L is insurance against pitting that false economy on 304 creates.',
      ],
    },
    {
      heading: 'Passivation and compliance notes',
      paragraphs: [
        'Both grades typically receive citric or nitric passivation after machining when corrosion performance matters. Medical and implant-adjacent work often mandates 316L plus documented passivation per ASTM A967 or AMS 2700 — state the spec on your PO, not just "passivate."',
      ],
    },
  ],
  'anodizing-type-ii-vs-iii': [
    {
      heading: 'Decorative vs hard coat — different design rules',
      paragraphs: [
        'Type II sulfuric anodize builds a thin oxide (5–25 µm) suitable for clear, dyed, or black cosmetic finishes on aluminum. Dimensional growth is modest and predictable — important for threaded holes and slip fits when masking is specified.',
        'Type III hard coat (hard anodize) produces a wear-resistant surface up to 75 µm thick with hardness approaching ceramic levels. It is specified for sliding wear, military/aerospace components, and hydraulic bores — but grows into diameters and requires bore and thread allowances in design.',
      ],
    },
    {
      heading: 'Common RFQ mistakes',
      paragraphs: [
        'Drawings that say "hard anodize" on cosmetic consumer parts often mean Type II black — clarify before quote. Type III on thin-wall enclosures can crack oxide if wall thickness is insufficient.',
        'Specify type, class, color, thickness range if known, and mask zones for threads, bearings, and sealing faces.',
      ],
    },
  ],
  'passivation-vs-electropolishing': [
    {
      heading: 'Restore oxide vs remove metal',
      paragraphs: [
        'Passivation (citric or nitric per ASTM A967) cleans free iron and restores the chrome oxide layer on stainless without removing base metal. Dimensions stay at machined size — ideal for threaded medical hardware and fitted assemblies.',
        'Electropolishing dissolves surface metal electrochemically, brightening stainless and reducing Ra to 0.2–0.4 µm on 304/316. It improves cleanability for food, pharma, and semiconductor wetted paths but removes 10–50 µm — tight fits must be designed pre-EP.',
      ],
    },
    {
      heading: 'Which finish your industry expects',
      paragraphs: [
        'Industrial 304/316 brackets and fittings: passivation is standard and low cost. High-purity wetted surfaces and visible "mirror" stainless: electropolish is often contractually required — specify one primary finish to avoid paying for both.',
      ],
    },
  ],
  'peek-vs-ptfe': [
    {
      heading: 'Structural plastic vs friction plastic',
      paragraphs: [
        'PEEK (polyether ether ketone) carries load, holds tolerance at continuous temperatures to ~250 °C, and resists creep under bolt preload — used in semiconductor fixtures, medical components, and aerospace insulators.',
        'PTFE (Teflon) offers the lowest friction coefficient and superb chemical inertness but creeps under load and is poor for structural threads or press-fit bores. It excels as linings, seals, and bearings where load is light and lubricity is paramount.',
      ],
    },
    {
      heading: 'Machining and quoting notes',
      paragraphs: [
        'PEEK quotes may include annealing steps to stabilize dimensions after roughing. PTFE is softer and requires sharp tools to avoid smearing; we flag when a PTFE part is asked to perform as a structural substitute for POM or PEEK.',
      ],
    },
  ],
  '3-axis-vs-5-axis': [
    {
      heading: 'Setup count is the hidden cost',
      paragraphs: [
        'Three-axis VMCs excel on prismatic parts with features on one or two primary faces. Each additional face requires re-clamping, re-indicating, and tolerance stack-up — acceptable for simple brackets, expensive for aerospace housings with features on five faces.',
        'Five-axis machining (true simultaneous or 3+2 indexed) reduces setups by rotating the part to present faces to the spindle. Programming and machine rates are higher, but eliminating two or three manual setups often lowers total part cost on complex geometry.',
      ],
    },
    {
      heading: 'When 3+2 is enough vs full simultaneous',
      paragraphs: [
        'Indexed 5-axis (3+2) handles orthogonal holes on round or prismatic parts and tombstone batching — often the sweet spot for production brackets. Simultaneous 5-axis is justified for sculpted surfaces, impellers, and compound angles where tool length and surface finish suffer on indexed setups alone.',
      ],
    },
  ],
  'iso-2768-m-vs-f': [
    {
      heading: 'General tolerances save drawing clutter — until they do not',
      paragraphs: [
        'ISO 2768 applies to dimensions without explicit tolerances. Medium class (m) is the industrial default for brackets and fabrication — linear tolerances of ±0.2 mm on 6–30 mm features are achievable in one CNC pass without special inspection.',
        'Fine class (f) tightens those defaults (e.g. ±0.1 mm on the same range) and implies extra finish passes, slower feeds, and more CMM time. Using f-class globally when only two mating holes need tight tolerance adds 20–35% cost without functional gain.',
      ],
    },
    {
      heading: 'Best practice on RFQ drawings',
      paragraphs: [
        'Title block ISO 2768-m plus local critical callouts on bearing bores and mating faces is how most efficient drawings are structured. Reserve f-class for European OEM specs that explicitly require it on every untoleranced dimension.',
      ],
    },
  ],
  'cpk-vs-ppk-capability': [
    {
      heading: 'Potential vs actual performance',
      paragraphs: [
        'Cpk measures how well a stable process fits inside specification limits using within-subgroup variation — the metric production contracts reference for ongoing SPC (typically Cpk ≥ 1.33, or 1.67 for critical aerospace characteristics).',
        'Ppk uses overall variation including batch-to-batch drift. It is what you see on first-article and pilot lots before the process is proven — often reported alongside Cpk on PPAP submissions.',
      ],
    },
    {
      heading: 'What to write on a machining PO',
      paragraphs: [
        'Vague "capable process" language causes receiving disputes. State which characteristics require Cpk, sample size, measurement method (CMM vs manual), and whether Ppk on FAI is acceptable before production release.',
        'Short runs under 30 pieces rarely produce meaningful Cpk — buyers should not demand production SPC metrics on prototype quantities without paying for extended qualification lots.',
      ],
    },
  ],
  'outsource-vs-in-house-machining': [
    {
      heading: 'Utilization breaks the model',
      paragraphs: [
        'In-house CNC pays off when spindle hours are high and stable — typically above 1,000–2,000 hours per year per machine when you include programming, maintenance, and QC headcount. Below that, outsourcing converts fixed capital into variable piece cost.',
        'Outsourcing also accesses 5-axis, wire EDM, grinding, and anodize without capital spend — valuable for product companies whose core competency is design, not shop-floor optimization.',
      ],
    },
    {
      heading: 'Confidentiality and iteration speed',
      paragraphs: [
        'ITAR, defense, and extreme IP sensitivity may require in-house or on-shore partners with audited access controls. For commercial hardware with NDA, qualified outsource partners with documented inspection and material traceability cover most needs at lower total cost.',
      ],
    },
  ],
  'china-vs-local-cnc-supplier': [
    {
      heading: 'Unit cost vs iteration speed',
      paragraphs: [
        'China CNC partners typically win on unit price at production quantities and on low-MOQ runs where local shop minimums are high. Lead time includes shipping — plan 1–3 weeks ocean or 3–5 days express for samples.',
        'Local job shops win on same-week design iteration, walk-in DFM discussions, and export-controlled programs (ITAR) that offshore partners cannot touch.',
      ],
    },
    {
      heading: 'Risk reduction checklist',
      paragraphs: [
        'Paid FAI with CMM report before production PO, EN 10204 3.1 material certs when specified, clear INCOTERMS, and documented DFM acceptance on the first revision. Price without quality verification is not savings — it is deferred incoming QC cost.',
      ],
    },
  ],
  'swiss-vs-conventional-turning': [
    {
      heading: 'Guide bushing vs chuck-and-tailstock',
      paragraphs: [
        'Swiss-type lathes feed bar through a guide bushing so the tool cuts at the support point — eliminating deflection on small diameters and high L/D ratios. Conventional lathes hold work in a chuck; overhang limits how slender a turned part can be before tolerance and finish suffer.',
        'Swiss cells often include live tooling for milled flats, cross-holes, and slots without a second setup. Conventional turning may need a mill-second-op for the same features, adding cost on complex small parts.',
      ],
    },
    {
      heading: 'When Swiss premium is not worth it',
      paragraphs: [
        'Parts over ~32–40 mm diameter, low L/D ratios, or one-off prototypes rarely justify Swiss setup and programming premium. Conventional turning on chucked bar or plate is faster to quote and machine for large cylindrical hardware.',
      ],
      bullets: [
        'State OD, length, L/D ratio, and milled feature count on the RFQ.',
        'Note medical, connector, or watch-grade tolerance if applicable.',
        'Quantity drives amortization — Swiss wins at production lots, not always at 5 pcs.',
      ],
    },
  ],
  'prototype-vs-production-machining': [
    {
      heading: 'Different goals, different travelers',
      paragraphs: [
        'Prototype machining optimizes time to first article: soft jaws, flexible fixturing, and DFM feedback while the design may still change. Production machining optimizes unit cost with dedicated fixtures, frozen programs, and batch sampling (SPC, Cpk) once the drawing is released.',
        'Quoting prototype pricing on a rev-in-progress drawing is intentional — the first article may be scrapped when Rev B lands. Production quotes assume design freeze and repeat orders.',
      ],
    },
    {
      heading: 'When to switch quoting mode',
      paragraphs: [
        'After FAI approval and before ordering 50+ identical pieces, request production pricing with fixture amortization and updated lead time. Unit cost typically drops 30–60% at 100+ pcs when setup is spread across the lot.',
      ],
    },
  ],
  'turning-vs-milling-cost': [
    {
      heading: 'Geometry sets hourly economics',
      paragraphs: [
        'Round bar turned on a lathe removes OD/ID stock efficiently in one setup — spindle time per part is often lower than milling interpolated diameters on a VMC. Flat, prismatic, or multi-face parts belong on a mill; forcing a cylindrical-looking part onto a mill because the CAD default is milling adds 25–40% cycle time.',
        'Mill-turn bridges both when a round body needs milled features — quote as one process path, not milling-only plus turning as an afterthought.',
      ],
    },
    {
      heading: 'What skews a turning quote',
      paragraphs: [
        'Bar stock length and remnant, live-tooling features, sub-spindle work, and tight runout on long parts. Send STEP — we re-route purely cylindrical RFQs to lathe before you lock the process on the drawing.',
      ],
    },
  ],
  'laser-cutting-vs-cnc-milling': [
    {
      heading: '2D blanking vs 3D feature machining',
      paragraphs: [
        'Laser cutting excels at flat profile blanking in sheet and plate — fast perimeter cuts, holes, and slots in one nest. CNC milling adds pockets, steps, threads, tight flatness, and 3D surfaces laser cannot produce.',
        'Common workflow: laser blank the profile, then mill critical faces, bores, and threads in a second operation. Quoting laser-only when the print shows pockets is a common RFQ mismatch.',
      ],
    },
    {
      heading: 'Tolerance and edge quality',
      paragraphs: [
        'Laser kerf, taper, and heat-affected zone matter on thick plate and precision fits — state which edges are functional vs break-only. Milling from solid is slower but holds ±0.02 mm and better perpendicularity on mating faces.',
      ],
    },
  ],
  'investment-casting-vs-cnc': [
    {
      heading: 'Near-net shape vs full machining',
      paragraphs: [
        'Investment casting wins at high volume on parts with draft, thin walls, and complex external geometry that would require huge milling time from solid. CNC wins on tight tolerances, small lots, and parts without cast draft or porosity risk.',
        'We quote CNC under ~500 pcs or when GD&T exceeds typical cast + machine allowance. Cast-first workflows need a casting drawing plus finished print with machining datums marked.',
      ],
    },
    {
      heading: 'Risk buyers should plan for',
      paragraphs: [
        'Porosity, shrink, and datum strategy on first article — machined datums on cast blanks are standard, but the RFQ must show where stock allowance lives or quotes assume extra skim passes.',
      ],
    },
  ],
  'cnc-machining-vs-die-casting': [
    {
      heading: 'Volume and tolerance break-even',
      paragraphs: [
        'Die casting amortizes tooling over thousands of parts — unit metal cost drops sharply at automotive-scale volume. CNC from bar or plate wins on prototypes, bridge tooling, and tolerances tighter than cast + trim + machine can hold without porosity at pressure faces.',
        'Hybrid parts (cast body, machined sealing faces) are common; the comparison is really whether the whole part should be cast or whether only a portion needs machining after casting.',
      ],
    },
    {
      heading: 'RFQ clarity',
      paragraphs: [
        'State annual volume, critical sealing or bearing surfaces, and whether casting tooling exists. Without volume, we default to CNC for first articles because die cast tooling NRE dominates small-lot economics.',
      ],
    },
  ],
  'cnc-machining-vs-injection-molding': [
    {
      heading: 'Metal structure vs molded polymer',
      paragraphs: [
        'Injection molding dominates high-volume plastic parts with uniform wall thickness and draft. CNC machining applies to metal parts, engineering plastics in low volume, and plastic prototypes before steel mold investment.',
        'Machined POM, PC, or PEEK prototypes validate fit before mold cut — but production plastic at 10k+ pcs almost always shifts to molding unless the material must stay metal.',
      ],
    },
    {
      heading: 'When CNC still wins on plastic',
      paragraphs: [
        'Medical and aerospace structural plastics, tight tolerances on bearing bores, and quantities under a few hundred where mold NRE exceeds part value. Specify material grade — we do not substitute generic ABS for PEEK on structural calls.',
      ],
    },
  ],
  'cnc-machining-vs-sheet-metal-fabrication': [
    {
      heading: 'Plate geometry vs formed sheet',
      paragraphs: [
        'Sheet metal fabrication (laser/plasma cut, bend, weld) wins on enclosures, panels, and brackets made from gauge stock with bends and louvers. CNC machining wins on thick plate, precision pockets, threads, and tight flatness on monolithic parts.',
        'Drawings that show 1.5 mm formed sheet but specify milling tolerances on every edge often need process clarification — mixed BOMs are normal (fab shell + machined insert blocks).',
      ],
    },
    {
      heading: 'Cost drivers',
      paragraphs: [
        'Bend count, weld length, and hardware insertion vs material removal rate from solid block. Thin-walled aluminum cover from 2 mm sheet beats machining from 10 mm plate; thick structural mount from 25 mm plate belongs on a mill.',
      ],
    },
  ],
  'cnc-machining-vs-metal-stamping': [
    {
      heading: 'Progressive die vs chip-making',
      paragraphs: [
        'Stamping excels at high-volume thin-gauge parts — clips, brackets, shields — where tooling cost is amortized over 50k+ hits. CNC machining applies to thick stock, low volumes, and features stamping cannot form (deep pockets, internal threads, compound angles).',
        'Prototype stamped parts are often laser or CNC cut first; do not compare production stamp piece price to 10-piece CNC without noting tooling NRE.',
      ],
    },
    {
      heading: 'Material thickness rule of thumb',
      paragraphs: [
        'Above ~3–6 mm structural steel or aluminum, stamping press capacity and springback drive cost — milling or laser-plus-mill becomes competitive at moderate volumes.',
      ],
    },
  ],
  'cnc-machining-vs-extrusion': [
    {
      heading: 'Constant profile vs machined custom geometry',
      paragraphs: [
        'Extrusion produces constant cross-section profiles (T-slot, angle, custom aluminum shapes) at low $/kg for long lengths. CNC machines cut, drill, tap, and face extruded lengths into finished parts — or machines from plate when the section is not standard.',
        'Buyers save when the design fits a standard extrusion with minimal secondary ops; custom hollow profiles need extrusion die NRE similar to casting tooling.',
      ],
    },
    {
      heading: 'When to machine from plate instead',
      paragraphs: [
        'Low volume, non-standard cross-section, or tight tolerance on non-profile faces — machining from plate or cast MIC-6 avoids extrusion die lead time and minimum order weight.',
      ],
    },
  ],
  'cnc-machining-vs-vacuum-casting': [
    {
      heading: 'Urethane prototypes vs metal production',
      paragraphs: [
        'Vacuum casting (urethane/silicone molds from a master pattern) produces 10–50 plastic or rubber-like parts quickly for fit and marketing photos. CNC metal or engineering plastic parts provide functional load, temperature, and tolerance validation vacuum casts cannot match.',
        'Use vacuum cast for industrial design iteration; use CNC when threads, bearings, or structural load must be tested before production tooling.',
      ],
    },
    {
      heading: 'Material honesty on RFQ',
      paragraphs: [
        'Vacuum cast ABS-like parts are not CNC polycarbonate — state intended test (fit vs structural) so suppliers quote the correct process.',
      ],
    },
  ],
  'cnc-machining-vs-forging': [
    {
      heading: 'Grain flow vs billet machining',
      paragraphs: [
        'Forging aligns metal grain for fatigue-critical shafts, crank-like parts, and high-load brackets at production volume. CNC from wrought bar or plate wins below a few hundred pieces, on complex internal geometry, and when grain direction is not on the drawing.',
        'Annual quantity and load case drive the break-even — forging needs die cost and minimum tonnage; CNC needs only material and spindle time.',
      ],
    },
    {
      heading: 'Typical hybrid workflow',
      paragraphs: [
        'Near-net forgings with machined bearing journals, bores, and threads are standard in aerospace and automotive — RFQ should show forged blank plus finished print with stock allowance.',
      ],
    },
  ],
  'cnc-vs-metal-3d-printing': [
    {
      heading: 'Tolerance and certifiable alloys',
      paragraphs: [
        'CNC from wrought bar delivers ±0.02–0.05 mm routine, Ra 0.8–3.2 µm, and EN 10204 material certificates — required for production hardware. Metal AM (DMLS/SLM) builds complex internal geometry but arrives at ±0.1–0.3 mm as-built and often needs CNC post-machining on mating surfaces.',
        'AM wins on organic lattices, conformal cooling, and one-off impossible-to-mill internal channels — not on standard brackets at volume.',
      ],
    },
    {
      heading: 'Volume economics',
      paragraphs: [
        'Above ~20–50 identical metal parts, CNC unit cost usually undercuts AM powder and build time. Below that, AM can compete if geometry is truly additive-native.',
      ],
    },
  ],
  'cnc-vs-plastic-3d-printing': [
    {
      heading: 'Fit photos vs functional plastic parts',
      paragraphs: [
        'FDM/SLA prototypes validate assembly fit quickly and cheaply. CNC in POM, PC, or nylon provides thread strength, bearing press fits, and temperature stability FDM cannot — even at quantity 5.',
        'Do not accept printed parts as production equivalents unless the PO specifies additive process, material, and density — machined plastic quotes assume solid stock properties.',
      ],
    },
    {
      heading: 'When to move from print to CNC',
      paragraphs: [
        'Before customer-facing durability tests, snap-fit cycle life, or any load-bearing feature — upload STEP for CNC quote alongside printed iteration.',
      ],
    },
  ],
  'aluminum-vs-steel-machining': [
    {
      heading: 'Density, strength, and cycle time',
      paragraphs: [
        'Aluminum (6061, 7075) machines faster, lighter, and anodizes well — default for brackets, housings, and aerospace structure where weight matters. Steel (1018, 4140, stainless) wins on hardness, wear, and modulus when deflection or magnetic immunity drives the spec.',
        'Replacing steel with aluminum without FEA can fail on stiffness — same outer section, aluminum deflects ~3× more. Titanium sits between on weight/strength but at premium cost.',
      ],
    },
    {
      heading: 'RFQ material callouts',
      paragraphs: [
        'Specify alloy and temper, not just "aluminum" or "steel." We default 6061-T6 and 304L when unspecified — state heat treat, hardness, and corrosion environment to avoid wrong alloy quotes.',
      ],
    },
  ],
  '6061-vs-2024-aluminum': [
    {
      heading: 'General structural vs aerospace alloy',
      paragraphs: [
        '6061-T6 is the global default for machined brackets, plates, and housings — excellent machinability, corrosion, and anodize response. 2024-T3/T351 offers higher strength in aerospace sheet and bar applications but worse corrosion without cladding or coating.',
        'Most industrial RFQs never need 2024 — specify it when the drawing or BOM calls aerospace alloy traceability, not preemptively for stiffness alone.',
      ],
    },
    {
      heading: 'Machining and finish notes',
      paragraphs: [
        '2024 can gall without sharp tooling and proper coolant; anodize cosmetics differ from 6061. Mixed assemblies anodized together may color-match poorly — keep alloys consistent per batch.',
      ],
    },
  ],
  'titanium-vs-aluminum': [
    {
      heading: 'Weight vs cost and machinability',
      paragraphs: [
        'Titanium (Grade 2, Grade 5) offers exceptional strength-to-weight and corrosion resistance — aerospace, medical, and marine hardware. Aluminum is 2× lighter per volume at lower cost and machines 3–5× faster on equivalent features.',
        'Titanium quotes include higher tool wear, slower feeds, and fire-safe chip handling — unit cost is multiples of aluminum for similar geometry.',
      ],
    },
    {
      heading: 'When titanium is justified',
      paragraphs: [
        'Saltwater service without heavy section, biocompatibility, temperature above aluminum limits, or FEA showing aluminum cannot meet stress at required weight. Otherwise 7075 or stainless may solve the problem cheaper.',
      ],
      bullets: [
        'State grade (Grade 2 vs Ti-6Al-4V), quantity, and critical surfaces.',
        'Note NACE, AMS, or medical cert requirements if applicable.',
      ],
    },
  ],
  '4140-vs-1045-steel': [
    {
      heading: 'Alloy vs medium-carbon simplicity',
      paragraphs: [
        '4140 chromium-molybdenum steel heat-treats to high strength and toughness — shafts, gears, and loaded pins. 1045 is simpler medium-carbon steel for lightly loaded pins, plates, and parts that may be induction-hardened locally without full alloy cost.',
        'We default heat-treatable shafts to 4140 when the drawing shows HRC targets — 1045 when the part is a low-stress spacer or bushing.',
      ],
    },
    {
      heading: 'Heat treat on the drawing',
      paragraphs: [
        'State hardness, case vs through, and which surfaces are pre- vs post-heat-treat machined. Quoting 1045 for a gear needing through-hardened teeth is a failure mode we flag in DFM review.',
      ],
    },
  ],
  'grade-2-vs-grade-5-titanium': [
    {
      heading: 'Commercial pure vs alloy titanium',
      paragraphs: [
        'Grade 2 (CP titanium) is ductile, corrosion-resistant, and common for chemical hardware and welded assemblies — moderate strength, excellent formability. Grade 5 (Ti-6Al-4V) is the aerospace workhorse with roughly double yield strength and fatigue performance.',
        'We quote Grade 2 for non-structural flanges and housings; Grade 5 when UTS/fatigue or AMS 4928 traceability is on the print.',
      ],
    },
    {
      heading: 'Machining difference',
      paragraphs: [
        'Grade 5 work-hardens faster — lower feeds, rigid setup, and fresh tooling. Mixing grades in one anodize or passivation batch is avoided for cert consistency.',
      ],
    },
  ],
  'hot-rolled-vs-cold-rolled-steel': [
    {
      heading: 'Stock form drives finish and stability',
      paragraphs: [
        'Hot rolled plate and structural sections have mill scale and loose dimensional tolerance — fine when all surfaces are face-milled anyway. Cold-finished bar and sheet offer tighter sections, smoother surfaces (Ra 1.6–3.2 µm), and lower residual stress for precision turned pins and shafts.',
      ],
    },
    {
      heading: 'Cost vs downstream machining',
      paragraphs: [
        'Thick bracket from hot rolled saves 15–20% material vs cold rolled when cosmetic as-rolled faces are not exposed. Precision bar stock parts should specify cold finished unless every surface is cut in the first operation.',
      ],
    },
  ],
  'inconel-vs-stainless-steel': [
    {
      heading: 'High temperature and sour service',
      paragraphs: [
        'Inconel 625/718 handles extreme temperature and aggressive environments where 316L fails — but costs 5–10× in material and 3× in cycle time due to work hardening and tool wear.',
        '316L carries most corrosive duty at one-third the machining cost. We push back on Inconel unless partial pressure, temperature, or NACE sour-service notes require nickel alloy.',
      ],
    },
    {
      heading: 'RFQ documentation',
      paragraphs: [
        'Specify alloy, AMS/ASTM traceability, and whether PMI is required on receipt. Inconel quotes include conservative tool life and may state minimum lot size for economic setup.',
      ],
    },
  ],
  'brass-vs-copper': [
    {
      heading: 'Machinability vs conductivity',
      paragraphs: [
        'Free-machining brass (C360) is among the fastest-turning metals — fittings, valves, and decorative hardware. Copper (C110/C101) offers maximum electrical and thermal conductivity but galls and builds BUE without sharp tooling and generous coolant.',
        'Choose brass when machinability and appearance matter; copper when I²R loss or heat spreading drives the spec and finish allows.',
      ],
    },
    {
      heading: 'Plating and contact applications',
      paragraphs: [
        'Electrical bus bars often specify copper with nickel or silver plate — state conductivity test or plating spec on RFQ. Brass is not a drop-in electrical substitute for high-current copper without derating.',
      ],
    },
  ],
  'pom-vs-nylon': [
    {
      heading: 'Dimensional stability vs toughness',
      paragraphs: [
        'POM (Delrin/acetal) holds tight tolerance and low moisture absorption — precision bushings, gears, and snap fits. Nylon (PA6/PA66) absorbs humidity and swells, affecting press-fit IDs, but offers better impact toughness in dry wear pads.',
        'We default POM for tight IDs in controlled environments; nylon when impact and cost matter and moisture swing is bounded.',
      ],
    },
    {
      heading: 'Machining notes',
      paragraphs: [
        'Both require sharp tools and avoid excessive heat — state operating environment (wet, chemical, UV) so we do not quote POM for outdoor UV exposure without stabilizer grade.',
      ],
    },
  ],
  'mic6-vs-extruded-aluminum': [
    {
      heading: 'Fixture plate flatness vs structural plate',
      paragraphs: [
        'MIC-6 (or similar cast tooling plate) is stress-relieved and delivered with tight flatness — ideal for vacuum fixtures, optical bases, and large face-milled panels that must not warp after pocketing.',
        '6061 rolled plate warps more after heavy machining — acceptable for structural brackets where flatness is not marked critical to 0.05 mm per 300 mm.',
      ],
    },
    {
      heading: 'Strength limitation',
      paragraphs: [
        'MIC-6 yield is low (~105 MPa) — not for loaded structural members. Use 6061-T6 plate when strength matters; MIC-6 when stability and flatness dominate.',
      ],
    },
  ],
  'step-file-vs-iges': [
    {
      heading: 'Solid B-rep vs legacy surfaces',
      paragraphs: [
        'STEP (AP214/AP242) carries solid models CAM can import reliably — our default for quoting milling, turning, and 5-axis. IGES surface files often fail on fillets, lose faces, or import as open shells, delaying quote until STEP arrives.',
        'PDF drawings alone trigger DFM holds — attach STEP even when 2D print is contractually controlling.',
      ],
    },
    {
      heading: 'Version and export settings',
      paragraphs: [
        'Export as millimeter solids from native CAD; include part number in filename. Assemblies should be shared as individual part STEP files or clearly defined multi-body with BOM — not unlabeled IGES from 2005.',
      ],
      bullets: [
        'Preferred: STEP AP242 or AP214 solid.',
        'Include PDF with tolerances, finishes, and notes.',
        'State native CAD if STEP export fails (Fusion, SolidWorks, etc.).',
      ],
    },
  ],
  'express-vs-standard-lead-time': [
    {
      heading: 'What rush actually means on the floor',
      paragraphs: [
        'Express slots prioritize released CAM on common alloys (6061, 304, 1018) with frozen drawings — often 7–10 business days vs 15–20 standard. First-time 5-axis programs, Inconel, hard-coat anodize lots, or design revs in flight stay on standard lead even with rush fee.',
        'Paying express on an unreleased drawing does not compress DFM iteration — freeze Rev before paying premium.',
      ],
    },
    {
      heading: 'Honest quoting',
      paragraphs: [
        'We quote achievable days rather than miss a line-stop date. Rush fee covers overtime and schedule displacement, not magic — state true need-by and whether partial ship is acceptable.',
      ],
    },
  ],
  'carbide-vs-hss-tooling': [
    {
      heading: 'Shop capability, not buyer tooling choice',
      paragraphs: [
        'Production aluminum and steel above ~200 SFM runs carbide inserts — buyers rarely specify cutter material on RFQ. HSS remains on taps, small form tools, and some reamers where carbide brittleness matters.',
        'Inconel, 316, and hardened steels assume carbide with conservative feeds — quoting as if HSS rates apply underestimates cycle time.',
      ],
    },
    {
      heading: 'What affects your piece price',
      paragraphs: [
        'Material machinability, depth of cut, and tool life on exotic alloys drive cost more than HSS vs carbide as a drawing note. Specify material grade and hardness so traveler uses correct speeds.',
      ],
    },
  ],
};
