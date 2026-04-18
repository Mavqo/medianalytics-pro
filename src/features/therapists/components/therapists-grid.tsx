'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Search, Star, UserPlus, Users } from 'lucide-react';
import { terapeuti, type Therapist } from '@/lib/data/therapists';

const statusStyles: Record<Therapist['disponibilita'], string> = {
  Disponibile: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Occupato: 'bg-amber-100 text-amber-700 border-amber-200',
  'In ferie': 'bg-slate-100 text-slate-600 border-slate-200'
};

function initials(name: string): string {
  return name
    .replace('Dott.ssa ', '')
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
}

export function TherapistsGrid() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'Tutti' | Therapist['disponibilita']>('Tutti');

  const filtered = useMemo(() => {
    return terapeuti.filter((t) => {
      const matchesQ =
        query === '' ||
        t.nome.toLowerCase().includes(query.toLowerCase()) ||
        t.ruolo.toLowerCase().includes(query.toLowerCase()) ||
        t.specializzazioni.some((s) => s.toLowerCase().includes(query.toLowerCase()));
      const matchesF = filter === 'Tutti' || t.disponibilita === filter;
      return matchesQ && matchesF;
    });
  }, [query, filter]);

  const totalePazienti = terapeuti.reduce((a, c) => a + c.pazientiAttivi, 0);
  const ratingMedio = (terapeuti.reduce((a, c) => a + c.rating, 0) / terapeuti.length).toFixed(1);
  const disponibili = terapeuti.filter((t) => t.disponibilita === 'Disponibile').length;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Terapeuti</h1>
          <p className='text-sm text-muted-foreground'>
            Staff clinico — {terapeuti.length} professionisti attivi
          </p>
        </div>
        <Button className='gap-2'>
          <UserPlus className='h-4 w-4' /> Nuovo Terapeuta
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard label='Staff attivo' value={terapeuti.length.toString()} />
        <StatCard label='Disponibili ora' value={disponibili.toString()} />
        <StatCard label='Pazienti totali' value={totalePazienti.toString()} />
        <StatCard label='Rating medio' value={`${ratingMedio} / 5`} />
      </div>

      <Card>
        <CardContent className='flex flex-wrap items-center gap-2 p-4'>
          <div className='relative flex-1 min-w-[240px]'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Cerca per nome, ruolo o specializzazione...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-9'
            />
          </div>
          {(['Tutti', 'Disponibile', 'Occupato', 'In ferie'] as const).map((s) => (
            <Button
              key={s}
              variant={filter === s ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilter(s)}
            >
              {s}
            </Button>
          ))}
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filtered.map((t) => (
          <Card key={t.id} className='flex flex-col'>
            <CardHeader>
              <div className='flex items-start gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                    {initials(t.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 space-y-1'>
                  <CardTitle className='text-base leading-tight'>{t.nome}</CardTitle>
                  <CardDescription>{t.ruolo}</CardDescription>
                  <Badge variant='outline' className={statusStyles[t.disponibilita]}>
                    {t.disponibilita}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className='mt-auto flex flex-col gap-3'>
              <div className='flex flex-wrap gap-1'>
                {t.specializzazioni.map((s) => (
                  <Badge key={s} variant='secondary' className='text-xs'>
                    {s}
                  </Badge>
                ))}
              </div>
              <div className='grid grid-cols-3 gap-2 rounded-md border p-2 text-center text-xs'>
                <div>
                  <div className='flex items-center justify-center gap-1 font-semibold'>
                    <Star className='h-3 w-3 fill-amber-500 text-amber-500' />
                    {t.rating}
                  </div>
                  <div className='text-muted-foreground'>Rating</div>
                </div>
                <div>
                  <div className='flex items-center justify-center gap-1 font-semibold'>
                    <Users className='h-3 w-3' />
                    {t.pazientiAttivi}
                  </div>
                  <div className='text-muted-foreground'>Pazienti</div>
                </div>
                <div>
                  <div className='font-semibold'>{t.esperienzaAnni}a</div>
                  <div className='text-muted-foreground'>Esperienza</div>
                </div>
              </div>
              <div className='flex flex-col gap-1 text-xs text-muted-foreground'>
                <span className='flex items-center gap-2'>
                  <Mail className='h-3 w-3' /> {t.email}
                </span>
                <span className='flex items-center gap-2'>
                  <Phone className='h-3 w-3' /> {t.telefono}
                </span>
              </div>
              <Button variant='outline' size='sm'>
                Vedi profilo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>{label}</CardDescription>
        <CardTitle className='text-2xl'>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
