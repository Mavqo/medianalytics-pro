export type Therapist = {
  id: string;
  nome: string;
  ruolo: string;
  specializzazioni: string[];
  esperienzaAnni: number;
  rating: number;
  pazientiAttivi: number;
  disponibilita: 'Disponibile' | 'Occupato' | 'In ferie';
  email: string;
  telefono: string;
  avatar?: string;
};

export const terapeuti: Therapist[] = [
  {
    id: 'th-01',
    nome: 'Dott.ssa Elena Bianchi',
    ruolo: 'Fisioterapista Senior',
    specializzazioni: ['Ortopedica', 'Post-chirurgica', 'Sportiva'],
    esperienzaAnni: 12,
    rating: 4.9,
    pazientiAttivi: 42,
    disponibilita: 'Disponibile',
    email: 'elena.bianchi@clinica.it',
    telefono: '+39 091 234 5678'
  },
  {
    id: 'th-02',
    nome: 'Dr. Marco Rossi',
    ruolo: 'Osteopata',
    specializzazioni: ['Strutturale', 'Craniosacrale', 'Viscerale'],
    esperienzaAnni: 8,
    rating: 4.8,
    pazientiAttivi: 35,
    disponibilita: 'Occupato',
    email: 'marco.rossi@clinica.it',
    telefono: '+39 091 234 5679'
  },
  {
    id: 'th-03',
    nome: 'Dott.ssa Giulia Ferrari',
    ruolo: 'Fisioterapista',
    specializzazioni: ['Neurologica', 'Geriatrica'],
    esperienzaAnni: 6,
    rating: 4.7,
    pazientiAttivi: 28,
    disponibilita: 'Disponibile',
    email: 'giulia.ferrari@clinica.it',
    telefono: '+39 091 234 5680'
  },
  {
    id: 'th-04',
    nome: 'Dr. Luca Moretti',
    ruolo: 'Massoterapista',
    specializzazioni: ['Decontratturante', 'Linfodrenaggio', 'Sportivo'],
    esperienzaAnni: 10,
    rating: 4.8,
    pazientiAttivi: 31,
    disponibilita: 'Disponibile',
    email: 'luca.moretti@clinica.it',
    telefono: '+39 091 234 5681'
  },
  {
    id: 'th-05',
    nome: 'Dott.ssa Sara Conti',
    ruolo: 'Fisioterapista Junior',
    specializzazioni: ['Pediatrica', 'Respiratoria'],
    esperienzaAnni: 3,
    rating: 4.6,
    pazientiAttivi: 18,
    disponibilita: 'In ferie',
    email: 'sara.conti@clinica.it',
    telefono: '+39 091 234 5682'
  },
  {
    id: 'th-06',
    nome: 'Dr. Alessandro Greco',
    ruolo: 'Osteopata',
    specializzazioni: ['Sportiva', 'Posturale'],
    esperienzaAnni: 7,
    rating: 4.9,
    pazientiAttivi: 33,
    disponibilita: 'Occupato',
    email: 'alessandro.greco@clinica.it',
    telefono: '+39 091 234 5683'
  }
];
