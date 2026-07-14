import { useEffect, useState } from 'react';
import { formatFecha } from '../../utils/formatDate';
import { Badge } from '../../components/ui/Badge';
import { listarEtapasPorProyecto } from '../../services/etapas';
import type { EtapaResponse, EstadoEtapa } from '../../types/etapa';

const variantePorEstado: Record<EstadoEtapa, 'default' | 'success' | 'info'> = {
  'Pendiente': 'default',
  'En ejecución': 'info',
  'Finalizada': 'success',
};

const colorPunto: Record<EstadoEtapa, string> = {
  'Pendiente': 'var(--text-tertiary)',
  'En ejecución': 'var(--info)',
  'Finalizada': 'var(--success)',
};

interface TimelineProyectoProps {
  idProyecto: number;
}

/**
 * Fase 13 (Valor Agregado) -- checklist original de Fase 7 lo dejó
 * pendiente ("Timeline visual... no bloqueante"). Vertical, ordenada por
 * 'orden' de la etapa, punto de color según estado, línea conectora.
 */
export function TimelineProyecto({ idProyecto }: TimelineProyectoProps) {
  const [etapas, setEtapas] = useState<EtapaResponse[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    listarEtapasPorProyecto(idProyecto)
      .then((resp) => setEtapas(resp.slice().sort((a, b) => a.orden - b.orden)))
      .finally(() => setCargando(false));
  }, [idProyecto]);

  if (cargando) {
    return <p className="type-body-sm text-[var(--text-tertiary)]">Cargando timeline...</p>;
  }

  if (etapas.length === 0) {
    return (
      <p className="type-body-sm text-[var(--text-tertiary)]">
        Este proyecto todavía no tiene etapas registradas.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {etapas.map((etapa, indice) => (
        <div key={etapa.idEtapa} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className="size-3 rounded-full shrink-0 mt-1.5"
              style={{ backgroundColor: colorPunto[etapa.estado] }}
            />
            {indice < etapas.length - 1 && (
              <span className="w-px flex-1 bg-[var(--border)] my-1" />
            )}
          </div>

          <div className="flex flex-col gap-1 pb-6 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="type-body text-[var(--text-primary)]">{etapa.nombreEtapa}</span>
              <Badge variant={variantePorEstado[etapa.estado]} size="sm">{etapa.estado}</Badge>
            </div>
            <span className="type-caption text-[var(--text-tertiary)]">
              {etapa.codigoEtapa} · Orden {etapa.orden}
            </span>
            <span className="type-body-sm text-[var(--text-secondary)]">
              {formatFecha(etapa.fechaInicio)} → {formatFecha(etapa.fechaFin)}
            </span>
            {etapa.descripcion && (
              <p className="type-body-sm text-[var(--text-tertiary)]">{etapa.descripcion}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
