import { type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

/* ── Breadcrumb ──────────────────────────────────────────────────────── */
interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={`flex items-center gap-1 ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight size={12} className="text-[var(--text-tertiary)]" />}
            {isLast ? (
              <span className="type-body text-[var(--text-primary)] font-medium">{item.label}</span>
            ) : (
              <button
                onClick={item.onClick}
                className="type-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}

/* ── Tabs ────────────────────────────────────────────────────────────── */
interface Tab {
  id: string
  label: string
  badge?: string | number
  icon?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pill'
  className?: string
}

export function Tabs({ tabs, active, onChange, variant = 'underline', className = '' }: TabsProps) {
  if (variant === 'pill') {
    return (
      <div className={`flex items-center gap-1 p-1 bg-[var(--muted)] rounded-[var(--radius-md)] ${className}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-1.5 h-7 px-3 rounded-[var(--radius-sm)] type-body font-medium transition-colors duration-100 cursor-pointer
              ${active === tab.id
                ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
            `}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`type-id text-[10px] px-1 py-px rounded-sm ${active === tab.id ? 'bg-[var(--muted)] text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-end border-b border-[var(--border)] gap-0 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-1.5 h-9 px-4 type-body font-medium transition-colors duration-100 cursor-pointer
            border-b-2 -mb-px
            ${active === tab.id
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'}
          `}
        >
          {tab.icon && <span className="shrink-0">{tab.icon}</span>}
          {tab.label}
          {tab.badge !== undefined && (
            <span className={`type-id text-[10px] px-1.5 py-px rounded-full ${active === tab.id ? 'bg-[var(--secondary-bg)] text-[var(--primary)]' : 'bg-[var(--muted)] text-[var(--text-tertiary)]'}`}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
