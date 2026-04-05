'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '../themes/active-theme';
import QueryProvider from './query-provider';

// Mock Clerk Provider per demo senza auth
// In produzione, sostituire con vero ClerkProvider

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <QueryProvider>{children}</QueryProvider>
      </ActiveThemeProvider>
    </>
  );
}

// Mock hooks per Clerk
export const useUser = () => ({
  isSignedIn: true,
  user: {
    id: 'demo-user',
    fullName: 'Demo User',
    primaryEmailAddress: { emailAddress: 'demo@medianalytics.pro' },
    imageUrl: null
  }
});

export const useAuth = () => ({
  isLoaded: true,
  userId: 'demo-user',
  sessionId: 'demo-session',
  getToken: async () => 'demo-token'
});
