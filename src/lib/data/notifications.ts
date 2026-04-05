export type NotificationType =
  | 'appointment_new'
  | 'appointment_cancelled'
  | 'appointment_completed'
  | 'review_received'
  | 'goal_reached'
  | 'inventory_low'
  | 'payment_received'
  | 'patient_birthday'
  | 'follow_up_needed';

export type NotificationPriority = 'high' | 'medium' | 'low';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    patientId?: string;
    patientName?: string;
    appointmentId?: string;
    amount?: number;
    productName?: string;
  };
}

export const notifications: Notification[] = [
  {
    id: 'N001',
    type: 'appointment_new',
    priority: 'medium',
    title: 'Nuovo appuntamento prenotato',
    message:
      'Roberto Ferretti ha prenotato un appuntamento per Fisioterapia cervicale il 15 Aprile alle 10:30',
    timestamp: '2025-04-04T09:15:00Z',
    read: false,
    actionUrl: '/appointments',
    metadata: {
      patientId: 'P051',
      patientName: 'Roberto Ferretti',
      appointmentId: 'A101'
    }
  },
  {
    id: 'N002',
    type: 'appointment_cancelled',
    priority: 'high',
    title: 'Appuntamento cancellato',
    message: "Chiara Barbieri ha cancellato l'appuntamento del 5 Aprile alle 14:00",
    timestamp: '2025-04-04T08:30:00Z',
    read: false,
    actionUrl: '/appointments',
    metadata: {
      patientId: 'P014',
      patientName: 'Chiara Barbieri',
      appointmentId: 'A102'
    }
  },
  {
    id: 'N003',
    type: 'review_received',
    priority: 'medium',
    title: 'Nuova recensione 5 stelle',
    message:
      "Giulia Bianchi ha lasciato una recensione eccellente: 'Professionali e competenti, ho recuperato completamente!'",
    timestamp: '2025-04-03T18:45:00Z',
    read: true,
    actionUrl: '/reviews',
    metadata: {
      patientId: 'P002',
      patientName: 'Giulia Bianchi'
    }
  },
  {
    id: 'N004',
    type: 'goal_reached',
    priority: 'high',
    title: '🎉 Obiettivo fatturato raggiunto!',
    message: "Complimenti! Hai superato l'obiettivo mensile di €28.000 con €31.200 (+11.4%)",
    timestamp: '2025-04-02T23:59:00Z',
    read: false,
    actionUrl: '/analytics',
    metadata: {
      amount: 31200
    }
  },
  {
    id: 'N005',
    type: 'inventory_low',
    priority: 'high',
    title: 'Scorta prodotto bassa',
    message: 'Crema antinfiammatoria Fisiocrem: rimaste solo 3 unità. Ordinare nuova scorta.',
    timestamp: '2025-04-02T14:20:00Z',
    read: false,
    actionUrl: '/inventory',
    metadata: {
      productName: 'Fisiocrem'
    }
  },
  {
    id: 'N006',
    type: 'payment_received',
    priority: 'low',
    title: 'Pagamento ricevuto',
    message: 'Ricevuto pagamento di €150 da Antonio Esposito - Riabilitazione ginocchio',
    timestamp: '2025-04-02T11:00:00Z',
    read: true,
    metadata: {
      patientId: 'P003',
      patientName: 'Antonio Esposito',
      amount: 150
    }
  },
  {
    id: 'N007',
    type: 'appointment_completed',
    priority: 'low',
    title: 'Terapia completata',
    message:
      'Alessandro Moretti ha completato con successo il percorso di riabilitazione post-operatoria',
    timestamp: '2025-04-01T17:30:00Z',
    read: true,
    actionUrl: '/patients/P013',
    metadata: {
      patientId: 'P013',
      patientName: 'Alessandro Moretti'
    }
  },
  {
    id: 'N008',
    type: 'patient_birthday',
    priority: 'medium',
    title: '🎂 Buon compleanno!',
    message: 'La paziente Francesca Romano compie 34 anni oggi. Invia gli auguri!',
    timestamp: '2025-04-01T08:00:00Z',
    read: true,
    metadata: {
      patientId: 'P004',
      patientName: 'Francesca Romano'
    }
  },
  {
    id: 'N009',
    type: 'follow_up_needed',
    priority: 'medium',
    title: 'Follow-up richiesto',
    message:
      'Anna Greco non ha prenotato la visita di controllo consigliata (ultima visita: 29 Marzo)',
    timestamp: '2025-03-31T16:00:00Z',
    read: false,
    actionUrl: '/patients/P008',
    metadata: {
      patientId: 'P008',
      patientName: 'Anna Greco'
    }
  },
  {
    id: 'N010',
    type: 'appointment_new',
    priority: 'medium',
    title: 'Nuovo appuntamento online',
    message:
      'Prenotazione automatica tramite sito web: Marco Rossi - Fisioterapia posturale - 10 Aprile',
    timestamp: '2025-03-31T10:45:00Z',
    read: true,
    actionUrl: '/appointments',
    metadata: {
      patientId: 'P001',
      patientName: 'Marco Rossi',
      appointmentId: 'A001'
    }
  },
  {
    id: 'N011',
    type: 'inventory_low',
    priority: 'medium',
    title: 'Scorta bendaggi in esaurimento',
    message: 'Bendaggi elastici 10cm: rimaste 5 unità. Livello minimo: 10 unità.',
    timestamp: '2025-03-30T09:00:00Z',
    read: true,
    actionUrl: '/inventory',
    metadata: {
      productName: 'Bendaggi elastici 10cm'
    }
  },
  {
    id: 'N012',
    type: 'review_received',
    priority: 'low',
    title: 'Nuova recensione',
    message: "Michele Damico ha lasciato una recensione: 'Ottimo centro, personale qualificato'",
    timestamp: '2025-03-29T20:15:00Z',
    read: true,
    actionUrl: '/reviews',
    metadata: {
      patientId: 'P043',
      patientName: 'Michele Damico'
    }
  },
  {
    id: 'N013',
    type: 'appointment_cancelled',
    priority: 'medium',
    title: 'Cancellazione last-minute',
    message: "Serena Orlando ha cancellato l'appuntamento programmato per oggi alle 11:00",
    timestamp: '2025-03-28T08:30:00Z',
    read: true,
    actionUrl: '/appointments',
    metadata: {
      patientId: 'P042',
      patientName: 'Serena Orlando',
      appointmentId: 'A082'
    }
  },
  {
    id: 'N014',
    type: 'payment_received',
    priority: 'low',
    title: 'Acconto ricevuto',
    message: 'Ricevuto acconto di €200 da Giovanna Coppola per il percorso di riabilitazione anca',
    timestamp: '2025-03-27T15:00:00Z',
    read: true,
    metadata: {
      patientId: 'P028',
      patientName: 'Giovanna Coppola',
      amount: 200
    }
  },
  {
    id: 'N015',
    type: 'goal_reached',
    priority: 'medium',
    title: 'Record mensile!',
    message: 'Marzo 2025 è il mese con il fatturato più alto degli ultimi 12 mesi: €31.200',
    timestamp: '2025-03-27T00:00:00Z',
    read: true,
    actionUrl: '/analytics',
    metadata: {
      amount: 31200
    }
  }
];

// Helper functions
export const getUnreadNotifications = (): Notification[] => {
  return notifications.filter((n) => !n.read);
};

export const getNotificationsByPriority = (priority: NotificationPriority): Notification[] => {
  return notifications.filter((n) => n.priority === priority);
};

export const getNotificationsByType = (type: NotificationType): Notification[] => {
  return notifications.filter((n) => n.type === type);
};

export const getHighPriorityUnreadCount = (): number => {
  return notifications.filter((n) => n.priority === 'high' && !n.read).length;
};

export const getRecentNotifications = (limit: number = 5): Notification[] => {
  return notifications
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Mappatura icone per tipo notifica (da usare nel componente UI)
export const notificationIcons: Record<NotificationType, string> = {
  appointment_new: 'CalendarPlus',
  appointment_cancelled: 'CalendarX',
  appointment_completed: 'CheckCircle',
  review_received: 'Star',
  goal_reached: 'Trophy',
  inventory_low: 'AlertTriangle',
  payment_received: 'CreditCard',
  patient_birthday: 'Gift',
  follow_up_needed: 'Clock'
};

// Colori per priorità (da usare nel componente UI)
export const priorityColors: Record<NotificationPriority, string> = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary'
};
