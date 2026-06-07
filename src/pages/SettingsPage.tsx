import { useState } from 'react'
import { Bell, Monitor, User, Sparkles, Check } from 'lucide-react'
import { Toggle } from '../components/ui/Toggle'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { useThemeStore } from '../store/useThemeStore'

const plans = [
  { name: 'Free', price: '$0', features: ['Up to 10 events/month', 'Basic calendar', 'Email notifications'], popular: false },
  { name: 'Pro', price: '$12', features: ['Unlimited events', 'Advanced analytics', 'Team collaboration', 'SMS notifications', 'AI Smart Scheduling'], popular: true },
  { name: 'Enterprise', price: '$29', features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'API access', 'White-label'], popular: false },
]

export function SettingsPage() {
  const { theme, toggleTheme } = useThemeStore()
  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    sms: false,
  })

  return (
    <div className="animate-fade-in max-w-4xl">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-8">Settings</h1>

      <div className="space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <Bell size={18} className="text-[var(--color-primary)]" /> Notification Preferences
          </h2>
          <div className="space-y-4">
            <Toggle checked={prefs.email} onChange={(v) => setPrefs({ ...prefs, email: v })} label="Email Notifications" />
            <Toggle checked={prefs.push} onChange={(v) => setPrefs({ ...prefs, push: v })} label="Browser Push Notifications" />
            <Toggle checked={prefs.sms} onChange={(v) => setPrefs({ ...prefs, sms: v })} label="SMS Notifications (Pro)" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <Monitor size={18} className="text-[var(--color-primary)]" /> Theme Settings
          </h2>
          <Toggle checked={theme === 'dark'} onChange={() => toggleTheme()} label="Dark Mode" />
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <User size={18} className="text-[var(--color-primary)]" /> Account Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Full Name</label>
              <input className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all" defaultValue="Alex Johnson" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Email</label>
              <input className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all" defaultValue="alex@eventpulse.io" />
            </div>
          </div>
          <Button className="mt-4">Save Changes</Button>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-6 flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--color-primary)]" /> Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-5 transition-all duration-300 ${
                  plan.popular
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-lg shadow-[var(--color-primary)]/10'
                    : 'border-[var(--color-border)] bg-[var(--color-card)]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-[10px] font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-bold text-[var(--color-text)]">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-[var(--color-text)]">{plan.price}</span>
                  {plan.price !== '$0' && <span className="text-sm text-[var(--color-text-muted)]">/month</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Check size={14} className="text-emerald-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.price === '$0' ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
