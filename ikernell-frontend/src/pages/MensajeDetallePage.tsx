import { useEffect, useState } from "react";

import {
  obtenerMensajePorId,
  atenderMensaje,
} from "../services/mensajeService";

import { Button } from "../app/components/ui/button";

interface Props {
  idMensaje: number;
  onMensajeActualizado: () => void;
}

export default function MensajeDetallePage({
  idMensaje,
  onMensajeActualizado,
}: Props) {
  const [mensaje, setMensaje] = useState<any>(null);

  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    async function cargar() {
      const data = await obtenerMensajePorId(idMensaje);

      setMensaje(data);
      setRespuesta("");
    }

    cargar();
  }, [idMensaje]);

  if (!mensaje) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div>
      <h2>{mensaje.nombreRemitente}</h2>

      <p>{mensaje.correoRemitente}</p>

      <p>{mensaje.mensaje}</p>

      <br />

      {mensaje.estadoMensaje !== "Atendido" && (
        <>
          <textarea
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe la respuesta..."
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
            Responder
          </Button>
        </>
      )}

      {mensaje.estadoMensaje === "Atendido" && (
        <div>
          <h3>Respuesta enviada</h3>

          <p>{mensaje.respuesta}</p>
        </div>
      )}
    </div>
  );
}
