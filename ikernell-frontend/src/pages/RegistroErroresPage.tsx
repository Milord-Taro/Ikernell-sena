import { useEffect, useState } from "react";
import type { RegistroError } from "../types/RegistroError";
import { useNavigate } from "react-router-dom";
import { Button } from "../app/components/ui/button";
import { obtenerEstiloEstadoError } from "../utils/errorStatus";
import { obtenerIdUsuario } from "../utils/auth";

import {
  obtenerErrores,
  eliminarError,
} from "../services/registroErrorService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

export default function RegistroErroresPage() {
  const [errores, setErrores] = useState<RegistroError[]>([]);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      const data = await obtenerErrores();

      setErrores(data);
    }

    cargar();
  }, []);

  const navigate = useNavigate();
  const idUsuarioActual = obtenerIdUsuario();

  const erroresFiltrados = errores.filter(
    (e) =>
      e.codError.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.tipoError.nombreTipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      `${e.desarrollador.nombre} ${e.desarrollador.apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registro de Errores</h1>

      <p>Total errores: {errores.length}</p>

      <input
        type="text"
        placeholder="Buscar error..."
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

              <TableHead>Etapa</TableHead>

              <TableHead>Estado</TableHead>

              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {erroresFiltrados.map((error) => (
              <TableRow key={error.idError}>
                <TableCell>{error.codError}</TableCell>

                <TableCell>{error.tipoError.nombreTipo}</TableCell>

                <TableCell>
                  {error.desarrollador.nombre} {error.desarrollador.apellido}
                </TableCell>

                <TableCell>{error.etapa.nombreEtapa}</TableCell>

                <TableCell>
                  <span
                    style={{
                      ...obtenerEstiloEstadoError(error.estadoError),
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    {error.estadoError}
                  </span>
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/errores/${error.idError}`)
                    }
                  >
                    Ver
                  </Button>
                  {error.desarrollador.idUsuario === idUsuarioActual && (
                    <>
                      <Button
                        onClick={() =>
                          navigate(`/dashboard/errores/${error.idError}/editar`)
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        onClick={async () => {
                          const confirmar = confirm(
                            `¿Deseas eliminar el error ${error.codError}? Esta acción no se puede deshacer.`,
                          );

                          if (!confirmar) {
                            return;
                          }

                          await eliminarError(error.idError);

                          setErrores(
                            errores.filter((e) => e.idError !== error.idError),
                          );
                        }}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
