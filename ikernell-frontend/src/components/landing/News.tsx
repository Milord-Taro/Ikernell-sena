import { Calendar, Clock } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { PageContainer } from "./PageContainer";

const articulos = [
  {
    categoria: "Tendencias",
    titulo: "IA generativa en el desarrollo de software: ¿qué cambió en 2026?",
    resumen:
      "La integración de modelos de lenguaje en los IDEs ha transformado la velocidad de entrega y la calidad del código en equipos de todo el mundo.",
    fecha: "28 may, 2026",
    lectura: "5 min",
    imagen:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    categoria: "Metodologías",
    titulo: "SAFe vs. Scrum: ¿cuál escalar para proyectos enterprise?",
    resumen:
      "Analizamos las ventajas y desafíos de ambas metodologías para ayudarte a decidir según el tamaño y madurez de tu organización.",
    fecha: "15 may, 2026",
    lectura: "8 min",
    imagen:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    categoria: "Seguridad",
    titulo: "DevSecOps: cómo integrar seguridad sin frenar la entrega",
    resumen:
      "Las mejores prácticas para incorporar pruebas de seguridad automatizadas en tu pipeline de CI/CD sin sacrificar velocidad.",
    fecha: "3 may, 2026",
    lectura: "6 min",
    imagen:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
];

export function News() {
  return (
    <section
      id="noticias"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <PageContainer className="relative">
        <div className="max-w-3xl mb-14 flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">
            Noticias del sector
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            Mantente al día con el mundo tech
          </h2>
          <h3 className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Artículos y análisis sobre las tendencias que están definiendo
            el desarrollo de software en la actualidad.
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulos.map((articulo) => (
            <Card
              key={articulo.titulo}
              className="overflow-hidden hover:border-[var(--text-tertiary)] transition-colors"
            >
              <img
                src={articulo.imagen}
                alt={articulo.titulo}
                className="w-full h-44 object-cover"
              />
              <div className="p-5 flex flex-col gap-3">
                <Badge variant="info">{articulo.categoria}</Badge>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-snug">
                  {articulo.titulo}
                </h3>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {articulo.resumen}
                </p>
                <div className="flex items-center gap-4 pt-1 text-sm text-[var(--text-tertiary)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {articulo.fecha}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {articulo.lectura}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-36 right-[-180px] w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "var(--success)" }}
        />
      </div>
    </section>
  );
}
