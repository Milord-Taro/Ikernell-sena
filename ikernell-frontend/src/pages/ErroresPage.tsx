import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/FormControls';
import { Alert } from '../components/ui/Feedback';
import { listarRegistrosError, cambiarEstadoRegistroError } from '../services/registrosError';
import { ESTADOS_REGISTRO_ERROR } from '../types/registroError';
import type { RegistroErrorResponse, EstadoRegistroError } from '../types/registroError';
import type { NivelCriticidad } from '../types/actividad';
import { ApiRequestError } from '../types/api';

const variantePorSeveridad: Record<NivelCriticidad, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

/**
 * Registrar un error se sigue haciendo desde "Mis actividades"
 * (ActividadHistorialModal). Esta vista es de supervisión para
 * Coordinador/Líder: pueden ver todo y también actualizar el estado
 * (Abierto/En progreso/Resuelto/Descartado) sin restricción de rol,
 * igual que desde la propia actividad.
 */
export default function ErroresPage() {
  const [registros, setRegistros] = useState<RegistroErrorResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const resp = await listarRegistrosError();
      setRegistros(resp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const alCambiarEstado = async (registro: RegistroErrorResponse, estado: string) => {
    setError(null);
    try {
      await cambiarEstadoRegistroError(registro.idRegistroError, estado as EstadoRegistroError);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="type-h3 text-[var(--text-primary)]">Errores</h2>
        <p className="type-body-sm text-[var(--text-tertiary)]">
          Todos los errores registrados, en cualquier proyecto.
        </p>
      </div>

      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando errores...</p>
      ) : registros.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no se han registrado errores.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {registros.map((r) => (
            <Card key={r.idRegistroError}>
              <CardContent className="flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Título</span>
                    <span className="type-body text-[var(--text-primary)]">{r.titulo}</span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Severidad</span>
                    <Badge variant={variantePorSeveridad[r.severidad]} size="sm">{r.severidad}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Proyecto</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.actividad.etapa.proyecto.nombreProyecto}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Etapa</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.actividad.etapa.nombreEtapa}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Actividad</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.actividad.nombreActividad}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Tipo de error</span>
                  <span className="type-body-sm text-[var(--text-secondary)]">{r.tipoError.nombreTipoError}</span>
                </div>

                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Descripción</span>
                  <p className="type-body-sm text-[var(--text-secondary)]">{r.descripcion}</p>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <span className="type-caption text-[var(--text-tertiary)]">Registrado: {r.fechaRegistro}</span>
                  <div className="w-40">
                    <Select
                      label="Estado"
                      value={r.estado}
                      onChange={(e) => alCambiarEstado(r, e.target.value)}
                    >
                      {ESTADOS_REGISTRO_ERROR.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
