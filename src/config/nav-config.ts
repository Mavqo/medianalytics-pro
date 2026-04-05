import { NavGroup } from '@/types';

/**
 * Navigation configuration for MediAnalytics Pro
 * Healthcare Dashboard Navigation
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Centro',
    items: [
      {
        title: 'Panoramica',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['p', 'p'],
        items: []
      },
      {
        title: 'Pazienti',
        url: '/dashboard/pazienti',
        icon: 'users',
        isActive: false,
        shortcut: ['z', 'z'],
        items: []
      },
      {
        title: 'Appuntamenti',
        url: '/dashboard/appointments',
        icon: 'calendar',
        isActive: false,
        shortcut: ['a', 'a'],
        items: []
      },
      {
        title: 'Fatturazione',
        url: '/dashboard/billing',
        icon: 'creditCard',
        isActive: false,
        shortcut: ['f', 'f'],
        items: []
      },
      {
        title: 'Analytics',
        url: '/dashboard/analytics',
        icon: 'chart',
        isActive: false,
        shortcut: ['n', 'n'],
        items: []
      }
    ]
  },
  {
    label: 'Gestione',
    items: [
      {
        title: 'Terapeuti',
        url: '/dashboard/therapists',
        icon: 'employee',
        isActive: false,
        items: []
      },
      {
        title: 'Trattamenti',
        url: '/dashboard/treatments',
        icon: 'health',
        isActive: false,
        items: []
      },
      {
        title: 'Inventario',
        url: '/dashboard/inventory',
        icon: 'box',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: '',
    items: [
      {
        title: 'Account',
        url: '#',
        icon: 'account',
        isActive: true,
        items: [
          {
            title: 'Profilo',
            url: '/dashboard/profile',
            icon: 'profile',
            shortcut: ['m', 'm']
          },
          {
            title: 'Notifiche',
            url: '/dashboard/notifications',
            icon: 'notification',
            shortcut: ['t', 't']
          },
          {
            title: 'Impostazioni',
            url: '/dashboard/settings',
            icon: 'settings',
            shortcut: ['i', 'i']
          },
          {
            title: 'Logout',
            shortcut: ['l', 'l'],
            url: '/auth/sign-in',
            icon: 'logout'
          }
        ]
      }
    ]
  }
];
