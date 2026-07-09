import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/DashboardHome';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

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
        {/* Fase 4+: agregar aquí las rutas anidadas de catálogos, usuarios,
            proyectos, etc. a medida que se construyan (ej.
            <Route path="usuarios" element={<RoleRoute .../>} />). */}
      </Route>
    </Routes>
  );
}

export default App;
