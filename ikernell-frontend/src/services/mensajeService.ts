import { apiRequest } from "./apiConfig";

  export async function obtenerMensajes() {
  return apiRequest("/api/mensajes");
}

export async function crearMensaje(
  mensaje: any
) {
  return apiRequest("/api/mensajes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
  });
}

export async function actualizarMensaje(
  id: number,
  mensaje: any
) {
  return apiRequest(`/api/mensajes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
  });
}

export async function eliminarMensaje(
  id: number
) {
  await apiRequest<void>(`/api/mensajes/${id}`, {
    method: "DELETE",
  });
}

export async function leerMensaje(
  id: number
) {
  return apiRequest(`/api/mensajes/${id}/leer`, {
    method: "PUT",
  });
}

export async function atenderMensaje(
  id: number,
  respuesta: string
) {
  return apiRequest(`/api/mensajes/${id}/atender`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      respuesta,
    }),
  });
}

export async function obtenerMensajePorId(
  id: number
) {
  return apiRequest(`/api/mensajes/${id}`);
}
