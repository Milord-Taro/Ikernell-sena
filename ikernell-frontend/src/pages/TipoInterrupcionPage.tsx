import { useEffect, useState } from "react";

import type { TipoInterrupcion } from "../types/TipoInterrupcion";

import {
  obtenerTiposInterrupcion,
  eliminarTipoInterrupcion,
} from "../services/tipoInterrupcionService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button } from "../app/components/ui/button";

export default function TipoInterrupcionPage() {
  const [tipos, setTipos] = useState<TipoInterrupcion[]>([]);

  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerTiposInterrupcion();

        setTipos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  const tiposFiltrados = tipos.filter(
    (t) =>
      t.nombreTipoInterrupcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.codTipoInterrupcion.toLowerCase().includes(busqueda.toLowerCase()),
  );

  if (loading) {
    return <h2>Cargando tipos de interrupción...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tipos de Interrupción</h1>

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
            <TableRow key={tipo.idTipoInterrupcion}>
              <TableCell>{tipo.codTipoInterrupcion}</TableCell>

              <TableCell>{tipo.nombreTipoInterrupcion}</TableCell>

              <TableCell>
                <Button
                  onClick={async () => {
                    await eliminarTipoInterrupcion(tipo.idTipoInterrupcion);

                    setTipos(
                      tipos.filter(
                        (t) => t.idTipoInterrupcion !== tipo.idTipoInterrupcion,
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
