import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { listarInterrupciones } from '../services/interrupciones';
import type { InterrupcionResponse } from '../types/interrupcion';

/** Solo lectura -- registrar una interrupción se hace desde "Mis actividades" (ActividadHistorialModal). */
export default function InterrupcionesPage() {
  const [registros, setRegistros] = useState<InterrupcionResponse[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    listarInterrupciones()
      .then(setRegistros)
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="type-h3 text-[var(--text-primary)]">Interrupciones</h2>
        <p className="type-body-sm text-[var(--text-tertiary)]">
          Todas las interrupciones registradas, en cualquier proyecto.
        </p>
      </div>

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando interrupciones...</p>
      ) : registros.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no se han registrado interrupciones.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {registros.map((r) => (
            <Card key={r.idInterrupcion}>
              <CardContent className="flex flex-col gap-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  <span className="type-caption text-[var(--text-tertiary)]">Tipo de interrupción</span>
                  <span className="type-body-sm text-[var(--text-secondary)]">
                    {r.tipoInterrupcion.nombreTipoInterrupcion}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Motivo</span>
                  <p className="type-body-sm text-[var(--text-secondary)]">{r.motivo}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Duración</span>
                    <span className="type-body-sm text-[var(--text-secondary)]">{r.duracionMinutos} minutos</span>
                  </div>
                  <span className="type-caption text-[var(--text-tertiary)]">Registrado: {r.fechaRegistro}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
