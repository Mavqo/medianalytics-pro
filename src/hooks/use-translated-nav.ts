'use client';

import { navGroups } from '@/config/nav-config';
import { useT } from '@/lib/i18n/store';
import type { NavGroup } from '@/types';
import { useMemo } from 'react';

const urlKey: Record<string, keyof ReturnType<typeof useT>['nav']> = {
  '/dashboard/overview': 'overview',
  '/dashboard/pazienti': 'pazienti',
  '/dashboard/appointments': 'appointments',
  '/dashboard/billing': 'billing',
  '/dashboard/analytics': 'analytics',
  '/dashboard/therapists': 'therapists',
  '/dashboard/treatments': 'treatments',
  '/dashboard/inventory': 'inventory',
  '/dashboard/profile': 'profile',
  '/dashboard/notifications': 'notifications',
  '/dashboard/settings': 'settings'
};

const groupKey: Record<string, keyof ReturnType<typeof useT>['nav']> = {
  Centro: 'groupCenter',
  Gestione: 'groupGestione'
};

export function useTranslatedNavGroups(): NavGroup[] {
  const t = useT();
  return useMemo(() => {
    return navGroups.map((g) => ({
      ...g,
      label: g.label && groupKey[g.label] ? t.nav[groupKey[g.label]] : g.label,
      items: g.items.map((item) => ({
        ...item,
        title: urlKey[item.url]
          ? t.nav[urlKey[item.url]]
          : item.title === 'Account'
            ? t.nav.account
            : item.title,
        items: item.items?.map((sub) => ({
          ...sub,
          title: urlKey[sub.url]
            ? t.nav[urlKey[sub.url]]
            : sub.title === 'Logout'
              ? t.nav.logout
              : sub.title
        }))
      }))
    }));
  }, [t]);
}
