import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock } from "lucide-react";

import { Button } from "../app/components/ui/button";
import { obtenerInterrupcionPorId } from "../services/interrupcionService";
import type { Interrupcion } from "../types/Interrupcion";
import { obtenerIdUsuario } from "../utils/auth";

export default function RegistroInterrupcionDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interrupcion, setInterrupcion] = useState<Interrupcion | null>(null);
  const idUsuarioActual = obtenerIdUsuario();

  useEffect(() => {
    async function cargar() {
      if (!id) return;

      const data = await obtenerInterrupcionPorId(Number(id));

      setInterrupcion(data);
    }

    cargar();
  }, [id]);

  if (!interrupcion) {
    return <p>Cargando...</p>;
  }

  const puedeEditar =
    interrupcion.desarrollador.idUsuario === idUsuarioActual;

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
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Clock color="#4338ca" />

              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                }}
              >
                {interrupcion.codInterrupcion}
              </h1>
            </div>

            <p
              style={{
                color: "#64748b",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              {interrupcion.tipoInterrupcion.nombreTipoInterrupcion}
            </p>

            <span
              style={{
                display: "inline-block",
                marginTop: "14px",
                background: "#fef3c7",
                color: "#92400e",
                borderRadius: "999px",
                padding: "6px 12px",
                fontWeight: 600,
              }}
            >
              {interrupcion.duracionInterrupcion} minutos
            </span>
          </div>

          {puedeEditar && (
            <Button
              onClick={() =>
                navigate(
                  `/dashboard/interrupciones/${interrupcion.idInterrupcion}/editar`,
                )
              }
            >
              Editar
            </Button>
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
          {interrupcion.descripcionInterrupcion}
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
              {interrupcion.desarrollador.nombre}{" "}
              {interrupcion.desarrollador.apellido}
            </p>
          </div>

          <div>
            <strong>Tipo</strong>

            <p>{interrupcion.tipoInterrupcion.nombreTipoInterrupcion}</p>
          </div>

          <div>
            <strong>Etapa</strong>

            <p>{interrupcion.etapa.nombreEtapa}</p>
          </div>

          <div>
            <strong>Fecha</strong>

            <p>
              {new Date(interrupcion.fechaInterrupcion).toLocaleDateString(
                "es-CO",
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
