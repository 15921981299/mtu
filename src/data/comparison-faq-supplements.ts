/** Extra FAQs appended to indexed comparison pages (target 4 total per whitelist slug). */
export const comparisonFaqSupplements: Partial<
  Record<string, { question: string; answer: string }[]>
> = {
  // +3 each (had 1 FAQ)
  'prototype-vs-production-machining': [
    {
      question: 'When should I switch from prototype to production pricing?',
      answer:
        'After FAI approval and before ordering 50+ identical pieces — production quotes assume frozen drawings, dedicated fixtures, and batch sampling.',
    },
    {
      question: 'Do prototype parts need the same material certs as production?',
      answer:
        'Only if you are validating cert traceability or PPAP path — otherwise prototype lots often use the same alloy without full EN 10204 until production PO.',
    },
    {
      question: 'Can I expect the same unit price on prototype and production lots?',
      answer:
        'No. Prototype pricing includes flexible setup and DFM iteration; production spreads fixture and program cost across quantity — unit price typically drops 30–60% at 100+ pcs.',
    },
  ],
  'turning-vs-milling-cost': [
    {
      question: 'Why is my cylindrical part quoted on a mill instead of a lathe?',
      answer:
        'CAD defaults and unfamiliar geometry often route round parts to VMC — send STEP and we re-quote on lathe when purely rotational features dominate.',
    },
    {
      question: 'Does mill-turn cost more than separate milling and turning?',
      answer:
        'Mill-turn hourly rates are higher, but one setup often beats two operations plus transfer error — we compare total piece cost in the quote.',
    },
    {
      question: 'What geometry signals turning is cheaper?',
      answer:
        'Round bar stock, OD/ID features, threads, and grooves on a cylindrical body — especially when all critical tolerance is concentric to one axis.',
    },
  ],
  'laser-cutting-vs-cnc-milling': [
    {
      question: 'What thickness is laser cutting practical for?',
      answer:
        'Typical laser limits depend on machine power — thin gauge to ~12–25 mm steel/aluminum for profile cuts; thicker plate often shifts to plasma or mill from pre-cut blank.',
    },
    {
      question: 'Can laser cutting hold ±0.05 mm tolerance?',
      answer:
        'Not on cut edges — kerf, taper, and heat affect fit. Milling or reaming is required when prints call tight hole or edge tolerance.',
    },
    {
      question: 'Should I quote laser only or laser plus mill?',
      answer:
        'If the drawing shows pockets, countersinks, or threaded holes, quote the secondary machining — laser-only quotes miss half the cycle time.',
    },
  ],
  'investment-casting-vs-cnc': [
    {
      question: 'What quantity makes investment casting cheaper than CNC?',
      answer:
        'Roughly 500+ pcs when geometry has draft and thin walls that would require heavy milling from solid — below that, CNC avoids wax tooling and cast porosity risk.',
    },
    {
      question: 'Can cast parts meet tight GD&T without machining?',
      answer:
        'Rarely — plan machined datums on cast blanks for bearing bores, sealing faces, and threads. The RFQ should show both cast and finished prints.',
    },
    {
      question: 'Which alloys are common for investment cast then machine?',
      answer:
        'Stainless, carbon steel, and aluminum investment castings with CNC finish on critical features — state alloy and cert requirements on the RFQ.',
    },
  ],
  'cnc-machining-vs-die-casting': [
    {
      question: 'At what volume does die casting beat CNC on unit cost?',
      answer:
        'Often above 1,000–5,000 pcs depending on part size and die cost — prototypes and bridge quantities stay on CNC until volume amortizes tooling.',
    },
    {
      question: 'What tolerances force CNC instead of as-cast?',
      answer:
        'Tight flatness, bearing fits, and sealing faces below ~±0.05 mm — die cast plus CNC skim is standard, but full CNC from bar wins on small lots.',
    },
    {
      question: 'Should I include annual volume on the RFQ?',
      answer:
        'Yes — without volume we default to CNC for first articles because die cast NRE dominates small-lot economics.',
    },
  ],
  'cnc-vs-metal-3d-printing': [
    {
      question: 'When is metal 3D printing cheaper than CNC?',
      answer:
        'On low-volume parts with internal lattices, conformal channels, or geometry impossible to mill — not on standard brackets at 20+ identical pieces.',
    },
    {
      question: 'Do metal AM parts need CNC finishing?',
      answer:
        'Usually on mating surfaces, threads, and bearing bores — as-built AM tolerance is ±0.1–0.3 mm and surface roughness is high.',
    },
    {
      question: 'Can I get material certificates on AM metal parts?',
      answer:
        'Powder lot traceability is available on qualified builds — wrought bar CNC still wins when EN 10204 3.1 on standard alloy is mandatory without AM qualification.',
    },
  ],
  'stainless-304-vs-316': [
    {
      question: 'Is 316 harder to machine than 304?',
      answer:
        'Slightly — molybdenum adds toughness and tool wear, but cycle time difference is modest compared to material cost delta.',
    },
    {
      question: 'What environments require 316L over 304L?',
      answer:
        'Marine splash, chlorides, aggressive wash-down chemicals, and sour-service exposure — indoor automation brackets rarely need 316.',
    },
    {
      question: 'Should I specify 304L or 316L on the drawing?',
      answer:
        'Always call out low-carbon L grade for welded or corrosion-critical parts — we default 304L when alloy is unspecified on RFQs.',
    },
  ],
  'titanium-vs-aluminum': [
    {
      question: 'How much more does titanium machining cost than aluminum?',
      answer:
        'Typically 3–5× cycle time and higher material cost — quotes reflect slower feeds, tool wear, and fire-safe chip handling.',
    },
    {
      question: 'When is aluminum strong enough instead of titanium?',
      answer:
        'When corrosion is mild, temperature is below aluminum limits, and FEA shows 7075 or thick section meets deflection — titanium is not a default upgrade.',
    },
    {
      question: 'Which titanium grade should I specify?',
      answer:
        'Grade 2 (CP) for ductile, corrosion hardware; Ti-6Al-4V (Grade 5) for structural aerospace and medical load cases — state grade on the RFQ.',
    },
  ],
  '4140-vs-1045-steel': [
    {
      question: 'Which steel heat-treats to higher hardness?',
      answer:
        '4140 alloy steel — through-hardened shafts and gears. 1045 suits lighter loads or local induction hardening without full alloy cost.',
    },
    {
      question: 'Should I specify hardness on the drawing?',
      answer:
        'Yes — state HRC/Rc target, case vs through, and whether machining is pre- or post-heat-treat to avoid wrong stock condition quotes.',
    },
    {
      question: 'Is 1045 acceptable for a gear?',
      answer:
        'Only for lightly loaded or induction-hardened teeth — loaded gears needing through hardness belong on 4140 or alloy gear stock.',
    },
  ],
  'grade-2-vs-grade-5-titanium': [
    {
      question: 'Which grade machines faster?',
      answer:
        'Grade 2 (CP) — Grade 5 work-hardens faster and needs lower feeds and rigid setup.',
    },
    {
      question: 'Can I weld Grade 5 like Grade 2?',
      answer:
        'Grade 2 welds more easily; Grade 5 needs qualified weld procedures and is standard for structural aerospace — match grade to process on the print.',
    },
    {
      question: 'When is Grade 2 enough instead of Grade 5?',
      answer:
        'Non-structural flanges, chemical hardware, and ductile corrosion parts — specify Grade 5 when UTS, fatigue, or AMS traceability is required.',
    },
  ],
  'hot-rolled-vs-cold-rolled-steel': [
    {
      question: 'Does hot rolled plate need more facing stock?',
      answer:
        'Yes — mill scale and loose tolerance mean first ops remove more material; cold-finished bar arrives closer to final dimension for turned parts.',
    },
    {
      question: 'When is hot rolled acceptable for precision parts?',
      answer:
        'When every functional surface is face-milled or turned and cosmetic as-rolled faces are not exposed — thick brackets often use hot rolled plate.',
    },
    {
      question: 'Will hot rolled warp after machining?',
      answer:
        'More than stress-relieved cold finished stock — heavy material removal on hot rolled plate may need stress relief or rough-then-finish sequencing.',
    },
  ],
  'inconel-vs-stainless-steel': [
    {
      question: 'Why does Inconel cost so much more to machine?',
      answer:
        'Work hardening, low thermal conductivity, and rapid tool wear — cycle time is often 3× 316L for the same feature count.',
    },
    {
      question: 'When is 316L sufficient instead of Inconel?',
      answer:
        'Most corrosive duty below ~400°C without sour gas or extreme chloride — Inconel is for temperature and environment 316 cannot survive.',
    },
    {
      question: 'What should I put on an Inconel RFQ?',
      answer:
        'Alloy (625/718), AMS/ASTM traceability, PMI requirements, and realistic quantity — quotes may include minimum lot for economic setup.',
    },
  ],
  'brass-vs-copper': [
    {
      question: 'Which metal machines faster?',
      answer:
        'Free-machining brass (C360) — among the fastest-turning alloys. Copper galls without sharp tooling and generous coolant.',
    },
    {
      question: 'Can brass replace copper for electrical bus bars?',
      answer:
        'Only with derating — copper wins on I²R loss and thermal spreading; brass suits fittings and valves where conductivity is secondary.',
    },
    {
      question: 'What copper grade for machined electrical parts?',
      answer:
        'C110/C101 OFHC for conductivity — state plating (nickel, silver) and current rating if electrical test is required.',
    },
  ],
  'pom-vs-nylon': [
    {
      question: 'Which plastic holds tighter press-fit IDs?',
      answer:
        'POM (Delrin) — low moisture absorption. Nylon swells 1–2% in humid environments and shifts press fits.',
    },
    {
      question: 'When is nylon better than POM?',
      answer:
        'Impact-heavy wear pads and cost-sensitive parts where moisture swing is bounded — not for tight IDs in uncontrolled humidity.',
    },
    {
      question: 'Can POM and nylon be used outdoors?',
      answer:
        'UV-stabilized grades exist for both — specify environment (wet, chemical, UV) so we quote the correct grade, not generic acetal or PA6.',
    },
  ],
  'mic6-vs-extruded-aluminum': [
    {
      question: 'When is MIC-6 worth the premium over 6061 plate?',
      answer:
        'Large fixture plates and optical bases needing tight flatness (e.g. 0.05 mm per 300 mm) without warping after pocketing — structural brackets use 6061-T6.',
    },
    {
      question: 'Can MIC-6 replace 6061 for loaded brackets?',
      answer:
        'No — MIC-6 yield is low (~105 MPa). Use 6061-T6 when strength matters; MIC-6 when stability and flatness dominate.',
    },
    {
      question: 'Is extruded aluminum the same as MIC-6?',
      answer:
        'No — extrusion gives constant profile along length; MIC-6 is cast tooling plate with controlled flatness. Choose by geometry and tolerance, not interchangeably.',
    },
  ],
  'china-vs-local-cnc-supplier': [
    {
      question: 'What lead time should I plan for China CNC samples?',
      answer:
        'Typically 1–3 weeks production plus 3–5 days express air or 1–3 weeks ocean — state need-by date on RFQ for honest scheduling.',
    },
    {
      question: 'When should I keep machining local instead of offshore?',
      answer:
        'Same-week design iteration, ITAR/export-controlled programs, and walk-in DFM — local shops win on speed and compliance, not always on unit price.',
    },
    {
      question: 'What documents reduce offshore supplier risk?',
      answer:
        'Paid FAI with CMM report, EN 10204 3.1 when specified, clear INCOTERMS, and frozen drawing revision before production PO.',
    },
  ],
  'step-file-vs-iges': [
    {
      question: 'Why do shops reject IGES files?',
      answer:
        'IGES often imports as open surfaces, loses fillets, or gaps faces — CAM cannot reliably toolpath until repaired or re-exported as STEP solid.',
    },
    {
      question: 'Is PDF enough for a CNC quote?',
      answer:
        'No for complex 3D — PDF alone triggers DFM holds. Attach STEP solid plus PDF with tolerances, finishes, and notes.',
    },
    {
      question: 'Which STEP version should I export?',
      answer:
        'AP214 or AP242 solid in millimeters from native CAD — include part number in filename and share individual part files for assemblies.',
    },
  ],
  'express-vs-standard-lead-time': [
    {
      question: 'What parts qualify for express lead time?',
      answer:
        'Frozen drawings on common alloys (6061, 304, 1018) without first-time 5-axis programs, exotic material, or concurrent design changes.',
    },
    {
      question: 'Does paying rush fee guarantee overnight delivery?',
      answer:
        'No — rush covers overtime and schedule priority on achievable cycle, not magic. We quote honest days rather than miss a line-stop date.',
    },
    {
      question: 'Should I freeze the drawing before requesting express?',
      answer:
        'Yes — express on a rev-in-progress drawing does not compress DFM iteration; freeze Rev before paying premium.',
    },
  ],
  'carbide-vs-hss-tooling': [
    {
      question: 'Do buyers need to specify carbide vs HSS on RFQ?',
      answer:
        'Rarely — shops choose tooling. Specify material grade and hardness so feeds and cycle time reflect actual machinability.',
    },
    {
      question: 'Why does Inconel cost more if tooling is carbide either way?',
      answer:
        'Tool life and conservative feeds on work-hardening alloys drive cycle time — not the HSS vs carbide label on the drawing.',
    },
    {
      question: 'When does HSS still appear in production machining?',
      answer:
        'Taps, small form tools, and some reamers where carbide brittleness matters — production aluminum and steel above ~200 SFM use carbide inserts.',
    },
  ],

  // +2 each (had 2 FAQs)
  'cnc-machining-vs-injection-molding': [
    {
      question: 'Can CNC plastic parts replace injection molding prototypes?',
      answer:
        'Yes — machined POM, PC, or PEEK validates fit before steel mold investment; production at 10k+ pcs shifts to molding unless metal is required.',
    },
    {
      question: 'What plastic quantities stay on CNC?',
      answer:
        'Medical and aerospace structural plastics, tight bearing bores, and lots under a few hundred where mold NRE exceeds part value.',
    },
  ],
  'cnc-machining-vs-sheet-metal-fabrication': [
    {
      question: 'When should I fabricate sheet metal instead of machining from plate?',
      answer:
        'Enclosures, panels, and bent brackets from gauge stock — machining wins on thick plate, precision pockets, threads, and tight flatness on monolithic parts.',
    },
    {
      question: 'Can a part combine sheet metal and CNC?',
      answer:
        'Yes — common for fab shells with machined insert blocks; BOM should show which features are bent vs milled.',
    },
  ],
  'cnc-machining-vs-metal-stamping': [
    {
      question: 'What thickness pushes parts from stamping to CNC?',
      answer:
        'Above ~3–6 mm structural steel or aluminum, press capacity and springback drive cost — milling or laser-plus-mill competes at moderate volume.',
    },
    {
      question: 'Should I compare stamp piece price to 10-piece CNC?',
      answer:
        'No — include stamping die NRE and amortize over annual volume; prototype stamped parts are often laser or CNC cut first.',
    },
  ],
  'cnc-machining-vs-extrusion': [
    {
      question: 'When should I extrude then machine vs machine from solid?',
      answer:
        'Extrude when the design fits a standard or custom profile along length; machine from plate when volume is low or cross-section is non-standard.',
    },
    {
      question: 'What tolerance can as-extruded aluminum hold?',
      answer:
        'Typically ±0.1–0.3 mm on profile — tighter sealing faces and bores need CNC secondary ops.',
    },
  ],
  'cnc-machining-vs-vacuum-casting': [
    {
      question: 'Are vacuum cast parts interchangeable with CNC metal?',
      answer:
        'No — urethane/silicone molds produce plastic-like prototypes for fit and photos; CNC metal validates load, temperature, and tolerance.',
    },
    {
      question: 'How many parts does vacuum casting produce per mold?',
      answer:
        'Roughly 10–50 per silicone tool — CNC suits functional test quantities and production metal paths.',
    },
  ],
  'cnc-machining-vs-forging': [
    {
      question: 'When does forging beat machining from bar?',
      answer:
        'High-volume fatigue-critical parts where aligned grain flow matters — shafts and loaded brackets at production tonnage.',
    },
    {
      question: 'What should a forge-then-machine RFQ include?',
      answer:
        'Near-net forged blank drawing plus finished print with stock allowance and machined datum scheme.',
    },
  ],
  'cnc-vs-plastic-3d-printing': [
    {
      question: 'When should I move from FDM/SLA to CNC plastic?',
      answer:
        'Before durability tests, snap-fit cycle life, or load-bearing threads — machined POM/PC/nylon provides solid-stock properties FDM cannot.',
    },
    {
      question: 'Can printed parts be used as production equivalents?',
      answer:
        'Only if the PO specifies additive process, material, and density — machined quotes assume wrought plastic properties.',
    },
  ],
  'aluminum-vs-steel-machining': [
    {
      question: 'Is aluminum always cheaper to machine than steel?',
      answer:
        'Usually faster cycle and lower tool wear on 6061 vs mild steel — but replacing steel with aluminum without FEA can fail on stiffness (aluminum deflects ~3× more per section).',
    },
    {
      question: 'What should I specify instead of just "aluminum" or "steel"?',
      answer:
        'Alloy and temper (6061-T6, 4140, 304L), heat treat, hardness, and corrosion environment — we default 6061-T6 and 304L when unspecified.',
    },
  ],
  'aluminum-6061-vs-7075': [
    {
      question: 'Which alloy anodizes more evenly?',
      answer:
        '6061 — 7075 can show uneven color and is more prone to cosmetic variation in clear or dyed anodize.',
    },
    {
      question: 'When must I specify 7075 on the RFQ?',
      answer:
        'When FEA, yield strength, or field failure mode requires it — not preemptively for brackets where 6061 performs equally.',
    },
  ],
  '6061-vs-2024-aluminum': [
    {
      question: 'Is 2024 better than 6061 for all aerospace parts?',
      answer:
        'No — 2024 offers higher strength in sheet/bar aerospace apps but worse corrosion without cladding; most industrial brackets stay on 6061-T6.',
    },
    {
      question: 'Can 6061 and 2024 be anodized together?',
      answer:
        'Possible but color match may differ — keep alloys consistent per batch for cosmetic anodize lots.',
    },
  ],

  // +1 each (had 3 FAQs)
  '3-axis-vs-5-axis': [
    {
      question: 'How do I know if my part needs 5-axis from the drawing alone?',
      answer:
        'Look for features on three or more faces with tight positional tolerances — upload STEP and we confirm setup count in DFM notes.',
    },
  ],
  'wire-edm-vs-cnc-milling': [
    {
      question: 'Does wire EDM work on aluminum?',
      answer:
        'Technically yes but rarely economical — wire EDM wins on hardened steel, tight internal corners, and thin walls where milling would need fragile setups.',
    },
  ],
  'swiss-vs-conventional-turning': [
    {
      question: 'What part size is too large for Swiss turning?',
      answer:
        'Typically above ~32–40 mm OD or low L/D ratios — conventional chuck turning is faster to quote and machine for large cylindrical hardware.',
    },
  ],
  'peek-vs-ptfe': [
    {
      question: 'When is PTFE better than PEEK despite lower strength?',
      answer:
        'Lowest friction, chemical inertness, and cryogenic service — PEEK wins on structural load and continuous temperature above ~150°C.',
    },
  ],
  'anodizing-vs-powder-coating': [
    {
      question: 'How much thickness does each finish add?',
      answer:
        'Anodize grows ~5–25 µm into the surface — powder coat adds ~50–100 µm that affects threads and bores; note mask callouts on RFQ.',
    },
  ],
  'anodizing-type-ii-vs-iii': [
    {
      question: 'Can Type III hard anodize replace Type II for wear?',
      answer:
        'Yes on wear-critical aluminum — Type III is thicker and harder but costs more and may need tighter dimensional allowance on fits.',
    },
  ],
  'passivation-vs-electropolishing': [
    {
      question: 'Which finish is required for implant-grade stainless?',
      answer:
        'Electropolish is common for smooth, cleanable medical surfaces — passivation (citric or nitric) restores oxide on standard 304/316 hardware.',
    },
  ],
  'outsource-vs-in-house-machining': [
    {
      question: 'What programs should stay in-house vs outsource?',
      answer:
        'ITAR, extreme IP, and same-day iteration often stay local; commercial hardware with NDA and documented inspection outsources at lower total cost.',
    },
  ],
  'iso-2768-m-vs-f': [
    {
      question: 'Which ISO 2768 class for CNC milled parts?',
      answer:
        'Medium (m) for general machined brackets; fine (f) when mating fits or GD&T on the print require tighter default linear tolerances.',
    },
  ],
  'cpk-vs-ppk-capability': [
    {
      question: 'When is Ppk required instead of Cpk?',
      answer:
        'FAI and pilot lots before PPAP — Ppk uses overall variation including batch drift; Cpk uses within-subgroup variation for ongoing SPC.',
    },
  ],
};
