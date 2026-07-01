import { apiRequest } from "./apiConfig";
import type { TipoError } from "../types/TipoError";

export async function obtenerTiposError(): Promise<TipoError[]> {
  return apiRequest<TipoError[]>("/api/tipoerrores");
}

export async function obtenerTipoErrorPorId(
  id: number,
): Promise<TipoError> {
  return apiRequest<TipoError>(`/api/tipoerrores/${id}`);
}

export async function crearTipoError(
  tipoError: any,
): Promise<TipoError> {
  return apiRequest<TipoError>("/api/tipoerrores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoError),
  });
}

export async function actualizarTipoError(
  id: number,
  tipoError: any,
): Promise<TipoError> {
  return apiRequest<TipoError>(`/api/tipoerrores/${id}`, {
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
