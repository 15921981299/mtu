/** Redacted structural samples — layout reference only, not live customer documents. */

export type InspectionSampleRow = {
  balloon: string;
  characteristic: string;
  nominal: string;
  tolerance: string;
  measured: string;
  result: 'PASS' | 'FAIL';
};

export type InspectionSample = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  headerFields: { label: string; value: string }[];
  rows?: InspectionSampleRow[];
  bullets?: string[];
};

export const inspectionSampleDisclaimer =
  'Structural sample only. Customer names, PO numbers, heat lots, and measured values are redacted. Your production package follows the same layout with project-specific data.';

export const inspectionSamples: InspectionSample[] = [
  {
    id: 'cmm-report',
    title: 'supplier documents Dimensional Report',
    subtitle: 'Ballooned layout · instrument traceability',
    summary:
      'Shows how critical features map to drawing balloons, instrument ID, and pass/fail per characteristic — the format quality teams use on incoming inspection.',
    headerFields: [
      { label: 'Report ID', value: 'supplier documents-2026-████-001' },
      { label: 'Drawing rev.', value: 'Rev C' },
      { label: 'Part / lot', value: 'Bracket housing · Lot ████' },
      { label: 'supplier documents instrument', value: '████ supplier documents · Cal due ████-██-██' },
      { label: 'Inspector', value: 'QC inspector ID ████' },
    ],
    rows: [
      { balloon: '1', characteristic: 'Bore Ø12 H7', nominal: '12.000', tolerance: '+0.018 / 0', measured: '12.███', result: 'PASS' },
      { balloon: '2', characteristic: 'Position ⌖ Ø0.05 (A|B|C)', nominal: '0', tolerance: '⌖ Ø0.05', measured: '⌖ 0.0██', result: 'PASS' },
      { balloon: '3', characteristic: 'Flatness ⏥ 0.02 (A)', nominal: '0', tolerance: '⏥ 0.02', measured: '⏥ 0.0██', result: 'PASS' },
      { balloon: '4', characteristic: 'Thread M8×1.25 — GO/NO-GO', nominal: '6H', tolerance: 'Gauge class 6H', measured: 'GO ✓ / NO-GO ✗', result: 'PASS' },
    ],
  },
  {
    id: 'material-cert',
    title: 'EN 10204 3.1 Material Certificate',
    subtitle: 'Mill test · heat-lot traceability',
    summary:
      'Excerpt structure for alloy verification before machining — chemistry, mechanical properties, and heat number cross-reference to the traveler.',
    headerFields: [
      { label: 'Certificate type', value: 'EN 10204 3.1' },
      { label: 'Material grade', value: '316L stainless (example)' },
      { label: 'Heat / lot no.', value: 'H██████' },
      { label: 'Mill / supplier', value: '████████ Mill' },
      { label: 'Standard', value: 'ASTM A276 / EN 1.4404' },
    ],
    bullets: [
      'Chemical composition table (C, Cr, Ni, Mo, Mn, Si…) — values per heat lot',
      'Mechanical properties: yield, tensile, elongation, hardness',
      'Mill stamp, document ID, and issue date',
      'Cross-reference field tying cert heat number to incoming material tag',
    ],
  },
  {
    id: 'fai-package',
    title: 'First Article Inspection (FAI)',
    subtitle: 'AS9102-style production release',
    summary:
      'Layout reference for aerospace or regulated first-article packages — forms covering part accountability, product accountability, and characteristic accountability.',
    headerFields: [
      { label: 'FAI type', value: 'Full FAI — Forms 1–3' },
      { label: 'Part number', value: 'PN-██████' },
      { label: 'Serial / lot', value: 'FAI lot 001' },
      { label: 'Drawing', value: 'Rev D · Sheet 1 of 2' },
    ],
    bullets: [
      'Form 1 — Part number accountability (material, process, supplier)',
      'Form 2 — Product accountability (drawing, change level, functional test)',
      'Form 3 — Characteristic accountability (every dimension with measured result)',
      'Material cert and special process certs attached by reference',
    ],
  },
  {
    id: 'coc',
    title: 'Certificate of Conformance (CoC)',
    subtitle: 'Lot release statement',
    summary:
      'Single-page lot statement tying PO, drawing revision, inspection scope, and any industry standard invoked on the order.',
    headerFields: [
      { label: 'CoC no.', value: 'CoC-2026-████' },
      { label: 'Customer PO', value: 'PO-████████' },
      { label: 'Quantity shipped', value: '██ pcs' },
      { label: 'Drawing', value: 'Rev C · dated ████-██-██' },
      { label: 'Inspection scope', value: '100% critical features per balloon map' },
    ],
    bullets: [
      'Statement of conformity to drawing and specified standards',
      'Reference to attached supplier document report ID and material cert heat lot',
      'Authorized quality sign-off and shipment date',
      'Optional RoHS / REACH or PPAP cross-reference when on PO',
    ],
  },
];

export function getInspectionSample(id: string) {
  return inspectionSamples.find((sample) => sample.id === id);
}
