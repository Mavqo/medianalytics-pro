export type InvoiceStatus = 'pagata' | 'in-attesa' | 'scaduta';

export interface Invoice {
  id: string;
  numero: string;
  data: string;
  pazienteNome: string;
  pazienteCognome: string;
  descrizione: string;
  importo: number;
  stato: InvoiceStatus;
  scadenza: string;
  metodoPagamento?: 'carta' | 'bonifico' | 'contanti';
}

const nomi: Array<[string, string]> = [
  ['Giulia', 'Conti'],
  ['Marco', 'Russo'],
  ['Sofia', 'Esposito'],
  ['Luca', 'Bianchi'],
  ['Chiara', 'Romano'],
  ['Alessandro', 'Ferrari'],
  ['Martina', 'Greco'],
  ['Davide', 'Rizzo'],
  ['Elena', 'Marino'],
  ['Federico', 'Lombardi'],
  ['Valentina', 'Bruno'],
  ['Andrea', 'Gallo']
];

const descrizioni = [
  'Ciclo riabilitativo - 10 sedute',
  'Valutazione iniziale + trattamento',
  'Fisioterapia ortopedica - 5 sedute',
  'Terapia manuale + tecarterapia',
  'Riabilitazione post-operatoria',
  'Massoterapia decontratturante',
  'Rieducazione posturale globale',
  'Laserterapia - pacchetto 8 sedute',
  'Ginnastica propriocettiva',
  'Trattamento linfodrenaggio'
];

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function build(): Invoice[] {
  const out: Invoice[] = [];
  const today = new Date();
  let n = 140;
  for (let i = 0; i < 24; i++) {
    const offset = i * 3 + Math.floor(Math.random() * 2);
    const emessa = new Date(today.getTime() - offset * 86400000);
    const scadenza = new Date(emessa.getTime() + 30 * 86400000);
    const [nome, cognome] = nomi[i % nomi.length];
    const desc = descrizioni[i % descrizioni.length];
    const importo = [280, 450, 620, 380, 890, 540, 720, 320, 480, 1100][i % 10];
    let stato: InvoiceStatus;
    if (i < 3) stato = 'scaduta';
    else if (i < 8) stato = 'in-attesa';
    else stato = 'pagata';
    const metodi: Invoice['metodoPagamento'][] = ['carta', 'bonifico', 'contanti'];
    out.push({
      id: `INV-${n}`,
      numero: `2026/${String(n).padStart(4, '0')}`,
      data: iso(emessa),
      pazienteNome: nome,
      pazienteCognome: cognome,
      descrizione: desc,
      importo,
      stato,
      scadenza: iso(scadenza),
      metodoPagamento: stato === 'pagata' ? metodi[i % 3] : undefined
    });
    n--;
  }
  return out;
}

export const invoices: Invoice[] = build();
