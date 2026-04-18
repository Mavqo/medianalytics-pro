'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { CalendarDays, CheckCircle2, Clock, Euro, Plus, Search } from 'lucide-react';
import { appointments, type Appointment } from '@/lib/data/appointments';
import { terapeuti } from '@/lib/data/therapists';
import { trattamenti } from '@/lib/data/treatments';

const statoStyles: Record<Appointment['stato'], string> = {
  confermato: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  completato: 'bg-sky-100 text-sky-700 border-sky-200',
  cancellato: 'bg-rose-100 text-rose-700 border-rose-200',
  'no-show': 'bg-slate-200 text-slate-700 border-slate-300'
};

const statoLabel: Record<Appointment['stato'], string> = {
  confermato: 'Confermato',
  completato: 'Completato',
  cancellato: 'Cancellato',
  'no-show': 'No-show'
};

const stati = ['Tutti', 'confermato', 'completato', 'cancellato', 'no-show'] as const;

export function AppointmentsTable() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof stati)[number]>('Tutti');
  const [open, setOpen] = useState(false);

  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);
  const weekAgo = new Date(today.getTime() - 7 * 86400000).toISOString().slice(0, 10);
  const monthAgo = new Date(today.getTime() - 30 * 86400000).toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const oggi = appointments.filter((a) => a.data === todayIso).length;
    const settimana = appointments.filter((a) => a.data >= weekAgo && a.data <= todayIso).length;
    const completati = appointments.filter(
      (a) => a.stato === 'completato' && a.data >= monthAgo
    ).length;
    const fatturato = appointments
      .filter((a) => a.stato === 'completato' && a.data >= monthAgo)
      .reduce((acc, a) => acc + a.costo, 0);
    return { oggi, settimana, completati, fatturato };
  }, [todayIso, weekAgo, monthAgo]);

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => {
        const q = query.toLowerCase();
        const matchesQ =
          q === '' ||
          `${a.pazienteNome} ${a.pazienteCognome}`.toLowerCase().includes(q) ||
          a.tipoTrattamento.toLowerCase().includes(q) ||
          a.terapeuta.toLowerCase().includes(q);
        const matchesF = filter === 'Tutti' || a.stato === filter;
        return matchesQ && matchesF;
      })
      .sort((a, b) =>
        a.data === b.data ? a.ora.localeCompare(b.ora) : b.data.localeCompare(a.data)
      );
  }, [query, filter]);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Appuntamenti</h1>
          <p className='text-sm text-muted-foreground'>
            Agenda trattamenti — {appointments.length} sedute registrate
          </p>
        </div>
        <NewAppointmentDialog open={open} onOpenChange={setOpen} />
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard
          icon={<CalendarDays className='h-4 w-4' />}
          label='Oggi'
          value={stats.oggi.toString()}
          hint='sedute in programma'
        />
        <StatCard
          icon={<Clock className='h-4 w-4' />}
          label='Ultimi 7 giorni'
          value={stats.settimana.toString()}
          hint='sedute totali'
        />
        <StatCard
          icon={<CheckCircle2 className='h-4 w-4' />}
          label='Completati 30gg'
          value={stats.completati.toString()}
          hint='sedute concluse'
        />
        <StatCard
          icon={<Euro className='h-4 w-4' />}
          label='Fatturato 30gg'
          value={stats.fatturato.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
          })}
          hint='da sedute completate'
        />
      </div>

      <Card>
        <CardContent className='flex flex-wrap items-center gap-2 p-4'>
          <div className='relative flex-1 min-w-[240px]'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Cerca paziente, trattamento, terapeuta...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-9'
            />
          </div>
          {stati.map((s) => (
            <Button
              key={s}
              variant={filter === s ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilter(s)}
            >
              {s === 'Tutti' ? 'Tutti' : statoLabel[s as Appointment['stato']]}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Agenda ({filtered.length})</CardTitle>
          <CardDescription>Ordinati per data più recente</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paziente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ora</TableHead>
                <TableHead className='text-right'>Durata</TableHead>
                <TableHead>Trattamento</TableHead>
                <TableHead>Terapeuta</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className='text-right'>Costo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 50).map((a) => (
                <TableRow key={a.id}>
                  <TableCell className='font-medium'>
                    {a.pazienteNome} {a.pazienteCognome}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-xs'>
                    {new Date(a.data).toLocaleDateString('it-IT')}
                  </TableCell>
                  <TableCell className='tabular-nums'>{a.ora}</TableCell>
                  <TableCell className='text-right tabular-nums text-muted-foreground'>
                    {a.durata}′
                  </TableCell>
                  <TableCell>{a.tipoTrattamento}</TableCell>
                  <TableCell className='text-muted-foreground'>{a.terapeuta}</TableCell>
                  <TableCell>
                    <Badge variant='outline' className={statoStyles[a.stato]}>
                      {statoLabel[a.stato]}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right tabular-nums'>
                    {a.costo.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length > 50 && (
            <p className='mt-3 text-center text-xs text-muted-foreground'>
              Mostrati 50 di {filtered.length} risultati — raffina i filtri per vedere altri
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription className='flex items-center gap-2'>
          {icon} {label}
        </CardDescription>
        <CardTitle className='text-2xl'>{value}</CardTitle>
      </CardHeader>
      <CardContent className='pt-0 text-xs text-muted-foreground'>{hint}</CardContent>
    </Card>
  );
}

function NewAppointmentDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' /> Nuovo Appuntamento
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[520px]'>
        <DialogHeader>
          <DialogTitle>Nuovo appuntamento</DialogTitle>
          <DialogDescription>
            Prenota una nuova seduta. Compila i dati essenziali.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>Paziente</Label>
            <Input placeholder='Nome e cognome' />
          </div>
          <div>
            <Label className='mb-1.5 block'>Data</Label>
            <Input type='date' defaultValue={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <Label className='mb-1.5 block'>Ora</Label>
            <Input type='time' defaultValue='09:00' />
          </div>
          <div>
            <Label className='mb-1.5 block'>Durata (min)</Label>
            <Input type='number' defaultValue={45} min={15} step={15} />
          </div>
          <div>
            <Label className='mb-1.5 block'>Trattamento</Label>
            <Select defaultValue={trattamenti[0]?.nome}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {trattamenti.slice(0, 10).map((t) => (
                  <SelectItem key={t.id} value={t.nome}>
                    {t.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>Terapeuta</Label>
            <Select defaultValue={terapeuti[0]?.nome}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {terapeuti.map((t) => (
                  <SelectItem key={t.id} value={t.nome}>
                    {t.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>Note</Label>
            <Textarea placeholder='Note opzionali sulla seduta' rows={3} />
          </div>
          <DialogFooter className='md:col-span-2'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type='submit'>Prenota</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
