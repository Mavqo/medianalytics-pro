'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useT } from '@/lib/i18n/store';

type BreadcrumbItem = {
  title: string;
  link: string;
};

export function useBreadcrumbs() {
  const pathname = usePathname();
  const t = useT();

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const segmentMap: Record<string, string> = {
      dashboard: t.common.dashboard,
      overview: t.nav.overview,
      pazienti: t.nav.pazienti,
      appointments: t.nav.appointments,
      billing: t.nav.billing,
      analytics: t.nav.analytics,
      therapists: t.nav.therapists,
      treatments: t.nav.treatments,
      inventory: t.nav.inventory,
      settings: t.nav.settings,
      profile: t.common.profile,
      notifications: t.common.notifications
    };

    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      const title = segmentMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
      return { title, link: path };
    });
  }, [pathname, t]);

  return breadcrumbs;
}
