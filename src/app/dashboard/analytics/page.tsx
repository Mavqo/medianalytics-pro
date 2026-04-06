import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics | MediAnalytics Pro',
  description: 'Analisi avanzate e reportistica'
};

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
        </div>

        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Tasso Conversione</CardDescription>
              <CardTitle className='text-2xl'>78.5%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-green-600'>+2.3% vs mese scorso</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Media Visite/Paziente</CardDescription>
              <CardTitle className='text-2xl'>8.3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-green-600'>+0.5 vs mese scorso</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Retention Rate</CardDescription>
              <CardTitle className='text-2xl'>85.2%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-green-600'>+1.2% vs mese scorso</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>No Show Rate</CardDescription>
              <CardTitle className='text-2xl'>4.8%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-green-600'>-0.5% vs mese scorso</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Fatturato per Mese</CardTitle>
              <CardDescription>Andamento ultimi 12 mesi</CardDescription>
            </CardHeader>
            <CardContent className='h-64 flex items-center justify-center text-muted-foreground'>
              [Grafico Fatturato Mensile]
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Visite per Terapeuta</CardTitle>
              <CardDescription>Performance team</CardDescription>
            </CardHeader>
            <CardContent className='h-64 flex items-center justify-center text-muted-foreground'>
              [Grafico Visite Terapeuta]
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Distribuzione Età Pazienti</CardTitle>
              <CardDescription>Per fascia età</CardDescription>
            </CardHeader>
            <CardContent className='h-64 flex items-center justify-center text-muted-foreground'>
              [Grafico Donut Distribuzione Età]
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fatturato per Terapeuta</CardTitle>
              <CardDescription>Top performer</CardDescription>
            </CardHeader>
            <CardContent className='h-64 flex items-center justify-center text-muted-foreground'>
              [Grafico Fatturato Terapeuta]
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
