'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dictionaries, type Dictionary, type Locale } from './dictionaries';

interface LocaleState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'it',
      setLocale: (l) => set({ locale: l }),
      toggle: () => set({ locale: get().locale === 'it' ? 'en' : 'it' })
    }),
    { name: 'medianalytics-locale' }
  )
);

export function useT(): Dictionary {
  const locale = useLocaleStore((s) => s.locale);
  return dictionaries[locale];
}

export function useLocale() {
  return useLocaleStore((s) => s.locale);
}
