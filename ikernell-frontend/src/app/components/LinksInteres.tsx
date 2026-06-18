import { ExternalLink, Globe, BookMarked, Video, Podcast, Github, FileCode } from "lucide-react";

const categories = [
  {
    icon: BookMarked,
    color: "#4338ca",
    bg: "#eef2ff",
    label: "Documentación",
    links: [
      { name: "Scrum Guide 2020", url: "https://scrumguides.org", desc: "Guía oficial de Scrum" },
      { name: "PMBOK® Guide", url: "https://pmi.org", desc: "Estándar de gestión de proyectos" },
      { name: "Manifesto Ágil", url: "https://agilemanifesto.org", desc: "Los 12 principios del manifiesto ágil" },
    ],
  },
  {
    icon: Video,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    label: "Canales & Cursos",
    links: [
      { name: "Coursera – PM Specialization", url: "https://coursera.org", desc: "Especialización en gestión de proyectos" },
      { name: "Pluralsight DevOps", url: "https://pluralsight.com", desc: "Rutas de aprendizaje DevOps" },
      { name: "freeCodeCamp", url: "https://freecodecamp.org", desc: "Recursos gratuitos de programación" },
    ],
  },
  {
    icon: Podcast,
    color: "#9333ea",
    bg: "#faf5ff",
    label: "Podcasts",
    links: [
      { name: "Software Engineering Daily", url: "https://softwareengineeringdaily.com", desc: "Entrevistas con expertos en software" },
      { name: "Ágiles Podcast", url: "https://agiles.org", desc: "Podcast iberoamericano sobre agilidad" },
      { name: "El Rol del PM", url: "#", desc: "Historias de gestores de proyectos" },
    ],
  },
  {
    icon: Github,
    color: "#0d9488",
    bg: "#f0fdfa",
    label: "Open Source",
    links: [
      { name: "OpenProject", url: "https://openproject.org", desc: "Gestión de proyectos open source" },
      { name: "Taiga.io", url: "https://taiga.io", desc: "Plataforma ágil de código abierto" },
      { name: "Redmine", url: "https://redmine.org", desc: "Rastreador de proyectos flexible" },
    ],
  },
  {
    icon: Globe,
    color: "#f97316",
    bg: "#fff7ed",
    label: "Comunidades",
    links: [
      { name: "PMI Colombia", url: "https://pmi.org", desc: "Comunidad de gestores de Colombia" },
      { name: "Agile Alliance", url: "https://agilealliance.org", desc: "Comunidad global de agilidad" },
      { name: "Stack Overflow Teams", url: "https://stackoverflow.com", desc: "Preguntas y respuestas para devs" },
    ],
  },
  {
    icon: FileCode,
    color: "#ec4899",
    bg: "#fdf2f8",
    label: "Estándares",
    links: [
      { name: "ISO/IEC 25010", url: "https://iso.org", desc: "Calidad del producto software" },
      { name: "CMMI Institute", url: "https://cmmiinstitute.com", desc: "Modelo de madurez de capacidades" },
      { name: "OWASP Top 10", url: "https://owasp.org", desc: "Seguridad en aplicaciones web" },
    ],
  },
];

export function LinksInteres() {
  return (
    <section
      id="links"
      className="py-24 bg-white"
      aria-label="Links de interés"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: "#eef2ff", color: "#4338ca" }}
          >
            Links de Interés
          </span>
          <h2
            className="text-slate-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Recursos cuidadosamente{" "}
            <span style={{ color: "#4338ca" }}>seleccionados</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Una colección de herramientas, comunidades y fuentes de conocimiento
            para profesionales del software y la gestión de proyectos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.label}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: cat.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-semibold text-slate-900">{cat.label}</h3>
                </div>

                <ul className="space-y-3">
                  {cat.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                        aria-label={`${link.name} - ${link.desc}`}
                      >
                        <div>
                          <p
                            className="text-sm font-medium group-hover:underline"
                            style={{ color: cat.color }}
                          >
                            {link.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                        </div>
                        <ExternalLink
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: cat.color }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
