import { apiRequest } from "./apiConfig";
import type { RegistroError } from "../types/RegistroError";

export async function obtenerErrores(): Promise<RegistroError[]> {
  return apiRequest<RegistroError[]>("/api/registroerrores");
}

export async function eliminarError(id: number) {
  await apiRequest<void>(`/api/registroerrores/${id}`, {
    method: "DELETE",
  });
}

export async function crearRegistroError(error: any): Promise<RegistroError> {
  return apiRequest<RegistroError>("/api/registroerrores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });
}

export async function obtenerErroresPorEtapa(
  idEtapa: number,
): Promise<RegistroError[]> {
  return apiRequest<RegistroError[]>(`/api/etapas/${idEtapa}/errores`);
}

export async function obtenerErrorPorId(id: number): Promise<RegistroError> {
  return apiRequest<RegistroError>(`/api/registroerrores/${id}`);
}

export async function actualizarRegistroError(
  id: number,
  error: any,
): Promise<RegistroError> {
  return apiRequest<RegistroError>(`/api/registroerrores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });
}

export async function actualizarEstadoError(
  id: number,
  estado: string,
): Promise<RegistroError> {
  return apiRequest<RegistroError>(`/api/registroerrores/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estado),
  });
}
