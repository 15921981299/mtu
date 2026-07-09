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
    title: 'Engine parts stock desk',
    caption: 'Representative engine spares prepared for part-number review, packing, and dispatch.',
    image: '/images/engine-parts-hero.png',
    alt: 'Diesel engine spare parts arranged for stock review',
  },
  {
    category: 'factory',
    title: 'Parts verification desk',
    caption: 'Part numbers, engine information, old part photos, and destination details are checked before quotation.',
    image: '/images/engine-parts-verification-desk.png',
    alt: 'Diesel engine parts verification desk with packaged spare parts',
  },
  {
    category: 'inspection',
    title: 'Part number verification',
    caption: 'Engine series, serial number, supersession status, and old part markings are reviewed before release.',
    image: '/images/engine-parts-verification-desk.png',
    alt: 'Part number verification for diesel engine spare parts',
  },
  {
    category: 'inspection',
    title: 'Sensor and connector check',
    caption: 'Connector style, installed location, and visible markings help reduce wrong-part risk.',
    image: '/images/engine-parts-sensors-catalog.png',
    alt: 'Diesel engine sensors and small spare parts for verification',
  },
  {
    category: 'packaging',
    title: 'Packing confirmation',
    caption: 'Item photos, carton condition, and export packing notes can be confirmed before dispatch.',
    image: '/images/engine-parts-hero.png',
    alt: 'Engine parts prepared for packing and shipment',
  },
  {
    category: 'packaging',
    title: 'Export shipment prep',
    caption: 'DHL, FedEx, UPS, or sea freight packing scope confirmed with each order.',
    image: '/images/global-delivery-shipping-step.webp',
    alt: 'Global delivery shipping preparation for diesel engine spare parts',
  },
  {
    category: 'samples',
    title: 'Sensor sample parts',
    caption: 'Representative sensors and small fittings used to explain connector, thread, and replacement checks.',
    image: '/images/engine-parts-sensors-catalog.png',
    alt: 'Diesel engine sensor sample parts',
  },
  {
    category: 'samples',
    title: 'Service kit items',
    caption: 'Gaskets, seals, sensors, and pump-related items can be quoted together for maintenance orders.',
    image: '/images/engine-parts-hero.png',
    alt: 'Diesel engine service kit parts and packaged spares',
  },
  {
    category: 'rfq',
    title: 'Part number intake',
    caption: 'Inquiry starts with part number, engine model, serial number, photos, quantity, and destination.',
    image: '/images/engine-parts-verification-desk.png',
    alt: 'Diesel engine part number inquiry workflow',
  },
  {
    category: 'rfq',
    title: 'Fitment review',
    caption: 'Series, application, connector, port, flange, and supersession details are checked before quote.',
    image: '/images/engine-parts-sensors-catalog.png',
    alt: 'Diesel engine parts fitment review step',
  },
  {
    category: 'rfq',
    title: 'Order tracking',
    caption: 'Quote assumptions, stock status, packing scope, and shipment notes stay traceable.',
    image: '/images/engine-parts-verification-desk.png',
    alt: 'Engine parts order tracking and shipment notes',
  },
];

export function getProofMedia(categories?: ProofMediaCategory[]) {
  if (!categories || categories.length === 0) return proofMediaItems;
  return proofMediaItems.filter((item) => categories.includes(item.category));
}
