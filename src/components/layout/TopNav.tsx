import { useState, useRef, useEffect } from 'react'
import { Search, Plus, Bell, Moon, Sun, ChevronDown, Menu } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { useThemeStore } from '../../store/useThemeStore'
import { useSidebarStore } from '../../store/useSidebarStore'
import { useUnreadCount } from '../../store/useNotificationStore'

export function TopNav() {
  const { theme, toggleTheme } = useThemeStore()
  const { setMobileOpen } = useSidebarStore()
  const unreadCount = useUnreadCount()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="h-20 sticky top-0 z-40 bg-[var(--color-nav)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between h-full px-6 lg:px-10 gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              placeholder="Search events, tasks..."
              className="w-64 xl:w-80 pr-4 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" icon={<Plus size={16} />} className="hidden sm:flex">
            Quick Add
          </Button>

          <button className="relative p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[var(--color-error)] text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden group"
            aria-label="Toggle theme"
          >
            <div className="relative w-[18px] h-[18px]">
              <Sun 
                size={18} 
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  theme === 'dark' ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                )} 
              />
              <Moon 
                size={18} 
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  theme === 'light' ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                )} 
              />
            </div>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <Avatar name="Alex Johnson" size="sm" />
              <span className="text-sm font-medium text-[var(--color-text)] hidden md:block">Alex</span>
              <ChevronDown size={14} className="text-[var(--color-text-muted)] hidden md:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl animate-scale-in overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border)]">
                  <p className="text-sm font-medium text-[var(--color-text)]">Alex Johnson</p>
                  <p className="text-xs text-[var(--color-text-muted)]">alex@eventpulse.io</p>
                </div>
                <div className="p-1">
                  {['Profile', 'Account Settings', 'Keyboard Shortcuts'].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[var(--color-border)] p-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-[var(--color-error)] hover:bg-red-500/10 rounded-lg transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
