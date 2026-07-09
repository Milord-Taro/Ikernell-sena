import { PageContainer } from "./PageContainer";


const estadisticas = [
  { valor: "120+", etiqueta: "Proyectos entregados" },
  { valor: "15+", etiqueta: "Años de experiencia" },
  { valor: "98%", etiqueta: "Satisfacción de clientes" },
  { valor: "30+", etiqueta: "Especialistas en el equipo" },
];

export function StatsBar() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        backgroundColor: "var(--section-alt)",
      }}
    >
      <PageContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {estadisticas.map((item) => (
            <div key={item.etiqueta} className="text-center">
              <p
                className="type-metric-lg text-[var(--primary)]"
                style={{ fontSize: "44px" }}
              >
                {item.valor}
              </p>
              <p className="text-lg text-[var(--text-secondary)] mt-1.5">
                {item.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>

    </section>
  );
}
