import type { RegistroError } from "../../../types/RegistroError";
import type { Interrupcion } from "../../../types/Interrupcion";

type Props = {
  tipo: "error" | "interrupcion";
  item: RegistroError | Interrupcion;
};

export default function HistoryCard({ tipo, item }: Props) {
  const esError = tipo === "error";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          {esError
            ? (item as RegistroError).codError
            : (item as Interrupcion).codInterrupcion}
        </h2>

        {esError && (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              background:
                (item as RegistroError).estadoError === "Corregido"
                  ? "#dcfce7"
                  : (item as RegistroError).estadoError === "En Revision"
                    ? "#fef3c7"
                    : "#fee2e2",

              color:
                (item as RegistroError).estadoError === "Corregido"
                  ? "#166534"
                  : (item as RegistroError).estadoError === "En Revision"
                    ? "#92400e"
                    : "#991b1b",

              fontWeight: 600,
            }}
          >
            {(item as RegistroError).estadoError}
          </span>
        )}
      </div>

      <hr
        style={{
          marginTop: "16px",
          marginBottom: "16px",
          border: "none",
          borderTop: "1px solid #e5e7eb",
        }}
      />

      <p
        style={{
          marginTop: "14px",
          color: "#334155",
          lineHeight: 1.8,
        }}
      >
        {esError
          ? (item as RegistroError).descripcionError
          : (item as Interrupcion).descripcionInterrupcion}
      </p>

      <hr
        style={{
          marginTop: "18px",
          marginBottom: "18px",
          border: "none",
          borderTop: "1px solid #e5e7eb",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(220px,1fr))",
          gap: "18px",
          marginTop: "18px",
        }}
      >
        <div>
          <strong
            style={{
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Desarrollador
          </strong>

          <p>
            {item.desarrollador.nombre} {item.desarrollador.apellido}
          </p>
        </div>

        <div>
          <strong
            style={{
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Etapa
          </strong>

          <p>{item.etapa.nombreEtapa}</p>
        </div>

        <div>
          <strong
            style={{
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Tipo
          </strong>

          <p>
            {esError
              ? (item as RegistroError).tipoError.nombreTipo
              : (item as Interrupcion).tipoInterrupcion.nombreTipoInterrupcion}
          </p>
        </div>

        <div>
          <strong
            style={{
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            {esError ? "Fecha" : "Duración"}
          </strong>

          <p>
            {esError
              ? new Date(
                  (item as RegistroError).fechaRegistroError,
                ).toLocaleDateString("es-CO")
              : `${(item as Interrupcion).duracionInterrupcion} min`}
          </p>
        </div>
      </div>
    </div>
  );
}
