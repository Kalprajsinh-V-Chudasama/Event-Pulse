import { Calendar, CheckSquare, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGreeting } from '../../hooks/useGreeting'
import { useEventStore } from '../../store/useEventStore'
import { useTaskStore } from '../../store/useTaskStore'
import { useUnreadCount } from '../../store/useNotificationStore'

export function WelcomeSection() {
  const greeting = useGreeting()
  const navigate = useNavigate()
  const upcomingEvents = useEventStore((s) => s.getUpcoming().length)
  const pendingTasks = useTaskStore((s) => s.tasks.filter((t) => !t.completed).length)
  const unreadCount = useUnreadCount()
  const todayCount = useEventStore((s) => s.getToday().length)

  return (
    <div className="mb-12">
      <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)]">
        {greeting}, Alex <span className="wave inline-block animate-float">👋</span>
      </h1>
      <p className="text-[var(--color-text-secondary)] mt-2">Here's your day at a glance.</p>
      <div className="flex flex-wrap gap-x-12 gap-y-6 mt-6">
        <QuickStat icon={<Calendar size={16} />} label="Today's Events" value={`${todayCount} events`} color="bg-indigo-500/10 text-indigo-500" />
        <QuickStat icon={<Calendar size={16} />} label="Upcoming" value={`${upcomingEvents} events`} color="bg-violet-500/10 text-violet-500" />
        <QuickStat icon={<CheckSquare size={16} />} label="Pending Tasks" value={`${pendingTasks} tasks`} color="bg-amber-500/10 text-amber-500" />
        <QuickStat icon={<Bell size={16} />} label="Notifications" value={`${unreadCount} unread`} color="bg-cyan-500/10 text-cyan-500" onClick={() => navigate('/notifications')} />
      </div>
    </div>
  )
}

function QuickStat({ icon, label, value, color, onClick }: { icon: React.ReactNode; label: string; value: string; color: string; onClick?: () => void }) {
  return (
    <div
      className={`flex items-center gap-4 px-6 py-3.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-sm transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40' : ''}`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      <div className="text-sm">
        <p className="text-[var(--color-text-muted)] text-xs">{label}</p>
        <p className="font-semibold text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  )
}
