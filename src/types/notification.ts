export interface Notification {
  id: string
  title: string
  message: string
  type: 'reminder' | 'deadline' | 'missed' | 'completed'
  read: boolean
  eventId?: string
  createdAt: Date
}
