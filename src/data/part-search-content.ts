import type { MtuPart } from './mtu-parts';

type SearchPartContent = Pick<MtuPart, 'summary' | 'description' | 'quoteChecklist' | 'faqs'> &
  Partial<Pick<MtuPart, 'dimensions' | 'specificationChecks' | 'crossReferences'>>;

// Buyer questions from September 2026 Bing/GSC exports. Catalog records are
// not a substitute for checking the actual engine and offered component.
export const partSearchContent: Record<string, SearchPartContent> = {
  '0031845201': {
    summary: '0031845201 spin-on oil filter for MTU engine service. Request pricing, thread-size confirmation, and replacement-reference checks.',
    description: 'Identify 0031845201 by the number on the filter body and the installed filter head. The mounting thread, sealing-ring dimensions, and available clearance must agree with the existing assembly; a similar canister shape alone does not establish interchangeability.',
    dimensions: undefined,
    specificationChecks: ['Thread size is not yet verified in our published data. Send the filter number and a clear view of the mounting base for confirmation.', 'For a dimensional check, include overall height, outside diameter, and sealing-ring inside/outside diameters with units.'],
    crossReferences: [{ partNumber: '0031844601', relationship: 'reference' }, { partNumber: '0031844801', relationship: 'reference' }],
    quoteChecklist: ['0031845201 and required quantity', 'Engine model and serial number, if available', 'Filter label and mounting-base photos; destination country'],
    faqs: [
      { question: 'What is the thread size of 0031845201?', answer: 'A verified thread size is not yet published here. Send the filter marking and mounting-base photo so the thread and sealing surface can be checked before a replacement is quoted.' },
      { question: 'Can I request a 0031845201 brochure or dimension drawing?', answer: 'Include the document request with your inquiry. We check whether a supplier datasheet or drawing is available for the offered filter; the catalog weight alone does not establish its dimensions.' },
    ],
  },
  X57508300091: {
    summary: 'X57508300091 MTU 4000 spin-on fuel filter. Check the catalog replacement X59408300151, required quantity, and current supply options.',
    description: 'X57508300091 is a spin-on fuel-filter reference. Catalog records identify X59408300151 as a later number. Keep the number from the installed filter in your inquiry so the offered replacement can be checked against the filter head and engine application.',
    dimensions: undefined,
    crossReferences: [{ partNumber: 'X59408300151', relationship: 'replaced-by' }, { partNumber: 'SUA94131', relationship: 'reference' }, { partNumber: 'X00042421', relationship: 'reference' }],
    specificationChecks: ['Confirm the mounting thread, sealing surface, and filter-head reference before substituting a different number.', 'State whether the request is for one filter or the complete service quantity for the engine.'],
    quoteChecklist: ['Installed number: X57508300091, X59408300151, or the number on your filter', 'Quantity and destination country', 'Engine serial number or filter-head/label photos, if available'],
    faqs: [
      { question: 'Is X59408300151 a replacement for X57508300091?', answer: 'The catalog records list X59408300151 as the later reference. This does not mean every listed old number can be substituted in both directions. Confirm the engine and filter-head application before ordering.' },
      { question: 'Should I request X57508300091 or the newer number?', answer: 'Send the installed number and note whether a superseding part is acceptable. The quotation should state the exact number and condition being supplied.' },
    ],
  },
  EX52407500064: {
    summary: 'EX52407500064 MTU 4000 injector. Request a quote with the complete injector marking, engine serial number, and required supply condition.',
    description: 'EX52407500064 must be identified using the complete injector-body marking, including its prefix. Related X, EX, and other catalog numbers are retained for verification; matching digits or a similar body does not establish the same specification or supply condition.',
    dimensions: undefined,
    specificationChecks: ['Overall length and diameter in millimeters or inches are not yet verified in our published data.', 'Identify measurement endpoints on a photo or drawing. Body length and overall length including the connector are different measurements.', 'For a remanufactured option, confirm available test documentation and any core-return requirement.'],
    quoteChecklist: ['Full injector-body number, including the EX/X prefix, and quantity', 'Engine model and serial number, if available', 'Photos of the marking, connector, and nozzle end; destination country'],
    faqs: [
      { question: 'What are the dimensions of EX52407500064 in inches?', answer: 'Verified dimensions are not yet published here. Ask for a dimensional drawing or a measurement of the offered injector. Once the millimeter measurements and endpoints are confirmed, divide millimeters by 25.4 to obtain inches.' },
      { question: 'Are X52407500049 and EX52407500064 interchangeable?', answer: 'They appear in the catalog reference history, but that alone is insufficient to confirm interchangeability. Send the complete injector marking and engine serial number; the offered number and supply condition must be stated in the quotation.' },
    ],
  },
  X00E50203659: {
    summary: 'X00E50203659 MTU level monitor, with catalog references including 0005355103 and 0005354003. Request connector and installation checks.',
    description: 'X00E50203659 is listed as a level-monitor reference for MTU applications. Catalog history names 0005354003, 0005355103, X00032631, and X00031104 as earlier references. Match the probe, connector, and installation position before approving a replacement.',
    dimensions: undefined,
    crossReferences: ['0005354003', '0005355103', 'X00032631', 'X00031104'].map((partNumber) => ({ partNumber, relationship: 'replaces' })),
    specificationChecks: ['Provide the old probe marking and a connector photo, including pin arrangement.', 'Probe length, mounting details, and electrical specification require confirmation for the offered unit.'],
    quoteChecklist: ['Current or old level-monitor number and quantity', 'Probe and connector photos', 'Engine model/serial number and destination, if available'],
    faqs: [{ question: 'Does X00E50203659 replace 0005355103?', answer: 'Our catalog history lists 0005355103 as an earlier reference for X00E50203659. Confirm the engine serial number, probe installation, and connector before treating it as a replacement for your unit.' }],
  },
  '5244920181': {
    summary: '5244920181 sealing ring for MTU exhaust turbocharger-system references. Check the earlier number 5244920081 and the sealing position before ordering.',
    description: 'Catalog records identify 5244920181 as a sealing ring in the exhaust turbocharger system and list 5244920081 as an earlier number. The installation drawing and ring section are needed to distinguish it from other engine sealing rings.',
    dimensions: undefined,
    crossReferences: [{ partNumber: '5244920081', relationship: 'replaces' }],
    specificationChecks: ['Inside diameter, outside diameter, thickness, and material are not yet verified in our published data.', 'Supply the turbocharger/assembly reference or catalog position. Do not select by engine series or shipping weight alone.'],
    quoteChecklist: ['5244920181 or old reference 5244920081, plus quantity', 'Assembly position or drawing reference', 'Old-ring photo with measurements and destination, if available'],
    faqs: [{ question: 'Can 5244920181 replace 5244920081?', answer: 'The catalog lists 5244920181 as the later number. Verify the sealing position and assembly reference before ordering; the record does not establish dimensions or material for an unmarked ring.' }],
  },
  '0020922801': {
    summary: '0020922801 spin-on fuel filter for MTU service. Check catalog successor X00012879 and filter-head compatibility with your inquiry.',
    description: '0020922801 is a spin-on fuel-filter reference. Catalog history lists X00012879 as a later number and also includes SUA85613 and X59408300094. Confirm the supplied number against the installed filter and engine before dispatch.',
    dimensions: undefined,
    crossReferences: [{ partNumber: 'X00012879', relationship: 'replaced-by' }, { partNumber: 'SUA85613', relationship: 'reference' }, { partNumber: 'X59408300094', relationship: 'reference' }],
    specificationChecks: ['The mounting thread, sealing-ring dimensions, and canister clearance require verification; packing quantities do not describe filter dimensions.'],
    quoteChecklist: ['Filter number and required quantity', 'Filter label and mounting-base photo, if available', 'Engine serial number and destination country'],
    faqs: [{ question: 'What is the later reference for 0020922801?', answer: 'X00012879 is listed as a later catalog reference. Send the installed number so the filter head, engine application, and offered replacement can be checked together.' }],
  },
  '0035352231': {
    summary: '0035352231 MTU pressure sensor. Review the catalog reference X00E50214075 and confirm pressure range, connection, and engine application.',
    description: '0035352231 is a pressure-sensor reference. Its catalog specification lists an M14 x 1.5 connection and a relative pressure range of +/-70 mbar. Check the range and electrical interface on the offered sensor, including when a later reference is quoted.',
    dimensions: 'Catalog: M14 x 1.5; wrench size 38 mm',
    crossReferences: [{ partNumber: 'X00E50214075', relationship: 'replaced-by' }, { partNumber: 'SUA90827', relationship: 'reference' }, { partNumber: 'X00E50201940', relationship: 'reference' }],
    specificationChecks: ['Catalog pressure reference: +/-70 mbar relative. Confirm the range and signal specification on the sensor label.', 'Check connector pin arrangement and sealing method as well as the thread.'],
    quoteChecklist: ['0035352231 or the full number on the sensor', 'Label/range and connector photos; quantity', 'Engine serial number and destination country'],
    faqs: [{ question: 'Does X00E50214075 supersede 0035352231?', answer: 'X00E50214075 is listed as the later catalog number. The installed pressure range, connector, and engine configuration still need confirmation before substitution.' }],
  },
  '0000925105': {
    summary: '0000925105 filter element for MTU 396 catalog applications. Request housing, element-size, and filter-grade confirmation.',
    description: '0000925105 is a replaceable filter-element reference. Match it to the installed housing and element end-cap arrangement. The catalog marking 30 MY is not a length or diameter and does not provide enough information to select an alternative element.',
    dimensions: undefined,
    specificationChecks: ['Element height, outside/inside diameters, and end-cap sealing arrangement need confirmation.', 'Catalog marking: 30 MY. Confirm the filtration rating and its test basis with the supplier before choosing an alternative.'],
    quoteChecklist: ['0000925105 and required quantity', 'Housing number or old-element photos with dimensions', 'Engine serial number and destination country, if available'],
    faqs: [{ question: 'Is 04030 a confirmed substitute for 0000925105?', answer: '04030 appears as a catalog cross-reference, without enough manufacturer or dimensional context to confirm a substitute. Check the housing, element construction, and filtration specification before ordering.' }],
  },
  '0005356430': {
    summary: '0005356430 MTU temperature sensor. Catalog details include M14 x 1.5, length 29 mm, and a DIN 72585 connector reference.',
    description: '0005356430 is a temperature sensor. The catalog lists an M14 x 1.5 thread, a length reference of 29 mm, and a DIN 72585 connector. Confirm the measuring point and electrical characteristic against the installed sensor; connector standard alone does not prove signal compatibility.',
    dimensions: 'Catalog: M14 x 1.5; L = 29 mm; DIN 72585 connector',
    specificationChecks: ['Verify probe installation depth, sealing method, connector pin arrangement, and sensor characteristic.', 'B59651900002/N81 is retained as a catalog reference pending application-specific replacement confirmation.'],
    quoteChecklist: ['0005356430 or the complete old-sensor number; quantity', 'Sensor marking, connector photo, and measuring position', 'Engine serial number and destination country, if available'],
    faqs: [{ question: 'What thread is listed for 0005356430?', answer: 'The catalog lists M14 x 1.5 with a length reference of 29 mm. These are catalog specifications, not a measurement of current stock; verify the installation and offered unit before ordering.' }],
  },
  '0005357633': {
    summary: '0005357633 MTU speed sensor. Catalog dimensions list a 19 x 60 mm body reference and a 700 mm cable.',
    description: '0005357633 is a speed-sensor reference with SUA98811 listed as an earlier catalog number. Check the sensor marking, mounting arrangement, cable route, and connector to distinguish similar speed pickups.',
    dimensions: 'Catalog: diameter 19 mm x 60 mm; cable length 700 mm',
    crossReferences: [{ partNumber: 'SUA98811', relationship: 'replaces' }],
    specificationChecks: ['Confirm the mounting position, sensing-end geometry, connector, and electrical specification.', 'Do not infer a replacement for 0005356633 from the similar numbering; that relationship is not established in our current data.'],
    quoteChecklist: ['Full speed-sensor number and quantity', 'Sensor body, connector, and cable photos', 'Engine serial number and installation position, if available'],
    faqs: [{ question: 'Is 0005357633 a replacement for 0005356633?', answer: 'We do not have a verified replacement relationship between those two numbers. Send the old sensor marking and engine serial number for a catalog check. SUA98811 is the earlier reference listed for 0005357633.' }],
  },
  X00E50214075: {
    summary: 'X00E50214075 MTU pressure sensor. Check earlier references such as 0035352231 against the installed range and connector.',
    description: 'X00E50214075 is listed as a later pressure-sensor reference for 0035352231, SUA90827, and X00E50201940. Confirm the pressure range and electrical interface of the offered unit for the engine installation.',
    crossReferences: ['0035352231', 'SUA90827', 'X00E50201940'].map((partNumber) => ({ partNumber, relationship: 'replaces' })),
    specificationChecks: ['Send the old label, including the pressure range and units.', 'Confirm connector pin arrangement and installation position before accepting a replacement.'],
    quoteChecklist: ['Current or old pressure-sensor number and quantity', 'Range/label and connector photos', 'Engine serial number and destination country'],
    faqs: [{ question: 'Can I request X00E50214075 using an old 0035352231 number?', answer: 'Yes. Include the old number in the inquiry so the catalog relationship, pressure range, and connector can be checked. The quotation should identify the exact number being supplied.' }],
  },
};

export function applySearchPartContent(part: MtuPart): MtuPart {
  const content = partSearchContent[part.partNumber.toUpperCase()];
  if (!content) return part;
  return {
    ...part,
    ...content,
    commonFailureScenarios: undefined,
    orderingNotes: undefined,
    notes: ['Catalog references and engine-family listings require confirmation against the full engine serial number before order.'],
    imageAlt: `${part.partNumber} ${part.name} - MTU replacement part identification`,
  };
}
