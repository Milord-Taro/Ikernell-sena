import type { Proyecto } from "../types/Proyecto";

const API_URL = "http://localhost:8080/api/proyectos";

export async function obtenerProyectos(): Promise<Proyecto[]> {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error obteniendo proyectos");
  }

  return response.json();
}

export async function crearProyecto(proyecto: any) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proyecto),
  });

  if (!response.ok) {
    throw new Error("Error creando proyecto");
  }

  return response.json();
}

export async function eliminarProyecto(id: number) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error eliminando proyecto");
  }
}

export async function actualizarProyecto(
  id: number,
  proyecto: any
) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proyecto),
    }
  );

  if (!response.ok) {
    throw new Error("Error actualizando proyecto");
  }

  return response.json();
}







