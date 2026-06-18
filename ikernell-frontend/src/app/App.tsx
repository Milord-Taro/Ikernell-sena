import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Services } from "./components/Services";
import { Lineamientos } from "./components/Lineamientos";
import { News } from "./components/News";
import { FAQ } from "./components/FAQ";
import { LinksInteres } from "./components/LinksInteres";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";

import ProyectosPage from "../pages/ProyectosPage";
import MensajesPage from "../pages/MensajesPage";
import UsuariosPage from "../pages/UsuariosPage";
import RegistroErroresPage from "../pages/RegistroErroresPage";
import InterrupcionesPage from "../pages/InterrupcionesPage";
import TipoErrorPage from "../pages/TipoErrorPage";
import TipoInterrupcionPage from "../pages/TipoInterrupcionPage";

export default function App() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#f8faff" }}>
      <Navbar
        onSignIn={() => setAuthMode("signin")}
        onSignUp={() => setAuthMode("signup")}
      />

      <main id="main-content">
        <Routes>
          <Route path="/proyectos" element={<ProyectosPage />} />

          <Route path="/mensajes" element={<MensajesPage />} />

          <Route path="/usuarios" element={<UsuariosPage />} />

          <Route path="/errores" element={<RegistroErroresPage />} />

          <Route path="/interrupciones" element={<InterrupcionesPage />} />

          <Route path="/tipoerrores" element={<TipoErrorPage />} />

          <Route
            path="/tipointerrupciones"
            element={<TipoInterrupcionPage />}
          />

          <Route path="/" element={<ProyectosPage />} />
        </Routes>
      </main>

      <Footer />

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
