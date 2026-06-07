import { CalendarDays, CalendarRange, CheckCircle2, BellRing, TrendingUp, TrendingDown } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

const sparklineData = Array.from({ length: 12 }, (_, i) => ({
  v: Math.floor(Math.random() * 40) + 20 + (i > 6 ? 10 : 0),
}))

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  trend: number
  color: string
  gradient: string
}

function StatCard({ icon, label, value, trend, color, gradient }: StatCardProps) {
  const isUp = trend >= 0
  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{label}</p>
        </div>
        <div className="w-20 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={gradient} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={gradient} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={gradient} fill={`url(#grad-${label})`} strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        icon={<CalendarDays size={20} />}
        label="Events Today"
        value="3"
        trend={12}
        color="bg-indigo-500/10 text-indigo-500"
        gradient="#6366f1"
      />
      <StatCard
        icon={<CalendarRange size={20} />}
        label="Events This Week"
        value="8"
        trend={-5}
        color="bg-violet-500/10 text-violet-500"
        gradient="#8b5cf6"
      />
      <StatCard
        icon={<CheckCircle2 size={20} />}
        label="Completed Tasks"
        value="24"
        trend={18}
        color="bg-emerald-500/10 text-emerald-500"
        gradient="#10b981"
      />
      <StatCard
        icon={<BellRing size={20} />}
        label="Upcoming Reminders"
        value="5"
        trend={8}
        color="bg-cyan-500/10 text-cyan-500"
        gradient="#06b6d4"
      />
    </div>
  )
}
