import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Interrupcion } from "../types/Interrupcion";

import {
  obtenerInterrupciones,
  eliminarInterrupcion,
} from "../services/interrupcionService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button } from "../app/components/ui/button";

export default function InterrupcionesPage() {
  const [interrupciones, setInterrupciones] = useState<Interrupcion[]>([]);

  const [busqueda, setBusqueda] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerInterrupciones();

        setInterrupciones(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  const navigate = useNavigate();

  const interrupcionesFiltradas = interrupciones.filter(
    (i) =>
      i.codInterrupcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.tipoInterrupcion.nombreTipoInterrupcion
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      `${i.desarrollador.nombre} ${i.desarrollador.apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()),
  );

  if (loading) {
    return <h2>Cargando interrupciones...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interrupciones</h1>

      <p>Total interrupciones: {interrupciones.length}</p>

      <input
        type="text"
        placeholder="Buscar interrupción..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      />
      <div className="bg-white rounded-xl shadow p-6 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>

              <TableHead>Tipo</TableHead>

              <TableHead>Desarrollador</TableHead>

              <TableHead>Duración</TableHead>

              <TableHead>Etapa</TableHead>

              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {interrupcionesFiltradas.map((interrupcion) => (
              <TableRow key={interrupcion.idInterrupcion}>
                <TableCell>{interrupcion.codInterrupcion}</TableCell>

                <TableCell>
                  {interrupcion.tipoInterrupcion.nombreTipoInterrupcion}
                </TableCell>

                <TableCell>
                  {interrupcion.desarrollador.nombre}{" "}
                  {interrupcion.desarrollador.apellido}
                </TableCell>

                <TableCell>
                  {interrupcion.duracionInterrupcion}
                  {" min"}
                </TableCell>

                <TableCell>{interrupcion.etapa.nombreEtapa}</TableCell>

                <TableCell>
                  <Button
                    onClick={() =>
                      navigate(
                        `/dashboard/interrupciones/${interrupcion.idInterrupcion}/editar`,
                      )
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={async () => {
                      await eliminarInterrupcion(interrupcion.idInterrupcion);

                      setInterrupciones(
                        interrupciones.filter(
                          (i) =>
                            i.idInterrupcion !== interrupcion.idInterrupcion,
                        ),
                      );
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
