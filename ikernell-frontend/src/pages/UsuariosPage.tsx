import { useEffect, useState } from "react";

import type { Usuario }
  from "../types/Usuario";

import {
  obtenerUsuarios,
  inhabilitarUsuario
}
  from "../services/usuarioService";

import UserCard
  from "../app/components/dashboard/UserCard";

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {usuarios.map((usuario) => (
          <UserCard
            key={usuario.idUsuario}
            id={usuario.idUsuario}
            codigo={usuario.codUsuario}
            nombre={`${usuario.nombre} ${usuario.apellido}`}
            correo={usuario.correoElectronico}
            rol={usuario.rol.nombreRol}
            profesion={
              usuario.profesion.nombreProfesion
            }
            activo={usuario.estado}
            onInhabilitar={async () => {
              const actualizado =
                await inhabilitarUsuario(
                  usuario.idUsuario
                );

              setUsuarios(
                usuarios.map((u) =>
                  u.idUsuario === usuario.idUsuario
                    ? actualizado
                    : u
                )
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}