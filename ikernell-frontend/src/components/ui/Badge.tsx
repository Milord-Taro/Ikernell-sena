import { type ReactNode } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'muted'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--secondary-bg)] text-[var(--secondary-fg)] border border-[var(--border)]',
  success: 'bg-[var(--success-bg)] text-[var(--success-fg)] border border-[var(--success-border)]',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning-fg)] border border-[var(--warning-border)]',
  error:   'bg-[var(--error-bg)] text-[var(--error-fg)] border border-[var(--error-border)]',
  info:    'bg-[var(--info-bg)] text-[var(--info-fg)] border border-[var(--info-border)]',
  muted:   'bg-[var(--muted)] text-[var(--muted-fg)] border border-[var(--border)]',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[var(--primary)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  error:   'bg-[var(--error)]',
  info:    'bg-[var(--info)]',
  muted:   'bg-[var(--muted-fg)]',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-px text-[0.75rem] gap-1',
  md: 'px-2   py-0.5 text-[0.8214rem] gap-1.5',
}

export function Badge({ variant = 'default', size = 'md', dot = false, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sm)] font-mono font-medium leading-none ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {dot && <span className={`size-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  )
}
