import { useEffect, useState } from "react";

import type { MensajeContacto } from "../types/MensajeContacto";

import {
  obtenerMensajes,
  eliminarMensaje,
  leerMensaje,
} from "../services/mensajeService";

import MensajeDetallePage from "./MensajeDetallePage";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button } from "../app/components/ui/button";

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);

  const [loading, setLoading] = useState(true);

  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<number | null>(
    null,
  );

  useEffect(() => {
        cargarMensajes();
  }, []);

  async function cargarMensajes() {
      try {
        const data = await obtenerMensajes();

        setMensajes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }


  async function borrarMensaje(id: number) {
    try {
      await eliminarMensaje(id);

      setMensajes(mensajes.filter((m) => m.idMensaje !== id));
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <h2>Cargando mensajes...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mensajes</h1>

      {mensajeSeleccionado && (
        <MensajeDetallePage
    idMensaje={
        mensajeSeleccionado
    }
    onMensajeActualizado={
        cargarMensajes
    }
/>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>

            <TableHead>Remitente</TableHead>

            <TableHead>Correo</TableHead>

            <TableHead>Estado</TableHead>

            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mensajes.map((mensaje) => (
            <TableRow key={mensaje.idMensaje}>
              <TableCell>{mensaje.codMensaje}</TableCell>

              <TableCell>{mensaje.nombreRemitente}</TableCell>

              <TableCell>{mensaje.correoRemitente}</TableCell>

              <TableCell>{mensaje.estadoMensaje}</TableCell>

              <TableCell>
                <Button
                  onClick={() => {
                    setMensajeSeleccionado(mensaje.idMensaje);
                  }}
                >
                  Ver
                </Button>

                <Button onClick={() => borrarMensaje(mensaje.idMensaje)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
