import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { EventCard } from '../components/events/EventCard'
import { EventCreateModal } from '../components/events/EventCreateModal'
import { useEventStore } from '../store/useEventStore'

export function EventsPage() {
  const [showModal, setShowModal] = useState(false)
  const events = useEventStore((s) => s.events)
  const upcoming = events.filter((e) => !e.completed).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const past = events.filter((e) => e.completed)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Scheduled Events</h1>
        <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>Create Event</Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
            Upcoming ({upcoming.length})
          </h2>
          <div className="space-y-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {upcoming.length === 0 && (
              <p className="text-sm text-[var(--color-text-muted)] py-8 text-center">No upcoming events.</p>
            )}
          </div>
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Completed ({past.length})
            </h2>
            <div className="space-y-2">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>

      <EventCreateModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
