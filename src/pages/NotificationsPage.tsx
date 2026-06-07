import { useState } from 'react'
import { CheckCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { NotificationCard } from '../components/notifications/NotificationCard'
import { useNotificationStore } from '../store/useNotificationStore'

type FilterType = 'all' | 'unread' | 'reminder' | 'deadline' | 'missed' | 'completed'

export function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore()
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read
    if (filter === 'all') return true
    return n.type === filter
  })

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Notifications</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<CheckCheck size={14} />} onClick={markAllAsRead}>
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {(['all', 'unread', 'reminder', 'deadline', 'missed', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filter === f
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-hover)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-[var(--color-text-muted)] text-sm">No notifications here!</p>
          </div>
        ) : (
          filtered.map((n) => (
            <NotificationCard key={n.id} notification={n} onMarkRead={markAsRead} onDelete={deleteNotification} />
          ))
        )}
      </div>
    </div>
  )
}
