'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileViewPage() {
  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader>
          <CardTitle>Profilo Demo</CardTitle>
          <CardDescription>Modalità demo - autenticazione disabilitata</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Utente: Demo User</p>
          <p>Email: demo@medianalytics.pro</p>
        </CardContent>
      </Card>
    </div>
  );
}
