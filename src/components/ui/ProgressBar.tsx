import { cn } from '../../lib/cn'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  size = 'md',
}: ProgressBarProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>{value}/{max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-[var(--color-bg-secondary)] overflow-hidden',
          size === 'sm' && 'h-1.5',
          size === 'md' && 'h-2',
          size === 'lg' && 'h-3'
        )}
      >
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-500 ease-out',
            barClassName
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
