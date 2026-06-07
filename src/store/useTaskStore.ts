import { create } from 'zustand'
import type { Task, TaskFormData } from '../types'
import { mockTasks } from '../data/mockData'

interface TaskStore {
  tasks: Task[]
  addTask: (data: TaskFormData) => void
  updateTask: (id: string, data: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleComplete: (id: string) => void
  getStats: () => { total: number; completed: number; percentage: number }
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: mockTasks,
  addTask: (data) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...data,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date(),
        },
      ],
    })),
  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  toggleComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date() : undefined }
          : t
      ),
    })),
  getStats: () => {
    const { tasks } = get()
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 }
  },
}))
