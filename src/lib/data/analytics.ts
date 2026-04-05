// Dati aggregati per la dashboard

export interface MonthlyRevenue {
  mese: string;
  anno: number;
  fatturato: number;
  obiettivo: number;
}

export interface TreatmentStats {
  tipo: string;
  visite: number;
  fatturato: number;
  percentuale: number;
}

export interface TherapistPerformance {
  nome: string;
  pazientiTrattati: number;
  fatturato: number;
  valutazioneMedia: number;
}

export interface PatientGrowth {
  mese: string;
  nuoviPazienti: number;
  pazientiRicorrenti: number;
  totaleAttivi: number;
}

export interface RetentionMetrics {
  tassoRetention: number;
  tassoAbbandono: number;
  visiteMediePerPaziente: number;
  valoreLifetimeMedio: number;
}

// Fatturato mensile ultimi 12 mesi
export const fatturatoMensile: MonthlyRevenue[] = [
  { mese: 'Apr', anno: 2024, fatturato: 18500, obiettivo: 20000 },
  { mese: 'Mag', anno: 2024, fatturato: 21200, obiettivo: 20000 },
  { mese: 'Giu', anno: 2024, fatturato: 22800, obiettivo: 22000 },
  { mese: 'Lug', anno: 2024, fatturato: 19500, obiettivo: 22000 },
  { mese: 'Ago', anno: 2024, fatturato: 15200, obiettivo: 18000 },
  { mese: 'Set', anno: 2024, fatturato: 24100, obiettivo: 23000 },
  { mese: 'Ott', anno: 2024, fatturato: 26300, obiettivo: 24000 },
  { mese: 'Nov', anno: 2024, fatturato: 25800, obiettivo: 25000 },
  { mese: 'Dic', anno: 2024, fatturato: 22400, obiettivo: 26000 },
  { mese: 'Gen', anno: 2025, fatturato: 27100, obiettivo: 25000 },
  { mese: 'Feb', anno: 2025, fatturato: 28900, obiettivo: 26000 },
  { mese: 'Mar', anno: 2025, fatturato: 31200, obiettivo: 28000 }
];

// Nuovi pazienti per mese
export const nuoviPazienti: PatientGrowth[] = [
  { mese: 'Apr 2024', nuoviPazienti: 8, pazientiRicorrenti: 32, totaleAttivi: 40 },
  { mese: 'Mag 2024', nuoviPazienti: 12, pazientiRicorrenti: 35, totaleAttivi: 47 },
  { mese: 'Giu 2024', nuoviPazienti: 10, pazientiRicorrenti: 38, totaleAttivi: 48 },
  { mese: 'Lug 2024', nuoviPazienti: 6, pazientiRicorrenti: 36, totaleAttivi: 42 },
  { mese: 'Ago 2024', nuoviPazienti: 4, pazientiRicorrenti: 28, totaleAttivi: 32 },
  { mese: 'Set 2024', nuoviPazienti: 14, pazientiRicorrenti: 40, totaleAttivi: 54 },
  { mese: 'Ott 2024', nuoviPazienti: 11, pazientiRicorrenti: 43, totaleAttivi: 54 },
  { mese: 'Nov 2024', nuoviPazienti: 9, pazientiRicorrenti: 45, totaleAttivi: 54 },
  { mese: 'Dic 2024', nuoviPazienti: 7, pazientiRicorrenti: 44, totaleAttivi: 51 },
  { mese: 'Gen 2025', nuoviPazienti: 13, pazientiRicorrenti: 46, totaleAttivi: 59 },
  { mese: 'Feb 2025', nuoviPazienti: 15, pazientiRicorrenti: 48, totaleAttivi: 63 },
  { mese: 'Mar 2025', nuoviPazienti: 11, pazientiRicorrenti: 51, totaleAttivi: 62 }
];

