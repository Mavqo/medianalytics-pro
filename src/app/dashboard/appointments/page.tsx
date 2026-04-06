import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appuntamenti | MediAnalytics Pro',
  description: 'Calendario appuntamenti e gestione agenda'
};

const mockAppointments = [
  {
    id: '1',
    patient: 'Mario Rossi',
    date: '06/04/2025',
    time: '09:00',
    therapy: 'Fisioterapia',
    therapist: 'Dr. Martini',
    status: 'confermato',
    cost: 75
  },
  {
    id: '2',
    patient: 'Anna Bianchi',
    date: '06/04/2025',
    time: '10:30',
    therapy: 'Riabilitazione',
    therapist: 'Dott.ssa Ferretti',
    status: 'completato',
    cost: 85
  },
  {
    id: '3',
    patient: 'Luigi Verdi',
    date: '06/04/2025',
    time: '14:00',
    therapy: 'Massaggio',
    therapist: 'Dr. Lombardi',
    status: 'in attesa',
    cost: 65
  },
  {
    id: '4',
    patient: 'Giulia Neri',
    date: '07/04/2025',
    time: '09:30',
    therapy: 'Fisioterapia',
    therapist: 'Dott.ssa Marchetti',
    status: 'confermato',
    cost: 75
  },
  {
    id: '5',
    patient: 'Paolo Gialli',
    date: '07/04/2025',
    time: '11:00',
    therapy: 'Riabilitazione',
    therapist: 'Dr. Martini',
    status: 'cancellato',
    cost: 0
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    confermato: 'bg-green-100 text-green-700',
    completato: 'bg-blue-100 text-blue-700',
    'in attesa': 'bg-orange-100 text-orange-700',
    cancellato: 'bg-red-100 text-red-700'
  };
  return (
    <Badge variant='outline' className={colors[status] || 'bg-gray-100'}>
      {status}
    </Badge>
  );
};

export default function AppointmentsPage() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Appuntamenti</h1>
          <Button>
            <Icons.plus className='mr-2 h-4 w-4' />
            Nuovo Appuntamento
          </Button>
        </div>

        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Oggi</CardDescription>
              <CardTitle className='text-2xl'>3</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Questa Settimana</CardDescription>
              <CardTitle className='text-2xl'>18</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Completati</CardDescription>
              <CardTitle className='text-2xl'>12</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Fatturato</CardDescription>
              <CardTitle className='text-2xl'>1.245 €</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Lista Appuntamenti</CardTitle>
                <CardDescription>Gestisci gli appuntamenti del centro</CardDescription>
              </div>
              <Input placeholder='Cerca paziente...' className='w-64' />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paziente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ora</TableHead>
                  <TableHead>Trattamento</TableHead>
                  <TableHead>Terapeuta</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Costo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className='font-medium'>{apt.patient}</TableCell>
                    <TableCell>{apt.date}</TableCell>
                    <TableCell>{apt.time}</TableCell>
                    <TableCell>{apt.therapy}</TableCell>
                    <TableCell>{apt.therapist}</TableCell>
                    <TableCell>
                      <StatusBadge status={apt.status} />
                    </TableCell>
                    <TableCell>{apt.cost > 0 ? `${apt.cost} €` : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
