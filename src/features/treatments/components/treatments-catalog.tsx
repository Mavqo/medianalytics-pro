'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Clock, Euro, Plus, Search, Sparkles } from 'lucide-react';
import { categorieTrattamenti, trattamenti } from '@/lib/data/treatments';
import { useT } from '@/lib/i18n/store';

const categoryColor: Record<string, string> = {
  Fisioterapia: 'bg-teal-100 text-teal-800 border-teal-200',
  Osteopatia: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Massaggio: 'bg-pink-100 text-pink-800 border-pink-200',
  Riabilitazione: 'bg-orange-100 text-orange-800 border-orange-200',
  Valutazione: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

export function TreatmentsCatalog() {
  const tr = useT();
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState<string>('Tutti');

  const filtered = useMemo(() => {
    return trattamenti.filter((t) => {
      const matchesQ =
        query === '' ||
        t.nome.toLowerCase().includes(query.toLowerCase()) ||
        t.descrizione.toLowerCase().includes(query.toLowerCase());
      const matchesCat = categoria === 'Tutti' || t.categoria === categoria;
      return matchesQ && matchesCat;
    });
  }, [query, categoria]);

  const prezzoMedio = Math.round(
    trattamenti.reduce((a, c) => a + c.prezzo, 0) / trattamenti.length
  );
  const durataMedia = Math.round(
    trattamenti.reduce((a, c) => a + c.durataMin, 0) / trattamenti.length
  );

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{tr.treatments.title}</h1>
          <p className='text-sm text-muted-foreground'>
            {tr.treatments.fullCatalog} — {trattamenti.length}{' '}
            {tr.treatments.activeTreatments.toLowerCase()}
          </p>
        </div>
        <NewTreatmentDialog />
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard label={tr.treatments.activeTreatments} value={trattamenti.length.toString()} />
        <StatCard
          label={tr.treatments.categories}
          value={(categorieTrattamenti.length - 1).toString()}
        />
        <StatCard label={tr.treatments.avgPrice} value={`€${prezzoMedio}`} />
        <StatCard label={tr.treatments.avgDuration} value={`${durataMedia} min`} />
      </div>

      <Card>
        <CardContent className='flex flex-wrap items-center gap-3 p-4'>
          <div className='relative flex-1 min-w-[240px]'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder={tr.treatments.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-9'
            />
          </div>
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categorieTrattamenti.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === 'Tutti' ? tr.common.all : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col items-center gap-2 py-12 text-center'>
            <p className='text-sm text-muted-foreground'>{tr.treatments.noResults}</p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((t) => (
            <Card key={t.id} className='flex flex-col'>
              <CardHeader>
                <div className='flex items-start justify-between gap-2'>
                  <div className='space-y-1'>
                    <Badge variant='outline' className={categoryColor[t.categoria]}>
                      {t.categoria}
                    </Badge>
                    <CardTitle className='text-lg leading-tight'>{t.nome}</CardTitle>
                  </div>
                  {t.popolare && (
                    <Badge className='gap-1 bg-amber-500 hover:bg-amber-500'>
                      <Sparkles className='h-3 w-3' /> {tr.treatments.popular}
                    </Badge>
                  )}
                </div>
                <CardDescription className='line-clamp-2'>{t.descrizione}</CardDescription>
              </CardHeader>
              <CardContent className='mt-auto flex flex-col gap-3'>
                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  <span className='flex items-center gap-1'>
                    <Clock className='h-4 w-4' /> {t.durataMin} min
                  </span>
                  <span className='flex items-center gap-1'>
                    <Euro className='h-4 w-4' /> {t.prezzo}
                  </span>
                  <span className='ml-auto text-xs'>
                    ~{t.sessioniMedie} {tr.treatments.sessions}
                  </span>
                </div>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm' className='flex-1'>
                    {tr.treatments.details}
                  </Button>
                  <Button size='sm' className='flex-1'>
                    {tr.treatments.book}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
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

function NewTreatmentDialog() {
  const tr = useT();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' /> {tr.treatments.newTreatment}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[520px]'>
        <DialogHeader>
          <DialogTitle>{tr.treatments.newTreatment}</DialogTitle>
          <DialogDescription>{tr.treatments.newTreatmentDesc}</DialogDescription>
        </DialogHeader>
        <form
          className='grid gap-4 py-2'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className='grid gap-2'>
            <Label htmlFor='nome'>{tr.common.name}</Label>
            <Input id='nome' required />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='categoria'>{tr.common.category}</Label>
              <Select defaultValue='Fisioterapia'>
                <SelectTrigger id='categoria'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categorieTrattamenti
                    .filter((c) => c !== 'Tutti')
                    .map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='durata'>{tr.treatments.durationMin}</Label>
              <Input id='durata' type='number' defaultValue={50} min={10} />
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='prezzo'>{tr.treatments.priceEur}</Label>
            <Input id='prezzo' type='number' defaultValue={75} min={0} />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='descrizione'>{tr.billing.description}</Label>
            <Textarea id='descrizione' rows={3} placeholder={tr.treatments.describeTreatment} />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>{tr.common.cancel}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>{tr.common.create}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
