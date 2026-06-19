import { Etapa } from "../types/Etapa";

const API_URL = "http://localhost:8080/api/etapas";

export async function obtenerEtapas(): Promise<Etapa[]> {
  const response = await fetch("http://localhost:8080/api/etapas");

  if (!response.ok) {
    throw new Error("Error al obtener etapas");
  }

  return response.json();
}

export async function eliminarEtapa(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

