'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AlertTriangle, Package, Plus, Search } from 'lucide-react';
import { inventario, type InventoryItem } from '@/lib/data/inventory';
import { useT } from '@/lib/i18n/store';

const categoryStyles: Record<InventoryItem['categoria'], string> = {
  Consumabili: 'bg-sky-100 text-sky-700 border-sky-200',
  Attrezzatura: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Farmaci: 'bg-rose-100 text-rose-700 border-rose-200',
  Tessili: 'bg-amber-100 text-amber-700 border-amber-200'
};

const categorie = ['Tutti', 'Consumabili', 'Attrezzatura', 'Farmaci', 'Tessili'] as const;

export function InventoryTable() {
  const t = useT();
  const categoryLabel: Record<InventoryItem['categoria'], string> = {
    Consumabili: t.inventory.catConsumables,
    Attrezzatura: t.inventory.catEquipment,
    Farmaci: t.inventory.catDrugs,
    Tessili: t.inventory.catTextiles
  };
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof categorie)[number]>('Tutti');

  const filtered = useMemo(() => {
    return inventario.filter((i) => {
      const matchesQ =
        query === '' ||
        i.nome.toLowerCase().includes(query.toLowerCase()) ||
        i.fornitore.toLowerCase().includes(query.toLowerCase());
      const matchesF = filter === 'Tutti' || i.categoria === filter;
      return matchesQ && matchesF;
    });
  }, [query, filter]);

  const totale = inventario.length;
  const sottoSoglia = inventario.filter((i) => i.quantita < i.soglia).length;
  const valore = inventario.reduce((a, c) => a + c.quantita * c.costoUnitario, 0);
  const fornitori = new Set(inventario.map((i) => i.fornitore)).size;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{t.inventory.title}</h1>
          <p className='text-sm text-muted-foreground'>
            {t.inventory.warehouse} — {totale} {t.inventory.itemsMonitored}
          </p>
        </div>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' /> {t.inventory.newItem}
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard label={t.inventory.totalItems} value={totale.toString()} />
        <StatCard
          label={t.inventory.belowThreshold}
          value={sottoSoglia.toString()}
          tone={sottoSoglia > 0 ? 'warn' : undefined}
        />
        <StatCard
          label={t.inventory.warehouseValue}
          value={valore.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
          })}
        />
        <StatCard label={t.inventory.activeSuppliers} value={fornitori.toString()} />
      </div>

      {sottoSoglia > 0 && (
        <Card className='border-amber-200 bg-amber-50/50'>
          <CardContent className='flex items-center gap-3 p-4'>
            <AlertTriangle className='h-5 w-5 text-amber-600' />
            <div className='text-sm'>
              <span className='font-semibold text-amber-900'>
                {sottoSoglia} {t.inventory.itemsBelowThreshold1}
              </span>{' '}
              <span className='text-amber-800'>{t.inventory.itemsBelowThreshold2}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className='flex flex-wrap items-center gap-2 p-4'>
          <div className='relative flex-1 min-w-[240px]'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder={t.inventory.searchItemPh}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-9'
            />
          </div>
          {categorie.map((c) => (
            <Button
              key={c}
              variant={filter === c ? 'default' : 'outline'}
              size='sm'
              onClick={() => setFilter(c)}
            >
              {c === 'Tutti' ? t.common.all : categoryLabel[c as InventoryItem['categoria']]}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-base'>
            <Package className='h-4 w-4' /> {t.inventory.itemsCount} ({filtered.length})
          </CardTitle>
          <CardDescription>{t.inventory.fullList}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.inventory.item}</TableHead>
                <TableHead>{t.common.category}</TableHead>
                <TableHead className='text-right'>{t.inventory.quantity}</TableHead>
                <TableHead className='text-right'>{t.inventory.threshold}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className='text-right'>{t.inventory.unitCost}</TableHead>
                <TableHead>{t.inventory.supplier}</TableHead>
                <TableHead>{t.inventory.lastReorder}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => {
                const basso = i.quantita < i.soglia;
                return (
                  <TableRow key={i.id}>
                    <TableCell className='font-medium'>{i.nome}</TableCell>
                    <TableCell>
                      <Badge variant='outline' className={categoryStyles[i.categoria]}>
                        {categoryLabel[i.categoria]}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right tabular-nums'>
                      {i.quantita} {i.unita}
                    </TableCell>
                    <TableCell className='text-right tabular-nums text-muted-foreground'>
                      {i.soglia}
                    </TableCell>
                    <TableCell>
                      {basso ? (
                        <Badge
                          className='bg-amber-100 text-amber-800 border-amber-200'
                          variant='outline'
                        >
                          {t.inventory.reorderAction}
                        </Badge>
                      ) : (
                        <Badge
                          className='bg-emerald-100 text-emerald-700 border-emerald-200'
                          variant='outline'
                        >
                          {t.inventory.okLabel}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className='text-right tabular-nums'>
                      {i.costoUnitario.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </TableCell>
                    <TableCell className='text-muted-foreground'>{i.fornitore}</TableCell>
                    <TableCell className='text-muted-foreground text-xs'>
                      {new Date(i.ultimoRiordino).toLocaleDateString('it-IT')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: 'warn' }) {
  return (
    <Card className={tone === 'warn' ? 'border-amber-200' : undefined}>
      <CardHeader className='pb-2'>
        <CardDescription>{label}</CardDescription>
        <CardTitle className={`text-2xl ${tone === 'warn' ? 'text-amber-700' : ''}`}>
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
