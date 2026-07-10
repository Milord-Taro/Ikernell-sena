import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/DashboardHome';
import CatalogosPage from './pages/CatalogosPage';
import UsuariosPage from './pages/UsuariosPage';
import ProyectosPage from './pages/ProyectosPage';
import ProyectoDetallePage from './pages/ProyectoDetallePage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { RoleRoute } from './routes/RoleRoute';
import { CODIGO_ROL } from './types/usuario';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />

        <Route
          path="catalogos"
          element={
            <RoleRoute rolesPermitidos={[CODIGO_ROL.COORDINADOR]}>
              <CatalogosPage />
            </RoleRoute>
          }
        />

        <Route
          path="usuarios"
          element={
            <RoleRoute rolesPermitidos={[CODIGO_ROL.COORDINADOR, CODIGO_ROL.LIDER_PROYECTO]}>
              <UsuariosPage />
            </RoleRoute>
          }
        />

        {/* Proyectos: GET es abierto a cualquier autenticado en el
            backend, así que la lista/detalle NO va envuelta en RoleRoute
            -- las acciones de escritura (crear/editar/equipo) se ocultan
            dentro de cada componente según el rol, y el backend valida
            ownership real en el momento de escribir. */}
        <Route path="proyectos" element={<ProyectosPage />} />
        <Route path="proyectos/:idProyecto" element={<ProyectoDetallePage />} />

        {/* Fase 7+: etapas, actividades, errores, interrupciones */}
      </Route>
    </Routes>
  );
}

export default App;
