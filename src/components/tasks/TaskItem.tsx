import { Trash2, Circle, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { Task } from '../../types'
import { useTaskStore } from '../../store/useTaskStore'
import { formatDate } from '../../lib/formatters'

interface TaskItemProps {
  task: Task
}

const priorityColors: Record<string, string> = {
  high: 'text-red-500',
  medium: 'text-amber-500',
  low: 'text-emerald-500',
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleComplete, deleteTask } = useTaskStore()

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all duration-200 group hover:border-[var(--color-primary)]/30',
        task.completed && 'opacity-60'
      )}
    >
      <button onClick={() => toggleComplete(task.id)} className="flex-shrink-0 transition-transform hover:scale-110">
        {task.completed ? (
          <CheckCircle2 size={20} className="text-emerald-500" />
        ) : (
          <Circle size={20} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn('text-sm font-medium', task.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]')}>
            {task.title}
          </span>
          <AlertCircle size={12} className={priorityColors[task.priority]} />
        </div>
        {task.deadline && (
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Due {formatDate(task.deadline)}</p>
        )}
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="p-1.5 rounded-lg text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
