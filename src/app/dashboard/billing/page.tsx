import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { BillingPanel } from '@/features/billing/components/billing-panel';

export const metadata: Metadata = {
  title: 'Fatturazione | MediAnalytics Pro',
  description: 'Fatture, pagamenti e piano attivo'
};

export default function BillingPage() {
  return (
    <PageContainer>
      <BillingPanel />
    </PageContainer>
  );
}
