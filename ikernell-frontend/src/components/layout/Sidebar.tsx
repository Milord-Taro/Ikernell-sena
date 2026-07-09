import { type ReactNode, useState } from 'react'
import {
  LayoutDashboard, FolderKanban, Bug, Layers, Users,
  Settings, ChevronLeft, ChevronRight, Activity, GitBranch,
} from 'lucide-react'
import { Badge } from '../ui/Badge'

interface NavItem {
  id: string
  label: string
  icon: ReactNode
  badge?: string | number
  badgeVariant?: 'default' | 'error' | 'warning' | 'success' | 'info' | 'muted'
  section?: string
}

const navItems: NavItem[] = [
  { id: 'dashboard',   label: 'Dashboard',    icon: <LayoutDashboard size={16} />, section: 'Principal' },
  { id: 'projects',    label: 'Proyectos',    icon: <FolderKanban    size={16} />, badge: 8 },
  { id: 'stages',      label: 'Etapas',       icon: <Layers          size={16} /> },
  { id: 'activities',  label: 'Actividades',  icon: <Activity        size={16} />, badge: 3, badgeVariant: 'info' },
  { id: 'errors',      label: 'Errores',      icon: <Bug             size={16} />, badge: 12, badgeVariant: 'error', section: 'Seguimiento' },
  { id: 'interruptions', label: 'Interrupciones', icon: <GitBranch   size={16} />, badge: 2, badgeVariant: 'warning' },
  { id: 'team',        label: 'Equipo',       icon: <Users           size={16} />, section: 'Administración' },
  { id: 'settings',    label: 'Configuración', icon: <Settings       size={16} /> },
]

interface SidebarProps {
  activeItem?: string
  onItemClick?: (id: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ activeItem = 'dashboard', onItemClick, collapsed: controlledCollapsed, onToggleCollapse }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = controlledCollapsed ?? internalCollapsed

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse()
    } else {
      setInternalCollapsed(c => !c)
    }
  }

  let lastSection: string | undefined

  return (
    <aside
      className={`flex flex-col bg-[var(--surface)] border-r border-[var(--border)] transition-all duration-200 shrink-0 ${collapsed ? 'w-14' : 'w-56'}`}
    >
      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {navItems.map(item => {
          const showSection = !collapsed && item.section && item.section !== lastSection
          if (item.section) lastSection = item.section

          return (
            <div key={item.id}>
              {showSection && (
                <div className="px-3 pt-4 pb-1.5">
                  <span className="type-label text-[var(--text-tertiary)]">{item.section}</span>
                </div>
              )}
              <button
                onClick={() => onItemClick?.(item.id)}
                title={collapsed ? item.label : undefined}
                className={`
                  w-full flex items-center gap-2.5 transition-colors duration-100 cursor-pointer
                  ${collapsed ? 'justify-center px-0 mx-2 w-10 h-9 rounded-[var(--radius-md)]' : 'h-8 px-3 mx-1.5 w-[calc(100%-12px)] rounded-[var(--radius-md)]'}
                  ${activeItem === item.id
                    ? 'bg-[var(--secondary-bg)] text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)]'}
                `}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="type-body flex-1 text-left truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <Badge variant={item.badgeVariant ?? 'muted'} size="sm">{item.badge}</Badge>
                    )}
                  </>
                )}
              </button>
            </div>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[var(--border)] p-2 shrink-0">
        <button
          onClick={handleToggle}
          className={`w-full flex items-center gap-2 h-8 px-2 rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed
            ? <ChevronRight size={15} />
            : <>
                <ChevronLeft size={15} />
                <span className="type-body-sm">Contraer</span>
              </>}
        </button>
      </div>
    </aside>
  )
}
