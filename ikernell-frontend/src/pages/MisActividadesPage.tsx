import { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/FormControls';
import { Alert } from '../components/ui/Feedback';
import { useAuth } from '../context/AuthContext';
import { ApiRequestError } from '../types/api';
import { listarActividadesPorUsuario, cambiarEstadoActividad } from '../services/actividades';
import { ESTADOS_ACTIVIDAD_SELECCIONABLES } from '../types/actividad';
import type { ActividadResponse, EstadoActividad } from '../types/actividad';
import { ActividadHistorialModal } from '../features/registros/ActividadHistorialModal';

const variantePorPrioridad: Record<string, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

/**
 * REGLA DE NEGOCIO: no asumir que el usuario entiende qué representa
 * cada dato solo por su posición visual. Cada valor va precedido de una
 * etiqueta textual explícita (Proyecto, Etapa, Descripción, Prioridad,
 * Plazo, Estado) -- alguien nuevo en el sistema no debería tener que
 * adivinar qué es "Levantamiento de requerimientos".
 */
export default function MisActividadesPage() {
  const { usuario } = useAuth();
  const [actividades, setActividades] = useState<ActividadResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actividadHistorial, setActividadHistorial] = useState<ActividadResponse | null>(null);

  const cargar = async () => {
    if (!usuario) return;
    setCargando(true);
    try {
      const resp = await listarActividadesPorUsuario(usuario.idUsuario);
      setActividades(resp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.idUsuario]);

  const alCambiarEstado = async (actividad: ActividadResponse, estado: string) => {
    setError(null);
    try {
      await cambiarEstadoActividad(actividad.idActividad, estado as EstadoActividad);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="type-h3 text-[var(--text-primary)]">Mis actividades</h2>
        <p className="type-body-sm text-[var(--text-tertiary)]">
          Todo lo que tienes asignado, en cualquier proyecto.
        </p>
      </div>

      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando actividades...</p>
      ) : actividades.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">
          No tienes actividades asignadas por ahora.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {actividades.map((actividad) => (
            <Card key={actividad.idActividad}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Actividad</span>
                    <span className="type-body text-[var(--text-primary)]">{actividad.nombreActividad}</span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Prioridad</span>
                    <Badge variant={variantePorPrioridad[actividad.prioridad]} size="sm">
                      {actividad.prioridad}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Proyecto</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {actividad.etapa.proyecto.nombreProyecto}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Etapa</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {actividad.etapa.nombreEtapa}
                    </span>
                  </div>
                </div>

                {actividad.descripcion && (
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Descripción</span>
                    <p className="type-body-sm text-[var(--text-secondary)]">{actividad.descripcion}</p>
                  </div>
                )}

                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Plazo</span>
                    <span className="type-body-sm text-[var(--text-secondary)]">
                      {actividad.fechaInicio} → {actividad.fechaFin}
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="w-44">
                      <Select
                        label="Estado"
                        value={actividad.estado}
                        disabled={actividad.etapa.proyecto.estado !== 'En ejecución'}
                        hint={
                          actividad.etapa.proyecto.estado !== 'En ejecución'
                            ? `Proyecto en "${actividad.etapa.proyecto.estado}" -- no se puede ejecutar.`
                            : undefined
                        }
                        onChange={(e) => alCambiarEstado(actividad, e.target.value)}
                      >
                        {ESTADOS_ACTIVIDAD_SELECCIONABLES.map((estado) => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </Select>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActividadHistorial(actividad)}>
                      <History size={14} />
                      Historial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {actividadHistorial && (
        <ActividadHistorialModal
          open={Boolean(actividadHistorial)}
          actividad={actividadHistorial}
          onClose={() => setActividadHistorial(null)}
        />
      )}
    </div>
  );
}
