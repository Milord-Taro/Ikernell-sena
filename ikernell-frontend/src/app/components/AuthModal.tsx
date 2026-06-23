import { useState } from "react";
import {
  X,
  Eye,
  EyeOff,
  Code2,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";
import { Button } from "./ui/button";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthModalProps {
  mode: "signin" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "signin" | "signup") => void;
}

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      toast.info("Registro pendiente de implementar");
      return;
    }

    try {
      const usuario = await login(form.email, form.password);

      if (!usuario?.idUsuario) {
        toast.error("Correo o contraseña incorrectos");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuario));

      toast.success(`Bienvenido ${usuario.nombre}`);

      onClose();

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("No se pudo iniciar sesión");
    }
  };

  const navigate = useNavigate();

  const isSignUp = mode === "signup";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={
        isSignUp ? "Formulario de registro" : "Formulario de inicio de sesión"
      }
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top gradient */}
        <div
          className="h-1.5 w-full"
          style={{ background: "linear-gradient(90deg, #4338ca, #0ea5e9)" }}
          aria-hidden="true"
        />

        <div className="p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
                }}
              >
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 leading-none">
                  {isSignUp ? "Crear cuenta" : "Bienvenido de vuelta"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isSignUp
                    ? "Comienza tu prueba gratuita de 30 días"
                    : "Ingresa a tu cuenta IKernell"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
              aria-label={`${isSignUp ? "Registrarse" : "Iniciar sesión"} con Google`}
            >
              <Chrome className="w-4 h-4 text-red-500" />
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
              aria-label={`${isSignUp ? "Registrarse" : "Iniciar sesión"} con GitHub`}
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" aria-hidden="true" />
            <span className="text-xs text-slate-400">o continúa con email</span>
            <div className="flex-1 h-px bg-slate-200" aria-hidden="true" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {isSignUp && (
              <div>
                <label
                  htmlFor="auth-name"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Nombre completo
                </label>
                <input
                  id="auth-name"
                  name="name"
                  type="text"
                  required={isSignUp}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm placeholder-slate-400 focus:outline-none transition-all"
                  style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                  onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            )}

            {isSignUp && (
              <div>
                <label
                  htmlFor="auth-company"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Empresa{" "}
                  <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  id="auth-company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm placeholder-slate-400 focus:outline-none transition-all"
                  style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                  onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@empresa.com"
                className="w-full px-4 py-2.5 rounded-xl border text-sm placeholder-slate-400 focus:outline-none transition-all"
                style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                aria-required="true"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="auth-password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>
                {!isSignUp && (
                  <a href="#" className="text-xs" style={{ color: "#4338ca" }}>
                    ¿Olvidaste tu contraseña?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  id="auth-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder={
                    isSignUp ? "Mínimo 8 caracteres" : "Tu contraseña"
                  }
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border text-sm placeholder-slate-400 focus:outline-none transition-all"
                  style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                  onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="auth-terms"
                  required
                  className="mt-0.5 rounded"
                  style={{ accentColor: "#4338ca" }}
                  aria-required="true"
                />
                <label
                  htmlFor="auth-terms"
                  className="text-xs text-slate-600 leading-relaxed"
                >
                  Acepto los{" "}
                  <a
                    href="#"
                    className="underline"
                    style={{ color: "#4338ca" }}
                  >
                    Términos de Servicio
                  </a>{" "}
                  y la{" "}
                  <a
                    href="#"
                    className="underline"
                    style={{ color: "#4338ca" }}
                  >
                    Política de Privacidad
                  </a>{" "}
                  de IKernell.
                </label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full text-white gap-2 py-3 mt-1 shadow-lg hover:shadow-indigo-300/50 transition-all"
              style={{
                background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
              }}
            >
              {isSignUp ? "Crear mi cuenta" : "Iniciar Sesión"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-slate-500 mt-5">
            {isSignUp ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <button
              onClick={() => onSwitchMode(isSignUp ? "signin" : "signup")}
              className="font-medium underline underline-offset-2"
              style={{ color: "#4338ca" }}
            >
              {isSignUp ? "Inicia sesión" : "Regístrate gratis"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
