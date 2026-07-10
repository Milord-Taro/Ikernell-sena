import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { listarRegistrosError } from '../services/registrosError';
import type { RegistroErrorResponse } from '../types/registroError';
import type { NivelCriticidad } from '../types/actividad';

const variantePorSeveridad: Record<NivelCriticidad, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

/** Solo lectura -- registrar un error se hace desde "Mis actividades" (ActividadHistorialModal). */
export default function ErroresPage() {
  const [registros, setRegistros] = useState<RegistroErrorResponse[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    listarRegistrosError()
      .then(setRegistros)
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="type-h3 text-[var(--text-primary)]">Errores</h2>
        <p className="type-body-sm text-[var(--text-tertiary)]">
          Todos los errores registrados, en cualquier proyecto.
        </p>
      </div>

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

                <span className="type-caption text-[var(--text-tertiary)]">Registrado: {r.fechaRegistro}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
