import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { TreatmentsCatalog } from '@/features/treatments/components/treatments-catalog';

export const metadata: Metadata = {
  title: 'Trattamenti | MediAnalytics Pro',
  description: 'Catalogo trattamenti e servizi'
};

export default function TreatmentsPage() {
  return (
    <PageContainer>
      <TreatmentsCatalog />
    </PageContainer>
  );
}
