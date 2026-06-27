import type { Proyecto } from "../types/Proyecto";
import { apiRequest } from "./apiConfig";

export async function obtenerProyectos(): Promise<Proyecto[]> {
  return apiRequest<Proyecto[]>("/api/proyectos");
}

export async function crearProyecto(proyecto: any) {
  return apiRequest<Proyecto>("/api/proyectos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proyecto),
  });
}

export async function eliminarProyecto(id: number) {
  await apiRequest<void>(`/api/proyectos/${id}`, {
    method: "DELETE",
  });
}

export async function actualizarProyecto(
  id: number,
  proyecto: any
) {
  return apiRequest<Proyecto>(`/api/proyectos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proyecto),
  });
}

export async function obtenerProyectoPorId(
  id: number
) {
  return apiRequest<Proyecto>(`/api/proyectos/${id}`);
}





