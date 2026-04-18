'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { RadialBarGraph } from './radial-bar-graph';
import { RecentSales } from './recent-sales';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import {
  kpiPrincipali,
  statisticheGiornaliere,
  getTotalVisits,
  metricheRetention
} from '@/lib/data/analytics';
import { getActivePatients, patients } from '@/lib/data/patients';
import { useT } from '@/lib/i18n/store';

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(value);
};

export default function OverViewPage() {
  const t = useT();
  const activePatients = getActivePatients();
  const totalVisits = getTotalVisits();
  const obiettivoRaggiunto = kpiPrincipali.percentualeObiettivo >= 100;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-secondary-900'>
              {t.overview.pageTitle}
            </h2>
            <p className='text-muted-foreground'>{t.overview.welcome}</p>
          </div>
          <div className='hidden items-center gap-2 md:flex'>
            <Button variant='outline' className='gap-2'>
              <Icons.calendar className='h-4 w-4' />
              {t.overview.monthButton}
            </Button>
            <Button className='gap-2 bg-primary hover:bg-primary-700'>
              <Icons.arrowRight className='h-4 w-4' />
              {t.overview.newAppointment}
            </Button>
          </div>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>{t.overview.tabOverview}</TabsTrigger>
            <TabsTrigger value='analytics'>{t.overview.tabAnalytics}</TabsTrigger>
            <TabsTrigger value='reports'>{t.overview.tabReports}</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            {/* KPI Cards */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Fatturato Card */}
              <Card className='border-l-4 border-l-primary'>
                <CardHeader className='pb-2'>
                  <CardDescription className='text-secondary-600'>
                    {t.overview.revenueMonthly}
                  </CardDescription>
                  <CardTitle className='text-2xl font-bold text-secondary-900'>
                    {formatCurrency(kpiPrincipali.fatturatoMeseCorrente)}
                  </CardTitle>
                  <CardAction>
                    <Badge
                      variant={kpiPrincipali.variazioneFatturato >= 0 ? 'default' : 'destructive'}
                      className={kpiPrincipali.variazioneFatturato >= 0 ? 'bg-primary' : ''}
                    >
                      {kpiPrincipali.variazioneFatturato >= 0 ? (
                        <Icons.trendingUp className='mr-1 h-3 w-3' />
                      ) : (
                        <Icons.trendingDown className='mr-1 h-3 w-3' />
                      )}
                      {kpiPrincipali.variazioneFatturato >= 0 ? '+' : ''}
                      {kpiPrincipali.variazioneFatturato}%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='pt-0'>
                  <p className='text-xs text-muted-foreground'>
                    {t.overview.vsPrevMonth} {formatCurrency(kpiPrincipali.fatturatoMesePrecedente)}
                  </p>
                </CardFooter>
              </Card>

              {/* Pazienti Attivi Card */}
              <Card className='border-l-4 border-l-primary'>
                <CardHeader className='pb-2'>
                  <CardDescription className='text-secondary-600'>
                    {t.overview.activePatients}
                  </CardDescription>
                  <CardTitle className='text-2xl font-bold text-secondary-900'>
                    {activePatients.length}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='border-primary text-primary'>
                      <Icons.users className='mr-1 h-3 w-3' />
                      {patients.length} {t.overview.totalsSuffix}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='pt-0'>
                  <p className='text-xs text-muted-foreground'>
                    {statisticheGiornaliere.pazientiNuoviQuestaSettimana} {t.overview.newThisWeek}
                  </p>
                </CardFooter>
              </Card>

              {/* Appuntamenti Card */}
              <Card className='border-l-4 border-l-accent'>
                <CardHeader className='pb-2'>
                  <CardDescription className='text-secondary-600'>
                    {t.overview.appointmentsToday}
                  </CardDescription>
                  <CardTitle className='text-2xl font-bold text-secondary-900'>
                    {statisticheGiornaliere.appuntamentiOggi}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline' className='border-accent text-accent-600'>
                      <Icons.calendar className='mr-1 h-3 w-3' />+
                      {statisticheGiornaliere.appuntamentiDomani} {t.overview.tomorrow}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='pt-0'>
                  <p className='text-xs text-muted-foreground'>
                    {t.overview.completionRate}: {statisticheGiornaliere.tassoCompletamento}%
                  </p>
                </CardFooter>
              </Card>

              {/* Tasso Retention Card */}
              <Card className='border-l-4 border-l-accent'>
                <CardHeader className='pb-2'>
                  <CardDescription className='text-secondary-600'>
                    {t.overview.retentionRate}
                  </CardDescription>
                  <CardTitle className='text-2xl font-bold text-secondary-900'>
                    {metricheRetention.tassoRetention}%
                  </CardTitle>
                  <CardAction>
                    <Badge
                      variant={obiettivoRaggiunto ? 'default' : 'outline'}
                      className={
                        obiettivoRaggiunto ? 'bg-primary' : 'border-accent text-accent-600'
                      }
                    >
                      <Icons.check className='mr-1 h-3 w-3' />
                      {metricheRetention.visiteMediePerPaziente} {t.overview.visitsPerPatient}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='pt-0'>
                  <p className='text-xs text-muted-foreground'>
                    {t.overview.lifetimeValue}:{' '}
                    {formatCurrency(metricheRetention.valoreLifetimeMedio)}
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <div className='col-span-4'>
                <BarGraph />
              </div>
              <div className='col-span-4 lg:col-span-3'>
                <RadialBarGraph />
              </div>
              <div className='col-span-4'>
                <AreaGraph />
              </div>
              <div className='col-span-4 lg:col-span-3'>
                <PieGraph />
              </div>
            </div>

            {/* Recent Activity */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card>
                <RecentSales />
              </Card>
              <Card className='p-6'>
                <h3 className='font-semibold mb-4'>{t.overview.upcomingAppointments}</h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 bg-secondary-50 rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center'>
                        <Icons.user className='h-5 w-5 text-primary' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Giuseppe Marino</p>
                        <p className='text-xs text-muted-foreground'>Riabilitazione spalla</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>09:30</p>
                      <p className='text-xs text-muted-foreground'>{t.overview.today}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-secondary-50 rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center'>
                        <Icons.user className='h-5 w-5 text-primary' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Valentina Ferrari</p>
                        <p className='text-xs text-muted-foreground'>Massaggio sportivo</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>18:00</p>
                      <p className='text-xs text-muted-foreground'>{t.overview.today}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-secondary-50 rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center'>
                        <Icons.user className='h-5 w-5 text-accent-600' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Giulia Bianchi</p>
                        <p className='text-xs text-muted-foreground'>Rieducazione sportiva</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>10:30</p>
                      <p className='text-xs text-muted-foreground'>{t.overview.tomorrow}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <AreaGraph />
              <BarGraph />
            </div>
          </TabsContent>

          <TabsContent value='reports' className='space-y-4'>
            <Card className='p-8'>
              <div className='text-center'>
                <Icons.file className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-semibold mb-2'>{t.overview.reportMonthly}</h3>
                <p className='text-muted-foreground mb-4'>{t.overview.reportDesc}</p>
                <Button className='gap-2'>
                  <Icons.arrowRight className='h-4 w-4' />
                  {t.overview.generateReport}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
