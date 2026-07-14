import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/layout/Navigation';
import { MensajeDetalleModal } from '../features/mensajes/MensajeDetalleModal';
import { listarMensajes } from '../services/mensajes';
import { formatFechaHora } from '../utils/formatDate';
import type { MensajeContactoResponse, EstadoMensaje } from '../types/mensaje';

const variantePorEstado: Record<EstadoMensaje, 'default' | 'success' | 'info'> = {
  'Pendiente': 'default',
  'Leído': 'info',
  'Atendido': 'success',
};

const labelPorEstado: Record<EstadoMensaje, string> = {
  'Pendiente': 'No leído',
  'Leído': 'Leído',
  'Atendido': 'Atendido',
};

const tabs = [
  { id: 'todos', label: 'Todos' },
  { id: 'Pendiente', label: 'No leídos' },
  { id: 'Leído', label: 'Leídos' },
  { id: 'Atendido', label: 'Atendidos' },
];

export default function MensajesPage() {
  const [tabActiva, setTabActiva] = useState('todos');
  const [mensajes, setMensajes] = useState<MensajeContactoResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeAbierto, setMensajeAbierto] = useState<MensajeContactoResponse | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const resp = await listarMensajes(tabActiva === 'todos' ? undefined : (tabActiva as EstadoMensaje));
      setMensajes(resp.slice().sort((a, b) => b.fechaEnvio.localeCompare(a.fechaEnvio)));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActiva]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Mensajes de contacto</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Mensajes enviados por visitantes anónimos desde el sitio público.
        </p>
      </div>

      <Tabs tabs={tabs} active={tabActiva} onChange={setTabActiva} variant="pill" />

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando mensajes...</p>
      ) : mensajes.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">No hay mensajes en esta categoría.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {mensajes.map((m) => (
            <div
              key={m.idMensajeContacto}
              onClick={() => setMensajeAbierto(m)}
              className="cursor-pointer"
            >
              <Card className="hover:border-[var(--primary)] transition-colors">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Asunto</span>
                    <span className="type-body text-[var(--text-primary)] truncate">{m.asunto}</span>
                    <span className="type-caption text-[var(--text-tertiary)] truncate">
                      De: {m.nombreRemitente} ({m.correoElectronico})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="type-caption text-[var(--text-tertiary)]">Enviado</span>
                      <span className="type-body-sm text-[var(--text-secondary)]">{formatFechaHora(m.fechaEnvio)}</span>
                    </div>
                    <Badge variant={variantePorEstado[m.estado]} size="sm">{labelPorEstado[m.estado]}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {mensajeAbierto && (
        <MensajeDetalleModal
          open={Boolean(mensajeAbierto)}
          mensaje={mensajeAbierto}
          onClose={() => setMensajeAbierto(null)}
          onActualizado={cargar}
        />
      )}
    </div>
  );
}
