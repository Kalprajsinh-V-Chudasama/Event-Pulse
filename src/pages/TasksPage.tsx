import { useState } from 'react'
import { Plus, ListTodo, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Modal } from '../components/ui/Modal'
import { ProgressBar } from '../components/ui/ProgressBar'
import { TaskItem } from '../components/tasks/TaskItem'
import { useTaskStore } from '../store/useTaskStore'
import { PRIORITY_LEVELS } from '../lib/constants'
import { formatPercentage } from '../lib/formatters'

export function TasksPage() {
  const { tasks, addTask, getStats } = useTaskStore()
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', deadline: '' })

  const stats = getStats()
  const incomplete = tasks.filter((t) => !t.completed)
  const completed = tasks.filter((t) => t.completed)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    addTask({
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority as 'low' | 'medium' | 'high',
      deadline: newTask.deadline ? new Date(newTask.deadline) : undefined,
    })
    setNewTask({ title: '', description: '', priority: 'medium', deadline: '' })
    setShowModal(false)
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Checklist / Tasks</h1>
        <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500"><ListTodo size={18} /></div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text)]">{stats.total}</p>
              <p className="text-xs text-[var(--color-text-muted)]">Total Tasks</p>
            </div>
          </div>
          <ProgressBar value={stats.completed} max={stats.total} size="sm" showLabel />
        </div>
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500"><TrendingUp size={18} /></div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text)]">{formatPercentage(stats.percentage)}</p>
              <p className="text-xs text-[var(--color-text-muted)]">Completion Rate</p>
            </div>
          </div>
          <ProgressBar value={stats.percentage} size="sm" barClassName="bg-emerald-500" />
        </div>
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500"><ListTodo size={18} /></div>
          <div>
            <p className="text-2xl font-bold text-[var(--color-text)]">{incomplete.length}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Still Pending</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
            To Do ({incomplete.length})
          </h2>
          <div className="space-y-2">
            {incomplete.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
            {incomplete.length === 0 && (
              <p className="text-sm text-[var(--color-text-muted)] py-8 text-center">All tasks completed! 🎉</p>
            )}
          </div>
        </div>

        {completed.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Completed ({completed.length})
            </h2>
            <div className="space-y-2">
              {completed.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Task">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Task Title" placeholder="Enter task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Description</label>
            <textarea
              placeholder="Add task description..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Priority" options={PRIORITY_LEVELS.map((p) => ({ label: p.label, value: p.value }))} value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} />
            <Input label="Deadline" type="date" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">Create Task</Button>
        </form>
      </Modal>
    </div>
  )
}
