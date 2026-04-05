'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { visitePerTipo } from '@/lib/data/analytics';

// Transform data for chart
const chartData = visitePerTipo.map((item) => ({
  tipo: item.tipo,
  visite: item.visite,
  fatturato: item.fatturato
}));

const chartConfig = {
  visite: {
    label: 'Visite',
    color: '#14b8a6' // Teal 500
  },
  fatturato: {
    label: 'Fatturato (€)',
    color: '#f97316' // Orange 500
  }
} satisfies ChartConfig;

export function BarGraph() {
  const totalVisits = chartData.reduce((acc, curr) => acc + curr.visite, 0);
  const topTreatment = chartData.reduce((max, curr) => (curr.visite > max.visite ? curr : max));

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          Visite per Tipo Trattamento
          <Badge variant='outline' className='gap-1 border-primary text-primary'>
            <Icons.trendingUp className='h-3 w-3' />
            {totalVisits} visite
          </Badge>
        </CardTitle>
        <CardDescription>
          Top: {topTreatment.tipo} ({topTreatment.visite} visite)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#e7e5e4' />
            <XAxis
              dataKey='tipo'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke='#78716c'
              fontSize={11}
              angle={-15}
              textAnchor='end'
              height={60}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke='#78716c'
              fontSize={12}
            />
            <ChartTooltip
              cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => [
                    name === 'fatturato' ? `€${Number(value).toLocaleString('it-IT')}` : value,
                    name === 'fatturato' ? 'Fatturato' : 'Visite'
                  ]}
                />
              }
            />
            <Bar dataKey='visite' fill='#14b8a6' radius={[6, 6, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
