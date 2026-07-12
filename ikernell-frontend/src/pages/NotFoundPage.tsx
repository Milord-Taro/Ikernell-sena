import { useNavigate } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';

/**
 * Catch-all: se monta tanto fuera del dashboard (ruta "/*" a nivel raíz,
 * sin sidebar) como dentro de él (ruta "/dashboard/*" anidada, dentro del
 * <Outlet> de DashboardLayout) -- por eso no asume login ni chrome propio.
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-24">
      <CompassIcon size={40} className="text-[var(--text-tertiary)]" />
      <div className="flex flex-col gap-1">
        <h1 className="type-h2 text-[var(--text-primary)]">Página no encontrada</h1>
        <p className="type-body text-[var(--text-secondary)]">
          La página que buscas no existe o fue movida.
        </p>
      </div>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </div>
  );
}
