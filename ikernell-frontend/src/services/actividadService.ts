import { Actividad } from "../types/Actividad";
import { apiRequest } from "./apiConfig";

export async function obtenerActividades(): Promise<Actividad[]> {
  return apiRequest<Actividad[]>("/api/actividades");
}

export async function eliminarActividad(id: number) {
  await apiRequest<void>(`/api/actividades/${id}`, {
    method: "DELETE",
  });
}

export async function ejecutarActividad(id: number) {
  return apiRequest<Actividad>(`/api/actividades/${id}/ejecutar`, {
    method: "PUT",
  });
}

export async function obtenerActividadPorId(id: number) {
  return apiRequest<Actividad>(`/api/actividades/${id}`);
}

export async function crearActividad(actividad: any) {
  return apiRequest<Actividad>("/api/actividades", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actividad),
  });
}

export async function actualizarActividad(
  id: number,
  actividad: any
) {
  return apiRequest<Actividad>(`/api/actividades/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actividad),
  });
}

export async function obtenerActividadesPorEtapa(
  idEtapa: number,
): Promise<Actividad[]> {
  return apiRequest<Actividad[]>(`/api/etapas/${idEtapa}/actividades`);
}
