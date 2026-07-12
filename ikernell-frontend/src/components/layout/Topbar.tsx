import { useState, useRef, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sun, Moon, Bell, Search, ChevronDown, LogOut, User, Menu,
  Activity, FolderKanban, Bug, GitBranch, MessageSquare, Info,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Avatar } from '../ui/DataDisplay'
import { IconButton } from '../ui/Button'
import { listarMisNotificaciones, marcarNotificacionComoLeida } from '../../services/notificaciones'
import type { UsuarioResponse } from '../../types/usuario'
import type { NotificacionResponse, TipoNotificacion } from '../../types/notificacion'

interface TopbarProps {
  usuario: UsuarioResponse | null
  onLogout: () => void
  /** Mobile (< md): abre el drawer del Sidebar. En md+ no se usa (el Sidebar ya está fijo). */
  onAbrirMenuMobile?: () => void
}

const iconoPorTipo: Record<TipoNotificacion, ReactNode> = {
  Actividad: <Activity size={14} className="text-[var(--info)]" />,
  Proyecto: <FolderKanban size={14} className="text-[var(--primary)]" />,
  Error: <Bug size={14} className="text-[var(--error)]" />,
  'Interrupción': <GitBranch size={14} className="text-[var(--warning)]" />,
  Mensaje: <MessageSquare size={14} className="text-[var(--info)]" />,
  Sistema: <Info size={14} className="text-[var(--text-tertiary)]" />,
}

/** Polling simple cada 45s -- no hay websockets en el proyecto, esto basta para mantener el conteo razonablemente fresco. */
const INTERVALO_POLLING_MS = 45_000

