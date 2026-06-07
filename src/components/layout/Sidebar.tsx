import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, CalendarCheck, Bell, CheckSquare,
  BarChart3, Settings, Menu, Sparkles,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { APP_NAME, NAV_ITEMS } from '../../lib/constants'
import { useSidebarStore } from '../../store/useSidebarStore'
import { useUnreadCount } from '../../store/useNotificationStore'

const iconMap: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard, Calendar, CalendarCheck, Bell, CheckSquare, BarChart3, Settings,
}

export function Sidebar() {
  const { collapsed, mobileOpen, toggle, setMobileOpen } = useSidebarStore()
  const unreadCount = useUnreadCount()

  const content = (
    <div className={cn(
      'h-full flex flex-col bg-[var(--color-sidebar)] border-r border-[var(--color-border)] transition-all duration-300',
      collapsed ? 'w-[72px]' : 'w-64'
    )}>
      <div className="flex items-center justify-between h-16 border-b border-[var(--color-border)]">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center flex-shrink-0">
            <CalendarCheck size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-[var(--color-text)] tracking-tight">{APP_NAME}</span>
          )}
        </div>
        <button
          onClick={toggle}
          className="rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-all duration-300 hover:scale-110 active:scale-95 hidden lg:block group"
        >
          <Menu 
            size={18} 
            className={cn(
              "transition-transform duration-500 ease-in-out",
              collapsed ? "rotate-180" : "rotate-0"
            )} 
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                'flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative',
                collapsed && 'justify-center',
                isActive
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
              )}
            >
              <div className="relative flex-shrink-0">
                <Icon size={20} />
                {item.label === 'Notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--color-error)] text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              {!collapsed && <span>{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div>
        <button className={cn(
          'w-full flex items-center rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/25 hover:-translate-y-0.5',
          collapsed && 'justify-center'
        )}>
          <Sparkles size={18} />
          {!collapsed && (
            <div className="text-left">
              <div>Upgrade to Pro</div>
              <div className="text-[10px] opacity-80">Unlock all features</div>
            </div>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block h-screen sticky top-0 flex-shrink-0">
        {content}
      </aside>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full shadow-2xl animate-slide-in-left">
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
