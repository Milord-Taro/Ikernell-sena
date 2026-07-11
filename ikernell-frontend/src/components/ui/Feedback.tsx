import { type ReactNode, useState, useEffect } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Info, X, AlertCircle } from 'lucide-react'

/* ── Toast ───────────────────────────────────────────────────────────── */
type ToastVariant = 'success' | 'warning' | 'error' | 'info'

interface ToastProps {
  variant: ToastVariant
  title: string
  description?: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

const toastConfig: Record<ToastVariant, { icon: ReactNode; styles: string }> = {
  success: { icon: <CheckCircle2 size={15} />, styles: 'border-[var(--success-border)] text-[var(--success-fg)]' },
  warning: { icon: <AlertTriangle  size={15} />, styles: 'border-[var(--warning-border)] text-[var(--warning-fg)]' },
  error:   { icon: <XCircle        size={15} />, styles: 'border-[var(--error-border)] text-[var(--error-fg)]' },
  info:    { icon: <Info           size={15} />, styles: 'border-[var(--info-border)] text-[var(--info-fg)]' },
}

export function Toast({ variant, title, description, onClose, autoClose = false, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true)
  const cfg = toastConfig[variant]

  useEffect(() => {
    if (!autoClose) return
    const t = setTimeout(() => { setVisible(false); onClose?.() }, duration)
    return () => clearTimeout(t)
  }, [autoClose, duration, onClose])

  if (!visible) return null

  return (
    <div className={`flex items-start gap-3 bg-[var(--surface)] border rounded-[var(--radius-md)] px-4 py-3 shadow-sm min-w-[280px] max-w-sm ${cfg.styles}`}>
      <span className="mt-0.5 shrink-0">{cfg.icon}</span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="type-body font-medium text-[var(--text-primary)]">{title}</p>
        {description && <p className="type-body-sm text-[var(--text-secondary)]">{description}</p>}
      </div>
      {onClose && (
        <button onClick={() => { setVisible(false); onClose() }} className="shrink-0 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mt-0.5">
          <X size={13} />
        </button>
      )}
    </div>
  )
}

/* ── Alert Banner ────────────────────────────────────────────────────── */
type AlertVariant = 'success' | 'warning' | 'error' | 'info'

interface AlertProps {
  variant: AlertVariant
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

const alertConfig: Record<AlertVariant, { icon: ReactNode; bg: string; border: string; iconColor: string }> = {
  success: { icon: <CheckCircle2 size={15} />, bg: 'bg-[var(--success-bg)]', border: 'border-[var(--success-border)]', iconColor: 'text-[var(--success-fg)]' },
  warning: { icon: <AlertTriangle  size={15} />, bg: 'bg-[var(--warning-bg)]', border: 'border-[var(--warning-border)]', iconColor: 'text-[var(--warning-fg)]' },
  error:   { icon: <AlertCircle    size={15} />, bg: 'bg-[var(--error-bg)]',   border: 'border-[var(--error-border)]',   iconColor: 'text-[var(--error-fg)]' },
  info:    { icon: <Info           size={15} />, bg: 'bg-[var(--info-bg)]',    border: 'border-[var(--info-border)]',    iconColor: 'text-[var(--info-fg)]' },
}

export function Alert({ variant, title, children, onClose, className = '' }: AlertProps) {
  const cfg = alertConfig[variant]
  return (
    <div className={`flex gap-3 ${cfg.bg} ${cfg.border} border rounded-[var(--radius-md)] px-4 py-3.5 ${className}`}>
      <span className={`mt-0.5 shrink-0 ${cfg.iconColor}`}>{cfg.icon}</span>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {title && <p className="type-body font-semibold text-[var(--text-primary)]">{title}</p>}
        <div className="type-body-sm text-[var(--text-secondary)]">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mt-0.5">
          <X size={13} />
        </button>
      )}
    </div>
  )
}

/* ── Confirm Dialog ──────────────────────────────────────────────────── */
interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 w-full max-w-sm shadow-lg flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="type-h4 text-[var(--text-primary)]">{title}</p>
          {description && <p className="type-body-sm text-[var(--text-secondary)]">{description}</p>}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="h-8 px-3.5 text-[0.9286rem] font-sans font-medium rounded-[var(--radius-md)] border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`h-8 px-3.5 text-[0.9286rem] font-sans font-medium rounded-[var(--radius-md)] text-white transition-colors ${variant === 'destructive' ? 'bg-[var(--error)] hover:bg-red-700' : 'bg-[var(--primary)] hover:bg-[var(--primary-hover)]'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
