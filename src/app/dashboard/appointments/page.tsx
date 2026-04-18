import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { AppointmentsTable } from '@/features/appointments/components/appointments-table';

export const metadata: Metadata = {
  title: 'Appointments | MediAnalytics Pro',
  description: 'Appointment schedule and bookings'
};

export default function AppointmentsPage() {
  return (
    <PageContainer>
      <AppointmentsTable />
    </PageContainer>
  );
}
