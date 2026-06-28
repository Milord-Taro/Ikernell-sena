import { useEffect, useState } from "react";

import {
  obtenerMensajePorId,
  atenderMensaje,
  leerMensaje,
} from "../services/mensajeService";

import { Button } from "../app/components/ui/button";
import type { MensajeContacto } from "../types/MensajeContacto";

interface Props {
  idMensaje: number;
  onMensajeActualizado: () => void;
}

export default function MensajeDetallePage({
  idMensaje,
  onMensajeActualizado,
}: Props) {
  const [mensaje, setMensaje] = useState<MensajeContacto | null>(null);

  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    async function cargar() {
      const data = await obtenerMensajePorId(idMensaje);

      if (data.estadoMensaje === "Pendiente") {
        const actualizado = await leerMensaje(idMensaje);

        setMensaje(actualizado);
        onMensajeActualizado();
      } else {
        setMensaje(data);
      }

      setRespuesta("");
    }

    cargar();
  }, [idMensaje, onMensajeActualizado]);

  if (!mensaje) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div
      className="bg-white rounded-xl shadow p-6"
      style={{
        minHeight: "500px",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {mensaje.nombreRemitente}
      </h2>

      <p
        style={{
          color: "#64748b",
          marginBottom: "20px",
        }}
      >
        {mensaje.correoRemitente}
      </p>

      <div
        style={{
          padding: "16px",
          background: "#f8fafc",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h4>Mensaje</h4>

        <p>{mensaje.mensaje}</p>
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <strong>Estado:</strong> {mensaje.estadoMensaje}
      </div>

      {mensaje.estadoMensaje !== "Atendido" && (
        <>
          <textarea
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe la respuesta..."
            style={{
              width: "100%",
              minHeight: "140px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #dbe2ea",
              marginBottom: "15px",
            }}
          />

          <Button
            onClick={async () => {
              const actualizado = await atenderMensaje(
                mensaje.idMensaje,
                respuesta,
              );

              setMensaje(actualizado);

              onMensajeActualizado();
            }}
          >
            Enviar respuesta
          </Button>
        </>
      )}

      {mensaje.estadoMensaje === "Atendido" && (
        <div
          style={{
            padding: "16px",
            background: "#ecfdf5",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>Respuesta enviada</h3>

          <p>{mensaje.respuesta}</p>
        </div>
      )}
    </div>
  );
}
