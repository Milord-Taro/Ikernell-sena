import { BookOpen, Target, Scale, Lightbulb, Award, HeartHandshake } from "lucide-react";

const lineamientos = [
  {
    icon: Target,
    color: "#4338ca",
    bg: "#eef2ff",
    title: "Misión",
    description:
      "Proveer soluciones de software para la gestión de proyectos que empoderen a las organizaciones a alcanzar sus objetivos con mayor eficiencia, transparencia y calidad en cada etapa del ciclo de vida del proyecto.",
  },
  {
    icon: Lightbulb,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    title: "Visión",
    description:
      "Ser la plataforma líder en gestión de proyectos de software en Latinoamérica para 2030, reconocida por su innovación continua, accesibilidad y el impacto positivo que genera en el sector tecnológico.",
  },
  {
    icon: Scale,
    color: "#0d9488",
    bg: "#f0fdfa",
    title: "Valores",
    description:
      "Integridad, innovación, colaboración y responsabilidad son los pilares que guían cada decisión en IKernell. Creemos que el éxito de nuestros clientes es nuestro éxito.",
  },
  {
    icon: Award,
    color: "#9333ea",
    bg: "#faf5ff",
    title: "Estándares de Calidad",
    description:
      "Adoptamos las mejores prácticas del mercado: ISO/IEC 25010, CMMI y metodologías ágiles certificadas, asegurando que cada producto entregado cumpla con los más altos estándares internacionales.",
  },
  {
    icon: HeartHandshake,
    color: "#f97316",
    bg: "#fff7ed",
    title: "Compromiso Social",
    description:
      "IKernell apoya el desarrollo tecnológico regional a través de programas de capacitación, alianzas con universidades y proyectos de responsabilidad social enfocados en el acceso equitativo a la tecnología.",
  },
  {
    icon: BookOpen,
    color: "#ec4899",
    bg: "#fdf2f8",
    title: "Marco Regulatorio",
    description:
      "Cumplimos con las normativas de protección de datos (Ley 1581 de 2012, GDPR), propiedad intelectual y estándares de ciberseguridad vigentes en los países donde operamos.",
  },
];

export function Lineamientos() {
  return (
    <section
      id="lineamientos"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)" }}
      aria-label="Lineamientos corporativos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: "#e0f2fe", color: "#0369a1" }}
          >
            Lineamientos Corporativos
          </span>
          <h2
            className="text-slate-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Nuestros principios y{" "}
            <span style={{ color: "#4338ca" }}>fundamentos</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Los lineamientos que orientan nuestras decisiones, nuestra cultura y la manera
            en que construimos valor para nuestros clientes y la sociedad.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lineamientos.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5 transition-all duration-300"
                aria-label={item.title}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: item.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
