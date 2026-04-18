'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { fatturatoMensile } from '@/lib/data/analytics';
import { useT } from '@/lib/i18n/store';

const chartData = fatturatoMensile.map((item) => ({
  month: item.mese,
  fatturato: item.fatturato,
  obiettivo: item.obiettivo
}));

export function AreaGraph() {
  const t = useT();

  const chartConfig = {
    fatturato: {
      label: t.analytics.cfgRevenue,
      color: '#14b8a6'
    },
    obiettivo: {
      label: t.analytics.cfgTarget,
      color: '#f97316'
    }
  } satisfies ChartConfig;

  const lastMonth = chartData[chartData.length - 1];
  const prevMonth = chartData[chartData.length - 2];
  const trend = ((lastMonth.fatturato - prevMonth.fatturato) / prevMonth.fatturato) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {t.overview.revenueMonthly}
          <Badge variant={trend >= 0 ? 'default' : 'destructive'} className='gap-1'>
            {trend >= 0 ? (
              <Icons.trendingUp className='h-3 w-3' />
            ) : (
              <Icons.trendingDown className='h-3 w-3' />
            )}
            {trend >= 0 ? '+' : ''}
            {trend.toFixed(1)}%
          </Badge>
        </CardTitle>
        <CardDescription>{t.overview.revenueTrendDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='fillFatturato' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#14b8a6' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#14b8a6' stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id='fillObiettivo' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#f97316' stopOpacity={0.1} />
                <stop offset='95%' stopColor='#f97316' stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#e7e5e4' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke='#78716c'
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke='#78716c'
              fontSize={12}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={{ stroke: '#14b8a6', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={
                <ChartTooltipContent
                  formatter={(value) => `€${Number(value).toLocaleString('it-IT')}`}
                />
              }
            />
            <Area
              dataKey='obiettivo'
              type='monotone'
              stroke='#f97316'
              strokeWidth={2}
              fill='url(#fillObiettivo)'
              strokeDasharray='5 5'
            />
            <Area
              dataKey='fatturato'
              type='monotone'
              stroke='#14b8a6'
              strokeWidth={2}
              fill='url(#fillFatturato)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
