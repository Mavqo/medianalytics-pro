'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Euro,
  FileText,
  Plus,
  Search
} from 'lucide-react';
import { invoices, type Invoice, type InvoiceStatus } from '@/lib/data/billing';

const statoStyles: Record<InvoiceStatus, string> = {
  pagata: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'in-attesa': 'bg-amber-100 text-amber-700 border-amber-200',
  scaduta: 'bg-rose-100 text-rose-700 border-rose-200'
};

const statoLabel: Record<InvoiceStatus, string> = {
  pagata: 'Pagata',
  'in-attesa': 'In attesa',
  scaduta: 'Scaduta'
};

const stati = ['Tutte', 'pagata', 'in-attesa', 'scaduta'] as const;

function euro(n: number) {
  return n.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });
}

export function BillingPanel() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof stati)[number]>('Tutte');
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const mese = invoices
      .filter((i) => i.data >= monthAgo && i.data <= today)
      .reduce((acc, i) => acc + i.importo, 0);
    const daIncassare = invoices
      .filter((i) => i.stato === 'in-attesa')
      .reduce((acc, i) => acc + i.importo, 0);
    const scadute = invoices
      .filter((i) => i.stato === 'scaduta')
      .reduce((acc, i) => acc + i.importo, 0);
    const emesse = invoices.filter((i) => i.data >= monthAgo).length;
    return { mese, daIncassare, scadute, emesse };
  }, []);

  const filtered = useMemo(() => {
    return invoices
      .filter((i) => {
        const q = query.toLowerCase();
        const matchesQ =
          q === '' ||
          i.numero.toLowerCase().includes(q) ||
          `${i.pazienteNome} ${i.pazienteCognome}`.toLowerCase().includes(q) ||
          i.descrizione.toLowerCase().includes(q);
        const matchesF = filter === 'Tutte' || i.stato === filter;
        return matchesQ && matchesF;
      })
      .sort((a, b) => b.data.localeCompare(a.data));
  }, [query, filter]);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Fatturazione</h1>
          <p className='text-sm text-muted-foreground'>
            Fatture, pagamenti e piano attivo — {invoices.length} documenti
          </p>
        </div>
        <NewInvoiceDialog open={open} onOpenChange={setOpen} />
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard
          icon={<Euro className='h-4 w-4' />}
          label='Fatturato mese'
          value={euro(stats.mese)}
          hint='ultimi 30 giorni'
          tone='emerald'
        />
        <StatCard
          icon={<FileText className='h-4 w-4' />}
          label='Fatture emesse'
          value={stats.emesse.toString()}
          hint='nel mese corrente'
        />
        <StatCard
          icon={<Clock className='h-4 w-4' />}
          label='Da incassare'
          value={euro(stats.daIncassare)}
          hint='fatture in attesa'
          tone='amber'
        />
        <StatCard
          icon={<AlertTriangle className='h-4 w-4' />}
          label='Scadute'
          value={euro(stats.scadute)}
          hint='richiedono solleciti'
          tone='rose'
        />
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='md:col-span-2'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Piano attivo</CardTitle>
            <CardDescription>Gestione abbonamento MediAnalytics</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <div className='flex items-center justify-between rounded-lg border bg-gradient-to-r from-sky-50 to-indigo-50 p-4'>
              <div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Piano Pro</span>
                  <Badge variant='outline' className='border-sky-200 bg-sky-100 text-sky-700'>
                    Attivo
                  </Badge>
                </div>
                <div className='text-sm text-muted-foreground'>
                  €49/mese · fatturazione annuale · prossimo rinnovo 15 maggio 2026
                </div>
              </div>
              <Button variant='outline' size='sm'>
                Cambia piano
              </Button>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='flex items-center gap-3'>
                <div className='rounded-md bg-slate-100 p-2'>
                  <CreditCard className='h-4 w-4 text-slate-700' />
                </div>
                <div>
                  <div className='font-semibold'>Visa •••• 4242</div>
                  <div className='text-xs text-muted-foreground'>Scadenza 08/2028</div>
                </div>
              </div>
              <Button variant='ghost' size='sm'>
                Aggiorna
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Prossimi incassi</CardTitle>
            <CardDescription>Fatture in attesa pagamento</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {invoices
              .filter((i) => i.stato === 'in-attesa')
              .slice(0, 4)
              .map((i) => (
                <div
                  key={i.id}
                  className='flex items-center justify-between rounded-md border px-3 py-2 text-sm'
                >
                  <div>
                    <div className='font-medium'>
                      {i.pazienteNome} {i.pazienteCognome}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      Scad. {new Date(i.scadenza).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                  <span className='font-semibold tabular-nums'>{euro(i.importo)}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className='flex flex-wrap items-center gap-2 p-4'>
          <div className='relative flex-1 min-w-[240px]'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Cerca numero, paziente, descrizione...'
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
              {s === 'Tutte' ? 'Tutte' : statoLabel[s as InvoiceStatus]}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Fatture ({filtered.length})</CardTitle>
          <CardDescription>Ordinate per data più recente</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Paziente</TableHead>
                <TableHead>Descrizione</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className='text-right'>Importo</TableHead>
                <TableHead className='w-10' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className='font-mono text-xs text-muted-foreground'>
                    {i.numero}
                  </TableCell>
                  <TableCell className='text-xs text-muted-foreground'>
                    {new Date(i.data).toLocaleDateString('it-IT')}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {i.pazienteNome} {i.pazienteCognome}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-xs max-w-[280px] truncate'>
                    {i.descrizione}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className={statoStyles[i.stato]}>
                      {i.stato === 'pagata' && <CheckCircle2 className='mr-1 h-3 w-3' />}
                      {i.stato === 'in-attesa' && <Clock className='mr-1 h-3 w-3' />}
                      {i.stato === 'scaduta' && <AlertTriangle className='mr-1 h-3 w-3' />}
                      {statoLabel[i.stato]}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right tabular-nums font-medium'>
                    {euro(i.importo)}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <Download className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
  tone
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone?: 'emerald' | 'amber' | 'rose';
}) {
  const toneClass =
    tone === 'emerald'
      ? 'text-emerald-600'
      : tone === 'amber'
        ? 'text-amber-600'
        : tone === 'rose'
          ? 'text-rose-600'
          : 'text-foreground';
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription className='flex items-center gap-2'>
          {icon} {label}
        </CardDescription>
        <CardTitle className={`text-2xl ${toneClass}`}>{value}</CardTitle>
      </CardHeader>
      <CardContent className='pt-0 text-xs text-muted-foreground'>{hint}</CardContent>
    </Card>
  );
}

function NewInvoiceDialog({
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
          <Plus className='h-4 w-4' /> Nuova Fattura
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[520px]'>
        <DialogHeader>
          <DialogTitle>Nuova fattura</DialogTitle>
          <DialogDescription>Emetti una nuova fattura per un paziente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>Paziente</Label>
            <Input placeholder='Nome e cognome' />
          </div>
          <div>
            <Label className='mb-1.5 block'>Data emissione</Label>
            <Input type='date' defaultValue={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <Label className='mb-1.5 block'>Scadenza</Label>
            <Input
              type='date'
              defaultValue={new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)}
            />
          </div>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>Descrizione</Label>
            <Input placeholder='Es. Ciclo riabilitativo - 10 sedute' />
          </div>
          <div>
            <Label className='mb-1.5 block'>Importo (€)</Label>
            <Input type='number' defaultValue={450} min={0} step={10} />
          </div>
          <div>
            <Label className='mb-1.5 block'>Metodo pagamento</Label>
            <Select defaultValue='carta'>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='carta'>Carta</SelectItem>
                <SelectItem value='bonifico'>Bonifico</SelectItem>
                <SelectItem value='contanti'>Contanti</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className='md:col-span-2'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type='submit'>Emetti fattura</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
