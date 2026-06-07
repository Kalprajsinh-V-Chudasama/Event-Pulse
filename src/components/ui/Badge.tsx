import { cn } from '../../lib/cn'

interface BadgeProps {
  children: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

const variants = {
  default: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
  success: 'bg-emerald-500/10 text-emerald-500',
  warning: 'bg-amber-500/10 text-amber-500',
  error: 'bg-red-500/10 text-red-500',
  info: 'bg-cyan-500/10 text-cyan-500',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
