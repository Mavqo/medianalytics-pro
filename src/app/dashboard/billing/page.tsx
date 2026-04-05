'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function BillingPage() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Fatturazione</h1>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Piano Attuale</CardDescription>
              <CardTitle className='text-2xl'>Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-muted-foreground'>€99/mese - Rinnovo il 15/05/2025</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Fatturato Mese</CardDescription>
              <CardTitle className='text-2xl'>€31.240</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-green-600 flex items-center'>
                <Icons.trendingUp className='mr-1 h-4 w-4' />
                +11.4% vs mese scorso
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Stato Pagamento</CardDescription>
              <CardTitle className='text-2xl text-green-600'>Attivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-muted-foreground'>Ultimo pagamento: 15/04/2025</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Metodo di Pagamento</CardTitle>
            <CardDescription>Gestisci le tue carte e fatture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-4 p-4 border rounded-lg'>
              <Icons.creditCard className='h-8 w-8 text-primary' />
              <div className='flex-1'>
                <p className='font-medium'>•••• •••• •••• 4242</p>
                <p className='text-sm text-muted-foreground'>Scadenza 12/26</p>
              </div>
              <Button variant='outline' size='sm'>
                Modifica
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
