import {
  Target,
  Lightbulb,
  Scale,
  Award,
  HeartHandshake,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { PageContainer } from "./PageContainer";

const acentos = [
  { bg: "var(--primary-subtle)", fg: "var(--primary)" },
  { bg: "var(--info-bg)", fg: "var(--info)" },
  { bg: "var(--success-bg)", fg: "var(--success)" },
  { bg: "var(--warning-bg)", fg: "var(--warning)" },
  { bg: "var(--info-bg)", fg: "var(--info)" },
  { bg: "var(--primary-subtle)", fg: "var(--primary)" },
];

const lineamientos = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Proveer soluciones de software para la gestión de proyectos que empoderen a las organizaciones a alcanzar sus objetivos con mayor eficiencia, transparencia y calidad.",
  },
  {
    icon: Lightbulb,
    title: "Visión",
    description:
      "Ser la plataforma líder en gestión de proyectos de software en Latinoamérica, reconocida por su innovación continua y el impacto positivo en el sector tecnológico.",
  },
  {
    icon: Scale,
    title: "Valores",
    description:
      "Integridad, innovación, colaboración y responsabilidad son los pilares que guían cada decisión en IKernell.",
  },
  {
    icon: Award,
    title: "Estándares de calidad",
    description:
      "Adoptamos las mejores prácticas del mercado y metodologías ágiles certificadas, asegurando que cada entrega cumpla estándares internacionales.",
  },
  {
    icon: HeartHandshake,
    title: "Compromiso social",
    description:
      "Apoyamos el desarrollo tecnológico regional mediante capacitación, alianzas con universidades y proyectos de responsabilidad social.",
  },
  {
    icon: BookOpen,
    title: "Marco regulatorio",
    description:
      "Cumplimos con las normativas de protección de datos y propiedad intelectual vigentes en los países donde operamos.",
  },
];

export function Lineamientos() {
  return (
    <section
      id="lineamientos"
      className="relative py-24"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      <PageContainer className="relative">
        <div className="max-w-3xl mb-25 flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">
            Lineamientos corporativos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            Nuestros principios y fundamentos
          </h2>
          <h3 className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Conoce los valores, estándares y principios que orientan cada
            decisión y cada proyecto desarrollado por IKernell.
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lineamientos.map((item, indice) => {
            const Icono = item.icon;
            const acento = acentos[indice % acentos.length];
            return (
              <Card
                key={item.title}
                className="hover:border-[var(--text-tertiary)] transition-colors"
              >
                <CardContent className="flex flex-col gap-3">
                  <span
                    className="flex items-center justify-center size-12 rounded-[var(--radius-md)]"
                    style={{ background: acento.bg, color: acento.fg }}
                  >
                    <Icono size={22} />
                  </span>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute -top-36 right-[-180px] w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "var(--primary)" }}
        />

        <div
          className="absolute bottom-[-240px] left-[-120px] w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.05]"
          style={{ background: "var(--info)" }}
        />
      </div>
    </section>
  );
}
