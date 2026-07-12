import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  pagina: number;
  totalPaginas: number;
  onCambiar: (pagina: number) => void;
}

/**
 * "1 2 3 ... Siguiente" -- siempre muestra primera/última página, la
 * página actual con su vecindad inmediata, y "..." donde se salta el
 * resto. Con pocas páginas (<=7) simplemente las muestra todas.
 */
function construirPaginas(pagina: number, totalPaginas: number): (number | 'gap')[] {
  if (totalPaginas <= 7) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  const paginas = new Set<number>([1, totalPaginas, pagina, pagina - 1, pagina + 1]);
  const ordenadas = [...paginas].filter((p) => p >= 1 && p <= totalPaginas).sort((a, b) => a - b);

  const resultado: (number | 'gap')[] = [];
  ordenadas.forEach((p, i) => {
    if (i > 0 && p - ordenadas[i - 1] > 1) resultado.push('gap');
    resultado.push(p);
  });
  return resultado;
}

export function Pagination({ pagina, totalPaginas, onCambiar }: PaginationProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onCambiar(pagina - 1)}
        disabled={pagina === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} />
      </Button>

      {construirPaginas(pagina, totalPaginas).map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="type-body-sm text-[var(--text-tertiary)] px-1">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === pagina ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onCambiar(p)}
          >
            {p}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onCambiar(pagina + 1)}
        disabled={pagina === totalPaginas}
        aria-label="Página siguiente"
      >
        Siguiente
        <ChevronRight size={14} />
      </Button>
    </div>
  );
}
