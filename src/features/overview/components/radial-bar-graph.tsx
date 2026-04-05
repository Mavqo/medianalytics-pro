'use client';

import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { kpiPrincipali, statisticheGiornaliere } from '@/lib/data/analytics';

// Data for radial bar chart
const chartData = [
  {
    name: 'Obiettivo Mensile',
    value: Math.min(kpiPrincipali.percentualeObiettivo, 100),
    fullMark: 100,
    fill: '#14b8a6' // Teal 500
  },
  {
    name: 'Tasso Completamento',
    value: statisticheGiornaliere.tassoCompletamento,
    fullMark: 100,
    fill: '#0d9488' // Teal 600
  },
  {
    name: 'Tasso Occupazione',
    value: statisticheGiornaliere.tassoOccupazione,
    fullMark: 100,
    fill: '#f97316' // Orange 500
  },
  {
    name: 'Retention Pazienti',
    value: 78.5,
    fullMark: 100,
    fill: '#fb923c' // Orange 400
  }
];

const chartConfig = {
  value: {
    label: 'Percentuale'
  }
} satisfies ChartConfig;

export function RadialBarGraph() {
  const obiettivoRaggiunto = kpiPrincipali.percentualeObiettivo >= 100;

  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='flex items-center gap-2'>
          Obiettivi Mensili
          <Badge
            variant={obiettivoRaggiunto ? 'default' : 'outline'}
            className={obiettivoRaggiunto ? 'bg-primary' : ''}
          >
            {obiettivoRaggiunto ? (
              <>
                <Icons.check className='h-3 w-3 mr-1' /> Raggiunto
              </>
            ) : (
              'In corso'
            )}
          </Badge>
        </CardTitle>
        <CardDescription>
          {obiettivoRaggiunto
            ? `Superato del ${(kpiPrincipali.percentualeObiettivo - 100).toFixed(1)}%`
            : `${kpiPrincipali.percentualeObiettivo.toFixed(1)}% completato`}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pb-0 pt-4'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[280px] min-h-[220px] w-full'
        >
          <RadialBarChart
            data={chartData}
            innerRadius='20%'
            outerRadius='90%'
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type='number' domain={[0, 100]} tick={false} />
            <RadialBar dataKey='value' background={{ fill: '#f5f5f4' }} cornerRadius={8} />
            <Legend
              iconSize={10}
              layout='vertical'
              verticalAlign='middle'
              align='right'
              formatter={(value: string, entry: any) => (
                <span style={{ color: entry.payload.fill, fontSize: '11px' }}>
                  {value}: {entry.payload.value}%
                </span>
              )}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Completamento']}
                />
              }
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
