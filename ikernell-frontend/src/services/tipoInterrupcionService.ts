import { apiRequest } from "./apiConfig";
import type { TipoInterrupcion } from "../types/TipoInterrupcion";

export async function obtenerTiposInterrupcion(): Promise<
  TipoInterrupcion[]
> {
  return apiRequest<TipoInterrupcion[]>("/api/tipointerrupciones");
}

export async function crearTipoInterrupcion(
  tipoInterrupcion: any,
): Promise<TipoInterrupcion> {
  return apiRequest<TipoInterrupcion>("/api/tipointerrupciones", {
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
): Promise<TipoInterrupcion> {
  return apiRequest<TipoInterrupcion>(
    `/api/tipointerrupciones/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipoInterrupcion),
    },
  );
}

export async function eliminarTipoInterrupcion(id: number) {
  await apiRequest<void>(`/api/tipointerrupciones/${id}`, {
    method: "DELETE",
  });
}

