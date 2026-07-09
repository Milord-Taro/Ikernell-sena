import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus, Package } from 'lucide-react'

/* ── MetricCard ──────────────────────────────────────────────────────── */
interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: number
  trendLabel?: string
  icon?: ReactNode
  className?: string
}

export function MetricCard({ label, value, unit, trend, trendLabel, icon, className = '' }: MetricCardProps) {
  const trendPositive = trend !== undefined && trend > 0
  const trendNegative = trend !== undefined && trend < 0

  return (
    <div className={`bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] px-5 py-4 flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="type-label text-[var(--text-tertiary)]">{label}</span>
        {icon && <span className="text-[var(--text-tertiary)]">{icon}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="type-metric text-[var(--text-primary)]">{value}</span>
        {unit && <span className="type-body text-[var(--text-tertiary)] mb-0.5">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1">
          {trendPositive ? (
            <TrendingUp size={13} className="text-[var(--success)]" />
          ) : trendNegative ? (
            <TrendingDown size={13} className="text-[var(--error)]" />
          ) : (
            <Minus size={13} className="text-[var(--text-tertiary)]" />
          )}
          <span className={`type-id ${trendPositive ? 'text-[var(--success)]' : trendNegative ? 'text-[var(--error)]' : 'text-[var(--text-tertiary)]'}`}>
            {trendPositive && '+'}{trend}%
          </span>
          {trendLabel && <span className="type-caption text-[var(--text-tertiary)]">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}

/* ── Avatar ──────────────────────────────────────────────────────────── */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  status?: 'online' | 'offline' | 'busy' | 'away'
  className?: string
}

const avatarSizes: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'size-6',  text: 'text-[9px]',    status: 'size-1.5 border' },
  sm: { container: 'size-8',  text: 'text-[11px]',   status: 'size-2 border' },
  md: { container: 'size-9',  text: 'text-[12px]',   status: 'size-2.5 border-[1.5px]' },
  lg: { container: 'size-11', text: 'text-[14px]',   status: 'size-3 border-2' },
  xl: { container: 'size-14', text: 'text-[18px]',   status: 'size-3.5 border-2' },
}

const statusColors: Record<string, string> = {
  online:  'bg-[var(--success)]',
  offline: 'bg-[var(--text-tertiary)]',
  busy:    'bg-[var(--error)]',
  away:    'bg-[var(--warning)]',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function getColor(name: string) {
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16']
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export function Avatar({ name, src, size = 'md', status, className = '' }: AvatarProps) {
  const s = avatarSizes[size]
  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${s.container} rounded-full overflow-hidden flex items-center justify-center font-sans font-semibold text-white`}
        style={{ backgroundColor: src ? undefined : getColor(name) }}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className={s.text}>{getInitials(name)}</span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-[var(--surface)] ${s.status} ${statusColors[status]}`}
        />
      )}
    </div>
  )
}

/* ── EmptyState ──────────────────────────────────────────────────────── */
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-8 gap-3 text-center ${className}`}>
      <div className="flex items-center justify-center size-12 rounded-[var(--radius-lg)] bg-[var(--muted)] text-[var(--text-tertiary)] mb-1">
        {icon ?? <Package size={22} />}
      </div>
      <p className="type-h4 text-[var(--text-primary)]">{title}</p>
      {description && <p className="type-body-sm text-[var(--text-secondary)] max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

/* ── Skeleton ────────────────────────────────────────────────────────── */
interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-[var(--radius-sm)] bg-[var(--muted)] ${className}`} />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-5/6" />
        <Skeleton className="h-2.5 w-4/6" />
      </div>
      <div className="flex gap-2 mt-1">
        <Skeleton className="h-7 w-20 rounded-[var(--radius-md)]" />
        <Skeleton className="h-7 w-16 rounded-[var(--radius-md)]" />
      </div>
    </div>
  )
}
