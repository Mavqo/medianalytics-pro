'use client';

import { Pie, PieChart, Cell, Legend } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { patients } from '@/lib/data/patients';

// Calculate age distribution from patients data
const calculateAgeDistribution = () => {
  const ranges = [
    { range: '18-30', min: 18, max: 30, count: 0 },
    { range: '31-40', min: 31, max: 40, count: 0 },
    { range: '41-50', min: 41, max: 50, count: 0 },
    { range: '51-60', min: 51, max: 60, count: 0 },
    { range: '60+', min: 60, max: 200, count: 0 }
  ];

  patients.forEach((patient) => {
    const age = patient.età;
    const range = ranges.find((r) => age >= r.min && age <= r.max);
    if (range) range.count++;
  });

  return ranges.map((r) => ({
    name: r.range,
    value: r.count,
    label: `${r.range} anni`
  }));
};

const chartData = calculateAgeDistribution();

// MediAnalytics color palette
const COLORS = [
  '#14b8a6', // Teal 500
  '#0d9488', // Teal 600
  '#f97316', // Orange 500
  '#fb923c', // Orange 400
  '#78716c' // Stone 500
];

const chartConfig = {
  value: {
    label: 'Pazienti'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalPatients = patients.length;
  const topGroup = chartData.reduce((max, curr) => (curr.value > max.value ? curr : max));

  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='flex items-center gap-2'>
          Distribuzione Pazienti
          <Badge variant='outline' className='gap-1 border-primary text-primary'>
            <Icons.users className='h-3 w-3' />
            {totalPatients}
          </Badge>
        </CardTitle>
        <CardDescription>Per fascia età - Gruppo principale: {topGroup.name}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[300px] min-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => {
                    const numValue = Number(value);
                    const percentage = ((numValue / totalPatients) * 100).toFixed(1);
                    return [`${numValue} pazienti (${percentage}%)`, props?.payload?.name];
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              cornerRadius={6}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign='bottom'
              height={36}
              iconType='circle'
              formatter={(value: string, entry: any) => (
                <span style={{ color: entry.color, fontSize: '12px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
