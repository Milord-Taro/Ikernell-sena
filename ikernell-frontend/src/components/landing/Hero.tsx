import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { Button } from "../ui/Button";
import { EyebrowPill } from "./EyebrowPill";
import { PageContainer } from "./PageContainer";

const caracteristicas = [
  "Desarrollo de software a la medida",
  "Consultoría y transformación digital",
  "Equipos especializados en desarrollo",
];

export function Hero() {
  return (
    <section id="inicio" className="relative pt-32 pb-28 overflow-hidden">
      <div
        className="absolute -top-24 right-[-10%] w-[560px] h-[560px] rounded-full opacity-[0.15] blur-3xl pointer-events-none"
        style={{ background: "var(--primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-40 left-[-15%] w-[460px] h-[460px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{ background: "var(--info)" }}
        aria-hidden="true"
      />

      <PageContainer className="relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
          <div className="flex flex-col gap-9">
            <div>
              <EyebrowPill>Desarrollo de software a la medida</EyebrowPill>
            </div>
            <h1
              className="type-hero text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)" }}
            >
              Impulsa tus{" "}
              <span style={{ color: "var(--primary)" }}>
                proyectos de software
              </span>{" "}
              al siguiente nivel
            </h1>

            <p className="text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
              En IKernell Soluciones Software diseñamos, desarrollamos e
              implementamos soluciones de software personalizadas para empresas
              que buscan optimizar procesos y acelerar su transformación
              digital.
            </p>

            <ul className="flex flex-col gap-3">
              {caracteristicas.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-lg text-[var(--text-secondary)]"
                >
                  <CheckCircle2
                    size={20}
                    className="text-[var(--success)] shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .querySelector("#contacto")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contáctanos
                <ArrowRight size={15} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .querySelector("#servicios")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver portafolio
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                alt="Equipo de desarrollo colaborando en un proyecto de software"
                className="w-full h-96 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-xl p-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center size-11 rounded-[var(--radius-md)] bg-[var(--success-bg)] text-[var(--success)]">
                  <CheckCircle2 size={20} />
                </span>
                <div>
                  <p className="text-xl font-semibold text-[var(--text-primary)]">
                    120+
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Proyectos entregados
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-xl p-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-10 rounded-[var(--radius-md)] bg-[var(--primary-subtle)] text-[var(--primary)]">
                  <Users size={18} />
                </span>
                <div>
                  <p className="text-xl font-semibold text-[var(--text-primary)]">
                    30+
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Especialistas en el equipo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: `
            linear-gradient(
            to bottom,

            rgba(255,255,255,0) 0%,

            rgba(255,255,255,.20) 20%,

            rgba(236,238,243,.35) 45%,

            rgba(236,238,243,.75) 75%,

            var(--section-alt) 100%

            )`,
        }}
      />
    </section>
  );
}
