import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { useAuth } from '../context/AuthContext';

export function DashboardLayout() {
  const [colapsado, setColapsado] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, cerrarSesion } = useAuth();

  // "/dashboard" -> 'dashboard'; "/dashboard/proyectos" -> 'proyectos'
  const segmentos = location.pathname.split('/').filter(Boolean);
  const idActivo = segmentos[1] ?? 'dashboard';

  const manejarClicItem = (id: string) => {
    navigate(id === 'dashboard' ? '/dashboard' : `/dashboard/${id}`);
  };

  const manejarLogout = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      <Sidebar
        activeItem={idActivo}
        onItemClick={manejarClicItem}
        collapsed={colapsado}
        onToggleCollapse={() => setColapsado((c) => !c)}
        rolUsuario={usuario?.rol.codigoRol}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar usuario={usuario} onLogout={manejarLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
