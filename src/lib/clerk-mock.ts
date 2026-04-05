// Mock per Clerk - versione demo senza autenticazione
export const auth = async () => ({ userId: 'demo-user' });
export const currentUser = async () => ({
  id: 'demo-user',
  fullName: 'Demo User',
  emailAddresses: [{ emailAddress: 'demo@medianalytics.pro' }]
});
