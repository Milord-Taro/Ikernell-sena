import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { RoleRoute } from './routes/RoleRoute';
import { CODIGO_ROL } from './types/usuario';

// CORREGIDO: antes todas las páginas del dashboard se importaban de
// forma eager -- un visitante anónimo que solo abre la landing (la
// sección pública, sin sesión) terminaba descargando el bundle completo
// de la app de gestión igual. Con lazy() cada página del dashboard queda
// en su propio chunk, que Vite solo pide cuando el usuario navega ahí.
const DashboardHome = lazy(() => import('./pages/DashboardHome'));
const MetricasPage = lazy(() => import('./pages/MetricasPage'));
const CatalogosPage = lazy(() => import('./pages/CatalogosPage'));
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'));
const ProyectosPage = lazy(() => import('./pages/ProyectosPage'));
const ProyectoDetallePage = lazy(() => import('./pages/ProyectoDetallePage'));
const MisActividadesPage = lazy(() => import('./pages/MisActividadesPage'));
const ErroresPage = lazy(() => import('./pages/ErroresPage'));
const InterrupcionesPage = lazy(() => import('./pages/InterrupcionesPage'));
const MensajesPage = lazy(() => import('./pages/MensajesPage'));
const ConfiguracionPage = lazy(() => import('./pages/ConfiguracionPage'));
const AuditoriaPage = lazy(() => import('./pages/AuditoriaPage'));
const NotificacionesPage = lazy(() => import('./pages/NotificacionesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function CargandoPagina() {
  return (
    <div className="flex items-center justify-center py-24">
      <p className="type-body-sm text-[var(--text-tertiary)]">Cargando...</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<CargandoPagina />}>
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

        <Route
          path="auditoria"
          element={
            <RoleRoute rolesPermitidos={[CODIGO_ROL.COORDINADOR]}>
              <AuditoriaPage />
            </RoleRoute>
          }
        />

        {/* Abierta a cualquier autenticado -- son las notificaciones de cada quien. */}
        <Route path="notificaciones" element={<NotificacionesPage />} />

        {/* Ruta de dashboard sin match: 404 dentro del propio layout,
            conservando sidebar/topbar en vez de una pantalla en blanco. */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Cualquier otra ruta fuera de "/" y "/dashboard/*". */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
  );
}

export default App;
