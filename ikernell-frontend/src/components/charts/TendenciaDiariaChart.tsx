import { Card, CardContent } from '../ui/Card';

export interface PuntoDiario {
  /** Etiqueta corta ya formateada, ej. "10 jul". */
  etiqueta: string;
  value: number;
}

interface TendenciaDiariaChartProps {
  titulo: string;
  datos: PuntoDiario[];
}

/** Barras verticales, mismo enfoque sin dependencias que DistribucionBarChart. */
export function TendenciaDiariaChart({ titulo, datos }: TendenciaDiariaChartProps) {
  const max = Math.max(1, ...datos.map((d) => d.value));
  const sinDatos = datos.every((d) => d.value === 0);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h4 className="type-label text-[var(--text-tertiary)]">{titulo}</h4>
        {sinDatos ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">Sin datos en este periodo.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-end gap-1.5 h-28 min-w-max">
              {datos.map((d) => (
                <div key={d.etiqueta} className="w-8 shrink-0 flex flex-col items-center justify-end gap-1 h-full">
                  <span className="type-id text-[var(--text-tertiary)]">{d.value > 0 ? d.value : ''}</span>
                  <div
                    className="w-full rounded-t-[var(--radius-sm)] bg-[var(--primary)] min-h-[2px]"
                    style={{ height: `${(d.value / max) * 100}%` }}
                    title={`${d.etiqueta}: ${d.value}`}
                  />
                  <span className="type-id text-[var(--text-tertiary)] text-[9px] whitespace-nowrap">{d.etiqueta}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
