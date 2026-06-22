import { Actividad } from "../types/Actividad";

const API_URL = "http://localhost:8080/api/actividades";

export async function obtenerActividades(): Promise<Actividad[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener actividades");
  }

  return response.json();
}

export async function eliminarActividad(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function ejecutarActividad(id: number) {
  const response = await fetch(`${API_URL}/${id}/ejecutar`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Error al ejecutar actividad");
  }

  return response.json();
}

export async function obtenerActividadPorId(id: number) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener actividad");
  }

  return response.json();
}

export async function crearActividad(actividad: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actividad),
  });

  if (!response.ok) {
    throw new Error("Error al crear actividad");
  }

  return response.json();
}

export async function actualizarActividad(id: number, actividad: any) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actividad),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar actividad");
  }

  return response.json();
}

export async function obtenerActividadesPorEtapa(
  idEtapa: number,
): Promise<Actividad[]> {
  const response = await fetch(
    `http://localhost:8080/api/etapas/${idEtapa}/actividades`,
  );

  return response.json();
}
