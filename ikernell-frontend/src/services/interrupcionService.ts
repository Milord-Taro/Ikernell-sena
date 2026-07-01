import { apiRequest } from "./apiConfig";
import type { Interrupcion } from "../types/Interrupcion";

export async function obtenerInterrupciones(): Promise<Interrupcion[]> {
  return apiRequest<Interrupcion[]>("/api/interrupciones");
}

export async function crearInterrupcion(
  interrupcion: any,
): Promise<Interrupcion> {
  return apiRequest<Interrupcion>(
    "/api/interrupciones",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interrupcion),
    },
  );
}

export async function obtenerInterrupcionesPorEtapa(
  idEtapa: number,
): Promise<Interrupcion[]> {
  return apiRequest<Interrupcion[]>(
    `/api/etapas/${idEtapa}/interrupciones`,
  );
}

export async function eliminarInterrupcion(id: number) {
  await apiRequest<void>(`/api/interrupciones/${id}`, {
    method: "DELETE",
  });
}

export async function obtenerInterrupcionPorId(
  id: number,
): Promise<Interrupcion> {
  return apiRequest<Interrupcion>(
    `/api/interrupciones/${id}`,
  );
}

export async function actualizarInterrupcion(
  id: number,
  interrupcion: any,
): Promise<Interrupcion> {
  return apiRequest<Interrupcion>(
    `/api/interrupciones/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interrupcion),
    },
  );
}
