import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthModal } from "./components/AuthModal";

import DashboardLayout from "./components/DashboardLayout";
import DashboardHomePage from "../pages/DashboardHomePage";

import ProyectosPage from "../pages/ProyectosPage";
import MensajesPage from "../pages/MensajesPage";
import UsuariosPage from "../pages/UsuariosPage";
import RegistroErroresPage from "../pages/RegistroErroresPage";
import InterrupcionesPage from "../pages/InterrupcionesPage";
import TipoErrorPage from "../pages/TipoErrorPage";
import TipoInterrupcionPage from "../pages/TipoInterrupcionPage";
import LandingPage from "../pages/LandingPage";
import ActividadesPage from "../pages/ActividadesPage";
import ActividadDetallePage from "../pages/ActividadDetallePage";
import ProyectoDetallePage from "../pages/ProyectoDetallePage";
import EtapaDetallePage from "../pages/EtapaDetallePage";
import RegistroErrorNuevoPage from "../pages/RegistroErrorNuevoPage";
import RegistroInterrupcionNuevoPage from "../pages/RegistroInterrupcionNuevoPage";
import ProyectoErroresPage from "../pages/ProyectoErroresPage";
import ProyectoInterrupcionesPage from "../pages/ProyectoInterrupcionesPage";

export default function App() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#f8faff" }}>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardHomePage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/proyectos"
            element={
              <DashboardLayout>
                <ProyectosPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/proyectos/:id"
            element={
              <DashboardLayout>
                <ProyectoDetallePage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/proyectos/:id/errores"
            element={
              <DashboardLayout>
                <ProyectoErroresPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/proyectos/:id/error/nuevo"
            element={
              <DashboardLayout>
                <RegistroErrorNuevoPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/proyectos/:id/interrupciones"
            element={
              <DashboardLayout>
                <ProyectoInterrupcionesPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/proyectos/:id/interrupcion/nueva"
            element={
              <DashboardLayout>
                <RegistroInterrupcionNuevoPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/mensajes"
            element={
              <DashboardLayout>
                {" "}
                <MensajesPage />{" "}
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/usuarios"
            element={
              <DashboardLayout>
                <UsuariosPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/errores"
            element={
              <DashboardLayout>
                <RegistroErroresPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/interrupciones"
            element={
              <DashboardLayout>
                <InterrupcionesPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/tipoerrores"
            element={
              <DashboardLayout>
                <TipoErrorPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/tipointerrupciones"
            element={
              <DashboardLayout>
                <TipoInterrupcionPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/actividades"
            element={
              <DashboardLayout>
                <ActividadesPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/actividades/:id"
            element={
              <DashboardLayout>
                <ActividadDetallePage />
              </DashboardLayout>
            }
          />

          <Route
            path="/dashboard/etapas/:id"
            element={
              <DashboardLayout>
                <EtapaDetallePage />
              </DashboardLayout>
            }
          />
        </Routes>
      </main>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}
