import { useEffect, useState } from "react";

import type { TipoError } from "../types/TipoError";

import {
  obtenerTiposError,
  eliminarTipoError,
} from "../services/tipoErrorService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button } from "../app/components/ui/button";

export default function TipoErrorPage() {
  const [tiposError, setTiposError] = useState<TipoError[]>([]);

  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerTiposError();

        setTiposError(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, []);

  const tiposFiltrados = tiposError.filter(
    (t) =>
      t.nombreTipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.codTipoError.toLowerCase().includes(busqueda.toLowerCase()),
  );

  if (loading) {
    return <h2>Cargando tipos de error...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tipos de Error</h1>

      <input
        type="text"
        placeholder="Buscar tipo..."
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>

            <TableHead>Nombre</TableHead>

            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tiposFiltrados.map((tipo) => (
            <TableRow key={tipo.idTipoError}>
              <TableCell>{tipo.codTipoError}</TableCell>

              <TableCell>{tipo.nombreTipo}</TableCell>

              <TableCell>
                <Button
                  onClick={async () => {
                    await eliminarTipoError(tipo.idTipoError);

                    setTiposError(
                      tiposError.filter(
                        (t) => t.idTipoError !== tipo.idTipoError,
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
  );
}
