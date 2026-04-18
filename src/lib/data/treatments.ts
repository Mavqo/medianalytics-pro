export type Treatment = {
  id: string;
  nome: string;
  categoria: 'Fisioterapia' | 'Osteopatia' | 'Massaggio' | 'Riabilitazione' | 'Valutazione';
  durataMin: number;
  prezzo: number;
  descrizione: string;
  popolare?: boolean;
  sessioniMedie: number;
};

export const trattamenti: Treatment[] = [
  {
    id: 'tr-01',
    nome: 'Fisioterapia Ortopedica',
    categoria: 'Fisioterapia',
    durataMin: 50,
    prezzo: 75,
    descrizione:
      'Trattamento di disturbi muscolo-scheletrici con tecniche manuali e terapie fisiche.',
    popolare: true,
    sessioniMedie: 8
  },
  {
    id: 'tr-02',
    nome: 'Osteopatia Strutturale',
    categoria: 'Osteopatia',
    durataMin: 60,
    prezzo: 90,
    descrizione:
      'Manipolazione osteopatica per il ripristino della mobilità articolare e viscerale.',
    popolare: true,
    sessioniMedie: 5
  },
  {
    id: 'tr-03',
    nome: 'Massaggio Decontratturante',
    categoria: 'Massaggio',
    durataMin: 45,
    prezzo: 60,
    descrizione: 'Massaggio profondo per il rilascio delle tensioni muscolari croniche.',
    sessioniMedie: 4
  },
  {
    id: 'tr-04',
    nome: 'Rieducazione Post-Operatoria',
    categoria: 'Riabilitazione',
    durataMin: 60,
    prezzo: 85,
    descrizione: 'Protocollo riabilitativo personalizzato dopo interventi chirurgici ortopedici.',
    sessioniMedie: 12
  },
  {
    id: 'tr-05',
    nome: 'Valutazione Funzionale',
    categoria: 'Valutazione',
    durataMin: 40,
    prezzo: 50,
    descrizione: 'Prima visita con anamnesi, test funzionali e definizione del piano terapeutico.',
    popolare: true,
    sessioniMedie: 1
  },
  {
    id: 'tr-06',
    nome: 'Terapia Manuale',
    categoria: 'Fisioterapia',
    durataMin: 50,
    prezzo: 80,
    descrizione: 'Mobilizzazioni articolari e tecniche di tessuti molli per dolori cronici.',
    sessioniMedie: 6
  },
  {
    id: 'tr-07',
    nome: 'Linfodrenaggio Manuale',
    categoria: 'Massaggio',
    durataMin: 55,
    prezzo: 70,
    descrizione: 'Tecnica Vodder per drenaggio linfatico ed edemi post-traumatici.',
    sessioniMedie: 6
  },
  {
    id: 'tr-08',
    nome: 'Rieducazione Neuromotoria',
    categoria: 'Riabilitazione',
    durataMin: 60,
    prezzo: 90,
    descrizione: 'Recupero del controllo motorio in pazienti con disturbi neurologici.',
    sessioniMedie: 15
  },
  {
    id: 'tr-09',
    nome: 'Osteopatia Craniosacrale',
    categoria: 'Osteopatia',
    durataMin: 50,
    prezzo: 85,
    descrizione: 'Approccio dolce per riequilibrare il sistema cranio-sacrale.',
    sessioniMedie: 4
  }
];

export const categorieTrattamenti = [
  'Tutti',
  'Fisioterapia',
  'Osteopatia',
  'Massaggio',
  'Riabilitazione',
  'Valutazione'
] as const;
