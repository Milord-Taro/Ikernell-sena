import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../app/components/ui/button";
import { toast } from "sonner";

import { obtenerErrorPorId } from "../services/registroErrorService";
import { actualizarEstadoError } from "../services/registroErrorService";
import type { RegistroError } from "../types/RegistroError";
import { obtenerEstiloEstadoError } from "../utils/errorStatus";
import { obtenerIdUsuario } from "../utils/auth";

export default function RegistroErrorDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState<RegistroError | null>(null);
  const idUsuarioActual = obtenerIdUsuario();

  useEffect(() => {
    async function cargar() {
      if (!id) return;

      const data = await obtenerErrorPorId(Number(id));

      setError(data);
    }

    cargar();
  }, [id]);

  if (!error) {
    return <p>Cargando...</p>;
  }

  const puedeGestionar =
    error.desarrollador.idUsuario === idUsuarioActual;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
              {error.codError}
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              {error.tipoError.nombreTipo}
            </p>

            <span
              style={{
                ...obtenerEstiloEstadoError(error.estadoError),
                padding: "6px 12px",
                borderRadius: "999px",
                fontWeight: 600,
                display: "inline-block",
                marginTop: "16px",
              }}
            >
              {error.estadoError}
            </span>
          </div>
          {puedeGestionar && (
            <div>
              <Button
                onClick={() =>
                  navigate(`/dashboard/errores/${error.idError}/editar`)
                }
              >
                Editar
              </Button>

              <Button
                onClick={async () => {
                  let nuevoEstado = "";

                  if (error.estadoError === "Abierto") {
                    nuevoEstado = "En Revision";
                  } else if (error.estadoError === "En Revision") {
                    nuevoEstado = "Corregido";
                  } else {
                    nuevoEstado = "En Revision";
                  }

                  const actualizado = await actualizarEstadoError(
                    error.idError,
                    nuevoEstado,
                  );

                  setError(actualizado);

                  toast.success("Estado actualizado");
                }}
              >
                {error.estadoError === "Abierto"
                  ? "Iniciar Revision"
                  : error.estadoError === "En Revision"
                    ? "Marcar corregido"
                    : "Reabrir Revision"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          background: "white",
          marginTop: "24px",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Descripción</h2>

        <p
          style={{
            lineHeight: 1.8,
            color: "#475569",
          }}
        >
          {error.descripcionError}
        </p>
      </div>
      <div
        style={{
          background: "white",
          marginTop: "24px",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Comentarios</h2>

        <p
          style={{
            lineHeight: 1.8,
            color: "#475569",
          }}
        >
          {error.comentarioError || "Sin comentarios"}
        </p>
      </div>
      <div
        style={{
          background: "white",
          marginTop: "24px",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Información Técnica</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <strong>Desarrollador</strong>

            <p>
              {error.desarrollador.nombre} {error.desarrollador.apellido}
            </p>
          </div>

          <div>
            <strong>Tipo</strong>

            <p>{error.tipoError.nombreTipo}</p>
          </div>

          <div>
            <strong>Etapa</strong>

            <p>{error.etapa.nombreEtapa}</p>
          </div>

          <div>
            <strong>Fecha</strong>

            <p>
              {new Date(error.fechaRegistroError).toLocaleDateString("es-CO")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
