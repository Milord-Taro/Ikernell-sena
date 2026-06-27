import { apiRequest } from "./apiConfig";

export async function obtenerTiposInterrupcion() {
  return apiRequest("/api/tipointerrupciones");
}

export async function eliminarTipoInterrupcion(id: number) {
  await apiRequest<void>(`/api/tipointerrupciones/${id}`, {
    method: "DELETE",
  });
}

export async function crearTipoInterrupcion(tipoInterrupcion: any) {
  return apiRequest("/api/tipointerrupciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoInterrupcion),
  });
}

export async function actualizarTipoInterrupcion(
  id: number,
  tipoInterrupcion: any,
) {
  return apiRequest(`/api/tipointerrupciones/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoInterrupcion),
  });
}
