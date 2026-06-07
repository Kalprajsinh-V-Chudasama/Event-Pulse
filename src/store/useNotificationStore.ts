import { create } from 'zustand'
import type { Notification } from '../types'
import { mockNotifications } from '../data/mockData'

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  addNotification: (notification: Notification) => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: mockNotifications,
  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length
  },
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
}))

export function useUnreadCount() {
  return useNotificationStore((s) => s.notifications.filter((n) => !n.read).length)
}
