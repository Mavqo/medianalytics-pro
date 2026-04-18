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
import { useT } from '@/lib/i18n/store';

const statoStyles: Record<InvoiceStatus, string> = {
  pagata: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'in-attesa': 'bg-amber-100 text-amber-700 border-amber-200',
  scaduta: 'bg-rose-100 text-rose-700 border-rose-200'
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
  const t = useT();
  const statoLabel: Record<InvoiceStatus, string> = {
    pagata: t.billing.statusPaid,
    'in-attesa': t.billing.statusPending,
    scaduta: t.billing.statusOverdue
  };
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
          <h1 className='text-3xl font-bold tracking-tight'>{t.billing.title}</h1>
          <p className='text-sm text-muted-foreground'>
            {t.billing.subtitle} — {invoices.length} {t.billing.docs}
          </p>
        </div>
        <NewInvoiceDialog open={open} onOpenChange={setOpen} />
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard
          icon={<Euro className='h-4 w-4' />}
          label={t.billing.revenueMonth}
          value={euro(stats.mese)}
          hint={t.billing.last30}
          tone='emerald'
        />
        <StatCard
          icon={<FileText className='h-4 w-4' />}
          label={t.billing.invoicesIssued}
          value={stats.emesse.toString()}
          hint={t.billing.currentMonth}
        />
        <StatCard
          icon={<Clock className='h-4 w-4' />}
          label={t.billing.toCollect}
          value={euro(stats.daIncassare)}
          hint={t.billing.pendingInvoices}
          tone='amber'
        />
        <StatCard
          icon={<AlertTriangle className='h-4 w-4' />}
          label={t.billing.overdueLabel}
          value={euro(stats.scadute)}
          hint={t.billing.needReminders}
          tone='rose'
        />
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='md:col-span-2'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>{t.billing.activePlan}</CardTitle>
            <CardDescription>{t.billing.subscription}</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <div className='flex items-center justify-between rounded-lg border bg-gradient-to-r from-sky-50 to-indigo-50 p-4'>
              <div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>{t.billing.planPro}</span>
                  <Badge variant='outline' className='border-sky-200 bg-sky-100 text-sky-700'>
                    {t.billing.activeBadge}
                  </Badge>
                </div>
                <div className='text-sm text-muted-foreground'>{t.billing.planDetails}</div>
              </div>
              <Button variant='outline' size='sm'>
                {t.billing.changePlan}
              </Button>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='flex items-center gap-3'>
                <div className='rounded-md bg-slate-100 p-2'>
                  <CreditCard className='h-4 w-4 text-slate-700' />
                </div>
                <div>
                  <div className='font-semibold'>Visa •••• 4242</div>
                  <div className='text-xs text-muted-foreground'>{t.billing.expiry} 08/2028</div>
                </div>
              </div>
              <Button variant='ghost' size='sm'>
                {t.billing.update}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>{t.billing.upcomingCollections}</CardTitle>
            <CardDescription>{t.billing.awaitingPayment}</CardDescription>
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
                      {t.billing.dueAbbr} {new Date(i.scadenza).toLocaleDateString('it-IT')}
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
              placeholder={t.billing.searchPlaceholder}
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
              {s === 'Tutte' ? t.common.all : statoLabel[s as InvoiceStatus]}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>
            {t.billing.invoices} ({filtered.length})
          </CardTitle>
          <CardDescription>{t.billing.sortedByDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.billing.numberAbbr}</TableHead>
                <TableHead>{t.common.date}</TableHead>
                <TableHead>{t.appointments.patient}</TableHead>
                <TableHead>{t.billing.description}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className='text-right'>{t.common.amount}</TableHead>
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
  const tr = useT();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' /> {tr.billing.newInvoice}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[520px]'>
        <DialogHeader>
          <DialogTitle>{tr.billing.newInvoice}</DialogTitle>
          <DialogDescription>{tr.billing.newInvoiceDesc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>{tr.appointments.patient}</Label>
            <Input placeholder={tr.appointments.patientPh} />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.billing.issueDate}</Label>
            <Input type='date' defaultValue={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.billing.dueDate}</Label>
            <Input
              type='date'
              defaultValue={new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)}
            />
          </div>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>{tr.billing.description}</Label>
            <Input placeholder={tr.billing.descExample} />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.billing.amountEur}</Label>
            <Input type='number' defaultValue={450} min={0} step={10} />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.billing.paymentMethod}</Label>
            <Select defaultValue='carta'>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='carta'>{tr.billing.methodCard}</SelectItem>
                <SelectItem value='bonifico'>{tr.billing.methodBank}</SelectItem>
                <SelectItem value='contanti'>{tr.billing.methodCash}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className='md:col-span-2'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              {tr.common.cancel}
            </Button>
            <Button type='submit'>{tr.billing.issueInvoice}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
