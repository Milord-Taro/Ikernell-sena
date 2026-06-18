const stats = [
  { value: "500+", label: "Empresas confían en nosotros", color: "#4338ca" },
  { value: "1,200+", label: "Proyectos entregados", color: "#0ea5e9" },
  { value: "98%", label: "Satisfacción de clientes", color: "#0d9488" },
  { value: "50+", label: "Integraciones disponibles", color: "#9333ea" },
];

export function StatsBar() {
  return (
    <section
      className="py-14 bg-white border-b border-slate-100"
      aria-label="Estadísticas de la empresa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <p
                className="mb-1"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color }}
              >
                {value}
              </p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <div className="mt-12 pt-10 border-t border-slate-100">
          <p className="text-center text-sm text-slate-400 mb-6">
            Empresas que ya confían en IKernell
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["Bancolombia", "EPM", "Sura", "Grupo Éxito", "Rappi", "Falabella"].map((brand) => (
              <div
                key={brand}
                className="px-5 py-2 rounded-lg text-slate-600 font-semibold text-sm"
                style={{ background: "#f1f5f9" }}
                aria-label={`Cliente: ${brand}`}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
