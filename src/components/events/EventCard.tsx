import { Clock, Bell, Trash2, Check } from 'lucide-react'
import { Badge } from '../ui/Badge'
import type { Event } from '../../types'
import { formatDate, formatTime } from '../../lib/formatters'
import { useEventStore } from '../../store/useEventStore'

interface EventCardProps {
  event: Event
}

const categoryColors: Record<string, string> = {
  meeting: '#6366f1',
  work: '#f59e0b',
  health: '#ef4444',
  social: '#8b5cf6',
  personal: '#10b981',
  other: '#06b6d4',
}

const categoryBadge: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  meeting: 'default',
  work: 'warning',
  health: 'error',
  social: 'info',
  personal: 'success',
  other: 'info',
}

export function EventCard({ event }: EventCardProps) {
  const { toggleComplete, deleteEvent } = useEventStore()

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] group hover:bg-[var(--color-card-hover)] transition-all duration-200">
      <div
        className="w-1 h-12 rounded-full flex-shrink-0"
        style={{ backgroundColor: categoryColors[event.category] || '#6366f1' }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`font-medium text-[var(--color-text)] truncate ${event.completed ? 'line-through opacity-60' : ''}`}>
            {event.title}
          </h3>
          <Badge variant={categoryBadge[event.category] || 'default'}>{event.category}</Badge>
          <Badge variant={event.priority === 'high' ? 'error' : event.priority === 'medium' ? 'warning' : 'success'}>
            {event.priority}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(event.date)}, {formatTime(event.date)}</span>
          <span className="flex items-center gap-1"><Bell size={12} /> {event.reminder}min before</span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => toggleComplete(event.id)} className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors">
          <Check size={16} />
        </button>
        <button onClick={() => deleteEvent(event.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
