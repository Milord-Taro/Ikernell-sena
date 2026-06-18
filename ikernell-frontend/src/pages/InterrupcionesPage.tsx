import { useEffect, useState } from "react";

import type { Interrupcion }
from "../types/Interrupcion";

import {
  obtenerInterrupciones,
  eliminarInterrupcion,
}
from "../services/interrupcionService";

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

export default function InterrupcionesPage() {

  const [interrupciones,
    setInterrupciones] =
    useState<Interrupcion[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    async function cargar() {

      try {

        const data =
          await obtenerInterrupciones();

        setInterrupciones(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    cargar();

  }, []);

  if (loading) {
    return (
      <h2>
        Cargando interrupciones...
      </h2>
    );
  }

  return (
  <div style={{ padding: "20px" }}>

    <h1>Interrupciones</h1>

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

        {interrupciones.map((interrupcion) => (

          <TableRow
            key={interrupcion.idInterrupcion}
          >

            <TableCell>
              {interrupcion.codInterrupcion}
            </TableCell>

            <TableCell>
              {
                interrupcion.tipoInterrupcion
                  .nombreTipoInterrupcion
              }
            </TableCell>

            <TableCell>
              {interrupcion.desarrollador.nombre}
              {" "}
              {interrupcion.desarrollador.apellido}
            </TableCell>

            <TableCell>
              {interrupcion.duracionInterrupcion}
              {" min"}
            </TableCell>

            <TableCell>
              {interrupcion.etapa.nombreEtapa}
            </TableCell>

            <TableCell>

              <Button
                onClick={async () => {

                  await eliminarInterrupcion(
                    interrupcion.idInterrupcion
                  );

                  setInterrupciones(
                    interrupciones.filter(
                      (i) =>
                        i.idInterrupcion !==
                        interrupcion.idInterrupcion
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