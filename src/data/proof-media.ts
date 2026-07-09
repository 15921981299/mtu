export type ProofMediaCategory = 'factory' | 'inspection' | 'packaging' | 'samples' | 'rfq';

export type ProofMediaItem = {
  category: ProofMediaCategory;
  title: string;
  caption: string;
  image: string;
  alt: string;
};

export const proofMediaItems: ProofMediaItem[] = [
  {
    category: 'factory',
    title: 'CNC machining floor',
    caption: 'Partner facility machining area used for milling, turning, and in-process checks.',
    image: '/images/cnc-machining-production-line.jpg',
    alt: 'CNC machining production line and factory floor',
  },
  {
    category: 'factory',
    title: 'Workshop overview',
    caption: 'Machine capacity and shop-floor layout buyers can verify before a production PO.',
    image: '/images/precision-machining-workshop-factory.jpg',
    alt: 'Precision machining workshop factory overview',
  },
  {
    category: 'inspection',
    title: 'CMM inspection',
    caption: 'Dimensional inspection for drawing-controlled features and first article checks.',
    image: '/images/cmm-coordinate-measuring-inspection.jpg',
    alt: 'CMM coordinate measuring inspection for machined parts',
  },
  {
    category: 'inspection',
    title: 'Manual gauge check',
    caption: 'Micrometer, gauge, and visual checks before final packing and shipment release.',
    image: '/images/precision-micrometer-measurement.jpg',
    alt: 'Precision micrometer measurement on machined component',
  },
  {
    category: 'packaging',
    title: 'QC before packing',
    caption: 'Final visual inspection, part photos, and packaging confirmation before dispatch.',
    image: '/images/cnc-production-and-qc-step.webp',
    alt: 'CNC production and quality control step before packaging',
  },
  {
    category: 'packaging',
    title: 'Export shipment prep',
    caption: 'DHL, FedEx, UPS, or sea freight packing scope confirmed with each order.',
    image: '/images/global-delivery-shipping-step.webp',
    alt: 'Global delivery shipping preparation for CNC machined parts',
  },
  {
    category: 'samples',
    title: 'Aluminum sample parts',
    caption: 'Representative machined aluminum parts for finish, geometry, and tolerance discussion.',
    image: '/images/cnc-machined-aluminum-parts.jpg',
    alt: 'CNC machined aluminum sample parts',
  },
  {
    category: 'samples',
    title: 'Stainless sample parts',
    caption: 'Representative stainless parts for material, deburring, and inspection planning.',
    image: '/images/cnc-machined-stainless-steel-parts.jpg',
    alt: 'CNC machined stainless steel sample parts',
  },
  {
    category: 'rfq',
    title: 'Drawing upload',
    caption: 'RFQ starts with STEP, PDF, DWG, DXF, or image files plus quantity and material notes.',
    image: '/images/upload-cad-drawing-step.webp',
    alt: 'Upload CAD drawing step in RFQ workflow',
  },
  {
    category: 'rfq',
    title: 'DFM review',
    caption: 'Engineer review confirms material, process, tolerance, finish, and inspection risk.',
    image: '/images/dfm-review-and-quote-step.webp',
    alt: 'DFM review and quotation step',
  },
  {
    category: 'rfq',
    title: 'Order tracking',
    caption: 'Quote assumptions, production status, inspection scope, and shipment notes stay traceable.',
    image: '/images/cnc-machining-order-tracking-form.webp',
    alt: 'CNC machining order tracking form screenshot',
  },
];

export function getProofMedia(categories?: ProofMediaCategory[]) {
  if (!categories || categories.length === 0) return proofMediaItems;
  return proofMediaItems.filter((item) => categories.includes(item.category));
}
