import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { SettingsForm } from '@/features/settings/components/settings-form';

export const metadata: Metadata = {
  title: 'Settings | MediAnalytics Pro',
  description: 'Account and application settings'
};

export default function SettingsPage() {
  return (
    <PageContainer>
      <SettingsForm />
    </PageContainer>
  );
}
