/** Shop-floor editorial notes for comparisons missing inline editorialNote (E-E-A-T). */
export const comparisonEditorialNotes: Partial<Record<string, string>> = {
  'grade-2-vs-grade-5-titanium':
    'Non-structural chemical hardware and welded assemblies default to Grade 2 — we quote Ti-6Al-4V only when the drawing calls out UTS or fatigue above CP limits; Grade 5 adds 30–50% cycle time on the same feature set.',
  '4140-vs-1045-steel':
    'Heat-treatable shafts and gears default to 4140 on our quotes — 1045 is fine for pins and low-stress brackets but we flag it when HRC 40+ or impact load is implied and the buyer only wrote "carbon steel."',
  'anodizing-type-ii-vs-iii':
    'Cosmetic housings and dyed colors get Type II unless the drawing specifies wear or hardness — Type III adds ~25 µm into the bore and we mask threads by default because tap fit changes after hard coat.',
  '303-vs-304-stainless':
    'Non-welded turned fittings default to 303 for cycle time — we push back to 304 on any weld symbol or food/marine note; silent 303 substitution is how porosity claims happen on welded assemblies.',
  'peek-vs-ptfe':
    'Continuous-use temps above 150 °C or structural load push us to PEEK — PTFE wins on pure friction and chemical soak but creeps under bolt preload; we ask for clamp load before quoting PTFE structural parts.',
  'sinker-edm-vs-wire-edm':
    'Blind pockets and sharp internal corners go to sinker EDM — wire EDM is our default for through-profiles in hardened stock above HRC 45; quoting mill-only on 0.3 mm internal radii is a rework trap we call out in inquiry prep.',
  'simultaneous-vs-positional-5-axis':
    'Sculpted impeller and blade surfaces need simultaneous — for prismatic parts with indexed holes we quote 3+2 first; simultaneous CAM premium only pays when more than ~30% of cycle is on compound surfaces.',
  '4140-vs-1018-steel':
    '1018 cold-finished bar is our default for low-stress pins and plates — we switch to 4140 when the drawing shows heat treat, keyways under load, or hardness callouts; 1018 cannot hold HRC targets after carburize without case depth planning.',
  'magnesium-vs-aluminum':
    'We only quote AZ31 when weight savings beat fire-handling cost — shop rules require dedicated tooling and chip control; for most brackets 6061 still wins on cost and anodize cosmetics unless density is the primary spec.',
  'cnc-vs-manual-machining':
    'Prototype brackets with six or fewer holes sometimes go manual in partner shops — above ~20 identical parts or any supplier documents balloon map we quote CNC; manual quotes do not include the same ±0.02 mm repeatability.',
  'turning-vs-milling-cost':
    'Round stock with turned OD/ID is quoted on lathe first — if milled features exceed ~40% of cycle we re-quote as mill-turn; buyers comparing "milling only" on a shaft often see 25–40% savings after we move it to turning.',
  'concentricity-vs-runout':
    'We inspect runout on live round features every day — concentricity to datums not on the same setup needs supplier documents and adds cost; if the drawing only needs "spins true," runout to a machined shoulder is what we recommend on RFQ review.',
  'honing-vs-grinding':
    'Hydraulic bores and H8/H7 fits get hone after pre-bore — surface grinding is for flatness and seal faces; quoting grind on a 40 mm ID is usually the wrong process and we flag it before PO.',
  'iso-vs-ansi-drawing-standards':
    'Mixed ISO/ANSI title blocks cause the most RFQ delays we see — we ask for one primary system and metric or inch for threads; dual-dimension drawings get a clarification hold until rev B lands.',
  'roughing-vs-finishing-cnc':
    'We program separate rough and finish tools on sealing faces — skipping finish pass to "save cost" is how Ra 3.2 lands on a Ra 0.8 callout; budget quotes state as-machined finish explicitly.',
  'carbide-vs-hss-tooling':
    'Production aluminum and steel above 200 SFM stay on carbide — HSS only appears on small taps and form tools in our travelers; if your material is Inconel or 316, carbide insert cost is already in the baseline quote.',
  '6061-vs-5052-aluminum':
    '6061-T6 is our default structural aluminum — 5052 only when the drawing calls out formability or marine sheet behavior; 5052 machines gummier and anodize color matches poorly to 6061 in the same assembly.',
  'ip65-vs-ip68-enclosures':
    'IP65 is achievable with gasket groove machining and stated compression — IP68 needs submerged test protocol on the PO; we will not certify IP68 from a generic "waterproof" note without duration and depth.',
  'passivation-vs-electropolishing':
    '316L medical wetted surfaces often need electropolish for Ra and passive layer — citric passivation is our default for industrial 304/316; we ask which spec (ASTM A967 vs electropolish Ra) before quoting stainless finish lots.',
  '316-vs-17-4ph-stainless':
    'Marine and chloride service stays on 316L — 17-4PH only when H900 strength is on the drawing; we reject 17-4 on sour-service notes without NACE review because hardness and SCC risk do not match 316.',
  'ra-vs-rz-surface-roughness':
    'Sealing faces quoted in Ra with profilometer trace — if the drawing says Rz only, we convert and confirm direction; mixed Ra/Rz on one part without method is a common inspection dispute we resolve at quote stage.',
  'black-oxide-vs-zinc-plating':
    'Indoor steel hardware defaults to zinc on carbon steel — black oxide is for low-glare assemblies with oil film maintained; we note corrosion life in quote because black oxide without post-oil fails salt spray quickly.',
  'mic6-vs-extruded-aluminum':
    'Plate fixtures and vacuum chucks default to MIC-6 cast plate for stability — extruded 6061 plate warps on large face-milled panels; we specify cast plate when flatness under 0.05 mm per 300 mm is marked critical.',
  'polycarbonate-vs-acrylic':
    'Impact-prone covers get PC — acrylic only when optics and UV clarity matter; PC machines with stringy chips and needs sharp tooling; we ask operating temp because PC creeps near 100 °C continuous.',
  'case-hardening-vs-through-hardening':
    'Gears and pins with wear surface only default to case harden on 1018/8620 — through-harden 4140 when core toughness matters; we confirm case depth on drawing because grind-to-size after case changes OD.',
  '1045-vs-1018-steel':
    '1018 for low-stress pins and soft assemblies — 1045 when slightly higher strength or induction-hardened surfaces appear; we rarely stock 1045 for weldments because weld zone hardness jumps complicate fixture design.',
  'true-position-vs-concentricity':
    'Mating bolt circles get true position with MMC on clearance holes — concentricity is reserved when a single bore must run true to a datum bore on one setup; over-using concentricity doubles supplier documents time on our FAI.',
  '303-vs-316-stainless':
    '303 is never our answer for marine or chloride — even when machinability is tight; we quote 316L and accept longer cycle rather than substitute 303 on coastal or food equipment drawings.',
  'inconel-vs-stainless-steel':
    'Sour service and elevated temp force Inconel review — 316L carries most corrosive duty at one-third cycle cost; we ask for partial pressure class before quoting Inconel because PMI and tool life change the whole traveler.',
  'bronze-vs-brass':
    'Bearings and wear pads default to bronze alloys — brass for fittings and low-load bushings; we quote C932 bearing bronze when impact load appears; brass galling under high PV gets flagged in inquiry prep.',
  'nickel-plating-vs-zinc-plating':
    'Corrosion-critical or cosmetic bright steel gets nickel — zinc is standard on indoor hardware; we note nickel adds 2–4 days and thickness affects thread class; masked threads are specified on PO for both.',
  'carburizing-vs-nitriding':
    'Low-distortion thin cases on finished bores lean nitriding — carburize when deep case and grind allowance exist; we hold nitrided parts under 0.002 mm stock removal on critical diameters per traveler note.',
  'iso-2768-m-vs-f':
    'ISO 2768-m is our default general tolerance on RFQ unless precision holes are ballooned — f-class on every dimension adds 20–35% without functional gain; we suggest m + local critical callouts on sample quotes.',
  'thread-milling-vs-tapping':
    'Blind holes in 304 and Inconel get thread mill — tapping stays on through holes in aluminum and 1018; we thread-mill anything under M3 in stainless because tap breakage scrap rate is too high on production lots.',
  'delrin-vs-peek':
    'Delrin (POM) for precision bushings and low moisture — PEEK when continuous 120 °C+ or autoclave cycles appear; PEEK quotes include annealing note because stress relief changes bore size after roughing.',
  'bead-blast-vs-as-machined':
    'Cosmetic external faces get bead blast per stated mesh — sealing faces stay as-machined unless Ra is called; we mask bores before blast because Al2O3 media in threads causes galling on stainless assemblies.',
  'flatness-vs-parallelism':
    'Vacuum plate and fixture bases need flatness first — parallelism matters when mounting to a known reference face; we supplier documents flatness on cast plate parts before quoting parallel to an unmachined datum.',
  'step-file-vs-iges':
    'STEP AP214/AP242 is required for our CAM import — IGES surfaces fail on fillets often enough that we hold quote until STEP arrives; mixed PDF-only RFQs get 24 h delay for solid reconstruction.',
  'cmm-vs-manual-inspection':
    'PO language "100% critical on supplier documents balloon map" triggers full supplier document report — "inspect per drawing" defaults to caliper and go/no-go on production lots; the quote delta is 15–25% when buyers assume supplier documents without writing it.',
  '4340-vs-4140-steel':
    'Higher core toughness and larger sections push 4340 — 4140 remains default for shafts under 80 mm and gears; we confirm heat treat spec because 4340 quench distortion needs extra grind stock on long shafts.',
  'nylon-vs-ptfe':
    'Nylon for impact and wear pads in dry service — PTFE when chemical soak or lowest friction wins; nylon swells in humidity so we default to POM for press-fit IDs unless impact toughness is on the drawing.',
  'investment-casting-vs-cnc':
    'We quote CNC under ~500 pcs or when tolerances are tighter than cast + machine allowance — investment cast only when buyer accepts draft and porosity risk; first article on cast parts always includes machined datum strategy.',
  'induction-hardening-vs-carburizing':
    'Localised wear surfaces on medium carbon shafts get induction — carburizing when uniform case around teeth matters; we ask for hardness depth and pattern because induction coil setup is a one-time cost on first lot.',
  '6082-vs-6061-aluminum':
    '6061-T6 is our China stock default — 6082 when European buyers specify EN AW-6082 on PO; mechanical difference is small but cert matching matters; we do not mix alloys in one anodize batch for color consistency.',
  'cpk-vs-ppk-capability':
    'Production release gates use Cpk on ongoing lots — Ppk on first three batches before PPAP sign-off; we will not ship automotive SC characteristics without Cpk ≥ 1.33 when the PO cites IATF control plan language.',
  'manual-deburr-vs-tumble-deburr':
    'Internal threads and sharp sealing edges stay manual deburr — tumble only on external non-cosmetic breaks; we reject "break all edges" without size because ceramic media rounds sealing chamfers below 0.3 mm.',
  'express-vs-standard-lead-time':
    'Express slots are for frozen 6061/7075 prismatic parts with released CAM — new 5-axis programs and first-time Inconel lots stay on standard lead even with rush fee; we quote honest days rather than miss a line-stop date.',
  'coordinate-tolerance-vs-gdt':
    'Simple brackets with six loose holes stay on ± and ISO 2768-m — GD&T on housings with mating datums saves selective assembly scrap; we ask for datum scheme before quoting complex medical or aerospace enclosures.',
  'cnc-machining-vs-forging':
    'Annual qty under a few hundred with tight GD&T stays CNC — forging only enters when the drawing calls out grain flow or the removed volume from bar would exceed a week of spindle time at production qty.',
  'cnc-machining-vs-sand-casting':
    'We quote sand castings only with a casting drawing plus finished print — machining allowance and porosity zones must be marked; blind faith on “cast then machine” is how pressure faces leak in service.',
  'cnc-vs-plastic-3d-printing':
    'FDM is for fit photos — functional snap, thread, and wear tests go CNC in POM or PC even at qty 5; we do not accept printed parts as production equivalents without a material spec on the PO.',
  'cnc-machining-vs-metal-injection-molding':
    'MIM tooling needs five-figure annual qty to beat CNC on small stainless parts — below ~5k pcs we quote bar stock and tell buyers the MIM break-even honestly rather than push machining margin.',
  'cnc-machining-vs-thermoforming':
    'Thermoformed shrouds over 400 mm belong on a forming line — we CNC the insert blocks, hinge pins, and sealed sub-housings that bolt to the shell; full-block PC for a thin cover is a cost mistake we call in inquiry prep.',
  'cnc-machining-vs-gravity-die-casting':
    'Permanent-mold cast flanges need cast drawing plus machine allowance — we will not quote finish machining from a solid-model-only RFQ without draft or parting line noted.',
  'cnc-machining-vs-powder-metallurgy':
    'P/M spur gears at 20k+ pcs beat bar-stock CNC on price — below ~2k identical gears we quote turned or milled wrought and skip compaction die NRE entirely.',
  'cnc-machining-vs-waterjet-cutting':
    'Waterjet is a blanking op — we quote square-up, tap, and bore on cut profiles; taper compensation on thick titanium plate is a separate line item from “machine from plate.”',
  'cnc-machining-vs-welding-fabrication':
    'Large welded frames get post-machined mounting faces only — full monolithic CNC on a 1.5 m bracket drawing is a red flag we resolve before PO, not after warp at first article.',
  'cnc-machining-vs-compression-molding':
    'Rigid PTFE or POM samples of seal grooves are fine — production elastomer seals belong on a mold PO; we never quote machined rubber and mean PTFE substitute without saying so.',
};
