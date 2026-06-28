import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
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
import ProyectoErroresPage from "../pages/ProyectoHistorialErroresPage";
import ProyectoInterrupcionesPage from "../pages/ProyectoHistorialInterrupcionesPage";
import PerfilPage from "../pages/PerfilPage";
import UsuarioDetallePage from "../pages/UsuarioDetallePage";
import UsuarioEditarPage from "../pages/UsuarioEditarPage";
import UsuarioNuevoPage from "../pages/UsuarioNuevoPage";
import RegistroErrorEditarPage from "../pages/RegistroErrorEditarPage";
import RegistroInterrupcionEditarPage from "../pages/RegistroInterrupcionEditarPage";
import RegistroInterrupcionDetallePage from "../pages/RegistroInterrupcionDetallePage";
import RegistroErrorDetallePage from "../pages/RegistroErrorDetallePage";
import InformesPage from "../pages/InformesPage";
import NotFoundPage from "../pages/NotFoundPage";
import ConfiguracionPage from "../pages/ConfiguracionPage";

export default function App() {
  function proteger(componente: React.ReactNode) {
    return (
      <ProtectedRoute>
        <DashboardLayout>{componente}</DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f8faff" }}>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={proteger(<DashboardHomePage />)} />

          <Route
            path="/dashboard/proyectos"
            element={proteger(<ProyectosPage />)}
          />

          <Route
            path="/dashboard/proyectos/:id"
            element={proteger(<ProyectoDetallePage />)}
          />

          <Route
            path="/dashboard/proyectos/:id/errores"
            element={proteger(<ProyectoErroresPage />)}
          />

          <Route
            path="/dashboard/proyectos/:id/error/nuevo"
            element={proteger(<RegistroErrorNuevoPage />)}
          />

          <Route
            path="/dashboard/proyectos/:id/interrupciones"
            element={proteger(<ProyectoInterrupcionesPage />)}
          />

          <Route
            path="/dashboard/proyectos/:id/interrupcion/nueva"
            element={proteger(<RegistroInterrupcionNuevoPage />)}
          />

          <Route
            path="/dashboard/mensajes"
            element={proteger(<MensajesPage />)}
          />

          <Route
            path="/dashboard/usuarios"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <UsuariosPage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/usuarios/:id"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <UsuarioDetallePage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/usuarios/nuevo"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <UsuarioNuevoPage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/usuarios/:id/editar"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <UsuarioEditarPage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/errores"
            element={proteger(<RegistroErroresPage />)}
          />

          <Route
            path="/dashboard/errores/:id/editar"
            element={proteger(<RegistroErrorEditarPage />)}
          />

          <Route
            path="/dashboard/errores/:id"
            element={proteger(<RegistroErrorDetallePage />)}
          />

          <Route
            path="/dashboard/interrupciones"
            element={proteger(<InterrupcionesPage />)}
          />

          <Route
            path="/dashboard/interrupciones/:id/editar"
            element={proteger(<RegistroInterrupcionEditarPage />)}
          />

          <Route
            path="/dashboard/interrupciones/:id"
            element={proteger(<RegistroInterrupcionDetallePage />)}
          />

          <Route
            path="/dashboard/tipoerrores"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <TipoErrorPage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/tipointerrupciones"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <TipoInterrupcionPage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/informes"
            element={proteger(
              <RoleRoute roles={["Coordinador"]}>
                <InformesPage />
              </RoleRoute>,
            )}
          />

          <Route
            path="/dashboard/actividades"
            element={proteger(<ActividadesPage />)}
          />

          <Route
            path="/dashboard/actividades/:id"
            element={proteger(<ActividadDetallePage />)}
          />

          <Route
            path="/dashboard/etapas/:id"
            element={proteger(<EtapaDetallePage />)}
          />

          <Route path="/dashboard/perfil" element={proteger(<PerfilPage />)} />

          <Route
            path="/dashboard/usuarios/nuevo"
            element={proteger(<UsuarioNuevoPage />)}
          />

          <Route
            path="/dashboard/configuracion"
            element={proteger(<ConfiguracionPage />)}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
}
