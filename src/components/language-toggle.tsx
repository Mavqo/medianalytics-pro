'use client';

import { Button } from '@/components/ui/button';
import { useLocaleStore } from '@/lib/i18n/store';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocaleStore((s) => s.locale);
  const toggle = useLocaleStore((s) => s.toggle);

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggle}
      aria-label='Toggle language'
      className='gap-1.5 font-semibold'
    >
      <Languages className='h-4 w-4' />
      <span className='text-xs uppercase tracking-wider'>{locale}</span>
    </Button>
  );
}
