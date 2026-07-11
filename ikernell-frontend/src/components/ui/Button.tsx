import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-1.5 font-sans font-medium transition-colors duration-100 focus-ring select-none cursor-pointer disabled:cursor-not-allowed whitespace-nowrap'

const sizes: Record<ButtonSize, string> = {
  sm:  'h-7  px-3   text-[0.8571rem] tracking-[0.01em]',
  md:  'h-8  px-3.5 text-[0.9286rem]',
  lg:  'h-9  px-4   text-[1rem]',
}

const radius = 'rounded-[var(--radius-md)]'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)] disabled:bg-[var(--border)] disabled:text-[var(--text-tertiary)]',
  secondary:
    'bg-[var(--secondary-bg)] text-[var(--secondary-fg)] hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] disabled:opacity-40',
  outline:
    'border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--muted)] hover:border-[var(--text-tertiary)] disabled:opacity-40',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)] disabled:opacity-40',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${radius} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={13} className="animate-spin" />}
      {children}
    </button>
  )
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  label: string
  children: ReactNode
}

export function IconButton({
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled,
  label,
  children,
  className = '',
  ...props
}: IconButtonProps) {
  const iconSizes: Record<ButtonSize, string> = {
    sm: 'size-7',
    md: 'size-8',
    lg: 'size-9',
  }
  return (
    <button
      aria-label={label}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center transition-colors duration-100 focus-ring cursor-pointer disabled:cursor-not-allowed ${radius} ${iconSizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : children}
    </button>
  )
}
