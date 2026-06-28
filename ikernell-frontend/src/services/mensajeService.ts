import { apiRequest } from "./apiConfig";
import type {
  MensajeContacto,
  MensajeContactoRequest,
} from "../types/MensajeContacto";

export async function obtenerMensajes() {
  return apiRequest<MensajeContacto[]>("/api/mensajes");
}

export async function crearMensaje(
  mensaje: MensajeContactoRequest,
) {
  return apiRequest<MensajeContacto>("/api/mensajes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
  });
}

export async function actualizarMensaje(
  id: number,
  mensaje: MensajeContactoRequest,
) {
  return apiRequest<MensajeContacto>(`/api/mensajes/${id}`, {
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
  return apiRequest<MensajeContacto>(`/api/mensajes/${id}/leer`, {
    method: "PUT",
  });
}

export async function atenderMensaje(
  id: number,
  respuesta: string
) {
  return apiRequest<MensajeContacto>(`/api/mensajes/${id}/atender`, {
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
  return apiRequest<MensajeContacto>(`/api/mensajes/${id}`);
}
