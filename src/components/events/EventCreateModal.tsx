import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { EVENT_CATEGORIES, PRIORITY_LEVELS, REMINDER_OPTIONS, REPEAT_OPTIONS } from '../../lib/constants'
import { useEventStore } from '../../store/useEventStore'
import type { EventFormData } from '../../types'

interface EventCreateModalProps {
  open: boolean
  onClose: () => void
}

export function EventCreateModal({ open, onClose }: EventCreateModalProps) {
  const addEvent = useEventStore((s) => s.addEvent)
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'meeting',
    priority: 'medium',
    reminder: '15',
    repeat: 'none',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const eventData: EventFormData = {
      title: form.title,
      description: form.description,
      date: new Date(`${form.date}T${form.time || '09:00'}`),
      time: form.time,
      category: form.category as EventFormData['category'],
      priority: form.priority as EventFormData['priority'],
      reminder: parseInt(form.reminder),
      repeat: form.repeat as EventFormData['repeat'],
    }
    addEvent(eventData)
    setForm({ title: '', description: '', date: '', time: '', category: 'meeting', priority: 'medium', reminder: '15', repeat: 'none' })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Create New Event">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Event Title" placeholder="Enter event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Description</label>
          <textarea
            placeholder="Add event description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <Input label="Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" options={EVENT_CATEGORIES.map((c) => ({ label: c.label, value: c.value }))} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Select label="Priority" options={PRIORITY_LEVELS.map((p) => ({ label: p.label, value: p.value }))} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Reminder" options={REMINDER_OPTIONS.map((r) => ({ label: r.label, value: r.value.toString() }))} value={form.reminder} onChange={(e) => setForm({ ...form, reminder: e.target.value })} />
          <Select label="Repeat" options={REPEAT_OPTIONS.map((r) => ({ label: r.label, value: r.value }))} value={form.repeat} onChange={(e) => setForm({ ...form, repeat: e.target.value })} />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Create Event
        </Button>
      </form>
    </Modal>
  )
}
