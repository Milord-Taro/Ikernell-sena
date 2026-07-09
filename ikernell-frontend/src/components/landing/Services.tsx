import {
  Layers,
  BarChart3,
  Globe,
  ShieldCheck,
  Link2,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { PageContainer } from "./PageContainer";

const acentos = [
  { bg: "var(--primary-subtle)", fg: "var(--primary)" },
  { bg: "var(--success-bg)", fg: "var(--success)" },
  { bg: "var(--info-bg)", fg: "var(--info)" },
  { bg: "var(--warning-bg)", fg: "var(--warning)" },
  { bg: "var(--info-bg)", fg: "var(--info)" },
  { bg: "var(--primary-subtle)", fg: "var(--primary)" },
];

const servicios = [
  {
    icon: Layers,
    badge: "Popular",
    title: "Desarrollo de software a la medida",
    description:
      "Aplicaciones web y empresariales adaptadas a las necesidades específicas de cada cliente.",
  },
  {
    icon: BarChart3,
    badge: null,
    title: "Consultoría tecnológica",
    description:
      "Análisis de procesos de negocio para proponer soluciones eficientes y escalables.",
  },
  {
    icon: Globe,
    badge: null,
    title: "Desarrollo web",
    description:
      "Aplicaciones modernas con Java, Spring Boot, React y PostgreSQL.",
  },
  {
    icon: ShieldCheck,
    badge: null,
    title: "Mantenimiento de software",
    description:
      "Evolución, soporte y mejora continua de aplicaciones existentes.",
  },
  {
    icon: Link2,
    badge: null,
    title: "Integración de sistemas",
    description:
      "Conexión de plataformas mediante APIs para automatizar procesos.",
  },
  {
    icon: Workflow,
    badge: null,
    title: "Gestión de proyectos TI",
    description:
      "Planeación, seguimiento y ejecución bajo metodologías ágiles.",
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--section-alt)" }}
    >
      <PageContainer className="relative">
        <div className="max-w-3xl mb-14 flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">
            Portafolio de servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            Todo lo que necesitas para gestionar con éxito
          </h2>
          <h3 className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Una plataforma integral diseñada para equipos de software de
            todos los tamaños, desde startups hasta grandes corporaciones.
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio, indice) => {
            const Icono = servicio.icon;
            const acento = acentos[indice % acentos.length];
            return (
              <Card
                key={servicio.title}
                className="hover:border-[var(--text-tertiary)] hover:shadow-md transition-all"
              >
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <span
                      className="flex items-center justify-center size-12 rounded-[var(--radius-md)]"
                      style={{ background: acento.bg, color: acento.fg }}
                    >
                      <Icono size={22} />
                    </span>
                    {servicio.badge && (
                      <Badge variant="info">{servicio.badge}</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {servicio.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                    {servicio.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 left-[-160px] w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "var(--info)" }}
        />
        <div
          className="absolute bottom-[-220px] right-[-140px] w-[440px] h-[440px] rounded-full blur-3xl opacity-[0.05]"
          style={{ background: "var(--primary)" }}
        />
      </div>
    </section>
  );
}
