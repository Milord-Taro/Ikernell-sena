import { useState } from "react";
import { Button } from "./ui/button";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  X,
  Eye,
  EyeOff,
  Code2,
  ArrowRight,
} from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({
  onClose,
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usuario = await login(form.email, form.password);

      if (!usuario?.idUsuario) {
        toast.error("Correo o contraseña incorrectos");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.dispatchEvent(new Event("ikernell-auth-change"));

      toast.success(`Bienvenido ${usuario.nombre}`);

      onClose();

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("No se pudo iniciar sesión");
    }
  };

  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
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
                  Iniciar sesión
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Accede con las credenciales asignadas por el Coordinador.
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

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

              </div>
              <div className="relative">
                <input
                  id="auth-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder={"Tu contraseña"}
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

            <Button
              type="submit"
              className="w-full text-white gap-2 py-3 mt-1 shadow-lg hover:shadow-indigo-300/50 transition-all"
              style={{
                background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
              }}
            >
              Iniciar sesión
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
