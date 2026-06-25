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

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      await response.text()
    );
  }
}

export async function crearEtapa(etapa: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etapa),
  });

  if (!response.ok) {
    throw new Error("Error creando etapa");
  }

  return response.json();
}

export async function actualizarEtapa(
  id: number,
  etapa: any
) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(etapa),
    }
  );

  if (!response.ok) {
    throw new Error("Error actualizando etapa");
  }

  return response.json();
}
