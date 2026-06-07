export const APP_NAME = 'EventPulse'

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Calendar', href: '/calendar', icon: 'Calendar' },
  { label: 'Scheduled Events', href: '/events', icon: 'CalendarCheck' },
  { label: 'Notifications', href: '/notifications', icon: 'Bell' },
  { label: 'Checklist / Tasks', href: '/tasks', icon: 'CheckSquare' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
] as const

export const EVENT_CATEGORIES = [
  { label: 'Meeting', value: 'meeting', color: '#6366f1' },
  { label: 'Personal', value: 'personal', color: '#10b981' },
  { label: 'Work', value: 'work', color: '#f59e0b' },
  { label: 'Health', value: 'health', color: '#ef4444' },
  { label: 'Social', value: 'social', color: '#8b5cf6' },
  { label: 'Other', value: 'other', color: '#06b6d4' },
] as const

export const PRIORITY_LEVELS = [
  { label: 'Low', value: 'low', color: '#10b981' },
  { label: 'Medium', value: 'medium', color: '#f59e0b' },
  { label: 'High', value: 'high', color: '#ef4444' },
] as const

export const REMINDER_OPTIONS = [
  { label: '5 Minutes Before', value: 5 },
  { label: '15 Minutes Before', value: 15 },
  { label: '30 Minutes Before', value: 30 },
  { label: '1 Hour Before', value: 60 },
  { label: '1 Day Before', value: 1440 },
  { label: 'Custom Time', value: -1 },
] as const

export const REPEAT_OPTIONS = [
  { label: 'Does not repeat', value: 'none' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
] as const