export function Topbar({ usuario, onLogout, onAbrirMenuMobile }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const [notificaciones, setNotificaciones] = useState<NotificacionResponse[]>([])
  const [notifAbierto, setNotifAbierto] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const noLeidas = notificaciones.filter((n) => !n.leida).length

  useEffect(() => {
    const alClicFuera = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAbierto(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifAbierto(false)
      }
    }
    document.addEventListener('mousedown', alClicFuera)
    return () => document.removeEventListener('mousedown', alClicFuera)
  }, [])

  useEffect(() => {
    if (!usuario) return

    const cargar = () => {
      listarMisNotificaciones().then(setNotificaciones).catch(() => {})
    }

    cargar()
    const id = setInterval(cargar, INTERVALO_POLLING_MS)
    return () => clearInterval(id)
  }, [usuario])

  const alClicNotificacion = async (notificacion: NotificacionResponse) => {
    if (!notificacion.leida) {
      try {
        const actualizada = await marcarNotificacionComoLeida(notificacion.idNotificacion)
        setNotificaciones((prev) =>
          prev.map((n) => (n.idNotificacion === actualizada.idNotificacion ? actualizada : n)),
        )
      } catch {
        // Si falla el marcado, igual navegamos -- no bloquear la acción principal por esto.
      }
    }
    setNotifAbierto(false)
    if (notificacion.urlDestino) {
      navigate(notificacion.urlDestino)
    }
  }

  const nombreCompleto = usuario ? `${usuario.nombres} ${usuario.apellidos}` : ''
  const nombreCorto = usuario ? `${usuario.nombres.split(' ')[0]} ${usuario.apellidos.split(' ')[0][0]}.` : ''

  return (
    <header className="h-12 shrink-0 flex items-center gap-3 px-4 bg-[var(--surface)] border-b border-[var(--border)] z-30">
      <IconButton
        label="Abrir menú"
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={onAbrirMenuMobile}
      >
        <Menu size={17} className="text-[var(--text-secondary)]" />
      </IconButton>

      <div className="flex items-center gap-2 mr-2">
        <div className="size-6 rounded-[var(--radius-sm)] bg-[var(--primary)] flex items-center justify-center">
          <span className="font-mono font-bold text-white text-[0.7143rem] tracking-tight">IK</span>
        </div>
        <span className="font-sans font-semibold text-[0.9286rem] text-[var(--text-primary)] hidden sm:block">IKernell</span>
      </div>

      <div className="flex-1 max-w-xs">
        <button
          onClick={() => window.dispatchEvent(new Event('ikernell-abrir-busqueda'))}
          className="w-full flex items-center gap-2 h-7 px-2.5 rounded-[var(--radius-md)] bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors cursor-text"
        >
          <Search size={13} className="text-[var(--text-tertiary)] shrink-0" />
          <span className="type-body-sm text-[var(--text-tertiary)]">Buscar...</span>
          <span className="ml-auto type-id text-[var(--text-tertiary)] hidden sm:block">⌘K</span>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
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

        <div className="relative" ref={notifRef}>
          <IconButton
            label="Notificaciones"
            variant="ghost"
            size="sm"
            onClick={() => setNotifAbierto((v) => !v)}
          >
            <Bell size={15} className="text-[var(--text-secondary)]" />
          </IconButton>
          {noLeidas > 0 && (
            <span className="absolute top-1 right-1 min-w-[14px] h-[14px] px-[3px] flex items-center justify-center rounded-full bg-[var(--primary)] text-white text-[0.6429rem] font-medium leading-none">
              {noLeidas > 9 ? '9+' : noLeidas}
            </span>
          )}

          {notifAbierto && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg py-1 z-40 max-h-96 overflow-y-auto">
              <div className="px-3 py-2 border-b border-[var(--border)] flex items-center justify-between">
                <span className="type-body text-[var(--text-primary)] font-medium">Notificaciones</span>
                {noLeidas > 0 && (
                  <span className="type-caption text-[var(--text-tertiary)]">{noLeidas} sin leer</span>
                )}
              </div>

              {notificaciones.length === 0 ? (
                <p className="type-body-sm text-[var(--text-tertiary)] px-3 py-6 text-center">
                  No tienes notificaciones.
                </p>
              ) : (
                notificaciones.map((n) => (
                  <button
                    key={n.idNotificacion}
                    onClick={() => alClicNotificacion(n)}
                    className={`w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-[var(--muted)] transition-colors border-b border-[var(--border)] last:border-b-0 ${
                      n.leida ? '' : 'bg-[var(--secondary-bg)]'
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">{iconoPorTipo[n.tipo]}</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="type-body-sm text-[var(--text-primary)] truncate">{n.titulo}</span>
                      {n.detalle && (
                        <span className="type-caption text-[var(--text-tertiary)] line-clamp-2">{n.detalle}</span>
                      )}
                      <span className="type-caption text-[var(--text-tertiary)] mt-0.5">{n.fechaCreacion}</span>
                    </div>
                    {!n.leida && <span className="size-1.5 rounded-full bg-[var(--primary)] shrink-0 mt-1.5" />}
                  </button>
                ))
              )}

              <button
                onClick={() => {
                  setNotifAbierto(false)
                  navigate('/dashboard/notificaciones')
                }}
                className="w-full px-3 py-2 type-body-sm text-[var(--primary)] hover:bg-[var(--muted)] transition-colors border-t border-[var(--border)] text-center"
              >
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-[var(--border)] mx-1" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAbierto((v) => !v)}
            className="flex items-center gap-2 h-8 px-2 rounded-[var(--radius-md)] hover:bg-[var(--muted)] transition-colors cursor-pointer"
          >
            <Avatar name={nombreCompleto || '?'} size="xs" status="online" />
            <span className="type-body text-[var(--text-primary)] hidden sm:block">{nombreCorto}</span>
            <ChevronDown size={12} className="text-[var(--text-tertiary)]" />
          </button>

          {menuAbierto && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg py-1 z-40">
              <div className="px-3 py-2 border-b border-[var(--border)]">
                <p className="type-body text-[var(--text-primary)] font-medium truncate">{nombreCompleto}</p>
                <p className="type-body-sm text-[var(--text-tertiary)] truncate">{usuario?.correoElectronico}</p>
                <p className="type-caption text-[var(--text-tertiary)] mt-0.5">{usuario?.rol.nombreRol}</p>
              </div>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 type-body text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => {
                  setMenuAbierto(false)
                  navigate('/dashboard/configuracion')
                }}
              >
                <User size={14} />
                Mi perfil
              </button>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 type-body text-[var(--error)] hover:bg-[var(--error-bg)] transition-colors"
                onClick={onLogout}
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
