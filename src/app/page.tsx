import { redirect } from 'next/navigation';

export default async function Page() {
  // Demo mode: redirect diretto alla dashboard
  // In produzione con Clerk: decommentare auth check

  redirect('/dashboard/overview');
}
