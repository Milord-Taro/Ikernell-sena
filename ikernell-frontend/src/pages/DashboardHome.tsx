import { useNavigate } from 'react-router-dom';
import { FolderKanban, Activity, Users, MessageSquare, BarChart3 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { CODIGO_ROL } from '../types/usuario';

interface AccesoRapido {
  label: string;
  to: string;
  icon: ReactNode;
}

const accesosPorRol: Record<string, AccesoRapido[]> = {
  [CODIGO_ROL.COORDINADOR]: [
    { label: 'Proyectos', to: '/dashboard/proyectos', icon: <FolderKanban size={16} /> },
    { label: 'Mensajes', to: '/dashboard/mensajes', icon: <MessageSquare size={16} /> },
    { label: 'Usuarios', to: '/dashboard/usuarios', icon: <Users size={16} /> },
    { label: 'Métricas', to: '/dashboard/metricas', icon: <BarChart3 size={16} /> },
  ],
  [CODIGO_ROL.LIDER_PROYECTO]: [
    { label: 'Proyectos', to: '/dashboard/proyectos', icon: <FolderKanban size={16} /> },
    { label: 'Mis actividades', to: '/dashboard/actividades', icon: <Activity size={16} /> },
    { label: 'Usuarios', to: '/dashboard/usuarios', icon: <Users size={16} /> },
  ],
  [CODIGO_ROL.DESARROLLADOR]: [
    { label: 'Mis actividades', to: '/dashboard/actividades', icon: <Activity size={16} /> },
    { label: 'Proyectos', to: '/dashboard/proyectos', icon: <FolderKanban size={16} /> },
  ],
};

/**
 * Bienvenida sutil de /dashboard -- las métricas (antes acá) se mudaron
 * a /dashboard/metricas (MetricasPage). Esta pantalla es deliberadamente
 * austera, igual que el resto del dashboard interno (la landing es la
 * que tiene "vida visual", no esto): el ícono "IK" reutiliza el mismo
 * badge del Topbar, con un glow tenue que respira y dos puntos que
 * orbitan lento en anillos delgados. Nada de gradientes ni color fuera
 * de la paleta ya establecida.
 */
export default function DashboardHome() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const accesos = usuario ? accesosPorRol[usuario.rol.codigoRol] ?? [] : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center">
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
        {/* Anillo exterior, más lento, sentido inverso */}
        <div className="absolute inset-0 rounded-full border border-[var(--divider)] ik-hero-orbita-lenta">
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-1.5 rounded-full bg-[var(--text-tertiary)]" />
        </div>

        {/* Anillo interior, más rápido */}
        <div className="absolute inset-[16px] rounded-full border border-[var(--border)] ik-hero-orbita">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-[var(--primary)]" />
        </div>

        {/* Ícono central -- mismo badge del Topbar, agrandado */}
        <div className="relative size-16 rounded-[var(--radius-lg)] bg-[var(--primary)] flex items-center justify-center ik-hero-icono">
          <span className="font-mono font-bold text-white text-xl tracking-tight">IK</span>
        </div>
      </div>

      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">
          Hola, {usuario?.nombres} 👋
        </h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          {usuario?.rol.nombreRol} · Bienvenido/a de vuelta a IKernell.
        </p>
      </div>

      {accesos.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {accesos.map((acceso) => (
            <div key={acceso.to} onClick={() => navigate(acceso.to)} className="cursor-pointer">
              <Card className="hover:border-[var(--primary)] transition-colors">
                <CardContent className="flex items-center gap-2 py-2.5 px-4">
                  <span className="text-[var(--primary)] shrink-0">{acceso.icon}</span>
                  <span className="type-body text-[var(--text-primary)] whitespace-nowrap">{acceso.label}</span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
