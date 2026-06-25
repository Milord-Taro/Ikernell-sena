import {
  Kanban,
  BarChart3,
  GitBranch,
  Shield,
  Clock,
  Zap,
  ArrowRight,
  Cloud,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const services = [
  {
    icon: Kanban,
    color: "#4338ca",
    bg: "#eef2ff",
    badge: "Popular",
    title: "Desarrollo de Software a la Medida",
    description:
      "Diseñamos aplicaciones web y empresariales adaptadas a las necesidades específicas de cada cliente.",
    features: [
      "Aplicaciones web",
      "Sistemas empresariales",
      "Software personalizado",
    ],
  },
  {
    icon: BarChart3,
    color: "#0d9488",
    bg: "#f0fdfa",
    badge: "Nuevo",
    title: "Consultoría Tecnológica",
    description:
      "Analizamos procesos de negocio para proponer soluciones tecnológicas eficientes y escalables.",
    features: [
      "Análisis de procesos",
      "Arquitectura de software",
      "Transformación digital",
    ],
  },
  {
    icon: GitBranch,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    badge: "",
    title: "Desarrollo Web",
    description:
      "Construcción de aplicaciones modernas utilizando tecnologías actuales como Java, Spring Boot, React y PostgreSQL.",
    features: ["Sitios web corporativos", "Aplicaciones SPA", "APIs REST"],
  },
  {
    icon: Shield,
    color: "#9333ea",
    bg: "#faf5ff",
    badge: "",
    title: "Mantenimiento de Software",
    description:
      "Evolución, soporte y mejora continua de aplicaciones existentes.",
    features: [
      "Corrección de errores",
      "Actualizaciones",
      "Optimización del rendimiento",
    ],
  },
  {
    icon: Clock,
    color: "#f97316",
    bg: "#fff7ed",
    badge: "",
    title: "Integración de Sistemas",
    description:
      "Conectamos diferentes plataformas mediante APIs para automatizar procesos.",
    features: [
      "Integración mediante APIs",
      "Automatización de procesos",
      "Sincronización de datos",
    ],
  },
  {
    icon: Cloud,
    color: "#ec4899",
    bg: "#fdf2f8",
    badge: "",
    title: "Gestión de Proyectos TI",
    description:
      "Planeación, seguimiento y ejecución de proyectos bajo metodologías ágiles.",
    features: [
      "Metodologías ágiles",
      "Seguimiento de proyectos",
      "Gestión de equipos",
    ],
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="py-24 bg-white"
      aria-label="Portafolio de servicios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: "#eef2ff", color: "#4338ca" }}
          >
            Portafolio de Servicios
          </span>
          <h2
            className="text-slate-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Todo lo que necesitas para{" "}
            <span style={{ color: "#4338ca" }}>gestionar con éxito</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Una plataforma integral diseñada para equipos de software de todos
            los tamaños, desde startups hasta grandes corporaciones.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 cursor-pointer"
                tabIndex={0}
                aria-label={`Servicio: ${service.title}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: service.bg }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: service.color }}
                    />
                  </div>
                  {service.badge && (
                    <Badge
                      className="text-xs"
                      style={{
                        background:
                          service.badge === "Popular" ? "#eef2ff" : "#f0fdfa",
                        color:
                          service.badge === "Popular" ? "#4338ca" : "#0d9488",
                        border: "none",
                      }}
                    >
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-500"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: service.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div
                  className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                  style={{ color: service.color }}
                >
                  Saber más <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 gap-2"
          >
            <Zap className="w-4 h-4" />
            Ver todos los servicios
          </Button>
        </div>
      </div>
    </section>
  );
}
