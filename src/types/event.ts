export interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  endDate?: Date
  endTime?: string
  category: 'meeting' | 'personal' | 'work' | 'health' | 'social' | 'other'
  priority: 'low' | 'medium' | 'high'
  reminder: number
  repeat: 'none' | 'daily' | 'weekly' | 'monthly'
  completed: boolean
  createdAt: Date
}

export type EventFormData = Omit<Event, 'id' | 'createdAt' | 'completed'>
