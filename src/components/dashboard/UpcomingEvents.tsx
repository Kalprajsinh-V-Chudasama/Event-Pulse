import { Clock, Bell, Edit2, Trash2, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useEventStore } from '../../store/useEventStore'
import { formatDate, formatTime } from '../../lib/formatters'

const categoryBadge: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  meeting: 'default',
  work: 'warning',
  health: 'error',
  social: 'info',
  personal: 'success',
  other: 'info',
}

export function UpcomingEvents() {
  const allEvents = useEventStore((s) => s.events)
  const { toggleComplete, deleteEvent } = useEventStore()

  // Calculate upcoming events outside of the Zustand selector to prevent infinite re-renders
  const events = allEvents
    .filter((e) => !e.completed && new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Upcoming Events</h2>
        <p className="text-[var(--color-text-muted)] text-sm">No upcoming events. You're all caught up! 🎉</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">Upcoming Events</h2>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 p-5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] group hover:bg-[var(--color-card-hover)] transition-all duration-200"
          >
            <div
              className="w-1 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: event.category === 'meeting' ? '#6366f1' : event.category === 'work' ? '#f59e0b' : event.category === 'health' ? '#ef4444' : event.category === 'social' ? '#8b5cf6' : event.category === 'personal' ? '#10b981' : '#06b6d4' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-[var(--color-text)] truncate">{event.title}</h3>
                <Badge variant={categoryBadge[event.category] || 'default'}>{event.category}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(event.date)}, {formatTime(event.date)}</span>
                <span className="flex items-center gap-1"><Bell size={12} /> {event.reminder}min before</span>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => toggleComplete(event.id)} className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors" title="Mark Complete">
                <Check size={16} />
              </button>
              <button className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors" title="Edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => deleteEvent(event.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
