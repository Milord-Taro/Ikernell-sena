import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingNavbar } from "../components/landing/LandingNavbar";
import { Hero } from "../components/landing/Hero";
import { StatsBar } from "../components/landing/StatsBar";
import { Lineamientos } from "../components/landing/Lineamientos";
import { Services } from "../components/landing/Services";
import { News } from "../components/landing/News";
import { LinksInteres } from "../components/landing/LinksInteres";
import { FAQContactSection } from "../components/landing/FAQContactSection";
import { Footer } from "../components/landing/Footer";
import { LoginModal } from "../components/auth/LoginModal";
import { Toast } from "../components/ui/Feedback";
import { consumirAvisoSesionExpirada } from "../services/api";

export default function LandingPage() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarAvisoSesion, setMostrarAvisoSesion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (consumirAvisoSesionExpirada()) {
      setMostrarAvisoSesion(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <LandingNavbar onSignIn={() => setMostrarLogin(true)} />

      <main>
        <Hero />
        <StatsBar />
        <Lineamientos />
        <Services />
        <News />
        <LinksInteres />
        <FAQContactSection />
      </main>

      <Footer />

      <LoginModal
        open={mostrarLogin}
        onClose={() => setMostrarLogin(false)}
        onSuccess={() => {
          setMostrarLogin(false);
          navigate("/dashboard");
        }}
      />

      {mostrarAvisoSesion && (
        <div className="fixed top-20 right-6 z-[60] w-80">
          <Toast
            variant="warning"
            title="Tu sesión expiró"
            description="Por seguridad, cerramos tu sesión tras un período de inactividad. Inicia sesión de nuevo para continuar."
            autoClose
            duration={7000}
            onClose={() => setMostrarAvisoSesion(false)}
          />
        </div>
      )}
    </div>
  );
}
