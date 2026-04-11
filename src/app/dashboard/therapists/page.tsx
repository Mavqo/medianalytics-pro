import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terapeuti | MediAnalytics Pro',
  description: 'Gestione terapeuti e staff'
};

export default function TherapistsPage() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Terapeuti</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sezione in sviluppo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              La gestione dei terapeuti sarà disponibile nella prossima versione.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
