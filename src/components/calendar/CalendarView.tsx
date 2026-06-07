import { useState } from 'react'
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths,
  isSameMonth, isSameDay, startOfDay,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { cn } from '../../lib/cn'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { useEventStore } from '../../store/useEventStore'

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const events = useEventStore((s) => s.events)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)

  const days: Date[] = []
  let d = calStart
  while (d <= calEnd) {
    days.push(d)
    d = addDays(d, 1)
  }

  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(startOfDay(new Date(e.date)), day))

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-xs font-medium rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[var(--color-bg-secondary)] rounded-xl p-1">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors',
                  view === v
                    ? 'bg-[var(--color-card)] text-[var(--color-text)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <Button size="sm" icon={<Plus size={14} />}>Add Event</Button>
        </div>
      </div>

      <GlassCard className="p-4">
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-[var(--color-text-muted)] py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isToday = isSameDay(day, new Date())
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentDate)

            return (
              <div
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  'min-h-[90px] p-1.5 border border-[var(--color-border)]/50 transition-colors cursor-pointer hover:bg-[var(--color-bg-secondary)]',
                  !isCurrentMonth && 'opacity-40',
                  isSelected && 'bg-[var(--color-primary-light)]'
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-7 h-7 text-xs rounded-full mb-1',
                    isToday && 'bg-[var(--color-primary)] text-white font-bold'
                  )}
                >
                  {format(day, 'd')}
                </span>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center gap-1 px-1 py-0.5 rounded text-[10px] truncate"
                      style={{ backgroundColor: `${ev.category === 'meeting' ? '#6366f1' : ev.category === 'work' ? '#f59e0b' : ev.category === 'health' ? '#ef4444' : ev.category === 'social' ? '#8b5cf6' : ev.category === 'personal' ? '#10b981' : '#06b6d4'}20`, color: ev.category === 'meeting' ? '#6366f1' : ev.category === 'work' ? '#f59e0b' : ev.category === 'health' ? '#ef4444' : ev.category === 'social' ? '#8b5cf6' : ev.category === 'personal' ? '#10b981' : '#06b6d4' }}
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: ev.category === 'meeting' ? '#6366f1' : ev.category === 'work' ? '#f59e0b' : ev.category === 'health' ? '#ef4444' : ev.category === 'social' ? '#8b5cf6' : ev.category === 'personal' ? '#10b981' : '#06b6d4' }} />
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-[var(--color-text-muted)] pl-1">
                      +{dayEvents.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
