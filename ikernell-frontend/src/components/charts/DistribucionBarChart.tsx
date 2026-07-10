import { Card, CardContent } from '../ui/Card';

export interface BarraDato {
  label: string;
  value: number;
  colorVar: string;
}

interface DistribucionBarChartProps {
  titulo: string;
  datos: BarraDato[];
}

/**
 * Barras horizontales simples con CSS (sin librería de gráficas, sin
 * dependencias nuevas) -- suficiente para distribuciones de 4-5
 * categorías. Ancho de la barra proporcional al máximo del set.
 */
export function DistribucionBarChart({ titulo, datos }: DistribucionBarChartProps) {
  const max = Math.max(1, ...datos.map((d) => d.value));

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h4 className="type-label text-[var(--text-tertiary)]">{titulo}</h4>
        {datos.every((d) => d.value === 0) ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">Sin datos todavía.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {datos.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="type-caption text-[var(--text-secondary)] w-24 shrink-0 truncate">{d.label}</span>
                <div className="flex-1 h-4 rounded-[var(--radius-sm)] bg-[var(--muted)] overflow-hidden">
                  <div
                    className="h-full rounded-[var(--radius-sm)] transition-[width] duration-300"
                    style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.colorVar }}
                  />
                </div>
                <span className="type-id text-[var(--text-secondary)] w-6 text-right shrink-0">{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
