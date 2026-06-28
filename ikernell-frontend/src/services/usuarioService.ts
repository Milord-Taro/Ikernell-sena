import type { Usuario, UsuarioRequest } from "../types/Usuario";
import { apiRequest } from "./apiConfig";

export async function obtenerUsuarios() {
  return apiRequest<Usuario[]>("/api/usuarios");
}

export async function inhabilitarUsuario(id: number) {
  return apiRequest<Usuario>(`/api/usuarios/${id}/inhabilitar`, {
    method: "PUT",
  });
}

export async function habilitarUsuario(id: number) {
  return apiRequest<Usuario>(`/api/usuarios/${id}/habilitar`, {
    method: "PUT",
  });
}

export async function obtenerUsuarioPorId(id: number) {
  return apiRequest<Usuario>(`/api/usuarios/${id}`);
}

function toUsuarioRequest(usuario: Usuario): UsuarioRequest {
  return {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correoElectronico: usuario.correoElectronico,
    direccion: usuario.direccion,
    fechaNacimiento: usuario.fechaNacimiento,
    tipoIdentificacion: usuario.tipoIdentificacion,
    numeroIdentificacion: usuario.numeroIdentificacion,
    fotoPerfil: usuario.fotoPerfil,
    contrasena: usuario.contrasena,
    estado: usuario.estado,
    idRol: usuario.rol.idRol,
    idProfesion: usuario.profesion.idProfesion,
    idEspecialidad: usuario.especialidad?.idEspecialidad ?? null,
  };
}

export async function actualizarUsuario(usuario: Usuario) {
  return apiRequest<Usuario>(`/api/usuarios/${usuario.idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toUsuarioRequest(usuario)),
  });
}

export async function crearUsuario(usuario: UsuarioRequest) {
  return apiRequest<Usuario>("/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
}

export async function cambiarContrasena(
  id: number,
  contrasenaActual: string,
  contrasenaNueva: string,
) {
  await apiRequest<void>(`/api/usuarios/${id}/contrasena`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contrasenaActual,
      contrasenaNueva,
    }),
  });
}
