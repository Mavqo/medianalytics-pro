export type InventoryItem = {
  id: string;
  nome: string;
  categoria: 'Consumabili' | 'Attrezzatura' | 'Farmaci' | 'Tessili';
  quantita: number;
  soglia: number;
  unita: string;
  costoUnitario: number;
  fornitore: string;
  ultimoRiordino: string;
};

export const inventario: InventoryItem[] = [
  {
    id: 'inv-01',
    nome: 'Guanti nitrile monouso',
    categoria: 'Consumabili',
    quantita: 240,
    soglia: 100,
    unita: 'box',
    costoUnitario: 8.5,
    fornitore: 'MedSupply SRL',
    ultimoRiordino: '2026-03-22'
  },
  {
    id: 'inv-02',
    nome: 'Olio per massaggio neutro',
    categoria: 'Consumabili',
    quantita: 18,
    soglia: 20,
    unita: 'L',
    costoUnitario: 12.0,
    fornitore: 'NaturaBio',
    ultimoRiordino: '2026-03-15'
  },
  {
    id: 'inv-03',
    nome: 'Lenzuola monouso lettino',
    categoria: 'Tessili',
    quantita: 45,
    soglia: 50,
    unita: 'rotolo',
    costoUnitario: 5.2,
    fornitore: 'MedSupply SRL',
    ultimoRiordino: '2026-04-01'
  },
  {
    id: 'inv-04',
    nome: 'Elettrostimolatore TENS',
    categoria: 'Attrezzatura',
    quantita: 6,
    soglia: 4,
    unita: 'unità',
    costoUnitario: 340,
    fornitore: 'BioMedical Tech',
    ultimoRiordino: '2025-11-10'
  },
  {
    id: 'inv-05',
    nome: 'Fascia elastica kinesio',
    categoria: 'Consumabili',
    quantita: 8,
    soglia: 15,
    unita: 'rotolo',
    costoUnitario: 14.0,
    fornitore: 'SportMed',
    ultimoRiordino: '2026-02-28'
  },
  {
    id: 'inv-06',
    nome: 'Crema antinfiammatoria',
    categoria: 'Farmaci',
    quantita: 32,
    soglia: 20,
    unita: 'tubetto',
    costoUnitario: 6.8,
    fornitore: 'PharmaPlus',
    ultimoRiordino: '2026-03-28'
  },
  {
    id: 'inv-07',
    nome: 'Ultrasuono terapeutico',
    categoria: 'Attrezzatura',
    quantita: 3,
    soglia: 2,
    unita: 'unità',
    costoUnitario: 890,
    fornitore: 'BioMedical Tech',
    ultimoRiordino: '2025-09-12'
  },
  {
    id: 'inv-08',
    nome: 'Salviette disinfettanti',
    categoria: 'Consumabili',
    quantita: 12,
    soglia: 30,
    unita: 'pacco',
    costoUnitario: 4.5,
    fornitore: 'MedSupply SRL',
    ultimoRiordino: '2026-03-05'
  }
];
