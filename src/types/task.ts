export interface Task {
  id: string
  title: string
  description: string
  deadline?: Date
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'completed' | 'completedAt'>
