import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, FolderKanban, Bug, GitBranch, MessageSquare, Info, CheckCheck } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/layout/Navigation';
import { listarMisNotificaciones, marcarNotificacionComoLeida } from '../services/notificaciones';
import type { NotificacionResponse, TipoNotificacion } from '../types/notificacion';

const iconoPorTipo: Record<TipoNotificacion, ReactNode> = {
  Actividad: <Activity size={16} className="text-[var(--info)]" />,
  Proyecto: <FolderKanban size={16} className="text-[var(--primary)]" />,
  Error: <Bug size={16} className="text-[var(--error)]" />,
  'Interrupción': <GitBranch size={16} className="text-[var(--warning)]" />,
  Mensaje: <MessageSquare size={16} className="text-[var(--info)]" />,
  Sistema: <Info size={16} className="text-[var(--text-tertiary)]" />,
};

const tabs = [
  { id: 'todas', label: 'Todas' },
  { id: 'no-leidas', label: 'No leídas' },
];

/** Reachable desde el link "Ver todas" del dropdown del campanito en el Topbar -- no está en el Sidebar a propósito, es utilidad personal, no un módulo de negocio. */
export default function NotificacionesPage() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('todas');
  const [notificaciones, setNotificaciones] = useState<NotificacionResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [marcandoTodas, setMarcandoTodas] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const resp = await listarMisNotificaciones();
      setNotificaciones(resp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const visibles = tabActiva === 'no-leidas' ? notificaciones.filter((n) => !n.leida) : notificaciones;
  const noLeidas = notificaciones.filter((n) => !n.leida);

  const alClicNotificacion = async (n: NotificacionResponse) => {
    if (!n.leida) {
      const actualizada = await marcarNotificacionComoLeida(n.idNotificacion);
      setNotificaciones((prev) => prev.map((x) => (x.idNotificacion === actualizada.idNotificacion ? actualizada : x)));
    }
    if (n.urlDestino) {
      navigate(n.urlDestino);
    }
  };

  const marcarTodasComoLeidas = async () => {
    setMarcandoTodas(true);
    try {
      await Promise.all(noLeidas.map((n) => marcarNotificacionComoLeida(n.idNotificacion)));
      await cargar();
    } finally {
      setMarcandoTodas(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="type-h1 text-[var(--text-primary)]">Notificaciones</h1>
          <p className="type-body text-[var(--text-secondary)] mt-1">
            Todo lo que se te ha notificado.
          </p>
        </div>
        {noLeidas.length > 0 && (
          <Button variant="outline" size="sm" onClick={marcarTodasComoLeidas} loading={marcandoTodas}>
            <CheckCheck size={14} />
            Marcar todas como leídas
          </Button>
        )}
      </div>

      <Tabs tabs={tabs} active={tabActiva} onChange={setTabActiva} variant="pill" />

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando notificaciones...</p>
      ) : visibles.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">
          {tabActiva === 'no-leidas' ? 'No tienes notificaciones sin leer.' : 'No tienes notificaciones.'}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {visibles.map((n) => (
            <div key={n.idNotificacion} onClick={() => alClicNotificacion(n)} className="cursor-pointer">
              <Card className={`hover:border-[var(--primary)] transition-colors ${n.leida ? '' : 'bg-[var(--secondary-bg)]'}`}>
                <CardContent className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5">{iconoPorTipo[n.tipo]}</span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="type-body text-[var(--text-primary)]">{n.titulo}</span>
                    {n.detalle && <span className="type-body-sm text-[var(--text-secondary)]">{n.detalle}</span>}
                    <span className="type-caption text-[var(--text-tertiary)] mt-1">{n.fechaCreacion}</span>
                  </div>
                  {!n.leida && <span className="size-2 rounded-full bg-[var(--primary)] shrink-0 mt-1.5" />}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