// Visite per tipo di trattamento
export const visitePerTipo: TreatmentStats[] = [
  {
    tipo: 'Fisioterapia',
    visite: 245,
    fatturato: 15140,
    percentuale: 32.5
  },
  {
    tipo: 'Riabilitazione',
    visite: 198,
    fatturato: 15840,
    percentuale: 26.2
  },
  {
    tipo: 'Massaggio',
    visite: 186,
    fatturato: 12460,
    percentuale: 24.6
  },
  {
    tipo: 'Rieducazione Sportiva',
    visite: 68,
    fatturato: 5100,
    percentuale: 9.0
  },
  {
    tipo: 'Pilates Terapeutico',
    visite: 58,
    fatturato: 3190,
    percentuale: 7.7
  }
];

// Top terapeuti per fatturato
export const topTerapeuti: TherapistPerformance[] = [
  {
    nome: 'Dr. Alessandro Martini',
    pazientiTrattati: 142,
    fatturato: 35840,
    valutazioneMedia: 4.8
  },
  {
    nome: 'Dr. Marco Lombardi',
    pazientiTrattati: 128,
    fatturato: 32650,
    valutazioneMedia: 4.9
  },
  {
    nome: 'Dott.ssa Laura Ferretti',
    pazientiTrattati: 89,
    fatturato: 18600,
    valutazioneMedia: 4.7
  },
  {
    nome: 'Dott.ssa Giulia Marchetti',
    pazientiTrattati: 76,
    fatturato: 14280,
    valutazioneMedia: 4.8
  },
  {
    nome: 'Dott.ssa Chiara Santoro',
    pazientiTrattati: 62,
    fatturato: 9360,
    valutazioneMedia: 4.9
  }
];

// Metriche di retention
export const metricheRetention: RetentionMetrics = {
  tassoRetention: 78.5,
  tassoAbbandono: 21.5,
  visiteMediePerPaziente: 8.3,
  valoreLifetimeMedio: 584
};

// Statistiche giornaliere
export const statisticheGiornaliere = {
  appuntamentiOggi: 8,
  appuntamentiDomani: 12,
  pazientiNuoviQuestaSettimana: 4,
  tassoOccupazione: 84,
  tassoCompletamento: 92,
  tassoCancellazione: 5,
  tassoNoShow: 3
};

// KPI principali
export const kpiPrincipali = {
  fatturatoMeseCorrente: 31200,
  fatturatoMesePrecedente: 28900,
  variazioneFatturato: 8.0,
  pazientiAttivi: 42,
  totalePazienti: 50,
  appuntamentiMese: 98,
  mediaVenditaPerVisita: 68.5,
  obiettivoMensile: 28000,
  percentualeObiettivo: 111.4
};

// Distribuzione visite per giorno della settimana
export const visitePerGiorno = [
  { giorno: 'Lunedì', visite: 28, fatturato: 1850 },
  { giorno: 'Martedì', visite: 32, fatturato: 2180 },
  { giorno: 'Mercoledì', visite: 26, fatturato: 1720 },
  { giorno: 'Giovedì', visite: 34, fatturato: 2310 },
  { giorno: 'Venerdì', visite: 30, fatturato: 2040 },
  { giorno: 'Sabato', visite: 18, fatturato: 1100 }
];

// Andamento recensioni
export const andamentoRecensioni = [
  { mese: 'Ott 2024', recensioni: 18, media: 4.7 },
  { mese: 'Nov 2024', recensioni: 22, media: 4.8 },
  { mese: 'Dic 2024', recensioni: 16, media: 4.8 },
  { mese: 'Gen 2025', recensioni: 24, media: 4.9 },
  { mese: 'Feb 2025', recensioni: 28, media: 4.8 },
  { mese: 'Mar 2025', recensioni: 31, media: 4.9 }
];

// Esportazioni helper
export const getFatturatoTotale = (): number => {
  return fatturatoMensile.reduce((acc, curr) => acc + curr.fatturato, 0);
};

export const getFatturatoMediaMensile = (): number => {
  return Math.round(getFatturatoTotale() / fatturatoMensile.length);
};

export const getTopTreatment = (): TreatmentStats => {
  return visitePerTipo.reduce((max, curr) => (curr.visite > max.visite ? curr : max));
};

export const getTotalVisits = (): number => {
  return visitePerTipo.reduce((acc, curr) => acc + curr.visite, 0);
};
