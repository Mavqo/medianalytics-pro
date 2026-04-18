import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { AnalyticsDashboard } from '@/features/analytics/components/analytics-dashboard';

export const metadata: Metadata = {
  title: 'Analytics | MediAnalytics Pro',
  description: 'Advanced analytics and reporting'
};

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <AnalyticsDashboard />
    </PageContainer>
  );
}
