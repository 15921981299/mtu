export type CatalogAssembly = {
  name: string;
  parts: { partNumber: string; position: string; description: string }[];
};

// Drawing relationships are catalog references, not confirmed installation kits.
export const catalogAssemblies: CatalogAssembly[] = [
  {
    name: 'MTU 20V4000G83 example build 528100707, low-pressure fuel pump BOM X00040005, drawing 08100172d',
    parts: [
      { partNumber: 'X52808100004', position: '50', description: 'Fuel delivery pump' },
      { partNumber: 'X52408100002', position: '150', description: 'Link' },
      { partNumber: '700429083000', position: '250', description: 'O-ring' },
      { partNumber: '735151010100', position: '300 / 550', description: 'Washer' },
      { partNumber: 'X52607700008', position: '500', description: 'Retainer' },
      { partNumber: '000933010116', position: '600', description: 'Hexagon screw' },
    ],
  },
  {
    name: 'MTU 20V4000G83 example build 528100707, oil separator BOM 0000187135',
    parts: [
      { partNumber: '5410180233', position: '5', description: 'Oil-separator membrane' },
      { partNumber: '5410100080', position: '10', description: 'Oil-separator insert' },
      { partNumber: '0000180680', position: '15', description: 'Gasket' },
    ],
  },
  {
    name: 'MTU 396 oil-filter housing reference',
    parts: [
      { partNumber: '5501800016', position: '11Z', description: 'Oil filter element' },
      { partNumber: '700429126000', position: '02 / 09', description: 'O-ring' },
      { partNumber: '5501840061', position: '07', description: 'Gasket' },
      { partNumber: '5561800811', position: '06', description: 'Filter bowl' },
      { partNumber: '0011847225', position: '08', description: 'Oil filter element reference' },
    ],
  },
  {
    name: 'MTU 956/1163 high-pressure fuel-line reference',
    parts: [
      { partNumber: '5840780024', position: '25', description: 'Thrust member' },
      { partNumber: '5840700632/87', position: '20', description: 'High-pressure fuel line' },
      { partNumber: '5840782802', position: '140', description: 'Supply pipe' },
      { partNumber: '700429020003', position: '50', description: 'O-ring' },
      { partNumber: '700429017002', position: '90', description: 'O-ring' },
    ],
  },
  {
    name: 'MTU 4000 thermostat-housing reference',
    parts: [
      { partNumber: 'X52420300037', position: '200', description: 'Thermal actuator' },
      { partNumber: '05132155', position: '250', description: 'Sealing ring' },
      { partNumber: '700429072000', position: '550', description: 'O-ring' },
      { partNumber: '5272030080', position: '1350', description: 'Gasket' },
      { partNumber: '700429070000', position: '1550', description: 'O-ring' },
    ],
  },
];

export const getCatalogAssemblies = (partNumber: string) => catalogAssemblies.filter(
  (assembly) => assembly.parts.some((part) => part.partNumber.toUpperCase() === partNumber.toUpperCase()),
);
