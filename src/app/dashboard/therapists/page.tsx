import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { TherapistsGrid } from '@/features/therapists/components/therapists-grid';

export const metadata: Metadata = {
  title: 'Terapeuti | MediAnalytics Pro',
  description: 'Gestione staff clinico'
};

export default function TherapistsPage() {
  return (
    <PageContainer>
      <TherapistsGrid />
    </PageContainer>
  );
}
