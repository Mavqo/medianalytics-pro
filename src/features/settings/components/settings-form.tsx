'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Building2, CreditCard, Save, Shield, User } from 'lucide-react';
import { useT } from '@/lib/i18n/store';

export function SettingsForm() {
  const t = useT();
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t.settings.title}</h1>
        <p className='text-sm text-muted-foreground'>{t.settings.manageSubtitle}</p>
      </div>

      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 md:grid-cols-5'>
          <TabsTrigger value='account' className='gap-2'>
            <User className='h-4 w-4' /> {t.settings.tabAccount}
          </TabsTrigger>
          <TabsTrigger value='clinica' className='gap-2'>
            <Building2 className='h-4 w-4' /> {t.settings.tabClinic}
          </TabsTrigger>
          <TabsTrigger value='notifiche' className='gap-2'>
            <Bell className='h-4 w-4' /> {t.settings.tabNotifications}
          </TabsTrigger>
          <TabsTrigger value='fatturazione' className='gap-2'>
            <CreditCard className='h-4 w-4' /> {t.settings.tabBilling}
          </TabsTrigger>
          <TabsTrigger value='sicurezza' className='gap-2'>
            <Shield className='h-4 w-4' /> {t.settings.tabSecurity}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.personalProfile}</CardTitle>
              <CardDescription>{t.settings.personalProfileDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className='grid gap-4 md:grid-cols-2'>
                <Field label={t.common.name} defaultValue='Marco' />
                <Field label={t.common.surname} defaultValue='Ricci' />
                <Field label={t.common.email} type='email' defaultValue='marco.ricci@clinica.it' />
                <Field label={t.common.phone} defaultValue='+39 091 234 5678' />
                <div className='md:col-span-2'>
                  <Label className='mb-1.5 block'>{t.settings.role}</Label>
                  <Select defaultValue='admin'>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='admin'>{t.settings.admin}</SelectItem>
                      <SelectItem value='medico'>{t.settings.doctor}</SelectItem>
                      <SelectItem value='staff'>{t.settings.staff}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='md:col-span-2'>
                  <Label className='mb-1.5 block'>{t.settings.bio}</Label>
                  <Textarea defaultValue='Direttore clinico con 15 anni di esperienza in fisioterapia.' />
                </div>
                <div className='md:col-span-2 flex items-center gap-3'>
                  <Button type='submit' className='gap-2'>
                    <Save className='h-4 w-4' /> {t.settings.saveChanges}
                  </Button>
                  {saved && <span className='text-sm text-emerald-600'>{t.settings.saved}</span>}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='clinica'>
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.clinicData}</CardTitle>
              <CardDescription>{t.settings.clinicDataDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className='grid gap-4 md:grid-cols-2'>
                <Field
                  label={t.settings.businessName}
                  defaultValue='Centro Fisioterapico Palermo SRL'
                />
                <Field label={t.settings.vatShort} defaultValue='IT 01234567890' />
                <Field label={t.settings.address} defaultValue='Via Roma 123' />
                <Field label={t.settings.city} defaultValue='Palermo' />
                <Field label={t.settings.zip} defaultValue='90133' />
                <Field label={t.settings.clinicPhone} defaultValue='+39 091 555 0000' />
                <Field label={t.settings.opening} type='time' defaultValue='08:00' />
                <Field label={t.settings.closing} type='time' defaultValue='20:00' />
                <div className='md:col-span-2'>
                  <Button type='submit' className='gap-2'>
                    <Save className='h-4 w-4' /> {t.common.save}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='notifiche'>
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.notifPrefs}</CardTitle>
              <CardDescription>{t.settings.notifPrefsDesc}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-1'>
              <ToggleRow
                title='Promemoria appuntamenti'
                desc='Email e SMS ai pazienti 24h prima della seduta'
                defaultChecked
              />
              <Separator />
              <ToggleRow
                title='Alert stock basso'
                desc='Notifica quando un articolo scende sotto la soglia'
                defaultChecked
              />
              <Separator />
              <ToggleRow
                title='Report settimanale'
                desc='Ogni lunedì via email con KPI e fatturato'
                defaultChecked
              />
              <Separator />
              <ToggleRow
                title='Nuove recensioni'
                desc='Notifica push ogni volta che un paziente lascia feedback'
              />
              <Separator />
              <ToggleRow
                title='Aggiornamenti prodotto'
                desc='Novità e release note di MediAnalytics'
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='fatturazione'>
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.planBilling}</CardTitle>
              <CardDescription>{t.settings.planBillingDesc}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <div className='font-semibold'>{t.billing.planPro}</div>
                  <div className='text-sm text-muted-foreground'>
                    €49/mese · fatturazione annuale
                  </div>
                </div>
                <Button variant='outline'>{t.billing.changePlan}</Button>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <div className='font-semibold'>Visa •••• 4242</div>
                  <div className='text-sm text-muted-foreground'>{t.billing.expiry} 08/2028</div>
                </div>
                <Button variant='outline'>{t.billing.update}</Button>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <div className='font-semibold'>{t.settings.nextRenewal}</div>
                  <div className='text-sm text-muted-foreground'>15/05/2026 · €588</div>
                </div>
                <Button variant='ghost'>{t.billing.invoices}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='sicurezza'>
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.accountSecurity}</CardTitle>
              <CardDescription>{t.settings.accountSecurityDesc}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <form onSubmit={handleSave} className='grid gap-4 md:grid-cols-2'>
                <Field label={t.settings.currentPassword} type='password' />
                <div />
                <Field label={t.settings.newPassword} type='password' />
                <Field label={t.settings.confirmPassword} type='password' />
                <div className='md:col-span-2'>
                  <Button type='submit' variant='outline' className='gap-2'>
                    <Save className='h-4 w-4' /> {t.settings.updatePassword}
                  </Button>
                </div>
              </form>
              <Separator />
              <ToggleRow
                title='Autenticazione a 2 fattori'
                desc='Richiedi un codice via app authenticator al login'
                defaultChecked
              />
              <Separator />
              <ToggleRow
                title='Avviso login sospetti'
                desc='Email quando il login arriva da un dispositivo nuovo'
                defaultChecked
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({
  label,
  type = 'text',
  defaultValue
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label className='mb-1.5 block'>{label}</Label>
      <Input type={type} defaultValue={defaultValue} />
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  defaultChecked
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className='flex items-center justify-between py-3'>
      <div>
        <div className='text-sm font-medium'>{title}</div>
        <div className='text-xs text-muted-foreground'>{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
