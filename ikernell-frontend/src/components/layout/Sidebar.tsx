import { type ReactNode, useState } from 'react'
import {
  LayoutDashboard, FolderKanban, Bug, Layers, Users,
  Settings, ChevronLeft, ChevronRight, Activity, GitBranch, BookMarked,
} from 'lucide-react'
import { Badge } from '../ui/Badge'
import { CODIGO_ROL } from '../../types/usuario'

interface NavItem {
  id: string
  label: string
  icon: ReactNode
  badge?: string | number
  badgeVariant?: 'default' | 'error' | 'warning' | 'success' | 'info' | 'muted'
  section?: string
  /** Si no se especifica, el ítem es visible para cualquier rol autenticado. */
  rolesPermitidos?: string[]
}

const navItems: NavItem[] = [
  { id: 'dashboard',   label: 'Dashboard',    icon: <LayoutDashboard size={16} />, section: 'Principal' },
  { id: 'proyectos',   label: 'Proyectos',    icon: <FolderKanban    size={16} /> },
  { id: 'etapas',      label: 'Etapas',       icon: <Layers          size={16} /> },
  { id: 'actividades', label: 'Actividades',  icon: <Activity        size={16} /> },
  { id: 'errores',     label: 'Errores',      icon: <Bug             size={16} />, section: 'Seguimiento' },
  { id: 'interrupciones', label: 'Interrupciones', icon: <GitBranch  size={16} /> },
  {
    id: 'usuarios', label: 'Usuarios', icon: <Users size={16} />, section: 'Administración',
    rolesPermitidos: [CODIGO_ROL.COORDINADOR, CODIGO_ROL.LIDER_PROYECTO],
  },
  {
    id: 'catalogos', label: 'Catálogos', icon: <BookMarked size={16} />,
    rolesPermitidos: [CODIGO_ROL.COORDINADOR],
  },
  { id: 'configuracion', label: 'Configuración', icon: <Settings size={16} /> },
]

interface SidebarProps {
  activeItem?: string
  onItemClick?: (id: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  /** Código del rol del usuario logueado (rol.codigoRol) -- filtra los ítems. */
  rolUsuario?: string
}

export function Sidebar({
  activeItem = 'dashboard',
  onItemClick,
  collapsed: controlledCollapsed,
  onToggleCollapse,
  rolUsuario,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = controlledCollapsed ?? internalCollapsed

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse()
    } else {
      setInternalCollapsed((c) => !c)
    }
  }

  const itemsVisibles = navItems.filter(
    (item) => !item.rolesPermitidos || (rolUsuario && item.rolesPermitidos.includes(rolUsuario)),
  )

  let lastSection: string | undefined

  return (
    <aside
      className={`flex flex-col bg-[var(--surface)] border-r border-[var(--border)] transition-all duration-200 shrink-0 ${collapsed ? 'w-14' : 'w-56'}`}
    >
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {itemsVisibles.map((item) => {
          const showSection = !collapsed && item.section && item.section !== lastSection
          if (item.section) lastSection = item.section
          const isActive = activeItem === item.id

          return (
            <div key={item.id}>
              {showSection && (
                <p className="px-3 mt-4 mb-1.5 type-label text-[var(--text-tertiary)]">{item.section}</p>
              )}
              <button
                onClick={() => onItemClick?.(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 mx-1.5 rounded-[var(--radius-md)] transition-colors ${
                  isActive
                    ? 'bg-[var(--secondary-bg)] text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="type-body flex-1 text-left truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <Badge variant={item.badgeVariant ?? 'default'} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            </div>
          )
        })}
      </nav>

      <button
        onClick={handleToggle}
        className="flex items-center justify-center h-9 border-t border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors"
        aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
      </button>
    </aside>
  )
}
