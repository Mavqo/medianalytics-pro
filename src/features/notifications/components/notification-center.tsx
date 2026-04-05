'use client';

import { Icons } from '@/components/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { NotificationCard } from '@/components/ui/notification-card';
import { useNotificationStore } from '../utils/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const MAX_VISIBLE = 5;

const actionRoutes: Record<string, string> = {
  view: '/dashboard/pazienti',
  billing: '/dashboard/billing',
  open: '/dashboard/appointments'
};

// Get icon based on notification priority and title
const getNotificationIcon = (title: string, priority?: string) => {
  if (title.includes('appuntamento') || title.includes('Appuntamento')) {
    return <Icons.calendar className='h-4 w-4 text-primary' />;
  }
  if (title.includes('recensione') || title.includes('Recensione')) {
    return <Icons.star className='h-4 w-4 text-warning' />;
  }
  if (title.includes('pagamento') || title.includes('Pagamento') || title.includes('acconto')) {
    return <Icons.creditCard className='h-4 w-4 text-success' />;
  }
  if (title.includes('obiettivo') || title.includes('Obiettivo') || title.includes('record')) {
    return <Icons.trophy className='h-4 w-4 text-accent-600' />;
  }
  if (title.includes('compleanno') || title.includes('Compleanno')) {
    return <Icons.gift className='h-4 w-4 text-primary' />;
  }
  if (title.includes('cancell') || title.includes('Scorta') || title.includes('bassa')) {
    return <Icons.warning className='h-4 w-4 text-error' />;
  }
  if (priority === 'high') {
    return <Icons.alertCircle className='h-4 w-4 text-error' />;
  }
  return <Icons.info className='h-4 w-4 text-primary' />;
};

export function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, unreadCount, getHighPriorityCount } =
    useNotificationStore();
  const router = useRouter();
  const count = unreadCount();
  const highPriorityCount = getHighPriorityCount();
  const visibleNotifications = notifications.slice(0, MAX_VISIBLE);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='icon' className='relative h-8 w-8'>
          <Icons.notification className='h-4 w-4' />
          {count > 0 && (
            <span
              className={cn(
                'absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium',
                highPriorityCount > 0 ? 'bg-error text-white' : 'bg-primary text-white'
              )}
            >
              {count > 9 ? '9+' : count}
            </span>
          )}
          <span className='sr-only'>Notifiche</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-[calc(100vw-2rem)] p-0 sm:w-[420px]' sideOffset={8}>
        <div className='flex items-center justify-between px-4 py-3'>
          <Link href='/dashboard/notifications' className='group flex items-center gap-1'>
            <h4 className='text-sm font-semibold group-hover:underline text-secondary-900'>
              Notifiche
            </h4>
            <Icons.chevronRight className='text-muted-foreground h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
          </Link>
          <div className='flex items-center gap-2'>
            {highPriorityCount > 0 && (
              <span className='bg-error-100 text-error rounded-full px-2 py-0.5 text-xs font-medium'>
                {highPriorityCount} urgenti
              </span>
            )}
            {count > 0 && (
              <span className='bg-primary-100 text-primary rounded-full px-2 py-0.5 text-xs'>
                {count} da leggere
              </span>
            )}
            {count > 0 && (
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground h-auto px-2 py-1 text-xs hover:text-primary hover:bg-primary-50'
                onClick={markAllAsRead}
              >
                Segna tutte come lette
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <ScrollArea className='h-[400px]'>
          {notifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <Icons.notification className='text-muted-foreground/40 mb-2 h-8 w-8' />
              <p className='text-muted-foreground text-sm'>Nessuna notifica</p>
            </div>
          ) : (
            <div className='flex flex-col gap-1 p-2'>
              {visibleNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-lg transition-colors',
                    notification.status === 'unread' ? 'bg-primary-50/50' : 'hover:bg-secondary-50',
                    notification.priority === 'high' &&
                      notification.status === 'unread' &&
                      'bg-error-50/50 border border-error-100'
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5',
                      notification.priority === 'high' ? 'text-error' : 'text-primary'
                    )}
                  >
                    {getNotificationIcon(notification.title, notification.priority)}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2'>
                      <p
                        className={cn(
                          'text-sm font-medium',
                          notification.status === 'unread'
                            ? 'text-secondary-900'
                            : 'text-secondary-700'
                        )}
                      >
                        {notification.title}
                      </p>
                      {notification.status === 'unread' && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className='text-xs text-primary hover:underline shrink-0'
                        >
                          Segna come letta
                        </button>
                      )}
                    </div>
                    <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>
                      {notification.body}
                    </p>
                    <p className='text-[10px] text-secondary-400 mt-1'>
                      {new Date(notification.createdAt).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {notification.actions && notification.actions.length > 0 && (
                      <div className='flex gap-2 mt-2'>
                        {notification.actions.map((action) => (
                          <Button
                            key={action.id}
                            size='sm'
                            variant={action.style === 'primary' ? 'default' : 'outline'}
                            className={cn(
                              'h-7 text-xs',
                              action.style === 'primary' && 'bg-primary hover:bg-primary-700'
                            )}
                            onClick={() => {
                              const route = actionRoutes[action.id];
                              if (route) {
                                markAsRead(notification.id);
                                router.push(route);
                              }
                            }}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
