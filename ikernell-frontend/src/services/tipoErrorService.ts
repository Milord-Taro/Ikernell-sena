import { apiRequest } from "./apiConfig";

export async function obtenerTiposError() {
  return apiRequest("/api/tipoerrores");
}

export async function obtenerTipoErrorPorId(id: number) {
  return apiRequest(`/api/tipoerrores/${id}`);
}

export async function crearTipoError(tipoError: any) {
  return apiRequest("/api/tipoerrores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoError),
  });
}

export async function actualizarTipoError(id: number, tipoError: any) {
  return apiRequest(`/api/tipoerrores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoError),
  });
}

export async function eliminarTipoError(id: number) {
  await apiRequest<void>(`/api/tipoerrores/${id}`, {
    method: "DELETE",
  });
}
