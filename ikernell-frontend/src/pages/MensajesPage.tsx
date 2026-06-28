import { useCallback, useEffect, useState } from "react";
import type { MensajeContacto } from "../types/MensajeContacto";

import {
  obtenerMensajes,
  eliminarMensaje,
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

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const cargarMensajes = useCallback(async () => {
    try {
      const data = await obtenerMensajes();

      setMensajes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarMensajes();
  }, [cargarMensajes]);

  const mensajesFiltrados = mensajes.filter((m) => {
    const coincideBusqueda =
      m.nombreRemitente.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.correoRemitente.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.codMensaje.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "todos" ? true : m.estadoMensaje === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

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

      <input
        type="text"
        placeholder="Buscar mensaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Leido">Leído</option>
          <option value="Atendido">Atendido</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 430px",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <div className="bg-white rounded-xl shadow p-5">
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
              {mensajesFiltrados.map((mensaje) => (
                <TableRow key={mensaje.idMensaje}>
                  <TableCell>{mensaje.codMensaje}</TableCell>

                  <TableCell>{mensaje.nombreRemitente}</TableCell>

                  <TableCell>{mensaje.correoRemitente}</TableCell>

                  <TableCell>
                    <span
                      style={{
                        background:
                          mensaje.estadoMensaje === "Atendido"
                            ? "#dcfce7"
                            : mensaje.estadoMensaje === "Leido"
                              ? "#dbeafe"
                              : "#fee2e2",

                        color:
                          mensaje.estadoMensaje === "Atendido"
                            ? "#166534"
                            : mensaje.estadoMensaje === "Leido"
                              ? "#1d4ed8"
                              : "#b91c1c",

                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {mensaje.estadoMensaje}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          setMensajeSeleccionado(mensaje.idMensaje)
                        }
                      >
                        Ver
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (confirm("¿Deseas eliminar este mensaje?")) {
                            borrarMensaje(mensaje.idMensaje);
                          }
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          {mensajeSeleccionado ? (
            <MensajeDetallePage
              idMensaje={mensajeSeleccionado}
              onMensajeActualizado={cargarMensajes}
            />
          ) : (
            <div className="bg-white rounded-xl shadow p-6">
              <h3>Selecciona un mensaje</h3>

              <p>Haz clic en "Ver" para visualizar el detalle.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
