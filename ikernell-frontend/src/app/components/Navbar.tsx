import { useState, useEffect } from "react";
import { Menu, X, Code2, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  cerrarSesion,
  obtenerUsuarioLogueado,
} from "../../utils/auth";

interface NavbarProps {
  onSignIn: () => void;
}

const navLinks = [
  { label: "Lineamientos", href: "#lineamientos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Noticias", href: "#noticias" },
  { label: "Links de Interés", href: "#links" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar({ onSignIn }: NavbarProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [haySesion, setHaySesion] = useState(
    Boolean(obtenerUsuarioLogueado()),
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const actualizarSesion = () => {
      setHaySesion(Boolean(obtenerUsuarioLogueado()));
    };

    window.addEventListener("storage", actualizarSesion);
    window.addEventListener("focus", actualizarSesion);
    window.addEventListener("ikernell-auth-change", actualizarSesion);

    return () => {
      window.removeEventListener("storage", actualizarSesion);
      window.removeEventListener("focus", actualizarSesion);
      window.removeEventListener("ikernell-auth-change", actualizarSesion);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const irAlDashboard = () => {
    setMenuOpen(false);
    navigate("/dashboard");
  };

  const salir = () => {
    cerrarSesion();
    setHaySesion(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("ikernell-auth-change"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg shadow-indigo-900/5"
        : "bg-transparent"
        }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); scrollTo("#inicio"); }}
            className="flex items-center gap-2 group"
            aria-label="IKernell Soluciones Software - Inicio"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4338ca, #0ea5e9)" }}>
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span
              className="font-semibold text-lg hidden sm:block"
              style={{ color: scrolled ? "#0f172a" : "#0f172a" }}
            >
              <span style={{ color: "#4338ca" }}>IKernell</span>
              <span className="font-normal text-slate-600 text-sm ml-1">Soluciones</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {haySesion ? (
              <>
                <Button
                  variant="ghost"
                  onClick={irAlDashboard}
                  className="text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
                >
                  Ir al dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={salir}
                  className="border-indigo-200 text-indigo-700 gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={onSignIn}
                className="text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
              >
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-indigo-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white/98 backdrop-blur-md border-t border-indigo-100 shadow-xl"
          role="navigation"
          aria-label="Menú móvil"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="px-4 py-3 rounded-lg text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-3 border-t border-indigo-100 mt-2">
              {haySesion ? (
                <>
                  <Button
                    variant="outline"
                    onClick={irAlDashboard}
                    className="flex-1 border-indigo-200 text-indigo-700"
                  >
                    Ir al dashboard
                  </Button>

                  <Button
                    variant="outline"
                    onClick={salir}
                    className="border-indigo-200 text-indigo-700"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={onSignIn} className="flex-1 border-indigo-200 text-indigo-700">
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
