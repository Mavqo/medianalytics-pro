import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { BillingPanel } from '@/features/billing/components/billing-panel';

export const metadata: Metadata = {
  title: 'Billing | MediAnalytics Pro',
  description: 'Invoices, payments and active plan'
};

export default function BillingPage() {
  return (
    <PageContainer>
      <BillingPanel />
    </PageContainer>
  );
}
