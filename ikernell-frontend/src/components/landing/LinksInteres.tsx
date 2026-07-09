import { BookOpen, Video, Users2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { PageContainer } from "./PageContainer";

const categorias = [
  {
    icon: BookOpen,
    titulo: "Documentación",
    enlaces: [
      { label: "Scrum Guide", desc: "Guía oficial de Scrum", href: "https://scrumguides.org/" },
      { label: "Manifiesto Ágil", desc: "Los 12 principios ágiles", href: "https://agilemanifesto.org/iso/es/manifesto.html" },
    ],
  },
  {
    icon: Video,
    titulo: "Canales & Cursos",
    enlaces: [
      { label: "freeCodeCamp", desc: "Recursos gratuitos de programación", href: "https://www.freecodecamp.org/" },
      { label: "Coursera", desc: "Especializaciones en gestión de proyectos", href: "https://www.coursera.org/" },
    ],
  },
  {
    icon: Users2,
    titulo: "Comunidades",
    enlaces: [
      { label: "PMI Colombia", desc: "Comunidad de gestores de proyectos", href: "https://www.pmicolombia.org/" },
      { label: "OWASP", desc: "Comunidad de seguridad de software", href: "https://owasp.org/" },
    ],
  },
];

export function LinksInteres() {
  return (
    <section
      id="links"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--section-alt)" }}
    >
      <PageContainer className="relative">
        <div className="max-w-3xl mb-14 flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">
            Links de interés
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            Recursos cuidadosamente seleccionados
          </h2>
          <h3 className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Una colección de herramientas, comunidades y fuentes de
            conocimiento para profesionales del software y la gestión de
            proyectos.
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((categoria) => {
            const Icono = categoria.icon;
            return (
              <Card key={categoria.titulo}>
                <CardHeader
                  title={categoria.titulo}
                  meta={
                    <span className="flex items-center justify-center size-8 rounded-[var(--radius-md)] bg-[var(--primary-subtle)] text-[var(--primary)]">
                      <Icono size={15} />
                    </span>
                  }
                />
                <CardContent className="flex flex-col gap-3">
                  {categoria.enlaces.map((enlace) => (
                    <a
                      key={enlace.label}
                      href={enlace.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-0.5 group"
                    >
                      <span className="text-base font-medium text-[var(--primary)] group-hover:underline">
                        {enlace.label}
                      </span>
                      <span className="text-sm text-[var(--text-tertiary)]">{enlace.desc}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -bottom-32 left-[-160px] w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "var(--warning)" }}
        />
      </div>
    </section>
  );
}
