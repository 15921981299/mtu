/**
 * Part numbers prioritized from the 2026-09-07 Google Search Console export.
 * Order balances clicks, impressions, and proximity to the first results page.
 */
export const searchPriorityPartNumbers = [
  'X57508300091',
  '0031845201',
  '0005356430',
  'XP52618300032',
  '0180945802',
  'XP52718300060',
  '0000925105',
  '5240530122',
  '0020922801',
  'XP59501800123',
  'XP00A36400005',
  '700429050003',
  '0005351733',
  '5240530301',
  'XP58799100596',
  'F6794703',
  '5360702032',
  '5840780024',
  '0035352231',
  '0000982780',
  '5849900851',
  '5240332730',
  '5240530830',
  'X52420300037',
  '0005358233',
  '700327012000',
  '205412223002',
  'X58720700011',
  '23540455',
  '0031845301',
] as const;

export const searchPriorityPartRank = new Map<string, number>(
  searchPriorityPartNumbers.map((partNumber, index) => [partNumber.toUpperCase(), index]),
);
