import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../app/components/ui/button";

import type { Usuario } from "../types/Usuario";

import {
  obtenerUsuarios,
  inhabilitarUsuario,
  habilitarUsuario,
} from "../services/usuarioService";

import UserCard from "../app/components/dashboard/UserCard";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [busqueda, setBusqueda] = useState("");

  const [filtroEstado, setFiltroEstado] = useState("activos");

  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      const data = await obtenerUsuarios();

      setUsuarios(data);
    }

    cargar();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda = `${u.nombre} ${u.apellido}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "todos"
        ? true
        : filtroEstado === "activos"
          ? u.estado
          : !u.estado;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Usuarios</h1>
      <Button onClick={() => navigate("/dashboard/usuarios/nuevo")}>
        Nuevo Usuario
      </Button>

      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      />

      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        style={{
          marginTop: "12px",
          padding: "10px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      >
        <option value="activos">Activos</option>
        <option value="inactivos">Inhabilitados</option>
        <option value="todos">Todos</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {usuariosFiltrados.length === 0 && (
          <p style={{ color: "#64748b" }}>
            No hay usuarios para el filtro seleccionado.
          </p>
        )}

        {usuariosFiltrados.map((usuario) => (
          <UserCard
            key={usuario.idUsuario}
            id={usuario.idUsuario}
            codigo={usuario.codUsuario}
            nombre={`${usuario.nombre} ${usuario.apellido}`}
            correo={usuario.correoElectronico}
            rol={usuario.rol.nombreRol}
            profesion={usuario.profesion.nombreProfesion}
            activo={usuario.estado}
            onAccionEstado={async () => {
              try {
                const actualizado = usuario.estado
                  ? await inhabilitarUsuario(usuario.idUsuario)
                  : await habilitarUsuario(usuario.idUsuario);

                setUsuarios(
                  usuarios.map((u) =>
                    u.idUsuario === usuario.idUsuario ? actualizado : u,
                  ),
                );

                toast.success(
                  usuario.estado
                    ? "Usuario inhabilitado correctamente"
                    : "Usuario habilitado correctamente",
                );
              } catch {
                toast.error("No fue posible actualizar el usuario");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
