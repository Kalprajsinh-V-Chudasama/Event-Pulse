import { create } from 'zustand'
import type { Event, EventFormData } from '../types'
import { mockEvents } from '../data/mockData'

interface EventStore {
  events: Event[]
  addEvent: (data: EventFormData) => void
  updateEvent: (id: string, data: Partial<Event>) => void
  deleteEvent: (id: string) => void
  toggleComplete: (id: string) => void
  getUpcoming: () => Event[]
  getToday: () => Event[]
  getByDate: (date: Date) => Event[]
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: mockEvents,
  addEvent: (data) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...data,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date(),
        },
      ],
    })),
  updateEvent: (id, data) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...data } : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
  toggleComplete: (id) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, completed: !e.completed } : e
      ),
    })),
  getUpcoming: () => {
    const now = new Date()
    return get()
      .events.filter((e) => !e.completed && new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  },
  getToday: () => {
    const today = new Date()
    return get().events.filter(
      (e) =>
        new Date(e.date).toDateString() === today.toDateString()
    )
  },
  getByDate: (date) =>
    get().events.filter(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    ),
}))
