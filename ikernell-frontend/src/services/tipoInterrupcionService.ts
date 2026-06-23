const API_URL = "http://localhost:8080/api/tipointerrupciones";

export async function obtenerTiposInterrupcion() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function eliminarTipoInterrupcion(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function crearTipoInterrupcion(tipoInterrupcion: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoInterrupcion),
  });

  if (!response.ok) {
    throw new Error("Error al crear tipo de interrupción");
  }

  return response.json();
}

export async function actualizarTipoInterrupcion(
  id: number,
  tipoInterrupcion: any,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoInterrupcion),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar tipo de interrupción");
  }

  return response.json();
}
