'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import {
  andamentoRecensioni,
  fatturatoMensile,
  metricheRetention,
  nuoviPazienti,
  statisticheGiornaliere,
  topTerapeuti,
  visitePerGiorno,
  visitePerTipo
} from '@/lib/data/analytics';
import { useT } from '@/lib/i18n/store';

const PIE_COLORS = ['#14b8a6', '#f97316', '#6366f1', '#ec4899', '#eab308'];

const revenueConfig = {
  fatturato: { label: 'Fatturato', color: '#14b8a6' },
  obiettivo: { label: 'Obiettivo', color: '#94a3b8' }
} satisfies ChartConfig;

const therapistConfig = {
  fatturato: { label: 'Fatturato (€)', color: '#f97316' }
} satisfies ChartConfig;

const treatmentConfig = {
  visite: { label: 'Visite' }
} satisfies ChartConfig;

const dayConfig = {
  visite: { label: 'Visite', color: '#14b8a6' },
  fatturato: { label: 'Fatturato (€)', color: '#f97316' }
} satisfies ChartConfig;

const patientsConfig = {
  nuoviPazienti: { label: 'Nuovi', color: '#14b8a6' },
  pazientiRicorrenti: { label: 'Ricorrenti', color: '#6366f1' }
} satisfies ChartConfig;

const reviewsConfig = {
  media: { label: 'Media stelle', color: '#eab308' }
} satisfies ChartConfig;

const euroFmt = (n: number) => `€${n.toLocaleString('it-IT')}`;

export function AnalyticsDashboard() {
  const t = useT();
  const topTherapist = topTerapeuti[0];
  const revenueYTD = fatturatoMensile.reduce((a, c) => a + c.fatturato, 0);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{t.analytics.title}</h1>
          <p className='text-sm text-muted-foreground'>{t.analytics.deepAnalysis}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Tabs defaultValue='12m'>
            <TabsList>
              <TabsTrigger value='30g'>30g</TabsTrigger>
              <TabsTrigger value='3m'>3m</TabsTrigger>
              <TabsTrigger value='12m'>12m</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant='outline' size='sm' className='gap-2'>
            <Download className='h-4 w-4' /> {t.analytics.export}
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <KpiCard
          label={t.analytics.retentionRate}
          value={`${metricheRetention.tassoRetention}%`}
          hint='+2.3%'
          positive
        />
        <KpiCard
          label={t.analytics.avgVisits}
          value={metricheRetention.visiteMediePerPaziente.toString()}
          hint='+0.5'
          positive
        />
        <KpiCard
          label={t.analytics.ltvValue}
          value={euroFmt(metricheRetention.valoreLifetimeMedio)}
          hint='+€42'
          positive
        />
        <KpiCard
          label={t.analytics.noShowRate}
          value={`${statisticheGiornaliere.tassoNoShow}%`}
          hint='-0.5% vs mese scorso'
          positive
        />
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              Fatturato per Mese
              <Badge variant='outline' className='border-primary text-primary'>
                {euroFmt(revenueYTD)} YTD
              </Badge>
            </CardTitle>
            <CardDescription>Reale vs obiettivo — ultimi 12 mesi</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className='h-72 w-full'>
              <AreaChart data={fatturatoMensile} margin={{ left: 0, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id='revGrad' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#14b8a6' stopOpacity={0.4} />
                    <stop offset='95%' stopColor='#14b8a6' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#e7e5e4' />
                <XAxis dataKey='mese' tickLine={false} axisLine={false} fontSize={12} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
                />
                <ChartTooltip content={<ChartTooltipContent indicator='line' />} />
                <Area
                  type='monotone'
                  dataKey='obiettivo'
                  stroke='#94a3b8'
                  strokeDasharray='4 4'
                  fill='transparent'
                />
                <Area
                  type='monotone'
                  dataKey='fatturato'
                  stroke='#14b8a6'
                  strokeWidth={2}
                  fill='url(#revGrad)'
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Terapeuti</CardTitle>
            <CardDescription>
              Leader: {topTherapist.nome} — {euroFmt(topTherapist.fatturato)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={therapistConfig} className='h-72 w-full'>
              <BarChart data={topTerapeuti} layout='vertical' margin={{ left: 20, right: 20 }}>
                <CartesianGrid horizontal={false} strokeDasharray='3 3' stroke='#e7e5e4' />
                <XAxis
                  type='number'
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type='category'
                  dataKey='nome'
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  width={140}
                  tickFormatter={(v: string) => v.replace('Dott.ssa ', '').replace('Dr. ', '')}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey='fatturato' fill='#f97316' radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mix Trattamenti</CardTitle>
            <CardDescription>Distribuzione visite per tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={treatmentConfig} className='h-72 w-full'>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={visitePerTipo}
                  dataKey='visite'
                  nameKey='tipo'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {visitePerTipo.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey='tipo' />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuzione per Giorno</CardTitle>
            <CardDescription>Visite e fatturato settimanale</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={dayConfig} className='h-72 w-full'>
              <BarChart data={visitePerGiorno} margin={{ top: 10, right: 10 }}>
                <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#e7e5e4' />
                <XAxis dataKey='giorno' tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey='visite' fill='#14b8a6' radius={4} />
                <Bar dataKey='fatturato' fill='#f97316' radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crescita Pazienti</CardTitle>
            <CardDescription>Nuovi vs ricorrenti</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={patientsConfig} className='h-72 w-full'>
              <BarChart data={nuoviPazienti} margin={{ top: 10, right: 10 }}>
                <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#e7e5e4' />
                <XAxis
                  dataKey='mese'
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickFormatter={(v: string) => v.split(' ')[0]}
                />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey='pazientiRicorrenti'
                  stackId='a'
                  fill='#6366f1'
                  radius={[0, 0, 4, 4]}
                />
                <Bar dataKey='nuoviPazienti' stackId='a' fill='#14b8a6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Andamento Recensioni</CardTitle>
            <CardDescription>Media stelle e volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={reviewsConfig} className='h-72 w-full'>
              <LineChart data={andamentoRecensioni} margin={{ top: 10, right: 10 }}>
                <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#e7e5e4' />
                <XAxis
                  dataKey='mese'
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickFormatter={(v: string) => v.split(' ')[0]}
                />
                <YAxis domain={[4, 5]} tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type='monotone'
                  dataKey='media'
                  stroke='#eab308'
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#eab308' }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  positive
}: {
  label: string;
  value: string;
  hint: string;
  positive: boolean;
}) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>{label}</CardDescription>
        <CardTitle className='text-2xl'>{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>{hint}</p>
      </CardContent>
    </Card>
  );
}
