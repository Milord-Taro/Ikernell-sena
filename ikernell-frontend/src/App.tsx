import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/DashboardHome';
import MetricasPage from './pages/MetricasPage';
import CatalogosPage from './pages/CatalogosPage';
import UsuariosPage from './pages/UsuariosPage';
import ProyectosPage from './pages/ProyectosPage';
import ProyectoDetallePage from './pages/ProyectoDetallePage';
import MisActividadesPage from './pages/MisActividadesPage';
import ErroresPage from './pages/ErroresPage';
import InterrupcionesPage from './pages/InterrupcionesPage';
import MensajesPage from './pages/MensajesPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
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

        {/* Abierta a cualquier autenticado, igual que Proyectos/Actividades
            -- los 3 roles tienen algo que ver aquí eventualmente. */}
        <Route path="metricas" element={<MetricasPage />} />

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

        {/* Vista global "mis actividades": abierta a cualquier autenticado,
            igual que Proyectos -- un Líder también puede tener actividades
            asignadas si quedó como desarrollador de otro proyecto. */}
        <Route path="actividades" element={<MisActividadesPage />} />

        {/* Solo lectura, pensadas para supervisión de Coordinador/Líder --
            el Desarrollador registra y ve las suyas desde "Mis
            actividades" (ActividadHistorialModal), no necesita esta
            vista global. */}
        <Route
          path="errores"
          element={
            <RoleRoute rolesPermitidos={[CODIGO_ROL.COORDINADOR, CODIGO_ROL.LIDER_PROYECTO]}>
              <ErroresPage />
            </RoleRoute>
          }
        />
        <Route
          path="interrupciones"
          element={
            <RoleRoute rolesPermitidos={[CODIGO_ROL.COORDINADOR, CODIGO_ROL.LIDER_PROYECTO]}>
              <InterrupcionesPage />
            </RoleRoute>
          }
        />

        <Route
          path="mensajes"
          element={
            <RoleRoute rolesPermitidos={[CODIGO_ROL.COORDINADOR]}>
              <MensajesPage />
            </RoleRoute>
          }
        />

        {/* Abierta a cualquier autenticado -- cambiar la propia
            contraseña no depende del rol. */}
        <Route path="configuracion" element={<ConfiguracionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
