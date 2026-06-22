import type { Usuario } from "../types/Usuario";

const API_URL =
  "http://localhost:8080/api/usuarios";

export async function obtenerUsuarios() {

  const response =
    await fetch(API_URL);

  return response.json();
}

export async function inhabilitarUsuario(
  id: number
) {

  const response =
    await fetch(
      `${API_URL}/${id}/inhabilitar`,
      {
        method: "PUT",
      }
    );

  return response.json();
}

export async function obtenerUsuarioPorId(
  id: number
) {
  const response =
    await fetch(`${API_URL}/${id}`);

  return response.json();
}

export async function actualizarUsuario(
  usuario: Usuario
) {

  const response =
    await fetch(
      `${API_URL}/${usuario.idUsuario}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          usuario
        ),
      }
    );

  return response.json();
}