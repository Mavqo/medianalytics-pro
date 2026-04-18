'use client';

import { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/page-container';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { patients, Patient } from '@/lib/data/patients';
import { ExportMenu } from '@/components/ui/export-menu';
import { useT } from '@/lib/i18n/store';

// Status badge component
const StatusBadge = ({ status }: { status: Patient['stato'] }) => {
  const tr = useT();
  const variants = {
    attivo: 'bg-primary-100 text-primary-700 hover:bg-primary-100',
    completato: 'bg-success-100 text-success-700 hover:bg-success-100',
    'in attesa': 'bg-warning-100 text-warning-700 hover:bg-warning-100'
  };

  const labels: Record<Patient['stato'], string> = {
    attivo: tr.common.active,
    completato: tr.pazienti.completed,
    'in attesa': tr.pazienti.waiting
  };

  const icons = {
    attivo: <Icons.check className='h-3 w-3 mr-1' />,
    completato: <Icons.circleCheck className='h-3 w-3 mr-1' />,
    'in attesa': <Icons.clock className='h-3 w-3 mr-1' />
  };

  return (
    <Badge variant='outline' className={variants[status]}>
      {icons[status]}
      {labels[status]}
    </Badge>
  );
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(value);
};

// Format date
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function PazientiPage() {
  const tr = useT();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [treatmentFilter, setTreatmentFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newPatientOpen, setNewPatientOpen] = useState(false);

  // Get unique treatment types
  const treatmentTypes = useMemo(() => {
    const types = new Set(patients.map((p) => p.tipoTrattamento));
    return Array.from(types).sort();
  }, []);

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || patient.stato === statusFilter;
      const matchesTreatment =
        treatmentFilter === 'all' || patient.tipoTrattamento === treatmentFilter;

      return matchesSearch && matchesStatus && matchesTreatment;
    });
  }, [searchTerm, statusFilter, treatmentFilter]);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, treatmentFilter]);

  // Calculate paginated patients
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredPatients.slice(start, start + rowsPerPage);
  }, [filteredPatients, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);

  // Export data preparation
  const exportData = useMemo(() => {
    return filteredPatients.map((p) => ({
      ID: p.id,
      Nome: `${p.nome} ${p.cognome}`,
      Email: p.email,
      Telefono: p.telefono,
      Età: p.età,
      Trattamento: p.tipoTrattamento,
      'Ultima Visita': p.ultimaVisita ? formatDate(p.ultimaVisita) : '-',
      'Prossima Visita': p.prossimaVisita ? formatDate(p.prossimaVisita) : '-',
      Stato: p.stato,
      'Spesa Totale': formatCurrency(p.spesaTotale)
    }));
  }, [filteredPatients]);

  const csvHeaders = [
    'ID',
    'Nome',
    'Email',
    'Telefono',
    'Età',
    'Trattamento',
    'Ultima Visita',
    'Prossima Visita',
    'Stato',
    'Spesa Totale'
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-secondary-900'>
              {tr.pazienti.manage}
            </h2>
            <p className='text-muted-foreground'>
              {filteredPatients.length} {tr.pazienti.foundOf} {patients.length} {tr.pazienti.total2}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <ExportMenu data={exportData} filename='pazienti-medianalytics' headers={csvHeaders} />
            <NewPatientDialog
              open={newPatientOpen}
              onOpenChange={setNewPatientOpen}
              treatmentTypes={treatmentTypes}
            />
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className='p-4'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className='relative flex-1'>
                <Icons.search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder={tr.pazienti.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-9'
                />
              </div>
              <div className='flex gap-2'>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder={tr.common.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>{tr.pazienti.allStatus}</SelectItem>
                    <SelectItem value='attivo'>{tr.common.active}</SelectItem>
                    <SelectItem value='completato'>{tr.pazienti.completed}</SelectItem>
                    <SelectItem value='in attesa'>{tr.pazienti.waiting}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder={tr.pazienti.treatment} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>{tr.pazienti.allTreatments}</SelectItem>
                    {treatmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardHeader className='pb-0'>
            <CardTitle className='text-lg'>{tr.pazienti.list}</CardTitle>
            <CardDescription>{tr.pazienti.listDesc}</CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-secondary-50 hover:bg-secondary-50'>
                    <TableHead className='font-semibold'>{tr.pazienti.patient}</TableHead>
                    <TableHead className='font-semibold'>{tr.pazienti.age}</TableHead>
                    <TableHead className='font-semibold'>{tr.pazienti.treatment}</TableHead>
                    <TableHead className='font-semibold'>{tr.pazienti.lastVisit}</TableHead>
                    <TableHead className='font-semibold'>{tr.common.status}</TableHead>
                    <TableHead className='font-semibold text-right'>
                      {tr.pazienti.totalSpend}
                    </TableHead>
                    <TableHead className='w-[50px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className='text-center py-8 text-muted-foreground'>
                        <Icons.search className='h-8 w-8 mx-auto mb-2 opacity-50' />
                        {tr.pazienti.noResults}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedPatients.map((patient) => (
                      <TableRow key={patient.id} className='hover:bg-secondary-50'>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <div className='h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center'>
                              <span className='text-sm font-medium text-primary-700'>
                                {patient.nome[0]}
                                {patient.cognome[0]}
                              </span>
                            </div>
                            <div>
                              <p className='font-medium text-secondary-900'>
                                {patient.nome} {patient.cognome}
                              </p>
                              <p className='text-xs text-muted-foreground'>{patient.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {patient.età} {tr.pazienti.yearsOld}
                        </TableCell>
                        <TableCell>
                          <span className='text-sm'>{patient.tipoTrattamento}</span>
                        </TableCell>
                        <TableCell>
                          {patient.ultimaVisita ? (
                            <div className='flex items-center gap-1'>
                              <Icons.calendar className='h-3 w-3 text-muted-foreground' />
                              {formatDate(patient.ultimaVisita)}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={patient.stato} />
                        </TableCell>
                        <TableCell className='text-right font-medium'>
                          {formatCurrency(patient.spesaTotale)}
                        </TableCell>
                        <TableCell>
                          <Button variant='ghost' size='icon' className='h-8 w-8'>
                            <Icons.ellipsis className='h-4 w-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredPatients.length > 0 && (
              <div className='flex items-center justify-between px-6 py-4 border-t border-secondary-100'>
                <div className='text-sm text-muted-foreground'>
                  {tr.common.showing} {(currentPage - 1) * rowsPerPage + 1}-
                  {Math.min(currentPage * rowsPerPage, filteredPatients.length)} {tr.common.of}{' '}
                  {filteredPatients.length} {tr.pazienti.patientsUnit}
                </div>
                <div className='flex items-center gap-4'>
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(v) => {
                      setRowsPerPage(Number(v));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className='w-[70px]'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='10'>10</SelectItem>
                      <SelectItem value='25'>25</SelectItem>
                      <SelectItem value='50'>50</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className='flex items-center gap-1'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >
                      {tr.common.first}
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      {tr.common.previous}
                    </Button>
                    <span className='px-3 py-1 text-sm'>
                      {tr.common.page} {currentPage} {tr.common.of} {totalPages}
                    </span>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      {tr.common.next}
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage >= totalPages}
                    >
                      {tr.common.last}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{tr.pazienti.activePatients}</p>
                  <p className='text-2xl font-bold text-primary'>
                    {patients.filter((p) => p.stato === 'attivo').length}
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center'>
                  <Icons.users className='h-5 w-5 text-primary' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{tr.pazienti.completedTherapies}</p>
                  <p className='text-2xl font-bold text-success'>
                    {patients.filter((p) => p.stato === 'completato').length}
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-success-100 flex items-center justify-center'>
                  <Icons.circleCheck className='h-5 w-5 text-success' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{tr.pazienti.waitingLabel}</p>
                  <p className='text-2xl font-bold text-warning'>
                    {patients.filter((p) => p.stato === 'in attesa').length}
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center'>
                  <Icons.clock className='h-5 w-5 text-warning' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{tr.pazienti.totalRevenue}</p>
                  <p className='text-2xl font-bold text-secondary-900'>
                    {formatCurrency(patients.reduce((acc, p) => acc + p.spesaTotale, 0))}
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center'>
                  <Icons.creditCard className='h-5 w-5 text-accent-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

function NewPatientDialog({
  open,
  onOpenChange,
  treatmentTypes
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  treatmentTypes: string[];
}) {
  const tr = useT();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='gap-2 bg-primary hover:bg-primary-700'>
          <Icons.plus className='h-4 w-4' />
          {tr.pazienti.newPatient}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[560px]'>
        <DialogHeader>
          <DialogTitle>{tr.pazienti.newPatient}</DialogTitle>
          <DialogDescription>{tr.pazienti.newPatientDesc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
          <div>
            <Label className='mb-1.5 block'>{tr.common.name}</Label>
            <Input placeholder='Mario' />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.common.surname}</Label>
            <Input placeholder='Rossi' />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.pazienti.dateOfBirth}</Label>
            <Input type='date' />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.pazienti.fiscalCode}</Label>
            <Input placeholder='RSSMRA85M01H501Z' />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.common.email}</Label>
            <Input type='email' placeholder='mario.rossi@email.it' />
          </div>
          <div>
            <Label className='mb-1.5 block'>{tr.common.phone}</Label>
            <Input type='tel' placeholder='+39 333 123 4567' />
          </div>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>{tr.pazienti.treatmentType}</Label>
            <Select defaultValue={treatmentTypes[0]}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {treatmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='md:col-span-2'>
            <Label className='mb-1.5 block'>{tr.pazienti.clinicalNotes}</Label>
            <Textarea placeholder={tr.pazienti.clinicalNotesPh} rows={3} />
          </div>
          <DialogFooter className='md:col-span-2'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              {tr.common.cancel}
            </Button>
            <Button type='submit' className='bg-primary hover:bg-primary-700'>
              {tr.pazienti.registerPatient}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
