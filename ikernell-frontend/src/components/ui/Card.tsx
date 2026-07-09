import { type ReactNode } from 'react'

/* ── Card ────────────────────────────────────────────────────────────── */
interface CardProps {
  children: ReactNode
  className?: string
  noPad?: boolean
}

export function Card({ children, className = '', noPad = false }: CardProps) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] ${noPad ? '' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  meta?: ReactNode
}

export function CardHeader({ title, description, actions, meta }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[var(--border)]">
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="type-h4 text-[var(--text-primary)] truncate">{title}</h3>
          {meta}
        </div>
        {description && (
          <p className="type-body-sm text-[var(--text-secondary)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`flex items-center gap-2 px-5 py-3 border-t border-[var(--border)] ${className}`}>
      {children}
    </div>
  )
}

/* ── Panel ───────────────────────────────────────────────────────────── */
interface PanelProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'flush'
}

export function Panel({ children, className = '', variant = 'default' }: PanelProps) {
  const styles: Record<string, string> = {
    default:  'bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]',
    elevated: 'bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-lg)]',
    flush:    'bg-[var(--surface)] border-t border-[var(--border)]',
  }
  return <div className={`${styles[variant]} ${className}`}>{children}</div>
}
