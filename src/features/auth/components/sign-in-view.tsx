'use client';
import { buttonVariants } from '@/components/ui/button';
import { GitHubStarsButton } from '@/components/github-stars-button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { InteractiveGridPattern } from './interactive-grid';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  const router = useRouter();

  const handleDemoLogin = () => {
    // Demo mode: redirect diretto senza auth
    router.push('/dashboard/overview');
  };

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          MediAnalytics Pro
        </div>
        <InteractiveGridPattern
          className={cn(
            'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[0%] h-full skew-y-12'
          )}
        />
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Dashboard professionale per centri fisioterapia e benessere. Gestisci pazienti,
              appuntamenti e fatturazione in un unico posto.&rdquo;
            </p>
            <footer className='text-sm'>MediAnalytics Team</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <GitHubStarsButton
            owner='Mavqo'
            repo='medianalytics-pro'
            showRepo
            variant='outline'
            size='default'
          />

          {/* Demo Login Form */}
          <div className='w-full space-y-4'>
            <div className='space-y-2 text-center'>
              <h1 className='text-2xl font-bold'>Welcome back</h1>
              <p className='text-muted-foreground text-sm'>Demo mode - click below to enter</p>
            </div>
            <div className='space-y-4'>
              <Input
                type='email'
                placeholder='demo@medianalytics.pro'
                defaultValue='demo@medianalytics.pro'
                disabled
              />
              <Input type='password' placeholder='••••••••' defaultValue='password' disabled />
              <Button onClick={handleDemoLogin} className='w-full'>
                Enter Demo Mode
              </Button>
            </div>
          </div>

          <div className='text-muted-foreground space-y-2 px-8 text-center text-xs'>
            <p>
              This is a{' '}
              <Link href='/about' className='hover:text-primary underline underline-offset-4'>
                demo dashboard
              </Link>{' '}
              for healthcare professionals.
            </p>
            <p>
              <Link
                href='https://github.com/Mavqo/medianalytics-pro'
                target='_blank'
                className='hover:text-primary underline underline-offset-4'
              >
                View on GitHub
              </Link>
            </p>
          </div>

          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms-of-service'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy-policy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
