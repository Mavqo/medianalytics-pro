'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useT } from '@/lib/i18n/store';

export default function ProfileViewPage() {
  const t = useT();
  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader>
          <CardTitle>{t.profile.title}</CardTitle>
          <CardDescription>{t.profile.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {t.profile.userLabel}: {t.profile.userValue}
          </p>
          <p>Email: demo@medianalytics.pro</p>
        </CardContent>
      </Card>
    </div>
  );
}
