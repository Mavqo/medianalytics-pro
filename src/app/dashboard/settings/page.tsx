import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { SettingsForm } from '@/features/settings/components/settings-form';

export const metadata: Metadata = {
  title: 'Impostazioni | MediAnalytics Pro',
  description: 'Impostazioni account e applicazione'
};

export default function SettingsPage() {
  return (
    <PageContainer>
      <SettingsForm />
    </PageContainer>
  );
}
