import { apiRequest } from "./apiConfig";

export async function obtenerErrores() {
  return apiRequest("/api/registroerrores");
}

export async function eliminarError(id: number) {
  await apiRequest<void>(`/api/registroerrores/${id}`, {
    method: "DELETE",
  });
}

export async function crearRegistroError(error: any) {
  return apiRequest("/api/registroerrores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });
}

export async function obtenerErroresPorEtapa(idEtapa: number) {
  return apiRequest(`/api/etapas/${idEtapa}/errores`);
}

export async function obtenerErrorPorId(id: number) {
  return apiRequest(`/api/registroerrores/${id}`);
}

export async function actualizarRegistroError(id: number, error: any) {
  return apiRequest(`/api/registroerrores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });
}

export async function actualizarEstadoError(id: number, estado: string) {
  return apiRequest(`/api/registroerrores/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estado),
  });
}
