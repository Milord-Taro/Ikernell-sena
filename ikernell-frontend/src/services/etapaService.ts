import { Etapa } from "../types/Etapa";
import { apiRequest } from "./apiConfig";

export async function obtenerEtapas(): Promise<Etapa[]> {
  return apiRequest<Etapa[]>("/api/etapas");
}

export async function eliminarEtapa(id: number) {
  await apiRequest<void>(`/api/etapas/${id}`, {
    method: "DELETE",
  });
}

export async function crearEtapa(etapa: any) {
  return apiRequest<Etapa>("/api/etapas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etapa),
  });
}

export async function actualizarEtapa(
  id: number,
  etapa: any
) {
  return apiRequest<Etapa>(`/api/etapas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etapa),
  });
}
