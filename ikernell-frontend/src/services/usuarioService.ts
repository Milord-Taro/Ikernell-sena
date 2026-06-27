import type { Usuario } from "../types/Usuario";
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

export async function actualizarUsuario(usuario: Usuario) {
  return apiRequest<Usuario>(`/api/usuarios/${usuario.idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
}

export async function crearUsuario(usuario: Usuario) {
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
