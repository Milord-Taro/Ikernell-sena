import { FolderKanban, Activity, Bug, Users } from 'lucide-react';
import { MetricCard } from '../components/ui/DataDisplay';
import { useAuth } from '../context/AuthContext';

export default function DashboardHome() {
  const { usuario } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">
          Hola, {usuario?.nombres} 👋
        </h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          {usuario?.rol.nombreRol} · Esto es lo que está pasando en tus proyectos hoy.
        </p>
      </div>

      {/* TODO Fase 5+: reemplazar estos valores fijos por datos reales de
          /api/proyectos, /api/actividades, /api/registros-error una vez
          construyamos esas pantallas. Por ahora confirma que el layout y
          la sesión funcionan de punta a punta. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Proyectos activos" value={0} icon={<FolderKanban size={15} />} />
        <MetricCard label="Actividades pendientes" value={0} icon={<Activity size={15} />} />
        <MetricCard label="Errores abiertos" value={0} icon={<Bug size={15} />} />
        <MetricCard label="Equipo" value={0} icon={<Users size={15} />} />
      </div>
    </div>
  );
}
