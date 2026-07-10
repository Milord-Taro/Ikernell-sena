import { useEffect, useRef, useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Feedback';
import {
  descargarReporteActividades,
  descargarReporteInterrupciones,
  FORMATOS_REPORTE,
} from '../../services/reportes';
import type { FormatoReporte } from '../../services/reportes';

interface MenuDescargaProps {
  titulo: string;
  onDescargar: (formato: FormatoReporte) => Promise<void>;
}

function MenuDescarga({ titulo, onDescargar }: MenuDescargaProps) {
  const [abierto, setAbierto] = useState(false);
  const [descargando, setDescargando] = useState<FormatoReporte | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alClicFuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener('mousedown', alClicFuera);
    return () => document.removeEventListener('mousedown', alClicFuera);
  }, []);

  const alElegir = async (formato: FormatoReporte) => {
    setDescargando(formato);
    try {
      await onDescargar(formato);
    } finally {
      setDescargando(null);
      setAbierto(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <Button variant="outline" size="sm" onClick={() => setAbierto((a) => !a)}>
        <Download size={14} />
        {titulo}
        <ChevronDown size={13} />
      </Button>

      {abierto && (
        <div className="absolute right-0 mt-1 w-36 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg z-20">
          {FORMATOS_REPORTE.map((formato) => (
            <button
              key={formato}
              onClick={() => alElegir(formato)}
              disabled={descargando !== null}
              className="w-full text-left px-3 py-1.5 type-body-sm text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors disabled:opacity-50"
            >
              {descargando === formato ? 'Generando...' : formato}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ReportesProyectoProps {
  idProyecto: number;
}

/**
 * Solo Líder de Proyecto (backend: ReporteController tiene @PreAuthorize
 * a nivel de clase, solo LIDER_PROYECTO -- ni Coordinador puede generar
 * reportes, así lo dice el caso de estudio original).
 */
export function ReportesProyecto({ idProyecto }: ReportesProyectoProps) {
  const [error, setError] = useState<string | null>(null);

  const manejar = (fn: (id: number, formato: FormatoReporte) => Promise<void>) => async (formato: FormatoReporte) => {
    setError(null);
    try {
      await fn(idProyecto, formato);
    } catch {
      setError('No se pudo generar el reporte. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col gap-2 items-end">
      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}
      <div className="flex items-center gap-2">
        <MenuDescarga titulo="Reporte de actividades" onDescargar={manejar(descargarReporteActividades)} />
        <MenuDescarga titulo="Reporte de interrupciones" onDescargar={manejar(descargarReporteInterrupciones)} />
      </div>
    </div>
  );
}
