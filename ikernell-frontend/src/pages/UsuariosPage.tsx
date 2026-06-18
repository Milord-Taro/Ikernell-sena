import { useEffect, useState } from "react";

import type { Usuario }
from "../types/Usuario";

import {
  obtenerUsuarios,
  inhabilitarUsuario
}
from "../services/usuarioService";


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


export default function UsuariosPage() {

  const [usuarios,
    setUsuarios] =
    useState<Usuario[]>([]);

  useEffect(() => {

    async function cargar() {

      const data =
        await obtenerUsuarios();

      setUsuarios(data);
    }

    cargar();

  }, []);

  return (
  <div style={{ padding: "20px" }}>

    <h1>Usuarios</h1>

    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Código</TableHead>

          <TableHead>Nombre</TableHead>

          <TableHead>Correo</TableHead>

          <TableHead>Rol</TableHead>

          <TableHead>Estado</TableHead>

          <TableHead>Acciones</TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {usuarios.map((usuario) => (

          <TableRow
            key={usuario.idUsuario}
          >

            <TableCell>
              {usuario.codUsuario}
            </TableCell>

            <TableCell>
              {usuario.nombre} {usuario.apellido}
            </TableCell>

            <TableCell>
              {usuario.correoElectronico}
            </TableCell>

            <TableCell>
              {usuario.rol.nombreRol}
            </TableCell>

            <TableCell>
              {usuario.estado
                ? "Activo"
                : "Inactivo"}
            </TableCell>

            <TableCell>

              <Button
                onClick={async () => {

                  const actualizado =
                    await inhabilitarUsuario(
                      usuario.idUsuario
                    );

                  setUsuarios(
                    usuarios.map((u) =>
                      u.idUsuario ===
                      usuario.idUsuario
                        ? actualizado
                        : u
                    )
                  );

                }}
              >
                Inhabilitar
              </Button>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>

  </div>
);
}