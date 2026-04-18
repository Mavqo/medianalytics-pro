import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { TreatmentsCatalog } from '@/features/treatments/components/treatments-catalog';

export const metadata: Metadata = {
  title: 'Treatments | MediAnalytics Pro',
  description: 'Treatments and services catalog'
};

export default function TreatmentsPage() {
  return (
    <PageContainer>
      <TreatmentsCatalog />
    </PageContainer>
  );
}
