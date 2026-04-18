import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { InventoryTable } from '@/features/inventory/components/inventory-table';

export const metadata: Metadata = {
  title: 'Inventario | MediAnalytics Pro',
  description: 'Gestione inventario e materiali'
};

export default function InventoryPage() {
  return (
    <PageContainer>
      <InventoryTable />
    </PageContainer>
  );
}
