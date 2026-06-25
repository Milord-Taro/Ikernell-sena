import {
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onGetStarted: () => void;
}

const stats = [
  { icon: Users, value: "50+", label: "Empresas satisfechas" },
  { icon: TrendingUp, value: "98%", label: "Satisfacción" },
  { icon: Star, value: "4.9/5", label: "Valoración" },
];

const features = [
  "Desarrollo de software personalizado",
  "Consultoría y transformación digital",
  "Equipos especializados en desarrollo",
];

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Sección principal"
      style={{
        background:
          "linear-gradient(135deg, #f8faff 0%, #eef2ff 50%, #e0f2fe 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #818cf8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-10 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-15 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                background: "#eef2ff",
                color: "#4338ca",
                borderColor: "#c7d2fe",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#4338ca" }}
              />
              Desarrollo de Software a la Medida
            </div>

            <div className="space-y-4">
              <h1
                className="leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5 rem)",
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1.5,
                }}
              >
                Desarrollamos{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  soluciones de software
                </span>{" "}
                que impulsan el crecimiento de tu empresa
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                En IKernell Soluciones Software diseñamos, desarrollamos e
                implementamos soluciones de software personalizadas para
                empresas que buscan optimizar procesos, mejorar su productividad
                y acelerar su transformación digital mediante tecnología de
                calidad.
              </p>
            </div>

            {/* Feature bullets */}
            <ul className="space-y-3" aria-label="Características principales">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "#0d9488" }}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="text-white shadow-xl gap-2 group hover:shadow-indigo-300/50 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
                  paddingLeft: "1.75rem",
                  paddingRight: "1.75rem",
                }}
                aria-label="Contáctanos - registrarse"
              >
                Comenzar Ahora
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 gap-2"
                onClick={() =>
                  document
                    .querySelector("#servicios")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label="Ver demostración de servicios"
              >
                <Play className="w-4 h-4" />
                Nuestro Portafolio
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-indigo-100">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "#eef2ff" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#4338ca" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden lg:block">
            <div
              className="absolute inset-0 rounded-3xl rotate-3 opacity-30"
              style={{
                background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
              }}
              aria-hidden="true"
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzb2Z0d2FyZSUyMHByb2plY3QlMjBtYW5hZ2VtZW50JTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzgwNjkyMjEwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Equipo colaborando en proyectos de software"
                className="w-full h-96 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(67,56,202,0.3), transparent)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating cards */}
            <div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-indigo-50"
              aria-label="Estadística: proyectos completados"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#d1fae5" }}
                >
                  <CheckCircle2
                    className="w-5 h-5"
                    style={{ color: "#059669" }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">100+</p>
                  <p className="text-xs text-slate-500">Proyectos entregados</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-indigo-50"
              aria-label="Estadística: usuarios activos"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#818cf8", "#0ea5e9", "#34d399"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">+50</p>
                  <p className="text-xs text-slate-500">
                    Desarrolladores activos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
