import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts'
import { Calendar, CheckCircle2, BellRing, Zap } from 'lucide-react'
import { monthlyChartData, weeklyChartData, analyticsData } from '../data/mockData'

const RADIAN = Math.PI / 180
function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const completionData = [
  { name: 'Completed', value: analyticsData.completionRate },
  { name: 'Remaining', value: 100 - analyticsData.completionRate },
]

const COLORS = ['#6366f1', '#1e293b']

export function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Calendar size={18} />, label: 'Total Events', value: analyticsData.totalEvents, color: 'bg-indigo-500/10 text-indigo-500' },
          { icon: <CheckCircle2 size={18} />, label: 'Completed Events', value: analyticsData.completedEvents, color: 'bg-emerald-500/10 text-emerald-500' },
          { icon: <Zap size={18} />, label: 'Most Active Day', value: analyticsData.mostActiveDay, color: 'bg-amber-500/10 text-amber-500' },
          { icon: <BellRing size={18} />, label: 'Reminder Effectiveness', value: `${analyticsData.reminderEffectiveness}%`, color: 'bg-cyan-500/10 text-cyan-500' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-xl font-bold text-[var(--color-text)]">{stat.value}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Monthly Productivity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', color: 'var(--color-text)' }}
              />
              <Legend formatter={(value) => <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>} />
              <Bar dataKey="events" name="Events" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="tasks" name="Tasks" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Event Completion Rate</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {completionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', color: 'var(--color-text)' }}
                />
                <Legend formatter={(value) => <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Weekly Statistics</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} />
              <XAxis dataKey="day" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', color: 'var(--color-text)' }}
              />
              <Legend formatter={(value) => <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>} />
              <Area type="monotone" dataKey="events" name="Events" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="tasks" name="Tasks" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Activity Overview</h3>
          <div className="space-y-4">
            {weeklyChartData.map((d) => (
              <div key={d.day} className="flex items-center gap-3">
                <span className="text-xs font-medium text-[var(--color-text-muted)] w-8">{d.day}</span>
                <div className="flex-1 h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-500"
                    style={{ width: `${(d.events / 7) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] w-4 text-right">{d.events}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
