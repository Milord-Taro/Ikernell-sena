import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface ItemRanking {
  id: number;
  label: string;
  value: number;
}

interface RankingListProps {
  titulo: string;
  items: ItemRanking[];
  emptyMessage?: string;
}

/** Top N ya ordenado por quien llama -- este componente solo renderiza. */
export function RankingList({ titulo, items, emptyMessage = 'Sin datos todavía.' }: RankingListProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h4 className="type-label text-[var(--text-tertiary)]">{titulo}</h4>
        {items.length === 0 ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">{emptyMessage}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-2.5">
                <span className="type-caption text-[var(--text-tertiary)] w-4 shrink-0">{i + 1}</span>
                <span className="type-body-sm text-[var(--text-primary)] truncate flex-1">{item.label}</span>
                <Badge variant={item.value > 0 ? 'error' : 'default'} size="sm">{item.value}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
