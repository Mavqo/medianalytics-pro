import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { AppointmentsTable } from '@/features/appointments/components/appointments-table';

export const metadata: Metadata = {
  title: 'Appuntamenti | MediAnalytics Pro',
  description: 'Agenda appuntamenti e prenotazioni'
};

export default function AppointmentsPage() {
  return (
    <PageContainer>
      <AppointmentsTable />
    </PageContainer>
  );
}
