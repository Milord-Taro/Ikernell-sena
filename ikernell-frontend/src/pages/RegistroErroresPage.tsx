import { useEffect, useState } from "react";

import type { RegistroError }
from "../types/RegistroError";

import {
  obtenerErrores,
  eliminarError
}
from "../services/registroErrorService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button }
from "../app/components/ui/button";

export default function RegistroErroresPage() {

  const [errores,
    setErrores] =
    useState<RegistroError[]>([]);

  useEffect(() => {

    async function cargar() {

      const data =
        await obtenerErrores();

      setErrores(data);
    }

    cargar();

  }, []);

  return (
  <div style={{ padding: "20px" }}>

    <h1>Registro de Errores</h1>

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

        {errores.map((error) => (

          <TableRow
            key={error.idError}
          >

            <TableCell>
              {error.codError}
            </TableCell>

            <TableCell>
              {error.tipoError.nombreTipo}
            </TableCell>

            <TableCell>
              {error.desarrollador.nombre}
              {" "}
              {error.desarrollador.apellido}
            </TableCell>

            <TableCell>
              {error.etapa.nombreEtapa}
            </TableCell>

            <TableCell>
              {error.estadoError}
            </TableCell>

            <TableCell>

              <Button
                onClick={async () => {

                  await eliminarError(
                    error.idError
                  );

                  setErrores(
                    errores.filter(
                      (e) =>
                        e.idError !==
                        error.idError
                    )
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