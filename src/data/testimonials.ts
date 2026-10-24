/**
 * Anonymous buyer-work patterns shown on About/Contact until a buyer agrees
 * in writing to be identified. Do not add Review/AggregateRating schema
 * (self-serving reviews are not eligible for Google review snippets).
 */
export type BuyerPattern = {
  title: string;
  text: string;
};

export const buyerPatterns: BuyerPattern[] = [
  {
    title: 'Contract-style repeat supply',
    text: 'Multi-line MTU 2000 / 4000 (and related series) lists quoted with grade and lead time stated per line, then repeated against the same packing and document checklist.',
  },
  {
    title: 'Urgent marine / vessel downtime',
    text: 'Part number or nameplate photo first; fitment check before price; express options only after the line is confirmed.',
  },
  {
    title: 'Overhaul and shipyard lists',
    text: 'Excel/PDF lists checked line by line for supersessions and mixed grades, so substitutions stay labelled instead of hidden in one blended price.',
  },
];

/** Named sales contact shown on contact/about pages. */
export const salesContact = {
  name: 'Leo',
  role: 'export sales for MTU and diesel engine parts',
  languages: 'English and Chinese',
};