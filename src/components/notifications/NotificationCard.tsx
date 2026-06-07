import { Bell, Clock, XCircle, CheckCircle2, Trash2, Check } from 'lucide-react'
import { cn } from '../../lib/cn'
import { timeAgo } from '../../lib/formatters'
import type { Notification } from '../../types'

interface NotificationCardProps {
  notification: Notification
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
}

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  reminder: { icon: <Bell size={16} />, color: 'bg-indigo-500/10 text-indigo-500' },
  deadline: { icon: <Clock size={16} />, color: 'bg-amber-500/10 text-amber-500' },
  missed: { icon: <XCircle size={16} />, color: 'bg-red-500/10 text-red-500' },
  completed: { icon: <CheckCircle2 size={16} />, color: 'bg-emerald-500/10 text-emerald-500' },
}

export function NotificationCard({ notification, onMarkRead, onDelete }: NotificationCardProps) {
  const config = typeConfig[notification.type] || typeConfig.reminder

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:bg-[var(--color-bg-secondary)] group',
        notification.read ? 'border-transparent' : 'border-[var(--color-primary)]/20 bg-[var(--color-primary-light)]'
      )}
    >
      <div className={`p-2 rounded-lg flex-shrink-0 ${config.color}`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className={cn('text-sm font-medium', notification.read ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text)]')}>
            {notification.title}
          </h4>
          {!notification.read && <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0" />}
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mb-1">{notification.message}</p>
        <span className="text-[11px] text-[var(--color-text-muted)]">{timeAgo(notification.createdAt)}</span>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {!notification.read && (
          <button onClick={() => onMarkRead(notification.id)} className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Mark as read">
            <Check size={14} />
          </button>
        )}
        <button onClick={() => onDelete(notification.id)} className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-red-500/10 hover:text-red-500 transition-colors" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
