import { Sun, Moon, Bell, Search, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Avatar } from '../ui/DataDisplay'
import { IconButton } from '../ui/Button'

interface TopbarProps {
  onMenuToggle?: () => void
  sidebarCollapsed?: boolean
}

export function Topbar({ }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-12 shrink-0 flex items-center gap-3 px-4 bg-[var(--surface)] border-b border-[var(--border)] z-30">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 mr-2">
        <div className="size-6 rounded-[var(--radius-sm)] bg-[var(--primary)] flex items-center justify-center">
          <span className="font-mono font-bold text-white text-[10px] tracking-tight">IK</span>
        </div>
        <span className="font-sans font-semibold text-[13px] text-[var(--text-primary)] hidden sm:block">IKernell</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="flex items-center gap-2 h-7 px-2.5 rounded-[var(--radius-md)] bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors cursor-text">
          <Search size={13} className="text-[var(--text-tertiary)] shrink-0" />
          <span className="type-body-sm text-[var(--text-tertiary)]">Buscar...</span>
          <span className="ml-auto type-id text-[var(--text-tertiary)] hidden sm:block">⌘K</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <IconButton
          label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {theme === 'dark'
            ? <Sun size={15} className="text-[var(--text-secondary)]" />
            : <Moon size={15} className="text-[var(--text-secondary)]" />}
        </IconButton>

        {/* Notifications */}
        <div className="relative">
          <IconButton label="Notificaciones" variant="ghost" size="sm">
            <Bell size={15} className="text-[var(--text-secondary)]" />
          </IconButton>
          <span className="absolute top-1 right-1 size-1.5 rounded-full bg-[var(--primary)]" />
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--border)] mx-1" />

        {/* User */}
        <button className="flex items-center gap-2 h-8 px-2 rounded-[var(--radius-md)] hover:bg-[var(--muted)] transition-colors cursor-pointer">
          <Avatar name="Carlos Méndez" size="xs" status="online" />
          <span className="type-body text-[var(--text-primary)] hidden sm:block">C. Méndez</span>
          <ChevronDown size={12} className="text-[var(--text-tertiary)]" />
        </button>
      </div>
    </header>
  )
}
