import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Demo mode: bypass auth check
  // In produzione con Clerk: decommentare le righe sotto
  // import { auth } from '@clerk/nextjs/server';
  // const { userId } = await auth();
  // if (!userId) return redirect('/auth/sign-in');

  redirect('/dashboard/overview');
}
