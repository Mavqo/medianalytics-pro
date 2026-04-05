import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import type { NotificationStatus, NotificationAction } from '@/components/ui/notification-card';
import {
  notifications as healthcareNotifications,
  NotificationPriority
} from '@/lib/data/notifications';

export type Notification = {
  id: string;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;
  priority?: NotificationPriority;
  actions?: NotificationAction[];
};

type NotificationState = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'status'>) => void;
  unreadCount: () => number;
  getHighPriorityCount: () => number;
};

// Transform healthcare notifications to store format
const transformNotifications = (): Notification[] => {
  return healthcareNotifications.map((n) => ({
    id: n.id,
    title: n.title,
    body: n.message,
    status: n.read ? 'read' : 'unread',
    createdAt: n.timestamp,
    priority: n.priority,
    actions: n.actionUrl
      ? [
          {
            id: 'view',
            label: 'Visualizza',
            type: 'redirect',
            style: n.priority === 'high' ? 'primary' : 'default'
          }
        ]
      : undefined
  }));
};

export const useNotificationStore = create<NotificationState>()(
  // To enable persistence across refreshes, uncomment the persist wrapper below:
  // persist(
  (set, get) => ({
    notifications: transformNotifications(),

    markAsRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, status: 'read' as const } : n
        )
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          status: 'read' as const
        }))
      })),

    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      })),

    addNotification: (notification) =>
      set((state) => ({
        notifications: [{ ...notification, status: 'unread' as const }, ...state.notifications]
      })),

    unreadCount: () => get().notifications.filter((n) => n.status === 'unread').length,

    getHighPriorityCount: () =>
      get().notifications.filter((n) => n.priority === 'high' && n.status === 'unread').length
  })
  //   ,
  //   { name: 'notifications' }
  // )
);
