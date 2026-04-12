import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const salesData = [
  {
    name: 'Giulia Esposito',
    email: 'giulia.esposito@gmail.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    fallback: 'GE',
    amount: '+€1.850,00'
  },
  {
    name: 'Marco Ferretti',
    email: 'marco.ferretti@libero.it',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    fallback: 'MF',
    amount: '+€42,00'
  },
  {
    name: 'Chiara Romano',
    email: 'chiara.romano@gmail.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    fallback: 'CR',
    amount: '+€275,00'
  },
  {
    name: 'Luca Ricci',
    email: 'luca.ricci@outlook.it',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'LR',
    amount: '+€95,00'
  },
  {
    name: 'Sofia Conti',
    email: 'sofia.conti@gmail.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
    fallback: 'SC',
    amount: '+€38,00'
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Pagamenti Recenti</CardTitle>
        <CardDescription>42 pagamenti registrati questo mese.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {salesData.map((sale, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatar} alt='Avatar' />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{sale.name}</p>
                <p className='text-muted-foreground text-sm'>{sale.email}</p>
              </div>
              <div className='ml-auto font-medium'>{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
