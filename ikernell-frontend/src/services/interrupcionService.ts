import { apiRequest } from "./apiConfig";

export async function obtenerInterrupciones() {
  return apiRequest("/api/interrupciones");
}

export async function crearInterrupcion(interrupcion: any) {
  return apiRequest("/api/interrupciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interrupcion),
  });
}

export async function obtenerInterrupcionesPorEtapa(idEtapa: number) {
  return apiRequest(`/api/etapas/${idEtapa}/interrupciones`);
}

export async function eliminarInterrupcion(id: number) {
  await apiRequest<void>(`/api/interrupciones/${id}`, {
    method: "DELETE",
  });
}
export async function obtenerInterrupcionPorId(id: number) {
  return apiRequest(`/api/interrupciones/${id}`);
}

export async function actualizarInterrupcion(id: number, interrupcion: any) {
  return apiRequest(`/api/interrupciones/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interrupcion),
  });
}
