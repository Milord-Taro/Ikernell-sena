import type { ReactNode } from 'react';
import { Bug, GitBranch, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export type TipoFeed = 'error' | 'interrupcion' | 'mensaje';

export interface ItemFeed {
  id: string;
  tipo: TipoFeed;
  titulo: string;
  detalle: string;
  fecha: string;
}

const iconoPorTipo: Record<TipoFeed, ReactNode> = {
  error: <Bug size={14} className="text-[var(--error)]" />,
  interrupcion: <GitBranch size={14} className="text-[var(--warning)]" />,
  mensaje: <MessageSquare size={14} className="text-[var(--info)]" />,
};

interface FeedActividadRecienteProps {
  items: ItemFeed[];
}

/** Mezcla errores + interrupciones (+ mensajes para Coordinador), ya ordenados por fecha desc. */
export function FeedActividadReciente({ items }: FeedActividadRecienteProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h4 className="type-label text-[var(--text-tertiary)]">Actividad reciente</h4>
        {items.length === 0 ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">Nada reciente por ahora.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5">{iconoPorTipo[item.tipo]}</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="type-body-sm text-[var(--text-primary)] truncate">{item.titulo}</span>
                  <span className="type-caption text-[var(--text-tertiary)] truncate">{item.detalle}</span>
                </div>
                <span className="type-caption text-[var(--text-tertiary)] shrink-0 whitespace-nowrap">
                  {item.fecha}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
