import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { InventoryTable } from '@/features/inventory/components/inventory-table';

export const metadata: Metadata = {
  title: 'Inventory | MediAnalytics Pro',
  description: 'Inventory and materials management'
};

export default function InventoryPage() {
  return (
    <PageContainer>
      <InventoryTable />
    </PageContainer>
  );
}
