import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const articles = [
  {
    id: 1,
    category: "Tendencias",
    categoryColor: "#4338ca",
    categoryBg: "#eef2ff",
    title: "IA Generativa en el desarrollo de software: ¿Qué cambió en 2026?",
    excerpt:
      "La integración de modelos de lenguaje en los IDEs y plataformas de gestión ha transformado la velocidad de entrega y la calidad del código en equipos de todo el mundo.",
    date: "28 May, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc4MDY5MjIxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Dashboard de analytics con inteligencia artificial",
  },
  {
    id: 2,
    category: "Metodologías",
    categoryColor: "#0d9488",
    categoryBg: "#f0fdfa",
    title: "SAFe vs. Scrum: ¿cuál escalar para proyectos enterprise en 2026?",
    excerpt:
      "Analizamos las ventajas, desafíos y casos de éxito de ambas metodologías para ayudarte a tomar la mejor decisión según el tamaño y madurez de tu organización.",
    date: "15 May, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzb2Z0d2FyZSUyMHByb2plY3QlMjBtYW5hZ2VtZW50JTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzgwNjkyMjEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Reunión de equipo ágil",
  },
  {
    id: 3,
    category: "Seguridad",
    categoryColor: "#9333ea",
    categoryBg: "#faf5ff",
    title: "DevSecOps: cómo integrar seguridad sin frenar la velocidad de entrega",
    excerpt:
      "Las mejores prácticas para incorporar pruebas de seguridad automatizadas en tu pipeline de CI/CD sin sacrificar la velocidad de los ciclos de release.",
    date: "3 May, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc4MDY5MjIxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Pantalla de laptop con código de seguridad",
  },
];

export function News() {
  return (
    <section id="noticias" className="py-24 bg-white" aria-label="Noticias de software">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
              style={{ background: "#eef2ff", color: "#4338ca" }}
            >
              Noticias del Sector
            </span>
            <h2
              className="text-slate-900"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
            >
              Mantente al día con el{" "}
              <span style={{ color: "#4338ca" }}>mundo tech</span>
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 gap-2 self-start sm:self-end flex-shrink-0"
          >
            Ver todas las noticias <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Articles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 cursor-pointer flex flex-col ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              tabIndex={0}
              aria-label={`Artículo: ${article.title}`}
            >
              <div className="relative overflow-hidden h-48">
                <ImageWithFallback
                  src={article.image}
                  alt={article.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
                <Badge
                  className="absolute top-3 left-3 text-xs border-0"
                  style={{ background: article.categoryBg, color: article.categoryColor }}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {article.category}
                </Badge>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime} lectura
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
